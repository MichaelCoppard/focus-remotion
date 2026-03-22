/**
 * RightFivePercent — Beat 3 [1:45-2:45]
 * Hero stat. 5% of your audience is all you need.
 * Whispered annotation: "The other 95% were never going to hire you."
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

export const RightFivePercent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Hero number springs in ────────────────────────────────────────────────
  const heroSpring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const heroScale  = interpolate(heroSpring, [0, 0.65, 1], [0.6, 1.1, 1]);
  const heroOp     = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // ── Sub-line fades up ─────────────────────────────────────────────────────
  const subOp = interpolate(frame, [14, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subY  = spring({ frame: Math.max(0, frame - 14), fps, from: 12, to: 0, config: SPRING.smooth });

  // ── Label fades in ────────────────────────────────────────────────────────
  const labelOp = interpolate(frame, [28, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapperLong footnote="The other 95% were never going to hire you.">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>

        {/* ── 5% ── */}
        <div style={{ opacity: heroOp, transform: `scale(${heroScale})` }}>
          <span style={{
            fontSize: 220,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringSecondary,
            letterSpacing: "-0.06em",
            lineHeight: 1,
            display: "block",
            textAlign: "center",
          }}>
            5%
          </span>
        </div>

        {/* ── Sub-line ── */}
        <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, textAlign: "center" }}>
          <span style={{
            fontSize: 22,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textPrimary,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}>
            OF YOUR AUDIENCE IS ALL YOU NEED
          </span>
        </div>

        {/* ── Label ── */}
        <div style={{ opacity: labelOp }}>
          <span style={{
            fontSize: 14,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            STOP OPTIMISING FOR THE WRONG CROWD
          </span>
        </div>

      </div>
    </GraphicWrapperLong>
  );
};
