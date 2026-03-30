"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "What is a token in AI and large language models?",
    answer:
      "A token is the basic unit of text that AI models like GPT-4o, Claude, and Gemini process. Tokens can be whole words, parts of words, or even individual characters. For English text, 1 token is roughly 4 characters or about 0.75 words. The same text can produce different token counts depending on the model's tokenizer — for example, GPT-4o uses the o200k_base encoding while earlier models use cl100k_base.",
  },
  {
    question: "How does this token calculator work?",
    answer:
      "This calculator uses the same tokenization libraries that OpenAI and other AI providers use (tiktoken), running entirely in your browser via WebAssembly. When you type or paste text, it's tokenized in real-time with zero API calls — your text never leaves your device. The token count, word count, character count, and estimated cost are all calculated instantly.",
  },
  {
    question: "Why do different AI models produce different token counts?",
    answer:
      "Each AI model uses a different tokenizer with a different vocabulary. GPT-4o uses o200k_base (200,000 token vocabulary), while GPT-3.5 uses cl100k_base (100,000 tokens). A larger vocabulary typically means fewer tokens for the same text, which directly affects cost. Claude and Gemini use their own tokenizers, so the exact same prompt may cost differently across providers.",
  },
  {
    question: "How much does it cost to use GPT-4o, Claude, or Gemini?",
    answer:
      "Pricing varies significantly. As of March 2026: GPT-4o costs $2.50 per 1M input tokens and $10 per 1M output tokens. Claude Sonnet 4.6 costs $3 input / $15 output per 1M tokens. Gemini 1.5 Pro costs $1.25 input / $5 output per 1M tokens. For budget options, GPT-4o Mini ($0.15/$0.60) and DeepSeek V3 ($0.27/$1.10) are the most affordable.",
  },
  {
    question: "How can I reduce my LLM API costs?",
    answer:
      "The most effective strategies are: 1) Use shorter system prompts — they're sent with every request. 2) Choose the right model for the task — use GPT-4o Mini for simple tasks instead of GPT-4o. 3) Use prompt caching (supported by OpenAI and Anthropic). 4) Batch API requests to get volume discounts. 5) Truncate unnecessary context from user inputs. Use our calculator to test token counts before and after optimization.",
  },
  {
    question: "What is a context window and why does it matter?",
    answer:
      "A context window is the maximum number of tokens a model can process in a single request (input + output combined). GPT-4o has a 128K context window, Claude supports 200K, and Gemini 1.5 Pro supports up to 2M tokens. Larger context windows let you process longer documents but cost more. If your text exceeds the context window, you'll need to chunk it or use RAG (Retrieval-Augmented Generation).",
  },
  {
    question: "Is my text data safe when using this calculator?",
    answer:
      "Yes, completely. This token calculator runs entirely in your browser using WebAssembly. Your text is never sent to any server or API — all tokenization happens locally on your device. There is zero data collection, no cookies tracking your input, and no external requests made with your text. You can verify this by checking your browser's network tab.",
  },
  {
    question: "How accurate is this token counter compared to the official OpenAI tokenizer?",
    answer:
      "For OpenAI models (GPT-4o, GPT-4, GPT-3.5), this calculator uses the exact same tiktoken library that OpenAI's API uses, so the count is 100% accurate. For Claude, Gemini, DeepSeek, and LLaMA, we use the closest available tokenizer as an approximation — the actual count may vary by 5-15% depending on the text content and language.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // FAQPage JSON-LD schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
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
      <h2 className="faq-section__title">❓ Frequently Asked Questions</h2>
      {FAQ_ITEMS.map((item, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? "faq-item--open" : ""}`}
        >
          <button
            className="faq-item__question"
            onClick={() => toggle(index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
            id={`faq-question-${index}`}
          >
            {item.question}
            <span className="faq-item__icon" aria-hidden="true">+</span>
          </button>
          <div
            className="faq-item__answer"
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
          >
            <div className="faq-item__answer-inner">{item.answer}</div>
          </div>
        </div>
      ))}
    </section>
  );
}
