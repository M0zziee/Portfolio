# Components

All reusable components live in `src/components/`. They are portable — drop them anywhere in a React tree.

---

## TerminalWindow

Terminal chrome wrapper with title bar (● ● ● dots), content area, and optional status bar.

```jsx
import { TerminalWindow } from "@/components/TerminalWindow"
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `"terminal"` | Window title shown in the title bar |
| `statusBar` | `string` | — | Optional text rendered in a bottom status bar |
| `className` | `string` | — | Additional Tailwind classes |
| `children` | `ReactNode` | — | Content inside the window |

**Padding:** `p-3 sm:p-4` — reduced on mobile for more content space.

**Example:**
```jsx
<TerminalWindow title="~/projects" statusBar="NORMAL  UTF-8">
  <p>project content here</p>
</TerminalWindow>
```

Renders:
```
┌── ● ● ● ── ~/projects ─────────────┐
│                                      │
│  project content here                │
│                                      │
└── NORMAL  UTF-8 ─────────────────────┘
```

---

## TabBar

Terminal-style tab navigation. Each tab is a bordered button. Sticks to the top of the viewport when scrolling.

```jsx
import { TabBar } from "@/components/TabBar"
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `tabs` | `string[]` | — | Array of tab labels (lowercase) |
| `activeTab` | `string` | — | Currently active tab label |
| `onChange` | `(tab: string) => void` | — | Called when a tab is clicked |
| `className` | `string` | — | Additional Tailwind classes |

**Positioning:** `sticky top-0 z-50` — stays visible as the user scrolls.

**Example:**
```jsx
const [tab, setTab] = useState("home")
<TabBar tabs={["home", "projects", "contact"]} activeTab={tab} onChange={setTab} />
```

---

## ThemeToggle

Floating dark/light mode toggle button. Uses `Sun` / `Moon` icons from `lucide-react`.

```jsx
import { ThemeToggle } from "@/components/ThemeToggle"
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `"dark" \| "light"` | — | Current theme |
| `onToggle` | `() => void` | — | Called when button is clicked |
| `className` | `string` | — | Additional Tailwind classes |

**Example:**
```jsx
<ThemeToggle theme={theme} onToggle={toggleTheme} />
```

Positioned `fixed top-3 right-3 sm:top-6 sm:right-6 z-50`. Shows current mode label + icon.

---

## AsciiArt

Renders ASCII art as a `<pre>` block. Comes with a default "M" logo, or you can pass custom art.

```jsx
import { AsciiArt } from "@/components/AsciiArt"
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | default art | Content rendered beside the ASCII art |
| `className` | `string` | — | Additional Tailwind classes |

**Layout:** `flex-col md:flex-row items-start gap-4 md:gap-8`
- Stacks vertically on mobile, side-by-side on desktop
- ASCII art `<pre>` is `hidden sm:block` (hidden on very small screens)

**Example:**
```jsx
<AsciiArt>
  <p>Content beside the M logo</p>
</AsciiArt>
```

---

## NeofetchCard

System-info card styled like `neofetch` output. Shows ASCII art on the left and key: value pairs on the right.

```jsx
import { NeofetchCard } from "@/components/NeofetchCard"
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `ascii` | `string[]` | default art | Lines of ASCII art |
| `info` | `string[]` | — | Lines in `"Key: Value"` format |
| `className` | `string` | — | Additional Tailwind classes |

**Layout:** `flex-col sm:flex-row gap-4 sm:gap-6`
- Stacks vertically on mobile, side-by-side on `sm:` and up
- ASCII art `<pre>` is `hidden sm:block` (hidden on very small screens)

**Example:**
```jsx
<NeofetchCard
  ascii={[" .---. ", "/     \\", "\\.@-@./", "'-o-o-'"]}
  info={["User: Mozzy", "OS: React 19", "Shell: zsh"]}
