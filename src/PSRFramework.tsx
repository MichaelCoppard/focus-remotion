/**
 * PSRFramework — Script 14: Event Testimonials
 * 3-card horizontal flow: Problem → Shift → Result
 */
import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapper } from "./GraphicWrapper";

const STEPS = [
  {
    letter: "P",
    label:  "PROBLEM",
    detail: "What specific hurdle was your firm facing before you arrived?",
    color:  COLOR.ringPrimary,
    delay:  8,
  },
  {
    letter: "S",
    label:  "SHIFT",
    detail: "What happened at the forum that changed that?",
    color:  COLOR.ringSecondary,
    delay:  40,
  },
  {
    letter: "R",
    label:  "RESULT",
    detail: "What was your measurable outcome?",
    color:  COLOR.ringPrimary,
    delay:  72,
  },
];

const CARD_W = 380;
const CARD_H = 210;

const Card: React.FC<{ step: typeof STEPS[number] }> = ({ step }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sc = spring({
    frame: Math.max(0, frame - step.delay),
    fps,
    from: 0.82,
    to: 1,
    config: SPRING.snappy,
  });
  const op = interpolate(frame, [step.delay, step.delay + 16], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const detailOp = interpolate(frame, [step.delay + 16, step.delay + 28], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <div style={{
      opacity:       op,
      transform:     `scale(${sc})`,
      width:         CARD_W,
      height:        CARD_H,
      borderRadius:  18,
      background:    `rgba(${step.color === COLOR.ringSecondary ? "194,164,109" : "65,90,119"},0.08)`,
      border:        `1.5px solid ${step.color}30`,
      padding:       "28px 30px",
      display:       "flex",
      flexDirection: "column",
      gap:           10,
      boxSizing:     "border-box",
    }}>

      {/* Large letter */}
      <span style={{
        fontSize:      64,
        fontWeight:    FONT_WEIGHT.extraBold,
        color:         step.color,
        lineHeight:    1,
        letterSpacing: "-0.02em",
      }}>
        {step.letter}
      </span>

      {/* Label */}
      <span style={{
        fontSize:      16,
        fontWeight:    FONT_WEIGHT.extraBold,
        color:         step.color,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
      }}>
        {step.label}
      </span>

      {/* Detail */}
      <span style={{
        fontSize:   15,
        fontWeight: FONT_WEIGHT.extraBold,
        color:      COLOR.textMuted,
        lineHeight: 1.45,
        opacity:    detailOp,
      }}>
        {step.detail}
      </span>

    </div>
  );
};

// Arrow that draws in between cards
const Arrow: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + 18], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div style={{
      display:    "flex",
      alignItems: "center",
      opacity:    progress,
      marginTop:  -(CARD_H / 2 - 14),  // align to letter centre
    }}>
      <svg width={56} height={24} viewBox="0 0 56 24">
        <line
          x1={0} y1={12}
          x2={progress * 40} y2={12}
          stroke={COLOR.textSecondary}
          strokeWidth={1.5}
          opacity={0.5}
        />
        {progress > 0.7 && (
          <polyline
            points="38,6 48,12 38,18"
            fill="none"
            stroke={COLOR.textSecondary}
            strokeWidth={1.5}
            opacity={(progress - 0.7) / 0.3 * 0.5}
          />
        )}
      </svg>
    </div>
  );
};

export const PSRFramework: React.FC = () => {
  const frame = useCurrentFrame();
  const headerOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>

        {/* Header */}
        <div style={{ opacity: headerOp }}>
          <span style={{
            fontSize:      13,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.textSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            THE PSR FRAMEWORK — STRUCTURED TESTIMONIALS
          </span>
        </div>

        {/* 3-card row */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
          {STEPS.map((step, i) => (
            <React.Fragment key={i}>
              <Card step={step} />
              {i < STEPS.length - 1 && (
                <Arrow delay={STEPS[i + 1].delay - 10} />
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </GraphicWrapper>
  );
};
