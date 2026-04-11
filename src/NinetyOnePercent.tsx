/**
 * NinetyOnePercent — Script 14: Event Testimonials
 * Stat: "91% of B2B buyers say result-driven stories are the primary factor
 * in their purchasing decisions." — Wyzowl 2026
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

export const NinetyOnePercent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Hero number
  const heroSpring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const heroScale  = interpolate(heroSpring, [0, 0.65, 1], [0.6, 1.1, 1]);
  const heroOp     = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Sub-line
  const subOp = interpolate(frame, [14, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subY  = spring({ frame: Math.max(0, frame - 14), fps, from: 12, to: 0, config: SPRING.smooth });

  // Source label
  const srcOp = interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>

        {/* 91% */}
        <div style={{ opacity: heroOp, transform: `scale(${heroScale})` }}>
          <span style={{
            fontSize: 220,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringSecondary,
            letterSpacing: "-0.06em",
            lineHeight: 1,
            display: "block",
            textAlign: "center",
          }}>
            91%
          </span>
        </div>

        {/* Sub-line */}
        <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, textAlign: "center", maxWidth: 720 }}>
          <span style={{
            fontSize: 24,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textPrimary,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            lineHeight: 1.35,
          }}>
            OF B2B BUYERS SAY RESULT-DRIVEN STORIES ARE{"\n"}THE PRIMARY FACTOR IN THEIR PURCHASING DECISIONS
          </span>
        </div>

        {/* Source */}
        <div style={{ opacity: srcOp }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            WYZOWL 2026
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
