import ModelCalculator from "@/components/ModelCalculator";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "GPT-4o Token Calculator — Free OpenAI Token Counter & Cost Estimator",
  description:
    "Free GPT-4o token calculator. Count tokens, estimate API costs, and visualize tokenization for OpenAI GPT-4o in real time. Uses the official tiktoken o200k_base encoding.",
  keywords: ["GPT token calculator", "GPT-4o token counter", "OpenAI token calculator", "GPT-4o cost calculator"],
  openGraph: {
    title: "GPT-4o Token Calculator — Free OpenAI Token Counter",
    description: "Count GPT-4o tokens, estimate API costs, and visualize tokenization in real time.",
  },
  alternates: {
    canonical: "/gpt-token-calculator",
  },
};

export default function GPTTokenCalculator() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GPT-4o Token Calculator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Free real-time token calculator specifically for OpenAI GPT-4o. Uses the official o200k_base tokenizer.",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "GPT-4o Token Calculator", item: "/gpt-token-calculator" },
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
          <span style={{ color: "var(--text-primary)" }}>GPT-4o Token Calculator</span>
        </nav>
        <h1 className="hero__title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
          GPT-4o <span>Token Calculator</span>
        </h1>
        <p className="hero__subtitle">
          Count tokens for OpenAI GPT-4o using the official o200k_base encoder.
          Real-time counting, cost estimation, and token visualization — 100% free.
        </p>
      </section>

      <ModelCalculator
        modelId="gpt-4o"
        relatedModelIds={["gpt-4o-mini", "gpt-4-turbo", "gpt-3.5-turbo", "claude-3.5-sonnet", "deepseek-v3"]}
      />

      {/* SEO Content */}
      <section className="container container--narrow" style={{ marginBottom: "2rem", padding: "0 1.5rem" }}>
        <article style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            How GPT-4o Tokenization Works
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            GPT-4o uses OpenAI&apos;s <strong>o200k_base</strong> encoding — a vocabulary of 200,000 tokens, double the size of the cl100k_base encoding used by GPT-4 and GPT-3.5. This larger vocabulary means GPT-4o typically produces <strong>fewer tokens for the same text</strong>, making it more cost-efficient per character.
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            At <strong>$2.50 per 1M input tokens</strong> and <strong>$10.00 per 1M output tokens</strong>, GPT-4o sits in the mid-range for pricing. For budget-conscious applications, GPT-4o Mini offers the same quality for simple tasks at just $0.15/$0.60 per 1M tokens — a 94% cost reduction.
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            GPT-4o supports a <strong>128K context window</strong> (approximately 96,000 words), making it suitable for processing long documents, code files, and multi-turn conversations without chunking.
          </p>
        </article>
      </section>

      <FAQ />
    </>
  );
}
