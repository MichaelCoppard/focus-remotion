/**
 * EventValueGraphic — Meta Ad Campaign: Event Filming
 * 2×2 grid of deliverable cards with staggered reveal.
 * Header: "ONE SHOOT. FOUR DELIVERABLES."
 */
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapper } from "./GraphicWrapper";

const CARDS = [
  {
    num:    "01",
    label:  "HIGHLIGHT REEL",
    detail: "Polished. Shareable. Captures the energy of the day.",
    delay:  8,
  },
  {
    num:    "02",
    label:  "TESTIMONIAL VIDEOS",
    detail: "On-camera interviews with attendees and speakers.",
    delay:  32,
  },
  {
    num:    "03",
    label:  "FULL PRESENTATION",
    detail: "Every word and every slide — preserved in full.",
    delay:  56,
  },
  {
    num:    "04",
    label:  "EVENT ADVERTISEMENT",
    detail: "Built from your footage to promote your next event.",
    delay:  80,
  },
];

const CARD_W = 430;
const CARD_H = 180;

const DeliverableCard: React.FC<{ card: typeof CARDS[number] }> = ({ card }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sc = spring({
    frame: Math.max(0, frame - card.delay),
    fps,
    from:   0.88,
    to:     1,
    config: SPRING.snappy,
  });

  const op = interpolate(frame, [card.delay, card.delay + 16], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const detailOp = interpolate(frame, [card.delay + 14, card.delay + 26], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <div style={{
      width:         CARD_W,
      height:        CARD_H,
      opacity:       op,
      transform:     `scale(${sc})`,
      background:    "rgba(65,90,119,0.07)",
      border:        `1.5px solid ${COLOR.ringSecondary}30`,
      borderTop:     `3px solid ${COLOR.ringSecondary}`,
      borderRadius:  12,
      padding:       "20px 24px",
      boxSizing:     "border-box",
      display:       "flex",
      flexDirection: "column",
      gap:           8,
    }}>
      <span style={{
        fontSize:      12,
        fontWeight:    FONT_WEIGHT.extraBold,
        color:         COLOR.ringSecondary,
        letterSpacing: "0.2em",
      }}>
        {card.num}
      </span>
      <span style={{
        fontSize:      20,
        fontWeight:    FONT_WEIGHT.extraBold,
        color:         COLOR.ringPrimary,
        letterSpacing: "0.07em",
        lineHeight:    1.2,
      }}>
        {card.label}
      </span>
      <span style={{
        fontSize:   15,
        fontWeight: FONT_WEIGHT.extraBold,
        color:      COLOR.textMuted,
        lineHeight: 1.4,
        opacity:    detailOp,
      }}>
        {card.detail}
      </span>
    </div>
  );
};

export const EventValueGraphic: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  const footerDelay = CARDS[CARDS.length - 1].delay + 20;
  const footerOp = interpolate(frame, [footerDelay, footerDelay + 16], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const footerY = spring({
    frame: Math.max(0, frame - footerDelay),
    fps: 30,
    from: 12,
    to: 0,
    config: SPRING.smooth,
  });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>

        {/* Header */}
        <div style={{ opacity: headerOp, textAlign: "center" }}>
          <span style={{
            fontSize:      13,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.textSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            ONE SHOOT. FOUR DELIVERABLES.
          </span>
        </div>

        {/* 2×2 grid */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: `repeat(2, ${CARD_W}px)`,
          gap:                 20,
        }}>
          {CARDS.map((card, i) => (
            <DeliverableCard key={i} card={card} />
          ))}
        </div>

        {/* Footer */}
        <div style={{
          opacity:   footerOp,
          transform: `translateY(${footerY}px)`,
          textAlign: "center",
        }}>
          <span style={{
            fontSize:      18,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.ringSecondary,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>
            EVERYTHING YOU NEED. NOTHING YOU DON'T.
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
