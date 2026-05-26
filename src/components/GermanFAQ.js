/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "Was ist ein Token in KI und großen Sprachmodellen?",
    answer:
      "Ein Token ist die grundlegende Texteinheit, die KI-Modelle wie GPT-4o, Claude und Gemini verarbeiten. Tokens können ganze Wörter, Teile von Wörtern oder gar einzelne Zeichen sein. Im Englischen entspricht 1 Token etwa 4 Zeichen oder 0,75 Wörtern. Derselbe Text kann je nach Tokenizer des Modells unterschiedliche Mengen an Tokens erzeugen — GPT-4o verwendet z. B. cl100k_base und o200k_base.",
  },
  {
    question: "Wie funktioniert dieser Token-Rechner?",
    answer:
      "Dieser Rechner nutzt dieselben Tokenisierungs-Bibliotheken wie OpenAI und andere KI-Anbieter (tiktoken) und läuft via WebAssembly vollständig in Ihrem Browser. Wenn Sie Text eingeben oder einfügen, wird er in Echtzeit ohne API-Aufrufe tokenisiert — der Text verlässt Ihr Gerät nie. Tokenanzahl, Wörter, Zeichen und geschätzte Kosten werden sofort berechnet.",
  },
  {
    question: "Warum berechnen verschiedene KI-Modelle unterschiedliche Token-Anzahlen?",
    answer:
      "Jedes KI-Modell verwendet einen anderen Tokenizer mit individuellem Vokabular. GPT-4o nutzt o200k_base (200.000 Tokens im Lexikon), GPT-3.5 cl100k_base (100.000 Tokens). Ein größeres Vokabular bedeutet meist weniger Tokens für denselben Text. Claude und Gemini haben eigene Systeme, weshalb derselbe Text bei verschiedenen Anbietern oft leicht abweichende Kosten verursacht.",
  },
  {
    question: "Wie viel kostet die Nutzung von GPT-4o, Claude oder Gemini?",
    answer:
      "Die Preise variieren stark. Stand März 2026: GPT-4o kostet 2,50 $ für 1M Input-Tokens und 10 $ für 1M Output-Tokens. Claude Sonnet 4.6 liegt bei 3 $ Input / 15 $ Output pro Million. Gemini 1.5 Pro kostet 1,25 $ / 5 $. Preiswertere Varianten sind GPT-4o Mini (0,15 $ / 0,60 $) und DeepSeek V3 (0,27 $ / 1,10 $).",
  },
  {
    question: "Wie kann ich meine LLM-API-Kosten senken?",
    answer:
      "Die wirksamsten Strategien sind: 1) Kürzere Systemprompts verwenden — sie werden bei jeder Anfrage gesendet. 2) Das passende Modell wählen — GPT-4o Mini für einfache Aufgaben statt GPT-4o. 3) Prompt-Caching nutzen. 4) API-Anfragen im Batch (Stapelverarbeitung) senden, um Mengenrabatte zu erhalten. 5) Unnötigen Kontext kürzen.",
  },
  {
    question: "Was ist ein Kontextfenster und warum ist es wichtig?",
    answer:
      "Das Kontextfenster (Context Window) bestimmt die maximale Anzahl an Tokens, die ein Modell in einer Anfrage verarbeiten kann (Eingabe + Ausgabe kombiniert). GPT-4o bietet 128K, Claude 200K und Gemini 1.5 Pro bis zu 2 Millionen Tokens. Bei Erreichen dieses Limits meldet die API einen Fehler. Sie müssen in dem Fall Text kürzen oder ein RAG-System verwenden.",
  },
  {
    question: "Sind meine Textdaten sicher, wenn ich diesen Rechner benutze?",
    answer:
      "Ja, absolut. Dieser Token-Rechner wird komplett in Ihrem Browser ausgeführt (via WebAssembly). Ihr Text wird weder auf Server geladen noch in APIs eingespeist — alle Tokenisierungsarbeiten verbleiben lokal auf dem Gerät. Wir sammeln weder Daten noch verwenden wir Tracking-Cookies für Ihre Textinhalte.",
  },
  {
    question: "Wie genau ist dieser Token-Rechner im Vergleich zur offiziellen OpenAI-API?",
    answer:
      "Für OpenAI-Modelle (GPT-4o, GPT-4, GPT-3.5) verwendet dieses Tool 1:1 die tiktoken-Bibliothek von OpenAI; das Ergebnis ist also 100 % passgenau. Die Angaben für LLaMA, Claude, DeepSeek und Gemini basieren hingegen auf etablierten Näherungswerten gleichartiger Codierstandards (die Fehlertoleranz dort liegt bei maximal 5–15 %).",
  },
];

export default function GermanFAQ() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = FAQ_ITEMS.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="faq-section" aria-label="Häufig Gestellte Fragen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 className="faq-section__title" style={{ margin: 0 }}>❓ Häufige Fragen</h2>
        <div style={{ position: 'relative', width: '280px', maxWidth: '100%' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, fontSize: '0.875rem' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Suchen..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }} 
          />
        </div>
      </div>
      
      {filteredItems.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          Keine Fragen gefunden, die mit "{searchQuery}" übereinstimmen
        </div>
      )}

      {filteredItems.map((item, index) => {
        return (
          <details key={index} className="simple-faq">
            <summary>{item.question}</summary>
            <div className="simple-faq-content">
              <div style={{ marginBottom: '1rem' }}>{item.answer}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-tertiary)', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-subtle)' }}>
                Hat das Ihre Frage beantwortet?
                <button className="btn btn--outline" style={{ padding: '0.2rem 0.4rem', fontSize: '0.6875rem' }}>👍 Ja</button>
                <button className="btn btn--outline" style={{ padding: '0.2rem 0.4rem', fontSize: '0.6875rem' }}>👎 Nein</button>
              </div>
            </div>
          </details>
        );
      })}
    </section>
  );
}
