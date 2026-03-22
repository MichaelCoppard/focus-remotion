/**
 * FiveKvsPhysics — [0:30-0:38]
 * "£5,000 camera" struck through vs "PHYSICS"
 * The reframe: it's not about price, it's about light behaviour.
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

export const FiveKvsPhysics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // ── Left: £5,000 springs in ───────────────────────────────────────────────
  const leftSpring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const leftScale  = interpolate(leftSpring, [0, 0.65, 1], [0.65, 1.08, 1]);
  const leftOp     = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Strikethrough draws across £5,000
  const strikeX = interpolate(frame, [14, 28], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });
  const strikeOp = interpolate(frame, [14, 18], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── Divider ───────────────────────────────────────────────────────────────
  const divScale = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });

  // ── Right: PHYSICS springs in ─────────────────────────────────────────────
  const rightSpring = spring({ frame: Math.max(0, frame - 10), fps, from: 0, to: 1, config: SPRING.bouncy });
  const rightScale  = interpolate(rightSpring, [0, 0.65, 1], [0.65, 1.08, 1]);
  const rightOp     = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Label ─────────────────────────────────────────────────────────────────
  const labelOp = interpolate(frame, [30, 40], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>

        {/* ── Stats row ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 56 }}>

          {/* £5,000 — dimmed + strikethrough */}
          <div style={{ opacity: leftOp, transform: `scale(${leftScale})` }}>
            <div style={{ position: "relative", display: "inline-flex", alignItems: "baseline", gap: 4 }}>
              <span style={{
                fontSize: 110,
                fontWeight: FONT_WEIGHT.extraBold,
                color: COLOR.ringPrimary,
                opacity: 0.35,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}>
                £5,000
              </span>
              {/* Animated strikethrough */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: -4,
                right: -4,
                height: 5,
                background: COLOR.ringPrimary,
                borderRadius: 2,
                opacity: strikeOp,
                transform: `scaleX(${strikeX})`,
                transformOrigin: "left center",
              }} />
            </div>
            <div style={{
              fontSize: 14,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.textSecondary,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              textAlign: "center",
              marginTop: 8,
              opacity: 0.6,
            }}>
              CAMERA
            </div>
          </div>

          {/* Divider */}
          <div style={{
            width: 2,
            height: 100,
            background: "rgba(29,29,31,0.15)",
            transform: `scaleY(${divScale})`,
            transformOrigin: "center center",
            borderRadius: 1,
          }} />

          {/* PHYSICS */}
          <div style={{ opacity: rightOp, transform: `scale(${rightScale})`, textAlign: "center" }}>
            <span style={{
              fontSize: 110,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringSecondary,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              display: "block",
            }}>
              PHYSICS
            </span>
            <div style={{
              fontSize: 14,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.textSecondary,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginTop: 8,
            }}>
              IS FREE
            </div>
          </div>

        </div>

        {/* ── Label ── */}
        <div style={{ opacity: labelOp }}>
          <span style={{
            fontSize: 15,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            WHAT ACTUALLY MAKES YOU LOOK PRO
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
