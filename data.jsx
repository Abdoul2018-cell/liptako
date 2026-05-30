// Shared data, icons, hooks
const SECTORS = [
  {
    id: "affaires",
    short: "Affaires Étrangères",
    long: "Ministère des Affaires Étrangères",
    motto: "Diplomatie aujourd'hui, partenariats pour demain.",
    body: "Au service de la voix du Niger dans le concert des nations. Chaque bouteille porte la signature institutionnelle de la République, sur les tables de négociation comme dans les chancelleries.",
    palette: { bg: "#0d2740", sidebar: "#0b1f33", accent: "#C9A24A", text: "#ffffff", muted: "rgba(255,255,255,0.7)" },
    pillars: [
      { t: "Diplomatie", d: "Représenter et défendre les intérêts du Niger." },
      { t: "Coopération", d: "Bâtir des partenariats mutuellement bénéfiques." },
      { t: "Ouverture", d: "Promouvoir le Niger sur la scène internationale." },
      { t: "Excellence", d: "Agir avec professionnalisme et intégrité." }
    ],
    img: "assets/bottle-affaires.jpeg",
    cat: "Ministère",
    code: "AFF / 50CL"
  },
  {
    id: "defense",
    short: "Défense",
    long: "Ministère de la Défense Nationale",
    motto: "Protéger aujourd'hui pour garantir demain.",
    body: "L'eau du devoir. Servie aux états-majors, aux casernes officielles et lors des cérémonies de la République. Sobre, exigeante, à l'image de ceux qui servent.",
    palette: { bg: "#0a1a2e", sidebar: "#081428", accent: "#7DA9D6", text: "#ffffff", muted: "rgba(255,255,255,0.7)" },
    pillars: [
      { t: "Sécurité", d: "Assurer la protection du territoire et des citoyens." },
      { t: "Stratégie", d: "Anticiper et réagir avec efficacité." },
      { t: "Engagement", d: "Servir la nation avec loyauté." },
      { t: "Paix", d: "Œuvrer pour la stabilité et la cohésion." }
    ],
    img: "assets/bottle-defense.jpeg",
    cat: "Ministère",
    code: "DEF / 50CL"
  },
  {
    id: "justice",
    short: "Justice",
    long: "Ministère de la Justice",
    motto: "Réaliser aujourd'hui une justice équitable pour demain.",
    body: "Au cœur des palais, des audiences et des congrès judiciaires. Une eau qui accompagne la délibération, la rigueur et la confiance publique.",
    palette: { bg: "#0e2138", sidebar: "#0a1a30", accent: "#C9A24A", text: "#ffffff", muted: "rgba(255,255,255,0.72)" },
    pillars: [
      { t: "Équité", d: "Garantir l'égalité de tous devant la loi." },
      { t: "Intégrité", d: "Agir avec honnêteté et impartialité." },
      { t: "Confiance", d: "Renforcer le lien entre l'État et les citoyens." },
      { t: "Droits", d: "Protéger les libertés fondamentales." }
    ],
    img: "assets/bottle-justice.jpeg",
    cat: "Ministère",
    code: "JUS / 50CL"
  },
  {
    id: "education",
    short: "Éducation",
    long: "Ministère de l'Éducation Nationale",
    motto: "Instruire aujourd'hui pour bâtir demain.",
    body: "Pour les rentrées solennelles, les jurys d'examen, les conférences pédagogiques. Une eau qui hydrate la nation apprenante.",
    palette: { bg: "#0a3a22", sidebar: "#082c1a", accent: "#86C26A", text: "#ffffff", muted: "rgba(255,255,255,0.72)" },
    pillars: [
      { t: "Éducation", d: "Garantir un accès équitable et de qualité." },
      { t: "Savoir", d: "Promouvoir la connaissance et l'excellence." },
      { t: "Égalité", d: "Assurer l'inclusion et l'égalité des chances." },
      { t: "Innovation", d: "Encourager l'innovation pour l'avenir." }
    ],
    img: "assets/bottle-education.jpeg",
    cat: "Ministère",
    code: "EDU / 50CL"
  },
  {
    id: "energie",
    short: "Énergie",
    long: "Ministère de l'Énergie",
    motto: "Énergiser aujourd'hui pour un avenir durable.",
    body: "Présente sur les chantiers, les inaugurations et les forums stratégiques du secteur énergétique. Une eau qui partage la même ambition : durer.",
    palette: { bg: "#0a1f30", sidebar: "#081726", accent: "#E0B83A", text: "#ffffff", muted: "rgba(255,255,255,0.72)" },
    pillars: [
      { t: "Production", d: "Une production énergétique fiable et durable." },
      { t: "Durabilité", d: "Promouvoir les énergies renouvelables." },
      { t: "Innovation", d: "Encourager l'innovation énergétique." },
      { t: "Accès", d: "Rendre l'énergie accessible à tous." }
    ],
    img: "assets/bottle-energie.jpeg",
    cat: "Ministère",
    code: "ENR / 50CL"
  },
  {
    id: "interieur",
    short: "Intérieur",
    long: "Ministère de l'Intérieur",
    motto: "Assurer aujourd'hui la sécurité de demain.",
    body: "Au service des préfectures, gouvernorats et forces de la République. Une eau de proximité, partout présente.",
    palette: { bg: "#0d2a48", sidebar: "#0a2238", accent: "#7DA9D6", text: "#ffffff", muted: "rgba(255,255,255,0.72)" },
    pillars: [
      { t: "Sécurité", d: "Protéger les personnes et les biens." },
      { t: "Proximité", d: "Être à l'écoute des citoyens." },
      { t: "Cohésion", d: "Renforcer l'unité nationale." },
      { t: "Équité", d: "Garantir le respect des droits." }
    ],
    img: "assets/bottle-interieur.jpeg",
    cat: "Ministère",
    code: "INT / 50CL"
  },
  {
    id: "atlantique",
    short: "Banque Atlantique",
    long: "Banque Atlantique",
    motto: "Notre engagement, votre confiance.",
    body: "Dans les agences premium, les espaces VIP et les comités exécutifs. Une eau partenaire des conversations qui engagent l'avenir financier de la région.",
    palette: { bg: "#1a1a1a", sidebar: "#0e0e0e", accent: "#F26B1F", text: "#ffffff", muted: "rgba(255,255,255,0.72)" },
    pillars: [
      { t: "Sécurité", d: "Transactions protégées, données préservées." },
      { t: "Performance", d: "Solutions innovantes pour vos ambitions." },
      { t: "Proximité", d: "À vos côtés, partout où vous allez." },
      { t: "Responsabilité", d: "Un impact positif pour demain." }
    ],
    img: "assets/bottle-atlantique.jpeg",
    cat: "Finance",
    code: "ATL / 50CL"
  },
  {
    id: "bia",
    short: "BIA Niger",
    long: "Banque Internationale pour l'Afrique au Niger",
    motto: "Notre expertise, votre réussite.",
    body: "Une bouteille prisme, taillée comme une signature. Pensée pour les salons d'accueil prestige et les rendez-vous d'investissement.",
    palette: { bg: "#f4f4f4", sidebar: "#e7e7e7", accent: "#1f3b8b", text: "#0b1f2e", muted: "rgba(11,31,46,0.72)" },
    pillars: [
      { t: "Sécurité", d: "Vos transactions entre de bonnes mains." },
      { t: "Performance", d: "Solutions adaptées à vos ambitions." },
      { t: "Proximité", d: "À vos côtés, à chaque étape." },
      { t: "Responsabilité", d: "Agir pour un impact durable." }
    ],
    img: "assets/bottle-bia.jpeg",
    cat: "Finance",
    code: "BIA / 50CL"
  },
  {
    id: "sonibank",
    short: "Sonibank",
    long: "Sonibank",
    motto: "Notre engagement, votre confiance.",
    body: "Une eau au quotidien des banquiers de référence. Filets bleus subtils, prisme architectural, signature institutionnelle.",
    palette: { bg: "#f1f4f8", sidebar: "#e3e8ee", accent: "#1e4b9a", text: "#0b1f2e", muted: "rgba(11,31,46,0.72)" },
    pillars: [
      { t: "Sécurité", d: "Standards les plus exigeants." },
      { t: "Performance", d: "Solutions pour vos projets." },
      { t: "Proximité", d: "À vos côtés, partout où vous êtes." },
      { t: "Confiance", d: "Une relation durable." }
    ],
    img: "assets/bottle-sonibank.jpeg",
    cat: "Finance",
    code: "SNB / 50CL"
  },
  {
    id: "radisson",
    short: "Radisson Hôtel",
    long: "Radisson — Niamey",
    motto: "L'expérience hôtelière dans chaque détail.",
    body: "Sur les tables de chevet, en chambre VIP, en suite présidentielle. Une eau qui complète l'art du service hôtelier de niveau international.",
    palette: { bg: "#f7f8fb", sidebar: "#e8eaf1", accent: "#0c2461", text: "#0b1f2e", muted: "rgba(11,31,46,0.72)" },
    pillars: [
      { t: "Qualité Premium", d: "Eau de haute qualité pour votre bien-être." },
      { t: "Excellence", d: "Standards élevés pour une expérience unique." },
      { t: "Service", d: "Attentif et personnalisé, à tout moment." },
      { t: "Confiance", d: "Transparence et sécurité au cœur." }
    ],
    img: "assets/bottle-radisson.jpeg",
    cat: "Hôtellerie",
    code: "RDS / 50CL"
  },
  {
    id: "sonidep",
    short: "Sonidep",
    long: "Société Nigérienne des Produits Pétroliers",
    motto: "L'énergie du Niger, en mouvement.",
    body: "Sur chaque station, dans chaque dépôt, à bord des camions-citernes. Une eau pour les équipes qui font circuler l'énergie du Niger, conditionnée aux couleurs du leader pétrolier national.",
    palette: { bg: "#eaf3fb", sidebar: "#d8e8f7", accent: "#1b6ec2", text: "#0b1f2e", muted: "rgba(11,31,46,0.72)" },
    pillars: [
      { t: "Approvisionnement", d: "Sécuriser la chaîne pétrolière nationale." },
      { t: "Qualité", d: "Standards techniques les plus exigeants." },
      { t: "Proximité", d: "Servir chaque région, chaque station." },
      { t: "Durabilité", d: "Préparer la transition énergétique du Niger." }
    ],
    img: "assets/bottle-sonidep.jpeg",
    cat: "Énergie · Pétrolier",
    code: "SND / 50CL"
  }
];

