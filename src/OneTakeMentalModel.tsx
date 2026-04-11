/**
 * OneTakeMentalModel — [1:55]
 * Title card for the core concept: "1 TAKE MENTAL MODEL".
 * Engineering over performance.
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

export const OneTakeMentalModel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Eyebrow label ─────────────────────────────────────────────────────────
  const eyebrowOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // ── "1" hero pops in ──────────────────────────────────────────────────────
  const numSpring = spring({ frame: Math.max(0, frame - 4), fps, from: 0, to: 1, config: SPRING.bouncy });
  const numScale  = interpolate(numSpring, [0, 0.65, 1], [0.6, 1.14, 1]);
  const numOp     = interpolate(frame, [4, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── "TAKE" slides in from right ───────────────────────────────────────────
  const takeX  = spring({ frame: Math.max(0, frame - 10), fps, from: 40, to: 0, config: SPRING.snappy });
  const takeOp = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── "MENTAL MODEL" slides up ──────────────────────────────────────────────
  const subY  = spring({ frame: Math.max(0, frame - 18), fps, from: 16, to: 0, config: SPRING.smooth });
  const subOp = interpolate(frame, [18, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Tagline fades in ──────────────────────────────────────────────────────
  const tagOp = interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>

        {/* Eyebrow */}
        <div style={{ opacity: eyebrowOp, marginBottom: 16 }}>
          <span style={{
            fontSize:      13,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.textSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            THE SYSTEM
          </span>
        </div>

        {/* "1 TAKE" hero row */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>

          {/* 1 */}
          <div style={{ opacity: numOp, transform: `scale(${numScale})` }}>
            <span style={{
              fontSize:      200,
              fontWeight:    FONT_WEIGHT.extraBold,
              color:         COLOR.ringSecondary,
              letterSpacing: "-0.06em",
              lineHeight:    0.88,
              display:       "block",
            }}>
              1
            </span>
          </div>

          {/* TAKE */}
          <div style={{ opacity: takeOp, transform: `translateX(${takeX}px)` }}>
            <span style={{
              fontSize:      96,
              fontWeight:    FONT_WEIGHT.extraBold,
              color:         COLOR.ringPrimary,
              letterSpacing: "-0.02em",
              lineHeight:    1,
              display:       "block",
            }}>
              TAKE
            </span>
          </div>

        </div>

        {/* MENTAL MODEL */}
        <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, marginTop: 8 }}>
          <span style={{
            fontSize:      38,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.textPrimary,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>
            MENTAL MODEL
          </span>
        </div>

        {/* Tagline */}
        <div style={{ opacity: tagOp, marginTop: 24 }}>
          <span style={{
            fontSize:      14,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.textSecondary,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            ENGINEERING OVER PERFORMANCE
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
