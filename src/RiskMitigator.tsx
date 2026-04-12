/**
 * RiskMitigator — Script 14: Event Testimonials
 * Solid circle badges, vertical timeline connector, stagger reveal.
 */
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapper } from "./GraphicWrapper";

const POINTS = [
  {
    num:    "1",
    label:  "REPEATABLE PROOF",
    detail: "Proves that the success of your event is repeatable.",
  },
  {
    num:    "2",
    label:  "REMOVES GUESSWORK",
    detail: "Takes the guesswork out of the booking and rebooking process.",
  },
  {
    num:    "3",
    label:  "SPONSOR EVIDENCE",
    detail: "Gives sponsors the proof they need to say yes — or no.",
  },
];

const ROW_DELAYS  = [8, 38, 68];
const BADGE_SIZE  = 52;
const ROW_HEIGHT  = 72;   // approximate row height for connector calculation

const PointRow: React.FC<{ point: typeof POINTS[number]; delay: number; isLast: boolean }> = ({ point, delay, isLast }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideX = spring({
    frame: Math.max(0, frame - delay),
    fps,
    from: -44,
    to: 0,
    config: SPRING.smooth,
  });

  const rowOp = interpolate(frame, [delay, delay + 14], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Connector line draws downward after badge appears
  const lineProgress = interpolate(frame, [delay + 12, delay + 36], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <div style={{ display: "flex", gap: 0, alignItems: "flex-start" }}>

      {/* Left: badge + connector */}
      <div style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        width:          BADGE_SIZE,
        marginRight:    28,
        flexShrink:     0,
      }}>
        {/* Solid circle badge */}
        <div style={{
          width:           BADGE_SIZE,
          height:          BADGE_SIZE,
          borderRadius:    "50%",
          background:      COLOR.ringSecondary,
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          opacity:         rowOp,
          transform:       `scale(${interpolate(spring({ frame: Math.max(0, frame - delay), fps, from: 0, to: 1, config: SPRING.bouncy }), [0, 0.65, 1], [0.5, 1.15, 1])})`,
          flexShrink:      0,
        }}>
          <span style={{
            fontSize:   24,
            fontWeight: FONT_WEIGHT.extraBold,
            color:      "#fff",
            lineHeight: 1,
          }}>
            {point.num}
          </span>
        </div>

        {/* Vertical connector (not shown on last item) */}
        {!isLast && (
          <div style={{
            width:        2,
            height:       ROW_HEIGHT - BADGE_SIZE / 2,
            background:   `rgba(194,164,109,${lineProgress * 0.35})`,
            borderRadius: 1,
            marginTop:    4,
          }} />
        )}
      </div>

      {/* Right: text content */}
      <div style={{
        opacity:   rowOp,
        transform: `translateX(${slideX}px)`,
        paddingTop: 10,
        paddingBottom: isLast ? 0 : ROW_HEIGHT - BADGE_SIZE,
      }}>
        <span style={{
          fontSize:      26,
          fontWeight:    FONT_WEIGHT.extraBold,
          color:         COLOR.ringPrimary,
          letterSpacing: "0.08em",
          display:       "block",
          marginBottom:  6,
        }}>
          {point.label}
        </span>
        <span style={{
          fontSize:   20,
          fontWeight: FONT_WEIGHT.extraBold,
          color:      COLOR.textMuted,
          lineHeight: 1.4,
        }}>
          {point.detail}
        </span>
      </div>

    </div>
  );
};

export const RiskMitigator: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const subOp   = interpolate(frame, [4, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subY    = spring({ frame: Math.max(0, frame - 4), fps: 30, from: 10, to: 0, config: SPRING.smooth });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", gap: 0, alignItems: "flex-start" }}>

        {/* Title */}
        <div style={{ opacity: titleOp, marginBottom: 2 }}>
          <span style={{
            fontSize:      13,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.textSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            A STRUCTURED TESTIMONIAL
          </span>
        </div>

        {/* Sub-title */}
        <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, marginBottom: 28 }}>
          <span style={{
            fontSize:      34,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.textPrimary,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}>
            ACTS AS A RISK MITIGATOR
          </span>
        </div>

        {POINTS.map((point, i) => (
          <PointRow
            key={i}
            point={point}
            delay={ROW_DELAYS[i]}
            isLast={i === POINTS.length - 1}
          />
        ))}

      </div>
    </GraphicWrapper>
  );
};
