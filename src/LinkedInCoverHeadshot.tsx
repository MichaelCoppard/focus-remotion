import React from "react";
import { Img, staticFile } from "remotion";
import { COLOR, BG_GRADIENT, FONT_WEIGHT } from "./brand";

export const LinkedInCoverHeadshot: React.FC = () => {
  return (
    <div
      style={{
        width: 1584,
        height: 396,
        position: "relative",
        background: BG_GRADIENT,
        overflow: "hidden",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* Headshot — right side, fades left into gradient */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 520,
          height: 396,
          overflow: "hidden",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 38%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 38%)",
        }}
      >
        <Img
          src={staticFile("profile-085.jpg")}
          style={{
            position: "absolute",
            right: 0,
            top: -20,
            height: 490,
            width: "auto",
          }}
        />
      </div>

      {/* Text block — shifted right to clear LinkedIn profile picture */}
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
            color: COLOR.textPrimary,
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
            color: "#1a3a5c",
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
            color: COLOR.textPrimary,
            maxWidth: 520,
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
