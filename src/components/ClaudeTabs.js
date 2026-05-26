"use client";

import { useState } from "react";
import ModelCalculator from "./ModelCalculator";
import { MODELS } from "@/lib/models";

export default function ClaudeTabs({ exactNumbers, compactVisualizer, showAllModels, defaultText }) {
  const [activeTab, setActiveTab] = useState("claude-sonnet-4-6");

  const providerModels = MODELS.filter(m => m.provider === 'Anthropic');

  return (
    <div className="container" style={{ marginTop: "0.25rem", marginBottom: "0.5rem" }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem', width: '100%', paddingBottom: '0.25rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'var(--bg-secondary)',
          padding: '6px 16px',
          borderRadius: '12px',
          border: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-sm)',
          maxWidth: '100%'
        }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', marginRight: '12px', whiteSpace: 'nowrap' }}>
            Select Model:
          </span>
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            style={{
              padding: '6px 32px 6px 12px',
              fontSize: '15px',
              fontWeight: 700,
              borderRadius: '8px',
              background: 'var(--bg-elevated)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-default)',
              cursor: 'pointer',
              outline: 'none',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23bbb8b2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 10px center',
              backgroundSize: '1em',
              fontFamily: 'inherit',
              flexGrow: 1,
              minWidth: '220px',
              textOverflow: 'ellipsis'
            }}
          >
            {providerModels.map(m => (
              <option key={m.id} value={m.id} style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ModelCalculator
        modelId={activeTab}
        exactNumbers={exactNumbers}
        compactVisualizer={compactVisualizer}
        defaultText={defaultText}
        relatedModelIds={
          showAllModels ? MODELS.filter(m => m.provider === 'Anthropic' && m.id !== activeTab).map(m => m.id) : []
        }
      />
    </div>
  );
}
