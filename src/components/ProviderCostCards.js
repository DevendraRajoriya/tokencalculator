"use client";

import { useState, useMemo } from "react";
import { MODELS } from "@/lib/models";
import { toast } from "react-toastify";

/* ─── Providers ─────────────────────────────────────────────────── */
const PROVIDERS = [
  { id: "openai",     name: "OpenAI",     defaultModel: "gpt-5.4",              cachedInputRate: 0.5,  hasCache: true, cacheWrite5min: null, cacheWrite1hr: null },
  { id: "anthropic",  name: "Anthropic",  defaultModel: "claude-sonnet-4-6",    cachedInputRate: 0.1,  hasCache: true, cacheWrite5min: 1.25, cacheWrite1hr: 2.0  },
  { id: "google",     name: "Google",     defaultModel: "gemini-2-5-pro",       cachedInputRate: 0.25, hasCache: true, cacheWrite5min: null, cacheWrite1hr: null },
  { id: "deepseek",   name: "DeepSeek",   defaultModel: "deepseek-v3",          cachedInputRate: 0.1,  hasCache: true, cacheWrite5min: null, cacheWrite1hr: null },
  { id: "meta",       name: "Meta",       defaultModel: "llama-4-scout",        hasCache: false },
  { id: "mistral",    name: "Mistral",    defaultModel: "mistral-large-latest", hasCache: false },
  { id: "perplexity", name: "Perplexity", defaultModel: "sonar-pro",            hasCache: false },
  { id: "xai",        name: "xAI",        defaultModel: "grok-4-3",             hasCache: false },
  { id: "qwen",       name: "Qwen",       defaultModel: "qwen-3-7-max",         hasCache: false },
];

/* ─── Logos ─────────────────────────────────────────────────────── */
const LOGOS = {
  OpenAI: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
    </svg>
  ),
  Anthropic: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017L3.674 20H0L6.57 3.52zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z"/>
    </svg>
  ),
  Google: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  ),
  DeepSeek: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5h-2v-7h2zm0-9h-2V5.5h2z"/>
    </svg>
  ),
  Meta: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.985 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.767.665-1.09 1.244-1.838 2.428a7.988 7.988 0 0 0-.534-.61C9.432 4.8 8.213 4.03 6.915 4.03z"/>
    </svg>
  ),
  Mistral: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/>
      <rect x="16" y="2" width="6" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/>
      <rect x="16" y="9" width="6" height="5" rx="1"/><rect x="2" y="16" width="5" height="6" rx="1"/>
      <rect x="9" y="16" width="5" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/>
    </svg>
  ),
  Perplexity: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 3L3 9v12h6v-6h6v6h6V9l-6-6H9zm3 1.5L17.5 10H15v4H9v-4H6.5L12 4.5z"/>
    </svg>
  ),
  xAI: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Qwen: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm1-13h-2v6l5 3 1-1.73-4-2.27z"/>
    </svg>
  ),
};

/* ─── Formatting ─────────────────────────────────────────────────── */
function fmt(cost) {
  if (cost === 0) return "$0.00";
  if (cost < 0.000001) return "<$0.000001";
  if (cost < 0.001) return `$${cost.toFixed(6)}`;
  if (cost < 0.01)  return `$${cost.toFixed(5)}`;
  if (cost < 1)     return `$${cost.toFixed(4)}`;
  return `$${cost.toFixed(2)}`;
}

