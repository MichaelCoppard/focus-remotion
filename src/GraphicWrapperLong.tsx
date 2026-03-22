/**
 * GraphicWrapperLong — shell for long-form (5-min script) compositions.
 * Identical transitions and fade settings to GraphicWrapper.
 * Adds an optional `footnote` prop — a whispered annotation that fades in
 * after the main content has settled, positioned at the bottom of the frame.
 */
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { BG_GRADIENT, COLOR, FONT_WEIGHT, SPRING } from "./brand";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

interface Props {
  children: React.ReactNode;
  footnote?: string;
}

export const GraphicWrapperLong: React.FC<Props> = ({ children, footnote }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ── Same dissolve settings as GraphicWrapper ──────────────────────────────
  const dissolveStart = durationInFrames - 15; // 0.5s before end

  const contentOp = interpolate(
    frame,
    [dissolveStart, dissolveStart + 7],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const bgOp = interpolate(
    frame,
    [dissolveStart + 7, dissolveStart + 15],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ── Same content fade-in + spring scale as GraphicWrapper ─────────────────
  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = spring({
    frame,
    fps,
    from: 0.84,
    to: 1,
    config: SPRING.snappy,
  });

  // ── Footnote fades in after content has settled (~2s in) ─────────────────
  const footnoteOp = interpolate(frame, [55, 70], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const footnoteY = spring({
    frame: Math.max(0, frame - 55),
    fps,
    from: 8,
    to: 0,
    config: SPRING.smooth,
  });

  return (
    <AbsoluteFill
      style={{
        background: COLOR.bgCenter,
        fontFamily,
        opacity: bgOp,
      }}
    >
      {/* Gradient + content — fade out together, no blur */}
      <div style={{ position: "absolute", inset: 0, opacity: contentOp }}>

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: BG_GRADIENT,
          }}
        />

        {/* Main content — centred */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${scale})`,
            opacity: fadeIn,
          }}
        >
          {children}
        </div>

        {/* Footnote — whispered annotation at the bottom */}
        {footnote && (
          <div
            style={{
              position: "absolute",
              bottom: 220,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              opacity: footnoteOp,
              transform: `translateY(${footnoteY}px)`,
            }}
          >
            <span style={{
              fontSize: 15,
              fontWeight: FONT_WEIGHT.extraBold,
              color: COLOR.textMuted,
              letterSpacing: "0.06em",
              fontStyle: "italic",
            }}>
              — {footnote}
            </span>
          </div>
        )}

      </div>
    </AbsoluteFill>
  );
};
