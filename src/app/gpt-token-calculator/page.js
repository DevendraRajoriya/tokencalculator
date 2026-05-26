import OpenAITabs from "@/components/OpenAITabs";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "ChatGPT Token Calculator — Free OpenAI Token Counter & Cost Estimator",
  description:
    "Free ChatGPT token calculator with built-in tokenizer. Count tokens, estimate API costs, and visualize tokenization for GPT-5.4, GPT-4o, o3, and more — in real time. No signup required.",
  keywords: ["ChatGPT token calculator", "OpenAI token calculator", "GPT tokenizer", "GPT-4o token calculator", "OpenAI API cost", "tokenizer"],
  openGraph: {
    title: "ChatGPT Token Calculator — Free OpenAI Token Counter",
    description: "Count ChatGPT tokens, estimate API costs, and visualize tokenization in real time.",
  },
  alternates: {
    canonical: "/gpt-token-calculator",
    languages: {
      "x-default": "/gpt-token-calculator",
      en: "/gpt-token-calculator",
      de: "/de/gpt-token-calculator",
      fr: "/fr/gpt-token-calculator",
    },
  },
};

export default function GPTTokenCalculator() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ChatGPT Token Calculator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Free real-time ChatGPT token calculator with tokenizer for OpenAI models including GPT-5.4, GPT-4o, o3, and GPT-4.1.",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "ChatGPT Token Calculator", item: "/gpt-token-calculator" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div style={{ zoom: 0.8 }}>

      <section className="hero" style={{ padding: "16px 24px 0" }}>
        <h1 className="hero__title font-display" style={{ fontSize: "clamp(1.5rem, 4.5vw, 3.25rem)", whiteSpace: "nowrap", lineHeight: 1.1, marginBottom: "0.5rem", fontWeight: 800 }}>
          ChatGPT Token <span className="text-accent">Calculator</span>
        </h1>
        <p className="hero__subtitle" style={{ fontSize: "1.125rem", maxWidth: "600px", margin: "0 auto 0.5rem", color: "var(--text-secondary)" }}>
          Highly accurate <strong>OpenAI tokenizer</strong> for real-time counting, cost estimation, and token visualization.
        </p>
      </section>

      <OpenAITabs
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
              How OpenAI Tokenization Works
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
              { label: "Encoding", value: "o200k", note: "GPT-4o & GPT-5.x" },
              { label: "GPT-5.4 Input", value: "$2.50", note: "per 1M tokens" },
              { label: "Context Window", value: "272K", note: "GPT-5.4 & GPT-4.1" },
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
              OpenAI models use the <strong style={{ color: "var(--text-primary)" }}>tiktoken</strong> library — specifically <strong style={{ color: "var(--text-primary)" }}>o200k_base</strong> for GPT-5.x, GPT-4o, and o-series models, and <strong style={{ color: "var(--text-primary)" }}>cl100k_base</strong> for legacy GPT-4 and GPT-3.5 Turbo. This calculator uses the exact same encodings for accurate token counts.
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>
              GPT-5.4 costs <strong style={{ color: "var(--text-primary)" }}>$2.50 / $15.00 per 1M tokens</strong> (input/output). GPT-4o runs at $2.50 / $10.00 per 1M. For budget tasks, GPT-4o Mini offers just $0.15 / $0.60 per 1M tokens.
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>
              Input and output tokens are billed separately — the same prompt costs different amounts depending on model and response length. Use the pricing comparison table below the calculator to pick the best price-to-quality ratio for your workload.
            </p>
          </div>
        </div>
      </section>

      <FAQ />
      </div>
    </>
  );
}
