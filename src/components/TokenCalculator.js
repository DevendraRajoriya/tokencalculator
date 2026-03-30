"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  MODELS,
  DEFAULT_MODEL_ID,
  getModelById,
  calculateCost,
  formatCost,
  formatNumber,
} from "@/lib/models";
import { countTokens, tokenize, countWords, countCharacters } from "@/lib/tokenizer";

// Token color palette
const TOKEN_COLORS = [
  "var(--token-1)",
  "var(--token-2)",
  "var(--token-3)",
  "var(--token-4)",
  "var(--token-5)",
  "var(--token-6)",
  "var(--token-7)",
  "var(--token-8)",
  "var(--token-9)",
  "var(--token-10)",
  "var(--token-11)",
  "var(--token-12)",
];

export default function TokenCalculator() {
  const [text, setText] = useState("");
  const [selectedModelId, setSelectedModelId] = useState(DEFAULT_MODEL_ID);
  const [tokenCount, setTokenCount] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [visualizerView, setVisualizerView] = useState("colored"); // colored | ids
  const debounceRef = useRef(null);
  const initialLoadRef = useRef(false);

  const selectedModel = getModelById(selectedModelId);
  const cost = calculateCost(tokenCount, selectedModel, "input");

  // Pre-load tokenizer on mount
  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      // Warm up the encoder by doing a small tokenization
      countTokens("hello", selectedModel.encoding).catch(() => {});
    }
  }, []);

  // Real-time tokenization with debounce
  const updateCounts = useCallback(
    async (inputText, modelId) => {
      const model = getModelById(modelId);
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
        console.error("Tokenization error:", error);
        setTokenCount(Math.ceil(inputText.length / 4));
        setTokens([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Handle text change with debounce
  const handleTextChange = useCallback(
    (e) => {
      const newText = e.target.value;
      setText(newText);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        updateCounts(newText, selectedModelId);
      }, 150);
    },
    [selectedModelId, updateCounts]
  );

  // Handle model change
  const handleModelChange = useCallback(
    (modelId) => {
      setSelectedModelId(modelId);
      if (text) {
        updateCounts(text, modelId);
      }
    },
    [text, updateCounts]
  );

  return (
    <>
      {/* Calculator Card */}
      <section className="calculator" aria-label="Token Calculator">
        <div className="calculator__card">
          {/* Model Selector */}
          <div className="model-selector" role="radiogroup" aria-label="Select AI model">
            <span className="model-selector__label">Model</span>
            {MODELS.map((model) => (
              <button
                key={model.id}
                className={`model-btn ${
                  selectedModelId === model.id ? "model-btn--active" : ""
                }`}
                onClick={() => handleModelChange(model.id)}
                role="radio"
                aria-checked={selectedModelId === model.id}
                title={`${model.name} by ${model.provider}`}
              >
                <span
                  className="model-btn__dot"
                  style={{ backgroundColor: model.color }}
                />
                {model.name}
              </button>
            ))}
          </div>

          {/* Text Input */}
          <div className="calculator__input-area">
            <textarea
              id="token-input"
              className="calculator__textarea"
              placeholder="Start typing or paste your text here to count tokens in real time..."
              value={text}
              onChange={handleTextChange}
              aria-label="Text input for token counting"
              spellCheck={false}
            />
          </div>

          {/* Stats Bar */}
          <div className="stats-bar" aria-label="Token statistics">
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

      {/* Token Visualizer */}
      <section className="visualizer" aria-label="Token Visualizer">
        <div className="visualizer__card">
          <div className="visualizer__header">
            <h2 className="visualizer__title">
              <span className="visualizer__title-icon">🎨</span>
              Token Visualizer
            </h2>
            <div className="visualizer__toggle" role="tablist">
              <button
                className={`visualizer__toggle-btn ${
                  visualizerView === "colored"
                    ? "visualizer__toggle-btn--active"
                    : ""
                }`}
                onClick={() => setVisualizerView("colored")}
                role="tab"
                aria-selected={visualizerView === "colored"}
              >
                Colored
              </button>
              <button
                className={`visualizer__toggle-btn ${
                  visualizerView === "ids"
                    ? "visualizer__toggle-btn--active"
                    : ""
                }`}
                onClick={() => setVisualizerView("ids")}
                role="tab"
                aria-selected={visualizerView === "ids"}
              >
                Token IDs
              </button>
            </div>
          </div>

          <div className="visualizer__content" role="tabpanel">
            {tokens.length === 0 ? (
              <div className="visualizer__empty">
                <span className="visualizer__empty-icon">⬆️</span>
                <span>Type or paste text above to see how it tokenizes</span>
              </div>
            ) : (
              tokens.map((token, index) => {
                const colorIndex = index % TOKEN_COLORS.length;
                const displayText =
                  visualizerView === "ids"
                    ? `[${token.tokenId}]`
                    : token.text;

                return (
                  <span
                    key={token.id}
                    className="token-chip"
                    style={{
                      backgroundColor: TOKEN_COLORS[colorIndex],
                    }}
                    data-token-id={token.tokenId}
                  >
                    {displayText.replace(/ /g, "\u00B7").replace(/\n/g, "↵\n")}
                    <span className="token-chip__tooltip">
                      Token #{index + 1} · ID: {token.tokenId}
                    </span>
                  </span>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="pricing-section" aria-label="Model Pricing">
        <h2 className="pricing-section__title">
          💰 LLM API Pricing Comparison
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
              {MODELS.map((model) => (
                <tr key={model.id}>
                  <td>
                    <div className="pricing-table__model">
                      <span
                        className="pricing-table__dot"
                        style={{ backgroundColor: model.color }}
                      />
                      {model.name}
                    </div>
                  </td>
                  <td className="pricing-table__price">
                    ${model.inputPrice.toFixed(2)}
                  </td>
                  <td className="pricing-table__price">
                    ${model.outputPrice.toFixed(2)}
                  </td>
                  <td className="pricing-table__context">
                    {formatNumber(model.contextWindow)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
