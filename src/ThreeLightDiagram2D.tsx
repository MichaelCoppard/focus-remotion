/**
 * ThreeLightDiagram2D — Script 14: Event Testimonials (bonus)
 * Top-down SVG floor plan of the 3-light positioning setup.
 */
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapper } from "./GraphicWrapper";

// ── Scene positions (SVG viewBox 1920×1080) ────────────────────────────────
const SPK = { x: 960, y: 490 };   // speaker (centre of room)
const CAM = { x: 960, y: 800 };   // camera (in front)

const LIGHTS = [
  {
    num:       "①",
    label:     "KEY LIGHT",
    sub:       "45° FRONT",
    color:     COLOR.ringSecondary,   // warm gold
    textColor: "#fff",
    pos:       { x: 648, y: 676 },
    anchor:    "end"   as const,
    lx:        -42,
  },
  {
    num:       "②",
    label:     "FILL LIGHT",
    sub:       "90° OPPOSITE",
    color:     COLOR.ringPrimary,     // steel blue
    textColor: "#fff",
    pos:       { x: 1312, y: 490 },
    anchor:    "start" as const,
    lx:        42,
  },
  {
    num:       "③",
    label:     "BACK LIGHT",
    sub:       "45° BEHIND",
    color:     "#f5f5f5",             // brand off-white
    textColor: COLOR.textPrimary,     // dark text on light circle
    pos:       { x: 748, y: 268 },
    anchor:    "end"   as const,
    lx:        -42,
  },
];

const DELAYS = [22, 52, 82];

