/**
 * WhatDoYouDo — Beat 1 [0:00-0:45]
 * "WHAT DO YOU DO?" struck through → "WHEN CAN WE START?" in gold.
 * Direct address: "Which question are your prospects asking?"
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

export const WhatDoYouDo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // ── "WHAT DO YOU DO?" springs in ──────────────────────────────────────────
  const topSpring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const topScale  = interpolate(topSpring, [0, 0.65, 1], [0.7, 1.06, 1]);
  const topOp     = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // ── Strikethrough draws left → right ─────────────────────────────────────
  const strikeX  = interpolate(frame, [16, 32], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });
  const strikeOp = interpolate(frame, [16, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── Down arrow ────────────────────────────────────────────────────────────
  const arrowY  = spring({ frame: Math.max(0, frame - 28), fps, from: -10, to: 0, config: SPRING.smooth });
  const arrowOp = interpolate(frame, [28, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── "WHEN CAN WE START?" springs in ──────────────────────────────────────
  const botSpring = spring({ frame: Math.max(0, frame - 36), fps, from: 0, to: 1, config: SPRING.bouncy });
  const botScale  = interpolate(botSpring, [0, 0.65, 1], [0.7, 1.06, 1]);
  const botOp     = interpolate(frame, [36, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Direct address fades in late ──────────────────────────────────────────
  const directOp = interpolate(frame, [58, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const directY  = spring({ frame: Math.max(0, frame - 58), fps, from: 8, to: 0, config: SPRING.smooth });

  return (
    <GraphicWrapperLong>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>

        {/* ── WHAT DO YOU DO? (dimmed + strikethrough) ── */}
        <div style={{
          position: "relative",
          opacity: topOp,
          transform: `scale(${topScale})`,
          display: "inline-flex",
          alignItems: "center",
        }}>
          <span style={{
            fontSize: 72,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textPrimary,
            opacity: 0.35,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}>
            WHAT DO YOU DO?
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

        {/* ── WHEN CAN WE START? ── */}
        <div style={{ opacity: botOp, transform: `scale(${botScale})` }}>
          <span style={{
            fontSize: 72,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringSecondary,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            display: "block",
          }}>
            WHEN CAN WE START?
          </span>
        </div>

        {/* ── Direct address ── */}
        <div style={{
          opacity: directOp,
          transform: `translateY(${directY}px)`,
          marginTop: 8,
        }}>
          <span style={{
            fontSize: 18,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringSecondary,
            letterSpacing: "0.08em",
            fontStyle: "italic",
          }}>
            Which question are your prospects asking?
          </span>
        </div>

      </div>
    </GraphicWrapperLong>
  );
};
