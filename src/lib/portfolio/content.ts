import { EProjectType, type Education, type Experience, type PortfolioProfile, type Project } from "@/lib/portfolio/types";

const createdAt = "2026-04-08T00:00:00.000Z";

export const portfolioProfile: PortfolioProfile = {
  fullName: "Vishnu N Raj",
  title: "Full Stack Software Developer",
  summary:
    "Full-stack developer focused on scalable backend systems, real-time product workflows, and fast frontend experiences that stay crisp under production load.",
  objective:
    "Full-stack developer with strong experience across modern JavaScript ecosystems, including Node.js backends and multiple frontend frameworks. Skilled in building scalable, real-time applications and using AI-assisted development to accelerate delivery.",
  location: "Thrissur, Kerala, India",
  email: "vishnu8240.achu@gmail.com",
  phone: "+91 9567358657",
  githubUrl: "https://github.com/VishnuNRaj",
  linkedinUrl: "https://www.linkedin.com/in/vishnunjraj/",
  availability: "Available for product work and freelance builds",
  capabilities: [
    {
      title: "Full Stack Systems",
      description:
        "Node.js, NestJS, Next.js, and modern frontend tooling shaped into production-ready applications with clean service boundaries.",
    },
    {
      title: "Realtime and Streaming",
      description:
        "WebRTC, HLS, RTMP, Socket.IO, FFmpeg, and video workflows for products that depend on low-latency interaction.",
    },
    {
      title: "Delivery Velocity",
      description:
        "Rapid prototyping, AI-assisted development, and focused execution without dropping code quality or maintainability.",
    },
  ],
  metrics: [
    { label: "Primary focus", value: "Node.js + Next.js" },
    { label: "Realtime systems", value: "Streaming / chat / video" },
    { label: "Work modes", value: "Product, freelance, platform" },
  ],
  skillGroups: [
    {
      title: "Core Expertise",
      items: [
        "Full-Stack Development",
        "Prompt Engineering",
        "AI-Assisted Development",
        "Rapid Prototyping",
        "Feature Delivery",
        "System Design Concepts",
      ],
    },
    {
      title: "Programming Languages",
      items: [
        "JavaScript",
        "TypeScript",
        "Python (Basics)",
        "Java",
        "C",
        "YAML",
      ],
    },
    {
      title: "Frontend Systems",
      items: [
        "React.js",
        "Next.js",
        "TanStack Query",
        "Redux",
        "Zustand",
        "Tailwind CSS",
        "Shadcn/UI",
        "Framer Motion",
        "Preact",
        "EJS",
        "Bootstrap",
        "jQuery",
      ],
    },
    {
      title: "Backend and APIs",
      items: [
        "Node.js",
        "NestJS",
        "Express",
        "REST APIs",
        "Microservices",
        "GraphQL",
        "gRPC",
        "Kafka",
        "RabbitMQ",
        "BullMQ",
        "JWT",
        "PassportJS",
      ],
    },
    {
      title: "Data, Payments, and Realtime",
      items: [
        "PostgreSQL",
        "MongoDB",
        "Prisma",
        "Drizzle",
        "Mongoose",
        "TypeORM",
        "Redis",
        "Razorpay",
        "Cashfree",
        "Stripe",
        "Google Play Billing",
        "WebRTC",
        "HLS",
        "MPEG-DASH",
        "RTMP",
        "WebSocket",
        "Socket.IO",
        "FFmpeg",
      ],
    },
    {
      title: "Cloud and Tooling",
      items: [
        "Docker",
        "Kubernetes",
        "AWS",
        "GCP",
        "GitHub Actions",
        "Nginx",
        "Apache",
        "Git",
        "Postman",
        "Swagger",
        "Jest",
        "Figma",
        "Jira",
        "Trello",
      ],
    },
  ],
};

export const embeddedExperience: Experience[] = [
  {
    id: "exp-fleapo",
    companyName: "Fleapo",
    from: 2025,
    to: null,
    description:
      "Built and scaled Flute Gandharvas inside the TagMango ecosystem, shipped challenge and streak systems for Level-Up and Dream Life, and improved API and frontend performance for Doreme using Next.js, NestJS, PostgreSQL, Redis, AWS, and payment integrations.",
    jobRole: "Junior Software Developer",
    createdAt,
    location: "Kolkata, India",
    stacks: [
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "TypeORM",
      "Redis",
      "AWS",
      "Razorpay",
    ],
  },
];

