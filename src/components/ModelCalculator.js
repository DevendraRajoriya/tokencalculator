// Shared model-specific calculator page component
// Used by /gpt-token-calculator, /claude-token-calculator, etc.

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  MODELS,
  getModelById,
  calculateCost,
  formatCost,
  formatNumber,
} from "@/lib/models";
import { countTokens, tokenize, countWords, countCharacters } from "@/lib/tokenizer";

const TOKEN_COLORS = [
  "var(--token-1)", "var(--token-2)", "var(--token-3)", "var(--token-4)",
  "var(--token-5)", "var(--token-6)", "var(--token-7)", "var(--token-8)",
  "var(--token-9)", "var(--token-10)", "var(--token-11)", "var(--token-12)",
];

export default function ModelCalculator({ modelId, relatedModelIds = [] }) {
  const [text, setText] = useState("");
  const [tokenCount, setTokenCount] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [visualizerView, setVisualizerView] = useState("colored");
  const debounceRef = useRef(null);

  const model = getModelById(modelId);
  const cost = calculateCost(tokenCount, model, "input");
  const relatedModels = relatedModelIds.map(getModelById);

  const updateCounts = useCallback(async (inputText) => {
    setWordCount(countWords(inputText));
    setCharCount(countCharacters(inputText));

    if (!inputText || inputText.length === 0) {
      setTokenCount(0);
      setTokens([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const [count, tokenized] = await Promise.all([
        countTokens(inputText, model.encoding),
        tokenize(inputText, model.encoding),
      ]);
      setTokenCount(count);
      setTokens(tokenized);
    } catch (error) {
      setTokenCount(Math.ceil(inputText.length / 4));
      setTokens([]);
    } finally {
      setIsLoading(false);
    }
  }, [model.encoding]);

  const handleTextChange = useCallback((e) => {
    const newText = e.target.value;
    setText(newText);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => updateCounts(newText), 150);
  }, [updateCounts]);

  return (
    <>
      {/* Model Info Banner */}
      <section className="calculator" style={{ marginBottom: "1rem" }}>
        <div style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-primary)",
          borderRadius: "var(--radius-xl)",
          padding: "1.25rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          boxShadow: "var(--shadow-sm)",
        }}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "var(--radius-md)",
            background: model.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 700,
            fontSize: "0.75rem",
            flexShrink: 0,
          }}>
            {model.provider.slice(0, 2).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: "1.125rem", marginBottom: "0.125rem" }}>
              {model.name}
            </div>
            <div style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)" }}>
              {model.description} · {model.provider}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", fontWeight: 600 }}>
              ${model.inputPrice} / ${model.outputPrice}
            </div>
            <div style={{ fontSize: "0.6875rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Input / Output per 1M
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="calculator">
        <div className="calculator__card">
          <div style={{
            padding: "0.75rem 1.25rem",
            borderBottom: "1px solid var(--border-primary)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}>
            <span style={{
              width: "10px", height: "10px", borderRadius: "50%",
              background: model.color, flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.75rem",
              color: "var(--text-muted)", textTransform: "uppercase",
              letterSpacing: "0.08em", fontWeight: 600,
            }}>
              {model.name} · {model.encoding} · Context: {formatNumber(model.contextWindow)} tokens
            </span>
          </div>

          <div className="calculator__input-area">
            <textarea
              id="token-input"
              className="calculator__textarea"
              placeholder={`Type or paste text to count ${model.name} tokens in real time...`}
              value={text}
              onChange={handleTextChange}
              aria-label={`Text input for ${model.name} token counting`}
              spellCheck={false}
            />
          </div>

          <div className="stats-bar">
            <div className="stat-item">
              <span className="stat-item__value stat-item__value--accent">
                {isLoading ? "..." : formatNumber(tokenCount)}
              </span>
              <span className="stat-item__label">Tokens</span>
            </div>
            <div className="stat-item">
              <span className="stat-item__value">{formatNumber(wordCount)}</span>
              <span className="stat-item__label">Words</span>
            </div>
            <div className="stat-item">
              <span className="stat-item__value">{formatNumber(charCount)}</span>
              <span className="stat-item__label">Characters</span>
            </div>
            <div className="stat-item">
              <span className="stat-item__value">
                <span className="cost-highlight">{formatCost(cost)}</span>
              </span>
              <span className="stat-item__label">Est. Cost (Input)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visualizer */}
      <section className="visualizer">
        <div className="visualizer__card">
          <div className="visualizer__header">
            <h2 className="visualizer__title">
              <span className="visualizer__title-icon">🎨</span>
              {model.name} Token Visualizer
            </h2>
            <div className="visualizer__toggle" role="tablist">
              <button
                className={`visualizer__toggle-btn ${visualizerView === "colored" ? "visualizer__toggle-btn--active" : ""}`}
                onClick={() => setVisualizerView("colored")}
              >Colored</button>
              <button
                className={`visualizer__toggle-btn ${visualizerView === "ids" ? "visualizer__toggle-btn--active" : ""}`}
                onClick={() => setVisualizerView("ids")}
              >Token IDs</button>
            </div>
          </div>
          <div className="visualizer__content">
            {tokens.length === 0 ? (
              <div className="visualizer__empty">
                <span className="visualizer__empty-icon">⬆️</span>
                <span>Type or paste text above to see {model.name} tokenization</span>
              </div>
            ) : (
              tokens.map((token, index) => (
                <span
                  key={token.id}
                  className="token-chip"
                  style={{ backgroundColor: TOKEN_COLORS[index % TOKEN_COLORS.length] }}
                >
                  {(visualizerView === "ids" ? `[${token.tokenId}]` : token.text)
                    .replace(/ /g, "\u00B7")
                    .replace(/\n/g, "↵\n")}
                  <span className="token-chip__tooltip">
                    Token #{index + 1} · ID: {token.tokenId}
                  </span>
                </span>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Pricing Comparison with Related Models */}
      {relatedModels.length > 0 && (
        <section className="pricing-section">
          <h2 className="pricing-section__title">
            📊 Compare {model.name} Pricing
          </h2>
          <div className="pricing-table-wrap">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Input / 1M tokens</th>
                  <th>Output / 1M tokens</th>
                  <th>Context Window</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: "var(--accent-subtle)" }}>
                  <td>
                    <div className="pricing-table__model">
                      <span className="pricing-table__dot" style={{ backgroundColor: model.color }} />
                      <strong>{model.name}</strong>
                    </div>
                  </td>
                  <td className="pricing-table__price">${model.inputPrice.toFixed(2)}</td>
                  <td className="pricing-table__price">${model.outputPrice.toFixed(2)}</td>
                  <td className="pricing-table__context">{formatNumber(model.contextWindow)}</td>
                </tr>
                {relatedModels.map((rm) => (
                  <tr key={rm.id}>
                    <td>
                      <div className="pricing-table__model">
                        <span className="pricing-table__dot" style={{ backgroundColor: rm.color }} />
                        {rm.name}
                      </div>
                    </td>
                    <td className="pricing-table__price">${rm.inputPrice.toFixed(2)}</td>
                    <td className="pricing-table__price">${rm.outputPrice.toFixed(2)}</td>
                    <td className="pricing-table__context">{formatNumber(rm.contextWindow)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
}
