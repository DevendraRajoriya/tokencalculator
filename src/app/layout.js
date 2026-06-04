import "./globals.css";
import Header from "@/components/Header";
import BackToTop from "@/components/BackToTop";
export const metadata = {
  metadataBase: new URL("https://www.tokencalculator.app"),
  title: "Token Calculator — Free LLM Token Counter for GPT-5, Claude & Gemini",
  description:
    "Free real-time token calculator for GPT-5.5, GPT-5.4, Claude Opus 4.8, Gemini 3.5, Llama 4, DeepSeek, Grok & 50+ AI models. Count tokens, estimate API costs, visualize tokenization. 100% private — runs in your browser.",
  keywords: [
    "token calculator",
    "llm token calculator",
    "chatgpt token calculator",
    "openai token calculator",
    "openai tokenizer",
    "tiktoken calculator",
    "tiktoken calculator online",
    "gpt token counter",
    "gpt-5 token calculator",
    "claude token calculator",
    "gemini token calculator",
    "llama token calculator",
    "deepseek token counter",
    "grok token calculator",
    "ai api cost calculator",
    "openai api cost estimator",
    "token counter online",
    "prompt token estimator",
    "free llm token counter",
    "how many tokens in my text",
    "count tokens openai",
    "token count gpt4",
    "token visualizer",
    "context window calculator",
    "llm cost calculator",
    "ai token cost estimator",
    "byte pair encoding tokenizer",
    "bpe tokenizer online",
    "openai tokenizer alternative",
    "anthropic claude tokenizer",
    "token calculator for developers",
    "llm pricing comparison",
    "chatgpt api pricing calculator",
    "claude api cost",
    "gemini api pricing",
    "token to word converter",
  ],
  authors: [{ name: "Token Calculator", url: "https://www.tokencalculator.app" }],
  creator: "Token Calculator",
  publisher: "Token Calculator",
  category: "Developer Tools",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
  openGraph: {
    title: "Token Calculator — Free LLM Token Counter for GPT-5, Claude & Gemini",
    description:
      "Free real-time token calculator for GPT-5.5, Claude Opus 4.8, Gemini 3.5 & 50+ AI models. Count tokens, estimate API costs, visualize tokenization. 100% private.",
    url: "https://www.tokencalculator.app",
    type: "website",
    locale: "en_US",
    siteName: "Token Calculator",
    images: [
      {
        url: "https://www.tokencalculator.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Token Calculator - Free LLM Token Counter for GPT, Claude, Gemini",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Token Calculator — Free LLM Token Counter",
    description:
      "Count tokens for GPT-5.5, Claude Opus 4.8, Gemini 3.5 & 50+ AI models. Free, instant, private.",
    images: ["https://www.tokencalculator.app/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.tokencalculator.app",
    languages: {
      "x-default": "https://www.tokencalculator.app",
      en: "https://www.tokencalculator.app",
      de: "https://www.tokencalculator.app/de",
      fr: "https://www.tokencalculator.app/fr",
      es: "https://www.tokencalculator.app/es",
      ja: "https://www.tokencalculator.app/ja",
      ko: "https://www.tokencalculator.app/ko",
      zh: "https://www.tokencalculator.app/zh",
      "pt-BR": "https://www.tokencalculator.app/pt-br",
    },
  },
  other: {
    "llms-txt": "https://www.tokencalculator.app/llms.txt",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Token Calculator",
      url: "https://www.tokencalculator.app",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "312",
        bestRating: "5",
      },
      description:
        "Free real-time token calculator for GPT-5.5, Claude Opus 4.8, Gemini 3.5 Pro and 50+ AI models. Count tokens, estimate API costs, and visualize tokenization. 100% private — runs in your browser.",
      featureList: [
        "Real-time token counting for 50+ LLM models",
        "Token visualization with color-coded chips",
        "Input/Output cost estimation with ratio slider",
        "Context window usage progress bar",
        "Monthly cost projector",
        "Quick-load developer presets",
        "File upload support (PDF, CSV, TXT)",
        "100% client-side — no data collection",
        "Multilingual support (EN, DE, FR, ES, JA, KO, ZH, PT)",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Token Calculator",
      url: "https://www.tokencalculator.app",
      logo: "https://www.tokencalculator.app/icon.png",
      sameAs: [
        "https://www.tokencalculator.app",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Token Calculator",
          item: "https://www.tokencalculator.app",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How many tokens is 1000 words?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Approximately 1,300 to 1,500 tokens for standard English prose. The exact count depends on the model and content type — code and structured data produce more tokens per word.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between tokens and words in AI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tokens are subword units used by AI language models. One word can be 1–3 tokens. Common short words like 'the' are one token; longer or rarer words are split into multiple tokens. On average, 1 English word ≈ 1.3 tokens.",
          },
        },
        {
          "@type": "Question",
          name: "How do I count tokens for ChatGPT?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Paste your text into Token Calculator at tokencalculator.app, select GPT-4o or GPT-5 from the model dropdown, and the token count updates in real time. The tool uses the same tiktoken library as OpenAI.",
          },
        },
        {
          "@type": "Question",
          name: "Why are output tokens more expensive than input tokens?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Output tokens require the model to generate each token sequentially through autoregressive inference, which is computationally more intensive than reading input tokens in parallel. This is why output tokens typically cost 3–6x more per token.",
          },
        },
        {
          "@type": "Question",
          name: "What is a context window in LLMs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A context window is the maximum number of tokens an LLM can process in a single API call (input + output combined). GPT-4.1 supports 1M tokens, Gemini 3.1 Pro supports 2M tokens, and Llama 4 Scout supports 10M tokens.",
          },
        },
      ],
    },
  ];

  return (
    <html lang="en">
      <body>
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icon.png"
              alt="Token Calculator logo"
              width={36}
              height={36}
              style={{ borderRadius: '8px', display: 'block', flexShrink: 0 }}
            />
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
