/**
 * PopularVsRespected — Beat 2 [0:45-1:45]
 * Split comparison: POPULAR (dimmed) vs RESPECTED (gold).
 * Whispered annotation: "You're probably optimising for the wrong one."
 */
import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapperLong } from "./GraphicWrapperLong";

export const PopularVsRespected: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // ── Left: POPULAR springs in (dimmed — the trap) ──────────────────────────
  const leftSpring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const leftScale  = interpolate(leftSpring, [0, 0.65, 1], [0.65, 1.08, 1]);
  const leftOp     = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // ── Divider grows ─────────────────────────────────────────────────────────
  const divScale = interpolate(frame, [6, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });

  // ── Right: RESPECTED springs in (gold — the goal) ─────────────────────────
  const rightSpring = spring({ frame: Math.max(0, frame - 10), fps, from: 0, to: 1, config: SPRING.bouncy });
  const rightScale  = interpolate(rightSpring, [0, 0.65, 1], [0.65, 1.08, 1]);
  const rightOp     = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Label fades in ────────────────────────────────────────────────────────
  const labelOp = interpolate(frame, [28, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapperLong footnote="You're probably optimising for the wrong one.">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>

        {/* ── Stats row ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 56 }}>

          {/* POPULAR — dimmed, the trap */}
          <div style={{ opacity: leftOp, transform: `scale(${leftScale})`, textAlign: "center" }}>
            <span style={{
              fontSize: 100,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringPrimary,
              opacity: 0.35,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              display: "block",
            }}>
              POPULAR
            </span>
            <span style={{
              fontSize: 14,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.textSecondary,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              opacity: 0.6,
              marginTop: 8,
              display: "block",
            }}>
              STADIUM OF TOURISTS
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

          {/* RESPECTED — gold, the goal */}
          <div style={{ opacity: rightOp, transform: `scale(${rightScale})`, textAlign: "center" }}>
            <span style={{
              fontSize: 100,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringSecondary,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              display: "block",
            }}>
              RESPECTED
            </span>
            <span style={{
              fontSize: 14,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringSecondary,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              opacity: 0.8,
              marginTop: 8,
              display: "block",
            }}>
              ROOM THAT DECIDES
            </span>
          </div>

        </div>

        {/* ── Label ── */}
        <div style={{ opacity: labelOp }}>
          <span style={{
            fontSize: 14,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            THE GAP NOBODY TALKS ABOUT
          </span>
        </div>

      </div>
    </GraphicWrapperLong>
  );
};
