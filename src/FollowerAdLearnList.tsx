import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { COLOR, FONT_WEIGHT } from "./brand";

const { fontFamily } = loadFont("normal", {
  weights: ["800"],
  subsets: ["latin"],
});

// Static 1080 × 1080 (1:1) — steel blue, 4 value bullets
// Answers: what will you learn? Render with: npm run render:png:follower-learn-list

export const FollowerAdLearnList: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLOR.ringPrimary,
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
        {/* Pre-label */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 22,
            color: COLOR.ringSecondary,
            letterSpacing: 3.5,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Follow to learn
        </div>

        {/* Headline */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 62,
            lineHeight: 1.1,
            color: "#ffffff",
            marginBottom: 52,
          }}
        >
          Video that works<br />for your business.
        </div>

        {/* Value bullets */}
        {[
          "One-take on-camera delivery",
          "Lighting that signals expertise",
          "Audio that builds instant trust",
          "Systems that cut your filming time",
        ].map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginBottom: 22,
            }}
          >
            <span
              style={{
                fontWeight: FONT_WEIGHT.extraBold,
                fontSize: 36,
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
                fontSize: 36,
                color: "#ffffff",
                lineHeight: 1.2,
              }}
            >
              {item}
            </span>
          </div>
        ))}

        {/* Gold divider */}
        <div
          style={{
            width: 72,
            height: 4,
            backgroundColor: COLOR.ringSecondary,
            marginTop: 40,
            marginBottom: 28,
          }}
        />

        {/* Name */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 24,
            color: "rgba(255,255,255,0.45)",
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
