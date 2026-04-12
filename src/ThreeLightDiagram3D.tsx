/**
 * ThreeLightDiagram3D — Script 14: Event Testimonials (bonus)
 * Room reveal: front wall folds back to expose the venue filming setup.
 */
import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapper } from "./GraphicWrapper";

// ── Timing ─────────────────────────────────────────────────────────────────
const LIFT_START = 45;
const LIFT_END   = 100;
const BG_IN      = 78;
const SPEAKER_IN = 95;
const CAM_IN     = 115;
const KEY_IN     = 133;
const FILL_IN    = 153;
const BACK_IN    = 173;
const LABEL_KEY  = 192;
const LABEL_FILL = 212;
const LABEL_BACK = 232;

// ── Scene colours (brand only) ─────────────────────────────────────────────
const SC = {
  wall:     "#0d1b2a",
  ceiling:  "#0a0e14",
  bgWall:   "#170d2a",
  floor:    "#0c0c10",
  audience: "#1a2535",
  speaker:  COLOR.bgCenter,        // #e0e1dd
  key:      COLOR.ringSecondary,   // #c2a46d gold
  fill:     COLOR.ringPrimary,     // #415a77 steel blue
  back:     "#f5f5f5",
} as const;

const FLOOR_Y = 860;

// ── Helpers ────────────────────────────────────────────────────────────────
function fIn(frame: number, start: number, dur = 20) {
  return interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function beamPath(lx: number, ly: number, tx: number, ty: number, deg = 11) {
  const dx = tx - lx, dy = ty - ly;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return "";
  const spread = Math.tan((deg * Math.PI) / 180) * len;
  const px = -dy / len, py = dx / len;
  return `M ${lx},${ly} L ${tx + px * spread},${ty + py * spread} L ${tx - px * spread},${ty - py * spread} Z`;
}

// ── Audience ───────────────────────────────────────────────────────────────
const AUD_XS = [210, 355, 490, 620, 740, 855, 960, 1065, 1180, 1300, 1430, 1565, 1710];

const Audience: React.FC<{ op: number }> = ({ op }) => (
  <g opacity={op}>
    {AUD_XS.map((x, i) => {
      const s = 0.58 + (i % 4) * 0.04;
      return (
        <g key={i} transform={`translate(${x},468) scale(${s})`}>
          <circle cx={0} cy={-50} r={20} fill={SC.audience} />
          <rect x={-18} y={-30} width={36} height={58} rx={5} fill={SC.audience} />
        </g>
      );
    })}
    {AUD_XS.slice(1, 12).map((x, i) => (
      <g key={i} transform={`translate(${x + 60},418) scale(${0.48 + (i % 3) * 0.03})`}>
        <circle cx={0} cy={-50} r={20} fill={SC.audience} opacity={0.55} />
        <rect x={-18} y={-30} width={36} height={58} rx={5} fill={SC.audience} opacity={0.55} />
      </g>
    ))}
  </g>
);

// ── Speaker silhouette ─────────────────────────────────────────────────────
const Speaker: React.FC<{ op: number }> = ({ op }) => (
  <g opacity={op} fill={SC.speaker}>
    {/* Head */}
    <circle cx={960} cy={376} r={54} />
    {/* Neck */}
    <rect x={951} y={428} width={18} height={24} />
    {/* Torso (slight taper shoulder → waist) */}
    <polygon points="878,450 1042,450 1022,728 898,728" />
    {/* Left arm relaxed */}
    <rect x={852} y={456} width={28} height={170} rx={12} opacity={0.9} />
    {/* Right arm slightly raised */}
    <rect x={1060} y={436} width={28} height={155} rx={12} opacity={0.9} />
    {/* Legs */}
    <rect x={895} y={726} width={46} height={132} rx={9} />
    <rect x={969} y={726} width={46} height={132} rx={9} />
    {/* "SPEAKER" label */}
    <text
      x={960} y={900}
      textAnchor="middle"
      fontSize={15}
      fontWeight={FONT_WEIGHT.extraBold}
      fill={COLOR.textSecondary}
      letterSpacing={2}
      fontFamily="Montserrat, sans-serif"
    >
      SPEAKER
    </text>
  </g>
);

// ── Camera on tripod ───────────────────────────────────────────────────────
const Camera: React.FC<{ op: number }> = ({ op }) => {
  const cx = 655, cy = 528;
  return (
    <g opacity={op} fontFamily="Montserrat, sans-serif">
      {/* Tripod legs */}
      <line x1={cx} y1={cy + 38} x2={cx - 58} y2={FLOOR_Y} stroke={COLOR.textMuted} strokeWidth={4} />
      <line x1={cx} y1={cy + 38} x2={cx + 58} y2={FLOOR_Y} stroke={COLOR.textMuted} strokeWidth={4} />
      <line x1={cx} y1={cy + 38} x2={cx}      y2={FLOOR_Y} stroke={COLOR.textMuted} strokeWidth={4} />
      {/* Crossbar */}
      <line x1={cx - 32} y1={720} x2={cx + 32} y2={720} stroke={COLOR.textMuted} strokeWidth={3} opacity={0.5} />
      {/* Camera body */}
      <rect x={cx - 36} y={cy - 22} width={72} height={44} rx={8} fill={SC.wall} />
      <rect x={cx - 32} y={cy - 18} width={64} height={36} rx={6} fill="#1e3a55" />
      {/* Lens pointing right toward speaker */}
      <circle cx={cx + 40} cy={cy} r={12} fill="#0a0a12" stroke={COLOR.ringPrimary} strokeWidth={2} />
      <circle cx={cx + 40} cy={cy} r={6}  fill="#06060a" />
      {/* Viewfinder */}
      <rect x={cx - 10} y={cy - 30} width={20} height={10} rx={3} fill="#1e3a55" />
      {/* Label */}
      <text x={cx} y={FLOOR_Y + 26} textAnchor="middle" fontSize={14} fontWeight={800} fill={COLOR.textSecondary} letterSpacing={1.5}>
        CAMERA
      </text>
    </g>
  );
};

// ── Light stand ────────────────────────────────────────────────────────────
interface LightProps {
  num: string; label: string; sub: string;
  color: string; textColor: string;
  x: number; headY: number;
  labelX: number; labelAnchor: "start" | "middle" | "end";
  showBeam: boolean;
  op: number; sc: number; beamOp: number; labelOp: number;
  frame: number;
}

const LightStand: React.FC<LightProps> = ({
  num, label, sub, color, textColor,
  x, headY, labelX, labelAnchor,
  showBeam, op, sc, beamOp, labelOp, frame,
}) => {
  const glow = 0.6 + Math.sin(frame * 0.07) * 0.25;
  const TARGET_X = 960, TARGET_Y = 480;

  return (
    <g opacity={op} fontFamily="Montserrat, sans-serif">
      {/* Stand pole */}
      <rect x={x - 3} y={headY + 34} width={6} height={FLOOR_Y - headY - 34} rx={3} fill={COLOR.textMuted} opacity={0.5} />
      {/* Base */}
      <line x1={x - 40} y1={FLOOR_Y} x2={x + 40} y2={FLOOR_Y} stroke={COLOR.textMuted} strokeWidth={4} opacity={0.45} />
      <line x1={x - 40} y1={FLOOR_Y} x2={x - 20} y2={FLOOR_Y + 12} stroke={COLOR.textMuted} strokeWidth={3} opacity={0.35} />
      <line x1={x + 40} y1={FLOOR_Y} x2={x + 20} y2={FLOOR_Y + 12} stroke={COLOR.textMuted} strokeWidth={3} opacity={0.35} />
      {/* Beam cone */}
      {showBeam && (
        <path
          d={beamPath(x, headY, TARGET_X, TARGET_Y)}
          fill={color}
          opacity={beamOp * 0.13}
        />
      )}
      {/* Glow halo */}
      <circle cx={x} cy={headY} r={56} fill={color} opacity={glow * 0.2} />
      {/* Light head */}
      <g transform={`translate(${x},${headY}) scale(${sc})`}>
        <circle r={30} fill={color} />
        <text textAnchor="middle" dominantBaseline="middle" fontSize={20} fontWeight={800} fill={textColor}>
          {num}
        </text>
      </g>
      {/* Label */}
      <g opacity={labelOp}>
        <text x={labelX} y={headY - 46} textAnchor={labelAnchor} fontSize={20} fontWeight={800} fill={color} letterSpacing={1}>
          {label}
        </text>
        <text x={labelX} y={headY - 22} textAnchor={labelAnchor} fontSize={14} fontWeight={800} fill={COLOR.textMuted}>
          {sub}
        </text>
      </g>
    </g>
  );
};

// ── Interior scene ─────────────────────────────────────────────────────────
const InteriorScene: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const audOp  = fIn(frame, BG_IN, 28);
  const spkOp  = fIn(frame, SPEAKER_IN, 22);
  const camOp  = fIn(frame, CAM_IN, 22);

  const keyOp   = fIn(frame, KEY_IN,  20);
  const keySc   = spring({ frame: Math.max(0, frame - KEY_IN),  fps, from: 0, to: 1, config: SPRING.bouncy });
  const keyBeam = fIn(frame, KEY_IN + 8, 20);
  const keyLbl  = fIn(frame, LABEL_KEY, 18);

  const fillOp   = fIn(frame, FILL_IN,  20);
  const fillSc   = spring({ frame: Math.max(0, frame - FILL_IN), fps, from: 0, to: 1, config: SPRING.bouncy });
  const fillBeam = fIn(frame, FILL_IN + 8, 20);
  const fillLbl  = fIn(frame, LABEL_FILL, 18);

  const backOp   = fIn(frame, BACK_IN,  20);
  const backSc   = spring({ frame: Math.max(0, frame - BACK_IN), fps, from: 0, to: 1, config: SPRING.bouncy });
  const backLbl  = fIn(frame, LABEL_BACK, 18);

  const rimOp    = fIn(frame, BACK_IN, 25);

  return (
    <svg
      viewBox="0 0 1920 1080"
      width={1920}
      height={1080}
      style={{ position: "absolute", inset: 0, fontFamily: "Montserrat, sans-serif" }}
    >
      <defs>
        <linearGradient id="bgWallGrad3d" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={SC.bgWall} />
          <stop offset="100%" stopColor="#0f1420" />
        </linearGradient>
        <radialGradient id="keyAtmos" cx="28%" cy="42%" r="36%">
          <stop offset="0%" stopColor={SC.key}  stopOpacity={0.22} />
          <stop offset="100%" stopColor={SC.key} stopOpacity={0} />
        </radialGradient>
        <radialGradient id="fillAtmos" cx="72%" cy="42%" r="36%">
          <stop offset="0%" stopColor={SC.fill} stopOpacity={0.22} />
          <stop offset="100%" stopColor={SC.fill} stopOpacity={0} />
        </radialGradient>
        <radialGradient id="rimHalo" cx="50%" cy="33%" r="20%">
          <stop offset="0%" stopColor={SC.back} stopOpacity={0.45} />
          <stop offset="100%" stopColor={SC.back} stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* Ceiling */}
      <rect x={0} y={0} width={1920} height={185} fill={SC.ceiling} />
      {/* Back wall */}
      <rect x={0} y={185} width={1920} height={675} fill="url(#bgWallGrad3d)" />
      {/* Floor */}
      <rect x={0} y={FLOOR_Y} width={1920} height={220} fill={SC.floor} />
      <line x1={0} y1={FLOOR_Y} x2={1920} y2={FLOOR_Y} stroke={COLOR.textSecondary} strokeWidth={1} opacity={0.25} />

      {/* Light atmosphere */}
      <rect x={0} y={0} width={1920} height={1080} fill="url(#keyAtmos)"  opacity={keyOp} />
      <rect x={0} y={0} width={1920} height={1080} fill="url(#fillAtmos)" opacity={fillOp} />
      {/* Rim halo behind speaker */}
      <rect x={0} y={0} width={1920} height={1080} fill="url(#rimHalo)"   opacity={rimOp} />

      {/* Audience */}
      <Audience op={audOp} />

      {/* Speaker */}
      <Speaker op={spkOp} />

      {/* Camera */}
      <Camera op={camOp} />

      {/* Key light */}
      <LightStand
        num="①" label="KEY LIGHT" sub="45° FRONT"
        color={SC.key} textColor="#fff"
        x={425} headY={390}
        labelX={382} labelAnchor="end"
        showBeam op={keyOp} sc={keySc} beamOp={keyBeam} labelOp={keyLbl}
        frame={frame}
      />

      {/* Fill light */}
      <LightStand
        num="②" label="FILL LIGHT" sub="90° OPPOSITE"
        color={SC.fill} textColor="#fff"
        x={1495} headY={390}
        labelX={1538} labelAnchor="start"
        showBeam op={fillOp} sc={fillSc} beamOp={fillBeam} labelOp={fillLbl}
        frame={frame}
      />

      {/* Back light (no beam cone — rim effect handled by halo) */}
      <LightStand
        num="③" label="BACK LIGHT" sub="45° BEHIND"
        color={SC.back} textColor={COLOR.textPrimary}
        x={960} headY={262}
        labelX={960} labelAnchor="middle"
        showBeam={false} op={backOp} sc={backSc} beamOp={0} labelOp={backLbl}
        frame={frame}
      />

    </svg>
  );
};

