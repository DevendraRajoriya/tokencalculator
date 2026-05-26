/**
 * tokenizer.js — Main-thread proxy
 *
 * All CPU-intensive tokenization runs in a dedicated Web Worker
 * (tokenizer.worker.js) so the UI stays responsive.
 *
 * Falls back to inline (main-thread) tokenization when:
 *   - Running on the server (SSR/build)
 *   - Worker creation fails
 */

// ─── Worker management ────────────────────────────────────────────────────────

let _worker = null;
let _workerReady = false;
let _requestId = 0;
const _pending = {}; // id → { resolve, reject }

function getWorker() {
  if (_worker) return _worker;

  // Workers are client-side only
  if (typeof window === "undefined") return null;

  try {
    _worker = new Worker(
      new URL("./tokenizer.worker.js", import.meta.url),
      { type: "module" }
    );

    _worker.onmessage = ({ data }) => {
      const { id, result, error } = data;
      const pending = _pending[id];
      if (!pending) return;
      delete _pending[id];
      if (error) pending.reject(new Error(error));
      else pending.resolve(result);
    };

    _worker.onerror = (err) => {
      console.error("Tokenizer worker error:", err);
      // Reject all pending requests so callers don't hang
      for (const [id, p] of Object.entries(_pending)) {
        p.reject(new Error("Worker error"));
        delete _pending[id];
      }
      _worker = null; // allow recreation on next call
    };

    _workerReady = true;
    return _worker;
  } catch (err) {
    console.warn("Could not create tokenizer Worker, falling back to main thread:", err);
    return null;
  }
}

function postToWorker(type, text, encodingName) {
  const worker = getWorker();
  if (!worker) return null; // signal to use fallback

  return new Promise((resolve, reject) => {
    const id = ++_requestId;
    _pending[id] = { resolve, reject };
    worker.postMessage({ id, type, text, encodingName });
  });
}

// ─── Inline fallback (main thread, used during SSR or if worker fails) ───────

// Caches shared with the fallback path
const _jsTiktokenCache = {};
const _hfTokenizerCache = {};

const RANK_LOADERS = {
  o200k_base:  () => import("js-tiktoken/ranks/o200k_base"),
  cl100k_base: () => import("js-tiktoken/ranks/cl100k_base"),
  p50k_base:   () => import("js-tiktoken/ranks/p50k_base"),
  r50k_base:   () => import("js-tiktoken/ranks/r50k_base"),
  claude:      () => import("@anthropic-ai/tokenizer/claude.json"),
};

async function _getJsTiktoken(encodingName) {
  if (_jsTiktokenCache[encodingName]) return _jsTiktokenCache[encodingName];
  const loader = RANK_LOADERS[encodingName];
  if (!loader) return null;
  const { Tiktoken } = await import("js-tiktoken/lite");
  const mod = await loader();
  const enc = new Tiktoken(mod.default ?? mod);
  _jsTiktokenCache[encodingName] = enc;
  return enc;
}

async function _getHFTokenizer(modelId) {
  if (_hfTokenizerCache[modelId]) return _hfTokenizerCache[modelId];
  const { AutoTokenizer, env } = await import("@huggingface/transformers");
  env.allowLocalModels = false;
  env.useBrowserCache = true;
  const tok = await AutoTokenizer.from_pretrained(modelId);
  _hfTokenizerCache[modelId] = tok;
  return tok;
}

async function _countTokensFallback(text, encodingName) {
  if (!text || text.length === 0) return 0;
  if (encodingName.startsWith("hf:")) {
    try {
      const tok = await _getHFTokenizer(encodingName.slice(3));
      const { input_ids } = tok(text, { add_special_tokens: false });
      return input_ids.size ?? input_ids.data?.length ?? 0;
    } catch { return Math.ceil(text.length / 4); }
  }
  try {
    const enc = await _getJsTiktoken(encodingName);
    if (!enc) return Math.ceil(text.length / 4);
    const t = encodingName === "claude" ? text.normalize("NFKC") : text;
    return enc.encode(t, "all").length;
  } catch { return Math.ceil(text.length / 4); }
}

async function _tokenizeFallback(text, encodingName) {
  if (!text || text.length === 0) return [];
  const fallback = () =>
    text.split(/(\s+)/).filter(Boolean).map((c, i) => ({ id: i, text: c, tokenId: i }));
  if (encodingName.startsWith("hf:")) {
    try {
      const tok = await _getHFTokenizer(encodingName.slice(3));
      const { input_ids } = tok(text, { add_special_tokens: false });
      const ids = Array.from(input_ids.data ?? input_ids);
      return ids.map((tokenId, i) => {
        let decoded = "";
        try { decoded = tok.decode([tokenId], { skip_special_tokens: true }); } catch (_) {}
        return { id: i, text: decoded === "" ? "\u200B" : decoded, tokenId };
      });
    } catch { return fallback(); }
  }
  try {
    const enc = await _getJsTiktoken(encodingName);
    if (!enc) return fallback();
    const t = encodingName === "claude" ? text.normalize("NFKC") : text;
    return enc.encode(t, "all").map((tokenId, i) => ({
      id: i, text: enc.decode([tokenId]) || "\u200B", tokenId,
    }));
  } catch { return fallback(); }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function countTokens(text, encodingName = "cl100k_base") {
  if (!text || text.length === 0) return 0;
  try {
    const result = await postToWorker("countTokens", text, encodingName);
    if (result !== null) return result;
  } catch (err) {
    console.warn("Worker countTokens failed, falling back:", err);
  }
  return _countTokensFallback(text, encodingName);
}

export async function tokenize(text, encodingName = "cl100k_base") {
  if (!text || text.length === 0) return [];
  try {
    const result = await postToWorker("tokenize", text, encodingName);
    if (result !== null) return result;
  } catch (err) {
    console.warn("Worker tokenize failed, falling back:", err);
  }
  return _tokenizeFallback(text, encodingName);
}

export function countWords(text) {
  if (!text || text.trim().length === 0) return 0;
  return text.trim().split(/\s+/).length;
}

export function countCharacters(text) {
  if (!text) return 0;
  return text.length;
}
