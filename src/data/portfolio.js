const tabs = ["home", "about", "projects", "skills", "contact"]

const neofetchInfo = [
  "User: Mozzy",
  "Host: portfolio",
  "OS: React 19",
  "Shell: zsh 7.0",
  "Role: Full-Stack Developer",
  "Location: Indonesia : Garut, Jawa-barat",
  "Uptime: 1 years 4 months",
]

const skills = {
  languages: ["JavaScript", "TypeScript", "Python", "Go", "Rust"],
  frontend: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Radix UI"],
  backend: ["Node.js", "Express", "PostgreSQL", "Redis"],
  tools: ["Git", "Docker", "Neovim", "Figma"],
}

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
]

const aboutLines = [
  "Hi, I'm Mozzy — a full-stack developer who builds",
  "performant, pixel-perfect web experiences.",
  "",
  "I work across the stack with React, Node.js,",
  "and a growing interest in systems programming.",
  "",
  "When I'm not coding, I'm tweaking my Neovim config",
  "or contributing to open source.",
]

export { tabs, neofetchInfo, skills, projects, aboutLines }
