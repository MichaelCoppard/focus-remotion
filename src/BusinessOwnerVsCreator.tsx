/**
 * BusinessOwnerVsCreator — [0:35]
 * Contrast: business owner (1000 things to do) vs content creator (always filming).
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

export const BusinessOwnerVsCreator: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // ── Left: BUSINESS OWNER ──────────────────────────────────────────────────
  const leftSpring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const leftScale  = interpolate(leftSpring, [0, 0.65, 1], [0.65, 1.08, 1]);
  const leftOp     = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // ── Divider grows ─────────────────────────────────────────────────────────
  const divScale = interpolate(frame, [6, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });

  // ── Right: CONTENT CREATOR ────────────────────────────────────────────────
  const rightSpring = spring({ frame: Math.max(0, frame - 10), fps, from: 0, to: 1, config: SPRING.bouncy });
  const rightScale  = interpolate(rightSpring, [0, 0.65, 1], [0.65, 1.08, 1]);
  const rightOp     = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Label fades in ────────────────────────────────────────────────────────
  const labelOp = interpolate(frame, [28, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>

        {/* ── Columns ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 56 }}>

          {/* BUSINESS OWNER */}
          <div style={{ opacity: leftOp, transform: `scale(${leftScale})`, textAlign: "center", maxWidth: 340 }}>
            <span style={{
              fontSize:      72,
              fontWeight:    FONT_WEIGHT.extraBold,
              color:         COLOR.ringPrimary,
              letterSpacing: "-0.03em",
              lineHeight:    1,
              display:       "block",
            }}>
              BUSINESS
            </span>
            <span style={{
              fontSize:      72,
              fontWeight:    FONT_WEIGHT.extraBold,
              color:         COLOR.ringPrimary,
              letterSpacing: "-0.03em",
              lineHeight:    0.95,
              display:       "block",
            }}>
              OWNER
            </span>
            <span style={{
              fontSize:      14,
              fontWeight:    FONT_WEIGHT.extraBold,
              color:         COLOR.textSecondary,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginTop:     8,
              display:       "block",
            }}>
              1000 OTHER THINGS TO DO
            </span>
          </div>

          {/* Divider */}
          <div style={{
            width:           2,
            height:          110,
            background:      "rgba(29,29,31,0.15)",
            transform:       `scaleY(${divScale})`,
            transformOrigin: "center center",
            borderRadius:    1,
          }} />

          {/* CONTENT CREATOR */}
          <div style={{ opacity: rightOp, transform: `scale(${rightScale})`, textAlign: "center", maxWidth: 340 }}>
            <span style={{
              fontSize:      72,
              fontWeight:    FONT_WEIGHT.extraBold,
              color:         COLOR.ringSecondary,
              opacity:       0.5,
              letterSpacing: "-0.03em",
              lineHeight:    1,
              display:       "block",
            }}>
              CONTENT
            </span>
            <span style={{
              fontSize:      72,
              fontWeight:    FONT_WEIGHT.extraBold,
              color:         COLOR.ringSecondary,
              opacity:       0.5,
              letterSpacing: "-0.03em",
              lineHeight:    0.95,
              display:       "block",
            }}>
              CREATOR
            </span>
            <span style={{
              fontSize:      14,
              fontWeight:    FONT_WEIGHT.extraBold,
              color:         COLOR.textSecondary,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginTop:     8,
              display:       "block",
            }}>
              ALWAYS IN THE EDIT
            </span>
          </div>

        </div>

        {/* ── Label ── */}
        <div style={{ opacity: labelOp }}>
          <span style={{
            fontSize:      15,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.textMuted,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            WHICH ONE ARE YOU?
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
