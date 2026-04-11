/**
 * SMARTGuarantee — Script 14: Event Testimonials
 * Foundry Media guarantee: if the strategy isn't SMART, full refund.
 * S — Specific / M — Measurable / A — Achievable / R — Realistic / T — Timebound
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

const SMART = [
  { letter: "S", word: "SPECIFIC" },
  { letter: "M", word: "MEASURABLE" },
  { letter: "A", word: "ACHIEVABLE" },
  { letter: "R", word: "REALISTIC" },
  { letter: "T", word: "TIMEBOUND" },
];

const ROW_DELAYS = [8, 32, 56, 80, 104];

const SmartRow: React.FC<{ item: typeof SMART[number]; delay: number }> = ({ item, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideX = spring({
    frame: Math.max(0, frame - delay),
    fps,
    from: -40,
    to: 0,
    config: SPRING.smooth,
  });

  const rowOp = interpolate(frame, [delay, delay + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 28,
      opacity: rowOp,
      transform: `translateX(${slideX}px)`,
    }}>

      {/* Letter */}
      <span style={{
        fontSize: 64,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.ringSecondary,
        lineHeight: 1,
        minWidth: 52,
        textAlign: "center",
      }}>
        {item.letter}
      </span>

      {/* Dash */}
      <span style={{
        fontSize: 28,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.textSecondary,
      }}>
        —
      </span>

      {/* Word */}
      <span style={{
        fontSize: 32,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.ringPrimary,
        letterSpacing: "0.12em",
      }}>
        {item.word}
      </span>

    </div>
  );
};

export const SMARTGuarantee: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>

        {/* Header */}
        <div style={{ opacity: headerOp, marginBottom: 14 }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            THE GUARANTEE — IF THE PLAN ISN'T SMART, FULL REFUND
          </span>
        </div>

        {SMART.map((item, i) => (
          <SmartRow key={i} item={item} delay={ROW_DELAYS[i]} />
        ))}

      </div>
    </GraphicWrapper>
  );
};
