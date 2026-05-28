# 🔢 Token Calculator — Free LLM Token Counter for GPT, Claude & Gemini

> **Count tokens. Estimate costs. Ship smarter.**  
> The fastest, most private token calculator for AI developers — runs 100% in your browser.

🔗 **Live at [tokencalculator.app](https://tokencalculator.app)**

---

## What is Token Calculator?

[Token Calculator](https://tokencalculator.app) is a free, real-time token counting tool built for developers and AI engineers who work with large language model (LLM) APIs. It lets you instantly count tokens, estimate API costs, and visualize how your text is tokenized — all without sending your data to any server.

Whether you're building with **GPT-4o**, **Claude Opus**, **Gemini 2.5 Pro**, **DeepSeek**, **Grok**, **Mistral**, or **Meta LLaMA**, this tool gives you accurate token counts using the same tokenizers these models use internally.

---

## ✨ Features

| Feature | Description |
|---|---|
| ⚡ **Real-time tokenization** | Token count updates instantly as you type |
| 🤖 **20+ AI models supported** | GPT-4o, Claude, Gemini, DeepSeek, Grok, Qwen, Mistral, LLaMA & more |
| 💰 **API cost estimation** | See exact input/output costs per model |
| 🎨 **Token Visualizer** | Color-coded chips showing every token in your text |
| 📊 **Monthly cost projector** | Estimate costs at scale based on daily usage |
| 🔒 **100% private** | Text never leaves your browser — runs via WebAssembly |
| 🌍 **Multilingual** | Available in English, German, French, Spanish, Japanese, Portuguese, Korean, Chinese |
| 📱 **Mobile-first** | Fully responsive, works great on any device |
| 🆓 **Completely free** | No signup, no API key, no limits |

---

## 🚀 Why Token Calculator?

### The Problem with AI API Costs

When you call the OpenAI, Anthropic, or Google API, **you pay per token** — not per word, not per character, not per request. The same sentence can cost 2–4× more on one model compared to another, depending on their tokenizer.

Most developers discover this the hard way: an overrun context window, a surprise bill, or a production prompt that's 10% over the limit.

**Token Calculator solves this before it becomes a problem.**

### How It's Different

Most token counting tools either:
- Only support OpenAI's `tiktoken` (no Claude, Gemini, or open-source models)
- Send your text to a remote server (privacy risk)
- Require you to install a library or run code locally

Token Calculator runs the **actual tokenizer libraries in your browser** via WebAssembly, giving you:
- ✅ Accurate counts (same as the API)
- ✅ Support for all major model families
- ✅ Zero data collection
- ✅ Zero setup — just open the URL

---

## 🧠 How Tokenization Works

AI models don't read text the way humans do. Instead, they convert text into **tokens** — chunks that can be whole words, word pieces, or individual characters — using an algorithm called **Byte-Pair Encoding (BPE)**.

```
"tokenization" → ["token", "ization"]     # 2 tokens
"Hello, world!" → ["Hello", ",", " world", "!"]  # 4 tokens
"你好世界"       → may become 8+ tokens   # CJK = more tokens
```

**Key rule of thumb:**
- 1 token ≈ 4 characters in English
- 1 token ≈ 0.75 words
- 1,000 tokens ≈ 750 words

### Token Count by Content Type

| Content Type | Tokens per Word | 1,000 Words ≈ |
|---|---|---|
| English prose | ~1.3 | ~1,300 tokens |
| Code (Python/JS) | ~2–3 | ~2,000–3,000 tokens |
| Chinese / Japanese | ~2+ per char | ~2,000+ tokens |
| JSON / XML | ~3–4 | ~3,000–4,000 tokens |

---

## 💲 LLM API Pricing (May 2026)

| Model | Provider | Input / 1M tokens | Output / 1M tokens |
|---|---|---|---|
| GPT-4o mini | OpenAI | $0.15 | $0.60 |
| Claude Haiku 3.5 | Anthropic | $0.80 | $4.00 |
| Gemini 2.0 Flash | Google | $0.10 | $0.40 |
| DeepSeek V3 | DeepSeek | $0.27 | $1.10 |
| LLaMA 3.3 70B | Meta | $0.23 | $0.40 |
| GPT-4o | OpenAI | $2.50 | $10.00 |
| Claude Sonnet 4 | Anthropic | $3.00 | $15.00 |
| Gemini 2.5 Pro | Google | $1.25 | $10.00 |

> 💡 For the latest pricing, use the **[LLM Pricing Comparison](https://tokencalculator.app/llm-pricing-comparison)** page — updated regularly.

---

## 🛠️ Supported Models

### OpenAI
- GPT-4.1, GPT-4.1 mini, GPT-4.1 nano
- GPT-4o, GPT-4o mini
- o1, o1-mini, o3-mini

### Anthropic
- Claude Opus 4
- Claude Sonnet 4, Claude Sonnet 3.7, Claude Sonnet 3.5
- Claude Haiku 3.5

### Google
- Gemini 2.5 Pro, Gemini 2.5 Flash
- Gemini 2.0 Flash
- Gemini 1.5 Pro, Gemini 1.5 Flash

### Others
- DeepSeek V3, DeepSeek R1
- Grok 3 (xAI)
- Qwen 2.5 (Alibaba)
- Mistral Large, Mistral Small
- Meta LLaMA 3.3, LLaMA 3.1

---

## 📖 How to Use

1. **Go to [tokencalculator.app](https://tokencalculator.app)**
2. **Select your AI model** from the dropdown
3. **Paste or type your text** — token count updates in real time
4. **View the breakdown** — tokens, words, characters, estimated cost
5. **Use the Token Visualizer** to see exactly how your text is split

### Pro Tips

- Use the **System / User** tab split to separately count your system prompt vs. user message
- Enable the **Monthly Projector** to estimate costs at production scale
- Use the **Token Visualizer** to identify unexpectedly expensive phrases
- Switch models to compare costs — the same prompt can vary by 3× across models

---

## 🌐 Model-Specific Tools

- [ChatGPT Token Calculator](https://tokencalculator.app/gpt-token-calculator)
- [Claude Token Calculator](https://tokencalculator.app/claude-token-calculator)
- [Gemini Token Calculator](https://tokencalculator.app/gemini-token-calculator)
- [DeepSeek Token Calculator](https://tokencalculator.app/deepseek-token-calculator)
- [LLaMA Token Calculator](https://tokencalculator.app/llama-token-calculator)
- [LLM Pricing Comparison](https://tokencalculator.app/llm-pricing-comparison)

---

## 🔌 Free Token Counting API

Token Calculator exposes a free REST API for developers:

```bash
GET https://tokencalculator.app/api/count?text=Hello+world&model=gpt-4o
```

```json
{
  "tokens": 2,
  "model": "gpt-4o",
  "characters": 11,
  "words": 2,
  "estimatedCost": {
    "input": 0.000005,
    "output": 0.00002
  }
}
```

Full documentation: [tokencalculator.app/api/docs](https://tokencalculator.app/api/docs)

---

## 🏗️ Tech Stack

Built with modern, production-grade tooling:

- **Framework**: Next.js 14 (App Router)
- **Tokenizers**: `tiktoken` (OpenAI), `@anthropic-ai/tokenizer` (Claude), custom estimators for Gemini/DeepSeek/LLaMA — all compiled to **WebAssembly** and run client-side
- **Styling**: Vanilla CSS with custom design system (DM Sans + DM Mono + Syne)
- **i18n**: 8 languages via Next.js middleware routing
- **Deployment**: Heroku / Vercel-compatible
- **SEO**: Schema.org structured data, OpenGraph, sitemap, llms.txt

---

## 🚀 Self-Hosting / Development

```bash
# Clone the repository
git clone https://github.com/DevendraRajoriya/tokencalculator.git
cd tokencalculator

# Install dependencies
npm install

# Run development server
npm run dev
# → http://localhost:3000

# Build for production
npm run build
npm start
```

### Environment

No environment variables required — the app is fully client-side with no external API calls.

---

## 📝 Blog & Resources

- [How many tokens is my ChatGPT prompt?](https://tokencalculator.app/blog)
- [GPT-4o vs Claude 3.5 — Token Cost Comparison](https://tokencalculator.app/blog)
- [How to Reduce Your OpenAI API Bill](https://tokencalculator.app/blog)

---

## 🤝 Contributing

Contributions are welcome! Areas where help is appreciated:

- Adding new models as they are released
- Improving tokenizer accuracy for non-English languages  
- Adding new blog posts / SEO content
- UI/UX improvements

Please open an issue or PR on [GitHub](https://github.com/DevendraRajoriya/tokencalculator).

---

## 📄 License

MIT License — free to use, modify, and deploy.

---

## 🙏 Acknowledgements

- [tiktoken](https://github.com/openai/tiktoken) — OpenAI's tokenizer
- [Next.js](https://nextjs.org) — React framework
- The open-source AI community

---

<p align="center">
  <strong>Built by devs, for devs. 🇮🇳</strong><br/>
  <a href="https://tokencalculator.app">tokencalculator.app</a> · 
  <a href="https://tokencalculator.app/llm-pricing-comparison">Pricing</a> · 
  <a href="https://tokencalculator.app/blog">Blog</a> · 
  <a href="https://tokencalculator.app/api/docs">API</a> · 
  <a href="https://tokencalculator.app/contact">Contact</a>
</p>
