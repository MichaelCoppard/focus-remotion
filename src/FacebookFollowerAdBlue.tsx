import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { COLOR, FONT_WEIGHT } from "./brand";

const { fontFamily } = loadFont("normal", {
  weights: ["800"],
  subsets: ["latin"],
});

// Static 1080 × 1080 (1:1) — steel blue background variant
// Render with: npm run render:png:fb-follower-blue

export const FacebookFollowerAdBlue: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: COLOR.ringPrimary,
        fontFamily,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {/* ── Headline ───────────────────────────────────────────────────── */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 58,
            lineHeight: 1.15,
            color: "#ffffff",
            marginBottom: 52,
          }}
        >
          Follow and get<br />weekly tips on:
        </div>

        {/* ── Bullets ────────────────────────────────────────────────────── */}
        {[
          "Lighting & audio that builds trust",
          "One-take delivery systems",
          "Video that attracts clients",
          "Authority without the budget",
        ].map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginBottom: 28,
            }}
          >
            <span
              style={{
                fontWeight: FONT_WEIGHT.extraBold,
                fontSize: 42,
                color: COLOR.ringSecondary,
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              →
            </span>
            <span
              style={{
                fontWeight: FONT_WEIGHT.extraBold,
                fontSize: 42,
                color: "#ffffff",
                lineHeight: 1.2,
              }}
            >
              {item}
            </span>
          </div>
        ))}

        {/* ── Gold divider ───────────────────────────────────────────────── */}
        <div
          style={{
            width: 72,
            height: 4,
            backgroundColor: COLOR.ringSecondary,
            marginTop: 44,
            marginBottom: 36,
          }}
        />

        {/* ── Page name ──────────────────────────────────────────────────── */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 26,
            color: "rgba(255,255,255,0.5)",
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
