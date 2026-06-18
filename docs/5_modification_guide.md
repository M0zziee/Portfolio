# How to Modify Everything — Section-by-Section Reference

All content data lives in `src/data/portfolio.js`. Each section imports its data from there and renders it through components in `src/components/` and `src/sections/`.

---

## 1. Global / App-Level Changes

**File:** `src/App.jsx`

### Add / Remove / Rename Tabs

Edit `tabs` in `src/data/portfolio.js:1`:

```js
const tabs = ["home", "resume", "contact"];
//            ^      ^          ^
//            tab IDs — must match the activeTab checks in App.jsx
```

Then in `src/App.jsx:43-51`, add or remove the corresponding render block:

```jsx
{activeTab === "new-tab" && <NewSection />}
```

You must also **import** the new section at the top of `App.jsx`.

### Change PixelSnow Background

`src/App.jsx:30-37`:

```jsx
<PixelSnow
  color="#ffffff"       // Snowflake color
  density={0.2}        // 0-1, higher = more flakes
  speed={0.8}          // Animation speed multiplier
  variant="round"      // "square" | "round" | "snowflake"
  pixelResolution={300} // Lower = more pixelated
  depthFade={5}        // How fast flakes fade in distance
  brightness={0.6}     // 0-1 overall brightness
/>
```

### Change Tab Switch Animation

`src/App.jsx:19-26`:

```jsx
animate(contentRef.current, {
  opacity: [0, 1],
  translateY: [8, 0],  // Adjust slide distance
  duration: 400,        // Adjust speed
  easing: "easeOutQuad",
})
```

---

## 2. HomeSection

**File:** `src/sections/HomeSection.jsx`

### Change Greeting Text

Line 41-42 — TypewriterText for main greeting:

```jsx
<TypewriterText
  text="Hello My name Is Fathir"    // ← change this
  speed={90}
  className="text-2xl md:text-3xl text-foreground"
/>
```

### Change Rotating Words

Line 53-55 — RotatingTypewriter cycles through words:

```jsx
<RotatingTypewriter
  words={["Full-Stack", "Front-End", "Designer", "Game-Dev"]}
//       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//       Add or remove words here
  className="text-xl md:text-2xl"
/>
```

Props for `RotatingTypewriter` (`src/components/RotatingTypewriter.jsx`):

| Prop | Default | Description |
|---|---|---|
| `words` | `[]` | Array of strings to cycle through |
| `speed` | `80` | Typing speed (ms per char) |
| `deleteSpeed` | `40` | Deleting speed (ms per char) |
| `pause` | `2000` | Pause before deleting (ms) |

### Change Description Text

Lines 64-69 — Long typewriter description:

```jsx
<TypewriterText
  text="I am a full-stack web developer..."  // ← change this
  speed={6}
/>
```

### Change GIFs

Lines 12-13 — Imports at top:

```jsx
import gif1 from "@/assets/Chisato1.gif"   // ← replace files
import gif2 from "@/assets/Chisato2.gif"   // ← replace files
```

Lines 75-94 — PixelTransition passes them:

```jsx
<PixelTransition
  firstContent={<img src={gif1} ... />}
  secondContent={<img src={gif2} ... />}
  gridSize={8}            // pixel grid resolution
  pixelColor="currentColor"
  animationStepDuration={0.4}  // transition speed
  aspectRatio="56.25%"         // 16:9 ratio
/>
```

### Change Neofetch Info

Edit `neofetchInfo` in `src/data/portfolio.js:3-11`:

```js
const neofetchInfo = [
  "User: Mozzy",
  "Host: portfolio",
  "OS: React 19",
  "Shell: zsh 7.0",
  "Role: Full-Stack Developer",
  "Location: Indonesia : Garut, Jawa-barat",
  "Uptime: 1 years 4 months",
];
// Add or remove lines — each is "Label: Value"
```

### Change ASCII Art

Edit `art` in `src/components/AsciiArt.jsx:3` — currently empty (no art displayed). The file still renders the "M" logo only if `art` is populated.

---

## 3. AboutSection

**File:** `src/sections/AboutSection.jsx`

