# Changelog — Layout & Content Changes

## Session 9 — Contact Section Rewrite + Instagram Icon + Photo Card Tech Row

### Files Modified

| File | Changes |
|---|---|
| `src/sections/ContactSection.jsx` | Full rewrite: added controlled inputs (`useState` for name, email, message), client-side validation (required fields + email regex with terminal-style error messages), status state machine (`idle`/`loading`/`success`/`error`) with corresponding UI, clickable email display via `echo $EMAIL`, social links section using `SocialLinks` component |
| `src/data/portfolio.js` | Added `email` field and export |
| `src/components/SocialLinks.jsx` | Added Instagram SVG brand icon and `hover:text-[#E4405F]` color |
| `src/components/ProjectCard.jsx` | Added Tech row to photo card variant (was missing) |

### ContactSection — Controlled Form & Validation

The contact form previously had no state management, no validation, and no `onSubmit` handler — clicking Send would reload the page.

**After:**
- **Controlled inputs** via `useState` for `name`, `mail`, `message`
- **Client-side validation** on submit: required checks + email regex (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`). Errors shown as `! error: ...` in `text-destructive` below each field
- **Status state machine**: `"idle"` → `"loading"` (button shows `[Sending...]`, disabled) → `"success"` (green `✓ mail sent successfully!`) or `"error"` (red `✗ failed to send mail. try again later.`)
- **Form action** not yet wired — `handleSubmit` validates and returns, with `// TODO: wire up Formspree or email service`

### ContactSection — Email & Social Links

Added below the form, separated by `Separator`:
- **`echo $EMAIL`** block — clickable `mailto:` link using the new `email` field from `portfolio.js`
- **Social links** — `SocialLinks` component with `socialLinks` data from `portfolio.js`

Both sections have `useAnimateIn` staggered entrance animations.

### SocialLinks — Instagram Icon Added

The `icons` map previously only had `github`, `linkedin`, and `x`. Added Instagram SVG path + `hover:text-[#E4405F]` brand color. Instagram links now display the camera icon and brand-color hover.

### ProjectCard — Photo Card Tech Row

The photo card variant (`if (item.img)`) was missing the Tech row. Added between Status and Links in the hover overlay:

```
$ Tech: [React icon] [Node.js icon] [PostgreSQL icon]  React, Node.js, PostgreSQL
```

Uses the same `techIconMap` and white-on-dark styling as the rest of the photo overlay.

## Session 8 — Home Section Enhancement + Terminal Focus Fix

### Files Modified

| File | Changes |
|---|---|
| `src/sections/HomeSection.jsx` | Added social buttons, resume download, rotating terminal quote line, and avatar overlay. Restructured text column spacing |
| `src/components/TerminalShell.jsx` | Scoped global click listener to only focus input when clicking inside terminal |
| `src/data/portfolio.js` | Added Instagram to `socialLinks` |

### HomeSection — Social & Resume Buttons

Added a row of buttons below the description text:
- **Social buttons** — 4 icon-only `outline` buttons for GitHub, LinkedIn, Instagram, X using `react-icons/fa` and `react-icons/si`
- **Resume button** — `default` button with `Download` icon, links to `/resume.pdf`

### HomeSection — Rotating Terminal Quote Line

Added between the greeting heading and the tagline/description block:
- Displays a random quote from `portfolio.js` `quotes[]` with a `$` prompt prefix and `border-l-2` accent
- Uses `TypewriterText` with `key={quoteIndex}` to retype each new quote
- Quote rotates every 7 seconds via `setInterval`, with a `do...while` guard to prevent repeats

### HomeSection — Avatar Overlay

- `Avatar.png` imported from `src/assets/`
- Positioned `absolute` over the top-right of the PixelTransition GIF, shifted right via `translate-x-20`

### TerminalShell — Click Focus Scoped

**Before:** Global `document.addEventListener("click", ...)` focused the terminal input on every click anywhere on the page, causing clicks in HomeSection to steal focus.

**After:** Added `terminalRef` to the terminal wrapper. The click handler now checks `terminalRef.current?.contains(e.target)` before focusing — only clicks inside the terminal itself trigger focus.

### Data Changes

- `socialLinks` array in `portfolio.js` now includes `{ platform: "instagram", url: "https://instagram.com/mozzy" }`

## Session 7 — Masonry Container Auto-Height

### Files Modified

| File | Changes |
|---|---|
| `src/components/Masonry.jsx` | Replaced `minHeight: 400` with dynamic `height` computed from the tallest column (`Math.max(...colHeights, 400)`). The `useMemo` now returns `{ items, height }` — container always matches content height, preventing overflow on mobile or with many items |
| `docs/2_documentation_components.md` | Updated Masonry behavior to note automatic container height |

### The Problem

All masonry items are `position: absolute`, so they don't contribute to the container's natural height. The fixed `minHeight: 400` caused items to overflow on mobile (1 column — all items stack vertically) or when many items were added. Cards appeared "stepped out of frame" below the container.

### The Fix

The `useMemo` that computes item positions now also tracks the tallest column's total height (`colHeights`). The result `{ items, height }` is used to set an explicit `height` on the container, making it always match the content regardless of device width or item count.

## Session 6 — Photo Card Mode for ProjectCard

### Files Modified

| File | Changes |
|---|---|---|
| `src/data/portfolio.js` | Replaced `isPhoto` boolean with `image: "Caffeinance.png"` string field. Restored 4 normal project entries (ecommerce-platform, cli-toolkit, api-gateway, design-system) alongside the photo card. Only the entry with an `image` field renders as a photo card |
| `src/sections/ProjectsSection.jsx` | Added `projectImages` map (`{ "Caffeinance.png": caffeinanceImg }`). Masonry item mapping now resolves `img` via `p.image ? projectImages[p.image] : null` — supports multiple photo cards |
| `src/components/ProjectCard.jsx` | Added **photo card mode** — when `item.img` exists, renders the image full-bleed with terminal title bar and a dark gradient overlay on hover. Overlay shows `$ Description:`, `$ Status:`, `$ Links:` (GitHub + Demo) with the same animejs fade+slide animation as default mode. Hooks (`detailsRef`, `isHovered`, `animRef`, `useEffect`) moved before the `if (item.img)` check so they're shared between both modes |
| `docs/5_modification_guide.md` | Updated photo card section: replaced `isPhoto: true` with `image: "filename.png"` field + `projectImages` map approach |
| `docs/2_documentation_components.md` | Updated `ProjectCard` docs: replaced `isPhoto`/`img` fields with single `img` field, clarified resolution via `projectImages` map |
| `docs/3_documentation_sections.md` | Updated `projects` data model: replaced `isPhoto` with `image` field, explained `projectImages` lookup |

### Photo Card Hover Overlay

- Uses the same `useEffect` + `animRef` animation pattern as the default card (`animejs`): opacity `[0,1]` + translateY `[8,0]`, 350ms enter / 250ms leave, `easeOutQuad`
- Dark gradient: `bg-gradient-to-t from-black/85 via-black/60 to-transparent`
- Text styled in white variants (`text-white/80`, `text-white/50`, `text-white/70`) for readability against dark overlay
- Links are clickable (`pointer-events` removed from overlay)

### How to Add More Photo Cards

1. Add the image file to `src/assets/`
2. Import it in `src/sections/ProjectsSection.jsx` and add an entry to `projectImages`
3. Set `image: "filename.png"` on the project entry in `src/data/portfolio.js`

## Session 5 — ProjectCard Terminal Window Refactor

### Files Modified

| File | Changes |
|---|---|
| `src/components/ProjectCard.jsx` | Full rewrite: replaced modern card (rounded corners, gradients, overlay) with terminal-window shell matching `TerminalWindow`. Default state: compact placeholder (`$ ls -la` / `$ nothing to show`). Hover state: details animate in via `anime.js` — `opacity [0,1]` + `translateY [8,0]`, 350ms enter / 250ms leave, `easeOutQuad`. Details include Description, Tech icons + names, Status with colored dot, GitHub/demo links. Animation properly cancels on rapid enter/leave via `animRef` |
| `src/sections/ProjectsSection.jsx` | Masonry props: `scaleOnHover={false}`, `blurToFocus={false}` — hover behavior now handled entirely inside `ProjectCard` |
| `src/data/portfolio.js` | Adjusted `height` values for all 6 projects (360–420, previously 200–360) to accommodate terminal card hover content |

### Animation Detail

- Uses `animate()` from `animejs` directly in a `useEffect` driven by `isHovered` state
- `animRef` stores the active animation instance; paused on re-trigger to prevent overlap
- Cleanup via `return () => animRef.current?.pause()` on unmount

## Session 4 — Resume Tab + Project Cards + Skill Details + Tech Carousel

### New Dependencies
| Package | Version | Purpose |
|---|---|---|
| `react-icons` | ^5.6.0 | Simple Icons SVG set for tech stack logos (SiReact, SiNodedotjs, etc.) |

### New Files Created

| File | Description |
|---|---|
| `src/components/Masonry.jsx` | GSAP-powered masonry grid layout with responsive column count, entrance animations (configurable direction), hover scale effect, blur-to-focus transition |
| `src/components/ProjectCard.jsx` | Rich project card with gradient background, tech icons row, status indicator dot, description + GitHub/demo links on hover |
| `src/components/AcademicCard.jsx` | Education card with GraduationCap icon, institution details, achievement tags |
| `src/components/CertCard.jsx` | Certification card with Award icon, issuer, date, description, optional Verify link |
| `src/components/LogoLoop.jsx` | Infinite auto-scrolling logo carousel with smooth easing, direction control, fade-out edges, hover pause/speed, responsive copy duplication |
| `src/components/ui/tooltip.jsx` | Radix UI Tooltip primitive wrapper with shadcn-style styling |

### Files Modified

| File | Changes |
|---|---|
| `index.html` | Page title changed from `"website"` to `"Mozzy Portfolio"` |
| `package.json` | Added `react-icons` dependency |
| `src/App.css` | Deleted (was empty) |
| `src/App.jsx` | Tab key `"projects"` → `"resume"` |
| `src/data/portfolio.js` | `tabs`: `"projects"` → `"resume"`. `projects[]` restructured from `ls -la` format to rich objects (`id`, `name`, `description`, `tech[]`, `github`, `demo`, `status`, `height`). Added `skillDetail{}`, `academic[]`, `certifications[]`, `portfolioTech[]`. Updated exports |
| `src/sections/ProjectsSection.jsx` | Completely reworked: replaced `ls -la` table with 3 stacked terminal windows — Academic cards (`~/academic`) → Masonry project grid (`~/projects`) → Certification cards (`~/certifications`). Animated with staggered GSAP entrance per section |
| `src/sections/SkillsSection.jsx` | Added tech logo carousel (`LogoLoop`) with tooltips wrapping portfolio tech icons. Skill badges now clickable (toggle selection) → detail panel shows description + category from `skillDetail`. Added `react-icons/si` icon map. Detail panel animated via `animejs` |

### Data Model Changes

- **`projects[]`** — Each entry changed from flat `{ perms, links, owner, group, size, date, name }` to rich `{ id, name, description, tech[], github, demo, status, height }`
- **`skillDetail{}`** — New object keyed by skill name with `{ description, category }` — powers the skill detail panel
- **`academic[]`** — New array with `{ institution, degree, period, description, achievements[] }`
- **`certifications[]`** — New array with `{ name, issuer, date, description, credentialUrl }`
- **`portfolioTech[]`** — New array with `{ name, icon, description, href }` — drives the LogoLoop carousel in SkillsSection

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
