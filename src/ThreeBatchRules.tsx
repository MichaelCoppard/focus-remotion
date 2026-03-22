/**
 * ThreeBatchRules — [1:05-1:40]
 * Three batching rules stacking in sequentially.
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
    rule:   "SCRIPT MONDAY",
    detail: "Write everything before the camera comes out.",
  },
  {
    num:    "②",
    rule:   "UNIFORM TRICK",
    detail: "Same outfit. Zero mental energy spent.",
  },
  {
    num:    "③",
    rule:   "PHONE-FREE ZONE",
    detail: "Notifications off. 15 minutes before you start.",
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
        fontSize: 28,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.ringPrimary,
        letterSpacing: "0.08em",
        minWidth: 220,
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

      {/* Detail */}
      <span style={{
        fontSize: 22,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.textMuted,
        letterSpacing: "0.02em",
        lineHeight: 1.3,
        maxWidth: 340,
      }}>
        {rule.detail}
      </span>

    </div>
  );
};

export const ThreeBatchRules: React.FC = () => {
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
            3 RULES — BATCH LIKE A PRODUCTION LINE
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