### Change Bio Text

Edit `aboutLines` in `src/data/portfolio.js:226-234`:

```js
const aboutLines = [
  "Hi, I'm Mozzy a Full-Stack Developer...",
  "I enjoy turning ideas into products...",
  " ",  // empty string = blank line
  "Beyond web development...",
  " ",
  "When I'm not coding...",
  "open-source projects.",
];
// Each line becomes a >-prefixed terminal output line
```

### Change Quotes (Fortune Shell)

Edit `quotes` in `src/data/portfolio.js:104-115`:

```js
const quotes = [
  { text: "Quote text", author: "Author Name" },
  // Add or remove entries
];
// Used by TerminalShell's "fortune" / "quotes" commands
```

### Change Social Links

Edit `socialLinks` in `src/data/portfolio.js:220-224`:

```js
const socialLinks = [
  { platform: "github", url: "https://github.com/mozzy" },
  { platform: "linkedin", url: "https://linkedin.com/in/mozzy" },
  { platform: "instagram", url: "https://instagram.com/mozzy" },
  { platform: "x", url: "https://x.com/mozzy" },
];
// Supported platforms: "github", "linkedin", "x", "instagram"
// Each platform must have a matching SVG icon in SocialLinks component
```

To add a new platform, you must also add its icon to `src/components/SocialLinks.jsx` — add an SVG path to the `icons` object and a brand color to `platformColors`.

---

## 4. SkillsSection

**File:** `src/sections/SkillsSection.jsx`

### Change Skill Categories & Badges

Edit `skills` in `src/data/portfolio.js:13-18`:

```js
const skills = {
  languages: ["JavaScript", "TypeScript", "Python", "Go", "Rust"],
  frontend: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Radix UI"],
  backend: ["Node.js", "Express", "PostgreSQL", "Redis"],
  tools: ["Git", "Docker", "Neovim", "Figma"],
};
// Key = category name displayed as [category]
// Array = skill badges shown below the category
```

### Change Skill Details (Click Panel)

Edit `skillDetail` in `src/data/portfolio.js:20-39`. Every skill name in `skills` should have a matching key:

```js
const skillDetail = {
  JavaScript: { description: "Dynamic programming language...", category: "languages" },
  React: { description: "UI framework for building...", category: "frontend" },
  // ... one entry per skill
};
// description = shown in detail panel
// category = shown in detail panel (should match the skills key)
```

### Change Tech Carousel (LogoLoop)

Edit `portfolioTech` in `src/data/portfolio.js:151-218`:

```js
const portfolioTech = [
  { name: "React", icon: "SiReact", description: "UI framework...", href: "https://react.dev" },
  // icon must match a key in iconMap in SkillsSection.jsx:29-41
];
```

When adding a new tech:
1. Add entry to `portfolioTech` array
2. Import the matching `SiIcon` from `react-icons/si` in `SkillsSection.jsx:15-27`
3. Add it to `iconMap` in `SkillsSection.jsx:29-41`

### Adjust LogoLoop Config

In `src/sections/SkillsSection.jsx:118-146`:

```jsx
<LogoLoop
  logos={techLogos}
  speed={60}             // Scroll speed (px/s)
  direction="left"       // "left" | "right" | "up" | "down"
  logoHeight={32}        // Icon size in px
  gap={48}              // Spacing between logos
  hoverSpeed={0}         // 0 = pause on hover
  fadeOut               // Show fade edges
/>
```

---

## 5. ProjectsSection (Resume Tab)

**File:** `src/sections/ProjectsSection.jsx`

### Add/Edit Education Entries

Edit `academic` in `src/data/portfolio.js:117-132`:

```js
const academic = [
  {
    institution: "Universitas Garut",
    degree: "Bachelor of Computer Science",
    period: "2022 - 2026",
    description: "Focused on software engineering...",
    achievements: ["GPA: 3.8/4.0", "Thesis on web performance..."],
    // ^ optional — shown as tags
  },
];
```

### Add/Edit Project Cards

Edit `projects` in `src/data/portfolio.js`:

