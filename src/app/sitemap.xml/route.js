// Sitemap.xml for SEO — only real pages with correct domain

export async function GET() {
  const baseUrl = "https://www.tokencalculator.app";

  // Only locale variants that have actual homepage pages
  const LOCALES = ["en", "de", "fr", "es", "ja", "pt-br", "ko", "zh"];

  // English-only pages (no locale sub-pages exist for these routes)
  const EN_ONLY_PAGES = [
    { url: "/gpt-token-calculator",                            changefreq: "weekly",  priority: "0.9" },
    { url: "/claude-token-calculator",                         changefreq: "weekly",  priority: "0.9" },
    { url: "/gemini-token-calculator",                         changefreq: "weekly",  priority: "0.9" },
    { url: "/deepseek-token-calculator",                       changefreq: "weekly",  priority: "0.8" },
    { url: "/llama-token-calculator",                          changefreq: "monthly", priority: "0.8" },
    { url: "/llm-pricing-comparison",                          changefreq: "weekly",  priority: "0.9" },
    { url: "/api/docs",                                        changefreq: "monthly", priority: "0.7" },
    { url: "/about",                                           changefreq: "monthly", priority: "0.5" },
    { url: "/contact",                                         changefreq: "monthly", priority: "0.4" },
    { url: "/privacy",                                         changefreq: "monthly", priority: "0.3" },
    { url: "/blog",                                            changefreq: "weekly",  priority: "0.8" },
    { url: "/blog/what-is-a-token",                            changefreq: "monthly", priority: "0.8" },
    { url: "/blog/what-is-a-token-in-ai",                      changefreq: "monthly", priority: "0.8" },
    { url: "/blog/reduce-llm-api-costs",                       changefreq: "monthly", priority: "0.8" },
    { url: "/blog/gpt4o-vs-claude-cost",                       changefreq: "monthly", priority: "0.8" },
    { url: "/blog/context-window-guide",                       changefreq: "monthly", priority: "0.8" },
    { url: "/blog/prompt-token-tips",                          changefreq: "monthly", priority: "0.8" },
    { url: "/blog/llm-pricing-index-march-2026",               changefreq: "monthly", priority: "0.8" },
    { url: "/blog/llm-pricing-index-april-2026",               changefreq: "monthly", priority: "0.8" },
    { url: "/blog/deepseek-vs-gpt4o",                          changefreq: "monthly", priority: "0.8" },
    { url: "/blog/gpt-4-1-vs-claude-opus-4-6-vs-gemini-2-5-pro", changefreq: "monthly", priority: "0.8" },
  ];

  const today = new Date().toISOString().split("T")[0];
  const entries = [];

  // Build hreflang alternates for all locale homepage variants
  const buildHreflangs = () => {
    const links = [
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}" />`,
      ...LOCALES.map((l) => {
        const lPrefix = l === "en" ? "" : `/${l}`;
        const hreflang = l === "pt-br" ? "pt-BR" : l;
        return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${baseUrl}${lPrefix}" />`;
      }),
    ];
    return links.join("\n");
  };

  // Locale homepage entries (each gets full hreflang set)
  for (const locale of LOCALES) {
    const prefix = locale === "en" ? "" : `/${locale}`;
    const fullUrl = `${baseUrl}${prefix}`;
    const priority = locale === "en" ? "1.0" : "0.8";
    entries.push(
      `  <url>\n` +
      `    <loc>${fullUrl}</loc>\n` +
      `    <changefreq>daily</changefreq>\n` +
      `    <priority>${priority}</priority>\n` +
      `    <lastmod>${today}</lastmod>\n` +
      `${buildHreflangs()}\n` +
      `  </url>`
    );
  }

  // English-only pages (no locale sub-pages)
  for (const page of EN_ONLY_PAGES) {
    entries.push(
      `  <url>\n` +
      `    <loc>${baseUrl}${page.url}</loc>\n` +
      `    <changefreq>${page.changefreq}</changefreq>\n` +
      `    <priority>${page.priority}</priority>\n` +
      `    <lastmod>${today}</lastmod>\n` +
      `  </url>`
    );
  }

  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    entries.join("\n") + "\n" +
    `</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

