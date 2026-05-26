/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import TokenCalculator from "@/components/TokenCalculator";
import CostProjector from "@/components/CostProjector";

export const metadata = {
  title: "LLM API Pricing Index — April 2026",
  description:
    "The complete LLM API pricing index for April 2026. Compare per-token costs for GPT-4.1, Claude Opus, Gemini 2.5 Pro, DeepSeek V3, and Llama 4.",
  alternates: {
    canonical: "/blog/llm-pricing-index-april-2026",
  },
};

export default function PricingIndex() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the cheapest LLM API in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The cheapest production-grade APIs in 2026 are Gemini 2.5 Flash ($0.075/1M), GPT-4.1 Nano ($0.10/1M), and DeepSeek V3-0324 ($0.14/1M). All of these models execute 1M tokens under 15 cents.",
        },
      },
      {
        "@type": "Question",
        name: "What is the most expensive LLM API in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Claude Opus 4.7 is currently the most expensive foundational model at $5 per 1M input tokens and $25 per 1M output tokens, while o3-pro leads the reasoning category at $20/$80 per 1M tokens.",
        },
      },
      {
        "@type": "Question",
        name: "Is output fundamentally more expensive than input?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Across the entire industry, output token prices are universally pegged at roughly 3x to 5x higher than input token prices due to generation overhead.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="container" style={{ padding: "40px 24px", maxWidth: "800px" }}>
        <article className="blog-post">
          <header style={{ marginBottom: "40px" }}>
            <Link href="/blog" style={{ color: "var(--accent)", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", textDecoration: "none" }}>
              ← Back to Blog
            </Link>
            <h1 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, marginTop: "16px", marginBottom: "16px" }}>
              LLM API Pricing Index — April 2026
            </h1>
            <div style={{ color: "var(--text-tertiary)", fontSize: "14px", fontFamily: "var(--font-mono)" }}>
              Updated April 2026 • 6 min read
            </div>
          </header>

          <div style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "40px" }}>
            <p style={{ padding: "20px", background: "var(--bg-secondary)", borderLeft: "4px solid var(--accent)", borderRadius: "8px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "32px" }}>
              Welcome to the complete, unadulterated listing of major LLM API prices as of <strong>April 2026</strong>. Use this reference alongside our <Link href="/" style={{textDecoration: "underline", color: "var(--text-primary)"}}>Token Calculator</Link> to accurately project operational scales.
            </p>

            <h2 style={{ fontSize: "1.75rem", color: "var(--text-primary)", marginTop: "40px", marginBottom: "20px" }}>The Big Three: Flagship Models</h2>
            <div style={{ overflowX: "auto" }}>
              <table className="pricing-table-v2" style={{ width: '100%', marginBottom: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: '8px' }}>
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Input (per 1M)</th>
                    <th>Output (per 1M)</th>
                    <th>Context</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Claude Opus 4.7</strong></td>
                    <td className="font-mono text-error">$5.00</td>
                    <td className="font-mono text-error">$25.00</td>
                    <td className="font-mono">200K</td>
                  </tr>
                  <tr>
                    <td><strong>GPT-4.1</strong></td>
                    <td className="font-mono">$2.00</td>
                    <td className="font-mono">$8.00</td>
                    <td className="font-mono">1M</td>
                  </tr>
                  <tr>
                    <td><strong>Gemini 2.5 Pro</strong></td>
                    <td className="font-mono text-success">$1.25</td>
                    <td className="font-mono text-success">$10.00</td>
                    <td className="font-mono">2M</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 style={{ fontSize: "1.75rem", color: "var(--text-primary)", marginTop: "40px", marginBottom: "20px" }}>The Mid-Tier / Reasoning Models</h2>
            <div style={{ overflowX: "auto" }}>
              <table className="pricing-table-v2" style={{ width: '100%', marginBottom: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: '8px' }}>
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Input (per 1M)</th>
                    <th>Output (per 1M)</th>
                    <th>Context</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>OpenAI o3</strong></td>
                    <td className="font-mono">$10.00</td>
                    <td className="font-mono">$30.00</td>
                    <td className="font-mono">128K</td>
                  </tr>
                  <tr>
                    <td><strong>Claude Sonnet 4.6</strong></td>
                    <td className="font-mono">$3.00</td>
                    <td className="font-mono">$15.00</td>
                    <td className="font-mono">200K</td>
                  </tr>
                  <tr>
                    <td><strong>GPT-4o</strong></td>
                    <td className="font-mono">$2.50</td>
                    <td className="font-mono">$10.00</td>
                    <td className="font-mono">128K</td>
                  </tr>
                  <tr>
                    <td><strong>Llama 4 Maverick</strong></td>
                    <td className="font-mono">$0.80</td>
                    <td className="font-mono">$2.40</td>
                    <td className="font-mono">512K</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 style={{ fontSize: "1.75rem", color: "var(--text-primary)", marginTop: "40px", marginBottom: "20px" }}>The Budget / Speed Models</h2>
            <div style={{ overflowX: "auto" }}>
              <table className="pricing-table-v2" style={{ width: '100%', marginBottom: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: '8px' }}>
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Input (per 1M)</th>
                    <th>Output (per 1M)</th>
                    <th>Context</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>DeepSeek V3-0324</strong></td>
                    <td className="font-mono">$0.27</td>
                    <td className="font-mono">$1.10</td>
                    <td className="font-mono">128K</td>
                  </tr>
                  <tr>
                    <td><strong>GPT-4o Mini</strong></td>
                    <td className="font-mono">$0.15</td>
                    <td className="font-mono">$0.60</td>
                    <td className="font-mono">128K</td>
                  </tr>
                  <tr>
                    <td><strong>Claude Haiku 4.5</strong></td>
                    <td className="font-mono">$0.25</td>
                    <td className="font-mono">$1.25</td>
                    <td className="font-mono">200K</td>
                  </tr>
                  <tr>
                    <td><strong>GPT-4.1 Nano</strong></td>
                    <td className="font-mono text-success">$0.10</td>
                    <td className="font-mono text-success">$0.40</td>
                    <td className="font-mono">1M</td>
                  </tr>
                  <tr>
                    <td><strong>Gemini 2.5 Flash</strong></td>
                    <td className="font-mono text-success">$0.075</td>
                    <td className="font-mono text-success">$0.30</td>
                    <td className="font-mono">1M</td>
                  </tr>
                  <tr>
                    <td><strong>Llama 4 Scout</strong></td>
                    <td className="font-mono text-success">$0.05</td>
                    <td className="font-mono text-success">$0.15</td>
                    <td className="font-mono">256K</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 style={{ fontSize: "1.75rem", color: "var(--text-primary)", marginTop: "40px", marginBottom: "20px" }}>Compare costs dynamically</h2>
            <p style={{ marginBottom: "24px" }}>
              Static tables are only partially helpful if you aren't sure how exactly your text prompts align to their respective tokenizers. Test them side by side below dynamically:
            </p>
            <div style={{ margin: "40px -24px" }}>
              <TokenCalculator />
            </div>
            
            <h2 style={{ fontSize: "1.75rem", color: "var(--text-primary)", marginTop: "40px", marginBottom: "20px" }}>Scale with Month Projections</h2>
            <div style={{ margin: "40px -24px 0" }}>
              <CostProjector inputTokens={25000} />
            </div>

          </div>
        </article>
      </main>
    </>
  );
}
