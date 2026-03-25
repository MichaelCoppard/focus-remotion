/**
 * ProductionTimeline — Script 11
 * Two-row horizontal timeline: the full 10-step production pipeline.
 * Row 1 (pre-production) reveals left→right, then Row 2 (post-production).
 * 210 frames / 7 seconds.
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

const ROW1 = [
  { num: "01", title: "SCRIPT\nWRITING",  detail: "Ideas to page" },
  { num: "02", title: "REFINEMENT",       detail: "Cut, tighten, punch up" },
  { num: "03", title: "CAMERA\nSETUP",    detail: "Frame, focus, exposure" },
  { num: "04", title: "3-PT\nLIGHTING",   detail: "Key · Fill · Back" },
  { num: "05", title: "SOUND\nSETUP",     detail: "Mic, room, levels" },
];

const ROW2 = [
  { num: "06", title: "FILMING",          detail: "Takes, coverage, performance" },
  { num: "07", title: "EDITING",          detail: "Story, pacing, flow" },
  { num: "08", title: "BRAND\nGRAPHICS",  detail: "Templates & motion" },
  { num: "09", title: "AUDIENCE\nINTEL",  detail: "ICP, pain points, search intent" },
  { num: "10", title: "DISTRIBUTION",     detail: "Platform, timing, reach" },
];

const ROW1_DELAYS = [8, 22, 36, 50, 64];
const ROW2_DELAYS = [82, 96, 110, 124, 138];

const W = 1460;
const N = 5;

const TimelineRow: React.FC<{
  steps: typeof ROW1;
  delays: number[];
  label: string;
  labelDelay: number;
}> = ({ steps, delays, label, labelDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  const firstDelay = delays[0];
  const lastDelay  = delays[delays.length - 1];

  const lineW = interpolate(frame, [firstDelay, lastDelay + 10], [0, W], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });

  const phaseLabelOp = interpolate(frame, [labelDelay, labelDelay + 12], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>

      {/* Phase label */}
      <div style={{ opacity: phaseLabelOp }}>
        <span style={{
          fontSize: 10,
          fontWeight: FONT_WEIGHT.extraBold,
          color: COLOR.ringSecondary,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
        }}>
          {label}
        </span>
      </div>

      {/* Row */}
      <div style={{ position: "relative", width: W, height: 155 }}>

        {/* Connecting line */}
        <div style={{
          position: "absolute",
          top: 27,
          left: 0,
          width: lineW,
          height: 2,
          background: `linear-gradient(to right, ${COLOR.ringPrimary}, ${COLOR.ringSecondary})`,
          opacity: 0.25,
          borderRadius: 1,
        }} />

        {/* Nodes */}
        {steps.map((step, i) => {
          const xCenter = (i / (N - 1)) * W;
          const d = delays[i];
          const isLast = i === N - 1;

          const sc       = spring({ frame: Math.max(0, frame - d), fps, from: 0, to: 1, config: SPRING.bouncy });
          const nodeScale = interpolate(sc, [0, 0.65, 1], [0, 1.15, 1]);
          const nodeOp   = interpolate(frame, [d, d + 10], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });
          const textOp   = interpolate(frame, [d + 8, d + 20], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });
          const textY    = spring({ frame: Math.max(0, frame - (d + 8)), fps, from: 6, to: 0, config: SPRING.smooth });

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: xCenter,
                top: 0,
                transform: "translateX(-50%)",
                width: 260,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
              }}
            >
              {/* Circle */}
              <div style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                background: isLast ? COLOR.ringSecondary : "rgba(65,90,119,0.12)",
                border: `2px solid ${isLast ? COLOR.ringSecondary : COLOR.ringPrimary}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${nodeScale})`,
                opacity: nodeOp,
                flexShrink: 0,
              }}>
                <span style={{
                  fontSize: 15,
                  fontWeight: FONT_WEIGHT.extraBold,
                  color: isLast ? "#fff" : COLOR.ringPrimary,
                  letterSpacing: "0.02em",
                }}>
                  {step.num}
                </span>
              </div>

              {/* Labels */}
              <div style={{
                opacity: textOp,
                transform: `translateY(${textY}px)`,
                textAlign: "center",
                marginTop: 10,
                padding: "0 8px",
              }}>
                {step.title.split("\n").map((line, li) => (
                  <span key={li} style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: FONT_WEIGHT.extraBold,
                    color: isLast ? COLOR.ringSecondary : COLOR.ringPrimary,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    lineHeight: 1.3,
                  }}>
                    {line}
                  </span>
                ))}
                <span style={{
                  display: "block",
                  fontSize: 11,
                  fontWeight: FONT_WEIGHT.extraBold,
                  color: COLOR.textMuted,
                  letterSpacing: "0.03em",
                  marginTop: 5,
                  lineHeight: 1.3,
                }}>
                  {step.detail}
                </span>
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export const ProductionTimeline: React.FC = () => {
  const frame = useCurrentFrame();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  const headerOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Connector arrow between rows
  const connectorOp = interpolate(frame, [72, 82], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const connectorH  = interpolate(frame, [72, 82], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });

  // Footer
  const footerOp = interpolate(frame, [150, 162], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>

        {/* Header */}
        <div style={{ opacity: headerOp, marginBottom: 24 }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            THE PRODUCTION PIPELINE
          </span>
        </div>

        {/* Row 1 */}
        <TimelineRow steps={ROW1} delays={ROW1_DELAYS} label="PRE-PRODUCTION" labelDelay={4} />

        {/* Row connector */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: connectorOp,
          margin: "10px 0",
          alignSelf: "flex-start",
          marginLeft: 24,
        }}>
          <div style={{
            width: 2,
            height: 28 * connectorH,
            background: "rgba(29,29,31,0.15)",
            borderRadius: 1,
          }} />
          <span style={{
            fontSize: 10,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            CONTINUES →
          </span>
        </div>

        {/* Row 2 */}
        <TimelineRow steps={ROW2} delays={ROW2_DELAYS} label="POST-PRODUCTION & STRATEGY" labelDelay={78} />

        {/* Footer */}
        <div style={{ opacity: footerOp, marginTop: 20 }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringSecondary,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}>
            EVERY STEP IS AN OPPORTUNITY TO LOSE OR HOLD AUTHORITY
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
