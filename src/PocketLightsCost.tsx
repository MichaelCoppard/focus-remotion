/**
 * PocketLightsCost — Script 14: Event Testimonials
 * £60 (3 × £20 RGB lights) vs £2,000+ (professional videographer)
 * Style: Dual stat + divider (FourHoursCost pattern)
 */
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapper } from "./GraphicWrapper";

export const PocketLightsCost: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // Left: £60 counts up
  const leftSpring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const leftScale  = interpolate(leftSpring, [0, 0.65, 1], [0.65, 1.08, 1]);
  const leftOp     = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const leftNum    = Math.round(
    interpolate(frame, [2, 22], [0, 60], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
    })
  );

  // Divider
  const divScale = interpolate(frame, [6, 22], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });

  // Right: £2,000+
  const rightSpring = spring({ frame: Math.max(0, frame - 8), fps, from: 0, to: 1, config: SPRING.bouncy });
  const rightScale  = interpolate(rightSpring, [0, 0.65, 1], [0.65, 1.08, 1]);
  const rightOp     = interpolate(frame, [8, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const labelOp = interpolate(frame, [26, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>

        <div style={{ display: "flex", alignItems: "center", gap: 80 }}>

          {/* £60 — the affordable option (gold) */}
          <div style={{ opacity: leftOp, transform: `scale(${leftScale})`, textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{
                fontSize: 54,
                fontWeight: FONT_WEIGHT.extraBold,
                color: COLOR.ringSecondary,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                paddingBottom: 14,
              }}>
                £
              </span>
              <span style={{
                fontSize: 132,
                fontWeight: FONT_WEIGHT.extraBold,
                color: COLOR.ringSecondary,
                letterSpacing: "-0.05em",
                lineHeight: 1,
              }}>
                {leftNum}
              </span>
            </div>
            <span style={{
              fontSize: 13,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.textSecondary,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              display: "block",
              marginTop: 10,
            }}>
              3 × £20 RGB POCKET LIGHTS
            </span>
          </div>

          {/* Divider */}
          <div style={{
            width: 2,
            height: 112,
            background: "rgba(29,29,31,0.18)",
            transform: `scaleY(${divScale})`,
            transformOrigin: "center center",
            borderRadius: 1,
          }} />

          {/* £2,000+ — the expensive comparison (dimmed) */}
          <div style={{ opacity: rightOp, transform: `scale(${rightScale})`, textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{
                fontSize: 54,
                fontWeight: FONT_WEIGHT.extraBold,
                color: COLOR.ringPrimary,
                opacity: 0.4,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                paddingBottom: 14,
              }}>
                £
              </span>
              <span style={{
                fontSize: 132,
                fontWeight: FONT_WEIGHT.extraBold,
                color: COLOR.ringPrimary,
                opacity: 0.4,
                letterSpacing: "-0.05em",
                lineHeight: 1,
              }}>
                2,000
              </span>
              <span style={{
                fontSize: 54,
                fontWeight: FONT_WEIGHT.extraBold,
                color: COLOR.ringPrimary,
                opacity: 0.4,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                paddingBottom: 14,
              }}>
                +
              </span>
            </div>
            <span style={{
              fontSize: 13,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.textSecondary,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              display: "block",
              marginTop: 10,
              opacity: 0.45,
            }}>
              PROFESSIONAL VIDEOGRAPHER
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
            SAME RESULT. DIFFERENT BUDGET.
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
