// Sitemap.xml for SEO — all pages × all languages

export async function GET() {
  const baseUrl = "https://tokencalculator.app";

  const LOCALES = ["en", "de", "fr", "es", "ja", "pt-br", "ko", "zh"];

  const PAGES = [
    { url: "", changefreq: "daily", priority: "1.0" },
    { url: "/gpt-token-calculator", changefreq: "weekly", priority: "0.9" },
    { url: "/claude-token-calculator", changefreq: "weekly", priority: "0.9" },
    { url: "/gemini-token-calculator", changefreq: "weekly", priority: "0.9" },
    { url: "/deepseek-token-calculator", changefreq: "weekly", priority: "0.8" },
    { url: "/llama-token-calculator", changefreq: "monthly", priority: "0.8" },
    { url: "/llm-pricing-comparison", changefreq: "weekly", priority: "0.9" },
    { url: "/api/docs", changefreq: "monthly", priority: "0.7" },
    { url: "/about", changefreq: "monthly", priority: "0.5" },
    { url: "/blog", changefreq: "weekly", priority: "0.8" },
    { url: "/blog/what-is-a-token-in-ai", changefreq: "monthly", priority: "0.8" },
    { url: "/blog/reduce-llm-api-costs", changefreq: "monthly", priority: "0.8" },
    { url: "/blog/gpt4o-vs-claude-cost", changefreq: "monthly", priority: "0.8" },
    { url: "/blog/context-window-guide", changefreq: "monthly", priority: "0.8" },
    { url: "/blog/prompt-token-tips", changefreq: "monthly", priority: "0.8" },
    { url: "/blog/llm-pricing-index-march-2026", changefreq: "monthly", priority: "0.8" },
    { url: "/blog/deepseek-vs-gpt4o", changefreq: "monthly", priority: "0.8" },
  ];

  const entries = [];

  for (const page of PAGES) {
    for (const locale of LOCALES) {
      const prefix = locale === "en" ? "" : `/${locale}`;
      const fullUrl = `${baseUrl}${prefix}${page.url}`;

      // Build hreflang links for each page across all locales
      const hreflangs = LOCALES.map((l) => {
        const lPrefix = l === "en" ? "" : `/${l}`;
        const hreflang = l === "pt-br" ? "pt-BR" : l;
        return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${baseUrl}${lPrefix}${page.url}" />`;
      }).join("\n");

      entries.push(`  <url>
    <loc>${fullUrl}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.url}" />
${hreflangs}
  </url>`);
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
