/**
 * RiskMitigator — Script 14: Event Testimonials
 * A structured testimonial acts as a Risk Mitigator — 3 key points.
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

const POINTS = [
  {
    num:    "①",
    label:  "REPEATABLE PROOF",
    detail: "Proves that the success of your event is repeatable.",
  },
  {
    num:    "②",
    label:  "REMOVES GUESSWORK",
    detail: "Takes the guesswork out of the booking and rebooking process.",
  },
  {
    num:    "③",
    label:  "SPONSOR EVIDENCE",
    detail: "Gives sponsors the proof they need to say yes — or no.",
  },
];

const ROW_DELAYS = [8, 38, 68];

const PointRow: React.FC<{ point: typeof POINTS[number]; delay: number }> = ({ point, delay }) => {
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
      gap: 24,
      opacity: rowOp,
      transform: `translateX(${slideX}px)`,
    }}>

      {/* Number badge */}
      <span style={{
        fontSize: 52,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.ringSecondary,
        lineHeight: 1,
        minWidth: 52,
        textAlign: "center",
      }}>
        {point.num}
      </span>

      {/* Label */}
      <span style={{
        fontSize: 26,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.ringPrimary,
        letterSpacing: "0.08em",
        minWidth: 240,
      }}>
        {point.label}
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
        fontSize: 21,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.textMuted,
        letterSpacing: "0.02em",
        lineHeight: 1.35,
        maxWidth: 400,
      }}>
        {point.detail}
      </span>

    </div>
  );
};

export const RiskMitigator: React.FC = () => {
  const frame = useCurrentFrame();

  // Header fades in first
  const titleOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Sub-title slides up behind the title
  const subOp = interpolate(frame, [4, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subY  = spring({ frame: Math.max(0, frame - 4), fps: 30, from: 10, to: 0, config: SPRING.smooth });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>

        {/* Title */}
        <div style={{ opacity: titleOp, marginBottom: 0 }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            A STRUCTURED TESTIMONIAL
          </span>
        </div>

        {/* Sub-title */}
        <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, marginBottom: 16 }}>
          <span style={{
            fontSize: 34,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textPrimary,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}>
            ACTS AS A RISK MITIGATOR
          </span>
        </div>

        {POINTS.map((point, i) => (
          <PointRow key={i} point={point} delay={ROW_DELAYS[i]} />
        ))}

      </div>
    </GraphicWrapper>
  );
};
