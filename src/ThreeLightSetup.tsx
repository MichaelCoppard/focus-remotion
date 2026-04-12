/**
 * ThreeLightSetup — Script 14: Event Testimonials
 * 3-light positioning guide with colour-coded glow indicators per light.
 */
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapper } from "./GraphicWrapper";

const LIGHTS = [
  {
    num:       "①",
    label:     "KEY LIGHT",
    detail:    "45° front — tripod at head height. Primary illumination.",
    glowColor: COLOR.ringSecondary,   // gold
    textColor: "#fff",
  },
  {
    num:       "②",
    label:     "FILL LIGHT",
    detail:    "90° opposite side — softens shadows from the key light.",
    glowColor: COLOR.ringPrimary,     // steel blue
    textColor: "#fff",
  },
  {
    num:       "③",
    label:     "BACK LIGHT",
    detail:    "45° behind the speaker — separates them from the background.",
    glowColor: "#f5f5f5",             // off-white
    textColor: COLOR.textPrimary,
  },
];

const ROW_DELAYS = [8, 38, 68];

const LightRow: React.FC<{ light: typeof LIGHTS[number]; delay: number }> = ({ light, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sc = spring({
    frame: Math.max(0, frame - delay),
    fps,
    from: 0,
    to: 1,
    config: SPRING.bouncy,
  });

  const slideX = spring({
    frame: Math.max(0, frame - delay),
    fps,
    from: -40,
    to: 0,
    config: SPRING.smooth,
  });

  const rowOp = interpolate(frame, [delay, delay + 14], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const glow = 0.55 + Math.sin(frame * 0.08 + delay) * 0.2;

  return (
    <div style={{
      display:    "flex",
      alignItems: "center",
      gap:        20,
      opacity:    rowOp,
      transform:  `translateX(${slideX}px)`,
    }}>

      {/* Colour-coded glow indicator */}
      <div style={{
        position:    "relative",
        width:       46,
        height:      46,
        flexShrink:  0,
        transform:   `scale(${sc})`,
      }}>
        {/* Glow halo */}
        <div style={{
          position:     "absolute",
          inset:        -8,
          borderRadius: "50%",
          background:   light.glowColor,
          opacity:      glow * 0.25,
          filter:       "blur(6px)",
        }} />
        {/* Circle badge */}
        <div style={{
          width:          46,
          height:         46,
          borderRadius:   "50%",
          background:     light.glowColor,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          position:       "relative",
        }}>
          <span style={{
            fontSize:   20,
            fontWeight: FONT_WEIGHT.extraBold,
            color:      light.textColor,
            lineHeight: 1,
          }}>
            {light.num}
          </span>
        </div>
      </div>

      {/* Label */}
      <span style={{
        fontSize:      26,
        fontWeight:    FONT_WEIGHT.extraBold,
        color:         light.glowColor === "#f5f5f5" ? COLOR.textPrimary : light.glowColor,
        letterSpacing: "0.08em",
        minWidth:      200,
      }}>
        {light.label}
      </span>

      {/* Arrow */}
      <span style={{
        fontSize:   20,
        color:      COLOR.textSecondary,
        fontWeight: FONT_WEIGHT.extraBold,
      }}>
        →
      </span>

      {/* Detail */}
      <span style={{
        fontSize:   21,
        fontWeight: FONT_WEIGHT.extraBold,
        color:      COLOR.textMuted,
        lineHeight: 1.35,
        maxWidth:   420,
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
      <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start" }}>

        {/* Header */}
        <div style={{ opacity: headerOp, marginBottom: 8 }}>
          <span style={{
            fontSize:      13,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.textSecondary,
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
