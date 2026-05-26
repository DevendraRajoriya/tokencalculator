export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://tokencalculator.vercel.app/sitemap.xml',
  }
}
