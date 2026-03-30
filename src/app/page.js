import TokenCalculator from "@/components/TokenCalculator";
import FAQ from "@/components/FAQ";

export default function Home() {
  // HowTo schema for "How to count tokens"
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Count Tokens in AI Models",
    description:
      "Count tokens for any AI model (GPT-4o, Claude, Gemini) in real time using our free token calculator.",
    step: [
      {
        "@type": "HowToStep",
        name: "Select your AI model",
        text: "Choose the AI model you want to count tokens for (GPT-4o, Claude Sonnet, Gemini, DeepSeek, or LLaMA) from the model selector.",
      },
      {
        "@type": "HowToStep",
        name: "Enter or paste your text",
        text: "Type or paste your text into the calculator. Token count, word count, and estimated cost update in real time as you type.",
      },
      {
        "@type": "HowToStep",
        name: "View token visualization",
        text: "Scroll down to see how your text is split into individual tokens, each shown as a color-coded chip. Toggle between colored view and token IDs.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Hero */}
      <section className="hero" aria-label="Introduction">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Free · No signup · 100% client-side
        </div>
        <h1 className="hero__title">
          Free Token Calculator for{" "}
          <span>All AI Models</span>
        </h1>
        <p className="hero__subtitle">
          Count tokens, estimate costs, and visualize tokenization for GPT-4o, Claude
          Sonnet, Gemini, DeepSeek and LLaMA — instantly, in your browser.
        </p>
      </section>

      {/* Calculator + Visualizer + Pricing + FAQ */}
      <TokenCalculator />
      <FAQ />

      {/* SEO Content Section */}
      <section
        className="container container--narrow"
        style={{ marginBottom: "3rem", padding: "0 1.5rem" }}
        aria-label="About token counting"
      >
        <article style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            How Does AI Token Counting Work?
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: "1rem",
            }}
          >
            AI models like GPT-4o, Claude, and Gemini don&apos;t read text the way
            humans do. Instead, they break text into <strong>tokens</strong> —
            small chunks that can be whole words, word pieces, or even individual
            characters. The word &ldquo;tokenization&rdquo; becomes three tokens:
            &ldquo;token&rdquo;, &ldquo;ization&rdquo; — while common words like
            &ldquo;the&rdquo; are single tokens.
          </p>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: "1rem",
            }}
          >
            This matters because <strong>API pricing is based on token count</strong>,
            not word count. Our token calculator uses the same{" "}
            <strong>tiktoken</strong> library that OpenAI uses internally, running
            entirely in your browser via WebAssembly — so your text is never sent
            to any server.
          </p>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            Use the <strong>Token Visualizer</strong> above to see exactly how
            your text is split into tokens. Each colored chip represents one
            token — hover over any chip to see its token ID. Compare token counts
            across different models to find the most cost-effective option for
            your use case.
          </p>
        </article>
      </section>
    </>
  );
}
