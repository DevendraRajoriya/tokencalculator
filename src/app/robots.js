export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://www.tokencalculator.app/sitemap.xml',
    Host: 'www.tokencalculator.app' ,
  }
}
