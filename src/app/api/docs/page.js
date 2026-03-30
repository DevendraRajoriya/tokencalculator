import { MODELS } from "@/lib/models";

export const metadata = {
  title: "Token Counting API — Free REST API for LLM Token Counting",
  description:
    "Free token counting API. Count tokens for GPT-4o, Claude, Gemini, DeepSeek and more via a simple REST endpoint. No authentication required, CORS enabled, rate limited.",
  keywords: ["token counting API", "free token API", "LLM token counter API", "token counting API free"],
  alternates: {
    canonical: "/api/docs",
  },
};

export default function APIDocs() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "API Documentation", item: "/api/docs" },
    ],
  };

  const exampleResponse = {
    model: { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", encoding: "o200k_base" },
    counts: { tokens: 14, words: 10, characters: 56 },
    cost: {
      inputCost: "$0.000035",
      outputCost: "$0.000140",
      inputPricePerMillion: 2.5,
      outputPricePerMillion: 10.0,
    },
    contextWindow: 128000,
    timestamp: "2026-03-31T00:00:00.000Z",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="hero" style={{ paddingBottom: "1.5rem" }}>
        <nav style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
          <a href="/" style={{ color: "var(--text-tertiary)", textDecoration: "none" }}>Home</a>
          <span style={{ margin: "0 0.5rem" }}>/</span>
          <span style={{ color: "var(--text-primary)" }}>API Documentation</span>
        </nav>
        <h1 className="hero__title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
          Token Counting <span>API</span>
        </h1>
        <p className="hero__subtitle">
          Free REST API for counting tokens across all major AI models.
          No authentication required. CORS enabled.
        </p>
      </section>

      <section className="container container--narrow" style={{ marginBottom: "3rem", padding: "0 1.5rem" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>

          {/* Endpoint */}
          <div style={{
            background: "var(--bg-secondary)", border: "1px solid var(--border-primary)",
            borderRadius: "var(--radius-lg)", padding: "1.25rem", marginBottom: "1.5rem",
            boxShadow: "var(--shadow-sm)",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem",
            }}>
              <span style={{
                padding: "0.25rem 0.5rem", borderRadius: "var(--radius-sm)",
                background: "var(--success-subtle)", color: "var(--success)",
                fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700,
              }}>GET</span>
              <code style={{
                fontFamily: "var(--font-mono)", fontSize: "0.875rem", fontWeight: 600,
              }}>/api/count-tokens</code>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", marginBottom: "0" }}>
              Count tokens and estimate costs for any supported AI model.
            </p>
          </div>

          {/* Parameters */}
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Parameters
          </h2>
          <div style={{
            background: "var(--bg-secondary)", border: "1px solid var(--border-primary)",
            borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: "1.5rem",
          }}>
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem" }}>text</code></td>
                  <td style={{ color: "var(--text-tertiary)", fontSize: "0.8125rem" }}>string</td>
                  <td><span style={{ color: "var(--error)", fontWeight: 600, fontSize: "0.8125rem" }}>Yes</span></td>
                  <td style={{ fontSize: "0.8125rem" }}>The text to count tokens for (max 10,000 characters)</td>
                </tr>
                <tr>
                  <td><code style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem" }}>model</code></td>
                  <td style={{ color: "var(--text-tertiary)", fontSize: "0.8125rem" }}>string</td>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>No</td>
                  <td style={{ fontSize: "0.8125rem" }}>Model ID (default: gpt-4o)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Available Models */}
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Available Models
          </h2>
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "1.5rem",
          }}>
            {MODELS.map((model) => (
              <code key={model.id} style={{
                padding: "0.25rem 0.625rem", borderRadius: "var(--radius-full)",
                background: "var(--bg-tertiary)", border: "1px solid var(--border-primary)",
                fontFamily: "var(--font-mono)", fontSize: "0.75rem",
              }}>{model.id}</code>
            ))}
          </div>

          {/* Example Request */}
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Example Request
          </h2>
          <pre style={{
            background: "var(--bg-secondary)", border: "1px solid var(--border-primary)",
            borderRadius: "var(--radius-lg)", padding: "1rem 1.25rem",
            fontFamily: "var(--font-mono)", fontSize: "0.8125rem",
            overflow: "auto", marginBottom: "1.5rem",
            lineHeight: 1.6, color: "var(--text-secondary)",
          }}>
{`curl "https://tokencalculator.vercel.app/api/count-tokens?text=Hello%20world&model=gpt-4o"

# JavaScript
fetch('/api/count-tokens?text=Hello%20world&model=gpt-4o')
  .then(res => res.json())
  .then(data => console.log(data));

# Python
import requests
resp = requests.get(
  'https://tokencalculator.vercel.app/api/count-tokens',
  params={'text': 'Hello world', 'model': 'gpt-4o'}
)
print(resp.json())`}
          </pre>

          {/* Example Response */}
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Example Response
          </h2>
          <pre style={{
            background: "var(--bg-secondary)", border: "1px solid var(--border-primary)",
            borderRadius: "var(--radius-lg)", padding: "1rem 1.25rem",
            fontFamily: "var(--font-mono)", fontSize: "0.8125rem",
            overflow: "auto", marginBottom: "1.5rem",
            lineHeight: 1.6, color: "var(--text-secondary)",
          }}>
            {JSON.stringify(exampleResponse, null, 2)}
          </pre>

          {/* Rate Limits */}
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Rate Limits & Notes
          </h2>
          <ul style={{
            fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.8,
            paddingLeft: "1.25rem",
          }}>
            <li>Maximum text length: <strong>10,000 characters</strong> per request</li>
            <li>CORS: Enabled for all origins</li>
            <li>Auth: None required</li>
            <li>Token counts are <strong>approximations</strong> (~4 chars per token for English)</li>
            <li>For <strong>exact token counts</strong>, use the <a href="/" style={{ color: "var(--accent)" }}>web calculator</a> which runs tiktoken WASM in-browser</li>
            <li>Cache: Responses cached for 1 hour</li>
          </ul>
        </div>
      </section>
    </>
  );
}
