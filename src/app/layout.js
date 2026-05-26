import "./globals.css";
import Header from "@/components/Header";
import BackToTop from "@/components/BackToTop";
export const metadata = {
  metadataBase: new URL("https://tokencalculator.app"),
  title: "Token Calculator — Free LLM Token Counter for GPT, Claude & Gemini",
  description:
    "Free ChatGPT and OpenAI tokenizer calculator for GPT, Claude, Gemini & 20+ AI models. Count tokens, estimate API costs, and visualize tokenization instantly. 100% private — runs in your browser.",
  keywords: [
    "token calculator",
    "chatgpt token calculator",
    "openai token calculator",
    "openai tokenizer",
    "tokenizer",
    "LLM token calculator",
    "GPT token counter",
    "Claude token calculator",
    "AI API cost calculator",
    "token counter online",
    "tiktoken calculator",
    "tiktoken calculator online",
    "how many tokens in my text",
    "prompt token estimator",
    "free LLM token counter",
    "OpenAI tokenizer alternative",
  ],
  authors: [{ name: "Token Calculator" }],
  openGraph: {
    title: "Token Calculator — Free LLM Token Counter for GPT, Claude & Gemini",
    description:
      "Free ChatGPT and OpenAI tokenizer calculator for GPT, Claude, Gemini & 20+ AI models. Count tokens, estimate API costs, and visualize tokenization instantly. 100% private — runs in your browser.",
    type: "website",
    locale: "en_US",
    siteName: "Token Calculator",
    images: [
      {
        url: "https://tokencalculator.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Token Calculator - Free LLM Token Counter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Token Calculator — Free LLM Token Counter",
    description:
      "Free ChatGPT and OpenAI tokenizer calculator for GPT, Claude, Gemini & 20+ AI models.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "/",
      en: "/",
      de: "/de",
      fr: "/fr",
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Token Calculator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free real-time ChatGPT and OpenAI tokenizer calculator for all AI models. Count tokens, estimate costs, and visualize tokenization.",
    featureList: [
      "Real-time token counting",
      "Token visualization",
      "Cost estimation",
      "Multi-model support",
    ],
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}


function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">

        {/* Brand Column — spans full width on mobile */}
        <div className="footer__brand">
          <a href="/" className="footer__logo-link">
            <div className="footer__logo-bracket">
              [<span style={{ color: 'var(--accent)' }}>42</span>]
            </div>
            <div className="footer__logo-name">
              <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>token</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>calculator.app</span>
            </div>
          </a>
          <p className="footer__tagline">Built by devs, for devs.</p>
        </div>

        {/* Tools Column */}
        <div className="footer__col">
          <div className="footer__col-title">Tools</div>
          <a href="/" className="footer__link">Token Calculator</a>
          <a href="/gpt-token-calculator" className="footer__link">GPT Calculator</a>
          <a href="/claude-token-calculator" className="footer__link">Claude Calculator</a>
          <a href="/gemini-token-calculator" className="footer__link">Gemini Calculator</a>
          <a href="/llm-pricing-comparison" className="footer__link">Pricing Comparison</a>
        </div>

        {/* Resources Column */}
        <div className="footer__col">
          <div className="footer__col-title">Resources</div>
          <a href="/blog" className="footer__link">Blog</a>
          <a href="/api/docs" className="footer__link">API Docs</a>
          <a href="/llms.txt" className="footer__link">llms.txt</a>
          <a href="/about" className="footer__link">About</a>
        </div>

        {/* Legal Column */}
        <div className="footer__col">
          <div className="footer__col-title">Legal</div>
          <a href="/privacy" className="footer__link">Privacy Policy</a>
          <a href="/contact" className="footer__link">Contact Us</a>
        </div>

        {/* Connect Column */}
        <div className="footer__col">
          <div className="footer__col-title">Connect</div>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer__link">Twitter / X</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer__link">GitHub</a>
          <a href="https://producthunt.com" target="_blank" rel="noopener noreferrer" className="footer__link">Product Hunt</a>
          <a href="https://dev.to" target="_blank" rel="noopener noreferrer" className="footer__link">Dev.to</a>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-left">
          <span>© {new Date().getFullYear()} tokencalculator.app</span>
          <a href="/privacy" className="footer__bottom-link">Privacy Policy</a>
          <a href="/contact" className="footer__bottom-link">Contact</a>
          <span>MIT License</span>
        </div>
        <div className="footer__bottom-right">
          <span>Made with <span style={{ color: 'var(--error)' }}>♥</span> in India</span>
        </div>
      </div>
    </footer>
  );
}
