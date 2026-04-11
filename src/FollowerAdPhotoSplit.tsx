import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { COLOR, FONT_WEIGHT } from "./brand";

const { fontFamily } = loadFont("normal", {
  weights: ["800"],
  subsets: ["latin"],
});

// Static 1080 × 1350 (4:5) — steel blue left / photo right split
// Render with: npm run render:png:follower-photo-split

export const FollowerAdPhotoSplit: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily, display: "flex", flexDirection: "row" }}>

      {/* ── Left panel: steel blue, all text ─────────────────────────────── */}
      <div
        style={{
          width: 556,
          backgroundColor: COLOR.ringPrimary,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 52px 72px 68px",
        }}
      >
        {/* Headline */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 76,
            lineHeight: 1.06,
            color: "#ffffff",
            marginBottom: 40,
          }}
        >
          Video<br />that<br />builds<br />authority.
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: 60,
            height: 5,
            backgroundColor: COLOR.ringSecondary,
            marginBottom: 36,
          }}
        />

        {/* Value bullets */}
        {[
          "One-take delivery",
          "Lighting that converts",
          "Audio that builds trust",
          "Systems over perfection",
        ].map((item) => (
          <div
            key={item}
            style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}
          >
            <span
              style={{
                fontWeight: FONT_WEIGHT.extraBold,
                fontSize: 28,
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
                fontSize: 28,
                color: "rgba(255,255,255,0.78)",
                lineHeight: 1.25,
              }}
            >
              {item}
            </span>
          </div>
        ))}

        {/* CTA pill — white/reversed on blue bg */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 52,
            paddingTop: 22,
            paddingBottom: 22,
            paddingLeft: 44,
            paddingRight: 44,
            alignSelf: "flex-start",
            marginTop: 44,
            marginBottom: 28,
          }}
        >
          <span
            style={{
              fontWeight: FONT_WEIGHT.extraBold,
              fontSize: 30,
              color: COLOR.ringPrimary,
              letterSpacing: 0.5,
            }}
          >
            Follow
          </span>
        </div>

        {/* Name badge */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 18,
            color: "rgba(255,255,255,0.38)",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Michael Coppard
        </div>
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 15,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: 1.5,
            textTransform: "uppercase",
            marginTop: 5,
          }}
        >
          Video Strategist
        </div>
      </div>

      {/* ── Right panel: white bg, photo fills ───────────────────────────── */}
      <div style={{ flex: 1, backgroundColor: "#ffffff", overflow: "hidden" }}>
        <Img
          src={staticFile("profile-043.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 15%",
          }}
        />
      </div>

    </AbsoluteFill>
  );
};
