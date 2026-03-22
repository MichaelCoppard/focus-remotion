/**
 * HighChairEffect — [0:00-0:15]
 * Coined term card. What a low camera does to your authority before you speak.
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

export const HighChairEffect: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // ── "HIGH CHAIR" slides down ──────────────────────────────────────────────
  const line1Y  = spring({ frame, fps, from: -20, to: 0, config: SPRING.snappy });
  const line1Op = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // ── "EFFECT" springs up with bounce ──────────────────────────────────────
  const line2Spring = spring({ frame: Math.max(0, frame - 5), fps, from: 0, to: 1, config: SPRING.bouncy });
  const line2Scale  = interpolate(line2Spring, [0, 0.65, 1], [0.7, 1.1, 1]);
  const line2Op     = interpolate(frame, [5, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Sub-line ──────────────────────────────────────────────────────────────
  const subOp = interpolate(frame, [20, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subY  = spring({ frame: Math.max(0, frame - 20), fps, from: 10, to: 0, config: SPRING.smooth });

  // ── Rule ──────────────────────────────────────────────────────────────────
  const ruleScale = interpolate(frame, [28, 40], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });

  // ── Fix line ──────────────────────────────────────────────────────────────
  const fixOp = interpolate(frame, [36, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fixX  = spring({ frame: Math.max(0, frame - 36), fps, from: -16, to: 0, config: SPRING.smooth });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>

        {/* ── HIGH CHAIR ── */}
        <div style={{ opacity: line1Op, transform: `translateY(${line1Y}px)` }}>
          <span style={{
            fontSize: 62,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textPrimary,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            display: "block",
            textAlign: "center",
          }}>
            HIGH CHAIR
          </span>
        </div>

        {/* ── EFFECT ── */}
        <div style={{ opacity: line2Op, transform: `scale(${line2Scale})` }}>
          <span style={{
            fontSize: 110,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringPrimary,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            display: "block",
            textAlign: "center",
            lineHeight: 1,
          }}>
            EFFECT
          </span>
        </div>

        {/* ── Sub-line ── */}
        <div style={{
          opacity: subOp,
          transform: `translateY(${subY}px)`,
          marginTop: 16,
          textAlign: "center",
        }}>
          <span style={{
            fontSize: 20,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.03em",
          }}>
            What a low camera does to your authority before you speak
          </span>
        </div>

        {/* ── Rule ── */}
        <div style={{
          width: 52,
          height: 1.5,
          background: "rgba(29,29,31,0.15)",
          margin: "14px 0 10px",
          transform: `scaleX(${ruleScale})`,
          transformOrigin: "center center",
        }} />

        {/* ── Fix line ── */}
        <div style={{
          opacity: fixOp,
          transform: `translateX(${fixX}px)`,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringSecondary,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            EYE LEVEL
          </span>
          <span style={{ fontSize: 13, fontWeight: FONT_WEIGHT.extraBold, color: COLOR.textSecondary }}>
            →
          </span>
          <span style={{
            fontSize: 18,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textPrimary,
            letterSpacing: "0.03em",
          }}>
            Peer to peer.
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
