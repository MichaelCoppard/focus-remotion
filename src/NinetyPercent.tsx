/**
 * NinetyPercent — Beat 2 [0:45-1:45]
 * Hero stat: "90%" — pre-sold before the meeting.
 * Footnote: "The other 10% is just confirming what they already believe."
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

export const NinetyPercent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Hero number springs in ─────────────────────────────────────────────────
  const heroSpring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const heroScale  = interpolate(heroSpring, [0, 0.65, 1], [0.6, 1.1, 1]);
  const heroOp     = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // ── Sub-line fades up ──────────────────────────────────────────────────────
  const subOp = interpolate(frame, [14, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subY  = spring({ frame: Math.max(0, frame - 14), fps, from: 12, to: 0, config: SPRING.smooth });

  // ── Label fades in ────────────────────────────────────────────────────────
  const labelOp = interpolate(frame, [28, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapperLong footnote="The other 10% is just confirming what they already believe.">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>

        {/* ── 90% ── */}
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
            90%
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
            OF THE SALE IS ALREADY DONE BEFORE THE MEETING
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
            THE MEETING IS JUST CONFIRMATION
          </span>
        </div>

      </div>
    </GraphicWrapperLong>
  );
};
