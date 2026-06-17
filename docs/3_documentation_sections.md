# Sections & Data

The portfolio is a **single-page layout** with tab-based navigation. Sections are wired to tabs in `App.jsx` and use data from `src/data/portfolio.js`.

## Section Components

| File | Tab | Description |
|---|---|---|
| `HomeSection.jsx` | home | ASCII art logo, GIF with PixelTransition, neofetch card, typewriter welcome |
| `AboutSection.jsx` | home | `cat about.md` styled bio + interactive fortune shell + social links — rendered below HomeSection |
| `SkillsSection.jsx` | home | Skills grouped by category with badges + tech logo carousel + interactive skill detail panel — rendered below AboutSection |
| `ProjectsSection.jsx` | resume | Three stacked terminal windows: Academic cards (`~/academic`) → Masonry project grid (`~/projects`) → Certification cards (`~/certifications`) |
| `ContactSection.jsx` | contact | Terminal-styled contact form (`mail --send`) |

> **Note:** The **home** tab renders three sections stacked: `HomeSection` → `AboutSection` → `SkillsSection`. This was done to consolidate the landing page while keeping each section as a self-contained component.
>
> The **resume** tab replaces the old `projects` tab and shows a richer layout with education history, project cards in a masonry grid, and certification cards.

## Data Model

All portfolio data is defined in `src/data/portfolio.js`.

### `tabs`
```js
const tabs = ["home", "resume", "contact"]
```
Controls the TabBar labels and the `activeTab` state in `App.jsx`.

### `neofetchInfo`
```js
const neofetchInfo = ["Key: Value", ...]
```
Array of `"Label: value"` strings rendered in `NeofetchCard`. Add or remove lines to change what's displayed on the home section.

### `skills`
```js
const skills = {
  categoryName: ["skill1", "skill2", ...],
  ...
}
```
Object where each key is a category name rendered as `[category]` and the array values are displayed as `Badge` components.

### `projects`
```js
const projects = [
  {
    id: 0,                          // unique ID for masonry keys & gradient selection
    name: "ecommerce-platform",     // project name
    description: "Full-stack...",   // description shown on hover in ProjectCard
    tech: ["React", "Node.js", "PostgreSQL"], // tech icons displayed in card
    github: "https://github.com/...",  // GitHub link
    demo: null,                        // optional demo link
    status: "active",                  // "active" | "wip" | "archived" → dot color
    height: 320,                       // masonry cell height in px
    image: "Caffeinance.png",          // optional — triggers photo card mode
  },
  ...
]
```
Each object maps to one card in the Masonry grid within the **resume** tab. `status` controls the colored indicator dot:
- `"active"` → green
- `"wip"` → yellow
- `"archived"` → muted

**Photo card mode:** add an `image: "filename.png"` field. The `ProjectsSection` looks up the filename in its `projectImages` map, resolves it to the imported URL, and passes it as `img` to `ProjectCard`. The card renders the image full-bleed with a dark hover overlay showing description, status, and links. To add a new photo, import the file in `ProjectsSection.jsx` and add an entry to the `projectImages` object.

### `aboutLines`
```js
const aboutLines = ["line 1", "", "line 3", ...]
```
Lines of text rendered in the about section. Empty strings create blank lines.

### `quotes`
```js
const quotes = [
  { text: "Quote text here", author: "Author Name" },
  ...
]
```
Array of quote objects used by the `fortune` / `quotes` command in the interactive terminal shell. Add or remove entries to change the quote pool.

### `socialLinks`
```js
const socialLinks = [
  { platform: "github", url: "https://github.com/mozzy" },
  { platform: "linkedin", url: "https://linkedin.com/in/mozzy" },
  ...
]
```
Array of social platform objects rendered by the `SocialLinks` component. Supported platforms: `github`, `linkedin`, `x`. Each platform maps to an inline SVG brand icon.

### `skillDetail`
```js
const skillDetail = {
  React: { description: "UI framework for building component-based interfaces", category: "frontend" },
  "Node.js": { description: "JavaScript runtime for server-side applications", category: "backend" },
  ...
}
```
Object keyed by skill name (matching keys in `skills`). Used by `SkillsSection` to show a detail panel when a skill badge is clicked. Each entry has:
- `description` — plain-text explanation of the skill
- `category` — logical group (matches the category keys in `skills`)

### `academic`
```js
const academic = [
  {
    institution: "Universitas Garut",
    degree: "Bachelor of Computer Science",
    period: "2022 - 2026",
    description: "Focused on software engineering...",
    achievements: ["GPA: 3.8/4.0", "Thesis on web performance optimization"],
  },
  ...
]
```
Array of education entries rendered as `AcademicCard` components in the resume tab's `~/academic` terminal window. Each entry supports optional `achievements[]` displayed as tags.

### `certifications`
```js
const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Dec 2024",
    description: "Foundational understanding...",
    credentialUrl: "#",
  },
  ...
]
```
Array of certification entries rendered as `CertCard` components in the resume tab's `~/certifications` terminal window. If `credentialUrl` is not `"#"`, a "Verify" link is shown.

### `portfolioTech`
```js
const portfolioTech = [
  { name: "React", icon: "SiReact", description: "UI framework...", href: "https://react.dev" },
  ...
]
```
Array of technologies used to build this portfolio. Drives the `LogoLoop` carousel in `SkillsSection`. Each entry maps to a Simple Icon component via `iconMap` in `SkillsSection.jsx`. The `icon` field must match a key in the icon map (e.g., `SiReact`, `SiVite`, `SiTailwindcss`).

## How to Add a New Tab

1. **Add the tab label** to `tabs` in `src/data/portfolio.js`:
   ```js
   const tabs = ["home", "about", "projects", "skills", "contact", "blog"]
   ```

2. **Create a section component** at `src/sections/BlogSection.jsx`:
   ```jsx
   import { TerminalWindow } from "@/components/TerminalWindow"
   import { TerminalOutput } from "@/components/TerminalOutput"

   function BlogSection() {
     return (
       <TerminalWindow title="~/blog">
         <TerminalOutput prompt="$">ls posts/</TerminalOutput>
         {/* your content */}
       </TerminalWindow>
     )
   }

   export { BlogSection }
   ```

3. **Register in `App.jsx`**:
   ```jsx
   import { BlogSection } from "@/sections/BlogSection"

   // Inside the return:
   {activeTab === "blog" && <BlogSection />}
   ```

That's it — the TabBar picks up `tabs` automatically and the section renders when its tab is active.

## How to Modify Projects

Edit the `projects` array in `src/data/portfolio.js`. Add, remove, or reorder entries. Each entry needs `id` (unique), `name`, `description`, `tech[]`, `github`, `height`. The `Masonry` + `ProjectCard` components render them in the **resume** tab's `~/projects` window. Set `status` to control the indicator dot color.

## How to Modify Academic / Certifications

Edit the `academic` or `certifications` arrays in `src/data/portfolio.js`. Add new objects following the shape above. Each entry is rendered as an `AcademicCard` or `CertCard` in the **resume** tab.

## How to Modify Skill Details

Edit the `skillDetail` object in `src/data/portfolio.js`. Add a key matching a skill name from the `skills` object, with `description` and `category` fields. The detail panel in `SkillsSection` displays this info when the badge is clicked.

## How to Modify Skills

Edit the `skills` object in `src/data/portfolio.js`. Add new categories as keys, or add/remove skills from existing arrays. Each category becomes a labeled group with badges.
