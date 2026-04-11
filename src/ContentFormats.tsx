/**
 * ContentFormats — [4:30]
 * Closing list: one system covers all formats — socials, shorts, long-format, ads.
 * Four staggered rows.
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

const FORMATS = [
  { label: "SOCIALS",      detail: "Organic reach — daily presence." },
  { label: "SHORTS",       detail: "Algorithm fuel — repurposed clips." },
  { label: "LONG-FORMAT",  detail: "Authority asset — owned media." },
  { label: "ADS",          detail: "Paid distribution — same system." },
];

const ROW_DELAYS = [8, 30, 52, 74];

const FormatRow: React.FC<{ item: typeof FORMATS[number]; delay: number; index: number }> = ({
  item,
  delay,
  index,
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
    extrapolateLeft:  "clamp",
    extrapolateRight: "clamp",
  });

  // Alternate accent colours: gold, steel, gold, steel
  const accentColor = index % 2 === 0 ? COLOR.ringSecondary : COLOR.ringPrimary;

  return (
    <div style={{
      display:    "flex",
      alignItems: "center",
      gap:        22,
      opacity:    rowOp,
      transform:  `translateX(${slideX}px)`,
    }}>

      {/* Dot */}
      <div style={{
        width:        10,
        height:       10,
        borderRadius: "50%",
        background:   accentColor,
        flexShrink:   0,
      }} />

      {/* Format name */}
      <span style={{
        fontSize:      30,
        fontWeight:    FONT_WEIGHT.extraBold,
        color:         accentColor,
        letterSpacing: "0.1em",
        minWidth:      200,
      }}>
        {item.label}
      </span>

      {/* Arrow */}
      <span style={{
        fontSize:   18,
        color:      COLOR.textSecondary,
        fontWeight: FONT_WEIGHT.extraBold,
      }}>
        →
      </span>

      {/* Detail */}
      <span style={{
        fontSize:      20,
        fontWeight:    FONT_WEIGHT.extraBold,
        color:         COLOR.textMuted,
        letterSpacing: "0.02em",
      }}>
        {item.detail}
      </span>

    </div>
  );
};

export const ContentFormats: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Footer label fades in after all rows
  const footerOp = interpolate(frame, [90, 102], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>

        {/* Header */}
        <div style={{ opacity: headerOp, marginBottom: 16 }}>
          <span style={{
            fontSize:      13,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.textSecondary,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            ONE SYSTEM. ALL FORMATS.
          </span>
        </div>

        {/* Rows */}
        {FORMATS.map((item, i) => (
          <FormatRow key={i} item={item} delay={ROW_DELAYS[i]} index={i} />
        ))}

        {/* Footer */}
        <div style={{ opacity: footerOp, marginTop: 18 }}>
          <span style={{
            fontSize:      13,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.textSecondary,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            YOUR OPERATING MANUAL FOR CONTENT
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
