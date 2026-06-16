# Changelog — Layout & Content Changes

## Session 3 — Page Animations + Interactive Fortune + Social Links

### New Dependencies
| Package | Version | Purpose |
|---|---|---|
| `animejs` | ^4.4.1 | Page/section entrance animations, stagger effects, tab transitions |

### New Files Created

| File | Description |
|---|---|
| `src/hooks/useAnimateIn.js` | Reusable hook for mount-triggered anime.js entrance animations. Targets elements by CSS selector, supports custom params (translate, opacity, stagger delays, etc.) |
| `src/components/TerminalShell.jsx` | Interactive mini command-line shell with 6 built-in commands (`fortune`, `whoami`, `date`, `social`, `help`, `clear`). Supports up/down arrow history recall. Uses `quotes` data from portfolio.js |
| `src/components/SocialLinks.jsx` | Social link list with inline brand SVG icons (GitHub, LinkedIn, X). Hover: scale + color shift + translate animation. Opens links in new tabs |

### Files Modified

| File | Changes |
|---|---|
| `src/App.jsx` | Added `contentRef` + `useEffect` that runs `animate()` on `activeTab` change — fades + slides content wrapper up. Wrapped sections in `<div ref={contentRef}>` |
| `src/data/portfolio.js` | Added `quotes[]` (10 programming/dev quotes with `text`/`author`) and `socialLinks[]` (github, linkedin, x) |
| `src/sections/HomeSection.jsx` | Added `useAnimateIn` for staggered group entrance (ascii/GIF → neofetch → command line) with inner stagger |
| `src/sections/AboutSection.jsx` | Added interactive `TerminalShell` (fortune/quotes) and `SocialLinks` below bio text. Added `useAnimateIn` for sequential stagger (cmd → lines → shell → social). Removed `AsciiArtFromImage` and `avatar.png` |
| `src/sections/SkillsSection.jsx` | Added `useAnimateIn`: categories slide from left, badges pop in with scale stagger |
| `src/sections/ProjectsSection.jsx` | Added `useAnimateIn`: header + total fade in, project rows slide from right with stagger. Passes `rowIdPrefix="projects-row"` to LsListing |
| `src/sections/ContactSection.jsx` | Added `useAnimateIn`: command fades in, form fields appear one-by-one, send button pulses in last |
| `src/components/LsListing.jsx` | Added optional `rowIdPrefix` prop — adds `data-id="{prefix}-{idx}"` to each row div |
| `vite.config.js` | Fixed `@` path alias from `/src` to `path.resolve(__dirname, "src")` for Windows compatibility |

### Animation Architecture

All animations use `useAnimateIn` hook with `data-id` attribute selectors:
- Runs once on mount → perfect for tab-based conditional rendering (sections remount on tab change)
- Uses anime.js v4 named exports: `animate(targets, params)` and `stagger(val, options)`
- Default animation: opacity `[0,1]` + translateY `[15,0]` + `easeOutQuad` + 500ms
- Stagger direction: `from: "first"` (top-to-bottom terminal output feel)
- Cleanup: `instance.pause()` on unmount

## Session 2 — Responsive Layout + Restructure

### Tab Bar → Sticky Navbar
- **`TabBar.jsx`** `src/components/TabBar.jsx`
  - Added `sticky top-0 z-50` so the navbar stays at the top when scrolling

### Single Page Restructure
- **`App.jsx`** `src/App.jsx`
  - Tabs reduced from 5 to 3: `["home", "projects", "contact"]`
  - `about` and `skills` removed as standalone tabs
  - Home tab now renders `<HomeSection />` + `<AboutSection />` + `<SkillsSection />` stacked
  - Projects and Contact remain as separate tab views

- **`portfolio.js`** `src/data/portfolio.js`
  - `tabs` array updated to `["home", "projects", "contact"]`

### ThemeToggle Moved to Top-Right
- **`ThemeToggle.jsx`** `src/components/ThemeToggle.jsx`
  - **Before:** `fixed bottom-3 right-3 sm:bottom-6 sm:right-6`
  - **After:** `fixed top-3 right-3 sm:top-6 sm:right-6`

### Responsive Layout (Mobile-First)
All files updated for mobile + desktop compatibility:

