/**
 * FrictionAudit — Beat 6 [4:45-5:00]
 * Three-row list: the Friction Audit questions.
 * Left clean (no footnote).
 */
import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapperLong } from "./GraphicWrapperLong";

const QUESTIONS = [
  {
    num:      "①",
    question: "What question comes up on every call?",
    note:     "That's the first video you should make.",
  },
  {
    num:      "②",
    question: "What objection kills the deal?",
    note:     "Address it before they even pick up the phone.",
  },
  {
    num:      "③",
    question: "What do you wish they already knew?",
    note:     "That's the one that changes everything.",
  },
];

const ROW_DELAYS = [8, 36, 64];

const QuestionRow: React.FC<{ q: typeof QUESTIONS[number]; delay: number }> = ({
  q,
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
      alignItems: "flex-start",
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
        flexShrink: 0,
      }}>
        {q.num}
      </span>

      {/* Question + note */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{
          fontSize: 26,
          fontWeight: FONT_WEIGHT.extraBold,
          color: COLOR.textPrimary,
          letterSpacing: "0.01em",
          lineHeight: 1.25,
        }}>
          {q.question}
        </span>
        <span style={{
          fontSize: 17,
          fontWeight: FONT_WEIGHT.extraBold,
          color: COLOR.textMuted,
          letterSpacing: "0.03em",
        }}>
          {q.note}
        </span>
      </div>

    </div>
  );
};

export const FrictionAudit: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <GraphicWrapperLong>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start", maxWidth: 900 }}>

        {/* Header */}
        <div style={{ opacity: headerOp, marginBottom: 10 }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            THE FRICTION AUDIT
          </span>
        </div>

        {/* Questions */}
        {QUESTIONS.map((q, i) => (
          <QuestionRow key={i} q={q} delay={ROW_DELAYS[i]} />
        ))}

      </div>
    </GraphicWrapperLong>
  );
};
