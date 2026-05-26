import Link from "next/link";

export const metadata = {
  title: "10 Prompt Engineering Tricks to Cut Token Usage in Half",
  description:
    "Stop wasting money on redundant prompt tokens. Learn 10 actionable, testable prompt optimization tips that reduce your LLM API costs by up to 50% without sacrificing quality.",
  keywords: [
    "prompt engineering tricks",
    "token efficient prompting",
    "reduce prompt tokens",
    "prompt optimization",
    "save LLM costs",
  ],
  openGraph: {
    title: "10 Prompt Engineering Tricks to Cut Token Usage",
    description: "Learn actionable ways to write token-efficient prompts and cut your LLM API bills.",
    type: "article",
    publishedTime: "2026-03-31T00:00:00Z",
  },
  alternates: { canonical: "/blog/prompt-token-tips" },
};

export default function PromptTips() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "10 Prompt Engineering Tricks to Cut Token Usage in Half",
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
      { "@type": "ListItem", position: 3, name: "Prompt Token Tips", item: "/blog/prompt-token-tips" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How can I reduce tokens in my prompts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can reduce prompt tokens by removing stop words, using bullet points instead of paragraphs, eliminating conversational filler like 'please' or 'can you', and establishing a concise system prompt."
        }
      },
      {
        "@type": "Question",
        name: "Does changing from JSON to YAML save tokens?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, YAML generally uses significantly fewer tokens than JSON because it doesn't require closing brackets or an abundance of double quotes, making it cheaper for large structured data responses."
        }
      },
      {
        "@type": "Question",
        name: "Should I use code comments to save tokens?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Removing unnecessary docstrings and code comments from input context reduces token cost greatly. Most LLMs can interpret raw code just fine without excessive inline explanations."
        }
      },
      {
        "@type": "Question",
        name: "Does Markdown formatting use many tokens?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Markdown is extremely token-efficient since hashes (#) and asterisks (*) are often single characters/tokens, unlike HTML tags which require opening, closing, and verbose syntax."
        }
      },
      {
        "@type": "Question",
        name: "Do polite words cost tokens?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every 'please', 'thank you', and 'could you potentially' uses tokens. While negligible for one prompt, at scale these conversational fillers can waste thousands of tokens per day."
        }
      }
    ]
  };

  const s = {
    h2: { fontSize: "1.375rem", fontWeight: 700, marginBottom: "0.75rem", marginTop: "2.25rem", lineHeight: 1.3 },
    p: { fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1rem" },
    callout: { background: "var(--bg-secondary)", border: "1px solid var(--border-primary)", borderRadius: "var(--radius-lg)", padding: "1.25rem 1.5rem", marginBottom: "1.5rem" },
    link: { color: "var(--accent)", textDecoration: "none" },
    code: { fontFamily: "var(--font-mono)", fontSize: "0.8125rem", background: "var(--bg-tertiary)", padding: "0.75rem", borderRadius: "8px", display: "block", marginBottom: "1rem", whiteSpace: "pre-wrap", color: "var(--text-primary)" },
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
          <span style={{ color: "var(--text-primary)" }}>Prompt Optimization Tips</span>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "center", marginBottom: "0.75rem", flexWrap: "wrap" }}>
          <span style={{ padding: "0.125rem 0.5rem", borderRadius: "var(--radius-full)", background: "var(--warning-subtle)", color: "var(--warning)", fontSize: "0.6875rem", fontWeight: 600, fontFamily: "var(--font-mono)" }}>Tutorial</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>March 31, 2026</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>5 min read</span>
        </div>
        <h1 className="hero__title" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}>
          10 Prompt Engineering Tricks to{" "}<span>Cut Token Usage</span>
        </h1>
      </section>

      <section className="container" style={{ marginBottom: "3rem", padding: "0 1.5rem" }}>
        <article style={{ maxWidth: "720px", margin: "0 auto" }}>

          <p style={{ ...s.p, fontSize: "1.0625rem", color: "var(--text-primary)", fontWeight: 500 }}>
            Every unnecessary word in your system prompt costs you money with every API call. Here are 10 specific, testable ways to rewrite your prompts to save up to 50% on input tokens.
          </p>

          <h2 style={s.h2}>1. Remove &quot;Please&quot; and &quot;Thank You&quot;</h2>
          <p style={s.p}>AI models don&apos;t need politeness. Extra words just consume tokens.</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <div style={{ flex: "1 1 300px" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--error)", marginBottom: "0.25rem" }}>Before (15 tokens)</div>
              <code style={s.code}>Please summarize this text for me, thank you.</code>
            </div>
            <div style={{ flex: "1 1 300px" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--success)", marginBottom: "0.25rem" }}>After (3 tokens)</div>
              <code style={s.code}>Summarize this:</code>
            </div>
          </div>

          <h2 style={s.h2}>2. Use JSON Keys Effectively</h2>
          <p style={s.p}>When forcing JSON output, keep keys extremely short. Long keys are repeated for every item in an array, wasting massive amounts of output tokens (which cost 4x more than input tokens).</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <div style={{ flex: "1 1 300px" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--error)", marginBottom: "0.25rem" }}>Before</div>
              <code style={s.code}>{`{ "user_first_and_last_name": "...", "customer_account_identification": "..." }`}</code>
            </div>
            <div style={{ flex: "1 1 300px" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--success)", marginBottom: "0.25rem" }}>After</div>
              <code style={s.code}>{`{ "name": "...", "id": "..." }`}</code>
            </div>
          </div>

          <h2 style={s.h2}>3. Combine Multiple API Calls</h2>
          <p style={s.p}>Instead of doing one request to translate, and a second request to summarize, do both in one prompt. You save the overhead of repeating your system instructions and context.</p>

          <h2 style={s.h2}>4. Leverage Markdown Over XML/HTML</h2>
          <p style={s.p}>LLM tokenizers are highly optimized for Markdown. HTML and XML tags cost significantly more tokens because angle brackets and slashes often tokenize separately.</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <div style={{ flex: "1 1 300px" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--error)", marginBottom: "0.25rem" }}>Before (13 tokens)</div>
              <code style={s.code}>{`<h1>Title</h1>
<ul><li>Item</li></ul>`}</code>
            </div>
            <div style={{ flex: "1 1 300px" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--success)", marginBottom: "0.25rem" }}>After (4 tokens)</div>
              <code style={s.code}>{`# Title\n- Item`}</code>
            </div>
          </div>

          <h2 style={s.h2}>5. Eliminate Explanations</h2>
          <p style={s.p}>Models love to yap. To save output tokens, strictly forbid prefixes and explanations.</p>
          <code style={s.code}>Return ONLY the JSON. No introductory text. No explanations.</code>

          <h2 style={s.h2}>6. Rely on Few-Shot Examples (Instead of Long Instructions)</h2>
          <p style={s.p}>Models learn better from examples than complex rules. Replacing 200 tokens of complicated edge-case rules with two 30-token examples often improves accuracy while saving 140 tokens per call.</p>

          <h2 style={s.h2}>7. Strip Whitespace in Code/Data</h2>
          <p style={s.p}>Multiple spaces and deep indentation eat tokens rapidly. A tab character or sets of 4 spaces often count as distinct tokens. Minify your context data before injecting it.</p>

          <h2 style={s.h2}>8. Use English for System Prompts</h2>
          <p style={s.p}>Even if your application is in German or French, write your system-level instructions in English. GPT-4o&apos;s tokenizer (o200k_base) is highly optimized for English, making it significantly cheaper to instruct the model in English and ask for the output in the target language.</p>

          <h2 style={s.h2}>9. Declare Defaults Explicitly</h2>
          <p style={s.p}>If 90% of your data has a common default, tell the model to omit the field if it matches the default. This saves massive amounts of tokens in arrays of JSON objects.</p>
          <code style={s.code}>If status is &quot;active&quot;, do not include the &quot;status&quot; key.</code>

          <h2 style={s.h2}>10. Test and Measure Constantly</h2>
          <p style={s.p}>The only way to know if a prompt tweak saves money is to measure it. Keep our <Link href="/" style={s.link}>real-time token calculator</Link> open in another tab while you write prompts to see the impact of your edits instantly.</p>

        </article>
      </section>
    </>
  );
}
