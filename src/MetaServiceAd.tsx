import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { BG_GRADIENT, COLOR, FONT_WEIGHT } from "./brand";

const { fontFamily } = loadFont("normal", {
  weights: ["800"],
  subsets: ["latin"],
});

// Static 1080 × 1350 (4:5) Meta feed image ad.
// Corporate brand video services — London & South East England.
// Render with: npm run render:png:meta-service-ad

export const MetaServiceAd: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: BG_GRADIENT,
        fontFamily,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 72px",
          width: 1080,
        }}
      >
        {/* ── Page name ──────────────────────────────────────────────────────── */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 28,
            color: COLOR.ringSecondary,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Michael Coppard
        </div>
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 20,
            color: COLOR.textSecondary,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 80,
          }}
        >
          Video Strategist
        </div>

        {/* ── Headline ───────────────────────────────────────────────────────── */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 96,
            lineHeight: 1.08,
            color: COLOR.textPrimary,
            marginBottom: 52,
          }}
        >
          Your business deserves a video that wins clients.
        </div>

        {/* ── Gold divider ───────────────────────────────────────────────────── */}
        <div
          style={{
            width: 88,
            height: 5,
            backgroundColor: COLOR.ringSecondary,
            marginBottom: 52,
          }}
        />

        {/* ── Sub-copy ───────────────────────────────────────────────────────── */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 40,
            lineHeight: 1.5,
            color: COLOR.textMuted,
            marginBottom: 88,
            maxWidth: 880,
          }}
        >
          Corporate brand videos for businesses<br />
          across London & South East England.
        </div>

        {/* ── CTA pill ───────────────────────────────────────────────────────── */}
        <div
          style={{
            backgroundColor: COLOR.ringPrimary,
            borderRadius: 72,
            paddingTop: 32,
            paddingBottom: 32,
            paddingLeft: 72,
            paddingRight: 72,
          }}
        >
          <span
            style={{
              fontWeight: FONT_WEIGHT.extraBold,
              fontSize: 40,
              color: "#ffffff",
              letterSpacing: 0.5,
            }}
          >
            Book a Free Discovery Call
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
