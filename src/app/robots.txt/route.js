// robots.txt — Allow all crawlers

export async function GET() {
  const content = `User-agent: *
Allow: /

Sitemap: https://tokencalculator.vercel.app/sitemap.xml
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
