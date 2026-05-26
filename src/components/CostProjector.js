"use client";

import { useState, useEffect } from "react";
import { MODELS, formatNumber } from "@/lib/models";

export default function CostProjector({ inputTokens = 1000 }) {
  const [requestsPerDay, setRequestsPerDay] = useState(1000);
  const [avgInputTokens, setAvgInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);

  // Sync avgInputTokens when inputTokens prop changes (from textarea)
  useEffect(() => {
    if (inputTokens > 1) {
      setAvgInputTokens(inputTokens);
    }
  }, [inputTokens]);

  const calculateMonthly = (model) => {
    const dailyInput = (avgInputTokens / 1_000_000) * model.inputPrice * requestsPerDay;
    const dailyOutput = (outputTokens / 1_000_000) * model.outputPrice * requestsPerDay;
    return (dailyInput + dailyOutput) * 30;
  };

  // Get subset of models for projection
  const projectionModels = MODELS.filter(m =>
    ["gpt-4-1", "gpt-4-1-mini", "gpt-4-1-nano", "gpt-4o", "gpt-4o-mini", "o3", "o3-pro", "o4-mini", "deepseek-v3", "deepseek-r1", "claude-haiku-4-5", "claude-sonnet-4-6", "claude-opus-4-7", "claude-opus-4-6", "llama-4-maverick", "llama-4-scout", "gemini-2-5-pro", "gemini-2-5-flash", "gemini-2-5-flash-lite", "gemini-1-5-pro", "mistral-large", "mistral-small", "codestral"].includes(m.id)
  );

  const costs = projectionModels.map(m => ({ ...m, monthly: calculateMonthly(m) }));
  costs.sort((a, b) => a.monthly - b.monthly);

  const bestValue = costs[0];

  // Helper to compute fill percentage for slider track coloring
  const fillPct = (val, min, max) => `${((val - min) / (max - min)) * 100}%`;

  return (
    <div className="card" style={{ marginTop: '3rem' }}>
      <div className="projector-header" style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <h2 style={{ fontSize: '1.125rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>💰</span> MONTHLY COST PROJECTOR
        </h2>
      </div>

      <div className="projector-sliders" style={{ padding: '1.5rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-tertiary)' }}>
        {/* Slider 1: Requests/day */}
        <div className="slider-row">
          <div className="slider-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Requests/day</span>
            <span className="font-mono text-primary" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{formatNumber(requestsPerDay)}</span>
          </div>
          <input
            type="range" min="10" max="100000" step="10"
            value={requestsPerDay} onChange={e => setRequestsPerDay(Number(e.target.value))}
            style={{ width: '100%', '--fill-pct': fillPct(requestsPerDay, 10, 100000) }}
          />
        </div>

        {/* Slider 2: Input tokens */}
        <div className="slider-row">
          <div className="slider-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Input tokens</span>
            <span className="font-mono text-primary" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{formatNumber(avgInputTokens)}</span>
          </div>
          <input
            type="range" min="1" max="128000" step="1"
            value={avgInputTokens} onChange={e => setAvgInputTokens(Number(e.target.value))}
            style={{ width: '100%', '--fill-pct': fillPct(avgInputTokens, 1, 128000) }}
          />
        </div>

        {/* Slider 3: Output tokens */}
        <div className="slider-row">
          <div className="slider-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Output tokens</span>
            <span className="font-mono text-primary" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{formatNumber(outputTokens)}</span>
          </div>
          <input
            type="range" min="10" max="8000" step="10"
            value={outputTokens} onChange={e => setOutputTokens(Number(e.target.value))}
            style={{ width: '100%', '--fill-pct': fillPct(outputTokens, 10, 8000) }}
          />
        </div>
      </div>

      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table className="projector-table" style={{ width: '100%', minWidth: '300px', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Model</th>
              <th>Monthly cost</th>
              <th>Annual cost</th>
            </tr>
          </thead>
          <tbody>
            {costs.map(model => (
              <tr key={model.id} className={model.id === bestValue.id ? 'cheapest selected' : ''}>
                <td>
                  <span className="provider-dot" style={{ background: model.color, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block', marginRight: '6px' }} />
                  <span style={{ fontWeight: model.id === bestValue.id ? 600 : 500, color: model.id === bestValue.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{model.name}</span>
                </td>
                <td className="font-mono">
                  ${model.monthly < 1 ? model.monthly.toFixed(4) : model.monthly.toFixed(2)}
                </td>
                <td className="font-mono">
                  ${(model.monthly * 12).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note for mobile when annual column is hidden */}
      <p className="projector-annual-note">* Multiply monthly cost ×12 for annual estimate</p>

      <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-tertiary)', fontSize: '0.875rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ color: 'var(--text-primary)' }}>
          <span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✦</span>
          Best value for this usage: <strong>{bestValue.name}</strong> (${bestValue.monthly < 1 ? bestValue.monthly.toFixed(4) : bestValue.monthly.toFixed(2)}/mo)
        </div>
        <button className="btn btn--outline" style={{ background: 'var(--bg-secondary)', fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>⬇ Export comparison</button>
      </div>
    </div>
  );
}
