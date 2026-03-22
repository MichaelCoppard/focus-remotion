/**
 * ThreeMicsUnder50 — [1:47-1:55]
 * Closing CTA punch stat. 3 mics under £50 that sound expensive.
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

export const ThreeMicsUnder50: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // ── Left: "3 MICS" springs in ─────────────────────────────────────────────
  const leftSpring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const leftScale  = interpolate(leftSpring, [0, 0.65, 1], [0.65, 1.08, 1]);
  const leftOp     = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // ── Divider grows ─────────────────────────────────────────────────────────
  const divScale = interpolate(frame, [6, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });

  // ── Right: "£50" springs in ───────────────────────────────────────────────
  const rightSpring = spring({ frame: Math.max(0, frame - 10), fps, from: 0, to: 1, config: SPRING.bouncy });
  const rightScale  = interpolate(rightSpring, [0, 0.65, 1], [0.65, 1.08, 1]);
  const rightOp     = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Label fades in ────────────────────────────────────────────────────────
  const labelOp = interpolate(frame, [28, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>

        {/* ── Stats row ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 60 }}>

          {/* 3 MICS */}
          <div style={{ opacity: leftOp, transform: `scale(${leftScale})`, textAlign: "center" }}>
            <span style={{
              fontSize: 130,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringSecondary,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              display: "block",
            }}>
              3
            </span>
            <span style={{
              fontSize: 22,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringSecondary,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.8,
            }}>
              MICS
            </span>
          </div>

          {/* Divider */}
          <div style={{
            width: 2,
            height: 110,
            background: "rgba(29,29,31,0.15)",
            transform: `scaleY(${divScale})`,
            transformOrigin: "center center",
            borderRadius: 1,
          }} />

          {/* £50 */}
          <div style={{ opacity: rightOp, transform: `scale(${rightScale})`, textAlign: "center" }}>
            <span style={{
              fontSize: 130,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringPrimary,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              display: "block",
            }}>
              £50
            </span>
            <span style={{
              fontSize: 22,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringPrimary,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.7,
            }}>
              OR UNDER
            </span>
          </div>

        </div>

        {/* ── Label ── */}
        <div style={{ opacity: labelOp }}>
          <span style={{
            fontSize: 16,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            THAT SOUND EXPENSIVE
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
