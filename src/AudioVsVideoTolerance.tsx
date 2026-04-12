/**
 * AudioVsVideoTolerance — Script 14: Event Testimonials
 * Animated horizontal bar chart: audience forgiveness for poor video vs poor audio.
 */
import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapper } from "./GraphicWrapper";

const BAR_MAX_W = 780;  // px — full-width bar at 100%
const BAR_H     = 72;
const BAR_RX    = 10;
const TRACK_OP  = 0.1;

// VIDEO: high tolerance (audiences forgive bad visuals)
const VIDEO_FILL = 0.80;
// AUDIO: low tolerance (audiences do not forgive bad audio)
const AUDIO_FILL = 0.16;

function fIn(frame: number, start: number, dur = 18) {
  return interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
}

export const AudioVsVideoTolerance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp  = fIn(frame, 0,  12);
  const captionOp = fIn(frame, 68, 18);

  // ── Bar 1: VIDEO (gold) ──────────────────────────────────────────────────
  const videoSc = spring({
    frame: Math.max(0, frame - 14),
    fps,
    from: 0,
    to: VIDEO_FILL,
    config: { damping: 18, stiffness: 160, mass: 1 },
  });
  const videoLabelOp = fIn(frame, 36, 16);
  const videoBarW    = videoSc * BAR_MAX_W;

  // ── Bar 2: AUDIO (steel blue) ────────────────────────────────────────────
  const audioSc = spring({
    frame: Math.max(0, frame - 34),
    fps,
    from: 0,
    to: AUDIO_FILL,
    config: { damping: 18, stiffness: 160, mass: 1 },
  });
  const audioLabelOp = fIn(frame, 56, 16);
  const audioBarW    = audioSc * BAR_MAX_W;

  const LABEL_X  = 0;        // left-align category labels
  const BAR_X    = 260;      // bar starts here (after category label)
  const ROW_GAP  = 148;
  const ROW_1_Y  = -60;
  const ROW_2_Y  = ROW_1_Y + ROW_GAP;

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0 }}>

        {/* Title */}
        <div style={{
          opacity: titleOp,
          marginBottom: 52,
          alignSelf: "flex-start",
        }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: 6,
          }}>
            AUDIENCE FORGIVENESS RATE
          </span>
          <span style={{
            fontSize: 11,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}>
            HOW FORGIVING VIEWERS ARE OF POOR QUALITY
          </span>
        </div>

        {/* ── Bar chart ── */}
        <svg viewBox={`0 0 ${BAR_X + BAR_MAX_W + 120} 240`} width={BAR_X + BAR_MAX_W + 120} height={240}>

          {/* ── Row 1: VIDEO ───────────────────────────────────────────── */}
          <g transform={`translate(0, 40)`}>
            {/* Category label */}
            <text
              x={LABEL_X}
              y={BAR_H / 2 + 6}
              fontSize={15}
              fontWeight={800}
              fill={COLOR.textPrimary}
              opacity={0.75}
              fontFamily="Montserrat, sans-serif"
              letterSpacing={1}
            >
              POOR VIDEO
            </text>

            {/* Track */}
            <rect
              x={BAR_X} y={0}
              width={BAR_MAX_W} height={BAR_H}
              rx={BAR_RX}
              fill={COLOR.ringSecondary}
              opacity={TRACK_OP}
            />

            {/* Filled bar */}
            <rect
              x={BAR_X} y={0}
              width={videoBarW} height={BAR_H}
              rx={BAR_RX}
              fill={COLOR.ringSecondary}
            />

            {/* End label */}
            <g opacity={videoLabelOp}>
              <text
                x={BAR_X + videoBarW + 16}
                y={BAR_H / 2 - 4}
                fontSize={22}
                fontWeight={800}
                fill={COLOR.ringSecondary}
                fontFamily="Montserrat, sans-serif"
                dominantBaseline="middle"
              >
                HIGH
              </text>
              <text
                x={BAR_X + videoBarW + 16}
                y={BAR_H / 2 + 16}
                fontSize={11}
                fontWeight={800}
                fill={COLOR.textMuted}
                fontFamily="Montserrat, sans-serif"
                letterSpacing={1}
              >
                TOLERANCE
              </text>
            </g>
          </g>

          {/* ── Row 2: AUDIO ───────────────────────────────────────────── */}
          <g transform={`translate(0, 148)`}>
            {/* Category label */}
            <text
              x={LABEL_X}
              y={BAR_H / 2 + 6}
              fontSize={15}
              fontWeight={800}
              fill={COLOR.textPrimary}
              opacity={0.75}
              fontFamily="Montserrat, sans-serif"
              letterSpacing={1}
            >
              POOR AUDIO
            </text>

            {/* Track */}
            <rect
              x={BAR_X} y={0}
              width={BAR_MAX_W} height={BAR_H}
              rx={BAR_RX}
              fill={COLOR.ringPrimary}
              opacity={TRACK_OP}
            />

            {/* Filled bar */}
            <rect
              x={BAR_X} y={0}
              width={audioBarW} height={BAR_H}
              rx={BAR_RX}
              fill={COLOR.ringPrimary}
            />

            {/* End label */}
            <g opacity={audioLabelOp}>
              <text
                x={BAR_X + audioBarW + 16}
                y={BAR_H / 2 - 4}
                fontSize={22}
                fontWeight={800}
                fill={COLOR.ringPrimary}
                fontFamily="Montserrat, sans-serif"
                dominantBaseline="middle"
              >
                LOW
              </text>
              <text
                x={BAR_X + audioBarW + 16}
                y={BAR_H / 2 + 16}
                fontSize={11}
                fontWeight={800}
                fill={COLOR.textMuted}
                fontFamily="Montserrat, sans-serif"
                letterSpacing={1}
              >
                TOLERANCE
              </text>
            </g>
          </g>

        </svg>

        {/* Caption */}
        <div style={{ opacity: captionOp, marginTop: 36 }}>
          <span style={{
            fontSize: 15,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textMuted,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>
            VIEWERS FORGIVE BAD VISUALS. THEY WILL NOT FORGIVE BAD AUDIO.
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
