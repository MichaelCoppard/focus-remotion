/**
 * SwitchingCost — [1:10-1:35]
 * Three rows stacking in showing the compounding cost per mode switch.
 * 6 seconds (180 frames @ 30fps).
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

const ROWS = [
  { count: "1",  label: "SWITCH",   cost: "23 MIN",      unit: "LOST" },
  { count: "3",  label: "SWITCHES", cost: "69 MIN",      unit: "LOST" },
  { count: "5",  label: "SWITCHES", cost: "1 HR 55 MIN", unit: "LOST" },
];

// Frame at which each row starts its entrance
const ROW_DELAYS = [8, 36, 64];

const Row: React.FC<{
  row: typeof ROWS[number];
  delay: number;
}> = ({ row, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideX = spring({
    frame: Math.max(0, frame - delay),
    fps,
    from: -36,
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
      alignItems: "baseline",
      gap: 18,
      opacity: rowOp,
      transform: `translateX(${slideX}px)`,
    }}>

      {/* Switch count number */}
      <span style={{
        fontSize: 88,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.ringSecondary,
        letterSpacing: "-0.04em",
        lineHeight: 1,
        minWidth: 70,
        textAlign: "right",
      }}>
        {row.count}
      </span>

      {/* "SWITCH / SWITCHES" */}
      <span style={{
        fontSize: 18,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.textMuted,
        letterSpacing: "0.1em",
        minWidth: 120,
        paddingBottom: 8,
      }}>
        {row.label}
      </span>

      {/* "=" */}
      <span style={{
        fontSize: 40,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.textSecondary,
        paddingBottom: 4,
      }}>
        =
      </span>

      {/* Time cost */}
      <span style={{
        fontSize: 70,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.ringPrimary,
        letterSpacing: "-0.03em",
        lineHeight: 1,
      }}>
        {row.cost}
      </span>

      {/* "LOST" */}
      <span style={{
        fontSize: 18,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.textMuted,
        letterSpacing: "0.1em",
        paddingBottom: 10,
      }}>
        {row.unit}
      </span>

    </div>
  );
};

export const SwitchingCost: React.FC = () => {
  const frame = useCurrentFrame();

  // Header label fades in at the start
  const headerOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>

        {/* Header */}
        <div style={{ opacity: headerOp, marginBottom: 16 }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            THE SWITCHING COST
          </span>
        </div>

        {/* Rows */}
        {ROWS.map((row, i) => (
          <Row key={i} row={row} delay={ROW_DELAYS[i]} />
        ))}

      </div>
    </GraphicWrapper>
  );
};
