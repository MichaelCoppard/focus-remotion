---
name: Brand Guidelines
description: Visual brand tokens for all motion graphics and infographics — colours, font, animation style, Remotion project location
type: user
---

Always apply these brand elements automatically to any motion graphic or infographic unless explicitly overridden.

## Colours
- Background: radial gradient `#e0e1dd` (centre) → `#6b6b6b` (mid) → `#222222` (edge)
- Primary ring / accent: `#415a77` (steel blue)
- Secondary ring / accent: `#c2a46d` (warm gold)
- Text primary: `#1D1D1F`
- Text secondary: `rgba(29,29,31,0.45)`
- Text muted: `rgba(29,29,31,0.6)`
- Text accent: `#415a77`

## Typography
- Font: Montserrat Extra Bold (weight 800) — all display text, no exceptions

## Animation (Remotion)
- Duration: 3 seconds for callout/stat graphics
- In: spring scale 0.84→1 + staggered left-to-right reveals
- Out: Gaussian blur dissolve (blur 0→24px + opacity 1→0, 0.8s, starts at 2.2s)
- Springs: snappy `{damping:15, stiffness:220}` / bouncy `{damping:12, stiffness:280}` / smooth `{damping:14, stiffness:200}`

## Brand Token File
All tokens in `C:\Users\mcopp\focus-remotion\src\brand.ts` — always import from there for new compositions, never hardcode values.

**Why:** User said time is their biggest asset — brand consistency must be automatic, not something they fiddle with per project.
