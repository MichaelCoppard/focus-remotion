/**
 * FourHoursCost — [0:15-0:25]
 * "4 HRS spent for one 60 SEC clip"
 * Two large stats, divider, label.
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

export const FourHoursCost: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // ── Left: 4 HRS ──────────────────────────────────────────────────────────
  const leftSpring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const leftScale  = interpolate(leftSpring, [0, 0.65, 1], [0.65, 1.08, 1]);
  const leftOp     = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const hoursNum   = Math.round(
    interpolate(frame, [2, 16], [0, 4], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
    })
  );

  // ── Divider ───────────────────────────────────────────────────────────────
  const dividerScale = interpolate(frame, [6, 22], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });

  // ── Right: 60 SEC ─────────────────────────────────────────────────────────
  const rightSpring = spring({ frame: Math.max(0, frame - 8), fps, from: 0, to: 1, config: SPRING.bouncy });
  const rightScale  = interpolate(rightSpring, [0, 0.65, 1], [0.65, 1.08, 1]);
  const rightOp     = interpolate(frame, [8, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const secsNum     = Math.round(
    interpolate(frame, [10, 28], [0, 60], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
    })
  );

  // ── Label ─────────────────────────────────────────────────────────────────
  const labelOp = interpolate(frame, [26, 36], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>

        {/* ── Stats row ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 64 }}>

          {/* 4 HRS */}
          <div style={{ opacity: leftOp, transform: `scale(${leftScale})`, textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span style={{
                fontSize: 130,
                fontWeight: FONT_WEIGHT.extraBold,
                color: COLOR.ringSecondary,
                letterSpacing: "-0.05em",
                lineHeight: 1,
              }}>
                {hoursNum}
              </span>
              <span style={{
                fontSize: 32,
                fontWeight: FONT_WEIGHT.extraBold,
                color: COLOR.ringSecondary,
                letterSpacing: "0.06em",
                paddingBottom: 8,
              }}>
                HRS
              </span>
            </div>
          </div>

          {/* Divider */}
          <div style={{
            width: 2,
            height: 110,
            background: "rgba(29,29,31,0.18)",
            transform: `scaleY(${dividerScale})`,
            transformOrigin: "center center",
            borderRadius: 1,
          }} />

          {/* 60 SEC */}
          <div style={{ opacity: rightOp, transform: `scale(${rightScale})`, textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span style={{
                fontSize: 130,
                fontWeight: FONT_WEIGHT.extraBold,
                color: COLOR.ringPrimary,
                letterSpacing: "-0.05em",
                lineHeight: 1,
              }}>
                {secsNum}
              </span>
              <span style={{
                fontSize: 32,
                fontWeight: FONT_WEIGHT.extraBold,
                color: COLOR.ringPrimary,
                letterSpacing: "0.06em",
                paddingBottom: 8,
              }}>
                SEC
              </span>
            </div>
          </div>

        </div>

        {/* ── Label ── */}
        <div style={{ opacity: labelOp }}>
          <span style={{
            fontSize: 16,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            THE REAL COST OF ONE CLIP
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
