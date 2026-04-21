// Bilingual copy + site data — ported from design's content.jsx

export type Lang = "en" | "es";

export type Subbrand = {
  id: string;
  tag: string;
  color: string;
  colorKey: "purple" | "blue" | "red" | "yellow" | "green";
  en: { name: string; title: string; tagline: string };
  es: { name: string; title: string; tagline: string };
};

export type CaseMetric = { k: string; v: string };

export type CaseStudy = {
  id: string;
  client: string;
  subbrand: string;
  color: string;
  stack: string[];
  year: string;
  en: { cat: string; title: string; lede: string; metrics: CaseMetric[]; approach: string[] };
  es: { cat: string; title: string; lede: string; metrics: CaseMetric[]; approach: string[] };
};

export const SUBBRANDS: Subbrand[] = [
  {
    id: "development",
    tag: "LM Development",
    color: "#6F2AE4",
    colorKey: "purple",
    en: { name: "Development", title: "Product + software", tagline: "Senior engineers, shipping with AI copilots." },
    es: { name: "Development", title: "Producto + software", tagline: "Ingeniería senior, shipping con copilotos de IA." },
  },
  {
    id: "cloud",
    tag: "LM Cloud",
    color: "#227CFF",
    colorKey: "blue",
    en: { name: "Cloud", title: "Infra that scales", tagline: "From first deploy to global prod. No surprises." },
    es: { name: "Cloud", title: "Infra que escala", tagline: "Del primer deploy a producción global. Sin sorpresas." },
  },
  {
    id: "experiences",
    tag: "LM Experiences",
    color: "#F50132",
    colorKey: "red",
    en: { name: "Experiences", title: "Digital experiences", tagline: "Web, apps, product. Design with teeth." },
    es: { name: "Experiences", title: "Experiencias digitales", tagline: "Webs, apps y producto. Diseño con dientes." },
  },
  {
    id: "talents",
    tag: "LM Talents",
    color: "#FDA901",
    colorKey: "yellow",
    en: { name: "Talents", title: "Talent on demand", tagline: "Engineers, designers, PMs. Embedded in your team." },
    es: { name: "Talents", title: "Talento a demanda", tagline: "Ingenieros, diseñadores, PMs. Integrados en tu equipo." },
  },
  {
    id: "general",
    tag: "LM General",
    color: "#22AE48",
    colorKey: "green",
    en: { name: "General", title: "Strategy + foundry", tagline: "When the problem still needs a shape." },
    es: { name: "General", title: "Estrategia + foundry", tagline: "Cuando el problema aún no tiene forma definida." },
  },
];