const PRODUCT_GAMME = [
  {
    name: "Liptako Express",
    vol: "33cl · pratique",
    desc: "Format poche pour déplacements officiels, salons et événements brefs.",
    price: "350",
    img: "assets/bottle-defense.jpeg",
    tag: "F-01"
  },
  {
    name: "Liptako Standard",
    vol: "50cl · usage quotidien",
    desc: "Le format de référence des conseils, comités et réunions ministérielles.",
    price: "500",
    img: "assets/bottle-interieur.jpeg",
    tag: "F-02"
  },
  {
    name: "Liptako Famille",
    vol: "1,5L · partage",
    desc: "Pour tables d'hôtes, séminaires résidentiels et longues sessions de travail.",
    price: "1 200",
    img: "assets/bottle-sonidep.jpeg",
    tag: "F-03"
  },
  {
    name: "Liptako Institutionnel",
    vol: "50cl · personnalisé",
    desc: "Étiquetage sur-mesure aux couleurs de votre institution. Tirage minimum 5 000 unités.",
    price: "Sur devis",
    img: "assets/bottle-affaires.jpeg",
    tag: "F-04"
  },
  {
    name: "Liptako Hôtel",
    vol: "50cl · prisme",
    desc: "Bouteille architecturale pour chambres, suites et restaurants d'excellence.",
    price: "Sur devis",
    img: "assets/bottle-radisson.jpeg",
    tag: "F-05"
  },
  {
    name: "Liptako Prestige",
    vol: "75cl · diamant",
    desc: "Cérémonies d'État, sommets internationaux, événements de gala. Édition numérotée.",
    price: "Sur devis",
    img: "assets/bottle-bia.jpeg",
    tag: "F-06"
  }
];

