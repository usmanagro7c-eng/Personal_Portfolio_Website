export const socials = {
  email: 'usmanamjad495@gmail.com',
  github: 'https://github.com/MaAn-41',
  engineering: 'https://github.com/usmanagro7c-eng',
  linkedin: 'https://www.linkedin.com/in/usmanamjad41/',
  medium: 'https://medium.com/@usmanamjad495',
};

export const categories = [
  'All projects',
  'AI & ML',
  'Enterprise / ERP',
  'Full-Stack & Mobile',
] as const;

export type Category = (typeof categories)[number];

export const globalWorkSignals = {
  timezoneOverlap: 'Flexible overlap across US (EST/PST), UK/GMT, and Gulf (GST) timezones',
  contractStatus: 'Open to Full-Time Remote, International Contract (B2B / W-8BEN), and Global Relocation',
  languages: 'English (Fluent / Professional Working Proficiency), Urdu (Native)',
  responseTime: '< 12h async response guarantee',
};

export interface CaseStudy {
  challenge: string;
  architecture: string;
  obstacles: string;
  outcome: string;
  metrics: { label: string; value: string }[];
}

export interface Project {
  title: string;
  subtitle: string;
  category: 'AI & ML' | 'Enterprise / ERP' | 'Full-Stack & Mobile';
  kind: 'sign' | 'stock' | 'erp' | 'ai';
  label: string;
  description: string;
  tech: string[];
  impact: string;
  repo: string;
  live?: string;
  featured?: boolean;
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  {
    title: 'Stockly',
    subtitle: 'Your inventory. Always in sync.',
    category: 'Full-Stack & Mobile',
    kind: 'stock',
    label: 'OFFLINE-FIRST INVENTORY',
    description:
      'Architected an offline-first inventory & POS platform delivering sub-15ms query speeds, zero-data-loss IndexedDB transactions, and Google Sheets OAuth cloud reconciliation.',
    tech: ['TanStack Start', 'TypeScript', 'Dexie (IndexedDB)', 'Capacitor', 'Google Sheets API'],
    impact: '< 15ms latency · 100% offline durability',
    repo: 'https://github.com/usmanagro7c-eng/Stockly',
    live: 'https://stocklyfinance.vercel.app/',
    featured: true,
    caseStudy: {
      challenge:
        'Field inventory reps and retail cashiers frequently operate in environments with erratic or zero cellular connectivity, leading to dropped orders, inventory mismatch, and manual reconciliation overhead.',
      architecture:
        'Engineered an offline-first architecture where IndexedDB (via Dexie) serves as the persistent local single source of truth. Mutations queue locally and synchronize bidirectionally with Google Sheets via OAuth 2.0 upon reconnection.',
      obstacles:
        'Solved multi-device race conditions and out-of-order offline edits by implementing deterministic optimistic UI updates combined with a FIFO sync reconciliation queue.',
      outcome:
        'Zero network latency during scanning operations (< 15ms local response), 100% offline data durability, and automated cloud ledger synchronization without dedicated server costs.',
      metrics: [
        { label: 'Local Query Latency', value: '< 15ms' },
        { label: 'Offline Availability', value: '100%' },
        { label: 'Sync Data Loss', value: '0%' },
        { label: 'Cloud Infrastructure Cost', value: '$0 / mo' },
      ],
    },
  },
  {
    title: 'Shopify AI Assistant',
    subtitle: 'Support that never sleeps.',
    category: 'AI & ML',
    kind: 'ai',
    label: 'INTELLIGENT CUSTOMER SUPPORT',
    description:
      'Engineered an autonomous e-commerce customer support pipeline resolving tier-1 inquiries in < 3s with real-time Shopify catalog retrieval and intent routing.',
    tech: ['TypeScript', 'Node.js', 'Express', 'LLM API', 'Shopify API'],
    impact: '24/7 autonomous support · < 3s avg resolution',
    repo: 'https://github.com/usmanagro7c-eng/Shopify-Chatbot',
    live: 'https://shopify-chatbot-seven.vercel.app',
    featured: true,
    caseStudy: {
      challenge:
        'High cart abandonment and customer churn driven by 12+ hour support response delays on high-volume Shopify stores during peak promotional periods.',
      architecture:
        'High-throughput Node.js microservice integrating real-time Shopify GraphQL webhooks, semantic product search, and fine-tuned prompt scaffolding with strict inventory constraints.',
      obstacles:
        'Prevented LLM hallucination of outdated stock or incorrect pricing by grounding every generative response against live Shopify SKU inventory before dispatch.',
      outcome:
        'Cut average initial inquiry resolution time from hours to under 3 seconds, handling 80%+ of repetitive status and order queries autonomously.',
      metrics: [
        { label: 'Avg Resolution Time', value: '< 3s' },
        { label: 'Tier-1 Deflection Rate', value: '80%+' },
        { label: 'Store Availability', value: '24/7/365' },
      ],
    },
  },
  {
    title: 'Medical AI Assistant',
    subtitle: 'Context-aware clinical reasoning.',
    category: 'AI & ML',
    kind: 'ai',
    label: 'RETRIEVAL-AUGMENTED REASONING',
    description:
      'Engineered a clinical reasoning copilot using Hybrid RAG (BM25 + ChromaDB) over MIMIC-IV clinical records, cutting chart synthesis time by 65% with 100% source-anchored citations.',
    tech: ['Python', 'Streamlit', 'RAG', 'LangChain', 'ChromaDB'],
    impact: '65% faster chart review · 100% citation anchoring',
    repo: 'https://github.com/MaAn-41/RAG-for-Diagnostic-Reasoning-for-Clinical-Notes',
    live: 'https://rag-for-diagnostic-reasoning-for-clinical-notes-bspwfhgsmt8mkj.streamlit.app/',
    featured: true,
    caseStudy: {
      challenge:
        'Clinicians review dense, unstructured, multi-page patient charts under intense time pressure, risking overlooked lab interactions and delayed differential diagnosis.',
      architecture:
        'Hybrid Retrieval-Augmented Generation pipeline combining dense vector embeddings with BM25 sparse keyword matching, reranked for medical terminology fidelity, outputting structured SOAP reports.',
      obstacles:
        'Eliminated diagnostic hallucinations by implementing deterministic citation constraints requiring the model to map every clinical assertion directly to source document line numbers.',
      outcome:
        'Reduced diagnostic chart synthesis time by 65% while providing complete audit trails for medical professional verification.',
      metrics: [
        { label: 'Synthesis Time Reduction', value: '65%' },
        { label: 'Source Verification', value: '100%' },
        { label: 'Retrieval Strategy', value: 'Hybrid Dense+BM25' },
      ],
    },
  },
  {
    title: 'Pseudocode → C++ Converter',
    subtitle: 'Translating algorithmic thoughts to code.',
    category: 'AI & ML',
    kind: 'ai',
    label: 'NEURAL CODE SYNTHESIS',
    description:
      'Transformer-powered code converter translating pseudocode algorithms into optimized, type-safe C++ programs and vice versa in real time.',
    tech: ['Transformers', 'Hugging Face', 'Streamlit', 'C++', 'Python'],
    impact: 'Bidirectional algorithm translation',
    repo: 'https://github.com/MaAn-41/Pseudocode-C-Converter',
    live: 'https://sufyanspseudo-code-to-c-code.streamlit.app/',
  },
  {
    title: 'TCS Result Card System',
    subtitle: 'Automated academic reporting.',
    category: 'Full-Stack & Mobile',
    kind: 'stock',
    label: 'ACADEMIC REPORTING PLATFORM',
    description:
      'An automated student result card generation platform for The Country School featuring dynamic grade calculations, PDF report exports, and verified score formatting.',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    impact: 'Instant dynamic report generation',
    repo: 'https://github.com/usmanagro7c-eng/Result-Card-Format',
    live: 'https://tcsresultcard.vercel.app',
  },
  {
    title: 'Deaf-ED',
    subtitle: 'Making communication accessible.',
    category: 'AI & ML',
    kind: 'sign',
    label: 'SIGN LANGUAGE → CONNECTION',
    description:
      'Engineered real-time Pakistani Sign Language (PSL) recognition achieving 90%+ accuracy with 543-point MediaPipe landmark tracking and Bi-LSTM temporal sequence modeling.',
    tech: ['MERN', 'OpenCV', 'Bi-LSTM', 'React Native', 'MediaPipe'],
    impact: '90%+ recognition accuracy · < 45ms inference',
    repo: 'https://github.com/MaAn-41/Deaf-Ed',
    featured: true,
    caseStudy: {
      challenge:
        '1.2+ million deaf individuals in Pakistan lack accessible bilingual digital tools; Pakistani Sign Language (PSL) features unique spatio-temporal gestures with very scarce annotated training datasets.',
      architecture:
        'Dual-stream computer vision pipeline: MediaPipe Holistic extracts 543 spatial coordinates (face, pose, hands), feeding into a Bidirectional LSTM neural network for temporal gesture classification running on React Native.',
      obstacles:
        'Heavy raw video processing bottlenecked mobile CPUs. Solved by replacing pixel convolutions with lightweight normalized geometric coordinate vectors anchored to wrist positions, achieving 25 FPS on commodity smartphones.',
      outcome:
        'Achieved 90%+ recognition accuracy on live PSL gesture testing with sub-45ms inference latency. Awarded top honors as FAST-NUCES Final Year Project.',
      metrics: [
        { label: 'Recognition Accuracy', value: '90%+' },
        { label: 'Inference Latency', value: '< 45ms' },
        { label: 'Landmarks Tracked', value: '543 points' },
        { label: 'Processing Framerate', value: '25+ FPS' },
      ],
    },
  },
  {
    title: 'ERPNext Document Verification Portal',
    subtitle: 'Trust, verified in an instant.',
    category: 'Enterprise / ERP',
    kind: 'erp',
    label: 'CRYPTOGRAPHIC VERIFICATION',
    description:
      'Engineered tamper-proof cryptographic QR verification for Agrovisions, eliminating document fraud across 500+ commercial shipments and cutting manual gate audits by 40%.',
    tech: ['ERPNext', 'Frappe', 'Python', 'TypeScript', 'QR Cryptography'],
    impact: '500+ commercial shipments secured · 40% audit speedup',
    repo: 'https://github.com/usmanagro7c-eng/ERPNext-Document-Verification',
    featured: true,
    caseStudy: {
      challenge:
        'Commercial delivery challans, seed test certificates, and tax invoices were susceptible to physical alteration and unauthorized duplication during transit across supply chain checkpoints.',
      architecture:
        'Frappe backend hook generates HMAC-SHA256 signature from canonical document records, encoding signed validation tokens into high-density dynamic QR codes stamped on invoices. The public verification microservice validates tokens without exposing internal database schemas.',
      obstacles:
        'Warehouse gate inspectors required instant verification in low-bandwidth agricultural regions without internal ERP system credentials, while preventing replay attacks on expired paperwork.',
      outcome:
        'Protected 500+ commercial agricultural shipments with zero security breaches, reducing gate inspection delays by 40% and eliminating counterfeit documentation.',
      metrics: [
        { label: 'Documents Secured', value: '500+' },
        { label: 'Verification Time', value: '< 2s' },
        { label: 'Audit Speedup', value: '40%' },
        { label: 'Fraud Incidents', value: '0' },
      ],
    },
  },
  {
    title: 'ERP Task & Notification Suite',
    subtitle: 'Automated enterprise workflows.',
    category: 'Enterprise / ERP',
    kind: 'erp',
    label: 'WORKFLOW AUTOMATION',
    description:
      'A custom Frappe/ERPNext notification engine automating scheduled email digests, daily employee ToDo reports, and escalation alerts for overdue tasks.',
    tech: ['Frappe', 'ERPNext', 'Python', 'Jinja2', 'Cron'],
    impact: 'Zero missed SLA task escalations',
    repo: 'https://github.com/usmanagro7c-eng/ERP-Todo-Notification-Template',
  },
  {
    title: 'ERPNext Repacking Interface',
    subtitle: 'Warehouse operations made effortless.',
    category: 'Enterprise / ERP',
    kind: 'erp',
    label: 'MANUFACTURING & BATCH OPERATIONS',
    description:
      'An optimized Frappe/ERPNext production interface streamlining multi-item repack entries, batch management, and automated stock ledger updates.',
    tech: ['Frappe', 'ERPNext', 'JavaScript', 'Python', 'MariaDB'],
    impact: '60% faster warehouse batch entries',
    repo: 'https://github.com/usmanagro7c-eng/Repacking-Page-ERP',
  },
  {
    title: 'Oxigen E-Commerce Platform',
    subtitle: 'Commerce meets enterprise.',
    category: 'Full-Stack & Mobile',
    kind: 'stock',
    label: 'CONNECTED COMMERCE',
    description:
      'A high-performance retail storefront and admin portal with live multi-warehouse ERPNext synchronization and real-time inventory tracking.',
    tech: ['React', 'Node.js', 'Express', 'ERPNext API', 'TypeScript'],
    impact: 'Live multi-warehouse synchronization',
    repo: 'https://github.com/usmanagro7c-eng/Oxigen-Website',
  },
  {
    title: 'Gemini Web 2 API',
    subtitle: 'One gateway. More possibilities.',
    category: 'Full-Stack & Mobile',
    kind: 'ai',
    label: 'OPENAI-COMPATIBLE GATEWAY',
    description:
      'A high-throughput API gateway exposing Google Gemini AI capabilities through familiar, OpenAI-compatible REST endpoints for drop-in tooling.',
    tech: ['Go', 'TypeScript', 'Node.js', 'REST API'],
    impact: 'Drop-in OpenAI-compatible integration',
    repo: 'https://github.com/usmanagro7c-eng/Gemini-Web-2-API',
  },
  {
    title: 'Shayar AI',
    subtitle: 'Classical poetry, reimagined.',
    category: 'AI & ML',
    kind: 'ai',
    label: 'LANGUAGE × DEEP LEARNING',
    description:
      'A classical Roman Urdu poetry generator trained with deep bidirectional recurrent neural networks (Bi-LSTM / GRU) and beam search decoders.',
    tech: ['Python', 'Bidirectional LSTM', 'GRU', 'NLP', 'TensorFlow'],
    impact: 'Urdu poetry through neural networks',
    repo: 'https://github.com/MaAn-41/Shayar-AI',
  },
  {
    title: 'Emoji Math Solver',
    subtitle: 'Visual reasoning with parameter-efficient tuning.',
    category: 'AI & ML',
    kind: 'ai',
    label: 'PARAMETER-EFFICIENT FINE-TUNING',
    description:
      'Fine-tuned large language model using LoRA / PEFT adapter weights to reason through and solve multi-step visual emoji arithmetic equations.',
    tech: ['PyTorch', 'LoRA / PEFT', 'Hugging Face', 'Transformers'],
    impact: 'High-accuracy symbolic math reasoning',
    repo: 'https://github.com/MaAn-41/Emoji_Math_Solver',
  },
  {
    title: 'Math Meme Repair',
    subtitle: 'Correcting misconceptions with reasoning LLMs.',
    category: 'AI & ML',
    kind: 'ai',
    label: 'REASONING ERROR CORRECTION',
    description:
      'Fine-tunes the DeepSeek Math 7B Instruct model to detect, explain, and correct viral math fallacy memes and common algebraic misconceptions.',
    tech: ['DeepSeek Math 7B', 'Python', 'LoRA / PEFT', 'NLP'],
    impact: 'Zero-shot math fallacy explanation',
    repo: 'https://github.com/MaAn-41/Math-Meme-Repair',
  },
  {
    title: 'Dream Tune',
    subtitle: 'AI-powered soothing melodies for infants.',
    category: 'AI & ML',
    kind: 'ai',
    label: 'GENERATIVE AUDIO SYNTHESIS',
    description:
      'Generative audio synthesis model creating harmonic lullaby melodies and ambient soothing frequencies tailored for infant sleep conditioning.',
    tech: ['Python', 'Audio Processing', 'Neural Audio Synthesis', 'PyTorch'],
    impact: 'Procedural harmonic melody generation',
    repo: 'https://github.com/MaAn-41/Dream_Tune',
  },
  {
    title: 'AI Rap & Poetry Generator',
    subtitle: 'Multimodal voice-to-verse expression.',
    category: 'AI & ML',
    kind: 'ai',
    label: 'MULTIMODAL SPEECH-TO-VERSE',
    description:
      'An end-to-end creative pipeline transcribing spoken audio with Whisper, generating rhyming poetic verses, and synthesizing rhythmic speech delivery.',
    tech: ['Whisper', 'GPT-4', 'Python', 'TTS', 'Audio Processing'],
    impact: 'End-to-end voice-to-rhyme pipeline',
    repo: 'https://github.com/MaAn-41/AI-Powered-Rap-Poetry-Generator',
  },
  {
    title: 'Math Riddle Generator',
    subtitle: 'Interactive puzzle generation.',
    category: 'AI & ML',
    kind: 'ai',
    label: 'GENERATIVE PUZZLE ENGINE',
    description:
      'A Streamlit web application powered by fine-tuned GPT-2 that creates novel mathematical riddles, clues, and verified explanations on demand.',
    tech: ['GPT-2', 'Streamlit', 'PyTorch', 'Hugging Face'],
    impact: 'Instant contextual math puzzles',
    repo: 'https://github.com/MaAn-41/Math_Riddle_Generator',
  },
  {
    title: 'Sign Language Gesture Recognition',
    subtitle: 'Real-time vision landmark detection.',
    category: 'AI & ML',
    kind: 'sign',
    label: 'COMPUTER VISION & LANDMARKS',
    description:
      'A computer vision recognition pipeline tracking 21 hand landmarks in real-time to translate gestures and spatial fingerspelling.',
    tech: ['OpenCV', 'MediaPipe', 'Python', 'Scikit-learn'],
    impact: 'Real-time landmark tracking',
    repo: 'https://github.com/MaAn-41/Sign-Language-Gesture-Recognition',
  },
  {
    title: 'Autonomous Delivery Robot',
    subtitle: 'Dynamic grid pathfinding simulation.',
    category: 'AI & ML',
    kind: 'ai',
    label: 'AUTONOMOUS PATHFINDING',
    description:
      'A grid-based navigation and delivery simulation using Pygame with dynamic A* pathfinding, real-time obstacle avoidance, and destination routing.',
    tech: ['Python', 'Pygame', 'A* Search', 'Pathfinding Algorithms'],
    impact: 'Dynamic obstacle avoidance',
    repo: 'https://github.com/MaAn-41/-Autonomous-Robot-Delivering-',
  },
  {
    title: 'Royal Décor Storefront',
    subtitle: 'Home accessories and furniture online.',
    category: 'Full-Stack & Mobile',
    kind: 'stock',
    label: 'RETAIL E-COMMERCE',
    description:
      'An interactive e-commerce platform for home accessories and bespoke furniture with responsive design, product filtering, and cart checkout.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Responsive UI'],
    impact: 'Dynamic catalogue & cart management',
    repo: 'https://github.com/MaAn-41/Royal-Decore',
  },
  {
    title: 'Event Horizon',
    subtitle: 'Streamlined event organization & ticketing.',
    category: 'Full-Stack & Mobile',
    kind: 'stock',
    label: 'EVENT MANAGEMENT SUITE',
    description:
      'An event planning and ticket booking web portal enabling real-time RSVP management, venue scheduling, and attendee coordination.',
    tech: ['Node.js', 'Express', 'EJS', 'MongoDB', 'Bootstrap'],
    impact: 'End-to-end event ticketing & scheduling',
    repo: 'https://github.com/MaAn-41/Event-Horizon',
  },
  {
    title: 'Battleship Strategy Engine',
    subtitle: 'Turn-based tactical naval warfare.',
    category: 'Full-Stack & Mobile',
    kind: 'ai',
    label: 'TACTICAL GAME SIMULATION',
    description:
      'A console-based strategic Battleship engine developed in modern C++ with object-oriented grid states and a tactical AI opponent.',
    tech: ['C++', 'Object-Oriented Design', 'Algorithms', 'Data Structures'],
    impact: 'Grid-state game decision logic',
    repo: 'https://github.com/MaAn-41/Battleship-Game-CPP',
  },
  {
    title: 'QuickBooks → ERPNext',
    subtitle: 'Years of data. Zero compromise.',
    category: 'Enterprise / ERP',
    kind: 'erp',
    label: 'ENTERPRISE DATA MIGRATION',
    description:
      'An automated ETL pipeline and custom Frappe app migrating 5+ years of financial records with 100% data fidelity.',
    tech: ['Frappe', 'ERPNext', 'Python', 'Pandas'],
    impact: '5+ years of financial data migrated',
    repo: 'https://github.com/usmanagro7c-eng',
  },
  {
    title: 'QuickBooks Desktop Data Extractor',
    subtitle: 'Legacy data, unlocked.',
    category: 'Enterprise / ERP',
    kind: 'erp',
    label: '20+ TRANSACTION TYPES',
    description:
      'A production-grade QBXML and COM Bridge extraction engine exporting 20+ transaction types to structured JSON.',
    tech: ['Python', 'QBXML SDK', 'VBScript COM', 'Web UI'],
    impact: '20+ transaction types supported',
    repo: 'https://github.com/usmanagro7c-eng',
  },
];