```js
const projects = [
  {
    id: 0,                    // unique, consecutive
    name: "ecommerce-platform",
    description: "Full-stack e-commerce platform...",
    tech: ["React", "Node.js", "PostgreSQL"],
    // ^ mapped to Simple Icons in ProjectCard (see supported list below)
    github: "https://github.com/mozzy/...",
    demo: null,                // null = hide demo link
    status: "active",          // "active" | "wip" | "archived"
    height: 420,               // Masonry cell height (rendered as height/2)
  },
];
```

**Supported tech icons in `ProjectCard` (`src/components/ProjectCard.jsx:20-31`):**

`React`, `Node.js`, `PostgreSQL`, `Go`, `Tailwind CSS`, `Next.js`, `Redis`, `Docker`, `TypeScript`, `JavaScript`

To add a new tech icon:
1. Import from `react-icons/si` in `ProjectCard.jsx`
2. Add it to `techIconMap` — key matches the string in `projects[n].tech[]`

**Adjusting Masonry cell `height`:**

The `height` value is divided by 2 by `Masonry` to get the rendered pixel height. The content inside the card (title bar ~32px + padding ~24px + 5 hover lines ~110px) needs about **170px minimum**. Set `height` to at least **360** (rendered as 180px).

**Status colors:**
- `"active"` → green dot
- `"wip"` → yellow dot
- `"archived"` → muted dot

### Add a Photo Card (Image Instead of Terminal Output)

To show a `.png`/`.gif` image inside a project card instead of terminal output:

1. **Add your image file** to `src/assets/` (e.g., `photo.png`).

2. **Set up the project entry in `src/data/portfolio.js`** with an `image` field:
   ```js
   {
     id: 0,
     image: "photo.png",        // filename in src/assets/ — triggers photo card mode
     name: "my-photo",         // shown in the title bar
     description: "My photo",
     tech: [],
     github: null,
     demo: null,
     status: "active",
     height: 600,              // adjust for desired card height
   }
   ```
   Entries **without** an `image` field render as normal terminal project cards.

3. **Import and register the image** in `src/sections/ProjectsSection.jsx`:
   ```js
   import myPhoto from "@/assets/photo.png"

   const projectImages = {
     "photo.png": myPhoto,       // key must match the `image` field in portfolio.js
   }
   ```
   The `projectImages` map automatically resolves filenames to imported URLs.

4. **The photo card uses `object-cover`** — the image fills the card area while preserving aspect ratio. Adjust `height` in the project data to control the card size.

5. **The photo card hover overlay shows Tech icons** — same `techIconMap` as the text card. Set `tech: ["React", "Node.js", ...]` on the project entry to display tech icons in the overlay.

To add **multiple** photo cards, repeat steps 1-3: import each file and add one entry to `projectImages`.

### Add/Edit Certifications

Edit `certifications` in `src/data/portfolio.js:134-149`:

```js
const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Dec 2024",
    description: "Foundational understanding...",
    credentialUrl: "#",  // set to "#" to hide Verify link
  },
];
```

---

## 6. ContactSection

**File:** `src/sections/ContactSection.jsx`

### Change Form Fields

The form uses controlled inputs with `useState`. Edit the labels, placeholders, and state:

```jsx
const [name, setName] = useState("")
const [mail, setMail] = useState("")
const [message, setMessage] = useState("")

// ...

<TerminalInput
  label="name"              // ← change label text
  placeholder="your name"   // ← change placeholder
  value={name}
  onChange={(e) => setName(e.target.value)}
  required
/>

<TerminalInput
  label="email"
  type="email"
  placeholder="you@example.com"
  value={mail}
  onChange={(e) => setMail(e.target.value)}
  required
/>

<TerminalTextarea
  label="message"
  placeholder="say something..."
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  required
/>
```

To add/remove fields, duplicate/remove the `div[data-id="contact-field"]` block and add corresponding `useState`.

### Change Submit Button

```jsx
<Button type="submit" size="sm" variant="default" disabled={status === "loading"}>
  {status === "loading" ? "[Sending...]" : "[Send]"}
</Button>
```

The button shows `[Sending...]` and disables itself during submission.

