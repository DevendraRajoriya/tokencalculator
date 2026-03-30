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
- /llm-pricing-comparison — Full pricing comparison table
- /blog — Articles about tokenization, pricing, and prompt optimization
- /api/docs — Free token counting API documentation

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
