// Sitemap.xml for SEO — includes all pages

export async function GET() {
  const baseUrl = "https://tokencalculator.vercel.app";

  const pages = [
    { url: "/", changefreq: "weekly", priority: "1.0" },
    { url: "/gpt-token-calculator", changefreq: "monthly", priority: "0.9" },
    { url: "/claude-token-calculator", changefreq: "monthly", priority: "0.9" },
    { url: "/gemini-token-calculator", changefreq: "monthly", priority: "0.9" },
    { url: "/deepseek-token-calculator", changefreq: "monthly", priority: "0.8" },
    { url: "/llama-token-calculator", changefreq: "monthly", priority: "0.8" },
    { url: "/llm-pricing-comparison", changefreq: "weekly", priority: "0.9" },
    { url: "/api/docs", changefreq: "monthly", priority: "0.7" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
