/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "Qu'est-ce qu'un token pour l'IA et les grands modèles de langage ?",
    answer:
      "Un token est l'unité de base de texte que les modèles d'IA tels que GPT-4o, Claude et Gemini traitent. Les tokens peuvent être des mots entiers, des fragments de mots ou même des caractères individuels. En anglais, 1 token équivaut à environ 4 caractères ou 0,75 mot. Le même texte peut produire des nombres de tokens différents selon le tokeniser du modèle — par exemple, GPT-4o utilise l'encodage o200k_base alors que les modèles plus anciens utilisent cl100k_base.",
  },
  {
    question: "Comment fonctionne ce calculateur de tokens ?",
    answer:
      "Ce calculateur utilise exactement la même bibliothèque de tokenisation que celle d'OpenAI et d'autres fournisseurs d'IA (tiktoken), s'exécutant entièrement dans votre navigateur via WebAssembly. Vos saisies sont converties en temps réel, sans aucun appel vers une API — votre texte ne quitte jamais votre appareil. Le nombre de tokens, de mots, de caractères et le coût estimé sont calculés instantanément.",
  },
  {
    question: "Pourquoi différents modèles d'IA donnent-ils des comptes de tokens différents ?",
    answer:
      "Chaque modèle d'IA utilise un tokeniser différent avec un vocabulaire différent. GPT-4o utilise o200k_base (vocabulaire de 200 000 tokens), tandis que GPT-3.5 utilise cl100k_base (100 000 tokens). Un vocabulaire plus large signifie généralement moins de tokens pour le même texte, ce qui affecte directement le coût. Claude et Gemini utilisent leurs propres tokenisers, donc exactement la même phrase peut avoir un coût différent d'un fournisseur à l'autre.",
  },
  {
    question: "Combien coûte l'utilisation de GPT-4o, Claude ou Gemini ?",
    answer:
      "Les prix varient considérablement. En mars 2026 : GPT-4o coûte 2,50 $ / 1M de tokens en entrée et 10 $ / 1M en sortie. Claude Sonnet 4.6 coûte 3 $ / 15 $ par million. Gemini 1.5 Pro coûte 1,25 $ / 5 $. Pour les budgets réduits, GPT-4o Mini (0,15 $ / 0,60 $) et DeepSeek V3 (0,27 $ / 1,10 $) sont les plus abordables.",
  },
  {
    question: "Comment puis-je réduire les coûts de mon API LLM ?",
    answer:
      "Les stratégies les plus efficaces sont : 1) Raccourcir le prompt système — il est envoyé à chaque requête. 2) Choisir le modèle approprié — utilisez GPT-4o Mini pour les tâches simples plutôt que GPT-4o. 3) Utilisez la mise en cache de prompt. 4) Demandes d'API par lots (Batch API). 5) Diffusez un contexte ciblé en tronquant les informations inutiles.",
  },
  {
    question: "Qu'est-ce qu'une fenêtre de contexte ?",
    answer:
      "Une fenêtre de contexte limite le nombre maximum de tokens qu'un modèle peut traiter en une seule demande (entrée + sortie combinées). GPT-4o a une fenêtre de 128K, Claude supporte 200K et Gemini 1.5 Pro peut aller jusqu'à 2 millions. Si votre document dépasse cette fenêtre, le modèle renverra une erreur et vous devrez découper la taille du texte.",
  },
  {
    question: "Mes données textuelles sont-elles en sécurité lors de l'utilisation de ce calculateur ?",
    answer:
      "Oui, absolument. Ce calculateur de tokens s'exécute entièrement côté client. Votre texte n'est ni collecté, ni enregistré, ni partagé avec aucun serveur. Aucune requête externe n'est effectuée. Tout le processus est contenu en local dans votre navigateur (vous pouvez le vérifier dans l'onglet réseau de vos outils de développement).",
  },
  {
    question: "Ce compteur de tokens est-il aussi précis que le tokeniser officiel d'OpenAI ?",
    answer:
      "Pour les modèles OpenAI (GPT-4o, GPT-4, GPT-3.5), ce calculateur est précis à 100 % car il utilise directement la bibliothèque 'tiktoken' en WebAssembly. Pour Claude, Gemini et DeepSeek, nous utilisons une approximation basée sur des encodages similaires — le comptage des tokens LLaMA / Claude via cette interface web reste informatif avec une variation estimée d'environ 5-15 % selon la langue du texte.",
  },
];

export default function FrenchFAQ() {
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
    <section className="faq-section" aria-label="Foire Aux Questions">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 className="faq-section__title" style={{ margin: 0 }}>❓ Questions Fréquentes</h2>
        <div style={{ position: 'relative', width: '280px', maxWidth: '100%' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, fontSize: '0.875rem' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Rechercher..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }} 
          />
        </div>
      </div>
      
      {filteredItems.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          Aucune question ne correspond à "{searchQuery}"
        </div>
      )}

      {filteredItems.map((item, index) => {
        return (
          <details key={index} className="simple-faq">
            <summary>{item.question}</summary>
            <div className="simple-faq-content">
              <div style={{ marginBottom: '1rem' }}>{item.answer}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-tertiary)', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-subtle)' }}>
                Cela a-t-il répondu à votre question ?
                <button className="btn btn--outline" style={{ padding: '0.2rem 0.4rem', fontSize: '0.6875rem' }}>👍 Oui</button>
                <button className="btn btn--outline" style={{ padding: '0.2rem 0.4rem', fontSize: '0.6875rem' }}>👎 Non</button>
              </div>
            </div>
          </details>
        );
      })}
    </section>
  );
}
