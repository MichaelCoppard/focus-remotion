/**
 * ThreeHourCost — [0:55]
 * "3 hours recording = time you aren't building your business."
 * Single large stat with staggered subtitle.
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

export const ThreeHourCost: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // ── Hero "3" bounces in ───────────────────────────────────────────────────
  const numSpring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const numScale  = interpolate(numSpring, [0, 0.65, 1], [0.6, 1.14, 1]);
  const numOp     = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  const numCount  = Math.round(
    interpolate(frame, [2, 16], [0, 3], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
    })
  );

  // ── "HOURS" slides up ─────────────────────────────────────────────────────
  const unitY  = spring({ frame: Math.max(0, frame - 10), fps, from: 18, to: 0, config: SPRING.smooth });
  const unitOp = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Rule ──────────────────────────────────────────────────────────────────
  const ruleOp = interpolate(frame, [20, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Subtitle lines ────────────────────────────────────────────────────────
  const sub1Op = interpolate(frame, [24, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sub2Op = interpolate(frame, [32, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>

        {/* ── Big 3 ── */}
        <div style={{ opacity: numOp, transform: `scale(${numScale})` }}>
          <span style={{
            fontSize:      210,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.ringSecondary,
            letterSpacing: "-0.06em",
            lineHeight:    0.88,
            display:       "block",
          }}>
            {numCount}
          </span>
        </div>

        {/* ── HOURS ── */}
        <div style={{ opacity: unitOp, transform: `translateY(${unitY}px)` }}>
          <span style={{
            fontSize:      38,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.ringPrimary,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
          }}>
            HOURS
          </span>
        </div>

        {/* ── Rule ── */}
        <div style={{
          width:      52,
          height:     1.5,
          background: "rgba(29,29,31,0.15)",
          margin:     "14px 0 10px",
          opacity:    ruleOp,
        }} />

        {/* ── Subtitle ── */}
        <div style={{ opacity: sub1Op, textAlign: "center" }}>
          <span style={{
            fontSize:      22,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.textMuted,
            letterSpacing: "0.02em",
          }}>
            you aren't closing your next contract
          </span>
        </div>

        <div style={{ opacity: sub2Op, textAlign: "center" }}>
          <span style={{
            fontSize:      15,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.textSecondary,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginTop:     4,
            display:       "block",
          }}>
            THE COST OF CHASING PERFECT
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
