/**
 * Brand Tokens — single source of truth for all motion graphics.
 * Update here and every composition picks it up automatically.
 */

// ── Colours ───────────────────────────────────────────────────────────────
export const COLOR = {
  // Background gradient (radial, centre → edge)
  bgCenter:  "#e0e1dd",
  bgMid:     "#6b6b6b",
  bgEdge:    "#222222",

  // Ring accents
  ringPrimary:   "#415a77",   // steel blue  — main data ring
  ringSecondary: "#c2a46d",   // warm gold   — supporting ring
  ringTrack:     "rgba(0,0,0,0.08)",

  // Typography
  textPrimary:   "#1D1D1F",
  textSecondary: "rgba(29,29,31,0.45)",
  textMuted:     "rgba(29,29,31,0.6)",
  textAccent:    "#415a77",   // matches ringPrimary

  // Glow
  glowPrimary: "rgba(65,90,119,0.7)",
} as const;

// ── Background gradient string ─────────────────────────────────────────────
export const BG_GRADIENT =
  `radial-gradient(ellipse at 50% 50%, ${COLOR.bgCenter} 0%, ${COLOR.bgCenter} 20%, ${COLOR.bgMid} 60%, ${COLOR.bgEdge} 100%)`;

// ── Typography ─────────────────────────────────────────────────────────────
export const FONT_WEIGHT = {
  regular:   400,
  semibold:  600,
  bold:      700,
  extraBold: 800,  // ← brand standard — use this for all display text
} as const;

// ── Animation defaults ─────────────────────────────────────────────────────
export const SPRING = {
  snappy:  { damping: 15, stiffness: 220, mass: 1 },
  bouncy:  { damping: 12, stiffness: 280, mass: 0.8 },
  smooth:  { damping: 14, stiffness: 200, mass: 1 },
} as const;

export const DURATION = {
  short:    3,   // seconds — quick stat/callout graphic
  medium:   8,   // seconds — explanation graphic
  long:     15,  // seconds — full timeline breakdown
} as const;

// ── SVG ring geometry ──────────────────────────────────────────────────────
export const RING = {
  r:           78,
  strokeWidth: 34,
  get C()      { return 2 * Math.PI * this.r; },
} as const;
