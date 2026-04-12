/**
 * NinetyOnePercent — Script 14: Event Testimonials
 * Arc ring fills to 91% with count-up inside. Description to the right.
 */
import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT_WEIGHT, RING, SPRING } from "./brand";
import { GraphicWrapper } from "./GraphicWrapper";

const R  = 130;
const SW = 24;
const C  = 2 * Math.PI * R;   // ≈ 817

export const NinetyOnePercent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Arc fills to 91% ──────────────────────────────────────────────────────
  const arcProgress = interpolate(frame, [0, 42], [0, 0.91], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const dashOffset = C * (1 - arcProgress);

  // ── Number counts up inside ring ──────────────────────────────────────────
  const numValue = Math.round(
    interpolate(frame, [0, 38], [0, 91], {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    })
  );

  // ── Right text block ──────────────────────────────────────────────────────
  const subOp = interpolate(frame, [18, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subY  = spring({ frame: Math.max(0, frame - 18), fps, from: 12, to: 0, config: SPRING.smooth });
  const srcOp = interpolate(frame, [34, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const SVG_SIZE = (R + SW) * 2 + 16;  // 308

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", alignItems: "center", gap: 72 }}>

        {/* ── Arc ring ── */}
        <svg width={SVG_SIZE} height={SVG_SIZE} viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}>
          <g transform={`translate(${SVG_SIZE / 2}, ${SVG_SIZE / 2}) rotate(-90)`}>
            {/* Track */}
            <circle
              r={R} cx={0} cy={0}
              fill="none"
              stroke="rgba(29,29,31,0.08)"
              strokeWidth={SW}
            />
            {/* Filled arc */}
            <circle
              r={R} cx={0} cy={0}
              fill="none"
              stroke={COLOR.ringSecondary}
              strokeWidth={SW}
              strokeDasharray={C}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          </g>

          {/* Number inside ring */}
          <text
            x={SVG_SIZE / 2} y={SVG_SIZE / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={74}
            fontWeight={800}
            fill={COLOR.ringSecondary}
            fontFamily="Montserrat, sans-serif"
            letterSpacing="-2"
          >
            {numValue}%
          </text>
        </svg>

        {/* ── Description block ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 520 }}>

          <div style={{ opacity: subOp, transform: `translateY(${subY}px)` }}>
            <span style={{
              fontSize: 26,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.textPrimary,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              lineHeight: 1.4,
              display: "block",
            }}>
              OF B2B BUYERS SAY RESULT-DRIVEN STORIES ARE THE PRIMARY FACTOR IN THEIR PURCHASING DECISIONS
            </span>
          </div>

          <div style={{ opacity: srcOp }}>
            <span style={{
              fontSize: 13,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.textSecondary,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}>
              WYZOWL 2026
            </span>
          </div>

        </div>
      </div>
    </GraphicWrapper>
  );
};
