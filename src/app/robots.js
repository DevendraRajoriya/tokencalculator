export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/api/'],
      },
    ],
    sitemap: 'https://www.tokencalculator.app/sitemap.xml',
    host: 'https://www.tokencalculator.app',
  }
}
