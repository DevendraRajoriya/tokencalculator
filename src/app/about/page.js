export const metadata = {
  title: "About Token Calculator — Free AI Token Counter Tool",
  description:
    "Token Calculator is a free, open-source tool for counting tokens across all major AI models. Built by an independent developer. 100% client-side, your text never leaves your browser.",
  alternates: {
    canonical: "/about",
  },
};

export default function About() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "About", item: "/about" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="hero" style={{ paddingBottom: "1.5rem" }}>
        <h1 className="hero__title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
          About <span>Token Calculator</span>
        </h1>
        <p className="hero__subtitle">
          A free, privacy-first tool for developers working with AI APIs.
        </p>
      </section>

      <section className="container" style={{ marginBottom: "3rem", padding: "0 1.5rem" }}>
        <article style={{ maxWidth: "720px", margin: "0 auto" }}>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Why I Built This
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            As a developer working daily with LLM APIs, I kept running into the same problem: estimating how many tokens my prompts would use and what they&apos;d cost. The existing tools were either too complex, required signup, or didn&apos;t support the models I needed. So I built Token Calculator — a simple, fast, privacy-first tool that runs entirely in your browser.
          </p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            How It Works
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>
            Token Calculator uses <strong>tiktoken</strong> — the same tokenization library that OpenAI uses internally — compiled to <strong>WebAssembly (WASM)</strong>. This means tokenization runs entirely in your browser with zero server calls. Your text never leaves your device.
          </p>

          <div style={{
            background: "var(--bg-secondary)", border: "1px solid var(--border-primary)",
            borderRadius: "var(--radius-lg)", padding: "1.25rem", marginBottom: "1.5rem",
          }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.75rem" }}>Key Features</h3>
            <ul style={{
              fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.8,
              paddingLeft: "1.25rem",
            }}>
              <li><strong>Real-time counting</strong> — No &ldquo;Calculate&rdquo; button. Counts tokens as you type.</li>
              <li><strong>10+ models supported</strong> — GPT-4o, Claude Sonnet, Gemini, DeepSeek, LLaMA</li>
              <li><strong>Token Visualizer</strong> — See exactly how text is split into tokens with color-coded chips</li>
              <li><strong>Cost estimation</strong> — Instant pricing based on current API rates</li>
              <li><strong>100% client-side</strong> — Your text never touches a server</li>
              <li><strong>Free API</strong> — REST endpoint at <code>/api/count-tokens</code> for developers</li>
              <li><strong>No signup, no tracking</strong> — Just a tool that works</li>
            </ul>
          </div>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Accuracy
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            For <strong>OpenAI models</strong> (GPT-4o, GPT-4, GPT-3.5), this tool uses the exact same tiktoken library, so token counts are 100% accurate. For <strong>Claude, Gemini, DeepSeek, and LLaMA</strong>, I use the closest available tokenizer — counts may vary by 5-15% from the provider&apos;s actual tokenizer, but this is more than sufficient for cost estimation and prompt optimization.
          </p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Privacy
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            All tokenization happens in your browser via WebAssembly. No text is ever sent to any server. There are no cookies tracking your input, no analytics on what you type, and no external requests made with your content. You can verify this by opening your browser&apos;s Developer Tools and checking the Network tab.
          </p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Pricing Data
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Model pricing is updated monthly based on official API documentation from each provider. Last update: <strong>March 2026</strong>. Check the <a href="/llm-pricing-comparison" style={{ color: "var(--accent)" }}>LLM Pricing Comparison</a> page for the full breakdown.
          </p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Open Source
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Token Calculator is open source. Contributions, bug reports, and feature requests are welcome. If you find this tool useful, consider sharing it with your team or linking to it from your documentation.
          </p>
        </article>
      </section>
    </>
  );
}
