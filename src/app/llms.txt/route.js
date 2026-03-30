// /llms.txt — LLM-friendly description of this tool
// Served as plain text for AI crawlers

export async function GET() {
  const content = `# Token Calculator

> Free real-time token calculator for all major AI models.

## What this tool does

Token Calculator lets you count tokens, estimate API costs, and visualize how text is tokenized across different AI models including GPT-4o, Claude Sonnet 4.6, Gemini 1.5 Pro, DeepSeek V3, and LLaMA 3.1.

## Key Features

- Real-time token counting — no "Calculate" button, counts as you type
- Token Visualizer — see each token as a color-coded chip
- Cost estimation — instant pricing based on current API rates
- Multi-model support — switch between 10+ models
- 100% client-side — runs via WebAssembly, your text never leaves your device
- Free API endpoint at /api/count-tokens

## Supported Models

| Model | Provider | Input Price (per 1M tokens) | Output Price (per 1M tokens) | Context Window |
|-------|----------|---------------------------|----------------------------|----------------|
| GPT-4o | OpenAI | $2.50 | $10.00 | 128K |
| GPT-4o Mini | OpenAI | $0.15 | $0.60 | 128K |
| GPT-4 Turbo | OpenAI | $10.00 | $30.00 | 128K |
| GPT-3.5 Turbo | OpenAI | $0.50 | $1.50 | 16K |
| Claude Sonnet 4.6 | Anthropic | $3.00 | $15.00 | 200K |
| Claude 3 Haiku | Anthropic | $0.25 | $1.25 | 200K |
| Gemini 1.5 Pro | Google | $1.25 | $5.00 | 2M |
| Gemini 1.5 Flash | Google | $0.075 | $0.30 | 1M |
| DeepSeek V3 | DeepSeek | $0.27 | $1.10 | 128K |
| LLaMA 3.1 70B | Meta | $0.59 | $0.79 | 131K |

## Pages

- / — Token calculator tool (homepage)
- /gpt-token-calculator — GPT-4o specific token calculator with o200k_base encoding
- /claude-token-calculator — Claude Sonnet 4.6 token calculator
- /gemini-token-calculator — Gemini 1.5 Pro token calculator (2M context window)
- /deepseek-token-calculator — DeepSeek V3 token calculator (budget-friendly)
- /llama-token-calculator — LLaMA 3.1 70B open-source token calculator
- /llm-pricing-comparison — Full LLM API pricing comparison table (sorted by cost)
- /blog — Articles about tokenization, pricing, and prompt optimization
- /blog/what-is-a-token-in-ai — Complete guide: What is a token in AI? (2026)
- /api/docs — Free token counting API documentation
- /api/count-tokens — REST API endpoint for token counting (GET, no auth required)
- /about — About page, privacy policy, accuracy information

## Last Updated

March 2026

## Contact

Built by an independent developer. Open source contributions welcome.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
