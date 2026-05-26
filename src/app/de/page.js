import LocalizedCalculator from "@/components/LocalizedCalculator";
import { CALCULATOR_LABELS } from "@/lib/calculatorLabels";
import GermanFAQ from "@/components/GermanFAQ";
import { MODELS } from "@/lib/models";

export const metadata = {
  title: "Token Rechner — Kostenloser LLM-Token-Zähler für GPT, Claude & Gemini",
  description:
    "Kostenloser Token-Rechner für alle KI-Modelle. Zählen Sie Tokens, berechnen Sie API-Kosten und visualisieren Sie die Tokenisierung für GPT-4o, Claude, Gemini, DeepSeek und LLaMA — sofort in Ihrem Browser.",
  keywords: [
    "Token Rechner",
    "LLM Kosten Rechner",
    "GPT Token Zähler",
    "KI Token Rechner",
    "API Kosten berechnen",
  ],
  alternates: {
    canonical: "/de",
    languages: {
      "x-default": "/",
      en: "/",
      de: "/de",
      fr: "/fr",
      es: "/es",
      ja: "/ja",
      "pt-BR": "/pt-br",
      ko: "/ko",
      zh: "/zh",
    },
  },
};

export default function GermanPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Token Rechner",
    description: "Kostenloser Token-Rechner für alle großen KI-Modelle. GPT-4o, Claude, Gemini, DeepSeek und LLaMA.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    inLanguage: "de",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Deutsch", item: "/de" },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Wie man LLM API Kosten schätzt und Tokens zählt",
    description:
      "Ein einfacher Web-Prozess, um genau zu ermitteln, wie viele Tokens Ihr Text hat, komplett im Browser ausgeführt via lokaler WebAssembly.",
    step: [
      {
        "@type": "HowToStep",
        name: "Fügen Sie Ihren Text-Prompt ein",
        text: "Tippen oder fügen Sie Text in die Eingabefläche des Kalkulators ein. Der Text verlässt Ihr Gerät niemals.",
      },
      {
        "@type": "HowToStep",
        name: "Erkennen Sie die Tokenanzahl sofort",
        text: "Verfolgen Sie die Tokens, Wörter und Zeichen live auf den interaktiven Dashboards und Statistikkarten.",
      },
      {
        "@type": "HowToStep",
        name: "Wählen Sie Ihr Modell aus",
        text: "Wechseln Sie zwischen GPT-4o, Claude Sonnet, Gemini Pro, LLaMA oder DeepSeek, um zu sehen, wie der Tokenizer das Ergebnis verändert.",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <section className="hero container" aria-label="Einführung">
        <h1 className="hero__title" style={{ fontSize: 'clamp(1.5rem, 4vw, 3.25rem)', lineHeight: 1.1, marginBottom: '0.75rem', letterSpacing: '-0.03em', whiteSpace: 'normal' }}>
          Kostenloser LLM Token <span style={{ color: 'var(--accent)' }}>Rechner</span>
          <span className="hero__cursor"></span>
        </h1>

        <p className="hero__subtitle" style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '0', lineHeight: 1.5 }}>
          Tokens zählen und API-Kosten berechnen für GPT-4o, Claude, Gemini, DeepSeek & LLaMA — sofort, privat, in Ihrem Browser.
        </p>
      </section>

      <LocalizedCalculator labels={CALCULATOR_LABELS.de} />

      {/* Pricing Section */}
      <section className="container" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <div className="card">
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1rem", display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>💰</span> API-Preise pro <span style={{ color: 'var(--accent)' }}>1M Tokens</span>
          </h2>
          {/* Desktop table view */}
          <div className="pricing-table-desktop" style={{ overflowX: "auto" }}>
            <table className="conversion-table" style={{ minWidth: '700px' }}>
              <thead>
                <tr>
                  <th>Modell</th>
                  <th>Anbieter</th>
                  <th>Kontext</th>
                  <th>Input / 1M</th>
                  <th>Output / 1M</th>
                </tr>
              </thead>
              <tbody>
                {[...MODELS].sort((a, b) => a.inputPrice - b.inputPrice).map((m) => (
                  <tr key={m.id}>
                    <td>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: m.color, display: "inline-block", marginRight: "0.5rem" }} />
                      <strong>{m.name}</strong>
                    </td>
                    <td style={{ color: "var(--text-muted)" }}>{m.provider}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
                      {m.contextWindow >= 1_000_000 ? `${(m.contextWindow / 1_000_000).toFixed(m.contextWindow % 1_000_000 === 0 ? 0 : 1)}M` : `${(m.contextWindow / 1_000).toFixed(0)}K`}
                    </td>
                    <td style={{ fontFamily: "var(--font-mono)", color: m.inputPrice <= 0.5 ? "var(--green)" : m.inputPrice >= 5 ? "var(--amber)" : "var(--text-secondary)" }}>${m.inputPrice.toFixed(m.inputPrice < 0.1 ? 3 : 2)}</td>
                    <td style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>${m.outputPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile card layout */}
          <div className="pricing-cards-mobile">
            {[...MODELS].sort((a, b) => a.inputPrice - b.inputPrice).map((m) => (
              <div key={m.id} className="price-card-m">
                <div className="price-card-m__header">
                  <span className="price-dot" style={{ background: m.color }} />
                  <span className="price-model-name">{m.name}</span>
                  <span className="price-provider-tag">{m.provider}</span>
                </div>
                <div className="price-card-m__cols">
                  <div className="price-col">
                    <span className="price-col-label">Input</span>
                    <span className={`price-col-val ${m.inputPrice <= 0.5 ? 'price-col-val--green' : ''}`}>${m.inputPrice.toFixed(m.inputPrice < 0.1 ? 3 : 2)}</span>
                    <span className="price-col-unit">/1M tokens</span>
                  </div>
                  <div className="price-col">
                    <span className="price-col-label">Output</span>
                    <span className="price-col-val">${m.outputPrice.toFixed(2)}</span>
                    <span className="price-col-unit">/1M tokens</span>
                  </div>
                  <div className="price-col">
                    <span className="price-col-label">Kontext</span>
                    <span className="price-col-val">
                      {m.contextWindow >= 1_000_000 ? `${(m.contextWindow / 1_000_000).toFixed(m.contextWindow % 1_000_000 === 0 ? 0 : 1)}M` : `${(m.contextWindow / 1_000).toFixed(0)}K`}
                    </span>
                    <span className="price-col-unit">tokens</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Farblegende */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem', padding: '0.75rem 1rem', background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-subtle)', borderRadius: '8px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)', marginRight: '0.25rem' }}>Anbieter:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} /> OpenAI</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--amber)', display: 'inline-block' }} /> Anthropic</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--blue)', display: 'inline-block' }} /> Google</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--purple)', display: 'inline-block' }} /> DeepSeek</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--indigo)', display: 'inline-block' }} /> Meta</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EE6C4D', display: 'inline-block' }} /> Mistral</div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center', borderTop: '1px dashed var(--border-subtle)', paddingTop: '0.5rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Preisgruppen (Input):</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ color: 'var(--green)', fontWeight: 700 }}>$0.00</span> ≤ $0.50 (Günstig)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>$1.00</span> Mittelklasse</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ color: 'var(--amber)', fontWeight: 700 }}>$5.00</span> ≥ $5.00 (Premium)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenisierung verstehen */}
      <section className="container" style={{ marginTop: '4rem', marginBottom: '4rem' }} aria-label="Tokenisierung verstehen">
        <div style={{ maxWidth: '100%', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '12px', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            Tokenisierung <span style={{ color: 'var(--accent)' }}>verstehen</span>
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '32px', maxWidth: '700px' }}>
            Dieses Tool fungiert als <strong>universeller Tokenizer</strong> für OpenAI, Anthropic und Google Modelle. Wir verwenden offizielle Tiktoken-Bibliotheken und modellspezifische Tokenizer für 99% Genauigkeit bei der Token-Zählung.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '1.5rem' }}>
            {/* Card 1 */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                Was ist BPE (Byte-Pair Encoding)?
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                BPE ist der Tokenisierungs-Algorithmus, der von GPT-Modellen verwendet wird. Er zerlegt Text in Unterworteinheiten, indem er iterativ die häufigsten Zeichenpaare zusammenführt. Dies ermöglicht es Modellen, seltene Wörter effizient zu handhaben, während die Vokabulargröße überschaubar bleibt.
              </p>
            </div>
            {/* Card 2 */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
                Was ist ein Kontextfenster?
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Das Kontextfenster ist die maximale Anzahl an Tokens, die ein LLM in einer einzigen Anfrage verarbeiten kann (Eingabe + Ausgabe kombiniert). GPT-4o bietet 128K Tokens, Claude 3.5 bietet 200K Tokens und Gemini 1.5 Pro unterstützt bis zu 2M Tokens. Das Überschreiten dieses Limits führt zu Kürzungen oder Fehlern.
              </p>
            </div>
            {/* Card 3 */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                Was ist Cached Input Pricing?
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Gecachte Eingabepreise bieten erhebliche Rabatte (bis zu 90%), wenn Sie dasselbe Prompt-Präfix über mehrere API-Aufrufe hinweg wiederverwenden. Dies ist ideal für System-Prompts, Few-Shot-Beispiele oder Dokumentenanalysen.
              </p>
            </div>
            {/* Card 4 */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                Eingabe- vs. Ausgabetoken-Kosten
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Ausgabetokens sind typischerweise 2-4x teurer als Eingabetokens, da sie eine sequenzielle Generierung durch das Modell erfordern. Um Kosten zu optimieren, entwerfen Sie Prompts, die präzise Antworten liefern, und nutzen Sie Längenbegrenzungen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wort-zu-Token Umrechnungstabelle */}
      <section className="container" style={{ marginTop: '4rem', marginBottom: '4rem' }} aria-label="Wort-zu-Token Umrechnungstabelle">
        <div style={{ maxWidth: '100%', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px', fontFamily: 'var(--font-display)' }}>
            Wort-zu-Token <span style={{ color: 'var(--accent)' }}>Umrechnungstabelle</span>
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', lineHeight: 1.6, marginBottom: '24px', maxWidth: '560px' }}>
            Die Token-Anzahl variiert stark je nach Inhaltstyp und Sprache. Nutzen Sie diese Referenz zur Abschätzung.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Inhaltstyp</th>
                  <th>Beispiel</th>
                  <th>Verhältnis</th>
                  <th>1000 Wörter ≈</th>
                  <th>Hinweise</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Englischer Text</strong></td>
                  <td><code>Hello world</code></td>
                  <td>~1,3 Tokens/Wort</td>
                  <td>~1.300-1.500</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>Standardprosa ca. 1,3 Tokens pro Wort</td>
                </tr>
                <tr>
                  <td><strong>Deutscher Text</strong></td>
                  <td><code>Hallo Welt</code></td>
                  <td>~1,5-2 Tokens/Wort</td>
                  <td>~1.500-2.000</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>Zusammengesetzte Wörter erhöhen die Tokens</td>
                </tr>
                <tr>
                  <td><strong>Code (Python/JS)</strong></td>
                  <td><code>def func():</code></td>
                  <td>~2-3 Tokens/Wort</td>
                  <td>~2.000-3.000</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>Symbole und Syntax erhöhen die Token-Anzahl</td>
                </tr>
                <tr>
                  <td><strong>Chinesisch/Japanisch</strong></td>
                  <td><code>你好世界</code></td>
                  <td>~2+ Tokens/Zeichen</td>
                  <td>~2.000+</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>CJK-Zeichen werden in mehrere Tokens aufgeteilt</td>
                </tr>
                <tr>
                  <td><strong>JSON/XML-Daten</strong></td>
                  <td><code>{`{"key":"value"}`}</code></td>
                  <td>~3-4 Tokens/Wort</td>
                  <td>~3.000-4.000</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>Strukturzeichen verursachen Overhead</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* So funktioniert es */}
      <section className="how-it-works" style={{ marginTop: '4rem', marginBottom: '4rem' }} aria-label="So funktioniert es">
        <h2 style={{ textAlign: 'center', fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px', fontFamily: 'var(--font-display)' }}>So funktioniert <span style={{ color: 'var(--accent)' }}>es</span></h2>
        <div className="how-it-works__steps">
          <div className="step">
            <div className="step__number">01</div>
            <div className="step__icon">📝</div>
            <h3 className="step__title">Text einfügen</h3>
            <p className="step__desc">Tippen oder fügen Sie Text ein — System-Prompt, Nachricht oder Konversation. Der Rechner tokenisiert in Echtzeit.</p>
          </div>
          <div className="step__connector">→</div>
          <div className="step">
            <div className="step__number">02</div>
            <div className="step__icon">🤖</div>
            <h3 className="step__title">Modell auswählen</h3>
            <p className="step__desc">Wählen Sie GPT-4o, Claude, Gemini, DeepSeek und 20+ Modelle. Derselbe Text kann bei verschiedenen Modellen 2× mehr kosten.</p>
          </div>
          <div className="step__connector">→</div>
          <div className="step">
            <div className="step__number">03</div>
            <div className="step__icon">💰</div>
            <h3 className="step__title">Tokens + Kosten</h3>
            <p className="step__desc">Sofort Token-Anzahl, API-Kosten und Kontextfenster-Auslastung sehen. Keine Anmeldung erforderlich.</p>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="container" style={{ marginTop: "4rem", marginBottom: "4rem", padding: "0 1.5rem" }}>
        <article style={{ maxWidth: '100%', margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>
            Wie funktioniert das Zählen von <span style={{ color: 'var(--accent)' }}>KI-Tokens?</span>
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>
            Ein <strong>Token</strong> ist die kleinste Einheit, die KI-Modelle wie GPT-4o, Claude und Gemini verarbeiten. Anstatt Text wie Menschen zu lesen, zerlegen KI-Modelle Text in Tokens — das können ganze Wörter, Wortteile oder einzelne Zeichen sein.
          </p>
          <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>
            Das ist wichtig, weil <strong>API-Preise auf der Token-Anzahl basieren</strong>, nicht auf der Wortanzahl. Unser Token Rechner verwendet die gleiche <strong>tiktoken</strong>-Bibliothek, die OpenAI intern nutzt — vollständig in Ihrem Browser über WebAssembly.
          </p>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem", marginTop: "1.5rem" }}>
            <span style={{ color: 'var(--accent)' }}>Datenschutz</span>
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Die gesamte Tokenisierung findet in Ihrem Browser statt. Es wird niemals Text an einen Server gesendet. Keine Cookies, keine Analysen.
          </p>
        </article>
      </section>

      <GermanFAQ />
    </>
  );
}
