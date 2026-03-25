/**
 * AssetVsPost — [0:45-1:30]
 * Two-column comparison: SOCIAL MEDIA POST (dimmed) vs OPERATIONAL ASSET (gold).
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

const LEFT_ITEMS  = ["Disappears in 24h", "Feeds the algorithm", "Requires your energy", "Measured in likes"];
const RIGHT_ITEMS = ["Works while you sleep", "Qualifies your leads", "Runs without you", "Measured in conversions"];

const ITEM_DELAYS = [30, 42, 54, 66];

const Column: React.FC<{
  title: string;
  items: string[];
  primary: boolean;
  headerDelay: number;
}> = ({ title, items, primary, headerDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSc = spring({ frame: Math.max(0, frame - headerDelay), fps, from: 0, to: 1, config: SPRING.bouncy });
  const headerScale = interpolate(headerSc, [0, 0.65, 1], [0.7, 1.06, 1]);
  const headerOp    = interpolate(frame, [headerDelay, headerDelay + 10], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, width: 340 }}>

      {/* Column title */}
      <div style={{ opacity: headerOp, transform: `scale(${headerScale})`, textAlign: "center" }}>
        <span style={{
          fontSize: primary ? 28 : 22,
          fontWeight: FONT_WEIGHT.extraBold,
          color: primary ? COLOR.ringSecondary : COLOR.ringPrimary,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          opacity: primary ? 1 : 0.45,
          display: "block",
        }}>
          {title}
        </span>
      </div>

      {/* Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
        {items.map((item, i) => {
          const d = ITEM_DELAYS[i];
          const rowOp = interpolate(frame, [d, d + 12], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });
          const rowX = spring({ frame: Math.max(0, frame - d), fps, from: primary ? 20 : -20, to: 0, config: SPRING.smooth });

          return (
            <div
              key={i}
              style={{
                opacity: rowOp * (primary ? 1 : 0.45),
                transform: `translateX(${rowX}px)`,
                display: "flex",
                alignItems: "center",
                gap: 10,
                justifyContent: primary ? "flex-start" : "flex-end",
              }}
            >
              {!primary && (
                <span style={{
                  fontSize: 16,
                  fontWeight: FONT_WEIGHT.extraBold,
                  color: COLOR.textMuted,
                  letterSpacing: "0.02em",
                  textAlign: "right",
                }}>
                  {item}
                </span>
              )}
              <span style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: primary ? COLOR.ringSecondary : COLOR.ringPrimary,
                flexShrink: 0,
                opacity: primary ? 0.9 : 0.4,
              }} />
              {primary && (
                <span style={{
                  fontSize: 16,
                  fontWeight: FONT_WEIGHT.extraBold,
                  color: COLOR.textPrimary,
                  letterSpacing: "0.02em",
                }}>
                  {item}
                </span>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export const AssetVsPost: React.FC = () => {
  const frame = useCurrentFrame();

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  const headerOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Divider grows
  const divH = interpolate(frame, [10, 26], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut,
  });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>

        {/* Header */}
        <div style={{ opacity: headerOp }}>
          <span style={{
            fontSize: 13,
            fontWeight: FONT_WEIGHT.extraBold,
            color: COLOR.textSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            THE DIFFERENCE
          </span>
        </div>

        {/* Columns */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>

          {/* Left: Social Media Post (dimmed) */}
          <Column title="Social Media Post" items={LEFT_ITEMS} primary={false} headerDelay={4} />

          {/* Divider */}
          <div style={{
            width: 2,
            height: 220,
            background: "rgba(29,29,31,0.12)",
            margin: "0 36px",
            transform: `scaleY(${divH})`,
            transformOrigin: "top center",
            borderRadius: 1,
            alignSelf: "center",
          }} />

          {/* Right: Operational Asset (gold) */}
          <Column title="Operational Asset" items={RIGHT_ITEMS} primary={true} headerDelay={14} />

        </div>

      </div>
    </GraphicWrapper>
  );
};
