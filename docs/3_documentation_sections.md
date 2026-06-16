# Sections & Data

The portfolio is a **single-page layout** with tab-based navigation. Sections are wired to tabs in `App.jsx` and use data from `src/data/portfolio.js`.

## Section Components

| File | Tab | Description |
|---|---|---|
| `HomeSection.jsx` | home | ASCII art logo, GIF with PixelTransition, neofetch card, typewriter welcome |
| `AboutSection.jsx` | home | `cat about.md` styled bio + interactive fortune shell + social links — rendered below HomeSection |
| `SkillsSection.jsx` | home | Skills grouped by category with badges — rendered below AboutSection |
| `ProjectsSection.jsx` | projects | `ls -la` listing of portfolio projects |
| `ContactSection.jsx` | contact | Terminal-styled contact form (`mail --send`) |

> **Note:** The **home** tab renders three sections stacked: `HomeSection` → `AboutSection` → `SkillsSection`. This was done to consolidate the landing page while keeping each section as a self-contained component.

## Data Model

All portfolio data is defined in `src/data/portfolio.js`.

### `tabs`
```js
const tabs = ["home", "projects", "contact"]
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
    perms: "drwxr-xr-x",   // file permissions string
    links: 3,               // hard link count
    owner: "mozzy",         // file owner
    group: "dev",           // file group
    size: 4096,             // bytes (auto-formatted as B/K/M)
    date: "2026-06-15T14:30:00", // ISO date
    name: "project-name",   // displayed name
  },
  ...
]
```
Each object maps to one row in the `ls -la` table.

Permission prefix colors:
- `d` → blue (directory)
- `l` → cyan (symlink)
- `x` → green (executable)

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

Edit the `projects` array in `src/data/portfolio.js`. Add, remove, or reorder entries. The `LsListing` component renders them in order. Set `perms` to control color and type indicators.

## How to Modify Skills

Edit the `skills` object in `src/data/portfolio.js`. Add new categories as keys, or add/remove skills from existing arrays. Each category becomes a labeled group with badges.
