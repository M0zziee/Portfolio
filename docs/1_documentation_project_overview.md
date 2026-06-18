# Project Overview

Terminal TUI-themed portfolio built with React + Vite + Tailwind CSS v4 + shadcn/ui.

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|---|
| React | 19 | UI framework |
| Vite | 8 | Build tool / dev server |
| Tailwind CSS | 4 | Utility CSS — dark mode via `.dark` class |
| shadcn/ui | Radix Lyra style | Primitive components (Button, Tabs, Badge, Input, etc.) |
| Lucide React | — | Icons (Sun, Moon, etc.) |
| Radix UI | — | Accessible UI primitives used by shadcn |
| class-variance-authority | — | Component variant management |
| clsx + tailwind-merge | — | Class merging (via `cn()` helper) |
| three | — | 3D WebGL rendering — powers PixelSnow effect |
| GSAP | 3.15 | Animation library — drives PixelTransition pixel grid, Masonry entrance |
| animejs | 4.4 | Animation library — entrance animations, stagger effects, tab transitions |
| react-icons | 5.6 | Simple Icons SVG set — powers tech stack logos in SkillsSection & ProjectCard |

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
- `ThemeToggle` component renders a floating button in the top-right corner

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
│   ├── useTheme.js          ← Dark/light mode hook
│   └── useAnimateIn.js      ← anime.js mount/entrance animation hook
├── components/
│   ├── ui/                  ← shadcn/ui primitives + custom wrappers
│   │   ├── button.jsx, badge.jsx, input.jsx, label.jsx, ...
│   │   └── tooltip.jsx      ← Radix UI Tooltip wrapper (added for SkillSection tooltips)
│   ├── TerminalWindow.jsx
│   ├── TabBar.jsx
│   ├── ThemeToggle.jsx
│   ├── AsciiArt.jsx
│   ├── NeofetchCard.jsx
│   ├── TerminalOutput.jsx
│   ├── TypewriterText.jsx
│   ├── LsListing.jsx
│   ├── TerminalInput.jsx
│   ├── PixelTransition.jsx
│   ├── PixelTransition.css
│   ├── PixelSnow.jsx
│   ├── TerminalShell.jsx    ← Interactive mini-shell with fortune/quotes
│   ├── SocialLinks.jsx      ← Brand-icon social links with hover animation (github, linkedin, x, instagram)
│   ├── Masonry.jsx          ← GSAP-powered masonry grid for project cards
│   ├── ProjectCard.jsx      ← Rich project card with tech icons + status
│   ├── AcademicCard.jsx     ← Education card with achievement tags
│   ├── CertCard.jsx         ← Certification card with verify link
│   └── LogoLoop.jsx         ← Infinite auto-scrolling logo carousel
└── sections/
    ├── HomeSection.jsx
    ├── AboutSection.jsx
    ├── ProjectsSection.jsx
    ├── SkillsSection.jsx
    └── ContactSection.jsx
```

## Page Animations (anime.js)

All sections use the `useAnimateIn` hook for mount-triggered entrance animations:

- **Tab switch**: outer content wrapper fades + slides up via `animate()` in `App.jsx`
- **Home**: three staggered groups (ascii/GIF → neofetch → command line) with inner stagger
- **About**: command → text lines → terminal shell → social links, sequential top-to-bottom stagger
- **Skills**: categories slide from left, badges pop in with scale stagger
- **Projects**: header → total → rows, with rows sliding from right
- **Contact**: command → fields (one-by-one) → send button → email info → social links, staggered sequentially
- **Resume**: four staggered groups (cmd → academic → projects → certifications) with GSAP-based Masonry entrance (items animate from configurable direction)

All animations respect the terminal "printed output" feel — elements emerge from below with staggered delays.

## Terminal Aesthetic

- All borders use `rounded-none` for pixel-perfect corners
- Components use box-drawing-friendly layouts
- Font is Oxanium (techy, digital feel)
- Every color references CSS variables (`text-foreground`, `bg-background`, `border-border`) — respects dark/light mode
- `ls -la` table columns are responsive using `sm:`, `md:`, `lg:` visibility toggles

## Responsive Behavior

- **Mobile-first:** default styles target small screens; `sm:`, `md:`, `lg:` overrides for larger
- **Navigation:** TabBar is `sticky top-0 z-50` — stays visible while scrolling
- **Layouts:** flex rows collapse to columns on mobile (`flex-col md:flex-row`):
  - Home text + GIF row
  - AsciiArt art + content
  - NeofetchCard art + info
- **Text sizing:** headings scale down on mobile (`text-2xl md:text-3xl`)
- **Padding:** outer/inner padding reduces on mobile (`p-3 sm:p-6`, `p-3 sm:p-4`)
- **ASCII art:** hidden on screens narrower than `sm:` breakpoint
- **Masonry grid:** responsive column count (1–5 columns based on viewport width), recalculates on resize via `ResizeObserver`
