// Free token counting API endpoint
// GET /api/count-tokens?text=hello&model=gpt-4o

import { getModelById, calculateCost, MODELS } from "@/lib/models";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text");
  const modelId = searchParams.get("model") || "gpt-4o";

  // Validate input
  if (!text) {
    return Response.json(
      {
        error: "Missing 'text' parameter",
        usage: "GET /api/count-tokens?text=your+text+here&model=gpt-4o",
        availableModels: MODELS.map((m) => m.id),
      },
      { status: 400 }
    );
  }

  // Rate limit: max 10,000 characters
  if (text.length > 10000) {
    return Response.json(
      {
        error: "Text exceeds maximum length of 10,000 characters",
        length: text.length,
        maxLength: 10000,
      },
      { status: 400 }
    );
  }

  const model = getModelById(modelId);

  // Approximate token count (server-side, without WASM)
  // Using the ~4 chars per token heuristic for the API
  // For exact counts, users should use the web interface with tiktoken WASM
  const approxTokens = Math.ceil(text.length / 4);
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const charCount = text.length;
  const inputCost = calculateCost(approxTokens, model, "input");
  const outputCost = calculateCost(approxTokens, model, "output");

  return Response.json(
    {
      model: {
        id: model.id,
        name: model.name,
        provider: model.provider,
        encoding: model.encoding,
      },
      counts: {
        tokens: approxTokens,
        words: wordCount,
        characters: charCount,
      },
      cost: {
        inputCost: `$${inputCost.toFixed(6)}`,
        outputCost: `$${outputCost.toFixed(6)}`,
        inputPricePerMillion: model.inputPrice,
        outputPricePerMillion: model.outputPrice,
      },
      note: "Token count is an approximation (~4 chars/token). For exact counts, use the web calculator with tiktoken WASM.",
      contextWindow: model.contextWindow,
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

export async function POST(request) {
  try {
    const body = await request.json();
    const text = body.text;
    const modelId = body.model || "gpt-4o";

    if (!text) {
      return Response.json(
        {
          error: "Missing 'text' property in JSON body",
          usage: "POST /api/count-tokens with JSON body: { \"text\": \"your text\", \"model\": \"gpt-4o\" }",
          availableModels: MODELS.map((m) => m.id),
        },
        { status: 400 }
      );
    }

    if (text.length > 100000) {
      return Response.json(
        {
          error: "Text exceeds POST maximum length of 100,000 characters",
          length: text.length,
          maxLength: 100000,
        },
        { status: 400 }
      );
    }

    const model = getModelById(modelId);

    const approxTokens = Math.ceil(text.length / 4);
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const charCount = text.length;
    const inputCost = calculateCost(approxTokens, model, "input");
    const outputCost = calculateCost(approxTokens, model, "output");

    return Response.json(
      {
        model: {
          id: model.id,
          name: model.name,
          provider: model.provider,
          encoding: model.encoding,
        },
        counts: {
          tokens: approxTokens,
          words: wordCount,
          characters: charCount,
        },
        cost: {
          inputCost: `$${inputCost.toFixed(6)}`,
          outputCost: `$${outputCost.toFixed(6)}`,
          inputPricePerMillion: model.inputPrice,
          outputPricePerMillion: model.outputPrice,
        },
        note: "Token count is an approximation (~4 chars/token). For exact counts, use the web calculator with tiktoken WASM.",
        contextWindow: model.contextWindow,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    return Response.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}
