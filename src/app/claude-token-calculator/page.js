import ClaudeTabs from "@/components/ClaudeTabs";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "Claude Token Calculator — Free Anthropic Token Counter & Cost Estimator",
  description:
    "Free Claude token calculator with built-in tokenizer. Count tokens, estimate API costs, and visualize tokenization for Claude Opus 4.7, Sonnet 4.6 and Claude 3 Haiku in real time. No signup required.",
  keywords: ["Claude token calculator", "Anthropic token counter", "Claude tokenizer", "Claude Sonnet token calculator", "Claude API cost", "tokenizer"],
  openGraph: {
    title: "Claude Token Calculator — Free Anthropic Token Counter",
    description: "Count Claude tokens, estimate API costs, and visualize tokenization in real time.",
  },
  alternates: {
    canonical: "/claude-token-calculator",
    languages: {
      "x-default": "/claude-token-calculator",
      en: "/claude-token-calculator",
      de: "/de/claude-token-calculator",
      fr: "/fr/claude-token-calculator",
      es: "/es/claude-token-calculator",
      ja: "/ja/claude-token-calculator",
      "pt-BR": "/pt-br/claude-token-calculator",
      ko: "/ko/claude-token-calculator",
      zh: "/zh/claude-token-calculator",
    },
  },
};

export default function ClaudeTokenCalculator() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Claude Token Calculator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Free real-time Claude token calculator with tokenizer for Anthropic models including Opus 4.7, Sonnet 4.6 and Haiku.",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Claude Token Calculator", item: "/claude-token-calculator" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div style={{ zoom: 0.8 }}>

      <section className="hero" style={{ padding: "16px 24px 0" }}>
        <h1 className="hero__title font-display" style={{ fontSize: "clamp(1.5rem, 4.5vw, 3.25rem)", whiteSpace: "normal", lineHeight: 1.1, marginBottom: "0.5rem", fontWeight: 800 }}>
          Claude Token <span className="text-accent">Calculator</span>
        </h1>
        <p className="hero__subtitle" style={{ fontSize: "1.125rem", maxWidth: "600px", margin: "0 auto 0.5rem", color: "var(--text-secondary)" }}>
          Highly accurate <strong>Anthropic tokenizer</strong> for real-time counting, cost estimation, and token visualization.
        </p>
      </section>

      <ClaudeTabs
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
              How Claude Tokenization Works
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
              { label: "Accuracy", value: "~95%", note: "vs Anthropic API" },
              { label: "Opus 4.7 Input", value: "$5.00", note: "per 1M tokens" },
              { label: "Context Window", value: "1M", note: "Opus & Sonnet" },
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
              Anthropic&apos;s Claude uses a proprietary tokenizer that differs from OpenAI&apos;s tiktoken. While exact counts may vary slightly, estimates are within <strong style={{ color: "var(--text-primary)" }}>5–10% accuracy</strong> for most English text — sufficient for cost planning and context management.
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>
              Claude Sonnet 4.6 costs <strong style={{ color: "var(--text-primary)" }}>$3.00 / $15.00 per 1M tokens</strong> (input/output). Claude Opus 4.7 runs at $5.00 / $25.00 per 1M. For budget use cases, Claude 3 Haiku offers just $0.25 / $1.25 per 1M tokens.
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>
              Claude&apos;s standout feature is its <strong style={{ color: "var(--text-primary)" }}>1M token context window</strong> on Opus and Sonnet models — far larger than GPT-4o&apos;s 128K — making it ideal for long documents, legal contracts, and large codebases in a single request.
            </p>
          </div>
        </div>
      </section>

      <FAQ />
      </div>
    </>
  );
}
