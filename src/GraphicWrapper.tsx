/**
 * GraphicWrapper — shared shell for every composition.
 * Handles: brand background, font, spring scale-in, opacity dissolve-out.
 *
 * Banding fix: no blur is used. Instead, gradient + content fade out together
 * via opacity. Once they're gone the flat background clears over 8 frames,
 * leaving a fully transparent frame — no blur, no banding artefacts.
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
import { BG_GRADIENT, COLOR, SPRING } from "./brand";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

export const GraphicWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Dissolve starts 0.5s before end
  const dissolveStart = durationInFrames - 15;

  // ── Gradient + content fade out together ─────────────────────────────────
  const contentOp = interpolate(
    frame,
    [dissolveStart, dissolveStart + 7],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ── Flat background clears over 8 frames after content is gone ───────────
  const bgOp = interpolate(
    frame,
    [dissolveStart + 7, dissolveStart + 15],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ── Content fade-in + spring scale ───────────────────────────────────────
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

        {/* Content */}
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

      </div>
    </AbsoluteFill>
  );
};
