# SnapServe Design System

Copy this folder into your app to reuse landing page colors & fonts.

## Quick start

### 1. Copy files

```
design-system/
  snapserve-tokens.css   ← main file (CSS variables + utilities)
  snapserve-tokens.json  ← for JS / React Native / theme providers
  tailwind-theme.css     ← Tailwind v4 @theme (optional)
  fonts.html             ← Google Fonts <link> tags
```

### 2. Add fonts

Paste `fonts.html` content into your app's `index.html` or root layout `<head>`.

### 3. Import CSS

**Vite / React**
```js
// src/main.jsx or src/index.css
import './styles/snapserve-tokens.css';
```

**Next.js (App Router)**
```js
// app/layout.tsx
import '@/styles/snapserve-tokens.css';
```

### 4. Apply theme class on root

```jsx
// Wrap your app
<body className="snapserve-theme">
```

---

## Tailwind v4

In `src/index.css`:

```css
@import "tailwindcss";
@import "../design-system/snapserve-tokens.css";
@import "../design-system/tailwind-theme.css";
```

Then use utilities:

```html
<div class="bg-surface-base text-ink border-border">
<h1 class="font-display text-ink">
<button class="bg-brand-teal text-ink">
```

---

## Tailwind v3 (`tailwind.config.js`)

```js
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          saffron: '#FF9933',
          teal: '#14B8A6',
          indigo: '#6366f1',
        },
        surface: {
          page: '#080808',
          base: '#0a0a0a',
          raised: '#111111',
          card: '#111111',
        },
        crm: {
          bg: '#0b0f14',
          surface: '#0d1219',
          card: '#111820',
          border: '#1e2a3a',
          accent: '#5b9fd4',
        },
        ink: {
          DEFAULT: '#fafafa',
          secondary: '#a1a1aa',
          muted: '#71717a',
          faint: '#52525b',
        },
        border: {
          DEFAULT: '#27272a',
          strong: '#3f3f46',
        },
      },
      borderRadius: {
        lg: '16px',
        xl: '24px',
      },
    },
  },
};
```

---

## React theme object (MUI / Chakra / custom)

```js
import tokens from './design-system/snapserve-tokens.json';

export const snapserveTheme = {
  fonts: {
    body: tokens.fonts.sans,
    heading: tokens.fonts.display,
    mono: tokens.fonts.mono,
  },
  colors: {
    primary: tokens.brand.teal,
    secondary: tokens.brand.saffron,
    background: tokens.background.base,
    surface: tokens.background.card,
    text: tokens.text.primary,
    textMuted: tokens.text.muted,
    border: tokens.border.default,
    crm: tokens.background.crm,
    success: tokens.semantic.success,
    error: tokens.semantic.error,
  },
};
```

---

## Color cheat sheet

| Token | Hex | Use |
|-------|-----|-----|
| brand-saffron | `#FF9933` | accents, warnings, gradient start |
| brand-teal | `#14B8A6` | primary actions, links, selection |
| brand-indigo | `#6366f1` | gradient end |
| bg-base | `#0a0a0a` | app background |
| bg-card | `#111111` | cards, panels |
| crm-bg | `#0b0f14` | Memory/CRM dashboard |
| crm-card | `#111820` | CRM inner cards |
| border | `#27272a` | bento lines, dividers |
| text-primary | `#fafafa` | headings, body |
| text-muted | `#71717a` | labels, captions |
| success | `#22c55e` | live, online, save |
| error | `#ef4444` | drops, errors |

## Font roles

| Role | Font | Weight |
|------|------|--------|
| UI / body | Inter | 400, 500, 600, 700 |
| Headlines | Plus Jakarta Sans | 500, 600, 700 |
| Code / data | JetBrains Mono | 400, 500 |
