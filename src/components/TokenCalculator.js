/* eslint-disable react/no-unescaped-entities */
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
import { safeCopyText, safePasteText, safeShare } from "@/lib/clipboard";
import Papa from "papaparse";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CostProjector from "./CostProjector";
import ProviderCostCards from "./ProviderCostCards";

// Group models by provider
const PROVIDERS = [
  { id: "openai", name: "OpenAI", color: "var(--green)", defaultModel: "gpt-4o" },
  { id: "anthropic", name: "Anthropic", color: "var(--amber)", defaultModel: "claude-sonnet-4-6" },
  { id: "google", name: "Google", color: "var(--blue)", defaultModel: "gemini-1-5-pro" },
  { id: "deepseek", name: "DeepSeek", color: "var(--purple)", defaultModel: "deepseek-v3" },
  { id: "meta", name: "Meta", color: "var(--indigo)", defaultModel: "llama-3-1-70b" },
  { id: "mistral", name: "Mistral", color: "#EE6C4D", defaultModel: "mistral-small" },
];

export default function TokenCalculator() {
  const [text, setText] = useState("");

  const [selectedModelId, setSelectedModelId] = useState(DEFAULT_MODEL_ID);

  // Track active model per provider for the dropdowns
  const [providerModels, setProviderModels] = useState(() => {
    const defaults = {};
    PROVIDERS.forEach(p => {
      const firstModel = MODELS.find(m => m.provider.toLowerCase().includes(p.name.toLowerCase()));
      defaults[p.id] = firstModel ? firstModel.id : p.defaultModel;
    });
    return defaults;
  });

  const [tokenCount, setTokenCount] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const [visualizerView, setVisualizerView] = useState("colored");
  const [isDragging, setIsDragging] = useState(false);
  const [fileStatus, setFileStatus] = useState(null);
  const [isFileLoading, setIsFileLoading] = useState(false);
  const debounceRef = useRef(null);
  const initialLoadRef = useRef(false);
  const fileInputRef = useRef(null);

  const selectedModel = getModelById(selectedModelId);

  const inputCost = calculateCost(tokenCount, selectedModel, "input");
  const outputTokensCount = Math.floor(tokenCount * 0.5);
  const outputCost = calculateCost(outputTokensCount, selectedModel, "output");
  const totalCost = inputCost + outputCost;

  const contextPercent = Math.min(100, (tokenCount / selectedModel.contextWindow) * 100);

  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      countTokens("hello", selectedModel.encoding).catch(() => { });

      const urlParams = new URLParams(window.location?.search || "");
      const textParam = urlParams.get("text");
      const modelParam = urlParams.get("model");

      if (textParam) {
        setText(textParam);
        setTimeout(() => updateCounts(textParam, modelParam || selectedModelId), 100);
      } else {
        const example = "The quick brown fox jumps over the lazy dog. 🦊";
        setText(example);
        setTimeout(() => updateCounts(example, selectedModelId), 100);
      }

      if (modelParam && getModelById(modelParam)) {
        setSelectedModelId(modelParam);
        const p = getModelById(modelParam).provider;
        const pid = PROVIDERS.find(x => p.toLowerCase().includes(x.name.toLowerCase()))?.id;
        if (pid) setProviderModels(prev => ({ ...prev, [pid]: modelParam }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateCounts = useCallback(async (inputText, modelId) => {
    const model = getModelById(modelId);
    setWordCount(countWords(inputText));
    setCharCount(countCharacters(inputText));

    if (!inputText || inputText.length === 0) {
      setTokenCount(0);
      setTokens([]);
      return;
    }

    try {
      const [count, tokenized] = await Promise.all([
        countTokens(inputText, model.encoding),
        tokenize(inputText, model.encoding),
      ]);
      setTokenCount(count);
      setTokens(tokenized);
    } catch (e) {
      setTokenCount(Math.ceil(inputText.length / 4));
      setTokens([]);
    }
  }, []);

  const handleTextChange = useCallback((e) => {
    const newText = e.target.value;
    setText(newText);
    setFileStatus(null);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateCounts(newText, selectedModelId);
    }, 150);
  }, [selectedModelId, updateCounts]);

  const loadFileText = useCallback((extractedText, fileName, fileType) => {
    setText(extractedText);
    setFileStatus({ name: fileName, type: fileType, error: null });
    updateCounts(extractedText, selectedModelId);
  }, [selectedModelId, updateCounts]);

  const parsePDF = useCallback(async (file) => {
    setIsFileLoading(true);
    try {
      const pdfjsLib = await import("pdfjs-dist/build/pdf.mjs");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
      let allPageText = "";
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent({ includeMarkedContent: false });
        const rawItems = content.items.filter((item) => "str" in item);
        if (rawItems.length === 0) continue;
        const heights = rawItems.map((i) => Math.abs(i.transform[3])).filter((h) => h > 0);
        const avgHeight = heights.length ? heights.reduce((a, b) => a + b, 0) / heights.length : 10;
        const lineThreshold = avgHeight * 0.5;
        const sorted = [...rawItems].sort((a, b) => {
          const yA = a.transform[5], yB = b.transform[5];
          if (Math.abs(yB - yA) > lineThreshold) return yB - yA;
          return a.transform[4] - b.transform[4];
        });
        let pageText = "", prevItem = null;
        for (const item of sorted) {
          if (!item.str) continue;
          if (prevItem !== null) {
            const yDiff = Math.abs(item.transform[5] - prevItem.transform[5]);
            if (yDiff > lineThreshold) {
              pageText += "\n";
            } else {
              const gap = item.transform[4] - (prevItem.transform[4] + (prevItem.width || 0));
              if (gap > avgHeight * 0.15) pageText += " ";
              else if (prevItem.hasEOL) pageText += "\n";
            }
          }
          pageText += item.str;
          prevItem = item;
        }
        if (prevItem?.hasEOL) pageText += "\n";
        allPageText += pageText.trimEnd() + "\n\n";
      }
      const cleaned = allPageText.replace(/\n{3,}/g, "\n\n").trim();
      if (!cleaned) setFileStatus({ name: file.name, type: "PDF", error: "No extractable text found. May be a scanned PDF." });
      else loadFileText(cleaned, file.name, "PDF");
    } catch (err) {
      console.error("PDF parse error:", err);
      setFileStatus({ name: file.name, type: "PDF", error: `Parse failed: ${err?.message || "Unknown error"}` });
    } finally {
      setIsFileLoading(false);
    }
  }, [loadFileText]);

  const parseCSV = useCallback((file) => {
    setIsFileLoading(true);
    Papa.parse(file, {
      complete: (result) => {
        const csvText = result.data.map((row) => row.join(", ")).join("\n");
        loadFileText(csvText, file.name, "CSV");
        setIsFileLoading(false);
      },
      error: () => {
        setFileStatus({ name: file.name, type: "CSV", error: "Failed to parse CSV." });
        setIsFileLoading(false);
      },
    });
  }, [loadFileText]);

  const processFile = useCallback((file) => {
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    if (ext === "pdf" || file.type === "application/pdf") parsePDF(file);
    else if (ext === "csv" || file.type === "text/csv") parseCSV(file);
    else if (ext === "txt" || file.type.startsWith("text/")) {
      const reader = new FileReader();
      reader.onload = (e) => loadFileText(e.target.result, file.name, "TXT");
      reader.readAsText(file);
    } else {
      setFileStatus({ name: file.name, type: ext.toUpperCase(), error: "Unsupported file. Use PDF, CSV, or TXT." });
    }
  }, [parsePDF, parseCSV, loadFileText]);

  const handleDragOver = useCallback((e) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e) => { e.preventDefault(); setIsDragging(false); }, []);
  const handleDrop = useCallback((e) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }, [processFile]);
  const handleFileInputChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  }, [processFile]);

  const handleProviderSelect = (providerId) => {
    const modelToSelect = providerModels[providerId];
    setSelectedModelId(modelToSelect);
    updateCounts(text, modelToSelect);
  };

  const handleProviderModelChange = (e, providerId) => {
    e.stopPropagation();
    const newModelId = e.target.value;
    setProviderModels(prev => ({ ...prev, [providerId]: newModelId }));
    setSelectedModelId(newModelId);
    updateCounts(text, newModelId);
  };

  const handleShare = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("text", text);
    url.searchParams.set("model", selectedModelId);
    const result = await safeShare({
      title: "Token Calculator",
      text: `${formatNumber(tokenCount)} tokens — check it out!`,
      url: url.toString(),
    });
    if (result.method !== "cancelled") {
      toast.success(result.method === "native" ? "Shared!" : "Link copied!");
    }
  };

  const handleCopyStats = async () => {
    const stats = `${formatNumber(tokenCount)} tokens · $${inputCost.toFixed(6)} · ${selectedModel.name}`;
    await safeCopyText(stats);
    toast.success("Stats copied!");
  };

  const handleClear = () => {
    setText('');
    updateCounts('', selectedModelId);
  };

  const handlePaste = async () => {
    const clipText = await safePasteText();
    if (clipText) {
      setText(clipText);
      updateCounts(clipText, selectedModelId);
    } else {
      toast.info("Paste not available — use Ctrl+V / long-press in the text area.");
    }
  };

  // Safe wrapper for URLSearchParams across browsers/environments
  function URLParams(search) {
    if (typeof URLSearchParams !== "undefined") return new URLSearchParams(search);
    return { get: () => null };
  }

  const activeProviderId = PROVIDERS.find(p => selectedModel.provider.toLowerCase().includes(p.name.toLowerCase()))?.id;

  const formatCostValue = (cost) => {
    if (cost === 0) return '$0.00';
    if (cost < 0.001) return '< $0.001';
    if (cost < 0.01) return `$${cost.toFixed(4)}`;
    return `$${cost.toFixed(4)}`;
  };

  return (
    <>
      <div className="calculator container">
        <div className="calculator__card">

          {/* Mobile Model Selector */}
          <div className="model-selector-mobile">
            <select
              value={selectedModelId}
              onChange={(e) => {
                const newModelId = e.target.value;
                setSelectedModelId(newModelId);
                const p = getModelById(newModelId).provider;
                const pid = PROVIDERS.find(x => p.toLowerCase().includes(x.name.toLowerCase()))?.id;
                if (pid) setProviderModels(prev => ({ ...prev, [pid]: newModelId }));
                updateCounts(text, newModelId);
              }}
            >
              <option value="" disabled>Select Model...</option>
              {PROVIDERS.map(provider => (
                <optgroup key={provider.id} label={provider.name}>
                  {MODELS.filter(m => m.provider.toLowerCase().includes(provider.name.toLowerCase())).map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            <div className="model-selector-mobile__icon">▾</div>
          </div>

          {/* Desktop Provider Grid */}
          <div className="model-selector model-selector-desktop">
            {PROVIDERS.map(provider => {
              const isActive = activeProviderId === provider.id;
              const provModels = MODELS.filter(m => m.provider.toLowerCase().includes(provider.name.toLowerCase()));
              return (
                <div
                  key={provider.id}
                  className={`model-card ${isActive ? 'active' : ''}`}
                  data-provider={provider.id}
                  onClick={() => handleProviderSelect(provider.id)}
                >
                  <div className="model-card__provider">
                    {provider.name}
                  </div>
                  <div className="model-card__name">
                    <select
                      value={providerModels[provider.id]}
                      onChange={(e) => handleProviderModelChange(e, provider.id)}
                      style={{ background: 'transparent', border: 'none', color: 'inherit', width: '100%', outline: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, appearance: 'none' }}
                      onClick={(e) => isActive && e.stopPropagation()}
                    >
                      {provModels.map(m => <option key={m.id} value={m.id} style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>{m.name.substring(0, 20)} {m.name.length > 20 ? '...' : ''}</option>)}
                    </select>
                    <span style={{ fontSize: '10px', opacity: 0.6, pointerEvents: 'none' }}>▾</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="calculator__input-area"
            style={{ position: 'relative' }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Drag overlay */}
            {isDragging && (
              <div style={{
                position: 'absolute', inset: 0, zIndex: 10,
                background: 'rgba(255,72,0,0.08)',
                border: '2px dashed var(--accent)',
                borderRadius: 'var(--radius-md)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>📄</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent)' }}>Drop to extract text</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>PDF, CSV, or TXT</div>
                </div>
              </div>
            )}

            {/* File status badge */}
            {fileStatus && (
              <div style={{
                position: 'absolute', top: '8px', right: '8px', zIndex: 5,
                display: 'flex', alignItems: 'center', gap: '6px',
                background: fileStatus.error ? 'rgba(239,68,68,0.12)' : 'rgba(0,196,125,0.12)',
                border: `1px solid ${fileStatus.error ? 'rgba(239,68,68,0.3)' : 'rgba(0,196,125,0.3)'}`,
                borderRadius: '6px', padding: '4px 10px',
                fontSize: '0.6875rem', fontFamily: 'var(--font-mono)',
                color: fileStatus.error ? '#ef4444' : 'var(--green)',
                maxWidth: '240px',
              }}>
                <span>{fileStatus.error ? '⚠' : '✓'}</span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {fileStatus.error || `${fileStatus.type}: ${fileStatus.name}`}
                </span>
                <button
                  onClick={() => { setFileStatus(null); setText(''); updateCounts('', selectedModelId); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: '0 0 0 2px', lineHeight: 1 }}
                  aria-label="Clear file"
                >✕</button>
              </div>
            )}

            {/* Loading spinner */}
            {isFileLoading && (
              <div style={{
                position: 'absolute', inset: 0, zIndex: 8,
                background: 'rgba(0,0,0,0.45)', borderRadius: 'var(--radius-md)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem',
              }}>
                <div className="file-spinner" />
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Extracting text…</span>
              </div>
            )}

            <textarea
              className="calculator__textarea"
              value={text}
              onChange={handleTextChange}
              placeholder="Start typing, paste text, or drop a PDF / CSV / TXT file…"
              spellCheck={false}
            />

            <div className="textarea-actions">
              <div className="textarea-actions-left">
                <button className="textarea-action-btn" onClick={handleClear} aria-label="Clear text">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" /></svg>
                  Clear
                </button>
                <button className="textarea-action-btn" onClick={handlePaste} aria-label="Paste text">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg>
                  Paste
                </button>
                <button className="textarea-action-btn" onClick={() => { setText("Explain quantum computing in simple terms."); updateCounts("Explain quantum computing in simple terms.", selectedModelId); }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
                  Example
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.csv,.txt,text/*,application/pdf"
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange}
                />
                <button className="textarea-action-btn" onClick={() => fileInputRef.current?.click()} aria-label="Upload file">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  Upload
                </button>
              </div>
              <div className="char-counter">
                {text.length} chars
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-item__value stat-item__value--accent">{tokenCount.toLocaleString()}</div>
              <div className="stat-item__label">Tokens</div>
            </div>
            <div className="stat-item">
              <div className="stat-item__value">{wordCount.toLocaleString()}</div>
              <div className="stat-item__label">Words</div>
            </div>
            <div className="stat-item">
              <div className="stat-item__value">{charCount.toLocaleString()}</div>
              <div className="stat-item__label">Chars</div>
            </div>
            <div className="stat-item">
              <div className="stat-item__value stat-item__value--small">{formatCostValue(inputCost)}</div>
              <div className="stat-item__label">Input Cost</div>
            </div>
          </div>

          {/* Context Window & Totals */}
          <div className="calculator__bottom-row">
            <div className="context-section">
              <div className="context-bar__track">
                <div className={`context-bar__fill ${contextPercent > 90 ? 'context-bar__fill--danger' : contextPercent > 70 ? 'context-bar__fill--warning' : ''}`} style={{ width: `${contextPercent}%` }} />
              </div>
              <div className="context-bar__label">
                <span>Context: <span style={{ color: 'var(--text-primary)' }}>{formatNumber(tokenCount)}</span> / {formatNumber(selectedModel.contextWindow)} tokens</span>
                <span className="context-bar__pct">({contextPercent.toFixed(1)}%)</span>
              </div>
            </div>
            <div className="cost-breakdown">
              <div className="cost-breakdown__line">
                <span className="cost-breakdown__label">INPUT</span>
                <span className="cost-breakdown__value">{inputCost > 0 ? `$${inputCost.toFixed(5)}` : '$0.0000'}</span>
              </div>
              <div className="cost-breakdown__line">
                <span className="cost-breakdown__label">OUTPUT</span>
                <span className="cost-breakdown__value">+{outputCost > 0 ? `$${outputCost.toFixed(5)}` : '$0.0000'} (EST)</span>
              </div>
              <div className="cost-breakdown__line cost-breakdown__line--total">
                <span className="cost-breakdown__label">TOTAL</span>
                <span className="cost-breakdown__value">${totalCost > 0 ? totalCost.toFixed(5) : '0.00000'}</span>
              </div>
            </div>
          </div>

          <div className="calculator__actions">
            <button className="btn-ghost" onClick={handleCopyStats}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copy Stats
            </button>
            <button className="btn-primary" onClick={handleShare}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              Share Link
            </button>
          </div>
        </div>

        {/* Token Visualizer — Detached Card */}
        <div className="calculator__card" style={{ marginTop: '1.5rem', background: 'var(--bg-tertiary)' }}>
          <div>
            <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
              <div className="visualizer__title" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                <span className="visualizer__title-icon" style={{ fontSize: '13px' }}>🎨</span>
                <span>Token Visualizer</span>
              </div>
              <div className="visualizer__toggle">
                <button
                  className={`visualizer__toggle-btn ${visualizerView === 'colored' ? 'visualizer__toggle-btn--active' : ''}`}
                  onClick={() => setVisualizerView('colored')}
                >Colored</button>
                <button
                  className={`visualizer__toggle-btn ${visualizerView === 'ids' ? 'visualizer__toggle-btn--active' : ''}`}
                  onClick={() => setVisualizerView('ids')}
                >Token IDs</button>
              </div>
            </div>
            <div style={{ minHeight: '60px', maxHeight: '180px', overflowY: 'auto', padding: '0 1rem 0.75rem' }}>
              {tokens.length === 0 ? (
                <div style={{ color: 'var(--text-tertiary)', fontSize: '13px', fontStyle: 'italic', padding: '12px 0' }}>Type text above to see tokenization…</div>
              ) : (
                visualizerView === 'ids' ? (
                  <div className="token-id-container" style={{ padding: '0.75rem', fontSize: '0.8125rem' }}>
                    <span className="token-id-bracket">[</span>
                    <div className="token-id-list" style={{ paddingLeft: '1rem', fontSize: '0.8125rem', lineHeight: 1.8 }}>
                      {tokens.map((t, i) => {
                        let clsColor = "token-id-color--word";
                        if (/^\p{Emoji}/u.test(t.text)) clsColor = "token-id-color--emoji";
                        else if (/^[.,!?;:'"()[\]{}\-–—]/.test(t.text)) clsColor = "token-id-color--punct";
                        else if (/^\s+$/.test(t.text)) clsColor = "token-id-color--space";
                        else if (t.text.startsWith('Ġ') || t.text.startsWith('▁') || !t.text.match(/^[a-zA-Z0-9\s]+$/)) clsColor = "token-id-color--subword";
                        return (
                          <span key={i} className={`token-id-number ${clsColor}`}>
                            {t.tokenId}<span className="token-id-comma">{i < tokens.length - 1 ? ',' : ''}</span>
                          </span>
                        );
                      })}
                    </div>
                    <span className="token-id-bracket">]</span>
                  </div>
                ) : (
                  tokens.map((t, i) => {
                    let cls = "token-chip--word";
                    if (/^\p{Emoji}/u.test(t.text)) cls = "token-chip--emoji";
                    else if (/^[.,!?;:'"()[\]{}\-–—]/.test(t.text)) cls = "token-chip--punct";
                    else if (/^\s+$/.test(t.text)) cls = "token-chip--space";
                    else if (t.text.startsWith('Ġ') || t.text.startsWith('▁') || !t.text.match(/^[a-zA-Z0-9\s]+$/)) cls = "token-chip--subword";
                    return (
                      <div key={i} data-type={cls === 'token-chip--emoji' ? 'emoji' : ''} className={`token-chip ${cls}`}>
                        {t.text.replace(/\n/g, "↵\n")}
                        <div className="token-chip__tooltip">
                          ID: {t.tokenId} | &apos;{t.text}&apos;
                        </div>
                      </div>
                    );
                  })
                )
              )}
            </div>
            {tokens.length > 0 && (
              <div style={{ padding: '0.5rem 1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.6875rem', flexWrap: 'wrap', color: 'var(--text-muted)' }}>
                <span>Legend:</span>
                <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}><span style={{ width: '7px', height: '7px', background: 'var(--green)', borderRadius: '2px', display: 'inline-block' }} /> Word</span>
                <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}><span style={{ width: '7px', height: '7px', background: 'var(--amber)', borderRadius: '2px', display: 'inline-block' }} /> Punct</span>
                <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}><span style={{ width: '7px', height: '7px', background: 'var(--purple)', borderRadius: '2px', display: 'inline-block' }} /> Subword</span>
                <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}><span style={{ width: '7px', height: '7px', background: 'var(--text-tertiary)', borderRadius: '2px', display: 'inline-block' }} /> Space</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Provider Cost Cards — below token visualizer */}
      <ProviderCostCards inputTokens={tokenCount} outputTokens={outputTokensCount} />

      {/* Cost Projector */}
      <div className="container">
        <CostProjector inputTokens={tokenCount} />
      </div>

      <ToastContainer theme="dark" />
    </>
  );
}