export const CASES: CaseStudy[] = [
  {
    id: "finnly",
    client: "Finnly",
    subbrand: "development",
    color: "#6F2AE4",
    stack: ["Next.js", "Postgres", "OpenAI", "Temporal"],
    year: "2025",
    en: {
      cat: "Fintech · B2C onboarding",
      title: "Conversational banking that replaced 8 forms.",
      lede: "A neobank's account-opening flow had a 31% drop-off in paperwork. We replaced the form stack with a chat-first interface that asks only what it needs, when it needs it.",
      metrics: [
        { k: "Onboarding time", v: "−64%" },
        { k: "Completion rate", v: "+38pp" },
        { k: "Support tickets", v: "−51%" },
        { k: "Time-to-first-tx", v: "3 min" },
      ],
      approach: [
        "Audited 8 legacy forms — mapped every field to a regulatory need.",
        "Built a conversational orchestrator: LLM proposes, deterministic engine validates.",
        "Replaced 240+ KYC fields with 19 adaptive questions.",
        "Shipped behind a feature flag to 5%, then 50%, then all.",
      ],
    },
    es: {
      cat: "Fintech · Onboarding B2C",
      title: "Banca conversacional que reemplazó 8 formularios.",
      lede: "El flujo de apertura de cuenta de un neobanco tenía 31% de abandono en papeleo. Reemplazamos los formularios con una interfaz chat-first que pregunta solo lo que necesita, cuando lo necesita.",
      metrics: [
        { k: "Tiempo onboarding", v: "−64%" },
        { k: "Tasa de finalización", v: "+38pp" },
        { k: "Tickets de soporte", v: "−51%" },
        { k: "Tiempo a primera tx", v: "3 min" },
      ],
      approach: [
        "Auditamos 8 formularios legacy — mapeamos cada campo a una necesidad regulatoria.",
        "Construimos un orquestador conversacional: el LLM propone, el motor determinístico valida.",
        "Reemplazamos 240+ campos KYC con 19 preguntas adaptativas.",
        "Lanzamos detrás de feature flag al 5%, luego 50%, luego todos.",
      ],
    },
  },
  {
    id: "trenza",
    client: "Trenza",
    subbrand: "experiences",
    color: "#F50132",
    stack: ["Remix", "Weaviate", "Shopify", "Cloudflare"],
    year: "2025",
    en: {
      cat: "Retail · Semantic search",
      title: "Semantic catalogue search for 12k SKUs.",
      lede: "A home-goods retailer was losing shoppers to keyword search that didn't understand intent. We shipped a semantic layer over their catalogue in 6 weeks.",
      metrics: [
        { k: "Conversion", v: "2.4×" },
        { k: "Zero-result rate", v: "−72%" },
        { k: "Median latency", v: "84 ms" },
        { k: "SKUs indexed", v: "12,430" },
      ],
      approach: [
        "Embedded the full catalogue with a product-tuned encoder.",
        "Hybrid retrieval: BM25 × vector, with learned re-ranking.",
        "Synonyms and intent classes built from 18 months of search logs.",
        "Rolled out on one category first; expanded after 2 weeks of wins.",
      ],
    },
    es: {
      cat: "Retail · Búsqueda semántica",
      title: "Búsqueda semántica para un catálogo de 12k SKUs.",
      lede: "Un retailer de decoración perdía compradores por una búsqueda por keywords que no entendía la intención. Entregamos una capa semántica sobre su catálogo en 6 semanas.",
      metrics: [
        { k: "Conversión", v: "2.4×" },
        { k: "Tasa de cero resultados", v: "−72%" },
        { k: "Latencia mediana", v: "84 ms" },
        { k: "SKUs indexados", v: "12.430" },
      ],
      approach: [
        "Embebemos el catálogo completo con un encoder ajustado al producto.",
        "Retrieval híbrido: BM25 × vector, con re-ranking aprendido.",
        "Sinónimos e intentos derivados de 18 meses de logs de búsqueda.",
        "Roll-out en una categoría primero; expansión tras 2 semanas de resultados.",
      ],
    },
  },
  {
    id: "cuenca",
    client: "Cuenca",
    subbrand: "cloud",
    color: "#227CFF",
    stack: ["Go", "Kafka", "Mapbox", "Anthropic"],
    year: "2024",
    en: {
      cat: "Logistics · Operational copilot",
      title: "Operational copilot for fleet dispatchers.",
      lede: "A last-mile fleet had dispatchers juggling 6 tools per decision. We built a single copilot that sees the whole network and proposes the next move.",
      metrics: [
        { k: "Empty routes", v: "−38%" },
        { k: "Decisions/hr per op", v: "3.1×" },
        { k: "SLA adherence", v: "97.4%" },
        { k: "Fleet size", v: "1,200 veh" },
      ],
      approach: [
        "Streamed telematics, orders, and weather into a unified event bus.",
        "Dispatcher UI rebuilt around a single decision surface.",
        "Copilot grounded in ops playbooks; human approves every dispatch.",
        "A/B tested against 3 months of historical decisions before go-live.",
      ],
    },
    es: {
      cat: "Logística · Copiloto operativo",
      title: "Copiloto operativo para despachadores de flota.",
      lede: "Una flota de última milla tenía despachadores malabareando 6 herramientas por decisión. Construimos un copiloto único que ve toda la red y propone el próximo movimiento.",
      metrics: [
        { k: "Rutas vacías", v: "−38%" },
        { k: "Decisiones/hora por op", v: "3.1×" },
        { k: "Cumplimiento SLA", v: "97.4%" },
        { k: "Tamaño de flota", v: "1.200 veh" },
      ],
      approach: [
        "Streamiamos telemetría, pedidos y clima a un event bus unificado.",
        "UI de despachador reconstruida alrededor de una única superficie de decisión.",
        "Copiloto anclado en playbooks operativos; el humano aprueba cada despacho.",
        "A/B test contra 3 meses de decisiones históricas antes del go-live.",
      ],
    },
  },
];

export type ServiceDetail = {
  hero: string;
  intro: string;
  offerings: { t: string; d: string }[];
  how: { step: string; t: string; d: string }[];
};