const NIGER_CHAPTERS = [
  { t: "La source", d: "Captée à plus de 200 mètres dans la nappe aquifère du Liptako-Gourma, à l'abri des contaminations de surface.", code: "01 / SOURCE" },
  { t: "La pureté", d: "Faiblement minéralisée. Équilibre testé en laboratoire indépendant, conforme aux normes OMS et UEMOA.", code: "02 / ANALYSE" },
  { t: "La filtration", d: "Sept étapes de filtration, dont une finition à charbon actif et UV. Aucun additif. Aucun traitement chimique.", code: "03 / PROCÉDÉ" },
  { t: "L'embouteillage", d: "Ligne automatisée, environnement à pression positive. Traçabilité par lot et signature numérique.", code: "04 / USINE" },
  { t: "La personnalisation", d: "Studio de design intégré. Charte institutionnelle respectée. Étiquettes imprimées en HD, vernis sélectif possible.", code: "05 / ATELIER" },
  { t: "La livraison VIP", d: "Logistique dédiée, palettisation discrète, livraison aux conditions des protocoles officiels.", code: "06 / SERVICE" }
];

const FORMATS = [
  { id: "express", name: "Express", sub: "33 cl · poche", meta: "F-01" },
  { id: "standard", name: "Standard", sub: "50 cl · classique", meta: "F-02" },
  { id: "famille", name: "Famille", sub: "1,5 L · partage", meta: "F-03" },
  { id: "prestige", name: "Prestige", sub: "75 cl · diamant", meta: "F-06" }
];

const CAP_COLORS = [
  { id: "navy", name: "Bleu nuit", hex: "#0B1F2E" },
  { id: "gold", name: "Or royal", hex: "#B8860B" },
  { id: "emerald", name: "Vert profond", hex: "#0A5C3A" },
  { id: "silver", name: "Argent", hex: "#C8CCD2" },
  { id: "white", name: "Blanc pur", hex: "#FFFFFF" },
  { id: "amber", name: "Ambre", hex: "#D4A84A" },
  { id: "orange", name: "Orange", hex: "#F26B1F" },
  { id: "ink", name: "Encre", hex: "#000000" }
];

const QUANTITIES = [
  { id: "q1", label: "Échantillon", sub: "100 unités", meta: "ESS" },
  { id: "q2", label: "Pilote", sub: "5 000 unités", meta: "PIL" },
  { id: "q3", label: "Série", sub: "25 000 unités", meta: "SER" },
  { id: "q4", label: "Production", sub: "100 000+ unités", meta: "PRO" }
];

Object.assign(window, {
  SECTORS, PRODUCT_GAMME, NIGER_CHAPTERS, FORMATS, CAP_COLORS, QUANTITIES
});
