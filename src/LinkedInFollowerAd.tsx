import React from "react";
import { Img, staticFile } from "remotion";
import { BG_GRADIENT, COLOR, FONT_WEIGHT } from "./brand";

export const LinkedInFollowerAd: React.FC = () => {
  const font = "'Montserrat', sans-serif";

  return (
    <div
      style={{
        width: 1200,
        height: 628,
        position: "relative",
        overflow: "hidden",
        fontFamily: font,
        background: BG_GRADIENT,
      }}
    >
      {/* ── Headshot — right side ─────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 520,
          height: 628,
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile("profile-085.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
        {/* Fade left edge of photo into the background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, #222222 0%, rgba(34,34,34,0.75) 28%, transparent 58%)",
          }}
        />
        {/* Subtle bottom fade to keep composition grounded */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(20,20,20,0.55) 0%, transparent 35%)",
          }}
        />
      </div>

      {/* ── Left readability overlay ──────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(14,20,30,0.94) 0%, rgba(14,20,30,0.86) 42%, rgba(14,20,30,0.22) 68%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Copy block ────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: 64,
          top: 0,
          height: 628,
          width: 560,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Brand tag */}
        <div
          style={{
            fontSize: 12,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringPrimary,
            letterSpacing: "0.16em",
            marginBottom: 22,
            opacity: 0.85,
          }}
        >
          FOUNDRY MEDIA
        </div>

        {/* Hero line 1 */}
        <div
          style={{
            fontSize: 88,
            fontWeight: FONT_WEIGHT.extraBold,
            color: "#ffffff",
            lineHeight: 0.93,
            letterSpacing: "-0.025em",
          }}
        >
          STOP
        </div>

        {/* Hero line 2 */}
        <div
          style={{
            fontSize: 88,
            fontWeight: FONT_WEIGHT.extraBold,
            color: "#ffffff",
            lineHeight: 0.93,
            letterSpacing: "-0.025em",
          }}
        >
          CHASING
        </div>

        {/* Hero line 3 — gold payoff */}
        <div
          style={{
            fontSize: 88,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringSecondary,
            lineHeight: 0.93,
            letterSpacing: "-0.025em",
            marginBottom: 24,
          }}
        >
          CLIENTS.
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: 52,
            height: 3,
            background: COLOR.ringSecondary,
            borderRadius: 2,
            marginBottom: 18,
          }}
        />

        {/* Sub-line */}
        <div
          style={{
            fontSize: 20,
            fontWeight: FONT_WEIGHT.extraBold,
            color: "rgba(255,255,255,0.92)",
            lineHeight: 1.4,
            letterSpacing: "0.005em",
            marginBottom: 11,
          }}
        >
          Use video to attract them instead.
        </div>

        {/* Body copy */}
        <div
          style={{
            fontSize: 15,
            fontWeight: FONT_WEIGHT.extraBold,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.7,
            letterSpacing: "0.01em",
            marginBottom: 28,
            maxWidth: 460,
          }}
        >
          Follow for weekly strategy on using video to generate
          <br />
          leads and attract the right clients on LinkedIn.
        </div>

        {/* CTA button */}
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: COLOR.ringSecondary,
              color: "#1D1D1F",
              borderRadius: 32,
              padding: "13px 28px",
              fontSize: 13,
              fontWeight: FONT_WEIGHT.extraBold,
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
            }}
          >
            FOLLOW FOUNDRY MEDIA →
          </div>
        </div>
      </div>
    </div>
  );
};
