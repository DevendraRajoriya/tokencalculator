// Model configurations with pricing data (per 1M tokens)
// Last updated: June 2026

export const MODELS = [
  // OpenAI
  { id: 'gpt-5.5', name: 'GPT-5.5', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 3.50, outputPrice: 21.00, contextWindow: 500000, description: 'Latest next-gen flagship' },
  { id: 'gpt-5.5-mini', name: 'GPT-5.5 Mini', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 1.00, outputPrice: 6.00, contextWindow: 500000, description: 'Efficient 5.5 model' },
  { id: 'gpt-5.5-nano', name: 'GPT-5.5 Nano', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 0.30, outputPrice: 1.75, contextWindow: 500000, description: 'Ultra-fast 5.5 model' },
  { id: 'gpt-5.5-pro', name: 'GPT-5.5 Pro', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 40.00, outputPrice: 240.00, contextWindow: 500000, description: 'Pro 5.5 model' },
  { id: 'gpt-5.4', name: 'GPT-5.4', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 2.50, outputPrice: 15.00, contextWindow: 272000, description: 'Latest flagship model' },
  { id: 'gpt-5.4-mini', name: 'GPT-5.4 Mini', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 0.75, outputPrice: 4.50, contextWindow: 272000, description: 'Efficient flagship model' },
  { id: 'gpt-5.4-nano', name: 'GPT-5.4 Nano', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 0.20, outputPrice: 1.25, contextWindow: 272000, description: 'Ultra-fast flagship model' },
  { id: 'gpt-5.4-pro', name: 'GPT-5.4 Pro', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 30.00, outputPrice: 180.00, contextWindow: 272000, description: 'Pro flagship model' },
  { id: 'gpt-5.2', name: 'GPT-5.2', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 1.75, outputPrice: 14.00, contextWindow: 200000, description: 'Standard 5.2 model' },
  { id: 'gpt-5.2-pro', name: 'GPT-5.2 Pro', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 21.00, outputPrice: 168.00, contextWindow: 200000, description: 'Pro 5.2 model' },
  { id: 'gpt-5.1', name: 'GPT-5.1', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 1.25, outputPrice: 10.00, contextWindow: 200000, description: 'Standard 5.1 model' },
  { id: 'gpt-5', name: 'GPT-5', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 1.25, outputPrice: 10.00, contextWindow: 200000, description: 'Standard GPT-5' },
  { id: 'gpt-5-mini', name: 'GPT-5 Mini', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 0.25, outputPrice: 2.00, contextWindow: 200000, description: 'Efficient GPT-5' },
  { id: 'gpt-5-nano', name: 'GPT-5 Nano', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 0.05, outputPrice: 0.40, contextWindow: 200000, description: 'Ultra-fast GPT-5' },
  { id: 'gpt-5-pro', name: 'GPT-5 Pro', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 15.00, outputPrice: 120.00, contextWindow: 200000, description: 'Pro GPT-5 model' },
  { id: 'gpt-4-1', name: 'GPT-4.1', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 2.00, outputPrice: 8.00, contextWindow: 1047576, description: 'Coding & instruction following' },
  { id: 'gpt-4-1-mini', name: 'GPT-4.1 Mini', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 0.40, outputPrice: 1.60, contextWindow: 1047576, description: 'Mid-tier 4.1 model' },
  { id: 'gpt-4-1-nano', name: 'GPT-4.1 Nano', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 0.10, outputPrice: 0.40, contextWindow: 1047576, description: 'Ultra-cheap 4.1 model' },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 2.50, outputPrice: 10.00, contextWindow: 128000, description: 'Multimodal model (legacy)' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 0.15, outputPrice: 0.60, contextWindow: 128000, description: 'Fast and affordable' },
  { id: 'o1', name: 'o1', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 15.00, outputPrice: 60.00, contextWindow: 200000, description: 'Reasoning model' },
  { id: 'o1-pro', name: 'o1-pro', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 150.00, outputPrice: 600.00, contextWindow: 200000, description: 'Pro reasoning model' },
  { id: 'o3', name: 'o3', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 2.00, outputPrice: 8.00, contextWindow: 200000, description: 'Reasoning model' },
  { id: 'o3-pro', name: 'o3-pro', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 20.00, outputPrice: 80.00, contextWindow: 200000, description: 'Pro reasoning model' },
  { id: 'o4-mini', name: 'o4-mini', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 1.10, outputPrice: 4.40, contextWindow: 200000, description: 'Efficient reasoning model' },
  { id: 'o3-mini', name: 'o3-mini', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 1.10, outputPrice: 4.40, contextWindow: 200000, description: 'Small reasoning model' },
  { id: 'o1-mini', name: 'o1-mini', provider: 'OpenAI', encoding: 'o200k_base', color: 'var(--green)', inputPrice: 1.10, outputPrice: 4.40, contextWindow: 200000, description: 'Mini reasoning' },
  { id: 'gpt-3-5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI', encoding: 'cl100k_base', color: 'var(--green)', inputPrice: 0.50, outputPrice: 1.50, contextWindow: 16385, description: 'Legacy model' },

  // Anthropic
  { id: 'claude-opus-4-8', name: 'Claude Opus 4.8', provider: 'Anthropic', encoding: 'claude', color: 'var(--amber)', inputPrice: 6.00, outputPrice: 30.00, contextWindow: 1000000, description: 'Latest most powerful model' },
  { id: 'claude-sonnet-4-7', name: 'Claude Sonnet 4.7', provider: 'Anthropic', encoding: 'claude', color: 'var(--amber)', inputPrice: 3.50, outputPrice: 17.50, contextWindow: 1000000, description: 'Latest balanced model' },
  { id: 'claude-haiku-4-6', name: 'Claude Haiku 4.6', provider: 'Anthropic', encoding: 'claude', color: 'var(--amber)', inputPrice: 1.20, outputPrice: 6.00, contextWindow: 200000, description: 'Latest fast model' },
  { id: 'claude-opus-4-7', name: 'Claude Opus 4.7', provider: 'Anthropic', encoding: 'claude', color: 'var(--amber)', inputPrice: 5.00, outputPrice: 25.00, contextWindow: 1000000, description: 'Latest most powerful model' },
  { id: 'claude-opus-4-6', name: 'Claude Opus 4.6', provider: 'Anthropic', encoding: 'claude', color: 'var(--amber)', inputPrice: 5.00, outputPrice: 25.00, contextWindow: 1000000, description: 'Previous flagship model' },
  { id: 'claude-opus-4-5', name: 'Claude Opus 4.5', provider: 'Anthropic', encoding: 'claude', color: 'var(--amber)', inputPrice: 5.00, outputPrice: 25.00, contextWindow: 200000, description: 'Flagship model' },
  { id: 'claude-opus-4-1', name: 'Claude Opus 4.1', provider: 'Anthropic', encoding: 'claude', color: 'var(--amber)', inputPrice: 15.00, outputPrice: 75.00, contextWindow: 200000, description: 'Legacy flagship model' },
  { id: 'claude-opus-4', name: 'Claude Opus 4', provider: 'Anthropic', encoding: 'claude', color: 'var(--amber)', inputPrice: 15.00, outputPrice: 75.00, contextWindow: 200000, description: 'Legacy flagship model' },
  { id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6', provider: 'Anthropic', encoding: 'claude', color: 'var(--amber)', inputPrice: 3.00, outputPrice: 15.00, contextWindow: 1000000, description: 'Anthropic flagship' },
  { id: 'claude-sonnet-4-5', name: 'Claude Sonnet 4.5', provider: 'Anthropic', encoding: 'claude', color: 'var(--amber)', inputPrice: 3.00, outputPrice: 15.00, contextWindow: 200000, description: 'Balanced fast model' },
  { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', provider: 'Anthropic', encoding: 'claude', color: 'var(--amber)', inputPrice: 3.00, outputPrice: 15.00, contextWindow: 200000, description: 'Balanced legacy model' },
  { id: 'claude-sonnet-3-7', name: 'Claude Sonnet 3.7', provider: 'Anthropic', encoding: 'claude', color: 'var(--amber)', inputPrice: 3.00, outputPrice: 15.00, contextWindow: 200000, description: 'Legacy supported model' },
  { id: 'claude-haiku-4-5', name: 'Claude Haiku 4.5', provider: 'Anthropic', encoding: 'claude', color: 'var(--amber)', inputPrice: 1.00, outputPrice: 5.00, contextWindow: 200000, description: 'Mid-tier fast model' },
  { id: 'claude-haiku-3-5', name: 'Claude Haiku 3.5', provider: 'Anthropic', encoding: 'claude', color: 'var(--amber)', inputPrice: 0.80, outputPrice: 4.00, contextWindow: 200000, description: 'Fast model' },
  { id: 'claude-opus-3', name: 'Claude Opus 3', provider: 'Anthropic', encoding: 'claude', color: 'var(--amber)', inputPrice: 15.00, outputPrice: 75.00, contextWindow: 200000, description: 'Deprecated flagship' },
  { id: 'claude-3-haiku', name: 'Claude Haiku 3', provider: 'Anthropic', encoding: 'claude', color: 'var(--amber)', inputPrice: 0.25, outputPrice: 1.25, contextWindow: 200000, description: 'Fast and affordable' },

  // Google
  { id: 'gemini-3-5-pro', name: 'Gemini 3.5 Pro', provider: 'Google', encoding: 'cl100k_base', color: 'var(--blue)', inputPrice: 3.00, outputPrice: 18.00, contextWindow: 2000000, description: 'Latest flagship multimodal model' },
  { id: 'gemini-3-5-flash', name: 'Gemini 3.5 Flash', provider: 'Google', encoding: 'cl100k_base', color: 'var(--blue)', inputPrice: 0.75, outputPrice: 4.50, contextWindow: 2000000, description: 'Fast next-gen model' },
  { id: 'gemini-3-5-flash-lite', name: 'Gemini 3.5 Flash-Lite', provider: 'Google', encoding: 'cl100k_base', color: 'var(--blue)', inputPrice: 0.15, outputPrice: 0.90, contextWindow: 1000000, description: 'Ultra-cheap 3.5 model' },
  { id: 'gemini-3-1-flash', name: 'Gemini 3.1 Flash', provider: 'Google', encoding: 'cl100k_base', color: 'var(--blue)', inputPrice: 0.50, outputPrice: 3.00, contextWindow: 1000000, description: 'Balanced 3.1 speed model' },
  { id: 'gemini-3-1-pro', name: 'Gemini 3.1 Pro', provider: 'Google', encoding: 'cl100k_base', color: 'var(--blue)', inputPrice: 2.00, outputPrice: 12.00, contextWindow: 2000000, description: 'Latest flagship multimodal model' },
  { id: 'gemini-3-1-flash-lite', name: 'Gemini 3.1 Flash-Lite', provider: 'Google', encoding: 'cl100k_base', color: 'var(--blue)', inputPrice: 0.25, outputPrice: 1.50, contextWindow: 1000000, description: 'Cost-efficient 3.1 model' },
  { id: 'gemini-3-flash', name: 'Gemini 3 Flash', provider: 'Google', encoding: 'cl100k_base', color: 'var(--blue)', inputPrice: 0.50, outputPrice: 3.00, contextWindow: 2000000, description: 'Intelligent speed model' },
  { id: 'gemini-2-5-pro', name: 'Gemini 2.5 Pro', provider: 'Google', encoding: 'cl100k_base', color: 'var(--blue)', inputPrice: 1.25, outputPrice: 10.00, contextWindow: 2000000, description: 'Best reasoning model' },
  { id: 'gemini-2-5-flash', name: 'Gemini 2.5 Flash', provider: 'Google', encoding: 'cl100k_base', color: 'var(--blue)', inputPrice: 0.30, outputPrice: 2.50, contextWindow: 1000000, description: 'Fast and capable' },
  { id: 'gemini-2-5-flash-lite', name: 'Gemini 2.5 Flash-Lite', provider: 'Google', encoding: 'cl100k_base', color: 'var(--blue)', inputPrice: 0.10, outputPrice: 0.40, contextWindow: 1000000, description: 'Ultra-cheap Google model' },
  { id: 'gemini-2-0-flash', name: 'Gemini 2.0 Flash', provider: 'Google', encoding: 'cl100k_base', color: 'var(--blue)', inputPrice: 0.10, outputPrice: 0.40, contextWindow: 1000000, description: 'Deprecated fast model' },
  { id: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', encoding: 'cl100k_base', color: 'var(--blue)', inputPrice: 1.25, outputPrice: 5.00, contextWindow: 2000000, description: 'Legacy long-context model' },
  { id: 'gemini-1-5-flash', name: 'Gemini 1.5 Flash', provider: 'Google', encoding: 'cl100k_base', color: 'var(--blue)', inputPrice: 0.075, outputPrice: 0.30, contextWindow: 1000000, description: 'Legacy affordable model' },

  // DeepSeek
  { id: 'deepseek-v3-5', name: 'DeepSeek V3.5', provider: 'DeepSeek', encoding: 'hf:deepseek-ai/DeepSeek-V3', color: 'var(--purple)', inputPrice: 0.38, outputPrice: 0.60, contextWindow: 128000, description: 'Latest budget reasoning' },
  { id: 'deepseek-r2', name: 'DeepSeek R2', provider: 'DeepSeek', encoding: 'hf:deepseek-ai/DeepSeek-R1', color: 'var(--purple)', inputPrice: 0.80, outputPrice: 3.20, contextWindow: 128000, description: 'Next-gen deep reasoning' },
  { id: 'deepseek-v3', name: 'DeepSeek V3', provider: 'DeepSeek', encoding: 'hf:deepseek-ai/DeepSeek-V3', color: 'var(--purple)', inputPrice: 0.28, outputPrice: 0.42, contextWindow: 128000, description: 'Budget reasoning' },
  { id: 'deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek', encoding: 'hf:deepseek-ai/DeepSeek-R1', color: 'var(--purple)', inputPrice: 0.55, outputPrice: 2.19, contextWindow: 128000, description: 'Deep reasoning model' },

  // Meta — Xenova/* mirrors are public (no HF login/gate required)
  // Llama 4 uses the same tiktoken-based BPE as Llama 3.2
  { id: 'llama-4-1-scout', name: 'Llama 4.1 Scout', provider: 'Meta', encoding: 'hf:Xenova/Llama-3.2-Tokenizer', color: 'var(--indigo)', inputPrice: 0.09, outputPrice: 0.28, contextWindow: 10000000, description: 'Next-gen 10M context open model' },
  { id: 'llama-4-scout', name: 'Llama 4 Scout', provider: 'Meta', encoding: 'hf:Xenova/Llama-3.2-Tokenizer', color: 'var(--indigo)', inputPrice: 0.11, outputPrice: 0.34, contextWindow: 10000000, description: 'Open source 10M context' },
  { id: 'llama-4-maverick', name: 'Llama 4 Maverick', provider: 'Meta', encoding: 'hf:Xenova/Llama-3.2-Tokenizer', color: 'var(--indigo)', inputPrice: 0.20, outputPrice: 0.60, contextWindow: 1000000, description: 'Open source balance' },
  { id: 'llama-3-3-70b', name: 'LLaMA 3.3 70B', provider: 'Meta', encoding: 'hf:Xenova/Meta-Llama-3.1-Tokenizer', color: 'var(--indigo)', inputPrice: 0.59, outputPrice: 0.79, contextWindow: 131072, description: 'Refined open source' },

  // Mistral
  { id: 'mistral-large-4', name: 'Mistral Large 4', provider: 'Mistral', encoding: 'cl100k_base', color: '#EE6C4D', inputPrice: 2.50, outputPrice: 7.50, contextWindow: 256000, description: 'Latest flagship reasoning model' },
  { id: 'mistral-large-latest', name: 'Mistral Large 3', provider: 'Mistral', encoding: 'cl100k_base', color: '#EE6C4D', inputPrice: 2.00, outputPrice: 6.00, contextWindow: 128000, description: 'Flagship reasoning model' },
  { id: 'pixtral-large-latest', name: 'Pixtral Large', provider: 'Mistral', encoding: 'cl100k_base', color: '#EE6C4D', inputPrice: 2.00, outputPrice: 6.00, contextWindow: 128000, description: 'Flagship multimodal model' },
  { id: 'mistral-small-latest', name: 'Mistral Small 3', provider: 'Mistral', encoding: 'cl100k_base', color: '#EE6C4D', inputPrice: 0.10, outputPrice: 0.30, contextWindow: 32000, description: 'Cost-efficient enterprise' },
  { id: 'codestral-latest', name: 'Codestral', provider: 'Mistral', encoding: 'cl100k_base', color: '#EE6C4D', inputPrice: 0.20, outputPrice: 0.60, contextWindow: 256000, description: 'Coding specialized model' },
  { id: 'ministral-8b-latest', name: 'Ministral 8B', provider: 'Mistral', encoding: 'cl100k_base', color: '#EE6C4D', inputPrice: 0.10, outputPrice: 0.10, contextWindow: 128000, description: 'Powerful edge model' },
  { id: 'ministral-3b-latest', name: 'Ministral 3B', provider: 'Mistral', encoding: 'cl100k_base', color: '#EE6C4D', inputPrice: 0.04, outputPrice: 0.04, contextWindow: 128000, description: 'Ultra-fast edge model' },
  { id: 'mistral-nemo', name: 'Mistral Nemo', provider: 'Mistral', encoding: 'cl100k_base', color: '#EE6C4D', inputPrice: 0.15, outputPrice: 0.15, contextWindow: 128000, description: 'Efficient multilingual model' },
  { id: 'pixtral-12b-2409', name: 'Pixtral 12B', provider: 'Mistral', encoding: 'cl100k_base', color: '#EE6C4D', inputPrice: 0.15, outputPrice: 0.15, contextWindow: 128000, description: 'Fast multimodal model' },

  // Perplexity — Sonar models with built-in web search
  { id: 'sonar-pro', name: 'Sonar Pro', provider: 'Perplexity', encoding: 'cl100k_base', color: '#20B2AA', inputPrice: 3.00, outputPrice: 15.00, contextWindow: 200000, description: 'Deep research + citations' },
  { id: 'sonar-large', name: 'Sonar Large', provider: 'Perplexity', encoding: 'cl100k_base', color: '#20B2AA', inputPrice: 1.00, outputPrice: 1.00, contextWindow: 127000, description: 'Large online search model' },
  { id: 'sonar-small', name: 'Sonar Small', provider: 'Perplexity', encoding: 'cl100k_base', color: '#20B2AA', inputPrice: 0.20, outputPrice: 0.20, contextWindow: 127000, description: 'Fast online search model' },
  { id: 'sonar-huge', name: 'Sonar Huge', provider: 'Perplexity', encoding: 'cl100k_base', color: '#20B2AA', inputPrice: 5.00, outputPrice: 5.00, contextWindow: 127000, description: 'Most powerful Sonar model' },

  // xAI — Grok models with X/Twitter real-time data
  { id: 'grok-5', name: 'Grok 5', provider: 'xAI', encoding: 'cl100k_base', color: '#E5E5E5', inputPrice: 2.00, outputPrice: 4.00, contextWindow: 2000000, description: 'Latest xAI flagship model' },
  { id: 'grok-5-mini', name: 'Grok 5 Mini', provider: 'xAI', encoding: 'cl100k_base', color: '#E5E5E5', inputPrice: 0.40, outputPrice: 1.00, contextWindow: 1000000, description: 'Fast affordable Grok model' },
  { id: 'grok-4-3', name: 'Grok 4.3', provider: 'xAI', encoding: 'cl100k_base', color: '#E5E5E5', inputPrice: 1.25, outputPrice: 2.50, contextWindow: 1000000, description: 'Flagship Grok model' },
  { id: 'grok-4-20', name: 'Grok 4.20', provider: 'xAI', encoding: 'cl100k_base', color: '#E5E5E5', inputPrice: 1.25, outputPrice: 2.50, contextWindow: 2000000, description: 'Multi-agent reasoning model' },
  { id: 'grok-4-1-fast', name: 'Grok 4.1 Fast', provider: 'xAI', encoding: 'cl100k_base', color: '#E5E5E5', inputPrice: 0.20, outputPrice: 0.50, contextWindow: 2000000, description: 'Budget fast model' },

  // Qwen — Alibaba Cloud models
  { id: 'qwen-4-max', name: 'Qwen 4 Max', provider: 'Qwen', encoding: 'cl100k_base', color: '#6B48FF', inputPrice: 3.50, outputPrice: 10.50, contextWindow: 1000000, description: 'Latest flagship Qwen model' },
  { id: 'qwen-4-plus', name: 'Qwen 4 Plus', provider: 'Qwen', encoding: 'cl100k_base', color: '#6B48FF', inputPrice: 0.70, outputPrice: 2.80, contextWindow: 1000000, description: 'Balanced next-gen Qwen model' },
  { id: 'qwen-3-7-max', name: 'Qwen 3.7 Max', provider: 'Qwen', encoding: 'cl100k_base', color: '#6B48FF', inputPrice: 2.50, outputPrice: 7.50, contextWindow: 1000000, description: 'Flagship Qwen model' },
  { id: 'qwen-3-5-plus', name: 'Qwen 3.5 Plus', provider: 'Qwen', encoding: 'cl100k_base', color: '#6B48FF', inputPrice: 0.50, outputPrice: 2.00, contextWindow: 1000000, description: 'Balanced Qwen model' },
  { id: 'qwen-2-5-72b', name: 'Qwen 2.5 72B', provider: 'Qwen', encoding: 'cl100k_base', color: '#6B48FF', inputPrice: 0.23, outputPrice: 0.40, contextWindow: 131072, description: 'Cost-efficient open model' },
];


export const DEFAULT_MODEL_ID = "gpt-5.4";

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
