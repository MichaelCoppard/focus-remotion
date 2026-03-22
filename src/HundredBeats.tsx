/**
 * HundredBeats — [1:47-1:55]
 * "£100 setup BEATS £5,000 camera in a bad room."
 * The closing punch stat.
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

export const HundredBeats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // ── £100 springs in ───────────────────────────────────────────────────────
  const leftSpring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const leftScale  = interpolate(leftSpring, [0, 0.65, 1], [0.65, 1.1, 1]);
  const leftOp     = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // ── "BEATS" fades in ──────────────────────────────────────────────────────
  const beatsOp = interpolate(frame, [14, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const beatsY  = spring({ frame: Math.max(0, frame - 14), fps, from: 8, to: 0, config: SPRING.smooth });

  // ── £5,000 springs in ─────────────────────────────────────────────────────
  const rightSpring = spring({ frame: Math.max(0, frame - 20), fps, from: 0, to: 1, config: SPRING.bouncy });
  const rightScale  = interpolate(rightSpring, [0, 0.65, 1], [0.65, 1.1, 1]);
  const rightOp     = interpolate(frame, [20, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Strikethrough draws across £5,000 ─────────────────────────────────────
  const strikeX  = interpolate(frame, [28, 44], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });
  const strikeOp = interpolate(frame, [28, 32], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── "IN A BAD ROOM" label ─────────────────────────────────────────────────
  const labelOp = interpolate(frame, [44, 54], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>

        {/* ── Main stat row ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>

          {/* £100 */}
          <div style={{ opacity: leftOp, transform: `scale(${leftScale})`, textAlign: "center" }}>
            <span style={{
              fontSize: 120,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringSecondary,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              display: "block",
            }}>
              £100
            </span>
            <span style={{
              fontSize: 14,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringSecondary,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              opacity: 0.7,
            }}>
              SETUP
            </span>
          </div>

          {/* BEATS */}
          <div style={{
            opacity: beatsOp,
            transform: `translateY(${beatsY}px)`,
          }}>
            <span style={{
              fontSize: 36,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.textPrimary,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              BEATS
            </span>
          </div>

          {/* £5,000 — struck through */}
          <div style={{ opacity: rightOp, transform: `scale(${rightScale})`, textAlign: "center" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <span style={{
                fontSize: 120,
                fontWeight: FONT_WEIGHT.extraBold,
                color: COLOR.ringPrimary,
                opacity: 0.35,
                letterSpacing: "-0.05em",
                lineHeight: 1,
                display: "block",
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
            <span style={{
              fontSize: 14,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringPrimary,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              opacity: 0.4,
            }}>
              CAMERA
            </span>
          </div>

        </div>

        {/* ── Label ── */}
        <div style={{ opacity: labelOp }}>
          <span style={{
            fontSize: 16,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            IN A BAD ROOM
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
