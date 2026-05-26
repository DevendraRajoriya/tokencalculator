import { MODELS, formatNumber } from "@/lib/models";
import PricingTable from "@/components/PricingTable";

export const metadata = {
  title: "LLM API Pricing Comparison 2026 — GPT-4o, Claude, Gemini, DeepSeek Costs",
  description:
    "Complete LLM API pricing comparison for 2026. Compare input/output costs, context windows, and value for GPT-4o, Claude Sonnet, Gemini 1.5 Pro, DeepSeek V3, and LLaMA 3.1. Updated April 2026.",
  keywords: [
    "LLM API pricing comparison",
    "AI API costs 2026",
    "GPT-4o pricing",
    "Claude API pricing",
    "cheapest LLM API",
    "LLM pricing comparison 2026",
  ],
  openGraph: {
    title: "LLM API Pricing Comparison 2026",
    description: "Compare costs for GPT-4o, Claude, Gemini, DeepSeek and more. Updated April 2026.",
  },
  alternates: {
    canonical: "/llm-pricing-comparison",
  },
};

export default function PricingComparison() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "LLM Pricing Comparison", item: "/llm-pricing-comparison" },
    ],
  };

  const sortedModels = [...MODELS].sort((a, b) => a.inputPrice - b.inputPrice);

  // Stats
  const cheapest = sortedModels[0];
  const mostExpensive = [...MODELS].sort((a, b) => b.inputPrice - a.inputPrice)[0];
  const biggestContext = [...MODELS].sort((a, b) => b.contextWindow - a.contextWindow)[0];
  const totalModels = MODELS.length;
  const uniqueProviders = [...new Set(MODELS.map(m => m.provider))].length;

  const useCases = [
    { name: "Single chat message", tokens: 500, label: "~500 tokens", icon: "💬" },
    { name: "Blog post summary", tokens: 5000, label: "~5K tokens", icon: "📝" },
    { name: "Document analysis", tokens: 50000, label: "~50K tokens", icon: "📄" },
    { name: "Full context fill", tokens: 128000, label: "~128K tokens", icon: "📚" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="lpc-hero container">
        <div className="lpc-hero__badge">
          <span className="lpc-hero__badge-dot" />
          {totalModels} Models · {uniqueProviders} Providers
        </div>
        <h1 className="hero__title lpc-hero__title">
          LLM API <span style={{ color: 'var(--accent)' }}>Pricing Comparison</span>
        </h1>
        <p className="hero__subtitle lpc-hero__subtitle">
          Compare input &amp; output costs, context windows, and real-world pricing for all major AI models — side by side.
        </p>

        {/* Quick Stats */}
        <div className="lpc-quick-stats">
          <div className="lpc-qstat">
            <span className="lpc-qstat__val" style={{ color: 'var(--green)' }}>${cheapest.inputPrice < 0.1 ? cheapest.inputPrice.toFixed(3) : cheapest.inputPrice.toFixed(2)}</span>
            <span className="lpc-qstat__label">Cheapest Input/1M</span>
            <span className="lpc-qstat__model">{cheapest.name}</span>
          </div>
          <div className="lpc-qstat-divider" />
          <div className="lpc-qstat">
            <span className="lpc-qstat__val" style={{ color: 'var(--amber)' }}>${mostExpensive.inputPrice.toFixed(2)}</span>
            <span className="lpc-qstat__label">Most Expensive/1M</span>
            <span className="lpc-qstat__model">{mostExpensive.name}</span>
          </div>
          <div className="lpc-qstat-divider" />
          <div className="lpc-qstat">
            <span className="lpc-qstat__val" style={{ color: 'var(--blue)' }}>{formatNumber(biggestContext.contextWindow)}</span>
            <span className="lpc-qstat__label">Largest Context</span>
            <span className="lpc-qstat__model">{biggestContext.name}</span>
          </div>
        </div>
      </section>

      {/* Main Pricing Table */}
      <section className="container lpc-section">
        <PricingTable />
      </section>

      {/* Cost Calculator Per Use Case */}
      <section className="container lpc-section">
        <div className="lpc-section-header">
          <h2 className="lpc-h2">
            Real Cost Comparison by <span style={{ color: 'var(--accent)' }}>Use Case</span>
          </h2>
          <p className="lpc-section-desc">
            See exactly what each model costs for common workloads — from a single chat to filling an entire context window.
          </p>
        </div>

        {/* Use Case Cards */}
        <div className="lpc-usecase-grid">
          {useCases.map((uc) => {
            const cheapestForCase = sortedModels[0];
            const cheapestCost = (uc.tokens / 1_000_000) * cheapestForCase.inputPrice;
            return (
              <div key={uc.name} className="lpc-usecase-card">
                <div className="lpc-usecase-card__header">
                  <span className="lpc-usecase-card__icon">{uc.icon}</span>
                  <div>
                    <div className="lpc-usecase-card__name">{uc.name}</div>
                    <div className="lpc-usecase-card__tokens">{uc.label}</div>
                  </div>
                </div>
                <div className="lpc-usecase-card__list">
                  {sortedModels.slice(0, 6).map((model) => {
                    const cost = (uc.tokens / 1_000_000) * model.inputPrice;
                    const isCheapest = model.id === cheapestForCase.id;
                    return (
                      <div key={model.id} className={`lpc-usecase-row ${isCheapest ? 'lpc-usecase-row--best' : ''}`}>
                        <div className="lpc-usecase-row__model">
                          <span className="lpc-model-dot" style={{ background: model.color }} />
                          <span>{model.name}</span>
                        </div>
                        <span className={`lpc-usecase-row__cost ${isCheapest ? 'lpc-usecase-row__cost--best' : ''}`}>
                          ${cost < 0.01 ? cost.toFixed(5) : cost.toFixed(4)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="container lpc-section">
        <div className="lpc-section-header">
          <h2 className="lpc-h2">
            Key Pricing <span style={{ color: 'var(--accent)' }}>Takeaways</span> for 2026
          </h2>
        </div>

        <div className="lpc-takeaways-grid">
          <div className="lpc-takeaway card">
            <div className="lpc-takeaway__icon-wrap" style={{ '--tw-color': 'var(--green)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
            </div>
            <h3 className="lpc-takeaway__title">
              Cheapest Overall
            </h3>
            <div className="lpc-takeaway__model">{cheapest.name}</div>
            <p className="lpc-takeaway__desc">
              At ${cheapest.inputPrice < 0.1 ? cheapest.inputPrice.toFixed(3) : cheapest.inputPrice.toFixed(2)} per 1M input tokens, {cheapest.name} is the most affordable major LLM API. Ideal for high-volume, simple tasks where cost efficiency is paramount.
            </p>
          </div>

          <div className="lpc-takeaway card">
            <div className="lpc-takeaway__icon-wrap" style={{ '--tw-color': 'var(--purple)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <h3 className="lpc-takeaway__title">
              Best Value Mid-Tier
            </h3>
            <div className="lpc-takeaway__model">DeepSeek V3</div>
            <p className="lpc-takeaway__desc">
              DeepSeek V3 offers GPT-4-class reasoning at $0.27/$1.10 per 1M tokens — approximately 9× cheaper than GPT-4o. Best choice for developers who need strong performance on a budget.
            </p>
          </div>

          <div className="lpc-takeaway card">
            <div className="lpc-takeaway__icon-wrap" style={{ '--tw-color': 'var(--blue)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
            <h3 className="lpc-takeaway__title">
              Largest Context Window
            </h3>
            <div className="lpc-takeaway__model">{biggestContext.name}</div>
            <p className="lpc-takeaway__desc">
              {biggestContext.name}&apos;s {formatNumber(biggestContext.contextWindow)} token context window dwarfs all competitors. For processing entire codebases or very long documents, it&apos;s unmatched in capacity.
            </p>
          </div>

          <div className="lpc-takeaway card">
            <div className="lpc-takeaway__icon-wrap" style={{ '--tw-color': 'var(--amber)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <h3 className="lpc-takeaway__title">
              Best for Quality-Critical
            </h3>
            <div className="lpc-takeaway__model">Claude Opus 4.7</div>
            <p className="lpc-takeaway__desc">
              Despite premium pricing at $5.00/$25.00 per 1M tokens, Claude Opus 4.7 remains the go-to for tasks where output quality matters most — complex reasoning, nuanced writing, and multi-step analysis.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container lpc-section">
        <div className="lpc-cta-card card">
          <div className="lpc-cta-card__content">
            <h2 className="lpc-cta-card__title">
              Ready to calculate your <span style={{ color: 'var(--accent)' }}>actual costs?</span>
            </h2>
            <p className="lpc-cta-card__desc">
              Paste your prompt into our free token calculator and see exact token counts, cost breakdowns, and monthly projections for any model.
            </p>
            <a href="/" className="btn btn--primary lpc-cta-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              Open Token Calculator
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
