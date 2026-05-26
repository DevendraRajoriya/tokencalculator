/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";

const DEFAULT_FAQ_ITEMS = [
  {
    question: "What is a token in AI and large language models?",
    answer: "A token is the basic unit of text that AI models like GPT-4o, Claude, and Gemini process. Tokens can be whole words, parts of words, or individual characters. In English, 1 token is roughly 4 characters or about 0.75 words. The word 'tokenization' becomes 3 tokens: 'token', 'ization'. API pricing is charged per token, not per word or character."
  },
  {
    question: "What are the newest AI models available in 2026?",
    answer: "The newest models in 2026 include: GPT-4.1, GPT-4.1 Mini, and GPT-4.1 Nano from OpenAI (with 1M token context windows); Claude Opus 4.7 and Claude Haiku 4.5 from Anthropic; Gemini 2.5 Pro and Gemini 2.5 Flash from Google; Llama 4 Scout and Llama 4 Maverick from Meta; and DeepSeek V3-0324. Our calculator supports all of these models."
  },
  {
    question: "How does this token calculator work?",
    answer: "This calculator uses the same tiktoken library that OpenAI uses internally, running entirely in your browser via WebAssembly. When you type or paste text, it tokenizes instantly with zero API calls — your text never leaves your device. The token count, word count, character count, and estimated cost are calculated in real time."
  },
  {
    question: "Why do different AI models produce different token counts?",
    answer: "Each model uses a different tokenizer with a different vocabulary size. GPT-4o uses o200k_base (200K vocab), GPT-3.5 uses cl100k_base (100K vocab), Claude uses Anthropic's custom BPE, and Gemini uses SentencePiece. A larger vocabulary means common words are single tokens, making text more compact. The same sentence can produce different token counts on each model, directly affecting API cost."
  },
  {
    question: "How much does it cost to use GPT-4o, Claude, or Gemini?",
    answer: "As of April 2026: GPT-4.1 costs $2.00/1M input tokens and $8.00/1M output tokens. Claude Sonnet 4.6 costs $3/$15 per 1M tokens. Gemini 2.5 Pro costs $1.25/$10 per 1M tokens. For budget options: GPT-4.1 Nano ($0.10/$0.40), Gemini 2.5 Flash-Lite ($0.10/$0.40), and Mistral Small ($0.10/$0.30) are the most affordable. Use our Monthly Cost Projector to estimate your monthly bill."
  },
  {
    question: "What is prompt caching and how does it reduce costs?",
    answer: "Prompt caching allows AI providers to reuse computations from identical input prefixes (like system prompts). OpenAI offers 50% discount on cached tokens; Anthropic offers up to 90% discount. If you send the same 1,000-token system prompt with every request, caching can reduce that portion of your costs by half or more. It's the single most effective cost reduction for production applications."
  },
  {
    question: "How can I reduce my LLM API costs?",
    answer: "Top strategies: 1) Enable prompt caching for repeated system prompts. 2) Use smaller models (GPT-4o Mini, Gemini 2.5 Flash) for simple tasks. 3) Set explicit max_tokens to limit output length. 4) Shorten system prompts — they're sent with every request. 5) Use the Batch API (50% discount on OpenAI). 6) Truncate conversation history instead of sending full context. Use our token calculator to test token counts before and after optimization."
  },
  {
    question: "What is a context window and how does it affect cost?",
    answer: "A context window is the maximum number of tokens a model can process in a single request (input + output combined). GPT-4o has 128K tokens, Claude supports 200K, Gemini 2.5 Pro supports 2M, and GPT-4.1 and Llama 4 support up to 1M. Larger contexts cost more (more input tokens) but allow processing longer documents. If your text exceeds the context window, you'll see an error and need to chunk your content."
  },
  {
    question: "Is my text data safe when using this calculator?",
    answer: "Yes, completely. This token calculator runs entirely in your browser using WebAssembly. Your text is never sent to any server or API — all tokenization happens locally on your device. There is zero data collection, no cookies tracking your input, and no external API calls made with your text. You can verify this by checking your browser's Network tab in Developer Tools — you'll see no outbound requests when typing."
  },
  {
    question: "How accurate is this compared to the official OpenAI tokenizer?",
    answer: "For OpenAI models (GPT-4o, GPT-4.1, GPT-3.5), this calculator uses the exact same tiktoken library that OpenAI's API uses, so the token count is 100% accurate. For Claude, Gemini, DeepSeek, and Llama, we use the closest available approximation — results may vary by 3-8% depending on text content and language. For production cost estimation, always verify with a small test call to the actual API."
  }
];

const DEFAULT_LABELS = {
  title: "❓ Common Questions",
  searchPlaceholder: "Search questions...",
  noResults: "No questions found matching",
  didThisHelp: "Did this answer your question?",
  yes: "👍 Yes",
  no: "👎 No",
  ctaText: "Want to go deeper?",
  ctaLinks: [
    { href: "/blog/what-is-a-token", text: "📖 What is a Token? Complete Guide →" },
    { href: "/blog/reduce-llm-api-costs", text: "💸 How to Reduce LLM API Costs by 60% →" },
    { href: "/blog/gpt4o-vs-claude-cost", text: "⚡ GPT-4o vs Claude Sonnet: Real Cost Comparison →" },
    { href: "/blog/llm-pricing-index-april-2026", text: "📊 LLM Pricing Index — April 2026 →" },
  ],
};

export default function FAQ({ items, labels: userLabels }) {
  const faqItems = items || DEFAULT_FAQ_ITEMS;
  const labels = { ...DEFAULT_LABELS, ...userLabels };
  
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = faqItems.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="faq-section" aria-label="Frequently Asked Questions">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 className="faq-section__title" style={{ margin: 0 }}>{labels.title}</h2>
        <div style={{ position: 'relative', width: '280px', maxWidth: '100%' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, fontSize: '0.875rem' }}>🔍</span>
          <input 
            type="text" 
            placeholder={labels.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }} 
          />
        </div>
      </div>
      
      {filteredItems.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          {labels.noResults} &quot;{searchQuery}&quot;
        </div>
      )}

      {filteredItems.map((item, index) => {
        return (
          <details key={index} className="simple-faq">
            <summary>{item.question}</summary>
            <div className="simple-faq-content">
              <div style={{ marginBottom: '1rem' }}>{item.answer}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-tertiary)', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-subtle)' }}>
                {labels.didThisHelp}
                <button className="btn btn--outline" style={{ padding: '0.2rem 0.4rem', fontSize: '0.6875rem' }}>{labels.yes}</button>
                <button className="btn btn--outline" style={{ padding: '0.2rem 0.4rem', fontSize: '0.6875rem' }}>{labels.no}</button>
              </div>
            </div>
          </details>
        );
      })}

      <div className="faq-cta">
        <p className="faq-cta__text">{labels.ctaText}</p>
        <div className="faq-cta__links">
          {(labels.ctaLinks || DEFAULT_LABELS.ctaLinks).map((link, i) => (
            <a key={i} href={link.href} className="faq-cta__link">{link.text}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

