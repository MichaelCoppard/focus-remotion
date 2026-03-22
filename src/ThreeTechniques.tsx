/**
 * ThreeTechniques — [1:05-1:40]
 * Three techniques stacking in sequentially.
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

const TECHNIQUES = [
  {
    num:      "①",
    category: "ANCHOR POINTS",
    fix:      "3 bullets before you record.",
    detail:   "Direction without rigidity.",
  },
  {
    num:      "②",
    category: "EDIT-IN-HEAD PAUSE",
    fix:      "Pause instead of filler words.",
    detail:   "Silence edits cleaner than \"um\".",
  },
  {
    num:      "③",
    category: "ONE-PERSON RULE",
    fix:      "Talk to one specific person.",
    detail:   "Connection, not performance.",
  },
];

const ROW_DELAYS = [8, 36, 64];

const TechRow: React.FC<{ tech: typeof TECHNIQUES[number]; delay: number }> = ({
  tech,
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
        {tech.num}
      </span>

      {/* Category */}
      <span style={{
        fontSize: 24,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.ringPrimary,
        letterSpacing: "0.08em",
        minWidth: 200,
      }}>
        {tech.category}
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
          {tech.fix}
        </span>
        <span style={{
          fontSize: 18,
          fontWeight: FONT_WEIGHT.extraBold,
          color: COLOR.textMuted,
          letterSpacing: "0.03em",
        }}>
          {tech.detail}
        </span>
      </div>

    </div>
  );
};

export const ThreeTechniques: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>

        {/* Header */}
        <div style={{ opacity: headerOp, marginBottom: 18 }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            3 TECHNIQUES — SPEAK LIKE A PARTNER, NOT A PRESENTER
          </span>
        </div>

        {/* Rows */}
        {TECHNIQUES.map((tech, i) => (
          <TechRow key={i} tech={tech} delay={ROW_DELAYS[i]} />
        ))}

      </div>
    </GraphicWrapper>
  );
};