export const embeddedProjects: Project[] = [
  {
    id: "project-flute-gandharvas",
    companyId: "exp-fleapo",
    projectName: "Flute Gandharvas",
    projectType: EProjectType.COMPANY_PROJECTS,
    stacks: ["Next.js", "NestJS", "PostgreSQL", "AWS", "Qencode", "Bitmovin"],
    description:
      "A social video platform with real-time interactions, role-based access, and media processing workflows built within the TagMango ecosystem.",
    isHighlighted: true,
    createdAt,
    impact:
      "Scaled core learning and video flows with stronger backend handling, access control, and smoother user journeys.",
  },
  {
    id: "project-tagmango-level-up",
    companyId: "exp-fleapo",
    projectName: "TagMango Level-Up",
    projectType: EProjectType.COMPANY_PROJECTS,
    stacks: ["Next.js", "NestJS", "PostgreSQL", "Razorpay"],
    description:
      "Growth and engagement systems covering challenges, streaks, subscriptions, and payment flows for creator-driven experiences.",
    isHighlighted: true,
    createdAt,
    impact:
      "Delivered feature modules that supported retention-oriented product loops and recurring monetization.",
  },
  {
    id: "project-doreme",
    companyId: "exp-fleapo",
    projectName: "Doreme",
    projectType: EProjectType.COMPANY_PROJECTS,
    stacks: ["Shopify", "Next.js", "REST APIs", "Tailwind CSS"],
    description:
      "A B2C commerce experience with API optimization and frontend performance work focused on faster browsing and cleaner checkout journeys.",
    isHighlighted: false,
    createdAt,
    impact:
      "Improved responsiveness and API efficiency for a better storefront experience.",
  },
  {
    id: "project-xoro",
    projectName: "Xoro",
    projectType: EProjectType.MY_WORKS,
    stacks: ["Node.js", "Express", "React", "TypeScript", "MongoDB", "Socket.IO", "RTMP", "AWS"],
    description:
      "A unified social media live streaming platform supporting uploads, shorts, livestreams, chat, and real-time engagement using a scalable MERN-based architecture.",
    isHighlighted: true,
    createdAt,
    impact:
      "Delivered end-to-end live streaming, media pipelines, and real-time communication with production deployment across AWS and Vercel.",
    href: "https://github.com/VishnuNRaj",
  },
  {
    id: "project-swapit",
    projectName: "SwapIt",
    projectType: EProjectType.FREELANCE,
    stacks: ["Node.js", "NestJS", "PostgreSQL", "Razorpay"],
    description:
      "A multi-vendor commerce platform supporting resale, swaps, rentals, donations, and premium users with backend flows for vendor management and payouts.",
    isHighlighted: false,
    createdAt,
    impact:
      "Modeled complex vendor and payment workflows for a multi-mode commerce experience.",
  },
  {
    id: "project-talktodoc",
    projectName: "TalkToDoc",
    projectType: EProjectType.FREELANCE,
    stacks: ["Node.js", "NestJS", "PostgreSQL", "Google Meet API", "WhatsApp Business API"],
    description:
      "A doctor consultation platform with appointment booking, care plans, real-time sessions, payment flows, and automation integrations.",
    isHighlighted: false,
    createdAt,
    impact:
      "Connected scheduling, consultation, and communication flows into one operational product.",
  },
  {
    id: "project-subscription-platform",
    projectName: "Subscription Platform",
    projectType: EProjectType.FREELANCE,
    stacks: ["React", "Node.js", "FFmpeg", "AWS S3", "Cashfree", "Cloudflare CDN"],
    description:
      "A video subscription system with content streaming, moderation pipelines, CDN delivery, and optimized media handling.",
    isHighlighted: false,
    createdAt,
    impact:
      "Implemented subscription and media delivery flows tuned for content-heavy experiences.",
  },
  {
    id: "project-gamerxone",
    projectName: "GamerXone",
    projectType: EProjectType.MY_WORKS,
    stacks: ["Node.js", "Express", "MongoDB", "EJS", "Bootstrap", "Razorpay"],
    description:
      "An e-commerce platform with product browsing, wishlist, cart, admin inventory management, and secure order workflows.",
    isHighlighted: false,
    createdAt,
    impact:
      "Shipped a complete commerce flow with payments and inventory management.",
  },
  {
    id: "project-articler",
    projectName: "Articler",
    projectType: EProjectType.MY_WORKS,
    stacks: ["Next.js", "PostgreSQL", "NextAuth", "Firebase", "Tailwind CSS"],
    description:
      "A blogging platform with authentication, media uploads, and a streamlined content management experience.",
    isHighlighted: false,
    createdAt,
    impact:
      "Focused on a clean writing workflow and a polished UI surface.",
  },
  {
    id: "project-pagefusion",
    projectName: "PageFusion",
    projectType: EProjectType.MY_WORKS,
    stacks: ["NestJS", "MongoDB", "Preact", "GCP", "JWT"],
    description:
      "A secure PDF editor with encryption, password-based access, and server-side file protection.",
    isHighlighted: false,
    createdAt,
    impact:
      "Implemented document protection and secure file handling for privacy-sensitive flows.",
  },
  {
    id: "project-pager",
    projectName: "Pager",
    projectType: EProjectType.MY_WORKS,
    stacks: ["Express", "MongoDB", "Cassandra", "Redis", "gRPC", "Kafka", "WebSocket", "React"],
    description:
      "A microservices-based encrypted chat application supporting real-time messaging and async communication across distributed services.",
    isHighlighted: false,
    createdAt,
    impact:
      "Explored distributed communication patterns with Kafka, gRPC, and realtime messaging.",
  },
];

export const embeddedEducation: Education[] = [
  {
    id: "edu-manipal",
    collegeName: "Manipal University Jaipur",
    location: "Rajasthan, India",
    course: "Bachelor of Computer Applications (BCA)",
    branch: "Computer Applications",
    from: 2025,
    to: null,
    createdAt,
  },
  {
    id: "edu-brototype",
    collegeName: "Brototype",
    location: "Kochi, Kerala, India",
    course: "MERN Stack Developer Certification",
    branch: "Full Stack Development",
    from: 2023,
    to: 2024,
    createdAt,
  },
  {
    id: "edu-ghss",
    collegeName: "GHSS Ayyanthole",
    location: "Thrissur, Kerala, India",
    course: "Higher Secondary",
    branch: "Computer Science",
    from: 2021,
    to: 2023,
    createdAt,
  },
];
