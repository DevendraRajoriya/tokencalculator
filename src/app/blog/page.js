import Link from "next/link";

export const metadata = {
  title: "Blog — Token Calculator | AI Tokenization, Pricing & Prompt Optimization",
  description:
    "Learn about AI tokenization, LLM pricing, prompt optimization, and cost-saving strategies. Expert guides for developers working with GPT-4o, Claude, Gemini, and more.",
  keywords: ["AI tokenization blog", "LLM pricing blog", "prompt optimization guide", "token counting tips"],
  alternates: {
    canonical: "/blog",
  },
};

const BLOG_POSTS = [
  {
    slug: "what-is-a-token-in-ai",
    title: "What is a Token in AI? Complete 2026 Guide",
    description:
      "A token is the basic unit of text that AI models process. Learn how tokenization works, why different models produce different token counts, and how tokens affect your API costs.",
    date: "March 31, 2026",
    readTime: "8 min read",
    category: "Guide",
    categoryColor: "var(--info)",
    categoryBg: "var(--info-subtle)",
  },
  {
    slug: "reduce-llm-api-costs",
    title: "How to Reduce GPT-4o API Costs by 60% (With Calculator)",
    description:
      "7 actionable techniques to slash your LLM API bills: shorter system prompts, prompt caching, model downgrading, batching, and more. Test each tip with our built-in calculator.",
    date: "Coming soon",
    readTime: "6 min read",
    category: "Cost Saving",
    categoryColor: "var(--success)",
    categoryBg: "var(--success-subtle)",
  },
  {
    slug: "gpt4o-vs-claude-cost",
    title: "GPT-4o vs Claude Sonnet 4.6: Real Cost & Token Comparison",
    description:
      "Side-by-side comparison of pricing, tokenization differences, context windows, speed, and use case fit. Which model gives you the best value in 2026?",
    date: "Coming soon",
    readTime: "7 min read",
    category: "Comparison",
    categoryColor: "var(--accent)",
    categoryBg: "var(--accent-subtle)",
  },
  {
    slug: "context-window-guide",
    title: "LLM Context Window Comparison 2026 (Every Major Model)",
    description:
      "Complete comparison of context windows for all major AI models. What is a context window, why it matters, chunking strategies, and RAG implications.",
    date: "Coming soon",
    readTime: "9 min read",
    category: "Guide",
    categoryColor: "var(--info)",
    categoryBg: "var(--info-subtle)",
  },
  {
    slug: "prompt-token-tips",
    title: "10 Prompt Engineering Tricks to Cut Token Usage in Half",
    description:
      "Specific, testable prompt optimization tips. For each technique: see before/after token counts and verify the savings using our calculator.",
    date: "Coming soon",
    readTime: "5 min read",
    category: "Tutorial",
    categoryColor: "var(--warning)",
    categoryBg: "var(--warning-subtle)",
  },
  {
    slug: "llm-pricing-index-march-2026",
    title: "LLM Pricing Index — March 2026 (All Models, All Providers)",
    description:
      "Comprehensive monthly pricing data for every major LLM API. Input/output prices, context windows, and provider comparisons. The definitive pricing reference.",
    date: "Coming soon",
    readTime: "4 min read",
    category: "Data",
    categoryColor: "var(--error)",
    categoryBg: "var(--error-subtle)",
  },
  {
    slug: "deepseek-vs-gpt4o",
    title: "DeepSeek vs GPT-4o vs Claude: Who Has the Cheapest API in 2026?",
    description:
      "Real cost analysis with 5 use case scenarios. Monthly cost breakdown for chatbots, RAG pipelines, summarizers, coding assistants, and more.",
    date: "Coming soon",
    readTime: "7 min read",
    category: "Comparison",
    categoryColor: "var(--accent)",
    categoryBg: "var(--accent-subtle)",
  },
];

export default function Blog() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="hero" style={{ paddingBottom: "1.5rem" }}>
        <h1 className="hero__title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
          AI Tokenization <span>Blog</span>
        </h1>
        <p className="hero__subtitle">
          Guides on tokenization, LLM pricing, prompt optimization, and
          cost-saving strategies for developers.
        </p>
      </section>

      <section className="container container--narrow" style={{ marginBottom: "3rem", padding: "0 1.5rem" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {BLOG_POSTS.map((post) => {
            const isPublished = post.date !== "Coming soon";
            const Wrapper = isPublished ? Link : "div";
            const wrapperProps = isPublished ? { href: `/blog/${post.slug}` } : {};

            return (
              <Wrapper
                key={post.slug}
                {...wrapperProps}
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-primary)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.25rem 1.5rem",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                  transition: "all 0.2s ease",
                  cursor: isPublished ? "pointer" : "default",
                  opacity: isPublished ? 1 : 0.7,
                }}
              >
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  marginBottom: "0.5rem", flexWrap: "wrap",
                }}>
                  <span style={{
                    padding: "0.125rem 0.5rem", borderRadius: "var(--radius-full)",
                    background: post.categoryBg, color: post.categoryColor,
                    fontSize: "0.6875rem", fontWeight: 600,
                    fontFamily: "var(--font-mono)",
                  }}>
                    {post.category}
                  </span>
                  <span style={{
                    fontSize: "0.75rem", color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                  }}>
                    {post.date}
                  </span>
                  <span style={{
                    fontSize: "0.75rem", color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                  }}>
                    {post.readTime}
                  </span>
                </div>
                <h2 style={{
                  fontSize: "1.0625rem", fontWeight: 700, marginBottom: "0.375rem",
                  lineHeight: 1.3,
                }}>
                  {post.title}
                </h2>
                <p style={{
                  fontSize: "0.8125rem", color: "var(--text-tertiary)",
                  lineHeight: 1.6, margin: 0,
                }}>
                  {post.description}
                </p>
              </Wrapper>
            );
          })}
        </div>
      </section>
    </>
  );
}