// ── Main export ────────────────────────────────────────────────────────────
export const ThreeLightDiagram3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Wall folds backward (bottom hinge, top falls away from viewer)
  const wallAngle = interpolate(frame, [LIFT_START, LIFT_END], [0, -86], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const wallOp = interpolate(frame, [LIFT_END - 14, LIFT_END + 4], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <GraphicWrapper>
      <div style={{ position: "relative", width: 1920, height: 1080 }}>

        {/* Interior scene — always rendered beneath the wall */}
        <InteriorScene frame={frame} fps={fps} />

        {/* Front wall — folds backward revealing scene */}
        {frame < LIFT_END + 8 && (
          <div style={{ position: "absolute", inset: 0, perspective: "1400px", pointerEvents: "none" }}>
            <div style={{
              position: "absolute",
              width: 1920,
              height: 1080,
              background: SC.wall,
              transform: `rotateX(${wallAngle}deg)`,
              transformOrigin: "center bottom",
              opacity: wallOp,
            }}>
              {/* Subtle architectural lines on wall surface */}
              <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
                <line x1={0}    y1={0}    x2={960} y2={540} stroke="#1a3050" strokeWidth={1} opacity={0.28} />
                <line x1={1920} y1={0}    x2={960} y2={540} stroke="#1a3050" strokeWidth={1} opacity={0.28} />
                <line x1={0}    y1={1080} x2={960} y2={540} stroke="#1a3050" strokeWidth={1} opacity={0.28} />
                <line x1={1920} y1={1080} x2={960} y2={540} stroke="#1a3050" strokeWidth={1} opacity={0.28} />
                <line x1={0}    y1={540}  x2={1920} y2={540} stroke="#1a3050" strokeWidth={0.8} opacity={0.14} />
                <line x1={960}  y1={0}    x2={960}  y2={1080} stroke="#1a3050" strokeWidth={0.8} opacity={0.14} />
              </svg>
            </div>
          </div>
        )}

      </div>
    </GraphicWrapper>
  );
};
