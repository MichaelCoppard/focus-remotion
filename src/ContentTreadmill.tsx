/**
 * ContentTreadmill — [1:30-2:15]
 * Cyclical loop diagram: POST → HOPE → NO LEADS → REPEAT
 * Four nodes arranged in a diamond, connected by animated arrows.
 * Nodes appear staggered; a cycling highlight shows the endless loop.
 */
import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapper } from "./GraphicWrapper";

const NODES = [
  { label: "POST",     sub: "because you feel like you have to",  x:   0, y: -170 },
  { label: "HOPE",     sub: "that it somehow moves the needle",   x:  200, y:   0 },
  { label: "NO LEADS", sub: "nothing changes",                    x:   0, y:  170 },
  { label: "REPEAT",   sub: "same cycle. more exhaustion.",       x: -200, y:   0 },
];

// Frame at which each node entrance begins
const NODE_DELAYS = [4, 18, 32, 46];

const Node: React.FC<{
  label: string;
  sub: string;
  delay: number;
  highlight: boolean;
}> = ({ label, sub, delay, highlight }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sc = spring({ frame: Math.max(0, frame - delay), fps, from: 0, to: 1, config: SPRING.bouncy });
  const scale = interpolate(sc, [0, 0.65, 1], [0.6, 1.1, 1]);
  const op    = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const isRepeat = label === "REPEAT";

  return (
    <div style={{
      opacity: op,
      transform: `scale(${scale})`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
      width: 180,
    }}>
      <div style={{
        padding: "10px 22px",
        borderRadius: 6,
        background: highlight
          ? COLOR.ringPrimary
          : isRepeat
            ? `rgba(194,164,109,0.15)`
            : "rgba(65,90,119,0.10)",
        border: `2px solid ${highlight
          ? "transparent"
          : isRepeat
            ? COLOR.ringSecondary
            : COLOR.ringPrimary}`,
      }}>
        <span style={{
          fontSize: isRepeat ? 22 : 26,
          fontWeight: FONT_WEIGHT.extraBold,
          color: highlight
            ? "#fff"
            : isRepeat
              ? COLOR.ringSecondary
              : COLOR.ringPrimary,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}>
          {label}
        </span>
      </div>
      <span style={{
        fontSize: 12,
        fontWeight: FONT_WEIGHT.extraBold,
        color: COLOR.textSecondary,
        letterSpacing: "0.04em",
        textAlign: "center",
        maxWidth: 160,
        lineHeight: 1.4,
      }}>
        {sub}
      </span>
    </div>
  );
};

// SVG arrows connecting nodes in diamond layout
const Arrows: React.FC<{ progress: number }> = ({ progress }) => {
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // Arrow paths: top→right, right→bottom, bottom→left, left→top
  const paths = [
    "M 260 80 L 340 170",   // top → right
    "M 360 220 L 280 310",  // right → bottom
    "M 240 340 L 160 250",  // bottom → left
    "M 140 200 L 220 110",  // left → top
  ];

  return (
    <svg
      width={500}
      height={420}
      style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }}
      viewBox="0 0 500 420"
    >
      {paths.map((d, i) => {
        const segStart = i * 0.2;
        const segEnd   = segStart + 0.25;
        const t = Math.min(1, Math.max(0, (progress - segStart) / (segEnd - segStart)));
        const op = easeOut(t);
        return (
          <path
            key={i}
            d={d}
            stroke={COLOR.ringPrimary}
            strokeWidth={2.5}
            strokeLinecap="round"
            fill="none"
            opacity={op * 0.5}
            markerEnd="url(#arrow)"
          />
        );
      })}
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={COLOR.ringPrimary} opacity={0.5} />
        </marker>
      </defs>
    </svg>
  );
};

export const ContentTreadmill: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  const headerOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Arrows draw in from frame 55 onward
  const arrowProgress = interpolate(frame, [55, 90], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });

  // Bottom label fades in last
  const labelOp = interpolate(frame, [80, 92], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Highlight pulses through nodes after frame 90
  const cyclePhase = ((frame - 90) / 20) % 4;
  const highlightIndex = frame >= 90 ? Math.floor(cyclePhase) % 4 : -1;

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>

        {/* Header */}
        <div style={{ opacity: headerOp, marginBottom: 32 }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            THE CONTENT TREADMILL
          </span>
        </div>

        {/* Diamond layout */}
        <div style={{ position: "relative", width: 500, height: 400 }}>

          <Arrows progress={arrowProgress} />

          {/* Top: POST */}
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)" }}>
            <Node label={NODES[0].label} sub={NODES[0].sub} delay={NODE_DELAYS[0]} highlight={highlightIndex === 0} />
          </div>
          {/* Right: HOPE */}
          <div style={{ position: "absolute", top: "50%", right: 0, transform: "translateY(-50%)" }}>
            <Node label={NODES[1].label} sub={NODES[1].sub} delay={NODE_DELAYS[1]} highlight={highlightIndex === 1} />
          </div>
          {/* Bottom: NO LEADS */}
          <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)" }}>
            <Node label={NODES[2].label} sub={NODES[2].sub} delay={NODE_DELAYS[2]} highlight={highlightIndex === 2} />
          </div>
          {/* Left: REPEAT */}
          <div style={{ position: "absolute", top: "50%", left: 0, transform: "translateY(-50%)" }}>
            <Node label={NODES[3].label} sub={NODES[3].sub} delay={NODE_DELAYS[3]} highlight={highlightIndex === 3} />
          </div>

        </div>

        {/* Bottom label */}
        <div style={{ opacity: labelOp, marginTop: 8 }}>
          <span style={{
            fontSize: 14,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.ringSecondary,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}>
            <span style={{ color: COLOR.textPrimary }}>EFFORT</span>{" UP. "}<span style={{ color: COLOR.textPrimary }}>RESULTS</span>{" FLAT. "}<span style={{ color: COLOR.textPrimary }}>SAME</span>{" SPOT."}
          </span>
        </div>

      </div>
    </GraphicWrapper>
  );
};
