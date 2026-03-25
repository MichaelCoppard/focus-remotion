/**
 * OperatingManual — [1:30-2:15]
 * Brainstorm / node diagram.
 * Central hub "AUTHORITY ENGINE" with 4 radiating spokes.
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

const SPOKES = [
  { label: "DIAGNOSE FRICTION",        sub: "Find what's costing you authority",  angle: -120 },
  { label: "EXPERTISE → IP",           sub: "Turn knowledge into assets that work for you",  angle: -60  },
  { label: "BUILD TRUST FIRST",        sub: "Before you ever hop on a discovery call", angle:  60  },
  { label: "RECLAIM YOUR TIME",        sub: "Stop posting. Start engineering.",    angle:  120 },
];

const SPOKE_DELAYS = [20, 32, 44, 56];
const HUB_R = 90;
const SPOKE_LEN = 170;

const toRad = (deg: number) => (deg * Math.PI) / 180;

const Spoke: React.FC<{
  label: string;
  sub: string;
  angle: number;
  delay: number;
}> = ({ label, sub, angle, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sc = spring({ frame: Math.max(0, frame - delay), fps, from: 0, to: 1, config: SPRING.smooth });
  const op = interpolate(frame, [delay, delay + 12], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const rad = toRad(angle);
  const endX = Math.cos(rad) * SPOKE_LEN;
  const endY = Math.sin(rad) * SPOKE_LEN;

  // Line length animates from 0 to full
  const lineLen = sc * SPOKE_LEN;
  const lineEndX = Math.cos(rad) * (HUB_R + lineLen);
  const lineEndY = Math.sin(rad) * (HUB_R + lineLen);
  const lineStartX = Math.cos(rad) * HUB_R;
  const lineStartY = Math.sin(rad) * HUB_R;

  // Node position (fixed)
  const nodeX = Math.cos(rad) * (HUB_R + SPOKE_LEN);
  const nodeY = Math.sin(rad) * (HUB_R + SPOKE_LEN);

  // Text align based on which side
  const isLeft = angle < 0;

  return (
    <g opacity={op}>
      {/* Spoke line */}
      <line
        x1={lineStartX}
        y1={lineStartY}
        x2={lineEndX}
        y2={lineEndY}
        stroke={COLOR.ringPrimary}
        strokeWidth={1.5}
        strokeDasharray="4 3"
        opacity={0.4}
      />
      {/* Node dot */}
      <circle
        cx={nodeX}
        cy={nodeY}
        r={5}
        fill={COLOR.ringSecondary}
        opacity={sc}
      />
      {/* Label */}
      <text
        x={nodeX + (isLeft ? -18 : 18)}
        y={nodeY - 8}
        textAnchor={isLeft ? "end" : "start"}
        style={{
          fontSize: 16,
          fontWeight: FONT_WEIGHT.extraBold,
          fill: COLOR.ringPrimary,
          letterSpacing: "0.06em",
          fontFamily: "inherit",
        } as React.CSSProperties}
      >
        {label}
      </text>
      <text
        x={nodeX + (isLeft ? -18 : 18)}
        y={nodeY + 14}
        textAnchor={isLeft ? "end" : "start"}
        style={{
          fontSize: 12,
          fontWeight: FONT_WEIGHT.extraBold,
          fill: COLOR.textMuted,
          letterSpacing: "0.03em",
          fontFamily: "inherit",
        } as React.CSSProperties}
      >
        {sub}
      </text>
    </g>
  );
};

export const OperatingManual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // Hub springs in
  const hubSpring = spring({ frame, fps, from: 0, to: 1, config: SPRING.bouncy });
  const hubScale  = interpolate(hubSpring, [0, 0.65, 1], [0.5, 1.1, 1]);
  const hubOp     = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  // Hub ring grows
  const ringR = interpolate(frame, [2, 14], [0, HUB_R], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });

  // Header
  const headerOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>

        {/* Header */}
        <div style={{ opacity: headerOp, marginBottom: 16 }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            THIS PAGE — AN OPERATING MANUAL
          </span>
        </div>

        {/* SVG canvas for hub + spokes */}
        <svg
          width={780}
          height={540}
          viewBox="-390 -270 780 540"
          style={{ overflow: "visible" }}
        >
          {/* Hub ring */}
          <circle
            cx={0} cy={0}
            r={ringR}
            fill="rgba(65,90,119,0.08)"
            stroke={COLOR.ringPrimary}
            strokeWidth={2}
            opacity={0.6}
          />

          {/* Hub label */}
          <g opacity={hubOp} transform={`scale(${hubScale})`}>
            <text
              x={0} y={-10}
              textAnchor="middle"
              style={{
                fontSize: 18,
                fontWeight: FONT_WEIGHT.extraBold,
                fill: COLOR.ringPrimary,
                letterSpacing: "0.08em",
                fontFamily: "inherit",
              } as React.CSSProperties}
            >
              AUTHORITY
            </text>
            <text
              x={0} y={14}
              textAnchor="middle"
              style={{
                fontSize: 18,
                fontWeight: FONT_WEIGHT.extraBold,
                fill: COLOR.ringPrimary,
                letterSpacing: "0.08em",
                fontFamily: "inherit",
              } as React.CSSProperties}
            >
              ENGINE
            </text>
          </g>

          {/* Spokes */}
          {SPOKES.map((s, i) => (
            <Spoke
              key={i}
              label={s.label}
              sub={s.sub}
              angle={s.angle}
              delay={SPOKE_DELAYS[i]}
            />
          ))}
        </svg>

      </div>
    </GraphicWrapper>
  );
};
