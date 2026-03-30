import "./globals.css";

export const metadata = {
  title: "Token Calculator — Free LLM Token Counter for GPT, Claude & Gemini",
  description:
    "Free real-time token calculator for all AI models. Count tokens, estimate costs, and visualize tokenization for GPT-4o, Claude Sonnet, Gemini, DeepSeek, and LLaMA instantly. No signup required.",
  keywords: [
    "token calculator",
    "LLM token calculator",
    "GPT token counter",
    "Claude token calculator",
    "AI API cost calculator",
    "token counter online",
    "tiktoken calculator",
  ],
  authors: [{ name: "Token Calculator" }],
  openGraph: {
    title: "Token Calculator — Free LLM Token Counter for GPT, Claude & Gemini",
    description:
      "Count tokens, estimate costs, and visualize tokenization for all major AI models. Free, instant, no signup.",
    type: "website",
    locale: "en_US",
    siteName: "Token Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Token Calculator — Free LLM Token Counter",
    description:
      "Count tokens, estimate costs, and visualize tokenization for all major AI models.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    languages: {
      en: "/",
      de: "/de",
      fr: "/fr",
    },
  },
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
      "Free real-time token calculator for all AI models. Count tokens, estimate costs, and visualize tokenization.",
    featureList: [
      "Real-time token counting",
      "Token visualization",
      "Cost estimation",
      "Multi-model support",
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="/" className="header__logo">
          <div className="header__logo-icon">Tc</div>
          Token Calculator
        </a>
        <nav className="header__nav" aria-label="Main navigation">
          <a href="/" className="header__link header__link--active">
            Calculator
          </a>
          <a href="/llm-pricing-comparison" className="header__link">
            Pricing
          </a>
          <a href="/blog" className="header__link">
            Blog
          </a>
          <a href="/api/docs" className="header__link">
            API
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__text">
          © {new Date().getFullYear()} Token Calculator — Free LLM Token Counter
        </p>
        <div className="footer__links">
          <a href="/about" className="footer__link">About</a>
          <a href="/blog" className="footer__link">Blog</a>
          <a href="/api/docs" className="footer__link">API</a>
          <a href="/llms.txt" className="footer__link">llms.txt</a>
        </div>
      </div>
    </footer>
  );
}
