import Link from "next/link";
import { MODELS } from "@/lib/models";

export const metadata = {
  title: "LLM Pricing Index — March 2026 (All Models, All Providers)",
  description:
    "Comprehensive monthly pricing data for every major LLM API. Input/output prices, context windows, and provider comparisons for GPT-4o, Claude, Gemini, DeepSeek, and LLaMA.",
  keywords: [
    "LLM API pricing comparison 2026",
    "LLM pricing index March 2026",
    "cheapest AI model API",
    "OpenAI API cost",
    "Anthropic API cost",
    "DeepSeek API cost",
  ],
  openGraph: {
    title: "LLM Pricing Index — March 2026",
    description: "The definitive reference for LLM API costs. Monthly updated pricing comparison across 10+ models.",
    type: "article",
    publishedTime: "2026-03-31T00:00:00Z",
  },
  alternates: { canonical: "/blog/llm-pricing-index-march-2026" },
};

export default function PricingIndex() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "LLM Pricing Index — March 2026 (All Models, All Providers)",
    datePublished: "2026-03-31T00:00:00Z",
    dateModified: "2026-03-31T00:00:00Z",
    author: { "@type": "Organization", name: "Token Calculator" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
      { "@type": "ListItem", position: 3, name: "LLM Pricing Index March 2026", item: "/blog/llm-pricing-index-march-2026" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which LLM API is the cheapest in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Google Gemini 1.5 Flash is currently the cheapest mainstream LLM API at $0.075 per million input tokens, followed by GPT-4o Mini at $0.150."
        }
      },
      {
        "@type": "Question",
        name: "Why is GPT-4o more expensive than models like DeepSeek?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "OpenAI prices GPT-4o as a premium tier model designed for complex multi-modal intelligence and extensive reasoning, whereas newer models like DeepSeek focus predominantly on lightweight code and fast language synthesis at reduced hardware margins."
        }
      },
      {
        "@type": "Question",
        name: "How much does Claude 3 Haiku cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Claude 3 Haiku is Anthropic's fastest and most compact model, charging roughly $0.25 per million input tokens."
        }
      },
      {
        "@type": "Question",
        name: "How much does GPT-4 Turbo cost per million tokens?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GPT-4 Turbo remains an expensive legacy flagship, costing $10.00 per million input tokens and $30.00 per million output tokens."
        }
      },
      {
        "@type": "Question",
        name: "Are output tokens always more expensive?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, output (completion) tokens are computationally far more expensive for the GPU cluster to generate vs simply ingesting/embedding the input context tokens."
        }
      }
    ]
  };

  const s = {
    h2: { fontSize: "1.375rem", fontWeight: 700, marginBottom: "0.75rem", marginTop: "2.25rem", lineHeight: 1.3 },
    p: { fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1rem" },
    callout: { background: "var(--bg-secondary)", border: "1px solid var(--border-primary)", borderRadius: "var(--radius-lg)", padding: "1.25rem 1.5rem", marginBottom: "1.5rem" },
    link: { color: "var(--accent)", textDecoration: "none" },
    th: { textAlign: "left", padding: "0.625rem 1rem", borderBottom: "2px solid var(--border-primary)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", fontFamily: "var(--font-mono)" },
    td: { padding: "0.625rem 1rem", borderBottom: "1px solid var(--border-primary)", color: "var(--text-secondary)" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="hero" style={{ paddingBottom: "1rem" }}>
        <nav style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
          <Link href="/" style={s.link}>Home</Link><span style={{ margin: "0 0.5rem" }}>/</span>
          <Link href="/blog" style={s.link}>Blog</Link><span style={{ margin: "0 0.5rem" }}>/</span>
          <span style={{ color: "var(--text-primary)" }}>Pricing Index (March 2026)</span>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "center", marginBottom: "0.75rem", flexWrap: "wrap" }}>
          <span style={{ padding: "0.125rem 0.5rem", borderRadius: "var(--radius-full)", background: "var(--error-subtle)", color: "var(--error)", fontSize: "0.6875rem", fontWeight: 600, fontFamily: "var(--font-mono)" }}>Data</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>March 31, 2026</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>4 min read</span>
        </div>
        <h1 className="hero__title" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}>
          LLM Pricing Index —{" "}<span>March 2026</span>
        </h1>
      </section>

      <section className="container" style={{ marginBottom: "3rem", padding: "0 1.5rem" }}>
        <article style={{ maxWidth: "720px", margin: "0 auto" }}>

          <p style={{ ...s.p, fontSize: "1.0625rem", color: "var(--text-primary)", fontWeight: 500 }}>
            Welcome to the March 2026 LLM Pricing Index. This month saw Anthropic solidify its position with Claude Sonnet 4.6, DeepSeek maintaining its aggressive budget pricing, and OpenAI holding steady with GPT-4o. Track all costs here.
          </p>

          <h2 style={s.h2}>The Price Per Million Tokens</h2>
          <p style={s.p}>Prices are listed in USD per 1 Million tokens. Sorted from least expensive to most expensive input cost.</p>
          <div style={{ ...s.callout, padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead><tr>
                <th style={s.th}>Model</th>
                <th style={s.th}>Provider</th>
                <th style={s.th}>Input / 1M</th>
                <th style={s.th}>Output / 1M</th>
              </tr></thead>
              <tbody>
                {MODELS.sort((a, b) => a.inputPrice - b.inputPrice).map(m => (
                  <tr key={m.id}>
                    <td style={{ ...s.td, fontWeight: 500, color: "var(--text-primary)" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: m.color, display: "inline-block", marginRight: "0.5rem" }} />
                      {m.name}
                    </td>
                    <td style={{ ...s.td }}>{m.provider}</td>
                    <td style={{ ...s.td, fontFamily: "var(--font-mono)", color: m.inputPrice < 0.5 ? "var(--success)" : m.inputPrice >= 5 ? "var(--warning)" : "var(--text-secondary)" }}>
                      ${m.inputPrice.toFixed(m.inputPrice < 0.1 ? 3 : 2)}
                    </td>
                    <td style={{ ...s.td, fontFamily: "var(--font-mono)" }}>
                      ${m.outputPrice.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={s.h2}>Key Insights for March 2026</h2>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.5rem" }}>1. The Gap Between Flagship and &quot;Mini&quot; Models Has Widened</h3>
          <p style={s.p}>
            GPT-4o Mini ($0.15 input) is now a staggering <strong>94% cheaper</strong> than GPT-4o ($2.50 input). For 80% of pipeline tasks (classification, basic extraction), developers are abandoning flagship models entirely.
          </p>

          <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.5rem" }}>2. DeepSeek Remains the Price/Performance King</h3>
          <p style={s.p}>
            At just $0.27 per 1M input tokens, DeepSeek V3 costs less than 10% of Claude Sonnet and GPT-4o while often matching their performance on coding and translation tasks.
          </p>

          <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.5rem" }}>3. Context Windows Determine RAG Costs</h3>
          <p style={s.p}>
            Filling Gemini 1.5 Pro&apos;s 2M context window costs exactly $2.50 per request. While powerful, doing this across 1,000 queries heavily outweighs the cost of setting up a proper vector database for RAG.
          </p>

          <div style={{ ...s.callout, marginTop: "2rem" }}>
            <p style={{ fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)" }}>📚 Calculate Your Costs:</p>
            <ul style={{ ...s.p, paddingLeft: "1.5rem", marginBottom: 0 }}>
               <li><Link href="/" style={s.link}>Real-Time Token Calculator</Link> — Test your specific prompts instantly.</li>
               <li><Link href="/blog/reduce-llm-api-costs" style={s.link}>How to Reduce GPT-4o API Costs by 60%</Link> — Learn to shrink your bills.</li>
            </ul>
          </div>
        </article>
      </section>
    </>
  );
}
