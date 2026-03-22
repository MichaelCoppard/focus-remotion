/**
 * ThreeFixes — [1:10-1:45]
 * Three production fixes stacking in sequentially.
 * 6 seconds (180 frames @ 30fps).
 */
import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapper } from "./GraphicWrapper";

const FIXES = [
  {
    num:      "①",
    category: "LIGHT",
    fix:      "Stop ceiling lights.",
    detail:   "Face a window.",
  },
  {
    num:      "②",
    category: "SOUND",
    fix:      "Rug or cushions off-camera.",
    detail:   "Acoustic sponge.",
  },
  {
    num:      "③",
    category: "LENS",
    fix:      "Camera at eye-level.",
    detail:   "Peer-to-peer handshake.",
  },
];

const ROW_DELAYS = [8, 36, 64];

const FixRow: React.FC<{ fix: typeof FIXES[number]; delay: number }> = ({
  fix,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideX = spring({
    frame: Math.max(0, frame - delay),
    fps,
    from: -40,
    to: 0,
    config: SPRING.smooth,
  });

  const rowOp = interpolate(frame, [delay, delay + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 22,
      opacity: rowOp,
      transform: `translateX(${slideX}px)`,
    }}>

      {/* Number badge */}
      <span style={{
        fontSize: 52,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.ringSecondary,
        lineHeight: 1,
        minWidth: 48,
        textAlign: "center",
      }}>
        {fix.num}
      </span>

      {/* Category */}
      <span style={{
        fontSize: 28,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.ringPrimary,
        letterSpacing: "0.1em",
        minWidth: 100,
      }}>
        {fix.category}
      </span>

      {/* Arrow */}
      <span style={{
        fontSize: 20,
        color: COLOR.textSecondary,
        fontWeight: FONT_WEIGHT.extraBold,
      }}>
        →
      </span>

      {/* Fix text */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{
          fontSize: 24,
          fontWeight: FONT_WEIGHT.extraBold,
          color: COLOR.textPrimary,
          letterSpacing: "0.01em",
          lineHeight: 1.2,
        }}>
          {fix.fix}
        </span>
        <span style={{
          fontSize: 18,
          fontWeight: FONT_WEIGHT.extraBold,
          color: COLOR.textMuted,
          letterSpacing: "0.04em",
        }}>
          {fix.detail}
        </span>
      </div>

    </div>
  );
};

export const ThreeFixes: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>

        {/* Header */}
        <div style={{ opacity: headerOp, marginBottom: 18 }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            3 FIXES — NO NEW GEAR REQUIRED
          </span>
        </div>

        {/* Rows */}
        {FIXES.map((fix, i) => (
          <FixRow key={i} fix={fix} delay={ROW_DELAYS[i]} />
        ))}

      </div>
    </GraphicWrapper>
  );
};
