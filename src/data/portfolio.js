const tabs = ["home", "projects", "contact"];

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

const projects = [
  {
    perms: "drwxr-xr-x",
    links: 3,
    owner: "mozzy",
    group: "dev",
    size: 4096,
    date: "2026-06-15T14:30:00",
    name: "ecommerce-platform",
  },
  {
    perms: "-rw-r--r--",
    links: 1,
    owner: "mozzy",
    group: "dev",
    size: 24576,
    date: "2026-06-14T09:15:00",
    name: "cli-toolkit",
  },
  {
    perms: "drwxrwxr-x",
    links: 2,
    owner: "mozzy",
    group: "dev",
    size: 1024,
    date: "2026-06-10T18:00:00",
    name: "portfolio-site",
  },
  {
    perms: "-rwxr-xr-x",
    links: 1,
    owner: "mozzy",
    group: "dev",
    size: 5632,
    date: "2026-06-08T11:45:00",
    name: "api-gateway",
  },
  {
    perms: "-rw-r--r--",
    links: 1,
    owner: "mozzy",
    group: "dev",
    size: 12800,
    date: "2026-05-28T20:00:00",
    name: "design-system",
  },
  {
    perms: "lrwxrwxrwx",
    links: 1,
    owner: "mozzy",
    group: "dev",
    size: 24,
    date: "2026-05-20T16:10:00",
    name: "latest-project -> cli-toolkit",
  },
];

const quotes = [
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "Programming is not about what you know; it's about what you can figure out.", author: "Chris Pine" },
  { text: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Software is a great combination of artistry and engineering.", author: "Bill Gates" },
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

export { tabs, neofetchInfo, skills, projects, aboutLines, quotes, socialLinks };
