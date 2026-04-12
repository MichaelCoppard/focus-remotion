/**
 * EventSocialProof — Meta Ad Campaign: Event Filming
 * Transparent overlay lower-third. Swap QUOTE and ATTRIBUTION for each ad variant.
 * Render with --codec prores --prores-profile 4444 for alpha channel.
 */
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";

// ── Edit these per variant ────────────────────────────────────────────────────
const QUOTE       = "The highlight reel from our annual forum generated more post-event enquiries than the event itself.";
const ATTRIBUTION = "Head of Marketing — Pharmaceutical Networking Group";
// ─────────────────────────────────────────────────────────────────────────────

const CARD_W = 860;

export const EventSocialProof: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardY = spring({
    frame,
    fps,
    from: 40,
    to: 0,
    config: SPRING.smooth,
  });

  const cardOp = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const quoteOp = interpolate(frame, [18, 32], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const attrOp = interpolate(frame, [28, 42], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <div style={{
      width:    1920,
      height:   1080,
      position: "relative",
      fontFamily: "Montserrat, sans-serif",
    }}>
      {/* Lower-third card */}
      <div style={{
        position:  "absolute",
        bottom:    72,
        left:      72,
        width:     CARD_W,
        opacity:   cardOp,
        transform: `translateY(${cardY}px)`,
      }}>
        {/* Gold top border */}
        <div style={{
          width:        CARD_W,
          height:       3,
          background:   COLOR.ringSecondary,
          borderRadius: 2,
          marginBottom: 0,
        }} />

        {/* Card body */}
        <div style={{
          background:   "rgba(13,27,42,0.88)",
          padding:      "22px 28px 20px",
          backdropFilter: "blur(4px)",
        }}>
          {/* Quote mark + text */}
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{
              fontSize:   36,
              fontWeight: FONT_WEIGHT.extraBold,
              color:      COLOR.ringSecondary,
              lineHeight: 1,
              marginTop:  -4,
              flexShrink: 0,
            }}>
              "
            </span>
            <span style={{
              fontSize:   19,
              fontWeight: FONT_WEIGHT.extraBold,
              color:      "#f5f5f5",
              lineHeight: 1.5,
              opacity:    quoteOp,
              fontStyle:  "italic",
            }}>
              {QUOTE}
            </span>
          </div>

          {/* Attribution */}
          <div style={{
            marginTop:  14,
            opacity:    attrOp,
            display:    "flex",
            alignItems: "center",
            gap:        10,
          }}>
            <div style={{
              width:        24,
              height:       2,
              background:   COLOR.ringSecondary,
              borderRadius: 1,
              flexShrink:   0,
            }} />
            <span style={{
              fontSize:      13,
              fontWeight:    FONT_WEIGHT.extraBold,
              color:         COLOR.ringSecondary,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}>
              {ATTRIBUTION}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
