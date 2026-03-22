import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { BG_GRADIENT, COLOR, FONT_WEIGHT, RING, SPRING } from "./brand";

// Load Montserrat at module level so Remotion waits for it before rendering
const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

// ── SVG ring geometry (from brand tokens) ─────────────────────────────────
const { r: R, C } = { r: RING.r, C: RING.C };
const TASK_LEN = (C * 5)  / 28;
const GAP_LEN  = (C * 23) / 28;

const TASK_DEG = -90;
const GAP_DEG  = -90 + (360 * 5) / 28;

// ── Easing helpers ─────────────────────────────────────────────────────────
const easeOut  = (t: number) => 1 - Math.pow(1 - t, 3);

// ── Frame constants (30 fps) ───────────────────────────────────────────────
//  0–8   : graphic spring in
//  1–25  : arcs draw (gap 1–25, task 1–12)
//  8–20  : center number pops in + counts up
//  14–22 : label 1 slides in
//  19–27 : label 2 slides in
//  25–60 : gap arc glow pulse
//  66–90 : gaussian blur dissolve out

export const FocusPie: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── 1. Container spring ─────────────────────────────────────────────────
  const scale = spring({
    frame,
    fps,
    from: 0.84,
    to: 1,
    config: SPRING.snappy,
  });
  const wrapOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  // ── 2. Arc draws ────────────────────────────────────────────────────────
  const taskOffset = interpolate(frame, [1, 12], [TASK_LEN, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  const gapOffset = interpolate(frame, [1, 25], [GAP_LEN, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  // ── 3. Center text ──────────────────────────────────────────────────────
  const centerSpring = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: 0,
    to: 1,
    config: SPRING.bouncy,
  });
  const centerScale  = interpolate(centerSpring, [0, 0.65, 1], [0.65, 1.1, 1]);
  const centerOp     = interpolate(frame, [8, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const centerNum    = Math.round(
    interpolate(frame, [10, 20], [0, 28], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // ── 4. Label slides ─────────────────────────────────────────────────────
  const lbl1X = spring({
    frame: Math.max(0, frame - 14),
    fps,
    from: -18,
    to: 0,
    config: SPRING.smooth,
  });
  const lbl1Op = interpolate(frame, [14, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lbl2X = spring({
    frame: Math.max(0, frame - 19),
    fps,
    from: -18,
    to: 0,
    config: SPRING.smooth,
  });
  const lbl2Op = interpolate(frame, [19, 27], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── 5. Glow pulse on gap arc ────────────────────────────────────────────
  const glow = interpolate(frame, [25, 35, 55, 66], [0, 9, 9, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── 6. Gaussian blur dissolve out ───────────────────────────────────────
  const blurPx     = interpolate(frame, [66, 90], [0, 24], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dissolveOp = interpolate(frame, [66, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const DONUT = 260;

  return (
    <AbsoluteFill
      style={{
        background: BG_GRADIENT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
      }}
    >
      {/* ── Whole graphic wrapper ─────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 56,
          transform: `scale(${scale})`,
          opacity: Math.min(wrapOpacity, dissolveOp),
          filter: `blur(${blurPx}px)`,
        }}
      >
        {/* ── Donut chart ─────────────────────────────────────────────── */}
        <div
          style={{
            position: "relative",
            width: DONUT,
            height: DONUT,
            flexShrink: 0,
          }}
        >
          <svg
            width={DONUT}
            height={DONUT}
            viewBox="0 0 200 200"
            style={{ overflow: "visible" }}
          >
            {/* Background track */}
            <circle
              cx="100" cy="100" r="78"
              fill="none"
              stroke={COLOR.ringTrack}
              strokeWidth="34"
            />

            {/* Recovery Gap — 23/28 of ring, vivid red */}
            <circle
              cx="100" cy="100" r="78"
              fill="none"
              stroke={COLOR.ringPrimary}
              strokeWidth={RING.strokeWidth}
              strokeLinecap="butt"
              strokeDasharray={`${GAP_LEN} ${C}`}
              strokeDashoffset={gapOffset}
              transform={`rotate(${GAP_DEG} 100 100)`}
              style={{
                filter: `drop-shadow(0 0 ${glow}px ${COLOR.glowPrimary})`,
              }}
            />

            {/* Quick Task — 5/28 of ring, gray */}
            <circle
              cx="100" cy="100" r="78"
              fill="none"
              stroke={COLOR.ringSecondary}
              strokeWidth={RING.strokeWidth}
              strokeLinecap="butt"
              strokeDasharray={`${TASK_LEN} ${C}`}
              strokeDashoffset={taskOffset}
              transform={`rotate(${TASK_DEG} 100 100)`}
            />
          </svg>

          {/* Center label overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              opacity: centerOp,
              transform: `scale(${centerScale})`,
            }}
          >
            <span
              style={{
                fontSize: 62,
                fontWeight: 800,
                color: COLOR.textPrimary,
                letterSpacing: "-0.05em",
                lineHeight: 1,
                textShadow: "none",
              }}
            >
              {centerNum}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: COLOR.textSecondary,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              MIN LOST
            </span>
          </div>
        </div>

        {/* ── Labels ──────────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

          {/* Quick Task */}
          <div
            style={{
              opacity: lbl1Op,
              transform: `translateX(${lbl1X}px)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
              <div
                style={{
                  width: 13, height: 13,
                  borderRadius: "50%",
                  background: COLOR.ringSecondary,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 48,
                  fontWeight: 800,
                  color: COLOR.textPrimary,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  textShadow: "none",
                }}
              >
                5
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: COLOR.textSecondary,
                  letterSpacing: "0.08em",
                  alignSelf: "flex-end",
                  paddingBottom: 6,
                }}
              >
                MIN
              </span>
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: COLOR.textMuted,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                paddingLeft: 26,
                marginTop: 4,
              }}
            >
              Quick Task
            </div>
            <div
              style={{
                width: 48,
                height: 1,
                background: "rgba(29,29,31,0.12)", // divider — intentionally subtle
                margin: "7px 0 0 26px",
              }}
            />
          </div>

          {/* Recovery Gap */}
          <div
            style={{
              opacity: lbl2Op,
              transform: `translateX(${lbl2X}px)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
              <div
                style={{
                  width: 13, height: 13,
                  borderRadius: "50%",
                  background: COLOR.ringPrimary,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 48,
                  fontWeight: 800,
                  color: COLOR.textAccent,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  textShadow: "none",
                }}
              >
                23
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: COLOR.textSecondary,
                  letterSpacing: "0.08em",
                  alignSelf: "flex-end",
                  paddingBottom: 6,
                }}
              >
                MIN
              </span>
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: COLOR.textAccent,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                paddingLeft: 26,
                marginTop: 4,
              }}
            >
              Focus Recovery Gap
            </div>
          </div>

        </div>
      </div>
    </AbsoluteFill>
  );
};
