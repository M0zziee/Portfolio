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

Terminal-style tab navigation. Each tab is a bordered button.

```jsx
import { TabBar } from "@/components/TabBar"
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `tabs` | `string[]` | — | Array of tab labels (lowercase) |
| `activeTab` | `string` | — | Currently active tab label |
| `onChange` | `(tab: string) => void` | — | Called when a tab is clicked |
| `className` | `string` | — | Additional Tailwind classes |

**Example:**
```jsx
const [tab, setTab] = useState("home")
<TabBar tabs={["home", "about", "projects"]} activeTab={tab} onChange={setTab} />
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

Positioned `fixed bottom-6 right-6 z-50`. Shows current mode label + icon.

---

## AsciiArt

Renders ASCII art as a `<pre>` block. Comes with a default diamond pattern, or you can pass custom art.

```jsx
import { AsciiArt } from "@/components/AsciiArt"
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `string` | default art | Custom ASCII art string |
| `className` | `string` | — | Additional Tailwind classes |

**Example:**
```jsx
<AsciiArt />
<AsciiArt>{`
  ╔══╗
  ║  ║
  ╚══╝
`}</AsciiArt>
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