### Wire Up Email Service (TODO)

The `handleSubmit` function validates then returns. To make it functional, replace the TODO:

```jsx
const handleSubmit = async (e) => {
  e.preventDefault()
  if (!validate()) return
  setStatus("loading")

  try {
    // Example with fetch + Formspree:
    const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email: mail, message }),
    })
    if (!res.ok) throw new Error("send failed")
    setStatus("success")
    setName(""); setMail(""); setMessage("")
  } catch {
    setStatus("error")
  }
}
```

### Change Contact Email

Edit the `email` field in `src/data/portfolio.js`:

```js
const email = "mozzy@example.com"   // ← change to your email
```

---

## 7. Animation Configuration

### Section Entrance Animations

Each section uses `useAnimateIn` hook from `src/hooks/useAnimateIn.js`:

```jsx
useAnimateIn(sectionRef, {
  selector: "[data-id='...']",  // CSS selector targeting child elements
  translateY: [15, 0],          // start from 15px below, end at 0
  opacity: [0, 1],              // fade in
  duration: 500,                // ms
  delay: stagger(100, {         // stagger between elements
    from: "first",              // "first" | "last" | "center" | index
    start: 200,                 // initial delay before first element
  }),
  // Any anime.js param works: scale, rotate, translateX, easing, etc.
})
```

The hook runs once on mount. Sections remount when their tab becomes active (React conditional rendering), so animations play on each tab switch.

### Tab Switch Animation

In `src/App.jsx:19-26`:

```jsx
animate(contentRef.current, {
  opacity: [0, 1],
  translateY: [8, 0],
  duration: 400,
  easing: "easeOutQuad",
})
```

---

## 8. Theme / Styling

### CSS Variables

All colors are defined in `src/index.css`:

- `:root` = light mode
- `.dark` = dark mode

Key variables: `--background`, `--foreground`, `--muted`, `--muted-foreground`, `--border`, `--primary`, etc.

### Fonts

Defined in `src/index.css` under `@theme inline`:

```css
--font-sans: "Oxanium Variable", monospace;
--font-heading: "Space Grotesk Variable", sans-serif;
```

- **Body/UI** = `--font-sans` (Oxanium — techy monospace-lite)
- **Headings** = `--font-heading` (Space Grotesk)

---

## Quick Reference: Where Data Lives

| Content | File | Line(s) |
|---|---|---|
| Tab labels | `src/data/portfolio.js` | 1 |
| Neofetch info | `src/data/portfolio.js` | 3-11 |
| Skills (categories + badges) | `src/data/portfolio.js` | 13-18 |
| Skill descriptions | `src/data/portfolio.js` | 20-39 |
| Projects | `src/data/portfolio.js` | 41-102 |
| Quotes | `src/data/portfolio.js` | 104-115 |
| Academic entries | `src/data/portfolio.js` | 117-132 |
| Certifications | `src/data/portfolio.js` | 134-149 |
| Portfolio tech (carousel) | `src/data/portfolio.js` | 151-218 |
| Social links | `src/data/portfolio.js` | 222-226 |
| About bio lines | `src/data/portfolio.js` | 228-236 |
| Email address | `src/data/portfolio.js` | 220 |
| Greeting text | `src/sections/HomeSection.jsx` | 41-42 |
| Rotating words | `src/sections/HomeSection.jsx` | 54 |
| Description text | `src/sections/HomeSection.jsx` | 65 |
| GIF assets | `src/sections/HomeSection.jsx` | 12-13 |
| PixelSnow config | `src/App.jsx` | 30-37 |
| Tab switch animation | `src/App.jsx` | 19-26 |
| Contact form fields + validation | `src/sections/ContactSection.jsx` | 43-120 |
| Contact email | `src/data/portfolio.js` | 220 |
| SocialLinks supported platforms | `src/components/SocialLinks.jsx` | 4-27 |
| PixelTransition config | `src/sections/HomeSection.jsx` | 74-94 |
| LogoLoop config | `src/sections/SkillsSection.jsx` | 118-146 |
| Masonry config | `src/sections/ProjectsSection.jsx` | 78-87 |
