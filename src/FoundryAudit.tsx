/**
 * FoundryAudit — [2:45-3:00]
 * The three Foundry Audit questions — numbered framework list.
 * Staggered left-slide reveal, matching ThreeBatchRules pattern.
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

const QUESTIONS = [
  {
    num:    "01",
    title:  "WHERE IS YOUR TIME LEAKING?",
    detail: "Map every hour you spend on content that isn't converting.",
  },
  {
    num:    "02",
    title:  "WHAT IS YOUR EXPERTISE WORTH?",
    detail: "Your knowledge is IP. Is it working for you, or is it locked in your head?",
  },
  {
    num:    "03",
    title:  "WHO ARE YOU ACTUALLY TALKING TO?",
    detail: "Broad reach ≠ right reach. One right viewer is worth a thousand wrong ones.",
  },
];

const ROW_DELAYS = [8, 38, 68];

const QuestionRow: React.FC<{ q: typeof QUESTIONS[number]; delay: number }> = ({ q, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideX = spring({ frame: Math.max(0, frame - delay), fps, from: -40, to: 0, config: SPRING.smooth });
  const rowOp  = interpolate(frame, [delay, delay + 14], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      gap: 24,
      opacity: rowOp,
      transform: `translateX(${slideX}px)`,
      maxWidth: 860,
    }}>

      {/* Number */}
      <span style={{
        fontSize: 42,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.ringSecondary,
        letterSpacing: "-0.02em",
        lineHeight: 1,
        minWidth: 56,
        textAlign: "right",
        flexShrink: 0,
        paddingTop: 2,
      }}>
        {q.num}
      </span>

      {/* Divider line */}
      <div style={{
        width: 2,
        height: 52,
        background: COLOR.ringPrimary,
        opacity: 0.2,
        borderRadius: 1,
        flexShrink: 0,
        alignSelf: "center",
      }} />

      {/* Text block */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{
          fontSize: 20,
          fontWeight: FONT_WEIGHT.extraBold,
          color: COLOR.ringPrimary,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          lineHeight: 1.2,
        }}>
          {q.title}
        </span>
        <span style={{
          fontSize: 15,
          fontWeight: FONT_WEIGHT.extraBold,
          color: COLOR.textMuted,
          letterSpacing: "0.02em",
          lineHeight: 1.4,
        }}>
          {q.detail}
        </span>
      </div>

    </div>
  );
};

export const FoundryAudit: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start" }}>

        {/* Header */}
        <div style={{ opacity: headerOp, marginBottom: 10 }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            THE FOUNDRY AUDIT — 3 QUESTIONS
          </span>
        </div>

        {QUESTIONS.map((q, i) => (
          <QuestionRow key={i} q={q} delay={ROW_DELAYS[i]} />
        ))}

      </div>
    </GraphicWrapper>
  );
};
