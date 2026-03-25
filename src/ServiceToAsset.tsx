/**
 * ServiceToAsset — [2:15-2:45]
 * Horizontal progression spectrum:
 * SERVICE PROVIDER → TRUSTED EXPERT → STRATEGIC ASSET
 * Animated left-to-right track fill with node reveals.
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

const STAGES = [
  {
    label:  "SERVICE\nPROVIDER",
    sub:    "Easily replaced",
    accent: COLOR.ringPrimary,
    dim:    true,
  },
  {
    label:  "TRUSTED\nEXPERT",
    sub:    "Preferred over others",
    accent: COLOR.ringPrimary,
    dim:    false,
  },
  {
    label:  "STRATEGIC\nASSET",
    sub:    "Indispensable",
    accent: COLOR.ringSecondary,
    dim:    false,
  },
];

const STAGE_DELAYS = [6, 24, 42];

export const ServiceToAsset: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  const headerOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Track line fills left to right
  const trackFill = interpolate(frame, [10, 60], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });

  // Bottom footnote
  const noteOp = interpolate(frame, [72, 84], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const noteY  = spring({ frame: Math.max(0, frame - 72), fps, from: 8, to: 0, config: SPRING.smooth });

  const TRACK_W = 680;

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>

        {/* Header */}
        <div style={{ opacity: headerOp, marginBottom: 40 }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            THE PROGRESSION
          </span>
        </div>

        {/* Track + nodes */}
        <div style={{ position: "relative", width: TRACK_W, height: 180 }}>

          {/* Track background */}
          <div style={{
            position: "absolute",
            top: 38,
            left: 40,
            width: TRACK_W - 80,
            height: 3,
            background: "rgba(29,29,31,0.10)",
            borderRadius: 2,
          }} />

          {/* Track fill */}
          <div style={{
            position: "absolute",
            top: 38,
            left: 40,
            width: (TRACK_W - 80) * trackFill,
            height: 3,
            background: `linear-gradient(to right, ${COLOR.ringPrimary}, ${COLOR.ringSecondary})`,
            borderRadius: 2,
          }} />

          {/* Nodes */}
          {STAGES.map((stage, i) => {
            const xPos = 40 + ((TRACK_W - 80) / 2) * i;
            const d = STAGE_DELAYS[i];

            const sc  = spring({ frame: Math.max(0, frame - d), fps, from: 0, to: 1, config: SPRING.bouncy });
            const nsc = interpolate(sc, [0, 0.65, 1], [0.5, 1.12, 1]);
            const op  = interpolate(frame, [d, d + 10], [0, 1], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            });

            const isLast = i === STAGES.length - 1;

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: xPos,
                  top: 0,
                  transform: `translateX(-50%)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  opacity: op,
                }}
              >
                {/* Circle node */}
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: stage.dim ? "rgba(65,90,119,0.25)" : stage.accent,
                  border: `2px solid ${stage.accent}`,
                  marginTop: 28,
                  transform: `scale(${nsc})`,
                  flexShrink: 0,
                }} />

                {/* Label */}
                <div style={{ textAlign: "center", marginTop: 10 }}>
                  {stage.label.split("\n").map((line, li) => (
                    <span
                      key={li}
                      style={{
                        display: "block",
                        fontSize: isLast ? 22 : 18,
                        fontWeight: FONT_WEIGHT.extraBold,
                        color: stage.dim ? COLOR.textSecondary : stage.accent,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        opacity: stage.dim ? 0.5 : 1,
                        lineHeight: 1.2,
                      }}
                    >
                      {line}
                    </span>
                  ))}
                  <span style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: FONT_WEIGHT.extraBold,
                    color: COLOR.textMuted,
                    letterSpacing: "0.05em",
                    marginTop: 4,
                    opacity: stage.dim ? 0.5 : 0.8,
                  }}>
                    {stage.sub}
                  </span>
                </div>
              </div>
            );
          })}

        </div>

        {/* Footnote */}
        <div style={{ opacity: noteOp, transform: `translateY(${noteY}px)`, marginTop: 20 }}>
          <span style={{
            fontSize: 15,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.06em",
            fontStyle: "italic",
          }}>
            — the goal isn't to be useful. It's to be indispensable.
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
