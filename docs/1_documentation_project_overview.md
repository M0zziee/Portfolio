# Project Overview

Terminal TUI-themed portfolio built with React + Vite + Tailwind CSS v4 + shadcn/ui.

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 8 | Build tool / dev server |
| Tailwind CSS | 4 | Utility CSS — dark mode via `.dark` class |
| shadcn/ui | Radix Lyra style | Primitive components (Button, Tabs, Badge, Input, etc.) |
| Lucide React | — | Icons (Sun, Moon, etc.) |
| Radix UI | — | Accessible UI primitives used by shadcn |
| class-variance-authority | — | Component variant management |
| clsx + tailwind-merge | — | Class merging (via `cn()` helper) |

## Quick Start

```bash
npm install        # install dependencies
npm run dev        # start dev server (Vite HMR)
npm run build      # production build → dist/
npm run preview    # preview production build
npm run lint       # run ESLint
```

## Fonts

- **Body / UI**: `Oxanium Variable` — digital/techy monospace-lite font
- **Headings**: `Space Grotesk Variable`

Configured in `src/index.css` via `@theme inline { --font-sans: ...; --font-heading: ...; }`.

## Dark / Light Mode

- CSS variables defined in `src/index.css` under `:root` (light) and `.dark` (dark)
- Toggled via `.dark` class on `<html>` element
- `useTheme()` hook in `src/hooks/useTheme.js` handles:
  - `localStorage` persistence
  - System `prefers-color-scheme` fallback
  - Exposes `{ theme, toggleTheme }`
- `ThemeToggle` component renders a floating button in the bottom-right corner

## Path Aliases

All imports use `@/` which maps to `src/` (configured in `vite.config.js` and `jsconfig.json`):

```js
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```

## Folder Structure

```
src/
├── App.jsx                  ← Root component — orchestrates tabs + layout
├── main.jsx                 ← Entry point
├── index.css                ← Tailwind imports, CSS variables, font config
├── lib/
│   └── utils.js             ← cn() helper
├── data/
│   └── portfolio.js         ← All portfolio data (projects, skills, etc.)
├── hooks/
│   └── useTheme.js          ← Dark/light mode hook
├── components/
│   ├── ui/                  ← shadcn/ui primitives (generated)
│   ├── TerminalWindow.jsx
│   ├── TabBar.jsx
│   ├── ThemeToggle.jsx
│   ├── AsciiArt.jsx
│   ├── NeofetchCard.jsx
│   ├── TerminalOutput.jsx
│   ├── TypewriterText.jsx
│   ├── LsListing.jsx
│   └── TerminalInput.jsx
└── sections/
    ├── HomeSection.jsx
    ├── AboutSection.jsx
    ├── ProjectsSection.jsx
    ├── SkillsSection.jsx
    └── ContactSection.jsx
```

## Terminal Aesthetic

- All borders use `rounded-none` for pixel-perfect corners
- Components use box-drawing-friendly layouts
- Font is Oxanium (techy, digital feel)
- Every color references CSS variables (`text-foreground`, `bg-background`, `border-border`) — respects dark/light mode
- `ls -la` table columns are responsive using `sm:`, `md:`, `lg:` visibility toggles
