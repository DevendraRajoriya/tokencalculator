import Link from "next/link";
import { MODELS } from "@/lib/models";

export const metadata = {
  title: "LLM Context Window Comparison 2026 (Every Major Model)",
  description:
    "Complete comparison of context windows for all major AI models including GPT-4o, Claude Sonnet, Gemini 1.5 Pro, and DeepSeek. Learn chunking strategies and RAG implications.",
  keywords: [
    "LLM context window comparison",
    "what is context window",
    "AI context limits",
    "GPT-4o context window",
    "Claude context window",
  ],
  openGraph: {
    title: "LLM Context Window Comparison 2026",
    description: "Compare context windows across all major AI models. What they mean and why they matter.",
    type: "article",
    publishedTime: "2026-03-31T00:00:00Z",
  },
  alternates: { canonical: "/blog/context-window-guide" },
};

export default function ContextWindowGuide() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "LLM Context Window Comparison 2026 (Every Major Model)",
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
      { "@type": "ListItem", position: 3, name: "Context Window Guide", item: "/blog/context-window-guide" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an LLM context window?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An LLM context window is the maximum amount of text (measured in tokens) that the AI can \"remember\" and process at one time during a single conversation or API request. It includes both your prompt and the model's response."
        }
      },
      {
        "@type": "Question",
        name: "Which AI has the largest context window?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Gemini 1.5 Pro currently has the largest commercially available context window at 2,000,000 tokens (enough for about 1.5 million words, or 5,000 pages of text)."
        }
      },
      {
        "@type": "Question",
        name: "How many tokens is a 128k context window?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 128k context window equals 128,000 tokens, which translates to roughly 96,000 words or a 300-page book."
        }
      },
      {
        "@type": "Question",
        name: "Does context window include the generated response?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the context window is the total budget for both input tokens (your prompt) and output tokens (the model's generated response). If your prompt uses 120,000 tokens on a 128,000 window model, it can only output 8,000 tokens."
        }
      },
      {
        "@type": "Question",
        name: "What happens if you exceed the context window?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The API will return an error and fail to generate a response. You must truncate your prompt, summarize earlier parts of the conversation, or switch to a model with a larger capacity."
        }
      }
    ],
  };

  const formattedModels = MODELS.sort((a, b) => b.contextWindow - a.contextWindow).map(m => {
    const costToFill = (m.contextWindow / 1_000_000) * m.inputPrice;
    return { ...m, costToFill };
  });

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="hero" style={{ paddingBottom: "1rem" }}>
        <nav style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
          <Link href="/" style={s.link}>Home</Link><span style={{ margin: "0 0.5rem" }}>/</span>
          <Link href="/blog" style={s.link}>Blog</Link><span style={{ margin: "0 0.5rem" }}>/</span>
          <span style={{ color: "var(--text-primary)" }}>Context Window Guide</span>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "center", marginBottom: "0.75rem", flexWrap: "wrap" }}>
          <span style={{ padding: "0.125rem 0.5rem", borderRadius: "var(--radius-full)", background: "var(--info-subtle)", color: "var(--info)", fontSize: "0.6875rem", fontWeight: 600, fontFamily: "var(--font-mono)" }}>Guide</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>March 31, 2026</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>9 min read</span>
        </div>
        <h1 className="hero__title" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}>
          LLM Context Window Comparison{" "}<span>(2026)</span>
        </h1>
      </section>

      <section className="container" style={{ marginBottom: "3rem", padding: "0 1.5rem" }}>
        <article style={{ maxWidth: "720px", margin: "0 auto" }}>

          <p style={{ ...s.p, fontSize: "1.0625rem", color: "var(--text-primary)", fontWeight: 500 }}>
            An AI&apos;s <strong>context window</strong> is its short-term memory limit. Push past it, and the model forgets the beginning of your conversation. Today, context windows range from 8,000 tokens to a massive 2 million tokens. Here&apos;s the complete comparison for 2026.
          </p>

          <h2 style={s.h2}>The 2026 Context Window Leaderboard</h2>
          <div style={{ ...s.callout, padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead><tr>
                <th style={s.th}>Model</th>
                <th style={s.th}>Context Limit</th>
                <th style={s.th}>Avg Words</th>
                <th style={s.th}>Cost to Fill 1x</th>
              </tr></thead>
              <tbody>
                {formattedModels.map((m) => (
                  <tr key={m.id}>
                    <td style={{ ...s.td, fontWeight: 500, color: "var(--text-primary)" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: m.color, display: "inline-block", marginRight: "0.5rem" }} />
                      {m.name}
                    </td>
                    <td style={{ ...s.td, fontFamily: "var(--font-mono)" }}>{m.contextWindow.toLocaleString()}</td>
                    <td style={{ ...s.td, color: "var(--text-muted)" }}>~{Math.round(m.contextWindow * 0.75).toLocaleString()}</td>
                    <td style={{ ...s.td, fontFamily: "var(--font-mono)", color: m.costToFill > 5 ? "var(--error)" : "var(--success)" }}>
                      ${m.costToFill.toFixed(3)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={s.h2}>What Actually Fits in a Context Window?</h2>
          <p style={s.p}>
            To understand these limits practically, let&apos;s translate tokens into real-world document sizes. As a general rule of thumb, <strong>1 token ≈ 0.75 words</strong> in English. Use our <Link href="/" style={s.link}>token calculator</Link> for exact measurements.
          </p>
          <ul style={{ ...s.p, paddingLeft: "1.5rem" }}>
            <li><strong>4,000 tokens</strong>: A long blog post or short essay (~3,000 words).</li>
            <li><strong>32,000 tokens</strong>: A short academic paper or an average business report (~24,000 words).</li>
            <li><strong>128,000 tokens</strong> (GPT-4o, DeepSeek V3): A 300-page book like &ldquo;Harry Potter and the Sorcerer&apos;s Stone&rdquo; (~96,000 words).</li>
            <li><strong>200,000 tokens</strong> (Claude Sonnet 4.6): A very long novel or extensive codebase codebase (~150,000 words).</li>
            <li><strong>2,000,000 tokens</strong> (Gemini 1.5 Pro): The entire Lord of the Rings series plus the Hobbit, or an enormous monorepo codebase (~1,500,000 words).</li>
          </ul>

          <h2 style={s.h2}>The &quot;Cost to Fill&quot; Problem</h2>
          <p style={s.p}>
            While large context windows like Gemini&apos;s 2M tokens sound incredible, there is a catch: <strong>cost</strong>. API providers bill per token processed.
          </p>
          <p style={s.p}>
            If you dump a 1 million token document into GPT-4 Turbo ($10/1M input tokens), that single query costs $10.00. If you ask 10 follow-up questions in the same conversation, <strong>the entire 1M token history is re-processed each time</strong>, costing another $10.00 per question. A short conversation can quickly cost over $100.
          </p>

          <h2 style={s.h2}>How to Manage Context Effectively</h2>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.5rem" }}>1. Retrieval-Augmented Generation (RAG)</h3>
          <p style={s.p}>
            Instead of giving the model the entire 500-page document, use a vector database to search the document mathematically. Find the 3 most relevant pages, and put <em>only those pages</em> in the context window. This reduces costs by 99% and often improves accuracy.
          </p>

          <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.5rem" }}>2. Prompt Caching</h3>
          <p style={s.p}>
            If you must use a massive context window (like a large codebase), look for models that support <strong>prompt caching</strong> (like Claude Sonnet 4.6). Once the large document is processed once, subsequent requests using the same prefix get massive discounts (up to 90%).
          </p>

          <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.5rem" }}>3. &quot;Lost in the Middle&quot; Phenomenon</h3>
          <p style={s.p}>
            Research shows that even models with 128K+ windows struggle to retrieve information placed exactly in the middle of a massive block of text. They are great at remembering the beginning and the end. If you have critical instructions, place them at the very end of your prompt.
          </p>

          <div style={{ ...s.callout, marginTop: "2rem" }}>
            <p style={{ fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)" }}>📚 Related Tools:</p>
            <ul style={{ ...s.p, paddingLeft: "1.5rem", marginBottom: 0 }}>
              <li><Link href="/" style={s.link}>Text to Token Calculator</Link> — Test if your text fits.</li>
              <li><Link href="/llm-pricing-comparison" style={s.link}>LLM Pricing Index</Link> — Compare API costs.</li>
            </ul>
          </div>
        </article>
      </section>
    </>
  );
}