export const SERVICE_DETAIL: Record<string, Record<Lang, ServiceDetail>> = {
  development: {
    en: {
      hero: "We build the software. The copilots build with us.",
      intro: "Production-grade product engineering. Our teams pair senior engineers with purpose-built AI agents for code review, test generation, migrations, and knowledge lookup. You get the speed of a large team at the headcount of a small one.",
      offerings: [
        { t: "Product engineering", d: "Web + mobile, full-stack, long-run squads." },
        { t: "Greenfield MVPs", d: "Zero-to-one in 8–12 weeks. Real users, real infra." },
        { t: "Platform work", d: "Internal tools, SDKs, APIs, migrations." },
        { t: "AI features", d: "RAG, agents, evals, production-safe rollout." },
      ],
      how: [
        { step: "01", t: "Scope", d: "One week. We map the problem, not just the ask." },
        { step: "02", t: "Shape", d: "Two weeks. A runnable slice of the real thing." },
        { step: "03", t: "Ship", d: "Every week after. Behind flags, with evals." },
        { step: "04", t: "Sustain", d: "Handoff or stay. Your call, not ours." },
      ],
    },
    es: {
      hero: "Construimos el software. Los copilotos construyen con nosotros.",
      intro: "Ingeniería de producto production-grade. Nuestros equipos emparejan ingenieros senior con agentes de IA hechos a medida para code review, generación de tests, migraciones y consulta de conocimiento. Obtenés la velocidad de un equipo grande con el headcount de uno chico.",
      offerings: [
        { t: "Ingeniería de producto", d: "Web + mobile, full-stack, squads a largo plazo." },
        { t: "MVPs greenfield", d: "Cero-a-uno en 8–12 semanas. Usuarios reales, infra real." },
        { t: "Platform", d: "Herramientas internas, SDKs, APIs, migraciones." },
        { t: "Features de IA", d: "RAG, agentes, evals, rollout seguro en producción." },
      ],
      how: [
        { step: "01", t: "Scope", d: "Una semana. Mapeamos el problema, no solo el pedido." },
        { step: "02", t: "Shape", d: "Dos semanas. Una tajada ejecutable de la cosa real." },
        { step: "03", t: "Ship", d: "Cada semana después. Detrás de flags, con evals." },
        { step: "04", t: "Sustain", d: "Handoff o nos quedamos. Tu decisión, no la nuestra." },
      ],
    },
  },
  cloud: {
    en: {
      hero: "Infra that scales past your ambition.",
      intro: "Cloud and platform engineering with a bias for boring reliability. We design for the load you'll have in 18 months, not the one you have today. Multi-region, multi-tenant, observability-first.",
      offerings: [
        { t: "Platform design", d: "Multi-region, multi-tenant, cost-aware from day one." },
        { t: "Migrations", d: "Legacy → modern cloud, zero-downtime playbooks." },
        { t: "Observability", d: "Logs, traces, evals — the feedback loop developers love." },
        { t: "SRE on retainer", d: "Stay healthy after we're done shipping." },
      ],
      how: [
        { step: "01", t: "Audit", d: "We read your cloud bill and your incident log." },
        { step: "02", t: "Design", d: "A target architecture you can actually afford." },
        { step: "03", t: "Migrate", d: "Incremental, reversible, observable." },
        { step: "04", t: "Operate", d: "Runbooks and dashboards your team owns." },
      ],
    },
    es: {
      hero: "Infra que escala más allá de tu ambición.",
      intro: "Ingeniería de cloud y plataforma con sesgo hacia la confiabilidad aburrida. Diseñamos para la carga que vas a tener en 18 meses, no la de hoy. Multi-región, multi-tenant, observability-first.",
      offerings: [
        { t: "Diseño de plataforma", d: "Multi-región, multi-tenant, consciente del costo desde el día uno." },
        { t: "Migraciones", d: "Legacy → cloud moderno, playbooks sin downtime." },
        { t: "Observabilidad", d: "Logs, traces, evals — el loop que los devs aman." },
        { t: "SRE en retainer", d: "Mantenerse sano después de que terminamos de shipear." },
      ],
      how: [
        { step: "01", t: "Auditar", d: "Leemos tu factura de cloud y tu log de incidentes." },
        { step: "02", t: "Diseñar", d: "Una arquitectura objetivo que te puedas costear." },
        { step: "03", t: "Migrar", d: "Incremental, reversible, observable." },
        { step: "04", t: "Operar", d: "Runbooks y dashboards que tu equipo posee." },
      ],
    },
  },
  experiences: {
    en: {
      hero: "Design with teeth. Built to ship.",
      intro: "End-to-end digital experiences: brand, product, web. We draw the pixels and write the code — so the thing you approve in Figma is the thing that goes live, not a negotiation with a dev team who never saw the deck.",
      offerings: [
        { t: "Brand systems", d: "Identity, type, motion. A system, not a deck." },
        { t: "Marketing sites", d: "The one you're reading. Fast, crawlable, editable." },
        { t: "Product UX", d: "Research, flows, prototypes, specs." },
        { t: "Design ops", d: "Design systems that survive the year." },
      ],
      how: [
        { step: "01", t: "Listen", d: "One week with users and the people closest to them." },
        { step: "02", t: "Frame", d: "A point of view. Opinionated. Written down." },
        { step: "03", t: "Make", d: "Design + build in the same room." },
        { step: "04", t: "Measure", d: "We revisit after 30 days, not after the invoice." },
      ],
    },
    es: {
      hero: "Diseño con dientes. Hecho para shipear.",
      intro: "Experiencias digitales end-to-end: marca, producto, web. Dibujamos los píxeles y escribimos el código — así lo que aprobaste en Figma es lo que sale en vivo, no una negociación con un equipo de devs que nunca vio el deck.",
      offerings: [
        { t: "Sistemas de marca", d: "Identidad, tipografía, motion. Un sistema, no un deck." },
        { t: "Sitios de marketing", d: "Este que estás leyendo. Rápido, crawleable, editable." },
        { t: "UX de producto", d: "Research, flows, prototipos, specs." },
        { t: "Design ops", d: "Design systems que sobreviven al año." },
      ],
      how: [
        { step: "01", t: "Escuchar", d: "Una semana con usuarios y quienes están más cerca." },
        { step: "02", t: "Encuadrar", d: "Un punto de vista. Con opinión. Escrito." },
        { step: "03", t: "Hacer", d: "Diseño + build en la misma sala." },
        { step: "04", t: "Medir", d: "Volvemos a los 30 días, no después de la factura." },
      ],
    },
  },
  talents: {
    en: {
      hero: "Embedded talent. Day-one productive.",
      intro: "Staff augmentation without the staff-agency smell. Senior engineers, designers, and PMs who work inside your team, your Slack, your rituals. Pre-vetted, async-fluent, with an AI stack they already use.",
      offerings: [
        { t: "Engineers", d: "Full-stack, mobile, data, platform, ML." },
        { t: "Designers", d: "Product, brand, research, motion." },
        { t: "PMs", d: "Technical and growth-minded." },
        { t: "Squads", d: "Small pre-formed teams when you need capacity." },
      ],
      how: [
        { step: "01", t: "Brief", d: "One 30-min call. You talk, we take notes." },
        { step: "02", t: "Match", d: "2–3 shortlisted candidates within a week." },
        { step: "03", t: "Start", d: "First day in 2 weeks or less." },
        { step: "04", t: "Review", d: "Monthly check-ins. Swap anyone, no-fault." },
      ],
    },
    es: {
      hero: "Talento embebido. Productivo desde el día uno.",
      intro: "Staff augmentation sin el olor a consultora. Ingenieros, diseñadores y PMs senior que trabajan dentro de tu equipo, tu Slack, tus rituales. Pre-vetted, async-fluent, con un stack de IA que ya usan.",
      offerings: [
        { t: "Ingenieros", d: "Full-stack, mobile, data, plataforma, ML." },
        { t: "Diseñadores", d: "Producto, marca, research, motion." },
        { t: "PMs", d: "Técnicos y con mentalidad de growth." },
        { t: "Squads", d: "Equipos chicos pre-formados cuando necesitás capacidad." },
      ],
      how: [
        { step: "01", t: "Brief", d: "Una llamada de 30 min. Vos hablás, nosotros tomamos nota." },
        { step: "02", t: "Match", d: "2–3 candidatos shortlist en una semana." },
        { step: "03", t: "Start", d: "Primer día en 2 semanas o menos." },
        { step: "04", t: "Review", d: "Check-ins mensuales. Cambiás a cualquiera, sin culpa." },
      ],
    },
  },
  general: {
    en: {
      hero: "When the problem still needs a shape.",
      intro: "Strategy and foundry work for things that aren't a brief yet. We take a fuzzy signal — a regulation, a new market, an internal friction — and come back with a thesis, a prototype, and a plan for who should build what next.",
      offerings: [
        { t: "Opportunity mapping", d: "Where to spend the next six months." },
        { t: "Prototyping", d: "Spikes you can put in front of real users." },
        { t: "Venture foundry", d: "We co-build net-new products with you." },
        { t: "Advisory", d: "Fractional engagement with our principals." },
      ],
      how: [
        { step: "01", t: "Frame", d: "A week of interviews and reading." },
        { step: "02", t: "Sharpen", d: "Two or three testable theses, not ten." },
        { step: "03", t: "Prove", d: "The thinnest possible version of the winner." },
        { step: "04", t: "Handoff", d: "To your team, or to one of the other LM practices." },
      ],
    },
    es: {
      hero: "Cuando el problema aún no tiene forma definida.",
      intro: "Trabajo de estrategia y foundry para cosas que todavía no son un brief. Tomamos una señal difusa — una regulación, un mercado nuevo, una fricción interna — y volvemos con una tesis, un prototipo y un plan de quién debería construir qué después.",
      offerings: [
        { t: "Mapeo de oportunidades", d: "Dónde gastar los próximos seis meses." },
        { t: "Prototipado", d: "Spikes que podés poner frente a usuarios reales." },
        { t: "Venture foundry", d: "Co-construimos productos nuevos con vos." },
        { t: "Advisory", d: "Relación fraccional con nuestros principales." },
      ],
      how: [
        { step: "01", t: "Encuadrar", d: "Una semana de entrevistas y lectura." },
        { step: "02", t: "Afilar", d: "Dos o tres tesis testeables, no diez." },
        { step: "03", t: "Probar", d: "La versión más delgada posible del ganador." },
        { step: "04", t: "Handoff", d: "A tu equipo, o a otra práctica de LM." },
      ],
    },
  },
};