/>
```

---

## TerminalOutput

Single line of terminal output with a prompt prefix.

```jsx
import { TerminalOutput } from "@/components/TerminalOutput"
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `prompt` | `string` | `"$"` | Prompt symbol |
| `className` | `string` | — | Additional Tailwind classes |
| `children` | `ReactNode` | — | Content after the prompt |

Has an alias `TerminalOutputBlock` that accepts `lines: string[]` instead of children.

**Example:**
```jsx
<TerminalOutput prompt="$">npm run dev</TerminalOutput>

<TerminalOutputBlock prompt="$" lines={["cat about.md", "", "Hello world"]} />
```

---

## TypewriterText

Text that types itself out character by character with a blinking cursor.

```jsx
import { TypewriterText } from "@/components/TypewriterText"
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | — | Text to type out |
| `speed` | `number` | `40` | Milliseconds per character |
| `cursor` | `boolean` | `true` | Show blinking cursor |
| `onComplete` | `() => void` | — | Fires when typing finishes |
| `className` | `string` | — | Additional Tailwind classes |

**Example:**
```jsx
<TypewriterText text="Hello, world!" speed={50} onComplete={() => console.log("done")} />
```

---

## LsListing

`ls -la` style directory listing with responsive column visibility.

```jsx
import { LsListing } from "@/components/LsListing"
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `LsItem[]` | `[]` | Array of file entries |
| `showTotal` | `boolean` | `true` | Show `total N` line at top |
| `className` | `string` | — | Additional Tailwind classes |

**`LsItem` shape:**

| Field | Type | Description |
|---|---|---|
| `perms` | `string` | e.g. `-rw-r--r--`, `drwxr-xr-x` |
| `links` | `number` | Hard link count |
| `owner` | `string` | File owner |
| `group` | `string` | File group |
| `size` | `number` | File size in bytes |
| `date` | `string` | ISO date string |
| `name` | `string` | File/dir name |

**Column visibility (responsive):**

| Column | Mobile | `sm:` | `md:` | `lg:` |
|---|---|---|---|---|
| perms | ✅ | ✅ | ✅ | ✅ |
| links | ❌ | ✅ | ✅ | ✅ |
| owner | ❌ | ❌ | ✅ | ✅ |
| group | ❌ | ❌ | ❌ | ✅ |
| size | ✅ | ✅ | ✅ | ✅ |
| modified | ❌ | ✅ | ✅ | ✅ |
| name | ✅ | ✅ | ✅ | ✅ |

Wrapped in `overflow-x-auto` + `min-w-[400px]` for horizontal scroll on very narrow screens.

---

## TerminalInput / TerminalTextarea

Form inputs styled as terminal command lines.

```jsx
import { TerminalInput, TerminalTextarea } from "@/components/TerminalInput"
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `prompt` | `string` | `"$"` | Prompt symbol |
| `label` | `string` | — | Field label (rendered as `$ label:`) |
| All standard `<input>/<textarea>` props | — | — | e.g. `placeholder`, `type`, `value`, `onChange` |

**Example:**
```jsx
<TerminalInput label="name" placeholder="your name" />
<TerminalInput label="email" type="email" placeholder="you@example.com" />
<TerminalTextarea label="message" placeholder="say something..." />
```

Renders:
```
$ name: [________________]
$ email: [_______________]
$ message: [_____________]
```

---

## PixelSnow

Three.js shader-based snow/particle effect. Renders as an `absolute inset-0` overlay. Used globally in `App.jsx` as a site-wide background effect.

```jsx
import PixelSnow from "@/components/PixelSnow"
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `color` | `string` | `"#ffffff"` | Color of the snowflakes |
| `flakeSize` | `number` | `0.01` | Size of snowflakes in scene units |
| `minFlakeSize` | `number` | `1.25` | Minimum flake size in pixels on screen |
| `pixelResolution` | `number` | `200` | Lower = larger pixels, more retro |
| `speed` | `number` | `1.25` | Animation speed multiplier |
| `depthFade` | `number` | `8` | How quickly distant flakes fade |
| `farPlane` | `number` | `20` | Render distance for flakes |
| `brightness` | `number` | `1` | Overall brightness |
| `gamma` | `number` | `0.4545` | Gamma correction |
| `density` | `number` | `0.3` | Flake probability (0-1) |
| `variant` | `"square"` \| `"round"` \| `"snowflake"` | `"square"` | Flake shape |
| `direction` | `number` | `125` | Wind angle (degrees) |
| `className` | `string` | `""` | Additional CSS classes |
| `style` | `object` | `{}` | Additional inline styles |

