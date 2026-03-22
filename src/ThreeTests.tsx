/**
 * ThreeTests — [1:05-1:40]
 * Three calibration tests stacking in sequentially.
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

const TESTS = [
  {
    num:    "①",
    name:   "SYNC TEST",
    fix:    "Talk for 60 seconds.",
    detail: "Check the mic. Not the content.",
  },
  {
    num:    "②",
    name:   "LIGHT CHECK",
    fix:    "Calibrate the signal.",
    detail: "Don't perform. Just adjust.",
  },
  {
    num:    "③",
    name:   "TRASH TAKE",
    fix:    "Record to delete.",
    detail: "Find your actual voice.",
  },
];

const ROW_DELAYS = [8, 36, 64];

const TestRow: React.FC<{ test: typeof TESTS[number]; delay: number }> = ({
  test,
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
        {test.num}
      </span>

      {/* Test name */}
      <span style={{
        fontSize: 26,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.ringPrimary,
        letterSpacing: "0.1em",
        minWidth: 170,
      }}>
        {test.name}
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
          {test.fix}
        </span>
        <span style={{
          fontSize: 18,
          fontWeight: FONT_WEIGHT.extraBold,
          color: COLOR.textMuted,
          letterSpacing: "0.03em",
        }}>
          {test.detail}
        </span>
      </div>

    </div>
  );
};

export const ThreeTests: React.FC = () => {
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
            3 TESTS — BUILD THE SYSTEM
          </span>
        </div>

        {/* Rows */}
        {TESTS.map((test, i) => (
          <TestRow key={i} test={test} delay={ROW_DELAYS[i]} />
        ))}

      </div>
    </GraphicWrapper>
  );
};
