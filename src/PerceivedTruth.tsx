/**
 * PerceivedTruth — [0:48-0:58]
 * Research anchor card. Crisp audio = perceived as more true + more credible.
 * The logical core of the whole script.
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

export const PerceivedTruth: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // ── "MORE TRUE" springs in ────────────────────────────────────────────────
  const line1Spring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const line1Scale  = interpolate(line1Spring, [0, 0.65, 1], [0.65, 1.1, 1]);
  const line1Op     = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // ── "MORE CREDIBLE" slides up ─────────────────────────────────────────────
  const line2Y  = spring({ frame: Math.max(0, frame - 12), fps, from: 20, to: 0, config: SPRING.smooth });
  const line2Op = interpolate(frame, [12, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Rule ──────────────────────────────────────────────────────────────────
  const ruleScale = interpolate(frame, [24, 36], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });

  // ── Sub-line ──────────────────────────────────────────────────────────────
  const subOp = interpolate(frame, [32, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subY  = spring({ frame: Math.max(0, frame - 32), fps, from: 10, to: 0, config: SPRING.smooth });

  // ── Source ────────────────────────────────────────────────────────────────
  const srcOp = interpolate(frame, [42, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>

        {/* ── MORE TRUE ── */}
        <div style={{ opacity: line1Op, transform: `scale(${line1Scale})` }}>
          <span style={{
            fontSize: 100,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringSecondary,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            textTransform: "uppercase",
            display: "block",
            textAlign: "center",
          }}>
            MORE TRUE
          </span>
        </div>

        {/* ── MORE CREDIBLE ── */}
        <div style={{ opacity: line2Op, transform: `translateY(${line2Y}px)` }}>
          <span style={{
            fontSize: 72,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringPrimary,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textTransform: "uppercase",
            display: "block",
            textAlign: "center",
          }}>
            MORE CREDIBLE
          </span>
        </div>

        {/* ── Rule ── */}
        <div style={{
          width: 52,
          height: 1.5,
          background: "rgba(29,29,31,0.15)",
          margin: "16px 0 10px",
          transform: `scaleX(${ruleScale})`,
          transformOrigin: "center center",
        }} />

        {/* ── Sub-line ── */}
        <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, textAlign: "center" }}>
          <span style={{
            fontSize: 21,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.02em",
          }}>
            Same words. Same content.{" "}
            <span style={{ color: COLOR.textPrimary }}>Crisp audio.</span>
          </span>
        </div>

        {/* ── Source ── */}
        <div style={{ opacity: srcOp, marginTop: 16 }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}>
            — Perceived Truth Research
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
