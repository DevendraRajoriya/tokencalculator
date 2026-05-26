import ModelCalculator from "@/components/ModelCalculator";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "DeepSeek Token Calculator — Free DeepSeek V3 Token Counter & Cost Estimator",
  description:
    "Free DeepSeek token calculator with built-in tokenizer. Count tokens, estimate API costs, and visualize tokenization for DeepSeek V3 in real time. One of the cheapest LLM APIs available in 2026.",
  keywords: ["DeepSeek token calculator", "DeepSeek V3 token counter", "DeepSeek tokenizer", "cheapest LLM API", "DeepSeek cost calculator", "tokenizer"],
  openGraph: {
    title: "DeepSeek Token Calculator — Free Token Counter",
    description: "Count DeepSeek V3 tokens, estimate API costs, and visualize tokenization in real time.",
  },
  alternates: {
    canonical: "/deepseek-token-calculator",
    languages: {
      "x-default": "/deepseek-token-calculator",
      en: "/deepseek-token-calculator",
      de: "/de/deepseek-token-calculator",
      fr: "/fr/deepseek-token-calculator",
      es: "/es/deepseek-token-calculator",
      ja: "/ja/deepseek-token-calculator",
      "pt-BR": "/pt-br/deepseek-token-calculator",
      ko: "/ko/deepseek-token-calculator",
      zh: "/zh/deepseek-token-calculator",
    },
  },
};

export default function DeepSeekTokenCalculator() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DeepSeek Token Calculator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Free real-time DeepSeek token calculator with tokenizer for DeepSeek V3 — one of the most cost-effective LLM APIs.",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "DeepSeek Token Calculator", item: "/deepseek-token-calculator" },
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
          <span style={{ color: "var(--text-primary)" }}>DeepSeek Token Calculator</span>
        </nav>
        <h1 className="hero__title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
          DeepSeek <span>Token Calculator</span>
        </h1>
        <p className="hero__subtitle">
          Count tokens for DeepSeek V3 — one of the cheapest LLM APIs in 2026.
          Real-time token calculator with tokenizer, cost estimation, and visualization — 100% free.
        </p>
      </section>

      <ModelCalculator
        modelId="deepseek-v3"
        relatedModelIds={["deepseek-r1", "gpt-4o-mini", "gpt-4o", "claude-3-haiku", "gemini-2-5-flash"]}
      />

      <section className="container" style={{ marginBottom: "2rem", padding: "0 1.5rem" }}>
        <article style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Why DeepSeek V3 Is the Budget Champion
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            DeepSeek V3 has disrupted the LLM pricing landscape by offering competitive performance at a fraction of the cost. At <strong>$0.27 per 1M input tokens</strong> and <strong>$1.10 per 1M output tokens</strong>, it&apos;s approximately 9x cheaper than GPT-4o for input and supports a full 128K context window.
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            For developers building cost-sensitive applications — chatbots, summarizers, content generators — DeepSeek V3 offers the best price-to-performance ratio in 2026. It particularly excels at coding tasks and structured data extraction.
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            The only models cheaper are Gemini 1.5 Flash ($0.075 input) and GPT-4o Mini ($0.15 input), but DeepSeek V3 offers stronger reasoning capabilities at the higher-end small-model quality tier.
          </p>
        </article>
      </section>

      <FAQ />
    </>
  );
}
