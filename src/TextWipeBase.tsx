/**
 * TextWipeBase — staggered two-line reveal graphic.
 * Transparent background — for compositing over video with ProRes 4444 alpha.
 * Same staggered reveal as TwentyThreeMin but no brand background.
 */
import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";

const { fontFamily } = loadFont("normal", {
  weights: ["800"],
  subsets: ["latin"],
});

export interface TextWipeProps {
  line1:     string;
  line2:     string;
  fontSize?: number;
}

export const TextWipeBase: React.FC<TextWipeProps> = ({
  line1,
  line2,
  fontSize = 96,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const dissolveStart = durationInFrames - 14;

  // ── Out fade ──────────────────────────────────────────────────────────────
  const contentOp = interpolate(
    frame,
    [dissolveStart, dissolveStart + 6],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) }
  );

  // ── Line 1: bounces in ────────────────────────────────────────────────────
  const line1Spring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const line1Scale  = interpolate(line1Spring, [0, 0.65, 1], [0.6, 1.1, 1]);
  const line1Op     = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  // ── Line 2: slides up after line 1 ───────────────────────────────────────
  const line2Y  = spring({ frame: Math.max(0, frame - 12), fps, from: 20, to: 0, config: SPRING.smooth });
  const line2Op = interpolate(frame, [12, 24], [0, 1], {
    extrapolateLeft:  "clamp",
    extrapolateRight: "clamp",
  });

  // ── Divider grows after line 2 ────────────────────────────────────────────
  const divW = interpolate(frame, [26, 40], [0, 1], {
    extrapolateLeft:  "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ fontFamily, background: "transparent" }}>
      <div
        style={{
          position:       "absolute",
          inset:          0,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          opacity:        contentOp,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>

          {/* Line 1 */}
          <div style={{ opacity: line1Op, transform: `scale(${line1Scale})` }}>
            <span style={{
              fontSize,
              fontWeight:    FONT_WEIGHT.extraBold,
              color:         "#FFFFFF",
              letterSpacing: "-0.02em",
              lineHeight:    1,
              display:       "block",
              textTransform: "uppercase",
              textShadow:    "0 2px 24px rgba(0,0,0,0.8)",
            }}>
              {line1}
            </span>
          </div>

          {/* Line 2 */}
          <div style={{ opacity: line2Op, transform: `translateY(${line2Y}px)` }}>
            <span style={{
              fontSize:      Math.round(fontSize * 0.9),
              fontWeight:    FONT_WEIGHT.extraBold,
              color:         COLOR.ringSecondary,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display:       "block",
              textShadow:    "0 2px 24px rgba(0,0,0,0.8)",
            }}>
              {line2}
            </span>
          </div>

          {/* Divider */}
          <div style={{
            height:          2,
            width:           320,
            background:      "rgba(255,255,255,0.25)",
            borderRadius:    1,
            marginTop:       12,
            transform:       `scaleX(${divW})`,
            transformOrigin: "center center",
          }} />

        </div>
      </div>
    </AbsoluteFill>
  );
};
