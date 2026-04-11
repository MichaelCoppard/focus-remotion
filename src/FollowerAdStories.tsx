import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { BG_GRADIENT, COLOR, FONT_WEIGHT } from "./brand";

const { fontFamily } = loadFont("normal", {
  weights: ["800"],
  subsets: ["latin"],
});

// Static 1080 × 1920 (9:16) — portrait-dominant, photo top, text panel below
// Photo 085 (blazer) for authority weight in portrait format
// Render with: npm run render:png:follower-stories

export const FollowerAdStories: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily }}>

      {/* ── Photo — top 62% of frame ──────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1192,
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile("profile-085.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 10%",
          }}
        />
        {/* Fade-to-panel gradient at bottom of photo */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 280,
            background: `linear-gradient(to bottom, transparent, ${COLOR.bgCenter})`,
          }}
        />
      </div>

      {/* ── Text panel — bottom portion ───────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 800,
          background: BG_GRADIENT,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 88px 100px",
          textAlign: "center",
        }}
      >
        {/* Headline */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 100,
            lineHeight: 1.06,
            color: COLOR.textPrimary,
            marginBottom: 24,
          }}
        >
          One take.<br />Real authority.
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: 80,
            height: 5,
            backgroundColor: COLOR.ringSecondary,
            marginBottom: 32,
          }}
        />

        {/* Sub-copy */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 38,
            lineHeight: 1.5,
            color: COLOR.textMuted,
            maxWidth: 860,
            marginBottom: 52,
          }}
        >
          Weekly video tips for business owners<br />
          who want authority — not just views.
        </div>

        {/* CTA pill */}
        <div
          style={{
            backgroundColor: COLOR.ringPrimary,
            borderRadius: 72,
            paddingTop: 32,
            paddingBottom: 32,
            paddingLeft: 72,
            paddingRight: 72,
            marginBottom: 44,
          }}
        >
          <span
            style={{
              fontWeight: FONT_WEIGHT.extraBold,
              fontSize: 42,
              color: "#ffffff",
              letterSpacing: 0.5,
            }}
          >
            Follow for weekly insights
          </span>
        </div>

        {/* Name badge */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 24,
            color: COLOR.textSecondary,
            letterSpacing: 2.5,
            textTransform: "uppercase",
          }}
        >
          Michael Coppard — Video Strategist
        </div>
      </div>

    </AbsoluteFill>
  );
};
