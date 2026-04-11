import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapper } from "./GraphicWrapper";

// 1080 × 1350  (4:5 Facebook feed)
// 180 frames @ 30fps = 6 seconds

export const FacebookFollowerAd: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Staggered element reveals ─────────────────────────────────────────────
  const headlineOpacity = spring({ frame,                          fps, config: SPRING.bouncy, from: 0, to: 1 });
  const headlineY       = spring({ frame,                          fps, config: SPRING.bouncy, from: 18, to: 0 });

  const dividerScale    = spring({ frame: Math.max(0, frame - 14), fps, config: SPRING.snappy, from: 0, to: 1 });

  const subCopyOpacity  = spring({ frame: Math.max(0, frame - 22), fps, config: SPRING.smooth, from: 0, to: 1 });
  const subCopyY        = spring({ frame: Math.max(0, frame - 22), fps, config: SPRING.smooth, from: 14, to: 0 });

  const ctaOpacity      = spring({ frame: Math.max(0, frame - 36), fps, config: SPRING.bouncy, from: 0, to: 1 });
  const ctaY            = spring({ frame: Math.max(0, frame - 36), fps, config: SPRING.bouncy, from: 20, to: 0 });

  const nameOpacity     = interpolate(frame, [50, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <GraphicWrapper>
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
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
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
            transform: `scaleX(${dividerScale})`,
            transformOrigin: "center",
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
            opacity: subCopyOpacity,
            transform: `translateY(${subCopyY}px)`,
            marginBottom: 88,
            maxWidth: 900,
          }}
        >
          Video tips for business owners<br />who'd rather grow than edit.
        </div>

        {/* ── CTA pill ───────────────────────────────────────────────────── */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px)`,
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
            opacity: nameOpacity,
            letterSpacing: 2.5,
            textTransform: "uppercase",
          }}
        >
          Michael Coppard — Video Strategist
        </div>
      </div>
    </GraphicWrapper>
  );
};
