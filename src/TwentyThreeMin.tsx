/**
 * TwentyThreeMin — [0:40-0:50]
 * "23 MINUTES to regain deep focus after one interruption — UC Irvine"
 * Single large number hero, staggered subtitle.
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

export const TwentyThreeMin: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── "23" hero pop ─────────────────────────────────────────────────────────
  const numSpring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const numScale  = interpolate(numSpring, [0, 0.65, 1], [0.6, 1.14, 1]);
  const numOp     = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  // ── "MINUTES" slides up ───────────────────────────────────────────────────
  const minY  = spring({ frame: Math.max(0, frame - 10), fps, from: 18, to: 0, config: SPRING.smooth });
  const minOp = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Subtitle lines ────────────────────────────────────────────────────────
  const ruleOp = interpolate(frame, [20, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sub1Op = interpolate(frame, [22, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sub2Op = interpolate(frame, [28, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const srcOp  = interpolate(frame, [36, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>

        {/* ── Big 23 ── */}
        <div style={{ opacity: numOp, transform: `scale(${numScale})` }}>
          <span style={{
            fontSize: 210,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textPrimary,
            letterSpacing: "-0.06em",
            lineHeight: 0.88,
            display: "block",
          }}>
            23
          </span>
        </div>

        {/* ── MINUTES ── */}
        <div style={{ opacity: minOp, transform: `translateY(${minY}px)` }}>
          <span style={{
            fontSize: 38,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringPrimary,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
          }}>
            MINUTES
          </span>
        </div>

        {/* ── Rule ── */}
        <div style={{
          width: 52,
          height: 1.5,
          background: "rgba(29,29,31,0.15)",
          margin: "14px 0 10px",
          opacity: ruleOp,
        }} />

        {/* ── Subtitle ── */}
        <div style={{ opacity: sub1Op, textAlign: "center" }}>
          <span style={{
            fontSize: 22,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.02em",
          }}>
            to regain deep focus
          </span>
        </div>

        <div style={{ opacity: sub2Op, textAlign: "center" }}>
          <span style={{
            fontSize: 22,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.02em",
          }}>
            after one interruption
          </span>
        </div>

        {/* ── Source ── */}
        <div style={{ opacity: srcOp, marginTop: 18 }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}>
            — UC Irvine Research
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
