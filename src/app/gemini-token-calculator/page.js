import GeminiTabs from "@/components/GeminiTabs";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "Gemini Token Calculator — Free Google AI Token Counter & Cost Estimator",
  description:
    "Free Gemini token calculator with built-in tokenizer. Count tokens, estimate API costs, and visualize tokenization for Gemini 2.5 Pro and Gemini 2.5 Flash in real time. Supports 2M context window.",
  keywords: ["Gemini token calculator", "Google AI token counter", "Gemini tokenizer", "Gemini 2.5 Pro tokens", "Gemini API cost", "tokenizer"],
  openGraph: {
    title: "Gemini Token Calculator — Free Google AI Token Counter",
    description: "Count Gemini tokens, estimate API costs, and visualize tokenization in real time.",
  },
  alternates: {
    canonical: "/gemini-token-calculator",
    languages: {
      "x-default": "/gemini-token-calculator",
      en: "/gemini-token-calculator",
      de: "/de/gemini-token-calculator",
      fr: "/fr/gemini-token-calculator",
      es: "/es/gemini-token-calculator",
      ja: "/ja/gemini-token-calculator",
      "pt-BR": "/pt-br/gemini-token-calculator",
      ko: "/ko/gemini-token-calculator",
      zh: "/zh/gemini-token-calculator",
    },
  },
};

export default function GeminiTokenCalculator() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Gemini Token Calculator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Free real-time Gemini token calculator with tokenizer for Google AI models including 2.5 Pro and 2.5 Flash.",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Gemini Token Calculator", item: "/gemini-token-calculator" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div style={{ zoom: 0.8 }}>

      <section className="hero" style={{ padding: "16px 24px 0" }}>
        <h1 className="hero__title font-display" style={{ fontSize: "clamp(1.5rem, 4.5vw, 3.25rem)", whiteSpace: "nowrap", lineHeight: 1.1, marginBottom: "0.5rem", fontWeight: 800 }}>
          Gemini Token <span className="text-accent">Calculator</span>
        </h1>
        <p className="hero__subtitle" style={{ fontSize: "1.125rem", maxWidth: "600px", margin: "0 auto 0.5rem", color: "var(--text-secondary)" }}>
          Highly accurate <strong>Google tokenizer</strong> for real-time counting, cost estimation, and token visualization.
        </p>
      </section>

      <GeminiTabs
        exactNumbers={true}
        compactVisualizer={true}
        showAllModels={true}
        defaultText="The quick brown fox jumps over the lazy dog. 🦊"
      />

      <section className="container" style={{ marginTop: "2rem", marginBottom: "3rem" }}>
        <div style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          boxShadow: "var(--shadow-sm)",
        }}>
          {/* Header */}
          <div style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}>
            <span style={{ fontSize: "1.125rem" }}>⚡</span>
            <h2 style={{
              fontSize: "0.9375rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: 0,
              fontFamily: "var(--font-sans)",
            }}>
              How Gemini Tokenization Works
            </h2>
          </div>

          {/* Stat Pills */}
          <div style={{
            display: "flex",
            gap: "0",
            borderBottom: "1px solid var(--border-subtle)",
            flexWrap: "wrap",
          }}>
            {[
              { label: "Tokenizer", value: "SPM", note: "SentencePiece — 100+ languages" },
              { label: "2.5 Pro Input", value: "$1.25", note: "per 1M tokens" },
              { label: "Context Window", value: "2M", note: "Gemini 2.5 Pro" },
            ].map((stat, i, arr) => (
              <div key={i} style={{
                flex: "1 1 160px",
                padding: "1rem 1.5rem",
                borderRight: i < arr.length - 1 ? "1px solid var(--border-subtle)" : "none",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                  letterSpacing: "-0.02em",
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>
                  {stat.note}
                </div>
              </div>
            ))}
          </div>

          {/* Body */}
          <div style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>
              Google&apos;s Gemini uses the <strong style={{ color: "var(--text-primary)" }}>SentencePiece tokenizer</strong> — a subword tokenization algorithm optimized for multilingual text across 100+ languages. This means Gemini can produce different token counts from GPT-4o for the same text, especially for non-English content.
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>
              Gemini 2.5 Pro supports a massive <strong style={{ color: "var(--text-primary)" }}>2M token context window</strong> — the largest among major commercial models — making it ideal for analyzing entire codebases, lengthy legal documents, or large datasets in a single API call.
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>
              Gemini 2.5 Flash costs just <strong style={{ color: "var(--text-primary)" }}>$0.30 / $2.50 per 1M tokens</strong> (input/output). For ultra-budget tasks, Gemini 2.5 Flash-Lite drops to <strong style={{ color: "var(--text-primary)" }}>$0.10 / $0.40 per 1M tokens</strong> — one of the cheapest capable models available.
            </p>
          </div>
        </div>
      </section>

      <FAQ />
      </div>
    </>
  );
}
