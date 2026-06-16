# Changelog — Layout & Content Changes

## HomeSection.jsx (`src/sections/HomeSection.jsx`)

### Layout Restructuring
- **Before:** GIF and text were stacked vertically inside a `max-w-lg` container with `space-y-1`
- **After:** "Hello My name Is Fathir" and description text sit in a left column, with the GIF in a right column — all in a single `flex items-start gap-6` row

```
flex items-start gap-6
├── div (text column, space-y-1)
│   ├── "Hello My name Is Fathir"
│   ├── "I Interested At ..."
│   └── "I build end-to-end web solutions ..."
└── div (GIF column)
    └── [PixelTransition GIF]
```

### Description Text Update
- **Before:** `"I bridge the gap between complex backend logic and seamless user interfaces to help products scale."`
- **After:** `"I build end-to-end web solutions — from designing schemas and writing server-side logic with Node.js, to crafting responsive React interfaces with Tailwind CSS. I focus on performance, accessibility, and clean architecture that keeps technical debt low as the product grows."`

---

## AsciiArt.jsx (`src/components/AsciiArt.jsx`)

### ASCII Art Replacement
- **Before:** Diamond/bird ASCII pattern (`/\`, `\/`)
- **After:** "M" letter logo using box-drawing characters:
  ```
  ███╗   ███╗
  ████╗ ████║
  ██╔████╔██║
  ██║╚██╔╝██║
  ██║ ╚═╝ ██║
  ╚═╝     ╚═╝
  ```

### Gap Adjustment
- **Before:** `gap-14` between ASCII art and content column
- **After:** `gap-12` for tighter alignment

---

## PixelTransition.jsx (`src/components/PixelTransition.jsx`)

- Added to the project as the GIF/image container component
- Features a pixel-grid hover animation that transitions between two content states
- Used in `HomeSection.jsx` to display GIF placeholders alongside text content

---

## File Versions

| File | Lines Before | Lines After |
|---|---|---|
| `HomeSection.jsx` | 65 | 67 |
| `AsciiArt.jsx` | 45 | 45 |
