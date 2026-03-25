/**
 * ProductionEffort — Script 11
 * Bar chart: "Where Your Time Actually Goes"
 * 10 stages shown as animated vertical bars, height = relative effort.
 * Same data as ProductionTimeline, different informational style.
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

// Estimated hours per stage — relative effort
const BARS = [
  { label: "SCRIPT",    sub: "Writing",     hours: 3.0, highlight: false },
  { label: "REFINE",    sub: "Refinement",  hours: 2.0, highlight: false },
  { label: "CAMERA",    sub: "Setup",       hours: 1.0, highlight: false },
  { label: "LIGHTING",  sub: "3-Point",     hours: 1.0, highlight: false },
  { label: "SOUND",     sub: "Setup",       hours: 0.5, highlight: false },
  { label: "FILMING",   sub: "Recording",   hours: 2.5, highlight: false },
  { label: "EDITING",   sub: "Post",        hours: 5.0, highlight: true  }, // tallest
  { label: "BRAND",     sub: "Graphics",    hours: 2.0, highlight: false },
  { label: "AUDIENCE",  sub: "Research",    hours: 2.5, highlight: false },
  { label: "DEPLOY",    sub: "Distribution",hours: 1.0, highlight: false },
];

const MAX_HOURS  = 5.0;
const MAX_BAR_H  = 300;
const BAR_W      = 96;
const BAR_GAP    = 26;
const BAR_DELAY  = 10; // frames between each bar animating in

export const ProductionEffort: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  const headerOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Baseline (x-axis) grows in
  const baselineW = interpolate(frame, [4, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });

  const totalW = BARS.length * BAR_W + (BARS.length - 1) * BAR_GAP;

  // Footer
  const footerOp = interpolate(frame, [140, 152], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>

        {/* Header */}
        <div style={{ opacity: headerOp, marginBottom: 28 }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            WHERE YOUR TIME ACTUALLY GOES
          </span>
        </div>

        {/* Chart area */}
        <div style={{ position: "relative", width: totalW }}>

          {/* Y-axis guide lines (subtle) */}
          {[1, 2, 3, 4, 5].map(h => {
            const y = MAX_BAR_H - (h / MAX_HOURS) * MAX_BAR_H;
            const guideOp = interpolate(frame, [14, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div
                key={h}
                style={{
                  position: "absolute",
                  top: y,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: "rgba(29,29,31,0.06)",
                  opacity: guideOp,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{
                  position: "absolute",
                  left: -36,
                  fontSize: 10,
                  fontWeight: FONT_WEIGHT.extraBold,
                  color: COLOR.textSecondary,
                  letterSpacing: "0.04em",
                  opacity: 0.6,
                }}>
                  {h}h
                </span>
              </div>
            );
          })}

          {/* Bars */}
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            gap: BAR_GAP,
            height: MAX_BAR_H,
          }}>
            {BARS.map((bar, i) => {
              const delay = 20 + i * BAR_DELAY;
              const barHeight = (bar.hours / MAX_HOURS) * MAX_BAR_H;

              const sc       = spring({ frame: Math.max(0, frame - delay), fps, from: 0, to: 1, config: SPRING.smooth });
              const animH    = sc * barHeight;
              const op       = interpolate(frame, [delay, delay + 8], [0, 1], {
                extrapolateLeft: "clamp", extrapolateRight: "clamp",
              });

              // Hour label above bar
              const labelOp = interpolate(frame, [delay + 8, delay + 18], [0, 1], {
                extrapolateLeft: "clamp", extrapolateRight: "clamp",
              });

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0,
                    width: BAR_W,
                  }}
                >
                  {/* Hour label above */}
                  <div style={{
                    opacity: labelOp,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <span style={{
                      fontSize: 12,
                      fontWeight: FONT_WEIGHT.extraBold,
                      color: bar.highlight ? COLOR.ringSecondary : COLOR.ringPrimary,
                      letterSpacing: "0.04em",
                    }}>
                      {bar.hours % 1 === 0 ? `${bar.hours}h` : `${bar.hours}h`}
                    </span>
                  </div>

                  {/* Bar */}
                  <div style={{
                    width: BAR_W,
                    height: animH,
                    background: bar.highlight
                      ? COLOR.ringSecondary
                      : `rgba(65,90,119,${0.25 + (bar.hours / MAX_HOURS) * 0.5})`,
                    borderRadius: "4px 4px 0 0",
                    opacity: op,
                    border: bar.highlight ? `none` : `1px solid rgba(65,90,119,0.3)`,
                  }} />
                </div>
              );
            })}
          </div>

          {/* Baseline */}
          <div style={{
            width: totalW * baselineW,
            height: 2,
            background: "rgba(29,29,31,0.2)",
            borderRadius: 1,
            marginTop: 0,
          }} />

          {/* Bar labels below baseline */}
          <div style={{
            display: "flex",
            gap: BAR_GAP,
            marginTop: 10,
          }}>
            {BARS.map((bar, i) => {
              const delay = 20 + i * BAR_DELAY + 12;
              const labelOp = interpolate(frame, [delay, delay + 10], [0, 1], {
                extrapolateLeft: "clamp", extrapolateRight: "clamp",
              });
              return (
                <div
                  key={i}
                  style={{
                    width: BAR_W,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    opacity: labelOp,
                  }}
                >
                  <span style={{
                    fontSize: 10,
                    fontWeight: FONT_WEIGHT.extraBold,
                    color: bar.highlight ? COLOR.ringSecondary : COLOR.ringPrimary,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textAlign: "center",
                  }}>
                    {bar.label}
                  </span>
                  <span style={{
                    fontSize: 9,
                    fontWeight: FONT_WEIGHT.extraBold,
                    color: COLOR.textMuted,
                    letterSpacing: "0.04em",
                    textAlign: "center",
                  }}>
                    {bar.sub}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Footer */}
        <div style={{ opacity: footerOp, marginTop: 24 }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringSecondary,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}>
            EDITING ALONE TAKES AS LONG AS EVERYTHING BEFORE THE CAMERA
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