**Usage (global in App.jsx):**
```jsx
<div className="relative">
  <PixelSnow color="#ffffff" density={0.2} speed={0.8} variant="round" />
  <div className="relative z-10">{/* page content */}</div>
</div>
```

**Behavior:**
- Uses `IntersectionObserver` — pauses when scrolled out of view
- Debounced resize handler
- Renders at reduced pixel ratio (max 2x) for performance
- Transparent background overlaid via `alpha: true`

---

## PixelTransition

Animated pixel-grid hover/click transition between two content states. Uses GSAP for the staggered pixel animation.

```jsx
import PixelTransition from "@/components/PixelTransition"
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `firstContent` | `ReactNode` | — | Initial content layer |
| `secondContent` | `ReactNode` | — | Content revealed on hover/click |
| `gridSize` | `number` | `7` | Number of rows/columns in the pixel grid |
| `pixelColor` | `string` | `"currentColor"` | Color of the transition pixels |
| `animationStepDuration` | `number` | `0.3` | Total animation duration in seconds |
| `once` | `boolean` | `false` | If true, only animates once (no leave transition) |
| `aspectRatio` | `string` | `"100%"` | CSS `padding-top` value for aspect ratio box |
| `className` | `string` | `""` | Additional CSS classes |
| `style` | `object` | `{}` | Additional inline styles |

**Usage:**
```jsx
<PixelTransition
  firstContent={<img src={gif1} alt="" className="w-full h-full object-cover" />}
  secondContent={<img src={gif2} alt="" className="w-full h-full object-cover" />}
  gridSize={8}
  pixelColor="currentColor"
  animationStepDuration={0.4}
  aspectRatio="56.25%"
  className="w-full md:w-lg border border-border overflow-hidden"
/>
```

**Behavior:**
- Desktop: triggers on `mouseenter` / `mouseleave`
- Touch: toggles on `click`
- Generates a grid of div pixels that randomly stagger their reveal

---

## TerminalShell

Interactive mini command-line shell. Users type commands and get terminal-style responses. Built for the About section's fortune/quotes feature but reusable anywhere.

```jsx
import { TerminalShell } from "@/components/TerminalShell"
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `quotes` | `{ text, author }[]` | — | Array of quote objects used by `fortune` / `quotes` commands |
| `className` | `string` | — | Additional Tailwind classes |

**Built-in commands:**

| Command | Description |
|---|---|
| `fortune` / `quotes` | Displays a random quote from the `quotes` array |
| `whoami` | Shows user info (name, host, role, location) |
| `date` | Shows current date and time |
| `social` | Lists social links inline |
| `help` | Lists all available commands |
| `clear` | Clears the terminal history |

**Features:**
- Command history — press **↑** / **↓** to recall previous commands
- Scrollable output area (max 48 lines, auto-scrolls to bottom)
- Auto-focuses input on click anywhere in the shell
- Returns to initial help message on reset

**Example:**
```jsx
<TerminalShell quotes={quotes} />
```

---

## SocialLinks

Terminal-styled social link list with brand SVG icons and hover animations.

```jsx
import { SocialLinks } from "@/components/SocialLinks"
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `links` | `{ platform, url }[]` | — | Array of social platform entries |
| `className` | `string` | — | Additional Tailwind classes |

**Supported platforms:** `github`, `linkedin`, `x`, `instagram` — each has a brand SVG icon built in.

**Hover behavior:**
- `scale(1.02)` + slight right translate
- Color shifts to platform brand color (GitHub: white, LinkedIn: `#0a66c2`, X: `#1d9bf0`, Instagram: `#E4405F`)
- Icon, platform name, and URL all transition smoothly via `transition-all duration-200`

