import ModelCalculator from "@/components/ModelCalculator";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "Claude Token Calculator — Free Anthropic Token Counter & Cost Estimator",
  description:
    "Free Claude token calculator. Count tokens, estimate API costs, and visualize tokenization for Claude Sonnet 4.6 and Claude 3 Haiku in real time. No signup required.",
  keywords: ["Claude token calculator", "Anthropic token counter", "Claude Sonnet token calculator", "Claude API cost"],
  openGraph: {
    title: "Claude Token Calculator — Free Anthropic Token Counter",
    description: "Count Claude tokens, estimate API costs, and visualize tokenization in real time.",
  },
  alternates: {
    canonical: "/claude-token-calculator",
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
    description: "Free real-time token calculator for Anthropic Claude models including Sonnet 4.6 and Haiku.",
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

      <section className="hero" style={{ paddingBottom: "1.5rem" }}>
        <nav style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
          <a href="/" style={{ color: "var(--text-tertiary)", textDecoration: "none" }}>Home</a>
          <span style={{ margin: "0 0.5rem" }}>/</span>
          <span style={{ color: "var(--text-primary)" }}>Claude Token Calculator</span>
        </nav>
        <h1 className="hero__title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
          Claude <span>Token Calculator</span>
        </h1>
        <p className="hero__subtitle">
          Count tokens for Anthropic Claude Sonnet 4.6 and Haiku.
          Real-time counting, cost estimation, and token visualization — 100% free.
        </p>
      </section>

      <ModelCalculator
        modelId="claude-3.5-sonnet"
        relatedModelIds={["claude-3-haiku", "gpt-4o", "gemini-1.5-pro", "deepseek-v3"]}
      />

      <section className="container container--narrow" style={{ marginBottom: "2rem", padding: "0 1.5rem" }}>
        <article style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            How Claude Tokenization Works
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            Anthropic&apos;s Claude uses a proprietary tokenizer that differs from OpenAI&apos;s tiktoken. While exact token-for-token counts may vary slightly from this calculator&apos;s approximation, the estimates are within 5-10% accuracy for most English text — sufficient for cost planning.
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            Claude Sonnet 4.6 costs <strong>$3.00 per 1M input tokens</strong> and <strong>$15.00 per 1M output tokens</strong>. For budget applications, Claude 3 Haiku offers dramatically lower pricing at just $0.25/$1.25 per 1M tokens while maintaining strong capabilities.
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Claude&apos;s standout feature is its <strong>200K context window</strong> — significantly larger than GPT-4o&apos;s 128K. This makes Claude ideal for processing long documents, legal contracts, and extensive codebases in a single request.
          </p>
        </article>
      </section>

      <FAQ />
    </>
  );
}
