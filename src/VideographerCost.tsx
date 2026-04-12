/**
 * VideographerCost — Script 14: Event Testimonials
 * Count-up to £2,000+ with fill bar growing in sync.
 */
import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapper } from "./GraphicWrapper";

const COUNT_START = 8;
const COUNT_END   = 54;
const BAR_W       = 620;

export const VideographerCost: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Label ─────────────────────────────────────────────────────────────────
  const labelOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // ── Hero container ─────────────────────────────────────────────────────────
  const heroSpring = spring({ frame: Math.max(0, frame - COUNT_START), fps, from: 0, to: 1, config: SPRING.bouncy });
  const heroScale  = interpolate(heroSpring, [0, 0.65, 1], [0.6, 1.1, 1]);
  const heroOp     = interpolate(frame, [COUNT_START, COUNT_START + 10], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── Count-up 0 → 2000 ─────────────────────────────────────────────────────
  const countValue = Math.round(
    interpolate(frame, [COUNT_START, COUNT_END], [0, 2000], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    })
  );
  const formatted =
    countValue >= 1000
      ? `£${Math.floor(countValue / 1000)},${String(countValue % 1000).padStart(3, "0")}`
      : `£${countValue}`;

  // ── "+" bounces in after count lands ──────────────────────────────────────
  const plusSpring = spring({ frame: Math.max(0, frame - COUNT_END), fps, from: 0, to: 1, config: SPRING.bouncy });
  const plusScale  = interpolate(plusSpring, [0, 0.65, 1], [0, 1.3, 1]);
  const plusOp     = interpolate(frame, [COUNT_END, COUNT_END + 6], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── Progress bar fills in sync with count ─────────────────────────────────
  const barFill = interpolate(frame, [COUNT_START, COUNT_END], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const barOp = interpolate(frame, [COUNT_START, COUNT_START + 8], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── Sub-line fades up after "+" lands ─────────────────────────────────────
  const subDelay = COUNT_END + 10;
  const subOp = interpolate(frame, [subDelay, subDelay + 12], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const subY = spring({ frame: Math.max(0, frame - subDelay), fps, from: 12, to: 0, config: SPRING.smooth });

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

        {/* Number + plus */}
        <div style={{
          opacity: heroOp,
          transform: `scale(${heroScale})`,
          display: "flex",
          alignItems: "baseline",
          lineHeight: 1,
        }}>
          <span style={{
            fontSize: 200,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringSecondary,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}>
            {formatted}
          </span>
          <span style={{
            fontSize: 200,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringSecondary,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            opacity: plusOp,
            transform: `scale(${plusScale})`,
            display: "inline-block",
            transformOrigin: "left center",
          }}>
            +
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ opacity: barOp, width: BAR_W, marginTop: -8 }}>
          {/* Track */}
          <div style={{
            width: BAR_W,
            height: 6,
            borderRadius: 3,
            background: "rgba(29,29,31,0.08)",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Fill */}
            <div style={{
              position: "absolute",
              left: 0, top: 0, bottom: 0,
              width: barFill * BAR_W,
              background: COLOR.ringSecondary,
              borderRadius: 3,
            }} />
          </div>
        </div>

        {/* Sub-line */}
        <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, textAlign: "center", marginTop: 8 }}>
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
