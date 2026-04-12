/**
 * EventPackageBreakdown — Meta Ad Campaign: Event Filming
 * Staggered reveal of the 4 deliverables in the event filming package.
 */
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapper } from "./GraphicWrapper";

const ITEMS = [
  {
    num:    "①",
    label:  "HIGHLIGHT REEL",
    detail: "A polished, shareable edit that captures the energy of the day.",
  },
  {
    num:    "②",
    label:  "TESTIMONIAL VIDEOS",
    detail: "Structured, on-camera interviews with your attendees and speakers.",
  },
  {
    num:    "③",
    label:  "FULL PRESENTATION CAPTURE",
    detail: "Every word and every slide preserved long after the event ends.",
  },
  {
    num:    "④",
    label:  "EVENT ADVERTISEMENT",
    detail: "Built from your footage — ready to promote your next event.",
  },
];

const ROW_DELAYS  = [8, 46, 84, 122];
const BADGE_SIZE  = 52;
const ROW_HEIGHT  = 76;

const ItemRow: React.FC<{
  item: typeof ITEMS[number];
  delay: number;
  isLast: boolean;
}> = ({ item, delay, isLast }) => {
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

  const badgeSc = interpolate(
    spring({ frame: Math.max(0, frame - delay), fps, from: 0, to: 1, config: SPRING.bouncy }),
    [0, 0.65, 1], [0.5, 1.15, 1]
  );

  const lineProgress = interpolate(frame, [delay + 12, delay + 40], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <div style={{ display: "flex", gap: 0, alignItems: "flex-start" }}>

      {/* Badge + connector column */}
      <div style={{
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        width:         BADGE_SIZE,
        marginRight:   28,
        flexShrink:    0,
      }}>
        <div style={{
          width:          BADGE_SIZE,
          height:         BADGE_SIZE,
          borderRadius:   "50%",
          background:     COLOR.ringSecondary,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          opacity:        rowOp,
          transform:      `scale(${badgeSc})`,
          flexShrink:     0,
        }}>
          <span style={{
            fontSize:   22,
            fontWeight: FONT_WEIGHT.extraBold,
            color:      "#fff",
            lineHeight: 1,
          }}>
            {item.num}
          </span>
        </div>

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

      {/* Text content */}
      <div style={{
        opacity:       rowOp,
        transform:     `translateX(${slideX}px)`,
        paddingTop:    10,
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
          {item.label}
        </span>
        <span style={{
          fontSize:   20,
          fontWeight: FONT_WEIGHT.extraBold,
          color:      COLOR.textMuted,
          lineHeight: 1.4,
        }}>
          {item.detail}
        </span>
      </div>

    </div>
  );
};

export const EventPackageBreakdown: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const subOp   = interpolate(frame, [4, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subY    = spring({ frame: Math.max(0, frame - 4), fps: 30, from: 10, to: 0, config: SPRING.smooth });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", gap: 0, alignItems: "flex-start" }}>

        {/* Label */}
        <div style={{ opacity: titleOp, marginBottom: 2 }}>
          <span style={{
            fontSize:      13,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.textSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            EVENT FILMING PACKAGE
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
            WHAT'S INCLUDED
          </span>
        </div>

        {ITEMS.map((item, i) => (
          <ItemRow
            key={i}
            item={item}
            delay={ROW_DELAYS[i]}
            isLast={i === ITEMS.length - 1}
          />
        ))}

      </div>
    </GraphicWrapper>
  );
};
