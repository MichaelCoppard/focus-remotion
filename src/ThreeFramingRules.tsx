/**
 * ThreeFramingRules — [1:05-1:40]
 * Three camera framing rules stacking in sequentially.
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

const RULES = [
  {
    num:    "①",
    rule:   "LEVEL THE LENS",
    fix:    "Books, boxes, whatever it takes.",
    detail: "Eye-level = equal footing.",
  },
  {
    num:    "②",
    rule:   "TWO-FINGER GAP",
    fix:    "Headroom above, not below.",
    detail: "Too much sky = you look small.",
  },
  {
    num:    "③",
    rule:   "SIT OFF-CENTER",
    fix:    "Chat, not lecture.",
    detail: "High-trust feel. Less formal.",
  },
];

const ROW_DELAYS = [8, 36, 64];

const RuleRow: React.FC<{ rule: typeof RULES[number]; delay: number }> = ({
  rule,
  delay,
}) => {
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
      gap: 22,
      opacity: rowOp,
      transform: `translateX(${slideX}px)`,
    }}>

      {/* Number badge */}
      <span style={{
        fontSize: 52,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.ringSecondary,
        lineHeight: 1,
        minWidth: 48,
        textAlign: "center",
      }}>
        {rule.num}
      </span>

      {/* Rule name */}
      <span style={{
        fontSize: 26,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.ringPrimary,
        letterSpacing: "0.08em",
        minWidth: 210,
      }}>
        {rule.rule}
      </span>

      {/* Arrow */}
      <span style={{
        fontSize: 20,
        color: COLOR.textSecondary,
        fontWeight: FONT_WEIGHT.extraBold,
      }}>
        →
      </span>

      {/* Fix text */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{
          fontSize: 24,
          fontWeight: FONT_WEIGHT.extraBold,
          color: COLOR.textPrimary,
          letterSpacing: "0.01em",
          lineHeight: 1.2,
        }}>
          {rule.fix}
        </span>
        <span style={{
          fontSize: 18,
          fontWeight: FONT_WEIGHT.extraBold,
          color: COLOR.textMuted,
          letterSpacing: "0.03em",
        }}>
          {rule.detail}
        </span>
      </div>

    </div>
  );
};

export const ThreeFramingRules: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>

        {/* Header */}
        <div style={{ opacity: headerOp, marginBottom: 14 }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            3 RULES — FRAME LIKE A PRO
          </span>
        </div>

        {/* Rows */}
        {RULES.map((rule, i) => (
          <RuleRow key={i} rule={rule} delay={ROW_DELAYS[i]} />
        ))}

      </div>
    </GraphicWrapper>
  );
};
