/**
 * MarketingBudgetHolder — Script 14: Event Testimonials
 * Who you're actually influencing — not C-suite, but marketing budget holders.
 * Style: Stagger reveal (ThreeLightSetup pattern)
 */
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapper } from "./GraphicWrapper";

const ROWS = [
  {
    label:   "C-SUITE & SENIOR LEADERSHIP",
    sub:     "High-level decision makers",
    color:   COLOR.ringPrimary,
    dimmed:  true,
    delay:   8,
  },
  {
    label:   "MARKETING BUDGET HOLDERS",
    sub:     "The people who control spend",
    color:   COLOR.ringSecondary,
    dimmed:  false,
    delay:   38,
  },
];

const Row: React.FC<{ row: typeof ROWS[number]; delay: number }> = ({ row, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideX = spring({
    frame: Math.max(0, frame - delay),
    fps,
    from: -40,
    to: 0,
    config: SPRING.smooth,
  });

  const op = interpolate(frame, [delay, delay + 14], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <div style={{
      display:   "flex",
      alignItems: "center",
      gap:        28,
      opacity:   row.dimmed ? op * 0.38 : op,
      transform: `translateX(${slideX}px)`,
    }}>

      {/* Indicator dot */}
      <div style={{
        width:        10,
        height:       10,
        borderRadius: "50%",
        background:   row.color,
        flexShrink:   0,
        opacity:      row.dimmed ? 0.5 : 1,
      }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>

        {/* Main label */}
        <span style={{
          fontSize:      28,
          fontWeight:    FONT_WEIGHT.extraBold,
          color:         row.color,
          letterSpacing: "0.06em",
          lineHeight:    1,
          textDecoration: row.dimmed ? "line-through" : "none",
          textDecorationColor: `${row.color}60`,
          textDecorationThickness: 2,
        }}>
          {row.label}
        </span>

        {/* Sub-label */}
        <span style={{
          fontSize:      16,
          fontWeight:    FONT_WEIGHT.extraBold,
          color:         COLOR.textMuted,
          letterSpacing: "0.08em",
        }}>
          {row.sub}
        </span>

      </div>
    </div>
  );
};

export const MarketingBudgetHolder: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOp  = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const captionOp = interpolate(frame, [62, 76], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, alignItems: "flex-start" }}>

        {/* Header */}
        <div style={{ opacity: headerOp, marginBottom: 8 }}>
          <span style={{
            fontSize:      13,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.textSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            WHO YOU'RE ACTUALLY INFLUENCING
          </span>
        </div>

        {/* Rows */}
        {ROWS.map((row, i) => (
          <Row key={i} row={row} delay={row.delay} />
        ))}

        {/* Divider */}
        <div style={{
          width:      420,
          height:     1,
          background: "rgba(29,29,31,0.12)",
          marginTop:  8,
          opacity:    captionOp,
        }} />

        {/* Caption */}
        <div style={{ opacity: captionOp }}>
          <span style={{
            fontSize:      15,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.textMuted,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}>
            IT'S NOT ABOUT THE CEO. IT'S ABOUT THE BUYER.
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