**Example:**
```jsx
const links = [
  { platform: "github", url: "https://github.com/mozzy" },
  { platform: "linkedin", url: "https://linkedin.com/in/mozzy" },
]
<SocialLinks links={links} />
```

---

## LsListing

*See existing documentation above. Added prop:*

| Prop | Type | Default | Description |
|---|---|---|---|
| `rowIdPrefix` | `string` | — | If set, each row `<div>` gets `data-id="{prefix}-{index}"` — used by anime.js stagger selectors |

---

## Masonry

GSAP-powered masonry grid with entrance animations, responsive column count, and hover effects.

```jsx
import Masonry from "@/components/Masonry"
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `object[]` | — | Array of items — each needs `id`, `height`, and optional `url` |
| `renderItem` | `(item) => ReactNode` | — | Custom render function per item |
| `ease` | `string` | `"power3.out"` | GSAP easing function |
| `duration` | `number` | `0.6` | Animation duration in seconds |
| `stagger` | `number` | `0.05` | Stagger delay between items in seconds |
| `animateFrom` | `string` | `"bottom"` | Entrance direction: `"top"`, `"bottom"`, `"left"`, `"right"`, `"center"`, `"random"` |
| `scaleOnHover` | `boolean` | `true` | Whether items scale down on hover |
| `hoverScale` | `number` | `0.95` | Scale factor on hover |
| `blurToFocus` | `boolean` | `true` | Items start blurred then clear on entrance |
| `colorShiftOnHover` | `boolean` | `false` | Color overlay on hover (expects `.color-overlay` in children) |

**Behavior:**
- Responsive columns: 5 (≥1500px), 4 (≥1000px), 3 (≥600px), 2 (≥400px), 1 (default)
- Items positioned absolutely via `useMemo` — recalculates on resize
- Container height automatically matches the tallest column — all content stays in frame on any device
- Entrance: GSAP `fromTo` from offscreen/direction to final position
- Re-layout: GSAP `.to()` on subsequent renders (for responsive column changes)
- Hover: GSAP scale animation with `power2.out` easing

**Example:**
```jsx
<Masonry
  items={projects}
  renderItem={(item) => <ProjectCard item={item} />}
  animateFrom="bottom"
  stagger={0.05}
  scaleOnHover={false}
  blurToFocus={false}
/>
```

---

## ProjectCard

Terminal-window-styled project card designed for use inside `Masonry`. Supports two modes:

- **Default mode:** shows a compact terminal placeholder (`$ ls -la` / `$ nothing to show`) and reveals full project details on hover with an anime.js entrance animation
- **Photo card mode:** when `item.img` is set, renders a full-bleed image with the terminal title bar and a dark gradient overlay that reveals Description, Status, and GitHub/Demo links on hover

```jsx
import ProjectCard from "@/components/ProjectCard"
```

| Prop | Type | Description |
|---|---|---|
| `item` | `object` | Project object with `id`, `name`, `description`, `tech[]`, `status`, `github`, `demo`; optional `img` |

**Fields used from `item`:**

| Field | Description |
|---|---|
| `id` | Identifier key (unused visually) |
| `name` | Project name shown in the terminal title bar |
| `description` | Shown in hover details as `$ Description:` line |
| `tech` | Array of tech names — mapped to Simple Icons (React, Node.js, PostgreSQL, Go, Tailwind CSS, Next.js, Redis, Docker, TypeScript, JavaScript) |
| `status` | Controls title bar dot color: `"active"` → green, `"wip"` → yellow, `"archived"` → muted |
| `github` | GitHub link shown in `$ Links:` line |
| `demo` | Demo link shown in `$ Links:` line |
| `img` | (Optional) Image URL (set by `ProjectsSection` from `projectImages` map). If present, the card switches to **photo card mode** and renders the image full-bleed instead of terminal text |

### Default Mode Layout

```
┌── ● ● ● ── ecommerce-platform ─────── ● ─┐
│                                             │
│  $ ls -la                                   │
│  $ nothing to show                          │
│                                             │
│  ┌─── hover reveals ───────────────────┐   │
│  │  $ cat README.md                     │   │
│  │  $ Description: Full-stack e-com... │   │
│  │  $ Tech:    [R][N][P]  React, ...   │   │
│  │  $ Status:  ● active                 │   │
│  │  $ Links:   github  demo             │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### Photo Card Mode Layout