export type UIStrings = {
  nav: { work: string; services: string; approach: string; about: string; contact: string };
  cta: { book: string; work: string; services: string; talk: string; more: string; all: string };
  hero: { overline: string; t1: string; t2: string; t3: string; sub: string };
  approach: { overline: string; title: string; blurb: string };
  approachSteps: { n: string; t: string; d: string }[];
  services: { overline: string; title: string };
  work: { overline: string; title: string };
  stats: { overline: string; items: { k: string; v: string }[] };
  clients: string;
  cta_final: { o: string; t1: string; t2: string };
  footer: { contact: string; socials: string; sub: string; copy: string };
  service: { back: string; offerings: string; how: string; cta: string; next: string };
  cases: { back: string; metrics: string; approach: string; stack: string; year: string; client: string; next: string };
  terminal: {
    title: string;
    sub: string;
    lines: { who: "human" | "agent"; role: string; msg: string }[];
  };
};

export const UI: Record<Lang, UIStrings> = {
  en: {
    nav: { work: "Work", services: "Services", approach: "Approach", about: "About", contact: "Talk to us" },
    cta: { book: "Book a call", work: "See work →", services: "See services →", talk: "Let's talk", more: "Read case →", all: "All services →" },
    hero: {
      overline: "Human + AI · Digital products agency",
      t1: "We design and",
      t2: "ship software",
      t3: "that scales.",
      sub: "A hybrid team of engineers, designers, and AI agents. From prototype to production in weeks, not months.",
    },
    approach: {
      overline: "How we work",
      title: "Human judgment. Machine speed.",
      blurb: "Every engagement pairs a senior human lead with a roster of purpose-built AI agents. Humans own the opinion; machines own the grind. The output is yours.",
    },
    approachSteps: [
      { n: "01", t: "Scope", d: "Week one. We write the brief you didn't have time to." },
      { n: "02", t: "Shape", d: "Week two–three. A runnable slice, in your repo." },
      { n: "03", t: "Ship", d: "Every week after. Behind flags, with evals." },
      { n: "04", t: "Sustain", d: "Handoff, retain, or both. Your call." },
    ],
    services: { overline: "Five practices, one team", title: "What we build with you." },
    work: { overline: "Selected work", title: "Products in production." },
    stats: {
      overline: "Since 2021",
      items: [
        { k: "Products shipped", v: "48" },
        { k: "Clients", v: "27" },
        { k: "Countries", v: "9" },
        { k: "Avg. time to first ship", v: "19d" },
      ],
    },
    clients: "Trusted by",
    cta_final: { o: "Let's start", t1: "Shall we build", t2: "something together?" },
    footer: { contact: "Contact", socials: "Socials", sub: "Buenos Aires · Remote", copy: "© 2026 Logical Minds" },
    service: { back: "← All services", offerings: "What we offer", how: "How it goes", cta: "Start a project →", next: "Next practice →" },
    cases: { back: "← All work", metrics: "Results", approach: "How we got there", stack: "Stack", year: "Year", client: "Client", next: "Next case →" },
    terminal: {
      title: "lm/status",
      sub: "live",
      lines: [
        { who: "human", role: "eng lead", msg: "merging feature/onboarding-v3" },
        { who: "agent", role: "reviewer", msg: "14 files · 0 blockers · 2 nits" },
        { who: "agent", role: "evals", msg: "offline eval: 94.2% → 96.8%" },
        { who: "human", role: "designer", msg: "approved empty state" },
        { who: "agent", role: "ops", msg: "canary 5% → 50%, p95 84ms" },
        { who: "human", role: "pm", msg: "shipping to 100% at 18:00" },
      ],
    },
  },
  es: {
    nav: { work: "Trabajo", services: "Servicios", approach: "Método", about: "Equipo", contact: "Hablemos" },
    cta: { book: "Agendar llamada", work: "Ver casos →", services: "Ver servicios →", talk: "Hablemos", more: "Ver caso →", all: "Todos los servicios →" },
    hero: {
      overline: "Human + AI · Agencia de productos digitales",
      t1: "Diseñamos y",
      t2: "desarrollamos",
      t3: "productos que escalan.",
      sub: "Un equipo híbrido de ingenieros, diseñadores y agentes de IA. Del prototipo a producción en semanas, no meses.",
    },
    approach: {
      overline: "Cómo trabajamos",
      title: "Juicio humano. Velocidad de máquina.",
      blurb: "Cada engagement combina un lead humano senior con una flota de agentes de IA hechos a medida. Los humanos tienen la opinión; las máquinas tienen el grind. El resultado es tuyo.",
    },
    approachSteps: [
      { n: "01", t: "Scope", d: "Semana uno. Escribimos el brief que no tuviste tiempo de hacer." },
      { n: "02", t: "Shape", d: "Semana dos–tres. Una tajada ejecutable, en tu repo." },
      { n: "03", t: "Ship", d: "Cada semana después. Detrás de flags, con evals." },
      { n: "04", t: "Sustain", d: "Handoff, retainer, o ambos. Tu decisión." },
    ],
    services: { overline: "Cinco prácticas, un equipo", title: "Lo que construimos contigo." },
    work: { overline: "Trabajo seleccionado", title: "Productos en producción." },
    stats: {
      overline: "Desde 2021",
      items: [
        { k: "Productos enviados", v: "48" },
        { k: "Clientes", v: "27" },
        { k: "Países", v: "9" },
        { k: "Tiempo a primer ship", v: "19d" },
      ],
    },
    clients: "Clientes",
    cta_final: { o: "Empecemos", t1: "¿Construimos", t2: "algo juntos?" },
    footer: { contact: "Contacto", socials: "Redes", sub: "Buenos Aires · Remote", copy: "© 2026 Logical Minds" },
    service: { back: "← Todos los servicios", offerings: "Qué ofrecemos", how: "Cómo lo hacemos", cta: "Iniciar un proyecto →", next: "Siguiente práctica →" },
    cases: { back: "← Todo el trabajo", metrics: "Resultados", approach: "Cómo lo hicimos", stack: "Stack", year: "Año", client: "Cliente", next: "Siguiente caso →" },
    terminal: {
      title: "lm/status",
      sub: "live",
      lines: [
        { who: "human", role: "eng lead", msg: "mergeando feature/onboarding-v3" },
        { who: "agent", role: "reviewer", msg: "14 archivos · 0 bloqueos · 2 nits" },
        { who: "agent", role: "evals", msg: "eval offline: 94.2% → 96.8%" },
        { who: "human", role: "designer", msg: "empty state aprobado" },
        { who: "agent", role: "ops", msg: "canary 5% → 50%, p95 84ms" },
        { who: "human", role: "pm", msg: "shipping al 100% a las 18:00" },
      ],
    },
  },
};

export const CLIENTS = ["FINNLY", "TRENZA", "CUENCA", "NUBEX", "LUMA", "ATRIA", "PÁRAMO", "VOLTA"];
