/**
 * VideoAsEmployee — Beat 4 [2:45-3:45]
 * Coined term card: "YOUR MOST CONSISTENT EMPLOYEE"
 * Footnote: "Every view is a sales meeting you didn't have to attend."
 */
import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapperLong } from "./GraphicWrapperLong";

export const VideoAsEmployee: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Eyebrow fades in ──────────────────────────────────────────────────────
  const eyebrowOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // ── Main term springs in ──────────────────────────────────────────────────
  const termSpring = spring({ frame: Math.max(0, frame - 6), fps, from: 0, to: 1, config: SPRING.bouncy });
  const termScale  = interpolate(termSpring, [0, 0.65, 1], [0.72, 1.06, 1]);
  const termOp     = interpolate(frame, [6, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Divider grows ─────────────────────────────────────────────────────────
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
  const divW = interpolate(frame, [20, 36], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });

  // ── Sub-line fades up ─────────────────────────────────────────────────────
  const subOp = interpolate(frame, [30, 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subY  = spring({ frame: Math.max(0, frame - 30), fps, from: 10, to: 0, config: SPRING.smooth });

  return (
    <GraphicWrapperLong footnote="Every view is a sales meeting you didn't have to attend.">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, maxWidth: 860 }}>

        {/* ── Eyebrow ── */}
        <div style={{ opacity: eyebrowOp }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
          }}>
            THE CONCEPT
          </span>
        </div>

        {/* ── Main term ── */}
        <div style={{ opacity: termOp, transform: `scale(${termScale})`, textAlign: "center" }}>
          <span style={{
            fontSize: 86,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringSecondary,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            display: "block",
          }}>
            YOUR MOST CONSISTENT EMPLOYEE
          </span>
        </div>

        {/* ── Divider ── */}
        <div style={{
          height: 2,
          width: "100%",
          background: `rgba(29,29,31,0.12)`,
          borderRadius: 1,
          transform: `scaleX(${divW})`,
          transformOrigin: "left center",
        }} />

        {/* ── Sub-line ── */}
        <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, textAlign: "center" }}>
          <span style={{
            fontSize: 18,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            Never cancels. Never has an off day. Recruits while you sleep.
          </span>
        </div>

      </div>
    </GraphicWrapperLong>
  );
};
