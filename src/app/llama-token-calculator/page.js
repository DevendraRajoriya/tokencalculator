import ModelCalculator from "@/components/ModelCalculator";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "LLaMA Token Calculator — Free Meta LLaMA 3.1 Token Counter & Cost Estimator",
  description:
    "Free LLaMA token calculator. Count tokens, estimate API costs, and visualize tokenization for Meta LLaMA 3.1 70B in real time. Open-source model, multiple hosting options.",
  keywords: ["LLaMA token calculator", "Meta LLaMA token counter", "LLaMA 3.1 tokens", "open source LLM token counter"],
  openGraph: {
    title: "LLaMA Token Calculator — Free Meta LLaMA Token Counter",
    description: "Count LLaMA 3.1 tokens, estimate API costs, and visualize tokenization in real time.",
  },
  alternates: {
    canonical: "/llama-token-calculator",
  },
};

export default function LlamaTokenCalculator() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "LLaMA Token Calculator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Free real-time token calculator for Meta's open-source LLaMA 3.1 70B model.",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "LLaMA Token Calculator", item: "/llama-token-calculator" },
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
          <span style={{ color: "var(--text-primary)" }}>LLaMA Token Calculator</span>
        </nav>
        <h1 className="hero__title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
          LLaMA 3.1 <span>Token Calculator</span>
        </h1>
        <p className="hero__subtitle">
          Count tokens for Meta&apos;s open-source LLaMA 3.1 70B model.
          Real-time counting, cost estimation, and visualization — 100% free.
        </p>
      </section>

      <ModelCalculator
        modelId="llama-3.1-70b"
        relatedModelIds={["deepseek-v3", "gpt-4o-mini", "claude-3-haiku", "gemini-1.5-flash"]}
      />

      <section className="container container--narrow" style={{ marginBottom: "2rem", padding: "0 1.5rem" }}>
        <article style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            LLaMA 3.1 Tokenization and Hosting Options
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            Meta&apos;s LLaMA 3.1 70B is one of the most capable <strong>open-source language models</strong> available. Unlike proprietary models from OpenAI and Anthropic, LLaMA can be self-hosted on your own infrastructure — meaning tokenization costs depend on your hosting provider.
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            Through API providers like Together.ai and Fireworks.ai, LLaMA 3.1 70B costs approximately <strong>$0.59 per 1M input tokens</strong> and <strong>$0.79 per 1M output tokens</strong>. Self-hosting on GPU instances can be cheaper at scale but requires infrastructure management.
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            LLaMA uses a SentencePiece-based tokenizer with a 128K vocabulary. It supports a <strong>131K context window</strong> and excels at multilingual tasks, code generation, and following complex instructions. For privacy-sensitive applications, self-hosting LLaMA ensures your data never leaves your infrastructure.
          </p>
        </article>
      </section>

      <FAQ />
    </>
  );
}