```
┌── ● ● ● ── caffeinance ────────────── ● ─┐
│                                             │
│  ┌─────────────────────────────────┐       │
│  │                                 │       │
│  │         [IMAGE]                 │       │
│  │                                 │       │
│  │  ┌── hover overlay ────────┐   │       │
│  │  │  $ Description: ...     │   │       │
│  │  │  $ Status:  ● active    │   │       │
│  │  │  $ Tech:    [R][N][P]   │   │       │
│  │  │  $ Links:   github demo │   │       │
│  │  └─────────────────────────┘   │       │
│  └─────────────────────────────────┘       │
└─────────────────────────────────────────────┘
```

**Behavior (default mode):**
- Outer shell matches `TerminalWindow` exactly: `border border-border bg-background font-sans text-xs` with title bar (● ● ● dots + project name) and right-aligned status dot
- **Default state:** placeholder shows `$ ls -la` + `$ nothing to show` in centered content area
- **Hover enter:** details container animates via `anime.js` — `opacity [0,1]` + `translateY [8,0]`, 350ms, `easeOutQuad`
- **Hover leave:** reverse animation — `opacity [1,0]` + `translateY [0,8]`, 250ms, `easeOutQuad`
- Previous animation is paused on rapid enter/leave via `animRef`
- Placeholder fades to `opacity-15` during hover via CSS transition
- Links (GitHub, demo) are always clickable with `e.stopPropagation()`

**Behavior (photo card mode):**
- Same terminal title bar with traffic-light dots, project name, and status dot
- Image fills the card body via `object-cover`
- On hover, a dark gradient overlay (`from-black/85 via-black/60 to-transparent`) slides up and fades in (same animejs animation as default mode) showing Description, Status, Tech icons, and clickable GitHub/Demo links
- `pointer-events-none` is omitted so links in the overlay are clickable

---

## AcademicCard

Education card with gradient icon, institution details, and achievement tags.

```jsx
import AcademicCard from "@/components/AcademicCard"
```

| Prop | Type | Description |
|---|---|---|
| `item` | `object` | Academic entry with `institution`, `degree`, `period`, `description`, `achievements[]` |
| `index` | `number` | Index for gradient cycling |

**Example:**
```jsx
<AcademicCard item={academic[0]} index={0} />
```

---

## CertCard

Certification card with award icon, issuer info, and optional verify link.

```jsx
import CertCard from "@/components/CertCard"
```

| Prop | Type | Description |
|---|---|---|
| `item` | `object` | Cert entry with `name`, `issuer`, `date`, `description`, `credentialUrl` |
| `index` | `number` | Index for gradient cycling |

**Example:**
```jsx
<CertCard item={certifications[0]} index={0} />
```

---

## LogoLoop

Infinite auto-scrolling logo carousel with smooth easing, responsive behavior, and accessible markup.

