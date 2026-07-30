/**
 * Blog content, bilingual. Kept as plain data (like `lib/new-content.ts`)
 * rather than inside `lib/translations.ts` so posts can be added without
 * touching the UI-string tree, and so server code (metadata, sitemap) can
 * import it without pulling in the client i18n context.
 *
 * Posts are ordered newest first — the index page renders them in order.
 */

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPostLocale {
  title: string;
  excerpt: string;
  tag: string;
  sections: BlogSection[];
}

export interface BlogPost {
  slug: string;
  /** ISO date, used for display and sitemap lastModified. */
  date: string;
  readingMinutes: number;
  en: BlogPostLocale;
  es: BlogPostLocale;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "when-to-add-ai-to-your-product",
    date: "2026-07-21",
    readingMinutes: 6,
    en: {
      title: "When is your product actually ready for AI?",
      excerpt:
        "Everyone wants AI features. Few products are ready for them. Here are the signals we look for before recommending an AI integration to a client — and the cases where we advise against it.",
      tag: "AI",
      sections: [
        {
          paragraphs: [
            "Almost every discovery call we run in 2026 includes some version of the same question: “where should we add AI?” It's the right question to ask — but usually at the wrong time. AI features amplify a product; they rarely fix one. Before we recommend any AI integration, we look for a handful of signals that tell us the foundation can support it.",
          ],
        },
        {
          heading: "Signal 1: You have a repetitive decision, not just repetitive work",
          paragraphs: [
            "Automation handles repetitive work. AI shines when there's a repetitive decision — classifying a support ticket, prioritizing a lead, extracting fields from a messy document. If a rules engine could do the job with ten if-statements, build the rules engine. It's cheaper, faster, and it never hallucinates.",
          ],
        },
        {
          heading: "Signal 2: You have the data — and it's yours",
          paragraphs: [
            "The best AI features are grounded in data your product already collects: your users' history, your catalog, your domain documents. If the feature only works with generic model knowledge, users can get the same answer from any chatbot — you're adding latency and cost without adding moat.",
          ],
        },
        {
          heading: "Signal 3: A wrong answer is survivable",
          paragraphs: [
            "Every model is wrong some percentage of the time. Great AI products are designed so that a wrong answer costs seconds, not trust: a draft the user edits, a suggestion they can dismiss, a summary with the source one click away. If a wrong answer is catastrophic — payments, compliance, medical — you need a human in the loop, and the feature should be designed around that from day one.",
          ],
        },
        {
          heading: "When we say no",
          paragraphs: [
            "We regularly talk clients out of AI features — when the core flow still has friction, when the data isn't there yet, or when a plain algorithm solves it. Shipping a mediocre AI feature is worse than shipping none: it trains users to distrust the product.",
            "If those three signals are present, though, the upside is real. Our fastest-growing client products all pair a strong core workflow with one well-placed AI capability — not ten scattered ones.",
          ],
        },
      ],
    },
    es: {
      title: "¿Cuándo está tu producto realmente listo para IA?",
      excerpt:
        "Todos quieren funcionalidades de IA. Pocos productos están listos para tenerlas. Estas son las señales que buscamos antes de recomendar una integración de IA a un cliente — y los casos en los que recomendamos no hacerlo.",
      tag: "IA",
      sections: [
        {
          paragraphs: [
            "Casi todas las llamadas de discovery que hacemos en 2026 incluyen alguna versión de la misma pregunta: “¿dónde deberíamos sumar IA?”. Es la pregunta correcta — pero casi siempre en el momento equivocado. La IA amplifica un producto; rara vez lo arregla. Antes de recomendar cualquier integración de IA, buscamos un puñado de señales que nos digan que la base puede sostenerla.",
          ],
        },
        {
          heading: "Señal 1: Tenés una decisión repetitiva, no solo trabajo repetitivo",
          paragraphs: [
            "La automatización resuelve el trabajo repetitivo. La IA brilla cuando hay una decisión repetitiva: clasificar un ticket de soporte, priorizar un lead, extraer campos de un documento desprolijo. Si un motor de reglas puede hacer el trabajo con diez if-statements, construí el motor de reglas. Es más barato, más rápido y nunca alucina.",
          ],
        },
        {
          heading: "Señal 2: Tenés los datos — y son tuyos",
          paragraphs: [
            "Las mejores funcionalidades de IA se apoyan en datos que tu producto ya recolecta: el historial de tus usuarios, tu catálogo, tus documentos de dominio. Si la funcionalidad solo funciona con conocimiento genérico del modelo, los usuarios pueden obtener la misma respuesta de cualquier chatbot — estás sumando latencia y costo sin sumar diferenciación.",
          ],
        },
        {
          heading: "Señal 3: Una respuesta incorrecta es tolerable",
          paragraphs: [
            "Todo modelo se equivoca un porcentaje del tiempo. Los buenos productos de IA están diseñados para que una respuesta incorrecta cueste segundos, no confianza: un borrador que el usuario edita, una sugerencia que puede descartar, un resumen con la fuente a un clic. Si una respuesta incorrecta es catastrófica — pagos, compliance, salud — necesitás un humano en el circuito, y la funcionalidad debe diseñarse alrededor de eso desde el día uno.",
          ],
        },
        {
          heading: "Cuándo decimos que no",
          paragraphs: [
            "Con frecuencia convencemos a clientes de no construir funcionalidades de IA — cuando el flujo principal todavía tiene fricción, cuando los datos aún no existen, o cuando un algoritmo simple lo resuelve. Lanzar una funcionalidad de IA mediocre es peor que no lanzar ninguna: entrena a los usuarios a desconfiar del producto.",
            "Ahora bien, si esas tres señales están presentes, el potencial es real. Los productos de nuestros clientes que más crecen combinan un flujo principal sólido con una capacidad de IA bien ubicada — no diez dispersas.",
          ],
        },
      ],
    },
  },
  {
    slug: "how-human-ai-teams-ship-software",
    date: "2026-07-02",
    readingMinutes: 5,
    en: {
      title: "How our human + AI teams actually ship software",
      excerpt:
        "“Hybrid team of engineers and AI agents” sounds like marketing until you see the workflow. A concrete look at how we split work between people and agents — and where the humans stay firmly in charge.",
      tag: "Inside LM",
      sections: [
        {
          paragraphs: [
            "We describe ourselves as a hybrid team of engineers, designers, and AI agents. That phrase can sound like marketing gloss, so here's what it means concretely on a typical client project.",
          ],
        },
        {
          heading: "Agents do the breadth, engineers do the depth",
          paragraphs: [
            "AI agents are exceptional at breadth: scaffolding CRUD screens, writing the first pass of tests, migrating patterns across dozens of files, drafting API documentation. Our engineers spend their time on depth: architecture decisions, tricky state, performance under load, the 10% of a codebase where a wrong choice compounds for years.",
            "In practice a feature starts with an engineer writing a short technical brief. Agents implement the well-trodden parts in parallel while the engineer builds the core logic. Everything meets in code review.",
          ],
        },
        {
          heading: "Review is where quality lives",
          paragraphs: [
            "Nothing an agent writes reaches a client repository without an engineer reading it. Not skimming — reading. We treat agent output like a fast, tireless junior developer's: usually correct, occasionally confidently wrong, always worth reviewing. Our review checklist is the same for humans and agents, which keeps the bar consistent.",
          ],
        },
        {
          heading: "What this means for clients",
          paragraphs: [
            "The practical effect is speed without the usual quality trade-off. Boilerplate that used to take a sprint takes a day, so a much larger share of the budget goes into the parts of the product users actually feel: the core workflow, the edge cases, the polish.",
            "It also means our estimates have gotten tighter. Agent-assisted work is remarkably predictable — it's the deep human work that carries uncertainty, and isolating it makes it easier to scope honestly.",
          ],
        },
      ],
    },
    es: {
      title: "Cómo nuestros equipos humano + IA construyen software en serio",
      excerpt:
        "“Equipo híbrido de ingenieros y agentes de IA” suena a marketing hasta que ves el flujo de trabajo. Una mirada concreta a cómo dividimos el trabajo entre personas y agentes — y dónde los humanos siguen firmemente al mando.",
      tag: "Inside LM",
      sections: [
        {
          paragraphs: [
            "Nos describimos como un equipo híbrido de ingenieros, diseñadores y agentes de IA. Esa frase puede sonar a marketing, así que acá va lo que significa concretamente en un proyecto típico.",
          ],
        },
        {
          heading: "Los agentes hacen la amplitud, los ingenieros la profundidad",
          paragraphs: [
            "Los agentes de IA son excepcionales en amplitud: armar pantallas CRUD, escribir la primera pasada de tests, migrar patrones en decenas de archivos, redactar documentación de API. Nuestros ingenieros dedican su tiempo a la profundidad: decisiones de arquitectura, estado complejo, performance bajo carga, ese 10% del código donde una mala decisión se paga durante años.",
            "En la práctica, una funcionalidad arranca con un ingeniero escribiendo un brief técnico corto. Los agentes implementan las partes conocidas en paralelo mientras el ingeniero construye la lógica central. Todo se encuentra en el code review.",
          ],
        },
        {
          heading: "La calidad vive en el review",
          paragraphs: [
            "Nada de lo que escribe un agente llega al repositorio de un cliente sin que un ingeniero lo lea. No hojear — leer. Tratamos el output de los agentes como el de un desarrollador junior rápido e incansable: generalmente correcto, a veces equivocado con mucha confianza, siempre digno de revisión. Nuestro checklist de review es el mismo para humanos y agentes, lo que mantiene la vara consistente.",
          ],
        },
        {
          heading: "Qué significa esto para los clientes",
          paragraphs: [
            "El efecto práctico es velocidad sin el trade-off habitual de calidad. El boilerplate que antes llevaba un sprint hoy lleva un día, así que una porción mucho mayor del presupuesto va a las partes del producto que los usuarios realmente sienten: el flujo principal, los casos borde, el pulido.",
            "También significa que nuestras estimaciones se volvieron más precisas. El trabajo asistido por agentes es notablemente predecible — la incertidumbre vive en el trabajo humano profundo, y aislarlo permite estimar con honestidad.",
          ],
        },
      ],
    },
  },
  {
    slug: "scoping-an-mvp-that-ships",
    date: "2026-06-10",
    readingMinutes: 5,
    en: {
      title: "Scoping an MVP that actually ships",
      excerpt:
        "Most MVPs fail before a line of code is written — they're scoped as small products instead of large experiments. The three questions we use to cut scope without cutting the point.",
      tag: "Product",
      sections: [
        {
          paragraphs: [
            "The MVPs that die don't usually die in development. They die in scoping, weeks earlier, when a “minimum” product quietly becomes a small version of the five-year vision. After shipping MVPs for startups and internal ventures for years, we've compressed our scoping process into three questions.",
          ],
        },
        {
          heading: "1. What is the one behavior you need to observe?",
          paragraphs: [
            "An MVP is an instrument for observing a behavior: will restaurant owners upload their menu? Will finance teams connect their bank? Name the single behavior that validates the business, and be ruthless about it. Every screen that doesn't serve that observation is scope to cut.",
          ],
        },
        {
          heading: "2. What can be manual behind the curtain?",
          paragraphs: [
            "Users need the experience to feel complete — they don't need it to be automated. Onboarding emails can be sent by a person. The “algorithm” can be a spreadsheet for the first hundred users. Every process you keep manual is engineering weeks returned to the core flow, and you'll automate with far better information later.",
          ],
        },
        {
          heading: "3. What breaks at 100 users — and do we care?",
          paragraphs: [
            "Scaling questions are seductive and almost always premature. We ask what breaks at one hundred users, fix only that, and write down the rest. A visible backlog of known limitations is not technical debt — it's evidence you spent the budget on learning instead of infrastructure nobody needed yet.",
            "Scoped this way, twelve weeks is a comfortable window to go from zero to a production MVP — which is exactly how we structure our MVP program.",
          ],
        },
      ],
    },
    es: {
      title: "Cómo definir el alcance de un MVP que de verdad se lanza",
      excerpt:
        "La mayoría de los MVPs fracasan antes de escribir una línea de código: se definen como productos chicos en vez de experimentos grandes. Las tres preguntas que usamos para recortar alcance sin recortar el propósito.",
      tag: "Producto",
      sections: [
        {
          paragraphs: [
            "Los MVPs que mueren no suelen morir en desarrollo. Mueren en la definición de alcance, semanas antes, cuando un producto “mínimo” se convierte silenciosamente en una versión chica de la visión a cinco años. Después de años lanzando MVPs para startups y ventures internos, comprimimos nuestro proceso de scoping en tres preguntas.",
          ],
        },
        {
          heading: "1. ¿Cuál es el único comportamiento que necesitás observar?",
          paragraphs: [
            "Un MVP es un instrumento para observar un comportamiento: ¿los dueños de restaurantes van a cargar su menú? ¿Los equipos de finanzas van a conectar su banco? Nombrá el único comportamiento que valida el negocio y sé implacable con eso. Cada pantalla que no sirve a esa observación es alcance para recortar.",
          ],
        },
        {
          heading: "2. ¿Qué puede ser manual detrás del telón?",
          paragraphs: [
            "Los usuarios necesitan que la experiencia se sienta completa — no necesitan que esté automatizada. Los emails de onboarding los puede mandar una persona. El “algoritmo” puede ser una planilla para los primeros cien usuarios. Cada proceso que mantenés manual son semanas de ingeniería devueltas al flujo principal, y vas a automatizar con mucha mejor información después.",
          ],
        },
        {
          heading: "3. ¿Qué se rompe con 100 usuarios — y nos importa?",
          paragraphs: [
            "Las preguntas de escala son seductoras y casi siempre prematuras. Preguntamos qué se rompe con cien usuarios, arreglamos solo eso y anotamos el resto. Un backlog visible de limitaciones conocidas no es deuda técnica — es evidencia de que gastaste el presupuesto en aprender en vez de en infraestructura que nadie necesitaba todavía.",
            "Con el alcance definido así, doce semanas es una ventana cómoda para ir de cero a un MVP en producción — que es exactamente como estructuramos nuestro programa de MVP.",
          ],
        },
      ],
    },
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function formatBlogDate(iso: string, language: "en" | "es"): string {
  return new Intl.DateTimeFormat(language === "es" ? "es-AR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}