/* ─── Card ───────────────────────────────────────────────────────── */
function ProviderCard({ provider, inputTokens, outputTokens, isCheapest }) {
  const models = MODELS.filter(
    (m) => m.provider.toLowerCase() === provider.name.toLowerCase()
  );
  const [selectedId, setSelectedId] = useState(provider.defaultModel);
  const model = models.find((m) => m.id === selectedId) || models[0];
  if (!model) return null;

  const inputCost   = (inputTokens  / 1_000_000) * model.inputPrice;
  const outputCost  = (outputTokens / 1_000_000) * model.outputPrice;
  const cachedCost  = provider.hasCache
    ? (inputTokens / 1_000_000) * model.inputPrice * (provider.cachedInputRate ?? 0.5)
    : null;
  const cacheW5 = provider.cacheWrite5min != null
    ? (inputTokens / 1_000_000) * provider.cacheWrite5min : null;
  const cacheW1 = provider.cacheWrite1hr != null
    ? (inputTokens / 1_000_000) * provider.cacheWrite1hr  : null;
  const total = inputCost + outputCost;

  const handleCopy = () => {
    const lines = [
      `Provider: ${provider.name}`,
      `Model: ${model.name}`,
      `Input: ${fmt(inputCost)}`,
      cachedCost != null ? `Cached Input: ${fmt(cachedCost)}` : null,
      cacheW5 != null    ? `Cache Write (5-min): ${fmt(cacheW5)}` : null,
      cacheW1 != null    ? `Cache Write (1-hr): ${fmt(cacheW1)}`  : null,
      `Output: ${fmt(outputCost)}`,
      `EST. TOTAL: ${fmt(total)}`,
    ].filter(Boolean).join("\n");
    navigator.clipboard.writeText(lines).then(() => toast.success("Copied!"));
  };

  return (
    <div className="pc4-card">

      {/* Header: logo + name */}
      <div className="pc4-header">
        <span className="pc4-logo">{LOGOS[provider.name]}</span>
        <span className="pc4-name">{provider.name}</span>

      </div>

      {/* Model dropdown */}
      <div className="pc4-select-wrap">
        <select
          className="pc4-select"
          value={model.id}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {models.map((m) => {
            const ctx = m.contextWindow >= 1_000_000
              ? `\u2264${(m.contextWindow / 1_000_000).toFixed(0)}M ctx`
              : `<${(m.contextWindow / 1_000).toFixed(0)}K ctx`;
            return <option key={m.id} value={m.id}>{m.name} ({ctx})</option>;
          })}
        </select>
        <span className="pc4-chevron">&#9662;</span>
      </div>

      {/* Price rows — vertical list with dividers */}
      <div className="pc4-rows">
        <div className="pc4-row">
          <span className="pc4-lbl">Input</span>
          <span className="pc4-val">{fmt(inputCost)}</span>
        </div>
        {cachedCost != null && (
          <div className="pc4-row">
            <span className="pc4-lbl">Cached Input</span>
            <span className="pc4-val">{fmt(cachedCost)}</span>
          </div>
        )}
        {cacheW5 != null && (
          <div className="pc4-row">
            <span className="pc4-lbl">Cache Write (5-min)</span>
            <span className="pc4-val">{fmt(cacheW5)}</span>
          </div>
        )}
        {cacheW1 != null && (
          <div className="pc4-row">
            <span className="pc4-lbl">Cache Write (1-hr)</span>
            <span className="pc4-val">{fmt(cacheW1)}</span>
          </div>
        )}
        <div className="pc4-row">
          <span className="pc4-lbl">Output</span>
          <span className="pc4-val">{fmt(outputCost)}</span>
        </div>
      </div>

      {/* EST. TOTAL box */}
      <div className="pc4-total">
        <span className="pc4-total-lbl">EST. TOTAL</span>
        <span className="pc4-total-val">{fmt(total)}</span>
      </div>

      {/* Copy link */}
      <button className="pc4-copy" onClick={handleCopy}>
        Copy estimate
      </button>

    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────── */
export default function ProviderCostCards({ inputTokens = 0, outputTokens = 0 }) {
  const cheapestId = useMemo(() => {
    if (inputTokens === 0 && outputTokens === 0) return null;
    let min = Infinity, id = null;
    for (const p of PROVIDERS) {
      const models = MODELS.filter((m) => m.provider.toLowerCase() === p.name.toLowerCase());
      const model  = models.find((m) => m.id === p.defaultModel) || models[0];
      if (!model) continue;
      const cost = (inputTokens / 1_000_000) * model.inputPrice
                 + (outputTokens / 1_000_000) * model.outputPrice;
      if (cost < min) { min = cost; id = p.id; }
    }
    return id;
  }, [inputTokens, outputTokens]);

  return (
    <div className="pc4-section container">
      <div className="pc4-section-hd">
        <h2 className="pc4-section-title">
          Cost Estimate by <span style={{ color: "var(--accent)" }}>Provider</span>
        </h2>
        <p className="pc4-section-desc">
          Based on your current token count — pick a model per provider and compare side by side.
        </p>
      </div>
      <div className="pc4-grid">
        {PROVIDERS.map((p) => (
          <ProviderCard
            key={p.id}
            provider={p}
            inputTokens={inputTokens}
            outputTokens={outputTokens}
            isCheapest={p.id === cheapestId}
          />
        ))}
      </div>
    </div>
  );
}
