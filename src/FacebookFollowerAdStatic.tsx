import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { BG_GRADIENT, COLOR, FONT_WEIGHT } from "./brand";

const { fontFamily } = loadFont("normal", {
  weights: ["800"],
  subsets: ["latin"],
});

// Static 1080 × 1350 (4:5) Facebook feed image ad.
// Render with: npm run render:png:fb-follower

export const FacebookFollowerAdStatic: React.FC = () => {
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
        {/* ── Headline ───────────────────────────────────────────────────── */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 108,
            lineHeight: 1.08,
            color: COLOR.textPrimary,
            marginBottom: 48,
          }}
        >
          One take.<br />Real authority.
        </div>

        {/* ── Gold divider ───────────────────────────────────────────────── */}
        <div
          style={{
            width: 88,
            height: 5,
            backgroundColor: COLOR.ringSecondary,
            marginBottom: 48,
          }}
        />

        {/* ── Sub-copy ───────────────────────────────────────────────────── */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 46,
            lineHeight: 1.45,
            color: COLOR.textMuted,
            marginBottom: 88,
            maxWidth: 900,
          }}
        >
          Video tips for business owners<br />who'd rather grow than edit.
        </div>

        {/* ── CTA pill ───────────────────────────────────────────────────── */}
        <div
          style={{
            backgroundColor: COLOR.ringPrimary,
            borderRadius: 72,
            paddingTop: 32,
            paddingBottom: 32,
            paddingLeft: 72,
            paddingRight: 72,
            marginBottom: 88,
          }}
        >
          <span
            style={{
              fontWeight: FONT_WEIGHT.extraBold,
              fontSize: 44,
              color: "#ffffff",
              letterSpacing: 0.5,
            }}
          >
            Follow for weekly insights
          </span>
        </div>

        {/* ── Page name ──────────────────────────────────────────────────── */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 30,
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
