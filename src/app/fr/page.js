import LocalizedCalculator from "@/components/LocalizedCalculator";
import { CALCULATOR_LABELS } from "@/lib/calculatorLabels";
import FrenchFAQ from "@/components/FrenchFAQ";
import { MODELS } from "@/lib/models";

export const metadata = {
  title: "Calculateur de Tokens — Compteur de Tokens IA Gratuit pour GPT, Claude & Gemini",
  description:
    "Calculateur de tokens gratuit pour tous les modèles IA. Comptez les tokens, estimez les coûts API et visualisez la tokenisation pour GPT-4o, Claude, Gemini, DeepSeek et LLaMA — instantanément dans votre navigateur.",
  keywords: [
    "calculateur de tokens",
    "compteur de tokens IA",
    "token calculator GPT français",
    "coût API LLM",
  ],
  alternates: {
    canonical: "/fr",
    languages: {
      "en": "/",
      "de": "/de",
      "fr": "/fr",
    },
  },
};

export default function FrenchPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Calculateur de Tokens",
    description: "Calculateur de tokens gratuit pour tous les grands modèles IA. GPT-4o, Claude, Gemini, DeepSeek et LLaMA.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    inLanguage: "fr",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Français", item: "/fr" },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Comment estimer les coûts de l'API LLM et compter les tokens",
    description:
      "Un processus en ligne simple pour découvrir précisément le nombre de tokens de votre texte ou prompt, le tout dans le navigateur de manière sécurisée en WebAssembly local.",
    step: [
      {
        "@type": "HowToStep",
        name: "Collez votre prompt texte",
        text: "Saisissez ou collez tout texte destiné à un LLM dans la vue du calculateur. Le texte ne quitte pas votre machine.",
      },
      {
        "@type": "HowToStep",
        name: "Voyez le nombre de tokens instantanément",
        text: "Regardez les tokens, les mots et les caractères s'afficher en temps réel sur les tableaux de bord interactifs.",
      },
      {
        "@type": "HowToStep",
        name: "Sélectionnez votre modèle",
        text: "Basculez entre GPT-4o, Claude Sonnet, Gemini Pro, LLaMA ou DeepSeek pour voir comment le changement de tokeniser modifie le résultat.",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <section className="hero container" aria-label="Introduction">
        <h1 className="hero__title" style={{ fontSize: 'clamp(1.5rem, 4vw, 3.25rem)', lineHeight: 1.1, marginBottom: '0.75rem', letterSpacing: '-0.03em', whiteSpace: 'normal' }}>
          Calculateur de Tokens <span style={{ color: 'var(--accent)' }}>Gratuit</span>
          <span className="hero__cursor"></span>
        </h1>

        <p className="hero__subtitle" style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '0', lineHeight: 1.5 }}>
          Comptez les tokens et estimez les coûts API pour GPT-4o, Claude, Gemini, DeepSeek & LLaMA — instantanément, en privé, dans votre navigateur.
        </p>
      </section>

      <LocalizedCalculator labels={CALCULATOR_LABELS.fr} />

      {/* Pricing Table */}
      <section className="container" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <div className="card">
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1rem", display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>💰</span> Prix API par <span style={{ color: 'var(--accent)' }}>1M de Tokens</span>
          </h2>
          {/* Desktop table view */}
          <div className="pricing-table-desktop" style={{ overflowX: "auto" }}>
            <table className="conversion-table" style={{ minWidth: '700px' }}>
              <thead>
                <tr>
                  <th>Modèle</th>
                  <th>Fournisseur</th>
                  <th>Contexte</th>
                  <th>Entrée / 1M</th>
                  <th>Sortie / 1M</th>
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
                    <span className="price-col-label">Entrée</span>
                    <span className={`price-col-val ${m.inputPrice <= 0.5 ? 'price-col-val--green' : ''}`}>${m.inputPrice.toFixed(m.inputPrice < 0.1 ? 3 : 2)}</span>
                    <span className="price-col-unit">/1M tokens</span>
                  </div>
                  <div className="price-col">
                    <span className="price-col-label">Sortie</span>
                    <span className="price-col-val">${m.outputPrice.toFixed(2)}</span>
                    <span className="price-col-unit">/1M tokens</span>
                  </div>
                  <div className="price-col">
                    <span className="price-col-label">Contexte</span>
                    <span className="price-col-val">
                      {m.contextWindow >= 1_000_000 ? `${(m.contextWindow / 1_000_000).toFixed(m.contextWindow % 1_000_000 === 0 ? 0 : 1)}M` : `${(m.contextWindow / 1_000).toFixed(0)}K`}
                    </span>
                    <span className="price-col-unit">tokens</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Légende des couleurs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem', padding: '0.75rem 1rem', background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-subtle)', borderRadius: '8px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)', marginRight: '0.25rem' }}>Fournisseurs :</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} /> OpenAI</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--amber)', display: 'inline-block' }} /> Anthropic</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--blue)', display: 'inline-block' }} /> Google</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--purple)', display: 'inline-block' }} /> DeepSeek</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--indigo)', display: 'inline-block' }} /> Meta</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EE6C4D', display: 'inline-block' }} /> Mistral</div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center', borderTop: '1px dashed var(--border-subtle)', paddingTop: '0.5rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Couleur du prix (Entrée) :</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ color: 'var(--green)', fontWeight: 700 }}>$0.00</span> ≤ $0.50 (Budget)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>$1.00</span> Milieu de gamme</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ color: 'var(--amber)', fontWeight: 700 }}>$5.00</span> ≥ $5.00 (Premium)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprendre la Tokenisation */}
      <section className="container" style={{ marginTop: '4rem', marginBottom: '4rem' }} aria-label="Comprendre la Tokenisation">
        <div style={{ maxWidth: '100%', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '12px', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            Comprendre la <span style={{ color: 'var(--accent)' }}>Tokenisation</span>
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '32px', maxWidth: '700px' }}>
            Cet outil fonctionne comme un <strong>tokenizer universel</strong> pour les modèles OpenAI, Anthropic et Google. Nous utilisons les bibliothèques officielles Tiktoken et des tokenizers spécifiques pour une précision de 99 % dans le comptage.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '1.5rem' }}>
            {/* Card 1 */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                Qu&apos;est-ce que le BPE (Byte-Pair Encoding) ?
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Le BPE est l&apos;algorithme de tokenisation utilisé par les modèles GPT. Il décompose le texte en sous-mots en fusionnant itérativement les paires de caractères les plus fréquentes. Cela permet aux modèles de traiter efficacement les mots rares tout en gardant une taille de vocabulaire gérable.
              </p>
            </div>
            {/* Card 2 */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                Qu&apos;est-ce qu&apos;une Fenêtre de Contexte ?
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                La fenêtre de contexte est le nombre maximum de tokens qu&apos;un LLM peut traiter en une seule requête (entrée + sortie combinées). GPT-4o offre 128K tokens, Claude 3.5 offre 200K tokens, et Gemini 1.5 Pro prend en charge jusqu&apos;à 2M tokens. Dépasser cette limite entraînera une troncature ou des erreurs.
              </p>
            </div>
            {/* Card 3 */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                Qu&apos;est-ce que la Tarification des Entrées en Cache ?
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                La tarification des entrées en cache offre des réductions importantes (jusqu&apos;à 90 %) lorsque vous réutilisez le même préfixe de prompt sur plusieurs appels d&apos;API. C&apos;est idéal pour les prompts système, les exemples few-shot ou l&apos;analyse de documents.
              </p>
            </div>
            {/* Card 4 */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                Coûts des Tokens : Entrée vs Sortie
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Les tokens de sortie sont généralement 2 à 4 fois plus chers que les tokens d&apos;entrée car ils nécessitent que le modèle effectue une génération séquentielle. Pour optimiser les coûts, concevez des prompts qui obtiennent des réponses concises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guide de conversion mot-en-token */}
      <section className="container" style={{ marginTop: '4rem', marginBottom: '4rem' }} aria-label="Guide de conversion mot-en-token">
        <div style={{ maxWidth: '100%', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px', fontFamily: 'var(--font-display)' }}>
            Guide de Conversion <span style={{ color: 'var(--accent)' }}>Mot-en-Token</span>
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', lineHeight: 1.6, marginBottom: '24px', maxWidth: '560px' }}>
            Le nombre de tokens varie considérablement selon le type de contenu et la langue. Utilisez cette référence pour estimer votre consommation.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Type de contenu</th>
                  <th>Exemple</th>
                  <th>Ratio</th>
                  <th>1000 Mots ≈</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Texte anglais</strong></td>
                  <td><code>Hello world</code></td>
                  <td>~1,3 tokens/mot</td>
                  <td>~1 300-1 500</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>La prose standard moyenne 1,3 tokens par mot</td>
                </tr>
                <tr>
                  <td><strong>Texte français</strong></td>
                  <td><code>Bonjour le monde</code></td>
                  <td>~1,4-1,7 tokens/mot</td>
                  <td>~1 400-1 700</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>Les accents et conjugaisons augmentent les tokens</td>
                </tr>
                <tr>
                  <td><strong>Code (Python/JS)</strong></td>
                  <td><code>def func():</code></td>
                  <td>~2-3 tokens/mot</td>
                  <td>~2 000-3 000</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>Symboles et syntaxe augmentent le nombre de tokens</td>
                </tr>
                <tr>
                  <td><strong>Chinois/Japonais</strong></td>
                  <td><code>你好世界</code></td>
                  <td>~2+ tokens/car.</td>
                  <td>~2 000+</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>Les caractères CJK sont souvent divisés en plusieurs tokens</td>
                </tr>
                <tr>
                  <td><strong>Données JSON/XML</strong></td>
                  <td><code>{`{"key":"value"}`}</code></td>
                  <td>~3-4 tokens/mot</td>
                  <td>~3 000-4 000</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>Les caractères structurels ajoutent un surcoût important</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="how-it-works" style={{ marginTop: '4rem', marginBottom: '4rem' }} aria-label="Comment ça marche">
        <h2 style={{ textAlign: 'center', fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px', fontFamily: 'var(--font-display)' }}>Comment ça <span style={{ color: 'var(--accent)' }}>marche</span></h2>
        <div className="how-it-works__steps">
          <div className="step">
            <div className="step__number">01</div>
            <div className="step__icon">📝</div>
            <h3 className="step__title">Collez votre texte</h3>
            <p className="step__desc">Tapez ou collez du texte — prompt système, message utilisateur ou conversation complète. Le calculateur tokenise en temps réel.</p>
          </div>
          <div className="step__connector">→</div>
          <div className="step">
            <div className="step__number">02</div>
            <div className="step__icon">🤖</div>
            <h3 className="step__title">Choisissez le modèle</h3>
            <p className="step__desc">Choisissez parmi GPT-4o, Claude, Gemini, DeepSeek et 20+ modèles. Le même texte peut coûter 2× plus cher selon le modèle.</p>
          </div>
          <div className="step__connector">→</div>
          <div className="step">
            <div className="step__number">03</div>
            <div className="step__icon">💰</div>
            <h3 className="step__title">Tokens + coût</h3>
            <p className="step__desc">Voyez instantanément le nombre de tokens, le coût API estimé et la proximité de la limite de contexte. Sans inscription.</p>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="container" style={{ marginTop: "4rem", marginBottom: "4rem", padding: "0 1.5rem" }}>
        <article style={{ maxWidth: '100%', margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>
            Comment fonctionne le comptage des tokens <span style={{ color: 'var(--accent)' }}>d&apos;IA ?</span>
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>
            Un <strong>token</strong> est la plus petite unité de texte que les modèles d&apos;IA comme GPT-4o, Claude et Gemini traitent. Les modèles découpent le texte en tokens — mots entiers, fragments de mots ou caractères individuels.
          </p>
          <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>
            C&apos;est important car <strong>la tarification des API est basée sur le nombre de tokens</strong>, pas sur le nombre de mots. Notre calculateur utilise la même bibliothèque <strong>tiktoken</strong> qu&apos;OpenAI — entièrement dans votre navigateur via WebAssembly.
          </p>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem", marginTop: "1.5rem" }}>
            <span style={{ color: 'var(--accent)' }}>Confidentialité</span>
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Toute la tokenisation se fait dans votre navigateur. Aucun texte n&apos;est envoyé à un serveur. Pas de cookies, pas d&apos;analytique.
          </p>
        </article>
      </section>

      <FrenchFAQ />
    </>
  );
}
