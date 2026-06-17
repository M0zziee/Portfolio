const tabs = ["home", "resume", "contact"];

const neofetchInfo = [
  "User: Mozzy",
  "Host: portfolio",
  "OS: React 19",
  "Shell: zsh 7.0",
  "Role: Full-Stack Developer",
  "Location: Indonesia : Garut, Jawa-barat",
  "Uptime: 1 years 4 months",
];

const skills = {
  languages: ["JavaScript", "TypeScript", "Python", "Go", "Rust"],
  frontend: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Radix UI"],
  backend: ["Node.js", "Express", "PostgreSQL", "Redis"],
  tools: ["Git", "Docker", "Neovim", "Figma"],
};

const skillDetail = {
  JavaScript: {
    description: "Dynamic programming language for web development",
    category: "languages",
  },
  TypeScript: {
    description: "Typed superset of JavaScript with static checking",
    category: "languages",
  },
  Python: {
    description: "General-purpose programming language",
    category: "languages",
  },
  Go: {
    description: "Systems programming language by Google",
    category: "languages",
  },
  Rust: {
    description: "Systems language focused on safety and performance",
    category: "languages",
  },
  React: {
    description: "UI framework for building component-based interfaces",
    category: "frontend",
  },
  "Next.js": {
    description: "React framework with SSR, routing, and tooling",
    category: "frontend",
  },
  "Tailwind CSS": {
    description: "Utility-first CSS framework for rapid styling",
    category: "frontend",
  },
  "shadcn/ui": {
    description: "Component design system built on Radix UI",
    category: "frontend",
  },
  "Radix UI": {
    description: "Headless UI primitives for accessible components",
    category: "frontend",
  },
  "Node.js": {
    description: "JavaScript runtime for server-side applications",
    category: "backend",
  },
  Express: {
    description: "Minimal web framework for Node.js",
    category: "backend",
  },
  PostgreSQL: {
    description: "Advanced open-source relational database",
    category: "backend",
  },
  Redis: {
    description: "In-memory data structure store and cache",
    category: "backend",
  },
  Git: { description: "Distributed version control system", category: "tools" },
  Docker: {
    description: "Container platform for application deployment",
    category: "tools",
  },
  Neovim: {
    description: "Modern extensible Vim-based text editor",
    category: "tools",
  },
  Figma: {
    description: "Collaborative interface design tool",
    category: "tools",
  },
};

const projects = [
  {
    id: 0,
    image: "Caffeinance.png",
    name: "caffeinance",
    description: "My photo",
    tech: [],
    github: "https://github.com/M0zziee/Caffeinance",
    demo: "https://caffeinance.izumi-dev.my.id/",
    status: "active",
    height: 600,
  },
  {
    id: 1,
    name: "ecommerce-platform",
    description: "Full-stack e-commerce platform with payment gateway, inventory management, and real-time order tracking",
    tech: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com/mozzy/ecommerce-platform",
    demo: null,
    status: "active",
    height: 420,
  },
  {
    id: 2,
    name: "cli-toolkit",
    description: "Command-line toolkit for automating development workflows and project scaffolding",
    tech: ["Go", "Node.js"],
    github: "https://github.com/mozzy/cli-toolkit",
    demo: null,
    status: "active",
    height: 380,
  },
  {
    id: 3,
    name: "api-gateway",
    description: "API gateway service handling routing, authentication, rate limiting across microservices",
    tech: ["Node.js", "Redis", "Docker"],
    github: "https://github.com/mozzy/api-gateway",
    demo: null,
    status: "active",
    height: 400,
  },
  {
    id: 4,
    name: "design-system",
    description: "Reusable component library with design tokens, documentation, and accessibility-first components",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/mozzy/design-system",
    demo: null,
    status: "wip",
    height: 420,
  },
];

const quotes = [
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  {
    text: "Programming is not about what you know; it's about what you can figure out.",
    author: "Chris Pine",
  },
  {
    text: "The only way to learn a new programming language is by writing programs in it.",
    author: "Dennis Ritchie",
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
  },
  {
    text: "Software is a great combination of artistry and engineering.",
    author: "Bill Gates",
  },
];

const academic = [
  {
    institution: "Universitas Garut",
    degree: "Bachelor of Computer Science",
    period: "2022 - 2026",
    description:
      "Focused on software engineering, algorithms, and web technologies",
    achievements: ["GPA: 3.8/4.0", "Thesis on web performance optimization"],
  },
  {
    institution: "Binar Academy",
    degree: "Full-Stack Web Development Bootcamp",
    period: "2024",
    description:
      "Intensive 6-month program covering React, Node.js, database design, and deployment",
    achievements: ["Final project: Full-stack e-commerce platform"],
  },
];

const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Dec 2024",
    description:
      "Foundational understanding of AWS cloud services, pricing, and core architecture",
    credentialUrl: "#",
  },
  {
    name: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "Mar 2024",
    description:
      "300-hour curriculum covering algorithms, data structures, and problem-solving",
    credentialUrl: "#",
  },
];

const portfolioTech = [
  {
    name: "React",
    icon: "SiReact",
    description: "UI framework for building the interface",
    href: "https://react.dev",
  },
  {
    name: "Vite",
    icon: "SiVite",
    description: "Fast build tool and dev server",
    href: "https://vite.dev",
  },
  {
    name: "JavaScript",
    icon: "SiJavascript",
    description: "Dynamic programming language",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "Tailwind CSS",
    icon: "SiTailwindcss",
    description: "Utility-first CSS framework",
    href: "https://tailwindcss.com",
  },
  {
    name: "shadcn/ui",
    icon: "SiShadcnui",
    description: "Component design system",
    href: "https://ui.shadcn.com",
  },
  {
    name: "Radix UI",
    icon: "SiRadixui",
    description: "Headless UI primitives",
    href: "https://www.radix-ui.com",
  },
  {
    name: "Three.js",
    icon: "SiThreedotjs",
    description: "3D graphics library",
    href: "https://threejs.org",
  },
  {
    name: "GSAP",
    icon: "SiGreensock",
    description: "Animation library",
    href: "https://gsap.com",
  },
  {
    name: "animejs",
    icon: "SiAnimedotjs",
    description: "JavaScript animation engine",
    href: "https://animejs.com",
  },
  {
    name: "lucide-react",
    icon: "SiLucide",
    description: "Icon library",
    href: "https://lucide.dev",
  },
  {
    name: "ESLint",
    icon: "SiEslint",
    description: "Code linting tool",
    href: "https://eslint.org",
  },
];

const socialLinks = [
  { platform: "github", url: "https://github.com/mozzy" },
  { platform: "linkedin", url: "https://linkedin.com/in/mozzy" },
  { platform: "x", url: "https://x.com/mozzy" },
];

const aboutLines = [
  "Hi, I'm Mozzy a Full-Stack Developer passionate about building performant, scalable, and Pixelperfect web experiences.",
  "I enjoy turning ideas into products by working across the stack with React, Node.js, and modern web technologies, focusing on clean architecture and thoughtful user experiences.",
  " ",
  "Beyond web development, I'm continuously exploring systems programming and low-level technologies to better understand how software works under the hood.",
  " ",
  "When I'm not coding, you'll probably find me customizing my Neovim setup, experimenting with Linux, or contributing to",
  "open-source projects.",
];

export {
  tabs,
  neofetchInfo,
  skills,
  skillDetail,
  projects,
  academic,
  certifications,
  aboutLines,
  quotes,
  socialLinks,
  portfolioTech,
};
