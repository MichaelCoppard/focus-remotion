/**
 * SevenHours — Beat 3 [1:45-2:45]
 * Hero stat: "7 HOURS" — the trust-building threshold.
 * Footnote: "Ten 5-minute videos. Nearly an hour inside your head."
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

export const SevenHours: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── "7" springs in ────────────────────────────────────────────────────────
  const heroSpring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const heroScale  = interpolate(heroSpring, [0, 0.65, 1], [0.6, 1.1, 1]);
  const heroOp     = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // ── "HOURS" fades in slightly after ───────────────────────────────────────
  const unitOp = interpolate(frame, [8, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const unitY  = spring({ frame: Math.max(0, frame - 8), fps, from: 10, to: 0, config: SPRING.smooth });

  // ── Sub-line fades up ─────────────────────────────────────────────────────
  const subOp = interpolate(frame, [18, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subY  = spring({ frame: Math.max(0, frame - 18), fps, from: 12, to: 0, config: SPRING.smooth });

  // ── Label fades in ────────────────────────────────────────────────────────
  const labelOp = interpolate(frame, [32, 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapperLong footnote="Ten 5-minute videos. Nearly an hour inside your head.">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>

        {/* ── 7 + HOURS ── */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 20 }}>
          <div style={{ opacity: heroOp, transform: `scale(${heroScale})` }}>
            <span style={{
              fontSize: 220,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringSecondary,
              letterSpacing: "-0.06em",
              lineHeight: 1,
              display: "block",
            }}>
              7
            </span>
          </div>

          <div style={{
            opacity: unitOp,
            transform: `translateY(${unitY}px)`,
            paddingBottom: 28,
          }}>
            <span style={{
              fontSize: 52,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringSecondary,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              display: "block",
            }}>
              HOURS
            </span>
          </div>
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
            OF INTERACTION TO BUILD ENOUGH TRUST
          </span>
        </div>

        {/* ── Label ── */}
        <div style={{ opacity: labelOp, marginTop: 8 }}>
          <span style={{
            fontSize: 14,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            YOU CAN'T CRAM THAT INTO ONE SALES CALL
          </span>
        </div>

      </div>
    </GraphicWrapperLong>
  );
};
