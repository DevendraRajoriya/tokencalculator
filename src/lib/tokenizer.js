// Tokenizer utility using tiktoken
// Runs entirely client-side — zero API calls, instant response

let encoders = {};

export async function getEncoder(encodingName) {
  if (encoders[encodingName]) {
    return encoders[encodingName];
  }

  try {
    const tiktoken = await import("tiktoken");
    const encoder = tiktoken.get_encoding(encodingName);
    encoders[encodingName] = encoder;
    return encoder;
  } catch (error) {
    console.error(`Failed to load encoding ${encodingName}:`, error);
    return null;
  }
}

export async function countTokens(text, encodingName = "cl100k_base") {
  if (!text || text.length === 0) return 0;

  const encoder = await getEncoder(encodingName);
  if (!encoder) {
    // Fallback: rough approximation (1 token ≈ 4 characters for English)
    return Math.ceil(text.length / 4);
  }

  try {
    const tokens = encoder.encode(text);
    return tokens.length;
  } catch (error) {
    console.error("Error counting tokens:", error);
    return Math.ceil(text.length / 4);
  }
}

export async function tokenize(text, encodingName = "cl100k_base") {
  if (!text || text.length === 0) return [];

  const encoder = await getEncoder(encodingName);
  if (!encoder) {
    // Fallback: split by spaces/characters
    return text.split(/(\s+)/).filter(Boolean).map((chunk, i) => ({
      id: i,
      text: chunk,
      tokenId: i,
    }));
  }

  try {
    const tokenIds = encoder.encode(text);
    const tokens = [];
    let byteOffset = 0;

    for (let i = 0; i < tokenIds.length; i++) {
      const tokenId = tokenIds[i];
      // Decode individual token to get its text representation
      const decoded = encoder.decode(new Uint32Array([tokenId]));
      const decodedText = new TextDecoder().decode(decoded);

      tokens.push({
        id: i,
        text: decodedText,
        tokenId: tokenId,
      });

      byteOffset += decodedText.length;
    }

    return tokens;
  } catch (error) {
    console.error("Error tokenizing:", error);
    return text.split(/(\s+)/).filter(Boolean).map((chunk, i) => ({
      id: i,
      text: chunk,
      tokenId: i,
    }));
  }
}

export function countWords(text) {
  if (!text || text.trim().length === 0) return 0;
  return text.trim().split(/\s+/).length;
}

export function countCharacters(text) {
  if (!text) return 0;
  return text.length;
}
