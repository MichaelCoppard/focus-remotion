/**
 * PermissionVsDirection — [0:15-0:40]
 * Split comparison: PERMISSION (dimmed) vs DIRECTION (gold).
 * Label: "YOUR ANGLE DECIDES WHICH ONE YOU PROJECT"
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

export const PermissionVsDirection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // ── Left: PERMISSION springs in (dimmed — the problem) ───────────────────
  const leftSpring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const leftScale  = interpolate(leftSpring, [0, 0.65, 1], [0.65, 1.08, 1]);
  const leftOp     = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // ── Divider grows ─────────────────────────────────────────────────────────
  const divScale = interpolate(frame, [6, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });

  // ── Right: DIRECTION springs in (gold — the goal) ─────────────────────────
  const rightSpring = spring({ frame: Math.max(0, frame - 10), fps, from: 0, to: 1, config: SPRING.bouncy });
  const rightScale  = interpolate(rightSpring, [0, 0.65, 1], [0.65, 1.08, 1]);
  const rightOp     = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Label fades in ────────────────────────────────────────────────────────
  const labelOp = interpolate(frame, [28, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>

        {/* ── Stats row ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 56 }}>

          {/* PERMISSION — dimmed, the problem */}
          <div style={{ opacity: leftOp, transform: `scale(${leftScale})`, textAlign: "center" }}>
            <span style={{
              fontSize: 72,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringPrimary,
              opacity: 0.35,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              display: "block",
            }}>
              PERMIS
            </span>
            <span style={{
              fontSize: 72,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringPrimary,
              opacity: 0.35,
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              display: "block",
            }}>
              SION
            </span>
            <span style={{
              fontSize: 13,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.textSecondary,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              opacity: 0.6,
              marginTop: 8,
              display: "block",
            }}>
              CAMERA TOO LOW
            </span>
          </div>

          {/* Divider */}
          <div style={{
            width: 2,
            height: 100,
            background: "rgba(29,29,31,0.15)",
            transform: `scaleY(${divScale})`,
            transformOrigin: "center center",
            borderRadius: 1,
          }} />

          {/* DIRECTION — gold, the goal */}
          <div style={{ opacity: rightOp, transform: `scale(${rightScale})`, textAlign: "center" }}>
            <span style={{
              fontSize: 72,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringSecondary,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              display: "block",
            }}>
              DIREC
            </span>
            <span style={{
              fontSize: 72,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringSecondary,
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              display: "block",
            }}>
              TION
            </span>
            <span style={{
              fontSize: 13,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringSecondary,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              opacity: 0.8,
              marginTop: 8,
              display: "block",
            }}>
              EYE LEVEL
            </span>
          </div>

        </div>

        {/* ── Label ── */}
        <div style={{ opacity: labelOp }}>
          <span style={{
            fontSize: 14,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>
            YOUR ANGLE DECIDES WHICH ONE YOU PROJECT
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
