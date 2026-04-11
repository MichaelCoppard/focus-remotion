/**
 * ThreeLightSetup — Script 14: Event Testimonials
 * 3-light positioning guide for filming testimonials on location.
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

const LIGHTS = [
  {
    num:    "①",
    label:  "KEY LIGHT",
    detail: "45° front — tripod at head height. Primary illumination.",
  },
  {
    num:    "②",
    label:  "FILL LIGHT",
    detail: "90° opposite side — softens shadows from the key light.",
  },
  {
    num:    "③",
    label:  "BACK LIGHT",
    detail: "45° behind the speaker — separates them from the background.",
  },
];

const ROW_DELAYS = [8, 38, 68];

const LightRow: React.FC<{ light: typeof LIGHTS[number]; delay: number }> = ({ light, delay }) => {
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
        {light.num}
      </span>

      {/* Label */}
      <span style={{
        fontSize: 26,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.ringPrimary,
        letterSpacing: "0.08em",
        minWidth: 200,
      }}>
        {light.label}
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
        maxWidth: 420,
      }}>
        {light.detail}
      </span>

    </div>
  );
};

export const ThreeLightSetup: React.FC = () => {
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
            3-LIGHT SETUP — POCKET-SIZED RGB LIGHTS
          </span>
        </div>

        {LIGHTS.map((light, i) => (
          <LightRow key={i} light={light} delay={ROW_DELAYS[i]} />
        ))}

      </div>
    </GraphicWrapper>
  );
};
