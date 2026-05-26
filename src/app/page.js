/* eslint-disable react/no-unescaped-entities */
import TokenCalculator from "@/components/TokenCalculator";
import FAQ from "@/components/FAQ";
import { MODELS } from "@/lib/models";

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

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Token Calculator",
    "url": "https://tokencalculator.app",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "312",
      "bestRating": "5"
    },
    "featureList": [
      "Real-time token counting",
      "Support for 20+ AI models including GPT-4.1, Claude Opus 4.7, Gemini 2.5 Pro",
      "Token visualization with color-coded chips",
      "Monthly cost projector",
      "System prompt and user message separation",
      "100% client-side — no data collection",
      "Multilingual support (EN, DE, FR)"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {/* Hero */}
      <section className="hero container" aria-label="Introduction">

        <h1 className="hero__title" style={{ fontSize: 'clamp(1.5rem, 4vw, 3.25rem)', lineHeight: 1.1, marginBottom: '0.75rem', letterSpacing: '-0.03em', whiteSpace: "normal" }}>
          AI Token <span style={{ color: 'var(--accent)' }}>Calculator</span>
          <span className="hero__cursor"></span>
        </h1>

        <p className="hero__subtitle" style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '0', lineHeight: 1.5 }}>
          <span className="hero__subtitle--desktop">
            Count tokens and estimate API costs for ChatGPT, Claude, Gemini, DeepSeek, Grok, Qwen, Mistral &amp; Meta LLaMA — instantly, privately, in your browser.
          </span>
          <span className="hero__subtitle--mobile">
            Count tokens &amp; estimate API costs for 20+ AI models. Free, instant, private.
          </span>
        </p>
      </section>

      {/* Calculator + Visualizer + Pricing */}
      <TokenCalculator />

      {/* API Pricing Table — server-rendered for SEO */}
      <section className="container" style={{ marginTop: '4rem', marginBottom: '4rem' }} aria-label="LLM API Pricing Comparison">
        <div className="card">
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>💰</span> LLM API Pricing per <span style={{ color: 'var(--accent)' }}>1M Tokens</span>
          </h2>
          {/* Desktop table view */}
          <div className="pricing-table-desktop" style={{ overflowX: 'auto' }}>
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Provider</th>
                  <th>Context</th>
                  <th>Input / 1M</th>
                  <th>Output / 1M</th>
                </tr>
              </thead>
              <tbody>
                {[...MODELS].sort((a, b) => a.inputPrice - b.inputPrice).map((m) => (
                  <tr key={m.id}>
                    <td>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: m.color, display: 'inline-block', marginRight: '0.5rem' }} />
                      <strong>{m.name}</strong>
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>{m.provider}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
                      {m.contextWindow >= 1_000_000 ? `${(m.contextWindow / 1_000_000).toFixed(m.contextWindow % 1_000_000 === 0 ? 0 : 1)}M` : `${(m.contextWindow / 1_000).toFixed(0)}K`}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: m.inputPrice <= 0.5 ? 'var(--green)' : m.inputPrice >= 5 ? 'var(--amber)' : 'var(--text-secondary)' }}>
                      ${m.inputPrice.toFixed(m.inputPrice < 0.1 ? 3 : 2)}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                      ${m.outputPrice.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile card layout */}
          <div className="pricing-cards-mobile">
            {[...MODELS].sort((a, b) => a.inputPrice - b.inputPrice).map((m) => (
              <div key={m.id} className="price-card-m">
                <div className="price-card-m__header">
                  <span className="price-dot" style={{ background: m.color }} />
                  <span className="price-model-name">{m.name}</span>
                  <span className="price-provider-tag">{m.provider}</span>
                </div>
                <div className="price-card-m__cols">
                  <div className="price-col">
                    <span className="price-col-label">Input</span>
                    <span className={`price-col-val ${m.inputPrice <= 0.5 ? 'price-col-val--green' : ''}`}>${m.inputPrice.toFixed(m.inputPrice < 0.1 ? 3 : 2)}</span>
                    <span className="price-col-unit">/1M tokens</span>
                  </div>
                  <div className="price-col">
                    <span className="price-col-label">Output</span>
                    <span className="price-col-val">${m.outputPrice.toFixed(2)}</span>
                    <span className="price-col-unit">/1M tokens</span>
                  </div>
                  <div className="price-col">
                    <span className="price-col-label">Context</span>
                    <span className="price-col-val">
                      {m.contextWindow >= 1_000_000 ? `${(m.contextWindow / 1_000_000).toFixed(m.contextWindow % 1_000_000 === 0 ? 0 : 1)}M` : `${(m.contextWindow / 1_000).toFixed(0)}K`}
                    </span>
                    <span className="price-col-unit">tokens</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Color Legends */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem', padding: '0.75rem 1rem', background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-subtle)', borderRadius: '8px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)', marginRight: '0.25rem' }}>Providers:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)' }} /> OpenAI</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--amber)' }} /> Anthropic</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--blue)' }} /> Google</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--purple)' }} /> DeepSeek</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--indigo)' }} /> Meta</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EE6C4D' }} /> Mistral</div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center', borderTop: '1px dashed var(--border-subtle)', paddingTop: '0.5rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Price Groupings (Input):</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ color: 'var(--green)', fontWeight: 700 }}>$0.00</span> ≤ $0.50 (Budget)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>$1.00</span> Mid-range</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ color: 'var(--amber)', fontWeight: 700 }}>$5.00</span> ≥ $5.00 (Premium)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Tokenization */}
      <section className="container" style={{ marginTop: '4rem', marginBottom: '4rem' }} aria-label="Understanding Tokenization">
        <div style={{ maxWidth: '100%', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '12px', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            Understanding <span style={{ color: 'var(--accent)' }}>Tokenization</span>
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '32px', maxWidth: '700px' }}>
            This tool functions as a <strong>universal tokenizer</strong> for OpenAI, Anthropic, and Google models. We use official Tiktoken libraries and model-specific tokenizers for 99% accuracy in token counting. Use this tokenizer to verify your prompt token counts before making API calls.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '1.5rem' }}>
            {/* Card 1 */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                What is BPE (Byte-Pair Encoding)?
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                BPE is the tokenization algorithm used by GPT models. It breaks text into subword units by iteratively merging the most frequent character pairs. For example, "tokenization" might become ["token", "ization"]. This allows models to handle rare words efficiently while keeping vocabulary size manageable.
              </p>
            </div>
            {/* Card 2 */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
                What is a Context Window?
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                The context window is the maximum number of tokens an LLM can process in a single request (input + output combined). GPT-4o offers 128K tokens, Claude 3.5 provides 200K tokens, and Gemini 1.5 Pro supports up to 2M tokens. Exceeding this limit will cause truncation or errors.
              </p>
            </div>
            {/* Card 3 */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                What is Cached Input Pricing?
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Cached input pricing offers significant discounts (up to 90% off) when you reuse the same prompt prefix across multiple API calls. This is ideal for system prompts, few-shot examples, or document analysis where the context remains constant while only the query changes.
              </p>
            </div>
            {/* Card 4 */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                Input vs Output Token Costs
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Output tokens are typically 2-4x more expensive than input tokens because they require the model to perform sequential generation. To optimize costs, design prompts that get concise responses, use output length limits, and choose the right model for each task.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Word-to-Token Conversion Guide — server-rendered for SEO */}
      <section className="container" style={{ marginTop: '4rem', marginBottom: '4rem' }} aria-label="Word to token conversion guide">
        <div style={{ maxWidth: '100%', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px', fontFamily: 'var(--font-display)' }}>
            Word-to-Token <span style={{ color: 'var(--accent)' }}>Conversion Guide</span>
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', lineHeight: 1.6, marginBottom: '24px', maxWidth: '560px' }}>
            Token counts vary significantly based on content type and language. Use this reference to estimate token usage before running your text through the calculator.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Content Type</th>
                  <th>Example</th>
                  <th>Ratio</th>
                  <th>1000 Words ≈</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>English Text</strong></td>
                  <td><code>Hello world</code></td>
                  <td>~1.3 tokens/word</td>
                  <td>~1,300-1,500</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>Standard prose averages 1.3 tokens per word</td>
                </tr>
                <tr>
                  <td><strong>Code (Python/JS)</strong></td>
                  <td><code>def func():</code></td>
                  <td>~2-3 tokens/word</td>
                  <td>~2,000-3,000</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>Symbols, operators, and syntax increase token count</td>
                </tr>
                <tr>
                  <td><strong>Chinese/Japanese</strong></td>
                  <td><code>你好世界</code></td>
                  <td>~2+ tokens/char</td>
                  <td>~2,000+</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>CJK characters often split into multiple tokens</td>
                </tr>
                <tr>
                  <td><strong>Technical Writing</strong></td>
                  <td><code>API endpoint</code></td>
                  <td>~1.5 tokens/word</td>
                  <td>~1,500-1,800</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>Technical terms and abbreviations vary</td>
                </tr>
                <tr>
                  <td><strong>JSON/XML Data</strong></td>
                  <td><code>{`{"key":"value"}`}</code></td>
                  <td>~3-4 tokens/word</td>
                  <td>~3,000-4,000</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>Structural characters add significant overhead</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How It Works — server-rendered for SEO */}
      <section className="how-it-works" style={{ marginTop: '4rem', marginBottom: '4rem' }} aria-label="How to use the token calculator">
        <h2 style={{ textAlign: 'center', fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px', fontFamily: 'var(--font-display)' }}>How It <span style={{ color: 'var(--accent)' }}>Works</span></h2>
        <div className="how-it-works__steps">
          <div className="step">
            <div className="step__number">01</div>
            <div className="step__icon">📝</div>
            <h3 className="step__title">Paste your text</h3>
            <p className="step__desc">Type or paste any text — a system prompt, user message, or full conversation. The calculator tokenizes in real time as you type.</p>
          </div>
          <div className="step__connector">→</div>
          <div className="step">
            <div className="step__number">02</div>
            <div className="step__icon">🤖</div>
            <h3 className="step__title">Select your model</h3>
            <p className="step__desc">Choose from GPT-4o, Claude, Gemini, DeepSeek and 20+ models. Each uses a different tokenizer — the same text can cost 2× more on different models.</p>
          </div>
          <div className="step__connector">→</div>
          <div className="step">
            <div className="step__number">03</div>
            <div className="step__icon">💰</div>
            <h3 className="step__title">See tokens + cost</h3>
            <p className="step__desc">Instantly see exact token count, estimated API cost, and how close you are to the context window limit. No signup, no API key required.</p>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section
        className="container"
        style={{ marginTop: "4rem", marginBottom: "4rem", padding: "0 1.5rem" }}
        aria-label="About token counting"
      >
        <article style={{ maxWidth: '100%', margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            How Does AI Token Counting <span style={{ color: 'var(--accent)' }}>Work?</span>
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
            humans do. Instead, they use a <strong>tokenizer</strong> to break text into <strong>tokens</strong> —
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
            token — tap or hover over any chip to see its token ID. Compare token counts
            across different models to find the most cost-effective option for
            your use case.
          </p>
        </article>
      </section>

      <FAQ />
    </>
  );
}