```jsx
import { LogoLoop } from "@/components/LogoLoop"
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `logos` | `object[]` | — | Array of logo items — supports `{ node, title, href }` (React nodes) or `{ src, alt, href }` (images) |
| `speed` | `number` | `120` | Scroll speed in px/s |
| `direction` | `string` | `"left"` | `"left"`, `"right"`, `"up"`, `"down"` |
| `width` | `string` | `"100%"` | Container width |
| `logoHeight` | `number` | `28` | Logo height in px |
| `gap` | `number` | `32` | Gap between logos in px |
| `pauseOnHover` | `boolean` | — | Pause scrolling on hover (sets hover speed to 0) |
| `hoverSpeed` | `number` | — | Custom speed on hover (overrides pauseOnHover) |
| `fadeOut` | `boolean` | `false` | Show fade-to-background edges |
| `scaleOnHover` | `boolean` | `false` | Scale up individual logos on hover |
| `renderItem` | `(item, key) => ReactNode` | — | Custom render function for each logo |
| `ariaLabel` | `string` | `"Partner logos"` | ARIA label for the region |
| `className` | `string` | — | Additional Tailwind classes |

**Behavior:**
- Uses `requestAnimationFrame` loop with smooth velocity easing
- Automatically duplicates logos to fill visible area
- Respects `prefers-reduced-motion`
- Fade edges use CSS gradients matching the background color (auto-detects dark/light)
- Responsive: recalculates copy count on resize

**Example:**
```jsx
<LogoLoop
  logos={techLogos}
  speed={60}
  direction="left"
  logoHeight={32}
  gap={48}
  fadeOut
  renderItem={(item) => (
    <Tooltip>
      <TooltipTrigger><span>{item.node}</span></TooltipTrigger>
      <TooltipContent><span>{item.title}</span></TooltipContent>
    </Tooltip>
  )}
/>
```

---

## Tooltip (ui/tooltip)

Radix UI Tooltip primitive wrapper with shadcn-style styling.

```jsx
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
```

**Components exported:**

| Component | Description |
|---|---|
| `TooltipProvider` | Wraps tooltip group — sets `delayDuration` (default `0`) |
| `Tooltip` | Radix `Tooltip.Root` — controls open state |
| `TooltipTrigger` | Radix `Tooltip.Trigger` — `asChild` by default |
| `TooltipContent` | Styled tooltip popover with border, shadow, animation classes |

**Example:**
```jsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <button>Hover me</button>
    </TooltipTrigger>
    <TooltipContent side="top">Tooltip text</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

## useAnimateIn (Hook)

Custom hook for mount-triggered entrance animations using anime.js.

```jsx
import { useAnimateIn } from "@/hooks/useAnimateIn"
```

| Param | Type | Description |
|---|---|---|
| `ref` | `React.RefObject` | A `useRef()` attached to the container element |
| `params` | `object` | Anime.js parameters (targets are resolved from `selector` or the ref element) |

**Key `params` fields:**

| Field | Type | Default | Description |
|---|---|---|---|
| `selector` | `string` | — | CSS selector to pick child elements (e.g., `"[data-id='...']"`). Omitting it animates the ref element itself |
| `opacity` | `[number, number]` | `[0, 1]` | Fade from/to |
| `translateY` | `[number, number]` | `[15, 0]` | Slide up from below |
| `duration` | `number` | `500` | Animation duration in ms |
| `delay` | `number \| function` | `stagger(60, { start: 100, from: 'first' })` | Delay per element. Pass `stagger(ms, {...})` from animejs |
| Any anime.js param | — | — | Pass any valid anime.js property (scale, rotate, translateX, easing, etc.) |

**Important:** the hook runs once on mount (entrance animation). It does not re-run if params change. For tab switching animations, sections remount naturally via conditional rendering in `App.jsx`.

**Example:**
```jsx
import { useRef } from "react"
import { useAnimateIn } from "@/hooks/useAnimateIn"
import { stagger } from "animejs"

function MySection() {
  const ref = useRef(null)

  useAnimateIn(ref, {
    selector: ".item",
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 600,
    delay: stagger(100, { from: "first", start: 200 }),
  })

  return (
    <div ref={ref}>
      <div className="item">One</div>
      <div className="item">Two</div>
      <div className="item">Three</div>
    </div>
  )
}
```