- **`App.jsx`** — outer padding: `p-6` → `p-3 sm:p-6`
- **`HomeSection.jsx`** — flex row stacks on mobile (`flex-col md:flex-row`); GIF goes full-width on mobile (`w-full md:w-lg`); text scales down (`text-2xl md:text-3xl` / `text-xl md:text-2xl`)
- **`AsciiArt.jsx`** — `flex-col md:flex-row`, ASCII art hidden on small screens (`hidden sm:block`), children get `w-full`
- **`NeofetchCard.jsx`** — `flex-col sm:flex-row`, ASCII art hidden on small screens (`hidden sm:block`)
- **`TerminalWindow.jsx`** — inner padding: `p-4` → `p-3 sm:p-4`
- **`ContactSection.jsx`** — button row gets `flex-wrap items-center`

### GIF Integration
- **`HomeSection.jsx`** `src/sections/HomeSection.jsx`
  - Replaced placeholder `[ GIF 1 ]` / `[ GIF 2 ]` divs with actual `<img>` tags
  - Imports `Chisato1.gif` and `Chisato2.gif` from `src/assets/`
  - PixelTransition now transitions between the two GIFs on hover/click
- Removed the empty `<TerminalWindow title="~/About">` (no longer needed — AboutSection is rendered separately)

### PixelSnow (Three.js Background Effect)
- **`PixelSnow.jsx`** `src/components/PixelSnow.jsx` — new component
  - WebGL shader-based snow particle effect using Three.js
  - Props: `color`, `density`, `speed`, `variant`, `pixelResolution`, `direction`, etc.
  - Uses `IntersectionObserver` to pause when out of view
  - Transparent overlay: `absolute inset-0 pointer-events-none`
- **`App.jsx`** `src/App.jsx`
  - PixelSnow rendered as a global background behind all content
  - Outer wrapper gets `relative`, content wrapper gets `relative z-10`
  - Snow color: `#ffffff`, density: `0.2`, variant: `round`

### New Dependencies
| Package | Version | Purpose |
|---|---|---|
| `three` | ^0.x | 3D WebGL renderer for PixelSnow |

## Previous Session

### HomeSection.jsx (`src/sections/HomeSection.jsx`)

**Layout Restructuring**
- **Before:** GIF and text were stacked vertically inside a `max-w-lg` container with `space-y-1`
- **After:** "Hello My name Is Fathir" and description text sit in a left column, with the GIF in a right column — in a `flex items-start gap-6` row

```
flex items-start gap-6
├── div (text column, space-y-1)
│   ├── "Hello My name Is Fathir"
│   ├── "I Interested At ..."
│   └── "I build end-to-end web solutions ..."
└── div (GIF column)
    └── [PixelTransition GIF]
```

**Description Text Update**
- **Before:** `"I bridge the gap between complex backend logic and seamless user interfaces to help products scale."`
- **After:** `"I build end-to-end web solutions — from designing schemas and writing server-side logic with Node.js, to crafting responsive React interfaces with Tailwind CSS. I focus on performance, accessibility, and clean architecture that keeps technical debt low as the product grows."`

### AsciiArt.jsx (`src/components/AsciiArt.jsx`)

**ASCII Art Replacement**
- **Before:** Diamond/bird ASCII pattern (`/\`, `\/`)
- **After:** "M" letter logo using box-drawing characters:
  ```
  ███╗   ███╗
  ████╗ ████║
  ██╔████╔██║
  ██║╚██╔╝██║
  ██║ ╚═▀ ██║
  ╚═╝     ╚═╝
  ```

**Gap Adjustment**
- **Before:** `gap-14` between ASCII art and content column
- **After:** `gap-12` for tighter alignment

### PixelTransition.jsx (`src/components/PixelTransition.jsx`)

- Added to the project as the GIF/image container component
- Features a pixel-grid hover animation that transitions between two content states
- Used in `HomeSection.jsx` to display GIF placeholders alongside text content

## File Versions

| File | Lines Before | Lines After |
|---|---|---|
| `App.jsx` | 31 | 38 |
| `HomeSection.jsx` | 90 | 87 |
| `AsciiArt.jsx` | 43 | 43 |
| `TabBar.jsx` | 29 | 29 |
| `ThemeToggle.jsx` | 29 | 29 |
| `NeofetchCard.jsx` | 60 | 60 |
| `TerminalWindow.jsx` | 42 | 42 |
| `ContactSection.jsx` | 32 | 32 |
| `portfolio.js` | 88 | 88 |
| `PixelSnow.jsx` | — | ~285 (new) |
