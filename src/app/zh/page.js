// Chinese Simplified locale — /zh
import LocalizedCalculator from "@/components/LocalizedCalculator";
import { CALCULATOR_LABELS } from "@/lib/calculatorLabels";
import FAQ from "@/components/FAQ";
import { FAQ_DATA } from "@/lib/faqData";
import { MODELS } from "@/lib/models";
import zhMessages from "../../../messages/zh.json";

const t = zhMessages;

export const metadata = {
  title: "Token计算器 — 免费GPT、Claude、Gemini LLM Token计数器",
  description:
    "免费Token计算器。实时统计GPT-4o、Claude、Gemini、DeepSeek、LLaMA的token数量并估算API成本。在浏览器中即时运行。",
  keywords: ["Token计算器", "LLM Token", "GPT Token计数器", "AI Token计算器", "API成本计算"],
  alternates: {
    canonical: "/zh",
    languages: { "x-default": "/", en: "/", de: "/de", fr: "/fr", es: "/es", ja: "/ja", "pt-BR": "/pt-br", ko: "/ko", zh: "/zh" },
  },
};

export default function ChinesePage() {
  const softwareSchema = {
    "@context": "https://schema.org", "@type": "SoftwareApplication",
    name: "Token计算器", applicationCategory: "DeveloperApplication", operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, inLanguage: "zh",
  };

  const models = MODELS.map((m) => ({
    id: m.id, name: m.name, encoding: m.encoding,
    inputPrice: m.inputPrice, outputPrice: m.outputPrice, color: m.color,
    contextFormatted: m.contextWindow >= 1_000_000 ? `${(m.contextWindow / 1_000_000).toFixed(1)}M` : `${(m.contextWindow / 1_000).toFixed(1)}K`,
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <section className="hero container">
        <h1 className="hero__title" style={{ fontSize: 'clamp(1.5rem, 4vw, 3.25rem)', lineHeight: 1.1, marginBottom: '0.75rem', letterSpacing: '-0.03em', whiteSpace: 'normal' }}>
          {t.hero.title} <span style={{ color: 'var(--accent)' }}>{t.hero.title_accent}</span>
          <span className="hero__cursor"></span>
        </h1>
        <p className="hero__subtitle" style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '0', lineHeight: 1.5 }}>
          {t.hero.subtitle_desktop}
        </p>
      </section>
      <LocalizedCalculator labels={CALCULATOR_LABELS.zh} />

      {/* Understanding Tokenization */}
      <section className="container" style={{ marginTop: '4rem', marginBottom: '4rem' }} aria-label={t.understanding.title}>
        <div style={{ maxWidth: '100%', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '12px', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {t.understanding.title} <span style={{ color: 'var(--accent)' }}>{t.understanding.title_accent}</span>
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '32px', maxWidth: '700px' }}>
            {t.understanding.intro}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                {t.understanding.bpe_title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{t.understanding.bpe_body}</p>
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                {t.understanding.context_title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{t.understanding.context_body}</p>
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                {t.understanding.cached_title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{t.understanding.cached_body}</p>
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                {t.understanding.io_title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{t.understanding.io_body}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <div className="card">
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1rem", display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>💰</span> {t.pricing_table.title} <span style={{ color: 'var(--accent)' }}>{t.pricing_table.title_accent}</span>
          </h2>
          <div className="pricing-table-desktop" style={{ overflowX: "auto" }}>
            <table className="conversion-table" style={{ minWidth: '700px' }}>
              <thead><tr><th>{t.pricing_table.model_col}</th><th>{t.pricing_table.provider_col}</th><th>{t.pricing_table.context_col}</th><th>{t.pricing_table.input_col}</th><th>{t.pricing_table.output_col}</th></tr></thead>
              <tbody>
                {[...MODELS].sort((a, b) => a.inputPrice - b.inputPrice).map((m) => (
                  <tr key={m.id}>
                    <td><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: m.color, display: "inline-block", marginRight: "0.5rem" }} /><strong>{m.name}</strong></td>
                    <td style={{ color: "var(--text-muted)" }}>{m.provider}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>{m.contextWindow >= 1_000_000 ? `${(m.contextWindow / 1_000_000).toFixed(m.contextWindow % 1_000_000 === 0 ? 0 : 1)}M` : `${(m.contextWindow / 1_000).toFixed(0)}K`}</td>
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
                    <span className="price-col-label">输入</span>
                    <span className={`price-col-val ${m.inputPrice <= 0.5 ? 'price-col-val--green' : ''}`}>${m.inputPrice.toFixed(m.inputPrice < 0.1 ? 3 : 2)}</span>
                    <span className="price-col-unit">/1M tokens</span>
                  </div>
                  <div className="price-col">
                    <span className="price-col-label">输出</span>
                    <span className="price-col-val">${m.outputPrice.toFixed(2)}</span>
                    <span className="price-col-unit">/1M tokens</span>
                  </div>
                  <div className="price-col">
                    <span className="price-col-label">上下文</span>
                    <span className="price-col-val">
                      {m.contextWindow >= 1_000_000 ? `${(m.contextWindow / 1_000_000).toFixed(m.contextWindow % 1_000_000 === 0 ? 0 : 1)}M` : `${(m.contextWindow / 1_000).toFixed(0)}K`}
                    </span>
                    <span className="price-col-unit">tokens</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 颜色图例 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem', padding: '0.75rem 1rem', background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-subtle)', borderRadius: '8px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)', marginRight: '0.25rem' }}>提供商：</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} /> OpenAI</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--amber)', display: 'inline-block' }} /> Anthropic</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--blue)', display: 'inline-block' }} /> Google</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--purple)', display: 'inline-block' }} /> DeepSeek</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--indigo)', display: 'inline-block' }} /> Meta</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EE6C4D', display: 'inline-block' }} /> Mistral</div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center', borderTop: '1px dashed var(--border-subtle)', paddingTop: '0.5rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>输入价格颜色：</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ color: 'var(--green)', fontWeight: 700 }}>$0.00</span> ≤ $0.50（经济型）</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>$1.00</span> 中等价位</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ color: 'var(--amber)', fontWeight: 700 }}>$5.00</span> ≥ $5.00（高端型）</div>
            </div>
          </div>
        </div>
      </section>
      <section className="how-it-works" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px', fontFamily: 'var(--font-display)' }}>{t.how_it_works.title} <span style={{ color: 'var(--accent)' }}>{t.how_it_works.title_accent}</span></h2>
        <div className="how-it-works__steps">
          <div className="step"><div className="step__number">01</div><div className="step__icon">📝</div><h3 className="step__title">{t.how_it_works.step1_title}</h3><p className="step__desc">{t.how_it_works.step1_desc}</p></div>
          <div className="step__connector">→</div>
          <div className="step"><div className="step__number">02</div><div className="step__icon">🤖</div><h3 className="step__title">{t.how_it_works.step2_title}</h3><p className="step__desc">{t.how_it_works.step2_desc}</p></div>
          <div className="step__connector">→</div>
          <div className="step"><div className="step__number">03</div><div className="step__icon">💰</div><h3 className="step__title">{t.how_it_works.step3_title}</h3><p className="step__desc">{t.how_it_works.step3_desc}</p></div>
        </div>
      </section>
      <section className="container" style={{ marginTop: "4rem", marginBottom: "4rem", padding: "0 1.5rem" }}>
        <article style={{ maxWidth: '100%', margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>{t.seo_content.title} <span style={{ color: 'var(--accent)' }}>{t.seo_content.title_accent}</span></h2>
          <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>{t.seo_content.p1}</p>
          <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>{t.seo_content.p2}</p>
        </article>
      </section>
      <FAQ items={FAQ_DATA.zh.items} labels={FAQ_DATA.zh.labels} />
    </>
  );
}
