/**
 * TwoStepSystem — [2:00]
 * The two-step 1 Take setup: Teleprompter + Stop Performing.
 * Staggered row reveal — left-to-right slide.
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
    num:      "①",
    category: "TELEPROMPTER",
    fix:      "All your thoughts in one place.",
    detail:   "Your brain focuses on how to say it.",
  },
  {
    num:      "②",
    category: "STOP PERFORMING",
    fix:      "Talk to your best client.",
    detail:   "Stumble? Find your place and continue.",
  },
];

const ROW_DELAYS = [8, 40];

const StepRow: React.FC<{ step: typeof STEPS[number]; delay: number }> = ({
  step,
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
    extrapolateLeft:  "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{
      display:   "flex",
      alignItems: "center",
      gap:        22,
      opacity:    rowOp,
      transform:  `translateX(${slideX}px)`,
    }}>

      {/* Number badge */}
      <span style={{
        fontSize:   52,
        fontWeight: FONT_WEIGHT.extraBold,
        color:      COLOR.ringSecondary,
        lineHeight: 1,
        minWidth:   48,
        textAlign:  "center",
      }}>
        {step.num}
      </span>

      {/* Category */}
      <span style={{
        fontSize:      28,
        fontWeight:    FONT_WEIGHT.extraBold,
        color:         COLOR.ringPrimary,
        letterSpacing: "0.06em",
        minWidth:      220,
      }}>
        {step.category}
      </span>

      {/* Arrow */}
      <span style={{
        fontSize:   20,
        color:      COLOR.textSecondary,
        fontWeight: FONT_WEIGHT.extraBold,
      }}>
        →
      </span>

      {/* Text */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{
          fontSize:      24,
          fontWeight:    FONT_WEIGHT.extraBold,
          color:         COLOR.textPrimary,
          letterSpacing: "0.01em",
          lineHeight:    1.2,
        }}>
          {step.fix}
        </span>
        <span style={{
          fontSize:      18,
          fontWeight:    FONT_WEIGHT.extraBold,
          color:         COLOR.textMuted,
          letterSpacing: "0.03em",
        }}>
          {step.detail}
        </span>
      </div>

    </div>
  );
};

export const TwoStepSystem: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>

        {/* Header */}
        <div style={{ opacity: headerOp, marginBottom: 18 }}>
          <span style={{
            fontSize:      13,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.textSecondary,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            THE 1 TAKE SETUP
          </span>
        </div>

        {/* Rows */}
        {STEPS.map((step, i) => (
          <StepRow key={i} step={step} delay={ROW_DELAYS[i]} />
        ))}

      </div>
    </GraphicWrapper>
  );
};
