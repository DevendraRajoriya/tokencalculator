// Model configurations with pricing data (per 1M tokens)
// Last updated: March 2026

export const MODELS = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    encoding: "o200k_base",
    color: "#10a37f",
    inputPrice: 2.5,     // $ per 1M input tokens
    outputPrice: 10.0,   // $ per 1M output tokens
    contextWindow: 128000,
    description: "OpenAI's flagship multimodal model",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    encoding: "o200k_base",
    color: "#10a37f",
    inputPrice: 0.15,
    outputPrice: 0.6,
    contextWindow: 128000,
    description: "Fast and affordable small model",
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    encoding: "cl100k_base",
    color: "#10a37f",
    inputPrice: 10.0,
    outputPrice: 30.0,
    contextWindow: 128000,
    description: "Previous-gen powerful model",
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "OpenAI",
    encoding: "cl100k_base",
    color: "#10a37f",
    inputPrice: 0.5,
    outputPrice: 1.5,
    contextWindow: 16385,
    description: "Fast legacy model",
  },
  {
    id: "claude-3.5-sonnet",
    name: "Claude Sonnet 4.6",
    provider: "Anthropic",
    encoding: "cl100k_base", // Approximation — Claude uses its own tokenizer
    color: "#d97706",
    inputPrice: 3.0,
    outputPrice: 15.0,
    contextWindow: 200000,
    description: "Anthropic's most capable model",
  },
  {
    id: "claude-3-haiku",
    name: "Claude 3 Haiku",
    provider: "Anthropic",
    encoding: "cl100k_base",
    color: "#d97706",
    inputPrice: 0.25,
    outputPrice: 1.25,
    contextWindow: 200000,
    description: "Fast and affordable Anthropic model",
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    encoding: "cl100k_base", // Approximation
    color: "#4285f4",
    inputPrice: 1.25,
    outputPrice: 5.0,
    contextWindow: 2000000,
    description: "Google's long-context model",
  },
  {
    id: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    provider: "Google",
    encoding: "cl100k_base",
    color: "#4285f4",
    inputPrice: 0.075,
    outputPrice: 0.3,
    contextWindow: 1000000,
    description: "Google's fast and affordable model",
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    provider: "DeepSeek",
    encoding: "cl100k_base", // Approximation
    color: "#6366f1",
    inputPrice: 0.27,
    outputPrice: 1.10,
    contextWindow: 128000,
    description: "Cost-effective Chinese AI model",
  },
  {
    id: "llama-3.1-70b",
    name: "LLaMA 3.1 70B",
    provider: "Meta",
    encoding: "cl100k_base", // Approximation
    color: "#0668E1",
    inputPrice: 0.59,
    outputPrice: 0.79,
    contextWindow: 131072,
    description: "Open-source Meta model",
  },
];

export const DEFAULT_MODEL_ID = "gpt-4o";

export function getModelById(id) {
  return MODELS.find((m) => m.id === id) || MODELS[0];
}

export function calculateCost(tokenCount, model, type = "input") {
  const price = type === "input" ? model.inputPrice : model.outputPrice;
  return (tokenCount / 1_000_000) * price;
}

export function formatCost(cost) {
  if (cost < 0.000001) return "$0.00";
  if (cost < 0.01) return `$${cost.toFixed(6)}`;
  if (cost < 1) return `$${cost.toFixed(4)}`;
  return `$${cost.toFixed(2)}`;
}

export function formatNumber(num) {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toLocaleString();
}
