/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import TokenCalculator from "@/components/TokenCalculator";

export const metadata = {
  title: "What is a Token in AI? Complete 2026 Guide | Token Calculator",
  description:
    "A token is the basic unit of text that AI language models process. Learn exactly how tokens work, context windows, and how to calculate API costs for GPT-4o, Claude, and Gemini.",
  alternates: {
    canonical: "/blog/what-is-a-token",
  },
};

export default function WhatIsAToken() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is 1 token in ChatGPT?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In ChatGPT, 1 token is roughly equivalent to 4 characters or 0.75 English words. Tokens are the basic pieces of text that the AI model processes.",
        },
      },
      {
        "@type": "Question",
        name: "How many tokens is 1000 words?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "On average, 1000 words is approximately 1,333 tokens in English when using standard tokenizers like OpenAI's cl100k_base or o200k_base.",
        },
      },
      {
        "@type": "Question",
        name: "How much does 1 million tokens cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends heavily on the model. GPT-4o costs $2.50 for 1M input tokens, Gemini 2.5 Pro costs $1.25, and GPT-4.1 Nano costs just $0.10 per 1M tokens.",
        },
      },
      {
        "@type": "Question",
        name: "What is the maximum token limit for GPT-4o?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GPT-4o has a maximum context window limit of 128,000 tokens for a single request, which is roughly 100,000 words or a 300-page book.",
        },
      },
      {
        "@type": "Question",
        name: "Are tokens the same as words?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, tokens are not the same as words. A single word can be broken into multiple tokens (like 'tokenization' becoming three tokens), and common words are usually single tokens.",
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
              What is a Token in AI? Complete 2026 Guide
            </h1>
            <div style={{ color: "var(--text-tertiary)", fontSize: "14px", fontFamily: "var(--font-mono)" }}>
              Updated April 2026 • 8 min read
            </div>
          </header>

          <div style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "16px" }}>The 50-word direct answer</h2>
            <p style={{ padding: "20px", background: "var(--bg-secondary)", borderLeft: "4px solid var(--accent)", borderRadius: "8px", fontWeight: 500, color: "var(--text-primary)" }}>
              A <strong>token</strong> is the basic unit of text that AI language models process. 
              Tokens can be whole words, parts of words, or punctuation. In English, 1 token ≈ 4 characters or 0.75 words. 
              "Hello world" = 2 tokens. "Tokenization" = 3 tokens: "Token", "ization", ".". API costs are priced per token.
            </p>

            <h2 style={{ fontSize: "1.75rem", color: "var(--text-primary)", marginTop: "40px", marginBottom: "20px" }}>What exactly is a token?</h2>
            <p style={{ marginBottom: "16px" }}>
              When you type a prompt into ChatGPT, Claude, or any large language model (LLM), the AI doesn't see words the way a human does. Instead, it uses a process called <strong>Byte Pair Encoding (BPE)</strong> to break text down into tokens.
            </p>
            <p style={{ marginBottom: "16px" }}>
              Why don't models use words directly? Because languages are complex. There are millions of words, conjugations, misspellings, and names. By breaking text down into highly recurrent subwords (tokens), an AI can significantly reduce the vocabulary it needs to understand everything, down to just 100,000 or 200,000 distinct components.
            </p>
            
            <div style={{ margin: "32px 0", padding: "24px", background: "var(--bg-tertiary)", borderRadius: "12px", border: "1px solid var(--border-default)" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-tertiary)", marginBottom: "12px", textTransform: "uppercase" }}>Visual Example</div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <span className="token-chip token-chip--word" style={{ fontSize: "16px", padding: "4px 8px" }}>Token</span>
                <span className="token-chip token-chip--subword" style={{ fontSize: "16px", padding: "4px 8px" }}>ization</span>
                <span className="token-chip token-chip--punct" style={{ fontSize: "16px", padding: "4px 8px" }}>.</span>
              </div>
            </div>

            <h2 style={{ fontSize: "1.75rem", color: "var(--text-primary)", marginTop: "40px", marginBottom: "20px" }}>Why does token count matter?</h2>
            <ul style={{ paddingLeft: "24px", marginBottom: "24px" }}>
              <li style={{ marginBottom: "12px" }}><strong>API pricing is per token:</strong> You don't pay per API call, you pay precisely for however many input tokens you submit, and however many output tokens the model generates.</li>
              <li style={{ marginBottom: "12px" }}><strong>Context windows are measured in tokens:</strong> The "memory limit" of the AI (e.g., 128K for GPT-4o, 2M for Gemini 2.5 Pro) determines how large of a document you can upload at once.</li>
              <li style={{ marginBottom: "12px" }}><strong>Output length is limited:</strong> Models usually cap maximum generation length to roughly 4,000 to 8,000 output tokens.</li>
            </ul>

            <h2 style={{ fontSize: "1.75rem", color: "var(--text-primary)", marginTop: "40px", marginBottom: "20px" }}>How do tokens differ between models?</h2>
            <p style={{ marginBottom: "24px" }}>
              Tokens are not universal. Because OpenAI, Anthropic, and Google all trained their models differently, they each use unique dictionaries. The exact same text will use a different number of tokens depending on the model.
            </p>
            
            <table className="pricing-table-v2" style={{ width: '100%', marginBottom: '40px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: '8px' }}>
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Tokenizer</th>
                  <th>Vocab size</th>
                  <th>"Hello, how are you?"</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>GPT-4o / GPT-4.1</strong></td>
                  <td className="font-mono">o200k_base</td>
                  <td className="font-mono">200,000</td>
                  <td className="font-mono text-warning">6 tokens</td>
                </tr>
                <tr>
                  <td><strong>GPT-3.5</strong></td>
                  <td className="font-mono">cl100k_base</td>
                  <td className="font-mono">100,000</td>
                  <td className="font-mono text-warning">6 tokens</td>
                </tr>
                <tr>
                  <td><strong>Claude Sonnet 4.6</strong></td>
                  <td className="font-mono">Anthropic BPE</td>
                  <td className="font-mono">~100K</td>
                  <td className="font-mono text-warning">~6 tokens</td>
                </tr>
                <tr>
                  <td><strong>Gemini 2.5 Pro</strong></td>
                  <td className="font-mono">SentencePiece</td>
                  <td className="font-mono">~256K</td>
                  <td className="font-mono text-success">~5 tokens</td>
                </tr>
              </tbody>
            </table>

            <h2 style={{ fontSize: "1.75rem", color: "var(--text-primary)", marginTop: "40px", marginBottom: "20px" }}>Tokens in different languages</h2>
            <p style={{ marginBottom: "16px" }}>
              Most modern tokenizers are highly optimized for English, meaning English text is very cost-efficient (about 1 token per 4 characters).
            </p>
            <p style={{ marginBottom: "16px" }}>
              However, for languages like Hindi, Arabic, or Korean, the same meaning requires significantly more tokens because those characters appear less frequently in the training data. This makes LLMs fundamentally more expensive to use in non-English contexts.
            </p>

            <h2 style={{ fontSize: "1.75rem", color: "var(--text-primary)", marginTop: "40px", marginBottom: "20px" }}>How to count tokens for free</h2>
            <p style={{ marginBottom: "24px" }}>
              You don't need to write code to calculate tokens. You can use our real-time interactive calculator right now to see exactly how your prompt is tokenized before you spend any money on API calls.
            </p>
            
            <div style={{ margin: "40px -24px" }}>
              <TokenCalculator />
            </div>

            <h2 style={{ fontSize: "1.75rem", color: "var(--text-primary)", marginTop: "60px", marginBottom: "20px" }}>Frequently Asked Questions</h2>
            
            <div className="faq-card faq-card--open">
              <div className="faq-question">What is 1 token in ChatGPT?</div>
              <div className="faq-answer" style={{ display: 'block' }}>In ChatGPT, 1 token is roughly equivalent to 4 characters or 0.75 English words. Tokens are the basic pieces of text that the AI model processes.</div>
            </div>
            <div className="faq-card faq-card--open">
              <div className="faq-question">How many tokens is 1000 words?</div>
              <div className="faq-answer" style={{ display: 'block' }}>On average, 1000 words is approximately 1,333 tokens in English when using standard tokenizers like OpenAI's cl100k_base or o200k_base.</div>
            </div>
            <div className="faq-card faq-card--open">
              <div className="faq-question">How much does 1 million tokens cost?</div>
              <div className="faq-answer" style={{ display: 'block' }}>It depends heavily on the model. GPT-4o costs $2.50 for 1M input tokens, Gemini 2.5 Pro costs $1.25, and GPT-4.1 Nano costs just $0.10 per 1M tokens.</div>
            </div>
            
          </div>
        </article>
      </main>
    </>
  );
}
