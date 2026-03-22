/**
 * OverEditingVsProducing — [1:40-2:00]
 * "OVER-EDITING" struck through → "PRODUCING" in gold.
 * Label: "WHEN YOU STOP ONE, YOU START THE OTHER"
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

export const OverEditingVsProducing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // ── "OVER-EDITING" springs in ─────────────────────────────────────────────
  const topSpring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const topScale  = interpolate(topSpring, [0, 0.65, 1], [0.7, 1.06, 1]);
  const topOp     = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // ── Strikethrough draws left → right ─────────────────────────────────────
  const strikeX = interpolate(frame, [16, 32], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });
  const strikeOp = interpolate(frame, [16, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── Down arrow ────────────────────────────────────────────────────────────
  const arrowY  = spring({ frame: Math.max(0, frame - 28), fps, from: -10, to: 0, config: SPRING.smooth });
  const arrowOp = interpolate(frame, [28, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── "PRODUCING" springs in ────────────────────────────────────────────────
  const botSpring = spring({ frame: Math.max(0, frame - 36), fps, from: 0, to: 1, config: SPRING.bouncy });
  const botScale  = interpolate(botSpring, [0, 0.65, 1], [0.7, 1.06, 1]);
  const botOp     = interpolate(frame, [36, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Label ─────────────────────────────────────────────────────────────────
  const labelOp = interpolate(frame, [50, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>

        {/* ── OVER-EDITING (dimmed + strikethrough) ── */}
        <div style={{
          position: "relative",
          opacity: topOp,
          transform: `scale(${topScale})`,
          display: "inline-flex",
          alignItems: "center",
        }}>
          <span style={{
            fontSize: 90,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textPrimary,
            opacity: 0.35,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}>
            OVER-EDITING
          </span>

          {/* Animated strikethrough */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: -6,
            right: -6,
            height: 5,
            background: COLOR.ringPrimary,
            borderRadius: 2,
            opacity: strikeOp,
            transform: `scaleX(${strikeX})`,
            transformOrigin: "left center",
          }} />
        </div>

        {/* ── Down arrow ── */}
        <div style={{
          opacity: arrowOp,
          transform: `translateY(${arrowY}px)`,
          fontSize: 30,
          color: COLOR.textSecondary,
          lineHeight: 1,
        }}>
          ↓
        </div>

        {/* ── PRODUCING ── */}
        <div style={{
          opacity: botOp,
          transform: `scale(${botScale})`,
        }}>
          <span style={{
            fontSize: 110,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringSecondary,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            display: "block",
          }}>
            PRODUCING
          </span>
        </div>

        {/* ── Label ── */}
        <div style={{ opacity: labelOp, marginTop: 10 }}>
          <span style={{
            fontSize: 14,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>
            WHEN YOU STOP ONE, YOU START THE OTHER
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
