/**
 * FilmingMistake — Script 14: Event Testimonials
 * Do not film facing a light source. Side-elevation diagram, split panel.
 * Style: SVG diagram (ThreeLightDiagram2D pattern)
 */
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLOR, FONT_WEIGHT } from "./brand";
import { GraphicWrapper } from "./GraphicWrapper";

const FLOOR_Y = 820;
const MID_X   = 960;

function fIn(frame: number, start: number, dur = 18) {
  return interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
}

// ── Simple camera icon (side view, lens pointing right) ───────────────────
const Camera: React.FC<{ cx: number; cy: number; flip?: boolean }> = ({ cx, cy, flip }) => {
  const dir = flip ? -1 : 1;
  return (
    <g>
      {/* Tripod legs */}
      <line x1={cx} y1={cy + 30} x2={cx - 32 * dir} y2={FLOOR_Y} stroke={COLOR.textMuted} strokeWidth={3} />
      <line x1={cx} y1={cy + 30} x2={cx + 32 * dir} y2={FLOOR_Y} stroke={COLOR.textMuted} strokeWidth={3} />
      <line x1={cx} y1={cy + 30} x2={cx}             y2={FLOOR_Y} stroke={COLOR.textMuted} strokeWidth={3} />
      {/* Body */}
      <rect x={cx - 28} y={cy - 18} width={56} height={36} rx={7} fill={COLOR.textPrimary} opacity={0.85} />
      {/* Lens */}
      <circle cx={cx + 32 * dir} cy={cy} r={9} fill="#222" stroke={COLOR.ringPrimary} strokeWidth={1.5} />
    </g>
  );
};

// ── Speaker silhouette ────────────────────────────────────────────────────
const Speaker: React.FC<{ cx: number; lit: boolean }> = ({ cx, lit }) => {
  const fill = lit ? COLOR.bgCenter : "#2a2a3a";
  const op   = lit ? 0.95 : 0.55;
  return (
    <g fill={fill} opacity={op}>
      <circle cx={cx} cy={560} r={42} />
      <rect x={cx - 30} y={600} width={60} height={140} rx={8} />
      <rect x={cx - 26} y={740} width={24} height={80} rx={6} />
      <rect x={cx + 2}  y={740} width={24} height={80} rx={6} />
    </g>
  );
};

