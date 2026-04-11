/**
 * VideographerCost — Script 14: Event Testimonials
 * Cost callout: hiring a videographer can cost upwards of £2,000.
 * Frame: "You can still get great results without one."
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

export const VideographerCost: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Label above
  const labelOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Hero number
  const heroSpring = spring({ frame: Math.max(0, frame - 8), fps, from: 0, to: 1, config: SPRING.bouncy });
  const heroScale  = interpolate(heroSpring, [0, 0.65, 1], [0.6, 1.1, 1]);
  const heroOp     = interpolate(frame, [8, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Sub-line
  const subOp = interpolate(frame, [22, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subY  = spring({ frame: Math.max(0, frame - 22), fps, from: 12, to: 0, config: SPRING.smooth });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>

        {/* Label */}
        <div style={{ opacity: labelOp }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            HIRING A VIDEOGRAPHER
          </span>
        </div>

        {/* £2,000+ */}
        <div style={{ opacity: heroOp, transform: `scale(${heroScale})` }}>
          <span style={{
            fontSize: 200,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringSecondary,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            display: "block",
            textAlign: "center",
          }}>
            £2,000+
          </span>
        </div>

        {/* Sub-line */}
        <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, textAlign: "center" }}>
          <span style={{
            fontSize: 22,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}>
            YOU CAN STILL GET GREAT RESULTS WITHOUT ONE
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