// ── Helpers ────────────────────────────────────────────────────────────────
function fadeIn(frame: number, start: number, dur = 18) {
  return interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/** Triangular light-beam cone from source to target. */
function beamPath(
  lx: number, ly: number,
  tx: number, ty: number,
  halfDeg = 13,
) {
  const dx = tx - lx, dy = ty - ly;
  const len = Math.sqrt(dx * dx + dy * dy);
  const spread = Math.tan((halfDeg * Math.PI) / 180) * len;
  const px = -dy / len, py = dx / len;
  return [
    `M ${lx},${ly}`,
    `L ${tx + px * spread},${ty + py * spread}`,
    `L ${tx - px * spread},${ty - py * spread}`,
    "Z",
  ].join(" ");
}

/** Triangular camera view-cone pointing from camera toward speaker. */
function camConePath() {
  const dx = SPK.x - CAM.x, dy = SPK.y - CAM.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const spread = Math.tan((14 * Math.PI) / 180) * len;
  const px = -dy / len, py = dx / len;
  return [
    `M ${CAM.x},${CAM.y}`,
    `L ${SPK.x + px * spread},${SPK.y + py * spread}`,
    `L ${SPK.x - px * spread},${SPK.y - py * spread}`,
    "Z",
  ].join(" ");
}

// ── Component ──────────────────────────────────────────────────────────────
export const ThreeLightDiagram2D: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOp  = fadeIn(frame, 0,  12);
  const sceneOp   = fadeIn(frame, 6,  22);

  return (
    <GraphicWrapper>
      <div style={{ position: "relative", width: 1920, height: 1080 }}>

        {/* ── Header ──────────────────────────────────────────────── */}
        <div style={{
          position:   "absolute",
          top:        46,
          left:       0,
          right:      0,
          textAlign:  "center",
          opacity:    headerOp,
          fontWeight: FONT_WEIGHT.extraBold,
          fontSize:   14,
          color:      COLOR.textSecondary,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          fontFamily: "inherit",
        }}>
          TOP-DOWN VIEW — 3-LIGHT SETUP
        </div>

        {/* ── SVG diagram ─────────────────────────────────────────── */}
        <svg
          viewBox="0 0 1920 1080"
          width={1920}
          height={1080}
          style={{
            position: "absolute",
            inset: 0,
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {/* Stage-area circle */}
          <circle
            cx={SPK.x} cy={SPK.y} r={288}
            fill="none"
            stroke={COLOR.textSecondary}
            strokeWidth={1.5}
            strokeDasharray="7 11"
            opacity={sceneOp * 0.35}
          />

          {/* Camera view cone */}
          <path
            d={camConePath()}
            fill={COLOR.textPrimary}
            opacity={sceneOp * 0.06}
          />

          {/* ── Lights (staggered) ──────────────────────────────── */}
          {LIGHTS.map((light, i) => {
            const delay  = DELAYS[i];
            const sc     = spring({ frame: Math.max(0, frame - delay), fps, from: 0, to: 1, config: SPRING.bouncy });
            const op     = fadeIn(frame, delay);
            const beamOp = fadeIn(frame, delay + 8);
            const lblOp  = fadeIn(frame, delay + 16);

            return (
              <g key={light.num} opacity={op}>

                {/* Beam cone */}
                <path
                  d={beamPath(light.pos.x, light.pos.y, SPK.x, SPK.y)}
                  fill={light.color}
                  opacity={beamOp * 0.17}
                />

                {/* Guide line to speaker */}
                <line
                  x1={light.pos.x} y1={light.pos.y}
                  x2={SPK.x}       y2={SPK.y}
                  stroke={light.color}
                  strokeWidth={1.5}
                  strokeDasharray="6 9"
                  opacity={beamOp * 0.45}
                />

                {/* Light circle (spring pop-in) */}
                <g transform={`translate(${light.pos.x},${light.pos.y}) scale(${sc})`}>
                  <circle r={30} fill={light.color} />
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={22}
                    fontWeight={800}
                    fill={light.textColor}
                  >
                    {light.num}
                  </text>
                </g>

                {/* Label */}
                <g opacity={lblOp}>
                  <text
                    x={light.pos.x + light.lx}
                    y={light.pos.y - 9}
                    textAnchor={light.anchor}
                    fontSize={20}
                    fontWeight={800}
                    fill={light.color}
                    letterSpacing="1.2"
                  >
                    {light.label}
                  </text>
                  <text
                    x={light.pos.x + light.lx}
                    y={light.pos.y + 15}
                    textAnchor={light.anchor}
                    fontSize={15}
                    fontWeight={800}
                    fill={COLOR.textMuted}
                  >
                    {light.sub}
                  </text>
                </g>

              </g>
            );
          })}

          {/* ── Camera ─────────────────────────────────────────── */}
          <g opacity={sceneOp}>
            {/* Tripod legs (top-down: three lines fanning out) */}
            <line x1={CAM.x}     y1={CAM.y + 4}  x2={CAM.x - 28} y2={CAM.y + 42} stroke={COLOR.textSecondary} strokeWidth={2.5} opacity={0.65} />
            <line x1={CAM.x}     y1={CAM.y + 4}  x2={CAM.x + 28} y2={CAM.y + 42} stroke={COLOR.textSecondary} strokeWidth={2.5} opacity={0.65} />
            <line x1={CAM.x}     y1={CAM.y + 4}  x2={CAM.x}      y2={CAM.y + 48} stroke={COLOR.textSecondary} strokeWidth={2.5} opacity={0.65} />
            {/* Body */}
            <rect x={CAM.x - 22} y={CAM.y - 22} width={44} height={26} rx={5} fill={COLOR.textPrimary} opacity={0.85} />
            {/* Lens (facing up = toward speaker) */}
            <circle cx={CAM.x} cy={CAM.y - 16} r={7} fill="#444" stroke={COLOR.ringSecondary} strokeWidth={1.5} opacity={0.9} />
            {/* Label */}
            <text x={CAM.x} y={CAM.y + 72} textAnchor="middle" fontSize={15} fontWeight={800} fill={COLOR.textSecondary} letterSpacing="2">
              CAMERA
            </text>
          </g>

          {/* ── Speaker (top-down figure) ───────────────────────── */}
          <g opacity={sceneOp}>
            {/* Shoulders */}
            <ellipse cx={SPK.x} cy={SPK.y + 24} rx={30} ry={19} fill={COLOR.textPrimary} opacity={0.65} />
            {/* Head */}
            <circle  cx={SPK.x} cy={SPK.y - 6}  r={22}  fill={COLOR.textPrimary} opacity={0.85} />
            {/* Facing indicator — small arrow toward camera */}
            <polygon
              points={`${SPK.x},${SPK.y + 48} ${SPK.x - 8},${SPK.y + 35} ${SPK.x + 8},${SPK.y + 35}`}
              fill={COLOR.textSecondary}
              opacity={0.5}
            />
            {/* Label */}
            <text x={SPK.x + 66} y={SPK.y + 6} textAnchor="start" fontSize={15} fontWeight={800} fill={COLOR.textSecondary} letterSpacing="2">
              SPEAKER
            </text>
          </g>

        </svg>
      </div>
    </GraphicWrapper>
  );
};
