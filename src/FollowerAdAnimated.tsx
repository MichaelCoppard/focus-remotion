import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapper } from "./GraphicWrapper";

// Dynamic 1080 × 1350 (4:5) — staggered text reveal, pain-to-CTA flow
// GraphicWrapper handles spring scale-in and no-banding dissolve
// Render with: npm run render:prores:follower-animated

export const FollowerAdAnimated: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Staggered reveals ─────────────────────────────────────────────────
  const h1Opacity = spring({ frame,                          fps, config: SPRING.bouncy, from: 0, to: 1 });
  const h1Y       = spring({ frame,                          fps, config: SPRING.bouncy, from: 20, to: 0 });

  const h2Opacity = spring({ frame: Math.max(0, frame - 10), fps, config: SPRING.bouncy, from: 0, to: 1 });
  const h2Y       = spring({ frame: Math.max(0, frame - 10), fps, config: SPRING.bouncy, from: 20, to: 0 });

  const dividerScale = spring({ frame: Math.max(0, frame - 22), fps, config: SPRING.snappy, from: 0, to: 1 });

  const sub1Opacity = spring({ frame: Math.max(0, frame - 34), fps, config: SPRING.smooth, from: 0, to: 1 });
  const sub1Y       = spring({ frame: Math.max(0, frame - 34), fps, config: SPRING.smooth, from: 14, to: 0 });

  const sub2Opacity = spring({ frame: Math.max(0, frame - 44), fps, config: SPRING.smooth, from: 0, to: 1 });
  const sub2Y       = spring({ frame: Math.max(0, frame - 44), fps, config: SPRING.smooth, from: 14, to: 0 });

  const ctaOpacity = spring({ frame: Math.max(0, frame - 58), fps, config: SPRING.bouncy, from: 0, to: 1 });
  const ctaY       = spring({ frame: Math.max(0, frame - 58), fps, config: SPRING.bouncy, from: 22, to: 0 });

  const nameOpacity = interpolate(frame, [75, 88], [0, 1], {
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
          padding: "0 80px",
          width: 1080,
        }}
      >
        {/* ── Headline — pain hook ────────────────────────────────────────── */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 100,
            lineHeight: 1.06,
            color: COLOR.textPrimary,
            opacity: h1Opacity,
            transform: `translateY(${h1Y}px)`,
          }}
        >
          Your clients
        </div>
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 100,
            lineHeight: 1.06,
            color: COLOR.textAccent,
            opacity: h2Opacity,
            transform: `translateY(${h2Y}px)`,
            marginBottom: 52,
          }}
        >
          judge your video.
        </div>

        {/* ── Gold divider ────────────────────────────────────────────────── */}
        <div
          style={{
            width: 88,
            height: 5,
            backgroundColor: COLOR.ringSecondary,
            transform: `scaleX(${dividerScale})`,
            transformOrigin: "center",
            marginBottom: 52,
          }}
        />

        {/* ── Sub-copy ────────────────────────────────────────────────────── */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 44,
            lineHeight: 1.5,
            color: COLOR.textMuted,
            opacity: sub1Opacity,
            transform: `translateY(${sub1Y}px)`,
            maxWidth: 880,
          }}
        >
          Before they read your bio.
        </div>
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 44,
            lineHeight: 1.5,
            color: COLOR.textMuted,
            opacity: sub2Opacity,
            transform: `translateY(${sub2Y}px)`,
            marginBottom: 80,
            maxWidth: 880,
          }}
        >
          Before they book a call.
        </div>

        {/* ── CTA pill ────────────────────────────────────────────────────── */}
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
            marginBottom: 80,
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
            Follow to fix that
          </span>
        </div>

        {/* ── Name badge ──────────────────────────────────────────────────── */}
        <div
          style={{
            fontWeight: FONT_WEIGHT.extraBold,
            fontSize: 28,
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