export const FilmingMistake: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOp  = fIn(frame, 0,  12);
  const leftOp    = fIn(frame, 8,  22);
  const divOp     = fIn(frame, 18, 12);
  const rightOp   = fIn(frame, 28, 22);

  return (
    <GraphicWrapper>
      <div style={{ position: "relative", width: 1920, height: 1080 }}>
        <svg
          viewBox="0 0 1920 1080"
          width={1920}
          height={1080}
          style={{ position: "absolute", inset: 0, fontFamily: "Montserrat, sans-serif" }}
        >
          {/* ── Gradient defs ───────────────────────────────────────────── */}
          <defs>
            <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%"   stopColor="#ffffff" stopOpacity={1} />
              <stop offset="55%"  stopColor="#e0e1dd" stopOpacity={1} />
              <stop offset="100%" stopColor="#e0e1dd" stopOpacity={0.7} />
            </radialGradient>
          </defs>

          {/* ── Header ─────────────────────────────────────────────────── */}
          <text
            x={MID_X} y={72}
            textAnchor="middle"
            fontSize={13}
            fontWeight={800}
            fill={COLOR.textSecondary}
            letterSpacing={3.5}
            opacity={headerOp}
          >
            COMMON FILMING MISTAKE
          </text>

          {/* ── Centre divider ──────────────────────────────────────────── */}
          <line
            x1={MID_X} y1={110}
            x2={MID_X} y2={920}
            stroke="rgba(29,29,31,0.12)"
            strokeWidth={1.5}
            opacity={divOp}
          />

          {/* ── Floor line ──────────────────────────────────────────────── */}
          <line x1={40} y1={FLOOR_Y} x2={MID_X - 40} y2={FLOOR_Y} stroke={COLOR.textSecondary} strokeWidth={1} opacity={leftOp * 0.3} />
          <line x1={MID_X + 40} y1={FLOOR_Y} x2={1880} y2={FLOOR_Y} stroke={COLOR.textSecondary} strokeWidth={1} opacity={rightOp * 0.3} />

          {/* ══════════════════════════════════════════════════════════════
              LEFT PANEL — WRONG: filming facing a light source
          ══════════════════════════════════════════════════════════════ */}
          <g opacity={leftOp}>

            {/* Panel label */}
            <text x={480} y={130} textAnchor="middle" fontSize={18} fontWeight={800} fill={COLOR.textPrimary} opacity={1} letterSpacing={3}>
              WRONG
            </text>

            {/* Camera (left side, lens pointing right) */}
            <Camera cx={160} cy={660} />

            {/* Speaker — dark silhouette (overexposed by light source behind) */}
            <Speaker cx={470} lit={false} />

            {/* Projector screen / window (light source behind speaker) */}
            <rect x={740} y={340} width={140} height={300} rx={6} fill="url(#screenGlow)" opacity={0.9} stroke="#ffffff" strokeWidth={1.5} />
            {/* Glow rays from screen */}
            {[-60, -30, 0, 30, 60].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const len = 200;
              return (
                <line
                  key={i}
                  x1={810} y1={490}
                  x2={810 - Math.cos(rad) * len}
                  y2={490 + Math.sin(rad) * len}
                  stroke="#f5f5f5"
                  strokeWidth={2}
                  opacity={0.55}
                />
              );
            })}
            <text x={810} y={680} textAnchor="middle" fontSize={13} fontWeight={800} fill={COLOR.textPrimary} opacity={0.8} letterSpacing={1.5}>
              WINDOW / PROJECTOR
            </text>

            {/* Problem arrow — sensor exposed to bright source */}
            <path
              d="M 680,490 Q 550,430 350,490"
              fill="none"
              stroke={COLOR.ringPrimary}
              strokeWidth={2}
              strokeDasharray="6 8"
              opacity={0.7}
            />
            <text x={510} y={405} textAnchor="middle" fontSize={12} fontWeight={800} fill={COLOR.ringPrimary} opacity={0.9} letterSpacing={1}>
              SENSOR OVEREXPOSES
            </text>

            {/* Bottom caption */}
            <text x={480} y={900} textAnchor="middle" fontSize={14} fontWeight={800} fill={COLOR.textPrimary} opacity={1} letterSpacing={1.5}>
              SPEAKER APPEARS DARK
            </text>
          </g>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT PANEL — CORRECT: lights in front of speaker
          ══════════════════════════════════════════════════════════════ */}
          <g opacity={rightOp}>

            {/* Panel label */}
            <text x={1440} y={130} textAnchor="middle" fontSize={18} fontWeight={800} fill={COLOR.ringSecondary} letterSpacing={3}>
              CORRECT
            </text>

            {/* Camera (front-left of speaker, lens pointing right) */}
            <Camera cx={1100} cy={680} />

            {/* Speaker — well lit */}
            <Speaker cx={1440} lit />

            {/* Plain background wall */}
            <rect x={1720} y={360} width={120} height={400} rx={6} fill={COLOR.textPrimary} opacity={0.08} />
            <text x={1780} y={620} textAnchor="middle" fontSize={12} fontWeight={800} fill={COLOR.textSecondary} opacity={0.4} letterSpacing={1}>
              WALL /
            </text>
            <text x={1780} y={638} textAnchor="middle" fontSize={12} fontWeight={800} fill={COLOR.textSecondary} opacity={0.4} letterSpacing={1}>
              LOGO
            </text>

            {/* Key light (front-left) */}
            <circle cx={1240} cy={470} r={22} fill={COLOR.ringSecondary} opacity={0.9} />
            <text x={1240} y={475} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={800} fill="#fff">①</text>
            <path d={`M 1240,470 L 1380,575 L 1380,605 Z`} fill={COLOR.ringSecondary} opacity={0.12} />

            {/* Fill light (right) */}
            <circle cx={1660} cy={490} r={22} fill={COLOR.ringPrimary} opacity={0.9} />
            <text x={1660} y={495} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={800} fill="#fff">②</text>
            <path d={`M 1660,490 L 1510,570 L 1510,600 Z`} fill={COLOR.ringPrimary} opacity={0.12} />

            {/* Back light (behind speaker) */}
            <circle cx={1440} cy={370} r={22} fill="#f5f5f5" opacity={0.9} />
            <text x={1440} y={375} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={800} fill={COLOR.textPrimary}>③</text>

            {/* Bottom caption */}
            <text x={1440} y={900} textAnchor="middle" fontSize={14} fontWeight={800} fill={COLOR.ringSecondary} letterSpacing={1.5}>
              SPEAKER IS WELL EXPOSED
            </text>
          </g>

        </svg>
      </div>
    </GraphicWrapper>
  );
};
