/**
 * tokenizer.worker.js
 *
 * Runs ALL tokenization off the main thread via a dedicated Web Worker.
 * Three tokenizer backends, selected by the `encodingName` field:
 *
 *   "claude"        → js-tiktoken/lite + Anthropic claude.json BPE vocab
 *   "hf:<modelId>"  → @huggingface/transformers AutoTokenizer (Llama, DeepSeek …)
 *   anything else   → js-tiktoken/lite (o200k_base, cl100k_base, …)
 */

// ─── Caches ──────────────────────────────────────────────────────────────────

const jsTiktokenCache = {};
const hfTokenizerCache = {};

// ─── js-tiktoken ──────────────────────────────────────────────────────────────

const RANK_LOADERS = {
  o200k_base:  () => import("js-tiktoken/ranks/o200k_base"),
  cl100k_base: () => import("js-tiktoken/ranks/cl100k_base"),
  p50k_base:   () => import("js-tiktoken/ranks/p50k_base"),
  r50k_base:   () => import("js-tiktoken/ranks/r50k_base"),
  claude:      () => import("@anthropic-ai/tokenizer/claude.json"),
};

async function getJsTiktokenEncoder(encodingName) {
  if (jsTiktokenCache[encodingName]) return jsTiktokenCache[encodingName];
  const loader = RANK_LOADERS[encodingName];
  if (!loader) { console.error(`Unknown encoding: ${encodingName}`); return null; }
  try {
    const { Tiktoken } = await import("js-tiktoken/lite");
    const mod = await loader();
    const enc = new Tiktoken(mod.default ?? mod);
    jsTiktokenCache[encodingName] = enc;
    return enc;
  } catch (err) {
    console.error(`Failed to load encoding "${encodingName}":`, err);
    return null;
  }
}

// ─── HuggingFace AutoTokenizer ────────────────────────────────────────────────

async function getHFTokenizer(modelId) {
  if (hfTokenizerCache[modelId]) return hfTokenizerCache[modelId];
  try {
    const { AutoTokenizer, env } = await import("@huggingface/transformers");
    // Fetch tokenizer files from HF Hub CDN; disable local model search
    env.allowLocalModels = false;
    env.useBrowserCache = true;
    const tokenizer = await AutoTokenizer.from_pretrained(modelId);
    hfTokenizerCache[modelId] = tokenizer;
    return tokenizer;
  } catch (err) {
    console.error(`Failed to load HF tokenizer "${modelId}":`, err);
    return null;
  }
}

// ─── Core tokenization functions ──────────────────────────────────────────────

async function countTokens(text, encodingName) {
  if (!text || text.length === 0) return 0;

  if (encodingName.startsWith("hf:")) {
    const tok = await getHFTokenizer(encodingName.slice(3));
    if (tok) {
      try {
        const { input_ids } = tok(text, { add_special_tokens: false });
        return input_ids.size ?? input_ids.data?.length ?? 0;
      } catch (err) { console.error("HF count error:", err); }
    }
    return Math.ceil(text.length / 4);
  }

  const enc = await getJsTiktokenEncoder(encodingName);
  if (!enc) return Math.ceil(text.length / 4);
  try {
    const t = encodingName === "claude" ? text.normalize("NFKC") : text;
    return enc.encode(t, "all").length;
  } catch (err) {
    console.error("js-tiktoken count error:", err);
    return Math.ceil(text.length / 4);
  }
}

async function tokenize(text, encodingName) {
  if (!text || text.length === 0) return [];

  const fallback = () =>
    text.split(/(\s+)/).filter(Boolean).map((chunk, i) => ({ id: i, text: chunk, tokenId: i }));

  if (encodingName.startsWith("hf:")) {
    const tok = await getHFTokenizer(encodingName.slice(3));
    if (tok) {
      try {
        const { input_ids } = tok(text, { add_special_tokens: false });
        const ids = Array.from(input_ids.data ?? input_ids);
        return ids.map((tokenId, i) => {
          let decoded = "";
          try { decoded = tok.decode([tokenId], { skip_special_tokens: true }); } catch (_) {}
          return { id: i, text: decoded === "" ? "\u200B" : decoded, tokenId };
        });
      } catch (err) { console.error("HF tokenize error:", err); }
    }
    return fallback();
  }

  const enc = await getJsTiktokenEncoder(encodingName);
  if (!enc) return fallback();
  try {
    const t = encodingName === "claude" ? text.normalize("NFKC") : text;
    const ids = enc.encode(t, "all");
    return ids.map((tokenId, i) => ({
      id: i,
      text: enc.decode([tokenId]) || "\u200B",
      tokenId,
    }));
  } catch (err) {
    console.error("js-tiktoken tokenize error:", err);
    return fallback();
  }
}

// ─── Message handler ──────────────────────────────────────────────────────────

self.onmessage = async ({ data }) => {
  const { id, type, text, encodingName } = data;
  try {
    let result;
    if (type === "countTokens") {
      result = await countTokens(text, encodingName);
    } else if (type === "tokenize") {
      result = await tokenize(text, encodingName);
    } else {
      throw new Error(`Unknown message type: ${type}`);
    }
    self.postMessage({ id, result });
  } catch (err) {
    self.postMessage({ id, error: err.message ?? String(err) });
  }
};