export const skillGroups = [
  {
    name: 'AI & Deep Learning',
    skills: [
      'Generative AI',
      'LLMs',
      'RAG',
      'LoRA / PEFT',
      'PyTorch',
      'TensorFlow',
      'OpenCV',
      'Keras',
      'Hugging Face Transformers',
    ],
  },
  {
    name: 'Full-Stack & Web',
    skills: [
      'React.js',
      'TanStack Start',
      'Node.js',
      'Express.js',
      'Frappe / ERPNext',
      'Tailwind CSS',
      'REST APIs',
      'Webhooks',
      'Dexie (IndexedDB)',
      'Cloudflare Workers',
    ],
  },
  {
    name: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'C++', 'SQL', 'HTML5 / CSS3', 'R'],
  },
  {
    name: 'Mobile',
    skills: ['React Native', 'Capacitor', 'Android Studio', 'Expo Go'],
  },
  {
    name: 'Databases & Enterprise',
    skills: [
      'ERPNext',
      'MariaDB / MySQL',
      'MongoDB',
      'Google Sheets API',
      'QuickBooks SDK',
    ],
  },
];

export interface BlogArticle {
  title: string;
  description: string;
  readTime: string;
  tag: string;
  url: string;
}

export const blogs: BlogArticle[] = [
  {
    title: 'Architecting Offline-First Applications with Dexie & TanStack Start',
    description:
      'Building ultra-low latency web apps with local IndexedDB caching and resilient Google Sheets OAuth sync.',
    readTime: '5 min read',
    tag: 'Full-Stack Architecture',
    url: 'https://medium.com/@usmanamjad495',
  },
  {
    title: 'Clinical Diagnostic Reasoning: RAG Pipelines on MIMIC-IV Notes',
    description:
      'Designing retrieval-augmented reasoning systems that synthesize context-aware case reports with zero hallucination.',
    readTime: '7 min read',
    tag: 'Generative AI & RAG',
    url: 'https://medium.com/@usmanamjad495',
  },
  {
    title: 'Enterprise Financial Migration: QuickBooks to Frappe / ERPNext',
    description:
      'Automated ETL pipelines migrating 5+ years of complex QBXML financial ledgers with 100% data fidelity.',
    readTime: '6 min read',
    tag: 'Enterprise ERP',
    url: 'https://medium.com/@usmanamjad495',
  },
];

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Usman transformed our operational efficiency by customizing our ERPNext platform and executing a flawless 5-year accounting data migration. His architectural precision is exceptional.',
    author: 'Enterprise Systems Lead',
    role: 'Operations & Engineering',
    organization: 'Agrovisions',
  },
  {
    quote:
      'An outstanding instructor who has mentored over 150 students with a 95%+ board pass rate. Usman makes complex computational thinking and algorithm design intuitive and exciting.',
    author: 'Academic Directorate',
    role: 'Computer Science Department',
    organization: 'The Century Academy',
  },
];

export const education = [
  {
    degree: 'Bachelor of Science in Computer Science (BSCS)',
    institution: 'FAST National University of Computer & Emerging Sciences (FAST-NUCES)',
    period: 'Alumnus',
    details: 'Rigorous foundation in Algorithms, Operating Systems, Machine Learning & Distributed Systems.',
  },
];

export const popularTechTags = [
  'All Tech',
  'TypeScript',
  'Python',
  'React',
  'ERPNext',
  'RAG',
  'OpenCV',
  'Transformers',
  'LoRA',
  'Go',
  'C++',
];
