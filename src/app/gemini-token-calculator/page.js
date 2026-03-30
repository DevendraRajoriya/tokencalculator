import ModelCalculator from "@/components/ModelCalculator";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "Gemini Token Calculator — Free Google AI Token Counter & Cost Estimator",
  description:
    "Free Gemini token calculator. Count tokens, estimate API costs, and visualize tokenization for Gemini 1.5 Pro and Gemini 1.5 Flash in real time. Supports 2M context window.",
  keywords: ["Gemini token calculator", "Google AI token counter", "Gemini 1.5 Pro tokens", "Gemini API cost"],
  openGraph: {
    title: "Gemini Token Calculator — Free Google AI Token Counter",
    description: "Count Gemini tokens, estimate API costs, and visualize tokenization in real time.",
  },
  alternates: {
    canonical: "/gemini-token-calculator",
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
    description: "Free real-time token calculator for Google Gemini models including 1.5 Pro (2M context) and 1.5 Flash.",
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

      <section className="hero" style={{ paddingBottom: "1.5rem" }}>
        <nav style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
          <a href="/" style={{ color: "var(--text-tertiary)", textDecoration: "none" }}>Home</a>
          <span style={{ margin: "0 0.5rem" }}>/</span>
          <span style={{ color: "var(--text-primary)" }}>Gemini Token Calculator</span>
        </nav>
        <h1 className="hero__title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
          Gemini <span>Token Calculator</span>
        </h1>
        <p className="hero__subtitle">
          Count tokens for Google Gemini 1.5 Pro (2M context) and Flash.
          Real-time counting, cost estimation, and visualization — 100% free.
        </p>
      </section>

      <ModelCalculator
        modelId="gemini-1.5-pro"
        relatedModelIds={["gemini-1.5-flash", "gpt-4o", "claude-3.5-sonnet", "deepseek-v3"]}
      />

      <section className="container container--narrow" style={{ marginBottom: "2rem", padding: "0 1.5rem" }}>
        <article style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            How Gemini Tokenization Works
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            Google&apos;s Gemini models use a proprietary multilingual tokenizer optimized for over 100 languages. This calculator provides an approximation using a comparable encoding. For precise counts, Google provides a <code>countTokens</code> API endpoint, but our client-side tool gives you instant estimates without API calls.
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            Gemini 1.5 Pro&apos;s headline feature is its <strong>2 million token context window</strong> — the largest of any major model. At $1.25 per 1M input tokens, it&apos;s 50% cheaper than GPT-4o for input while offering 15x the context window. Gemini 1.5 Flash is even more affordable at just $0.075 per 1M input tokens.
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            For applications that need to process entire books, large codebases, or extensive document collections in a single prompt, Gemini 1.5 Pro is the clear choice — no chunking or RAG pipeline required for documents under ~1.5 million words.
          </p>
        </article>
      </section>

      <FAQ />
    </>
  );
}
