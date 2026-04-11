/**
 * PSRFramework — Script 14: Event Testimonials
 * The Problem / Shift / Result framework for structured testimonials.
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

const STEPS = [
  {
    letter: "P",
    label:  "PROBLEM",
    detail: "What specific hurdle was your firm facing before you arrived?",
  },
  {
    letter: "S",
    label:  "SHIFT",
    detail: "What happened at the forum that changed that?",
  },
  {
    letter: "R",
    label:  "RESULT",
    detail: "What was your measurable outcome?",
  },
];

const ROW_DELAYS = [8, 40, 72];

const StepRow: React.FC<{ step: typeof STEPS[number]; delay: number }> = ({ step, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideX = spring({
    frame: Math.max(0, frame - delay),
    fps,
    from: -44,
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

      {/* Letter badge */}
      <span style={{
        fontSize: 72,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.ringSecondary,
        lineHeight: 1,
        minWidth: 60,
        textAlign: "center",
      }}>
        {step.letter}
      </span>

      {/* Divider */}
      <div style={{
        width: 3,
        height: 56,
        background: COLOR.ringPrimary,
        borderRadius: 2,
        flexShrink: 0,
      }} />

      {/* Label */}
      <span style={{
        fontSize: 30,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.ringPrimary,
        letterSpacing: "0.1em",
        minWidth: 160,
      }}>
        {step.label}
      </span>

      {/* Arrow */}
      <span style={{
        fontSize: 22,
        color: COLOR.textSecondary,
        fontWeight: FONT_WEIGHT.extraBold,
      }}>
        →
      </span>

      {/* Detail */}
      <span style={{
        fontSize: 21,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.textMuted,
        letterSpacing: "0.02em",
        lineHeight: 1.35,
        maxWidth: 400,
      }}>
        {step.detail}
      </span>

    </div>
  );
};

export const PSRFramework: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-start" }}>

        {/* Header */}
        <div style={{ opacity: headerOp, marginBottom: 10 }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            THE PSR FRAMEWORK — STRUCTURED TESTIMONIALS
          </span>
        </div>

        {STEPS.map((step, i) => (
          <StepRow key={i} step={step} delay={ROW_DELAYS[i]} />
        ))}

      </div>
    </GraphicWrapper>
  );
};
