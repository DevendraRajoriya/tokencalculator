"use client";

import { useState, useMemo } from "react";
import { MODELS, formatNumber } from "@/lib/models";

const PROVIDERS = [
  { key: "all", label: "All Models" },
  { key: "openai", label: "OpenAI", color: "var(--green)" },
  { key: "anthropic", label: "Anthropic", color: "var(--amber)" },
  { key: "google", label: "Google", color: "var(--blue)" },
  { key: "deepseek", label: "DeepSeek", color: "var(--purple)" },
  { key: "meta", label: "Meta", color: "var(--indigo)" },
  { key: "mistral", label: "Mistral", color: "#EE6C4D" },
];

export default function PricingTable() {
  const [sortCol, setSortCol] = useState("input");
  const [sortDir, setSortDir] = useState("asc");
  const [filterProv, setFilterProv] = useState("all");

  const handleSort = (col) => {
    if (sortCol === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  const filtered = filterProv === "all"
    ? MODELS
    : MODELS.filter(m => m.provider.toLowerCase().includes(filterProv));

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let valA, valB;
      if (sortCol === "input") { valA = a.inputPrice; valB = b.inputPrice; }
      else if (sortCol === "output") { valA = a.outputPrice; valB = b.outputPrice; }
      else if (sortCol === "context") { valA = a.contextWindow; valB = b.contextWindow; }
      else if (sortCol === "ratio") { valA = a.outputPrice / a.inputPrice; valB = b.outputPrice / b.inputPrice; }
      else { valA = a.name; valB = b.name; }

      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortCol, sortDir]);

  const cheapestInput = Math.min(...MODELS.map(m => m.inputPrice));
  const cheapestOutput = Math.min(...MODELS.map(m => m.outputPrice));
  const maxInput = Math.max(...MODELS.map(m => m.inputPrice));
  const maxContext = Math.max(...MODELS.map(m => m.contextWindow));

  const colIcon = (col) => {
    if (sortCol !== col) return <span className="lpc-sort-icon">⇅</span>;
    return <span className="lpc-sort-icon lpc-sort-icon--active">{sortDir === "asc" ? "↑" : "↓"}</span>;
  };

  const handleDownloadCSV = () => {
    const header = "Model,Provider,Input $/1M,Output $/1M,Context Window\n";
    const rows = sorted.map(m =>
      `"${m.name}","${m.provider}",${m.inputPrice},${m.outputPrice},${m.contextWindow}`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "llm-pricing-comparison-2026.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatPrice = (price) => {
    if (price < 0.1) return `$${price.toFixed(3)}`;
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="lpc-table-wrap">
      {/* Header & Filters */}
      <div className="lpc-table-header">
        <div className="lpc-table-header__top">
          <div className="lpc-table-header__title-row">
            <h2 className="lpc-table-header__title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
              API Pricing Index
            </h2>
          </div>
          <p className="lpc-table-header__desc">
            {sorted.length} model{sorted.length !== 1 ? 's' : ''} · Prices per 1 million tokens · Click headers to sort
          </p>
        </div>

        {/* Provider Filter Pills */}
        <div className="lpc-filter-pills">
          {PROVIDERS.map(p => (
            <button
              key={p.key}
              className={`lpc-filter-pill ${filterProv === p.key ? 'lpc-filter-pill--active' : ''}`}
              onClick={() => setFilterProv(p.key)}
              style={filterProv === p.key && p.color ? { '--pill-color': p.color } : {}}
            >
              {p.color && <span className="lpc-filter-pill__dot" style={{ background: p.color }} />}
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="lpc-desktop-table">
        <div className="lpc-table-scroll">
          <table className="lpc-table">
            <thead>
              <tr>
                <th className="lpc-th lpc-th--model" onClick={() => handleSort("name")}>
                  Model {colIcon("name")}
                </th>
                <th className="lpc-th lpc-th--num" onClick={() => handleSort("input")}>
                  Input / 1M {colIcon("input")}
                </th>
                <th className="lpc-th lpc-th--num" onClick={() => handleSort("output")}>
                  Output / 1M {colIcon("output")}
                </th>
                <th className="lpc-th lpc-th--num" onClick={() => handleSort("ratio")}>
                  Ratio {colIcon("ratio")}
                </th>
                <th className="lpc-th lpc-th--ctx" onClick={() => handleSort("context")}>
                  Context {colIcon("context")}
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(model => {
                const ratio = (model.outputPrice / model.inputPrice).toFixed(1);
                const inputBarPct = Math.max(3, (model.inputPrice / maxInput) * 100);
                const isLowest = model.inputPrice === cheapestInput;
                const isLowestOut = model.outputPrice === cheapestOutput;
                const isBigCtx = model.contextWindow === maxContext;

                return (
                  <tr key={model.id} className="lpc-row">
                    <td className="lpc-td lpc-td--model">
                      <span className="lpc-model-dot" style={{ background: model.color }} />
                      <div className="lpc-model-info">
                        <span className="lpc-model-name">{model.name}</span>
                        <span className="lpc-model-provider">{model.provider}</span>
                      </div>
                    </td>
                    <td className="lpc-td lpc-td--num">
                      <div className="lpc-price-cell">
                        <span className={`lpc-price ${isLowest ? 'lpc-price--cheapest' : model.inputPrice >= 5 ? 'lpc-price--expensive' : ''}`}>
                          {formatPrice(model.inputPrice)}
                        </span>
                        <div className="lpc-price-bar">
                          <div className="lpc-price-bar__fill" style={{
                            width: `${inputBarPct}%`,
                            background: model.inputPrice <= 0.5 ? 'var(--green)' : model.inputPrice >= 5 ? 'var(--amber)' : 'var(--accent)'
                          }} />
                        </div>
                      </div>
                      {isLowest && <span className="lpc-badge lpc-badge--green">Cheapest</span>}
                    </td>
                    <td className="lpc-td lpc-td--num">
                      <span className={`lpc-price ${isLowestOut ? 'lpc-price--cheapest' : ''}`}>
                        {formatPrice(model.outputPrice)}
                      </span>
                    </td>
                    <td className="lpc-td lpc-td--num">
                      <span className="lpc-ratio">{ratio}×</span>
                    </td>
                    <td className="lpc-td lpc-td--ctx">
                      <div className="lpc-ctx-cell">
                        <span className="lpc-ctx-val">{formatNumber(model.contextWindow)}</span>
                        <div className="lpc-ctx-bar">
                          <div className="lpc-ctx-bar__fill" style={{ width: `${(model.contextWindow / maxContext) * 100}%` }} />
                        </div>
                      </div>
                      {isBigCtx && <span className="lpc-badge lpc-badge--amber">Max</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lpc-mobile-cards">
        {sorted.map(model => {
          const ratio = (model.outputPrice / model.inputPrice).toFixed(1);
          const isLowest = model.inputPrice === cheapestInput;
          return (
            <div key={model.id} className="lpc-mcard">
              <div className="lpc-mcard__header">
                <span className="lpc-model-dot" style={{ background: model.color }} />
                <div className="lpc-mcard__name-col">
                  <span className="lpc-mcard__name">{model.name}</span>
                  <span className="lpc-mcard__prov">{model.provider}</span>
                </div>
                {isLowest && <span className="lpc-badge lpc-badge--green">Cheapest</span>}
              </div>
              <div className="lpc-mcard__grid">
                <div className="lpc-mcard__stat">
                  <span className="lpc-mcard__label">Input</span>
                  <span className={`lpc-mcard__val ${model.inputPrice <= 0.5 ? 'lpc-mcard__val--green' : ''}`}>
                    {formatPrice(model.inputPrice)}
                  </span>
                  <span className="lpc-mcard__unit">/1M tokens</span>
                </div>
                <div className="lpc-mcard__stat">
                  <span className="lpc-mcard__label">Output</span>
                  <span className="lpc-mcard__val">{formatPrice(model.outputPrice)}</span>
                  <span className="lpc-mcard__unit">/1M tokens</span>
                </div>
                <div className="lpc-mcard__stat">
                  <span className="lpc-mcard__label">Ratio</span>
                  <span className="lpc-mcard__val">{ratio}×</span>
                </div>
                <div className="lpc-mcard__stat">
                  <span className="lpc-mcard__label">Context</span>
                  <span className="lpc-mcard__val">{formatNumber(model.contextWindow)}</span>
                  <span className="lpc-mcard__unit">tokens</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="lpc-table-footer">
        <div className="lpc-table-footer__legend">
          <span><span className="lpc-legend-swatch" style={{ background: 'var(--green)' }} /> ≤ $0.50 input</span>
          <span><span className="lpc-legend-swatch" style={{ background: 'var(--accent)' }} /> Mid-range</span>
          <span><span className="lpc-legend-swatch" style={{ background: 'var(--amber)' }} /> ≥ $5.00 input</span>
        </div>
        <div className="lpc-table-footer__actions">
          <a href="/" className="btn btn--outline lpc-footer-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
            Try Calculator
          </a>
          <button className="btn btn--outline lpc-footer-btn" onClick={handleDownloadCSV}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Download CSV
          </button>
        </div>
      </div>
    </div>
  );
}
