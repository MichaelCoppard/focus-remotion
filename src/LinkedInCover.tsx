import React from "react";
import { Img, staticFile } from "remotion";
import { COLOR, FONT_WEIGHT } from "./brand";

export const LinkedInCover: React.FC = () => {
  return (
    <div
      style={{
        width: 1584,
        height: 396,
        position: "relative",
        background: "#111",
        overflow: "hidden",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* Full-bleed BTS photo */}
      <Img
        src={staticFile("bts-filming.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "150%",
          objectFit: "cover",
          objectPosition: "center 15%",
          opacity: 0.65,
        }}
      />

      {/* Left gradient overlay — keeps text readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(14,22,34,0.97) 0%, rgba(14,22,34,0.88) 38%, rgba(14,22,34,0.4) 65%, transparent 100%)",
        }}
      />

      {/* Text block — shifted right to clear LinkedIn profile picture (bottom-left ~340px) */}
      <div
        style={{
          position: "absolute",
          left: 340,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {/* Name */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 82,
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          Michael Coppard
        </div>

        {/* Title */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 26,
            color: COLOR.ringSecondary,
            letterSpacing: "0.01em",
          }}
        >
          Founder of Foundry Media &amp; Keystone Strategy
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: 52,
            height: 3,
            background: COLOR.ringSecondary,
            borderRadius: 2,
            margin: "4px 0",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 22,
            color: "rgba(255,255,255,0.85)",
            maxWidth: 560,
            lineHeight: 1.4,
            letterSpacing: "0.01em",
          }}
        >
          Turning events into high-performing content libraries.
        </div>
      </div>
    </div>
  );
};
