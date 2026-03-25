/**
 * HelpfulIsNoise — [0:45-1:30]
 * Bold claim card: "Helpful content is usually just noise."
 * Contrast: authority vs. helpfulness.
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

export const HelpfulIsNoise: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // Eyebrow
  const eyebrowOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // "HELPFUL CONTENT" slides down
  const line1Y  = spring({ frame, fps, from: -22, to: 0, config: SPRING.snappy });
  const line1Op = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // "IS USUALLY JUST" fades in
  const line2Op = interpolate(frame, [8, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // "NOISE." bounces up
  const noiseSpring = spring({ frame: Math.max(0, frame - 12), fps, from: 0, to: 1, config: SPRING.bouncy });
  const noiseScale  = interpolate(noiseSpring, [0, 0.65, 1], [0.7, 1.08, 1]);
  const noiseOp     = interpolate(frame, [12, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Divider grows
  const divW = interpolate(frame, [24, 38], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });

  // Sub-line fades up
  const subOp = interpolate(frame, [34, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subY  = spring({ frame: Math.max(0, frame - 34), fps, from: 10, to: 0, config: SPRING.smooth });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, maxWidth: 900 }}>

        {/* Eyebrow */}
        <div style={{ opacity: eyebrowOp, marginBottom: 10 }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            THE UNCOMFORTABLE TRUTH
          </span>
        </div>

        {/* HELPFUL CONTENT */}
        <div style={{ opacity: line1Op, transform: `translateY(${line1Y}px)`, textAlign: "center" }}>
          <span style={{
            fontSize: 56,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textPrimary,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            display: "block",
            opacity: 0.5,
          }}>
            HELPFUL CONTENT
          </span>
        </div>

        {/* IS USUALLY JUST */}
        <div style={{ opacity: line2Op, textAlign: "center" }}>
          <span style={{
            fontSize: 28,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}>
            IS USUALLY JUST
          </span>
        </div>

        {/* NOISE. */}
        <div style={{ opacity: noiseOp, transform: `scale(${noiseScale})`, textAlign: "center" }}>
          <span style={{
            fontSize: 118,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringPrimary,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            display: "block",
          }}>
            NOISE.
          </span>
        </div>

        {/* Divider */}
        <div style={{
          height: 2,
          width: 480,
          background: "rgba(29,29,31,0.12)",
          borderRadius: 1,
          margin: "10px 0 6px",
          transform: `scaleX(${divW})`,
          transformOrigin: "center center",
        }} />

        {/* Sub-line */}
        <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, textAlign: "center" }}>
          <span style={{
            fontSize: 18,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.04em",
          }}>
            Authority is built on expertise — not helpfulness.
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
