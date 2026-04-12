/**
 * SmilesVsDataPoints — Script 14: Event Testimonials
 * The central thesis: attendees give you smiles, you need data points.
 * Style: Versus / split (PitchVsPartnership pattern)
 */
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapper } from "./GraphicWrapper";

export const SmilesVsDataPoints: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // Left: SMILES (dimmed — what you get by default)
  const leftSpring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const leftScale  = interpolate(leftSpring, [0, 0.65, 1], [0.65, 1.08, 1]);
  const leftOp     = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Divider
  const divScale = interpolate(frame, [6, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });

  // Right: DATA POINTS (gold — what buyers actually need)
  const rightSpring = spring({ frame: Math.max(0, frame - 10), fps, from: 0, to: 1, config: SPRING.bouncy });
  const rightScale  = interpolate(rightSpring, [0, 0.65, 1], [0.65, 1.08, 1]);
  const rightOp     = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const labelOp = interpolate(frame, [28, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>

        <div style={{ display: "flex", alignItems: "center", gap: 72 }}>

          {/* SMILES — dimmed, the default outcome */}
          <div style={{ opacity: leftOp, transform: `scale(${leftScale})`, textAlign: "center" }}>
            <span style={{
              fontSize: 112,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringPrimary,
              opacity: 0.3,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              display: "block",
            }}>
              SMILES
            </span>
            <span style={{
              fontSize: 13,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.textSecondary,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.5,
              display: "block",
              marginTop: 12,
            }}>
              GENERIC SENTIMENT
            </span>
          </div>

          {/* Divider */}
          <div style={{
            width: 2,
            height: 112,
            background: "rgba(29,29,31,0.15)",
            transform: `scaleY(${divScale})`,
            transformOrigin: "center center",
            borderRadius: 1,
          }} />

          {/* DATA POINTS — gold, what you need */}
          <div style={{ opacity: rightOp, transform: `scale(${rightScale})`, textAlign: "center" }}>
            <span style={{
              fontSize: 112,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringSecondary,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              display: "block",
            }}>
              DATA
            </span>
            <span style={{
              fontSize: 112,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringSecondary,
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
              display: "block",
            }}>
              POINTS
            </span>
            <span style={{
              fontSize: 13,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringSecondary,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.85,
              display: "block",
              marginTop: 12,
            }}>
              MEASURABLE OUTCOMES
            </span>
          </div>

        </div>

        {/* Footer label */}
        <div style={{ opacity: labelOp }}>
          <span style={{
            fontSize: 15,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            ATTENDEES GIVE YOU ONE. BUYERS NEED THE OTHER.
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
