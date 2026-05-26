/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import TokenCalculator from "@/components/TokenCalculator";
import CostProjector from "@/components/CostProjector";

export const metadata = {
  title: "How to Reduce LLM API Costs by 60%: 10 Proven Techniques (2026)",
  description:
    "The definitive guide to reducing large language model API overhead. Discover how prompt caching, tiered models, and context constraints can save you thousands.",
  alternates: {
    canonical: "/blog/reduce-llm-api-costs",
  },
};

export default function ReduceCosts() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is prompt caching?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Prompt caching lets you store long static prefixes (like a heavy system prompt) to avoid paying full price for retrieving it in subsequent API requests. Both Anthropic and OpenAI support it.",
        },
      },
      {
        "@type": "Question",
        name: "How can I reduce LLM costs by 50% instantly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Switch to the Batch API. If you don't need real-time responses natively, placing queries in the offline Batch API (available via OpenAI and Anthropic) automatically applies a 50% cost discount on your tokens.",
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
              How to Reduce LLM API Costs by 60%: 10 Proven Techniques (2026)
            </h1>
            <div style={{ color: "var(--text-tertiary)", fontSize: "14px", fontFamily: "var(--font-mono)" }}>
              Updated April 2026 • 10 min read
            </div>
          </header>

          <div style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "40px" }}>
            <p style={{ padding: "20px", background: "var(--bg-secondary)", borderLeft: "4px solid var(--accent)", borderRadius: "8px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "32px" }}>
              <strong>Direct answer:</strong> The most effective cost reduction techniques are <strong>prompt caching</strong> (saves 50-90% on repeated content), <strong>model routing</strong> (use cheaper models for simple tasks), and drastically <strong>shorter system prompts</strong>.
            </p>

            <h2 style={{ fontSize: "1.75rem", color: "var(--text-primary)", marginTop: "40px", marginBottom: "20px" }}>Technique 1: Prompt Caching</h2>
            <p style={{ marginBottom: "16px" }}>
              OpenAI and Anthropic now support caching prefixes automatically. When you send a 1,000-token system prompt alongside a user query, you will pay full price the absolute first time. However, if a subsequent query uses the exact same 1,000 tokens as the prefix, the cached token block is discounted by 50% to 90%.
            </p>
            <p style={{ marginBottom: "24px" }}>
              <em>Example:</em> A 1000-token system prompt accessed 1000 times a day = $3/day normally, but with caching applied drops to $0.30 to $1.50 depending on the provider.
            </p>

            <h2 style={{ fontSize: "1.75rem", color: "var(--text-primary)", marginTop: "40px", marginBottom: "20px" }}>Technique 2: Model Routing and Tiered Access</h2>
            <p style={{ marginBottom: "16px" }}>
              You don't need a heavy logic solver for summarizing an email. Instead of sending every request to GPT-4o, route your data contextually. 
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "24px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Route 70%</strong> of basic tasks (data extraction, summarization, JSON parsing) to <strong>GPT-4o Mini</strong> or <strong>Gemini 2.5 Flash</strong>.</li>
              <li style={{ marginBottom: "8px" }}><strong>Route 20%</strong> of creative/interactive chatbot prompts to <strong>GPT-4.1 / GPT-4o</strong>.</li>
              <li style={{ marginBottom: "8px" }}><strong>Route 10%</strong> of extreme logic reasoning to <strong>o3</strong> or <strong>Claude Opus 4.7</strong>.</li>
            </ul>
            <p style={{ marginBottom: "24px", color: "var(--text-primary)" }}>
              Test your exact system prompt right now to visualize the cost discrepancies:
            </p>
            <div style={{ margin: "40px -24px" }}>
              <TokenCalculator />
            </div>

            <h2 style={{ fontSize: "1.75rem", color: "var(--text-primary)", marginTop: "40px", marginBottom: "20px" }}>Technique 3: Shorter System Prompts</h2>
            <p style={{ marginBottom: "16px" }}>
              Because system prompts prepend to <em>every</em> user interaction, they are fundamentally compounding cost vectors.
            </p>
            <p style={{ marginBottom: "24px" }}>
              1,000 tokens × 10,000 chat requests = 10,000,000 tokens just to send your system instructions over and over! To fix this: compress your instructions, use bullet points instead of prose paragraphs, and dynamically omit sections if they're irrelevant.
            </p>

            <h2 style={{ fontSize: "1.75rem", color: "var(--text-primary)", marginTop: "40px", marginBottom: "20px" }}>Technique 4: Truncate Context Explicitly</h2>
            <p style={{ marginBottom: "24px" }}>
              Don't blindly dump the user's entire chat history back into the API for message #40. Summarize older messages into a rolling digest, or use a strict sliding window of the last 10 interactions. You'll stop paying for 20-page histories that only contextualize a simple "thanks".
            </p>

            <h2 style={{ fontSize: "1.75rem", color: "var(--text-primary)", marginTop: "40px", marginBottom: "20px" }}>Technique 5: Batch APIs</h2>
            <p style={{ marginBottom: "24px" }}>
              If your inference is not real-time—like crawling 10,000 URLs to scrape metadata overnight—use the <strong>Batch API</strong>. OpenAI offers a sweeping 50% discount for asynchronous workloads delivered within 24 hours.
            </p>

            <h2 style={{ fontSize: "1.75rem", color: "var(--text-primary)", marginTop: "40px", marginBottom: "20px" }}>Technique 6: Explicit max_tokens Bounds</h2>
            <p style={{ marginBottom: "24px" }}>
              As a universal rule, <strong>output tokens cost 2 to 4 times more than input tokens</strong>. Never leave the output unbounded or let the model ramble endlessly. Use the <code>max_tokens</code> parameter to force brief answers, or explicitly instruct "Answer in exactly 1 sentence".
            </p>

            <h2 style={{ fontSize: "1.75rem", color: "var(--text-primary)", marginTop: "60px", marginBottom: "20px" }}>Real Savings Calculator</h2>
            <p style={{ marginBottom: "24px" }}>
              Curious what your pipeline will actually run you at full scale? Estimate it here:
            </p>
            <div style={{ margin: "40px -24px 0" }}>
              <CostProjector inputTokens={1500} />
            </div>

          </div>
        </article>
      </main>
    </>
  );
}
