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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CostProjector from "./CostProjector";

// Group models by provider
const PROVIDERS = [
  { id: "openai", name: "OpenAI", color: "var(--green)", defaultModel: "gpt-4o" },
  { id: "anthropic", name: "Anthropic", color: "var(--amber)", defaultModel: "claude-sonnet-4-6" },
  { id: "google", name: "Google", color: "var(--blue)", defaultModel: "gemini-1-5-pro" },
  { id: "deepseek", name: "DeepSeek", color: "var(--purple)", defaultModel: "deepseek-v3" },
  { id: "meta", name: "Meta", color: "var(--indigo)", defaultModel: "llama-3-1-70b" },
  { id: "mistral", name: "Mistral", color: "#EE6C4D", defaultModel: "mistral-small" },
];

export default function FrenchCalculator() {
  const [systemText, setSystemText] = useState("");
  const [userText, setUserText] = useState("");
  const [activeTab, setActiveTab] = useState("user"); // "system" | "user"
  
  const [selectedModelId, setSelectedModelId] = useState(DEFAULT_MODEL_ID);
  
  // Track active model per provider for the dropdowns
  const [providerModels, setProviderModels] = useState({
    openai: "gpt-4-1",
    anthropic: "claude-opus-4-7",
    google: "gemini-2-5-pro",
    deepseek: "deepseek-r1",
    meta: "llama-4-scout",
    mistral: "mistral-large",
  });

  const [systemTokensCount, setSystemTokensCount] = useState(0);
  const [userTokensCount, setUserTokensCount] = useState(0);
  const [tokens, setTokens] = useState([]); // Will just show user tokens in visualizer for simplicity, or combined
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  
  const [visualizerView, setVisualizerView] = useState("colored");
  const debounceRef = useRef(null);
  const initialLoadRef = useRef(false);

  const selectedModel = getModelById(selectedModelId);
  const totalTokensCount = systemTokensCount + userTokensCount;

  const inputCost = calculateCost(totalTokensCount, selectedModel, "input");
  // Assume a default simulated output cost for projection, e.g., 50% of input length
  const outputTokensCount = Math.floor(totalTokensCount * 0.5);
  const outputCost = calculateCost(outputTokensCount, selectedModel, "output");
  const totalCost = inputCost + outputCost;

  const contextPercent = Math.min(100, (totalTokensCount / selectedModel.contextWindow) * 100);

  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      countTokens("hello", selectedModel.encoding).catch(() => {});
      
      const urlParams = new URLParams(window.location?.search || "");
      const textParam = urlParams.get("text");
      const modelParam = urlParams.get("model");
      
      if (textParam) {
        setUserText(textParam);
        setTimeout(() => updateCounts(systemText, textParam, modelParam || selectedModelId), 100);
      } else {
        // Preload example
        const example = "The quick brown fox jumps over the lazy dog. 🦊";
        setUserText(example);
        setTimeout(() => updateCounts(systemText, example, selectedModelId), 100);
      }
      
      if (modelParam && getModelById(modelParam)) {
        setSelectedModelId(modelParam);
        // Also update that provider's active model
        const p = getModelById(modelParam).provider;
        const pid = PROVIDERS.find(x => p.toLowerCase().includes(x.name.toLowerCase()))?.id;
        if (pid) setProviderModels(prev => ({...prev, [pid]: modelParam}));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateCounts = useCallback(async (sys, usr, modelId) => {
    const model = getModelById(modelId);
    setWordCount(countWords(sys) + countWords(usr));
    setCharCount(countCharacters(sys) + countCharacters(usr));

    const promises = [];
    if (sys) promises.push(countTokens(sys, model.encoding));
    else promises.push(Promise.resolve(0));

    if (usr) promises.push(countTokens(usr, model.encoding));
    else promises.push(Promise.resolve(0));
    
    // Only visualize the active tab's tokens for performance
    const activeText = activeTab === "system" ? sys : usr;
    if (activeText) promises.push(tokenize(activeText, model.encoding));
    else promises.push(Promise.resolve([]));

    try {
      const [sysTokens, usrTokens, activeTokenized] = await Promise.all(promises);
      setSystemTokensCount(sysTokens);
      setUserTokensCount(usrTokens);
      setTokens(activeTokenized);
    } catch (e) {
      console.error(e);
    }
  }, [activeTab]);

  const handleTextChange = useCallback((e) => {
    const newText = e.target.value;
    if (activeTab === "system") setSystemText(newText);
    else setUserText(newText);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateCounts(activeTab === "system" ? newText : systemText, activeTab === "user" ? newText : userText, selectedModelId);
    }, 150);
  }, [activeTab, systemText, userText, selectedModelId, updateCounts]);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    updateCounts(systemText, userText, selectedModelId);
  }

  const handleProviderSelect = (providerId) => {
    const modelToSelect = providerModels[providerId];
    setSelectedModelId(modelToSelect);
    updateCounts(systemText, userText, modelToSelect);
  };

  const handleProviderModelChange = (e, providerId) => {
    e.stopPropagation();
    const newModelId = e.target.value;
    setProviderModels(prev => ({ ...prev, [providerId]: newModelId }));
    setSelectedModelId(newModelId);
    updateCounts(systemText, userText, newModelId);
  };

  const handleShare = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("text", text);
    url.searchParams.set("model", selectedModelId);
    const result = await safeShare({ title: "Token Calculator", text: `\ tokens`, url: url.toString() });
    if (result.method !== "cancelled") toast.success(result.method === "native" ? "Shared!" : "Link copied!");
  };

  const handleCopyStats = async () => {
    const stats = `\ tokens`;
    await safeCopyText(stats);
    toast.success("Stats copied!");
  };
  const handleClear = () => {
    if (activeTab === 'system') {
      setSystemText('');
      updateCounts('', userText, selectedModelId);
    } else {
      setUserText('');
      updateCounts(systemText, '', selectedModelId);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await safePasteText();
      if (activeTab === 'system') {
        setSystemText(text);
        updateCounts(text, userText, selectedModelId);
      } else {
        setUserText(text);
        updateCounts(systemText, text, selectedModelId);
      }
    } catch (err) {
      console.error('Failed to paste:', err);
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
                if (pid) setProviderModels(prev => ({...prev, [pid]: newModelId}));
                updateCounts(systemText, userText, newModelId);
              }}
            >
              <option value="" disabled>Sélectionner le modèle...</option>
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

          {/* Text Area Tabs */}
          <div className="tabs-row">
            <button className={`tab-btn ${activeTab === 'system' ? 'active' : ''}`} onClick={() => handleTabChange('system')}>
              Prompt Système {systemTokensCount > 0 && <span className="tab-badge">{systemTokensCount}</span>}
            </button>
            <button className={`tab-btn ${activeTab === 'user' ? 'active' : ''}`} onClick={() => handleTabChange('user')}>
              Message Utilisateur {userTokensCount > 0 && <span className="tab-badge">{userTokensCount}</span>}
            </button>
          </div>
            
          <div className="calculator__input-area">
            <textarea
              className="calculator__textarea"
              value={activeTab === "system" ? systemText : userText}
              onChange={handleTextChange}
              placeholder={activeTab === "system" ? "Entrez les instructions système ici..." : "Commencez à taper ou collez votre texte ici..."}
              spellCheck={false}
            />
            
            <div className="textarea-actions">
              <div className="textarea-actions-left">
                <button className="textarea-action-btn" onClick={handleClear} aria-label="Clear text">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/></svg>
                  Clear
                </button>
                <button className="textarea-action-btn" onClick={handlePaste} aria-label="Paste text">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
                  Paste
                </button>
                <button className="textarea-action-btn" onClick={() => setActiveTab('user') || setUserText("Expliquez l informatique quantique en termes simples.")}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                  Example
                </button>
              </div>
              <div className="char-count" style={{ opacity: 0.6 }}>
                Auto-saved
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-item__value stat-item__value--accent">{totalTokensCount.toLocaleString()}</div>
              <div className="stat-item__label">Jetons</div>
            </div>
            <div className="stat-item">
              <div className="stat-item__value">{wordCount.toLocaleString()}</div>
              <div className="stat-item__label">Mots</div>
            </div>
            <div className="stat-item">
              <div className="stat-item__value">{charCount.toLocaleString()}</div>
              <div className="stat-item__label">Carac.</div>
            </div>
            <div className="stat-item">
              <div className="stat-item__value stat-item__value--small">{formatCostValue(inputCost)}</div>
              <div className="stat-item__label">Dépense</div>
            </div>
          </div>

          {/* Context Window & Totals */}
          <div className="calculator__bottom-row">
            <div className="context-section">
              <div className="context-bar__track">
                <div className={`context-bar__fill ${contextPercent > 90 ? 'context-bar__fill--danger' : contextPercent > 70 ? 'context-bar__fill--warning' : ''}`} style={{ width: `${contextPercent}%` }} />
              </div>
              <div className="context-bar__label">
                <span>Contexte: <span style={{color: 'var(--text-primary)'}}>{formatNumber(totalTokensCount)}</span> / {formatNumber(selectedModel.contextWindow)} tokens</span>
                <span className="context-bar__pct">({contextPercent.toFixed(1)}%)</span>
              </div>
            </div>
            <div className="cost-breakdown">
              <div className="cost-breakdown__line">
                <span className="cost-breakdown__label">ENTRÉE</span>
                <span className="cost-breakdown__value">{inputCost > 0 ? `$${inputCost.toFixed(5)}` : '$0.0000'}</span>
              </div>
              <div className="cost-breakdown__line">
                <span className="cost-breakdown__label">SORTIE</span>
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
      </div>

      {/* Visualizer */}
      <div className="visualizer container">
        <div className="card">
          <div style={{ padding: '20px 24px', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div className="visualizer__title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="visualizer__title-icon">📊</span> 
                <span>Token Visualizer</span>
                <span className="text-secondary" style={{ fontWeight: 500, fontSize: '14px', marginLeft: '12px', background: 'var(--bg-tertiary)', padding: '4px 10px', borderRadius: '12px' }}>
                  Viewing: {activeTab}
                </span>
              </div>
              <div className="visualizer__toggle">
                <button 
                  className={`visualizer__toggle-btn ${visualizerView === 'colored' ? 'visualizer__toggle-btn--active' : ''}`}
                  onClick={() => setVisualizerView('colored')}
                >Coloré</button>
                <button 
                  className={`visualizer__toggle-btn ${visualizerView === 'ids' ? 'visualizer__toggle-btn--active' : ''}`}
                  onClick={() => setVisualizerView('ids')}
                >IDs de Jetons</button>
              </div>
            </div>
          </div>
          
          <div className="visualizer__content">
            {tokens.length === 0 ? (
              <div className="visualizer__empty">Tapez du texte pour voir les jetons</div>
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
            <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--border-default)', background: 'var(--bg-tertiary)', display: 'flex', gap: '1.5rem', alignItems: 'center', fontSize: '0.75rem' }}>
              <div style={{ color: 'var(--text-muted)' }}>Legend:</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><div style={{ width: '8px', height: '8px', background: 'var(--green)', borderRadius: '2px' }}/> Word</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><div style={{ width: '8px', height: '8px', background: 'var(--amber)', borderRadius: '2px' }}/> Punctuation</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><div style={{ width: '8px', height: '8px', background: 'var(--purple)', borderRadius: '2px' }}/> Subword</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><div style={{ width: '8px', height: '8px', background: 'var(--text-tertiary)', borderRadius: '2px' }}/> Space</div>
            </div>
          )}
        </div>
        <CostProjector inputTokens={totalTokensCount} />
      </div>
      <ToastContainer theme="dark" />
    </>
  );
}
