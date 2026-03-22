/**
 * FiftyVsFiftyThousand — Beat 1 [0:00-0:45]
 * Stat comparison: 50 views (gold) vs 50,000 views (dimmed).
 * Whispered annotation: "The smaller number is doing more work than you think."
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

export const FiftyVsFiftyThousand: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // ── Left: 50 springs in (gold — converts) ────────────────────────────────
  const leftSpring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const leftScale  = interpolate(leftSpring, [0, 0.65, 1], [0.65, 1.08, 1]);
  const leftOp     = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // ── Divider grows ─────────────────────────────────────────────────────────
  const divScale = interpolate(frame, [6, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });

  // ── Right: 50,000 springs in (dimmed — vanishes) ──────────────────────────
  const rightSpring = spring({ frame: Math.max(0, frame - 10), fps, from: 0, to: 1, config: SPRING.bouncy });
  const rightScale  = interpolate(rightSpring, [0, 0.65, 1], [0.65, 1.08, 1]);
  const rightOp     = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Label fades in ────────────────────────────────────────────────────────
  const labelOp = interpolate(frame, [28, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapperLong footnote="The smaller number is doing more work than you think.">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>

        {/* ── Stats row ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 60 }}>

          {/* 50 — gold, converts */}
          <div style={{ opacity: leftOp, transform: `scale(${leftScale})`, textAlign: "center" }}>
            <span style={{
              fontSize: 160,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringSecondary,
              letterSpacing: "-0.06em",
              lineHeight: 1,
              display: "block",
            }}>
              50
            </span>
            <span style={{
              fontSize: 14,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringSecondary,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.8,
              marginTop: 8,
              display: "block",
            }}>
              VIEWS THAT CONVERT
            </span>
          </div>

          {/* Divider */}
          <div style={{
            width: 2,
            height: 120,
            background: "rgba(29,29,31,0.15)",
            transform: `scaleY(${divScale})`,
            transformOrigin: "center center",
            borderRadius: 1,
          }} />

          {/* 50,000 — dimmed, vanishes */}
          <div style={{ opacity: rightOp, transform: `scale(${rightScale})`, textAlign: "center" }}>
            <span style={{
              fontSize: 110,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.ringPrimary,
              opacity: 0.35,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              display: "block",
            }}>
              50,000
            </span>
            <span style={{
              fontSize: 14,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.textSecondary,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.5,
              marginTop: 8,
              display: "block",
            }}>
              VIEWS THAT VANISH
            </span>
          </div>

        </div>

        {/* ── Label ── */}
        <div style={{ opacity: labelOp }}>
          <span style={{
            fontSize: 14,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            NOT ALL VIEWS ARE CREATED EQUAL
          </span>
        </div>

      </div>
    </GraphicWrapperLong>
  );
};
