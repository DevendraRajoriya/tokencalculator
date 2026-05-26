// Translated FAQ items and labels for all supported locales

export const FAQ_DATA = {
  es: {
    labels: {
      title: "❓ Preguntas Frecuentes",
      searchPlaceholder: "Buscar preguntas...",
      noResults: "No se encontraron preguntas para",
      didThisHelp: "¿Respondió esto tu pregunta?",
      yes: "👍 Sí",
      no: "👎 No",
      ctaText: "¿Quieres profundizar más?",
      ctaLinks: [
        { href: "/blog/what-is-a-token", text: "📖 ¿Qué es un Token? Guía Completa →" },
        { href: "/blog/reduce-llm-api-costs", text: "💸 Cómo Reducir Costos de API LLM en 60% →" },
        { href: "/blog/gpt4o-vs-claude-sonnet", text: "⚡ GPT-4o vs Claude: Comparación de Costos →" },
        { href: "/blog/llm-pricing-index", text: "📊 Índice de Precios LLM — Abril 2026 →" },
      ],
    },
    items: [
      {
        question: "¿Qué es un token en IA y modelos de lenguaje?",
        answer: "Un token es la unidad básica de texto que procesan los modelos de IA como GPT-4o, Claude y Gemini. Los tokens pueden ser palabras completas, partes de palabras o caracteres individuales. En inglés, 1 token equivale aproximadamente a 4 caracteres o 0.75 palabras. Los precios de la API se cobran por token, no por palabra o carácter."
      },
      {
        question: "¿Cuáles son los modelos de IA más nuevos en 2026?",
        answer: "Los modelos más nuevos en 2026 incluyen: GPT-4.1 y GPT-4.1 Nano de OpenAI (con ventanas de contexto de 1M tokens); Claude Opus 4.7 y Claude Haiku 4.5 de Anthropic; Gemini 2.5 Pro y Gemini 2.5 Flash de Google; Llama 4 Scout de Meta; y DeepSeek V3. Nuestra calculadora soporta todos estos modelos."
      },
      {
        question: "¿Cómo funciona esta calculadora de tokens?",
        answer: "Esta calculadora usa la misma biblioteca tiktoken que OpenAI utiliza internamente, ejecutándose completamente en tu navegador vía WebAssembly. Tu texto nunca sale de tu dispositivo. El conteo de tokens, palabras, caracteres y el costo estimado se calculan en tiempo real sin llamadas a ninguna API."
      },
      {
        question: "¿Por qué diferentes modelos de IA producen diferentes conteos de tokens?",
        answer: "Cada modelo usa un tokenizador diferente con un vocabulario distinto. GPT-4o usa o200k_base (200K vocabulario), Claude usa el BPE personalizado de Anthropic y Gemini usa SentencePiece. Un vocabulario más grande significa que las palabras comunes son tokens únicos, haciendo el texto más compacto. La misma oración puede producir conteos diferentes en cada modelo."
      },
      {
        question: "¿Cuánto cuesta usar GPT-4o, Claude o Gemini?",
        answer: "A partir de abril 2026: GPT-4.1 cuesta $2.00/1M tokens de entrada y $8.00/1M de salida. Claude Sonnet 4.6 cuesta $3/$15 por 1M tokens. Gemini 2.5 Pro cuesta $1.25/$10 por 1M tokens. Para opciones económicas: GPT-4.1 Nano ($0.10/$0.40), Gemini 2.5 Flash-Lite ($0.10/$0.40) y Mistral Small ($0.10/$0.30) son los más accesibles."
      },
      {
        question: "¿Qué es el caché de prompts y cómo reduce costos?",
        answer: "El caché de prompts permite a los proveedores reutilizar cálculos de prefijos de entrada idénticos (como prompts del sistema). OpenAI ofrece 50% de descuento en tokens cacheados; Anthropic ofrece hasta 90%. Es la estrategia más efectiva de reducción de costos para aplicaciones en producción."
      },
      {
        question: "¿Mis datos están seguros al usar esta calculadora?",
        answer: "Sí, completamente. Esta calculadora se ejecuta enteramente en tu navegador usando WebAssembly. Tu texto nunca se envía a ningún servidor o API. No hay recolección de datos, no hay cookies rastreando tu entrada y no se hacen llamadas externas a APIs con tu texto."
      },
      {
        question: "¿Qué tan precisa es comparada con el tokenizador oficial de OpenAI?",
        answer: "Para modelos de OpenAI (GPT-4o, GPT-4.1), esta calculadora usa exactamente la misma biblioteca tiktoken, por lo que el conteo es 100% preciso. Para Claude, Gemini, DeepSeek y Llama, usamos la aproximación más cercana disponible — los resultados pueden variar 3-8% según el contenido."
      }
    ]
  },

  ja: {
    labels: {
      title: "❓ よくある質問",
      searchPlaceholder: "質問を検索...",
      noResults: "一致する質問が見つかりません",
      didThisHelp: "この回答は役に立ちましたか？",
      yes: "👍 はい",
      no: "👎 いいえ",
      ctaText: "さらに詳しく知りたいですか？",
      ctaLinks: [
        { href: "/blog/what-is-a-token", text: "📖 トークンとは？完全ガイド →" },
        { href: "/blog/reduce-llm-api-costs", text: "💸 LLM APIコストを60%削減する方法 →" },
        { href: "/blog/gpt4o-vs-claude-sonnet", text: "⚡ GPT-4o vs Claude：コスト比較 →" },
        { href: "/blog/llm-pricing-index", text: "📊 LLM価格インデックス — 2026年4月 →" },
      ],
    },
    items: [
      {
        question: "AIと大規模言語モデルにおけるトークンとは？",
        answer: "トークンとは、GPT-4o、Claude、GeminiなどのAIモデルが処理するテキストの基本単位です。トークンは完全な単語、単語の一部、または個々の文字である場合があります。英語では、1トークンは約4文字または約0.75語です。APIの料金はトークン単位で課金されます。"
      },
      {
        question: "2026年に利用可能な最新のAIモデルは？",
        answer: "2026年の最新モデルには、OpenAIのGPT-4.1とGPT-4.1 Nano（1Mトークンのコンテキストウィンドウ）、AnthropicのClaude Opus 4.7とClaude Haiku 4.5、GoogleのGemini 2.5 ProとGemini 2.5 Flash、MetaのLlama 4 Scout、DeepSeek V3が含まれます。当計算機はこれらすべてのモデルをサポートしています。"
      },
      {
        question: "このトークン計算機はどのように機能しますか？",
        answer: "この計算機はOpenAIが内部で使用しているのと同じtiktokenライブラリを使用し、WebAssemblyを介してブラウザ内で完全に実行されます。テキストはデバイスから外に送信されることはありません。トークン数、単語数、文字数、推定コストがリアルタイムで計算されます。"
      },
      {
        question: "なぜ異なるAIモデルで異なるトークン数になるのですか？",
        answer: "各モデルは異なる語彙サイズの異なるトークナイザーを使用しています。GPT-4oはo200k_base（200K語彙）を、Claudeは独自のBPEを、GeminiはSentencePieceを使用します。同じ文章でもモデルによって異なるトークン数が生成され、APIコストに直接影響します。"
      },
      {
        question: "GPT-4o、Claude、Geminiの利用料金は？",
        answer: "2026年4月時点：GPT-4.1は入力$2.00/1Mトークン、出力$8.00/1Mトークン。Claude Sonnet 4.6は$3/$15 per 1Mトークン。Gemini 2.5 Proは$1.25/$10 per 1Mトークン。低価格オプション：GPT-4.1 Nano ($0.10/$0.40)、Gemini 2.5 Flash-Lite ($0.10/$0.40)が最もお手頃です。"
      },
      {
        question: "プロンプトキャッシングとは何ですか？",
        answer: "プロンプトキャッシングにより、AIプロバイダーは同一の入力プレフィックス（システムプロンプトなど）の計算を再利用できます。OpenAIはキャッシュされたトークンに50%割引を、Anthropicは最大90%割引を提供します。本番アプリケーションで最も効果的なコスト削減戦略です。"
      },
      {
        question: "この計算機を使用する際、テキストデータは安全ですか？",
        answer: "はい、完全に安全です。このトークン計算機はWebAssemblyを使用してブラウザ内で完全に実行されます。テキストはサーバーやAPIに一切送信されません。データ収集、入力を追跡するCookie、テキストを使った外部API呼び出しは一切ありません。"
      },
      {
        question: "公式OpenAIトークナイザーと比べてどの程度正確ですか？",
        answer: "OpenAIモデル（GPT-4o、GPT-4.1）については、まったく同じtiktokenライブラリを使用しているため100%正確です。Claude、Gemini、DeepSeek、Llamaについては、最も近い近似値を使用しており、コンテンツや言語によって3-8%の誤差が生じる場合があります。"
      }
    ]
  },

  "pt-BR": {
    labels: {
      title: "❓ Perguntas Frequentes",
      searchPlaceholder: "Pesquisar perguntas...",
      noResults: "Nenhuma pergunta encontrada para",
      didThisHelp: "Esta resposta foi útil?",
      yes: "👍 Sim",
      no: "👎 Não",
      ctaText: "Quer saber mais?",
      ctaLinks: [
        { href: "/blog/what-is-a-token", text: "📖 O Que é um Token? Guia Completo →" },
        { href: "/blog/reduce-llm-api-costs", text: "💸 Como Reduzir Custos de API LLM em 60% →" },
        { href: "/blog/gpt4o-vs-claude-sonnet", text: "⚡ GPT-4o vs Claude: Comparação de Custos →" },
        { href: "/blog/llm-pricing-index", text: "📊 Índice de Preços LLM — Abril 2026 →" },
      ],
    },
    items: [
      {
        question: "O que é um token em IA e modelos de linguagem?",
        answer: "Um token é a unidade básica de texto que modelos de IA como GPT-4o, Claude e Gemini processam. Tokens podem ser palavras inteiras, partes de palavras ou caracteres individuais. Em inglês, 1 token equivale a aproximadamente 4 caracteres ou 0,75 palavras. Os preços da API são cobrados por token."
      },
      {
        question: "Quais são os modelos de IA mais recentes em 2026?",
        answer: "Os modelos mais recentes em 2026 incluem: GPT-4.1 e GPT-4.1 Nano da OpenAI; Claude Opus 4.7 e Claude Haiku 4.5 da Anthropic; Gemini 2.5 Pro e Gemini 2.5 Flash do Google; Llama 4 Scout da Meta; e DeepSeek V3. Nossa calculadora suporta todos esses modelos."
      },
      {
        question: "Como esta calculadora de tokens funciona?",
        answer: "Esta calculadora usa a mesma biblioteca tiktoken que a OpenAI utiliza internamente, rodando inteiramente no seu navegador via WebAssembly. Seu texto nunca sai do seu dispositivo. A contagem de tokens, palavras, caracteres e o custo estimado são calculados em tempo real."
      },
      {
        question: "Por que diferentes modelos produzem contagens de tokens diferentes?",
        answer: "Cada modelo usa um tokenizador diferente com um vocabulário distinto. GPT-4o usa o200k_base (200K vocabulário), Claude usa BPE personalizado da Anthropic e Gemini usa SentencePiece. A mesma frase pode produzir contagens diferentes em cada modelo, afetando diretamente o custo da API."
      },
      {
        question: "Quanto custa usar GPT-4o, Claude ou Gemini?",
        answer: "Em abril de 2026: GPT-4.1 custa $2,00/1M tokens de entrada e $8,00/1M de saída. Claude Sonnet 4.6 custa $3/$15 por 1M tokens. Gemini 2.5 Pro custa $1,25/$10 por 1M tokens. Opções econômicas: GPT-4.1 Nano ($0,10/$0,40) e Gemini 2.5 Flash-Lite ($0,10/$0,40) são os mais acessíveis."
      },
      {
        question: "Meus dados estão seguros ao usar esta calculadora?",
        answer: "Sim, completamente. Esta calculadora roda inteiramente no seu navegador usando WebAssembly. Seu texto nunca é enviado a nenhum servidor ou API. Não há coleta de dados, cookies rastreando sua entrada ou chamadas externas de API com seu texto."
      }
    ]
  },

  ko: {
    labels: {
      title: "❓ 자주 묻는 질문",
      searchPlaceholder: "질문 검색...",
      noResults: "일치하는 질문을 찾을 수 없습니다",
      didThisHelp: "이 답변이 도움이 되었나요?",
      yes: "👍 예",
      no: "👎 아니오",
      ctaText: "더 자세히 알고 싶으신가요?",
      ctaLinks: [
        { href: "/blog/what-is-a-token", text: "📖 토큰이란? 완전 가이드 →" },
        { href: "/blog/reduce-llm-api-costs", text: "💸 LLM API 비용 60% 절감하는 방법 →" },
        { href: "/blog/gpt4o-vs-claude-sonnet", text: "⚡ GPT-4o vs Claude: 비용 비교 →" },
        { href: "/blog/llm-pricing-index", text: "📊 LLM 가격 인덱스 — 2026년 4월 →" },
      ],
    },
    items: [
      {
        question: "AI와 대규모 언어 모델에서 토큰이란 무엇인가요?",
        answer: "토큰은 GPT-4o, Claude, Gemini와 같은 AI 모델이 처리하는 텍스트의 기본 단위입니다. 토큰은 전체 단어, 단어의 일부 또는 개별 문자가 될 수 있습니다. 영어에서 1 토큰은 대략 4자 또는 약 0.75 단어입니다. API 가격은 토큰 단위로 청구됩니다."
      },
      {
        question: "2026년에 사용 가능한 최신 AI 모델은?",
        answer: "2026년 최신 모델에는 OpenAI의 GPT-4.1 및 GPT-4.1 Nano(1M 토큰 컨텍스트 윈도우), Anthropic의 Claude Opus 4.7 및 Claude Haiku 4.5, Google의 Gemini 2.5 Pro 및 Gemini 2.5 Flash, Meta의 Llama 4 Scout, DeepSeek V3가 포함됩니다."
      },
      {
        question: "이 토큰 계산기는 어떻게 작동하나요?",
        answer: "이 계산기는 OpenAI가 내부적으로 사용하는 것과 동일한 tiktoken 라이브러리를 사용하며, WebAssembly를 통해 브라우저에서 완전히 실행됩니다. 텍스트는 장치 밖으로 전송되지 않습니다. 토큰 수, 단어 수, 문자 수 및 예상 비용이 실시간으로 계산됩니다."
      },
      {
        question: "왜 다른 AI 모델이 다른 토큰 수를 생성하나요?",
        answer: "각 모델은 다른 어휘 크기의 다른 토크나이저를 사용합니다. GPT-4o는 o200k_base(200K 어휘), Claude는 Anthropic의 커스텀 BPE, Gemini는 SentencePiece를 사용합니다. 같은 문장이 각 모델에서 다른 토큰 수를 생성하여 API 비용에 직접적인 영향을 미칩니다."
      },
      {
        question: "GPT-4o, Claude, Gemini 사용 비용은 얼마인가요?",
        answer: "2026년 4월 기준: GPT-4.1은 입력 $2.00/1M 토큰, 출력 $8.00/1M 토큰. Claude Sonnet 4.6은 $3/$15 per 1M 토큰. Gemini 2.5 Pro는 $1.25/$10 per 1M 토큰. 저렴한 옵션: GPT-4.1 Nano ($0.10/$0.40), Gemini 2.5 Flash-Lite ($0.10/$0.40)가 가장 경제적입니다."
      },
      {
        question: "이 계산기를 사용할 때 데이터는 안전한가요?",
        answer: "네, 완전히 안전합니다. 이 토큰 계산기는 WebAssembly를 사용하여 브라우저에서 완전히 실행됩니다. 텍스트는 서버나 API로 전송되지 않습니다. 데이터 수집, 입력 추적 쿠키, 텍스트를 사용한 외부 API 호출이 전혀 없습니다."
      }
    ]
  },

  zh: {
    labels: {
      title: "❓ 常见问题",
      searchPlaceholder: "搜索问题...",
      noResults: "未找到匹配的问题",
      didThisHelp: "这个回答对您有帮助吗？",
      yes: "👍 是",
      no: "👎 否",
      ctaText: "想要深入了解？",
      ctaLinks: [
        { href: "/blog/what-is-a-token", text: "📖 什么是Token？完全指南 →" },
        { href: "/blog/reduce-llm-api-costs", text: "💸 如何将LLM API成本降低60% →" },
        { href: "/blog/gpt4o-vs-claude-sonnet", text: "⚡ GPT-4o vs Claude：成本对比 →" },
        { href: "/blog/llm-pricing-index", text: "📊 LLM价格指数 — 2026年4月 →" },
      ],
    },
    items: [
      {
        question: "AI和大语言模型中的Token是什么？",
        answer: "Token是GPT-4o、Claude和Gemini等AI模型处理的文本基本单位。Token可以是完整的单词、单词的一部分或单个字符。在英语中，1个token大约等于4个字符或0.75个单词。API定价按token计费，而非按单词或字符。"
      },
      {
        question: "2026年有哪些最新的AI模型？",
        answer: "2026年最新模型包括：OpenAI的GPT-4.1和GPT-4.1 Nano（支持1M token上下文窗口）；Anthropic的Claude Opus 4.7和Claude Haiku 4.5；Google的Gemini 2.5 Pro和Gemini 2.5 Flash；Meta的Llama 4 Scout；以及DeepSeek V3。我们的计算器支持所有这些模型。"
      },
      {
        question: "这个Token计算器是如何工作的？",
        answer: "该计算器使用与OpenAI内部相同的tiktoken库，通过WebAssembly完全在浏览器中运行。您的文本永远不会离开您的设备。Token数、词数、字符数和预估成本都是实时计算的，无需任何API调用。"
      },
      {
        question: "为什么不同的AI模型会产生不同的Token数？",
        answer: "每个模型使用不同词汇量的不同分词器。GPT-4o使用o200k_base（200K词汇），Claude使用Anthropic的自定义BPE，Gemini使用SentencePiece。相同的句子在不同模型上可能产生不同的token数，直接影响API成本。"
      },
      {
        question: "使用GPT-4o、Claude或Gemini需要多少费用？",
        answer: "截至2026年4月：GPT-4.1输入$2.00/1M token，输出$8.00/1M token。Claude Sonnet 4.6为$3/$15 每1M token。Gemini 2.5 Pro为$1.25/$10 每1M token。经济型选项：GPT-4.1 Nano ($0.10/$0.40)和Gemini 2.5 Flash-Lite ($0.10/$0.40)最为实惠。"
      },
      {
        question: "什么是Prompt缓存？如何降低成本？",
        answer: "Prompt缓存允许AI提供商重用相同输入前缀（如系统提示）的计算。OpenAI在缓存token上提供50%折扣；Anthropic提供最高90%折扣。这是生产应用中最有效的成本降低策略。"
      },
      {
        question: "使用此计算器时我的数据安全吗？",
        answer: "完全安全。此Token计算器使用WebAssembly完全在浏览器中运行。您的文本不会发送到任何服务器或API。没有数据收集，没有跟踪输入的Cookie，也没有使用您文本的外部API调用。"
      },
      {
        question: "与官方OpenAI分词器相比精确度如何？",
        answer: "对于OpenAI模型（GPT-4o、GPT-4.1），此计算器使用完全相同的tiktoken库，因此token计数100%准确。对于Claude、Gemini、DeepSeek和Llama，我们使用最接近的近似值——结果可能因内容和语言而有3-8%的差异。"
      }
    ]
  }
};
