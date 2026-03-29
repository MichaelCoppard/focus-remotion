/**
 * AreYouRunningBusiness — Foundry Page hook card
 * Transparent-background overlay, positioned left.
 * Cue: 00:00:00 — "If you own a business..."
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

export const AreYouRunningBusiness: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const dissolveStart = durationInFrames - 14;

  // ── In ─────────────────────────────────────────────────────────────────────
  const fadeIn = interpolate(frame, [0, 9], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const popScale = spring({
    frame,
    fps,
    from: 0.72,
    to: 1,
    config: SPRING.bouncy,
  });

  // Eyebrow stagger
  const eyebrowOp = interpolate(frame, [4, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eyebrowY = spring({
    frame: Math.max(0, frame - 4),
    fps,
    from: 8,
    to: 0,
    config: SPRING.smooth,
  });

  // Question line 1
  const line1Op = interpolate(frame, [8, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line1Y = spring({
    frame: Math.max(0, frame - 8),
    fps,
    from: 12,
    to: 0,
    config: SPRING.snappy,
  });

  // Question line 2
  const line2Op = interpolate(frame, [14, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Y = spring({
    frame: Math.max(0, frame - 14),
    fps,
    from: 12,
    to: 0,
    config: SPRING.snappy,
  });

  // ── Out ────────────────────────────────────────────────────────────────────
  const cardOp = interpolate(
    frame,
    [dissolveStart, dissolveStart + 6],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) }
  );

  const combinedOp = Math.min(fadeIn, cardOp);

  return (
    <AbsoluteFill style={{ fontFamily, background: "transparent" }}>

      {/* Left-anchored card */}
      <div
        style={{
          position: "absolute",
          left: 88,
          top: "50%",
          transform: `translateY(-50%) scale(${popScale})`,
          transformOrigin: "center center",
          opacity: combinedOp,
          width: 540,
        }}
      >
        {/* Card */}
        <div
          style={{
            backgroundColor: COLOR.ringPrimary,
            borderRadius: 20,
            padding: "40px 52px 44px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 4px 16px rgba(0,0,0,0.25)",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              opacity: eyebrowOp,
              transform: `translateY(${eyebrowY}px)`,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: FONT_WEIGHT.extraBold,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
              }}
            >
              THE CONTENT TRAP
            </span>
          </div>

          {/* Line 1: ARE YOU */}
          <div
            style={{
              opacity: line1Op,
              transform: `translateY(${line1Y}px)`,
            }}
          >
            <span
              style={{
                fontSize: 58,
                fontWeight: FONT_WEIGHT.extraBold,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "-0.01em",
                lineHeight: 1,
                display: "block",
                textTransform: "uppercase",
              }}
            >
              ARE YOU
            </span>
          </div>

          {/* Line 2: RUNNING BUSINESS? */}
          <div
            style={{
              opacity: line2Op,
              transform: `translateY(${line2Y}px)`,
              marginTop: 4,
            }}
          >
            <span
              style={{
                fontSize: 58,
                fontWeight: FONT_WEIGHT.extraBold,
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
                lineHeight: 1,
                display: "block",
                textTransform: "uppercase",
              }}
            >
              RUNNING
            </span>
            <span
              style={{
                fontSize: 58,
                fontWeight: FONT_WEIGHT.extraBold,
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
                lineHeight: 1,
                display: "block",
              }}
            >
              BUSINESS?
            </span>
          </div>
        </div>
      </div>

    </AbsoluteFill>
  );
};
