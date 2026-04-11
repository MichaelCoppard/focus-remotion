import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapper } from "./GraphicWrapper";

// Dynamic 1080 × 1080 (1:1) — two-phase content: stat/pain → resolution/CTA
// Phase 1 (frames 0–80): the cost of the status quo
// Phase 2 (frames 88–166): the alternative — follow CTA
// GraphicWrapper handles scale-in and no-banding dissolve out
// Render with: npm run render:prores:follower-stat-punch

export const FollowerAdStatPunch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Phase 1: enter then fade out ──────────────────────────────────────
  const phase1Op = interpolate(frame, [0, 8, 65, 80], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase1Y = interpolate(frame, [65, 80], [0, -28], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stat number bounces in within phase 1
  const statScale = spring({ frame, fps, config: SPRING.bouncy, from: 0.6, to: 1 });

  // ── Phase 2: enter ───────────────────────────────────────────────────
  const phase2Op = interpolate(frame, [85, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase2Y = interpolate(frame, [85, 100], [28, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Staggered reveals within phase 2 (relative to phase 2 start at frame 85)
  const p2Frame = Math.max(0, frame - 88);
  const p2DividerScale = spring({ frame: p2Frame,                              fps, config: SPRING.snappy, from: 0, to: 1 });
  const p2CtaOpacity   = spring({ frame: Math.max(0, p2Frame - 18),            fps, config: SPRING.bouncy, from: 0, to: 1 });
  const p2CtaY         = spring({ frame: Math.max(0, p2Frame - 18),            fps, config: SPRING.bouncy, from: 20, to: 0 });
  const p2NameOpacity  = interpolate(p2Frame, [34, 48], [0, 1], {
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
          position: "relative",
        }}
      >

        {/* ════════════════════════════════════════════════════════════════
            Phase 1: The cost stat
        ════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: phase1Op,
            transform: `translateY(${phase1Y}px)`,
            width: "100%",
          }}
        >
          {/* Big number */}
          <div
            style={{
              fontWeight: FONT_WEIGHT.extraBold,
              fontSize: 220,
              lineHeight: 1,
              color: COLOR.textAccent,
              transform: `scale(${statScale})`,
              letterSpacing: -4,
            }}
          >
            20×
          </div>

          {/* Stat label */}
          <div
            style={{
              fontWeight: FONT_WEIGHT.extraBold,
              fontSize: 44,
              lineHeight: 1.3,
              color: COLOR.textPrimary,
              marginBottom: 28,
            }}
          >
            more takes than necessary
          </div>

          {/* Gold divider */}
          <div
            style={{
              width: 72,
              height: 4,
              backgroundColor: COLOR.ringSecondary,
              marginBottom: 28,
            }}
          />

          {/* Subline */}
          <div
            style={{
              fontWeight: FONT_WEIGHT.extraBold,
              fontSize: 36,
              lineHeight: 1.45,
              color: COLOR.textMuted,
              maxWidth: 820,
            }}
          >
            Business owners film too much.<br />Ship too little.
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            Phase 2: The resolution — follow CTA
        ════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: phase2Op,
            transform: `translateY(${phase2Y}px)`,
            width: "100%",
          }}
        >
          {/* Resolution headline */}
          <div
            style={{
              fontWeight: FONT_WEIGHT.extraBold,
              fontSize: 96,
              lineHeight: 1.06,
              color: COLOR.textPrimary,
              marginBottom: 20,
            }}
          >
            There's a<br />better system.
          </div>

          {/* Gold divider */}
          <div
            style={{
              width: 88,
              height: 5,
              backgroundColor: COLOR.ringSecondary,
              transform: `scaleX(${p2DividerScale})`,
              transformOrigin: "center",
              marginBottom: 48,
            }}
          />

          {/* CTA pill */}
          <div
            style={{
              opacity: p2CtaOpacity,
              transform: `translateY(${p2CtaY}px)`,
              backgroundColor: COLOR.ringPrimary,
              borderRadius: 72,
              paddingTop: 32,
              paddingBottom: 32,
              paddingLeft: 72,
              paddingRight: 72,
              marginBottom: 64,
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
              Follow for the 1-take method
            </span>
          </div>

          {/* Name badge */}
          <div
            style={{
              fontWeight: FONT_WEIGHT.extraBold,
              fontSize: 28,
              color: COLOR.textSecondary,
              opacity: p2NameOpacity,
              letterSpacing: 2.5,
              textTransform: "uppercase",
            }}
          >
            Michael Coppard — Video Strategist
          </div>
        </div>

      </div>
    </GraphicWrapper>
  );
};
