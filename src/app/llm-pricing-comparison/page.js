import { MODELS, formatNumber } from "@/lib/models";

export const metadata = {
  title: "LLM API Pricing Comparison 2026 — GPT-4o, Claude, Gemini, DeepSeek Costs",
  description:
    "Complete LLM API pricing comparison for 2026. Compare input/output costs, context windows, and value for GPT-4o, Claude Sonnet, Gemini 1.5 Pro, DeepSeek V3, and LLaMA 3.1. Updated March 2026.",
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
    description: "Compare costs for GPT-4o, Claude, Gemini, DeepSeek and more. Updated March 2026.",
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

  // Sort models by input price for default view
  const sortedModels = [...MODELS].sort((a, b) => a.inputPrice - b.inputPrice);

  // Calculate cost for common use cases
  const useCases = [
    { name: "Single chat message", tokens: 500, label: "~500 tokens" },
    { name: "Blog post summary", tokens: 5000, label: "~5K tokens" },
    { name: "Document analysis", tokens: 50000, label: "~50K tokens" },
    { name: "Full context fill", tokens: 128000, label: "~128K tokens" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="hero" style={{ paddingBottom: "1.5rem" }}>
        <nav style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
          <a href="/" style={{ color: "var(--text-tertiary)", textDecoration: "none" }}>Home</a>
          <span style={{ margin: "0 0.5rem" }}>/</span>
          <span style={{ color: "var(--text-primary)" }}>LLM Pricing Comparison</span>
        </nav>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          padding: "0.25rem 0.75rem", borderRadius: "var(--radius-full)",
          background: "var(--success-subtle)", border: "1px solid var(--success)",
          fontSize: "0.6875rem", fontWeight: 600, color: "var(--success)",
          marginBottom: "0.75rem", fontFamily: "var(--font-mono)",
        }}>
          ● Last updated: March 2026
        </div>
        <h1 className="hero__title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
          LLM API <span>Pricing Comparison</span> 2026
        </h1>
        <p className="hero__subtitle">
          Compare costs for all major AI models side by side. Input/output pricing per 1M tokens,
          context windows, and real cost calculations for common use cases.
        </p>
      </section>

      {/* Main Pricing Table */}
      <section className="pricing-section">
        <h2 className="pricing-section__title">💰 Price Per 1M Tokens (Sorted by Input Cost)</h2>
        <div className="pricing-table-wrap">
          <table className="pricing-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Provider</th>
                <th>Input / 1M</th>
                <th>Output / 1M</th>
                <th>Context Window</th>
              </tr>
            </thead>
            <tbody>
              {sortedModels.map((model) => (
                <tr key={model.id}>
                  <td>
                    <div className="pricing-table__model">
                      <span className="pricing-table__dot" style={{ backgroundColor: model.color }} />
                      <a href={`/${model.id.includes("gpt") ? "gpt" : model.id.includes("claude") ? "claude" : model.id.includes("gemini") ? "gemini" : model.id.includes("deep") ? "deepseek" : "llama"}-token-calculator`}
                        style={{ color: "inherit", textDecoration: "none" }}>
                        {model.name}
                      </a>
                    </div>
                  </td>
                  <td style={{ color: "var(--text-tertiary)", fontSize: "0.8125rem" }}>{model.provider}</td>
                  <td className="pricing-table__price" style={{
                    color: model.inputPrice <= 0.3 ? "var(--success)" : model.inputPrice <= 3 ? "var(--text-primary)" : "var(--warning)"
                  }}>
                    ${model.inputPrice < 0.1 ? model.inputPrice.toFixed(3) : model.inputPrice.toFixed(2)}
                  </td>
                  <td className="pricing-table__price">
                    ${model.outputPrice < 1 ? model.outputPrice.toFixed(2) : model.outputPrice.toFixed(2)}
                  </td>
                  <td className="pricing-table__context">{formatNumber(model.contextWindow)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cost Calculator Per Use Case */}
      <section className="pricing-section">
        <h2 className="pricing-section__title">📊 Real Cost Comparison by Use Case</h2>
        <div className="pricing-table-wrap">
          <table className="pricing-table">
            <thead>
              <tr>
                <th>Model</th>
                {useCases.map((uc) => (
                  <th key={uc.name}>{uc.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedModels.map((model) => (
                <tr key={model.id}>
                  <td>
                    <div className="pricing-table__model">
                      <span className="pricing-table__dot" style={{ backgroundColor: model.color }} />
                      {model.name}
                    </div>
                  </td>
                  {useCases.map((uc) => {
                    const cost = (uc.tokens / 1_000_000) * model.inputPrice;
                    return (
                      <td key={uc.name} className="pricing-table__price">
                        ${cost < 0.01 ? cost.toFixed(5) : cost.toFixed(4)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="container container--narrow" style={{ marginBottom: "3rem", padding: "0 1.5rem" }}>
        <article style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>
            Key Pricing Takeaways for 2026
          </h2>

          <div style={{ marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              🏆 Cheapest Overall: Gemini 1.5 Flash
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
              At $0.075 per 1M input tokens, Gemini 1.5 Flash is the cheapest major LLM API. It&apos;s 33x cheaper than GPT-4o for input tokens while offering a massive 1M context window. Ideal for high-volume, simple tasks.
            </p>
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              ⚡ Best Value Mid-Tier: DeepSeek V3
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
              DeepSeek V3 offers GPT-4-class reasoning at $0.27/$1.10 per 1M tokens — approximately 9x cheaper than GPT-4o. Best choice for developers who need strong performance on a budget.
            </p>
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              📏 Largest Context: Gemini 1.5 Pro (2M tokens)
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
              Gemini 1.5 Pro&apos;s 2 million token context window dwarfs all competitors. Claude offers 200K, while GPT-4o and DeepSeek V3 provide 128K. For processing entire codebases or long documents, Gemini Pro is unmatched.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              🎯 Best for Quality-Critical Tasks: GPT-4o
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
              Despite being mid-priced at $2.50/$10.00 per 1M tokens, GPT-4o remains the go-to for tasks where output quality matters most — creative writing, complex reasoning, and nuanced instruction-following. Its o200k_base tokenizer is also the most token-efficient for English text.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
