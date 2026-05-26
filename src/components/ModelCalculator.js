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
import Papa from "papaparse";

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
  const [isDragging, setIsDragging] = useState(false);
  const [fileStatus, setFileStatus] = useState(null); // { name, type, error }
  const [isFileLoading, setIsFileLoading] = useState(false);
  const debounceRef = useRef(null);
  const fileInputRef = useRef(null);

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
    setFileStatus(null);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => updateCounts(newText), 150);
  }, [updateCounts]);

  const loadTextIntoCalculator = useCallback((extractedText, fileName, fileType) => {
    setText(extractedText);
    setFileStatus({ name: fileName, type: fileType, error: null });
    updateCounts(extractedText);
  }, [updateCounts]);

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

        // Filter to real text items only
        const rawItems = content.items.filter((item) => "str" in item);

        if (rawItems.length === 0) continue;

        // --- Build text using pdfjs hasEOL + position-aware spacing ---
        // PDF coordinate system: Y=0 at BOTTOM, Y increases UPWARD.
        // To read top→bottom we sort by Y DESCENDING (higher Y = higher on page).
        // Within a line, sort by X ASCENDING (left to right).

        // Calculate average font height for dynamic thresholds
        const heights = rawItems
          .map((i) => Math.abs(i.transform[3]))
          .filter((h) => h > 0);
        const avgHeight = heights.length
          ? heights.reduce((a, b) => a + b, 0) / heights.length
          : 10;
        const lineThreshold = avgHeight * 0.5; // items within 50% of font height = same line

        // Sort: top→bottom (Y desc), left→right (X asc)
        const sorted = [...rawItems].sort((a, b) => {
          const yA = a.transform[5];
          const yB = b.transform[5];
          if (Math.abs(yB - yA) > lineThreshold) return yB - yA; // different lines
          return a.transform[4] - b.transform[4]; // same line, left to right
        });

        // Stream through sorted items, adding spaces/newlines based on position & hasEOL
        let pageText = "";
        let prevItem = null;

        for (const item of sorted) {
          if (!item.str) continue;

          if (prevItem !== null) {
            const prevY = prevItem.transform[5];
            const currY = item.transform[5];
            const prevX = prevItem.transform[4];
            const currX = item.transform[4];
            const prevWidth = prevItem.width || 0;

            const yDiff = Math.abs(currY - prevY);

            if (yDiff > lineThreshold) {
              // New line detected by position
              pageText += prevItem.hasEOL ? "\n" : "\n";
            } else {
              // Same line — add space if there's a visible gap between items
              const gap = currX - (prevX + prevWidth);
              const spaceThreshold = avgHeight * 0.15; // ~15% of font height
              if (gap > spaceThreshold) {
                pageText += " ";
              } else if (prevItem.hasEOL) {
                // pdfjs says this item ended a line even at same Y
                pageText += "\n";
              }
            }
          }

          pageText += item.str;
          prevItem = item;
        }

        // Handle trailing EOL on last item of page
        if (prevItem?.hasEOL) pageText += "\n";

        allPageText += pageText.trimEnd() + "\n\n";
      }

      // Normalise: collapse 3+ newlines → 2, trim
      const cleaned = allPageText.replace(/\n{3,}/g, "\n\n").trim();

      if (!cleaned) {
        setFileStatus({
          name: file.name, type: "PDF",
          error: "No extractable text found. This may be a scanned/image-only PDF.",
        });
      } else {
        loadTextIntoCalculator(cleaned, file.name, "PDF");
      }
    } catch (err) {
      console.error("PDF parse error:", err);
      setFileStatus({ name: file.name, type: "PDF", error: `Parse failed: ${err?.message || "Unknown error"}` });
    } finally {
      setIsFileLoading(false);
    }
  }, [loadTextIntoCalculator]);


  const parseCSV = useCallback((file) => {
    setIsFileLoading(true);
    Papa.parse(file, {
      complete: (result) => {
        const csvText = result.data.map((row) => row.join(", ")).join("\n");
        loadTextIntoCalculator(csvText, file.name, "CSV");
        setIsFileLoading(false);
      },
      error: () => {
        setFileStatus({ name: file.name, type: "CSV", error: "Failed to parse CSV file." });
        setIsFileLoading(false);
      },
    });
  }, [loadTextIntoCalculator]);

  const processFile = useCallback((file) => {
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    if (ext === "pdf" || file.type === "application/pdf") {
      parsePDF(file);
    } else if (ext === "csv" || file.type === "text/csv") {
      parseCSV(file);
    } else if (ext === "txt" || file.type.startsWith("text/")) {
      const reader = new FileReader();
      reader.onload = (e) => loadTextIntoCalculator(e.target.result, file.name, "TXT");
      reader.readAsText(file);
    } else {
      setFileStatus({ name: file.name, type: ext.toUpperCase(), error: "Unsupported file type. Use PDF, CSV, or TXT." });
    }
  }, [parsePDF, parseCSV, loadTextIntoCalculator]);

  const handleDragOver = useCallback((e) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e) => { e.preventDefault(); setIsDragging(false); }, []);
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }, [processFile]);
  const handleFileInput = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  }, [processFile]);

  return (
    <>

      {/* Calculator + Visualizer — side by side on desktop */}
      <div className="model-calc-row container">

        {/* Calculator */}
        <section className="model-calc-row__calculator">
          <div className="calculator__card" style={{ height: '100%' }}>
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

            <div
              className={`calculator__input-area${isDragging ? ' calc-drop-active' : ''}`}
              style={{ flex: 1, position: 'relative' }}
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

              {/* File processing status badge */}
              {fileStatus && (
                <div style={{
                  position: 'absolute', top: '8px', right: '8px', zIndex: 5,
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: fileStatus.error ? 'rgba(239,68,68,0.12)' : 'rgba(0,196,125,0.12)',
                  border: `1px solid ${fileStatus.error ? 'rgba(239,68,68,0.3)' : 'rgba(0,196,125,0.3)'}`,
                  borderRadius: '6px', padding: '4px 10px',
                  fontSize: '0.6875rem', fontFamily: 'var(--font-mono)',
                  color: fileStatus.error ? '#ef4444' : 'var(--green)',
                  maxWidth: '220px',
                }}>
                  <span>{fileStatus.error ? '⚠' : '✓'}</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {fileStatus.error || `${fileStatus.type}: ${fileStatus.name}`}
                  </span>
                  <button
                    onClick={() => { setFileStatus(null); setText(''); updateCounts(''); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: '0 0 0 2px', lineHeight: 1 }}
                    aria-label="Clear file"
                  >✕</button>
                </div>
              )}

              {/* Spinner while parsing */}
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
                id="token-input"
                className="calculator__textarea"
                placeholder={`Type or paste text, or drop a PDF / CSV / TXT file…`}
                value={text}
                onChange={handleTextChange}
                aria-label={`Text input for ${model.name} token counting`}
                spellCheck={false}
              />

              {/* Upload button strip */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '6px 10px',
                borderTop: '1px solid var(--border-subtle)',
                background: 'var(--bg-tertiary)',
              }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.csv,.txt,text/*,application/pdf"
                  style={{ display: 'none' }}
                  onChange={handleFileInput}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '4px 10px', fontSize: '0.6875rem', fontWeight: 600,
                    background: 'var(--bg-secondary)', border: '1px solid var(--border-default)',
                    borderRadius: '6px', color: 'var(--text-secondary)', cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                  Upload File
                </button>
                <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  PDF · CSV · TXT — parsed in-browser
                </span>
              </div>
            </div>

            <div className="stats-bar">
              <div className="stat-item">
                <span className="stat-item__value stat-item__value--accent">
                  {isLoading ? "..." : tokenCount.toLocaleString()}
                </span>
                <span className="stat-item__label">Tokens</span>
              </div>
              <div className="stat-item">
                <span className="stat-item__value">{wordCount.toLocaleString()}</span>
                <span className="stat-item__label">Words</span>
              </div>
              <div className="stat-item">
                <span className="stat-item__value">{charCount.toLocaleString()}</span>
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
        <section className="model-calc-row__visualizer">
          <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 24px', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <div className="visualizer__title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="visualizer__title-icon">🎨</span>
                  <span>{model.name} Token Visualizer</span>
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
            </div>

            <div className="visualizer__content" style={{ flex: 1 }}>
              {tokens.length === 0 ? (
                <div className="visualizer__empty">
                  <span className="visualizer__empty-icon">⬆️</span>
                  <span>Type or paste text above to see {model.name} tokenization</span>
                </div>
              ) : (
                <div className="visualizer__scroll-area">
                  {visualizerView === 'ids' ? (
                    <div className="token-id-container">
                      <span className="token-id-bracket">[</span>
                      <div className="token-id-list">
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
                        <div key={i} title={`ID: ${t.tokenId} | '${t.text.replace(/\n/g, '\\n')}'`} data-type={cls === 'token-chip--emoji' ? 'emoji' : ''} className={`token-chip ${cls}`}>
                          {t.text.replace(/\n/g, "↵\n")}
                          <div className="token-chip__tooltip">
                            ID: {t.tokenId} | &apos;{t.text}&apos;
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {tokens.length > 0 && (
              <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--border-default)', background: 'var(--bg-tertiary)', display: 'flex', gap: '1.5rem', alignItems: 'center', fontSize: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ color: 'var(--text-muted)' }}>Legend:</div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><div style={{ width: '8px', height: '8px', background: 'var(--green)', borderRadius: '2px' }} /> Word</div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><div style={{ width: '8px', height: '8px', background: 'var(--amber)', borderRadius: '2px' }} /> Punctuation</div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><div style={{ width: '8px', height: '8px', background: 'var(--purple)', borderRadius: '2px' }} /> Subword</div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><div style={{ width: '8px', height: '8px', background: 'var(--text-tertiary)', borderRadius: '2px' }} /> Space</div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><div style={{ width: '8px', height: '8px', background: 'rgba(245, 158, 11, 0.5)', borderRadius: '2px' }} /> Emoji</div>
              </div>
            )}
          </div>
        </section>

      </div>

      {/* Pricing Comparison with Related Models */}
      {relatedModels.length > 0 && (
        <section className="projector-section container" style={{ marginTop: "4rem" }}>
          <div className="card">
            <div className="projector-header" style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <h2 style={{ fontSize: '1.125rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📊 Compare {model.name} Pricing
              </h2>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="projector-table" style={{ tableLayout: 'fixed', width: '100%' }}>
                <colgroup>
                  <col style={{ width: '40%' }} />
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '20%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>Model</th>
                    <th style={{ textAlign: 'center' }}>Input / 1M Tokens</th>
                    <th style={{ textAlign: 'center' }}>Output / 1M Tokens</th>
                    <th style={{ textAlign: 'center' }}>Context Window</th>
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
                    <td className="pricing-table__price" style={{ textAlign: 'center' }}>${model.inputPrice.toFixed(2)}</td>
                    <td className="pricing-table__price" style={{ textAlign: 'center' }}>${model.outputPrice.toFixed(2)}</td>
                    <td className="pricing-table__context" style={{ textAlign: 'center' }}>{formatNumber(model.contextWindow)}</td>
                  </tr>
                  {relatedModels.map((rm) => (
                    <tr key={rm.id}>
                      <td>
                        <div className="pricing-table__model">
                          <span className="pricing-table__dot" style={{ backgroundColor: rm.color }} />
                          {rm.name}
                        </div>
                      </td>
                      <td className="pricing-table__price" style={{ textAlign: 'center' }}>${rm.inputPrice.toFixed(2)}</td>
                      <td className="pricing-table__price" style={{ textAlign: 'center' }}>${rm.outputPrice.toFixed(2)}</td>
                      <td className="pricing-table__context" style={{ textAlign: 'center' }}>{formatNumber(rm.contextWindow)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
