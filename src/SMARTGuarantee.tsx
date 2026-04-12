/**
 * SMARTGuarantee — Script 14: Event Testimonials
 * "SMART" hero word at top — each letter lights gold as its row appears.
 */
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT_WEIGHT, SPRING } from "./brand";
import { GraphicWrapper } from "./GraphicWrapper";

const SMART = [
  { letter: "S", word: "SPECIFIC" },
  { letter: "M", word: "MEASURABLE" },
  { letter: "A", word: "ACHIEVABLE" },
  { letter: "R", word: "REALISTIC" },
  { letter: "T", word: "TIMEBOUND" },
];

const ROW_DELAYS = [18, 42, 66, 90, 114];

// Letter in the hero word — dims to steel blue, then lights to gold
const HeroLetter: React.FC<{ letter: string; rowDelay: number }> = ({ letter, rowDelay }) => {
  const frame = useCurrentFrame();
  // 0 = steel-blue dim, 1 = gold lit
  const lit = interpolate(frame, [rowDelay, rowDelay + 14], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <span style={{ position: "relative", display: "inline-block", width: 72, textAlign: "center" }}>
      {/* Dim base */}
      <span style={{
        fontSize:   88,
        fontWeight: FONT_WEIGHT.extraBold,
        color:      COLOR.ringPrimary,
        opacity:    0.22,
        lineHeight: 1,
      }}>
        {letter}
      </span>
      {/* Gold overlay */}
      <span style={{
        position:   "absolute",
        inset:      0,
        fontSize:   88,
        fontWeight: FONT_WEIGHT.extraBold,
        color:      COLOR.ringSecondary,
        opacity:    lit,
        lineHeight: 1,
        textAlign:  "center",
      }}>
        {letter}
      </span>
    </span>
  );
};

const SmartRow: React.FC<{ item: typeof SMART[number]; delay: number }> = ({ item, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideX = spring({
    frame: Math.max(0, frame - delay),
    fps,
    from: -40,
    to: 0,
    config: SPRING.smooth,
  });
  const rowOp = interpolate(frame, [delay, delay + 14], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <div style={{
      display:    "flex",
      alignItems: "center",
      gap:        24,
      opacity:    rowOp,
      transform:  `translateX(${slideX}px)`,
    }}>
      {/* Lit letter accent (small, left) */}
      <span style={{
        fontSize:   28,
        fontWeight: FONT_WEIGHT.extraBold,
        color:      COLOR.ringSecondary,
        lineHeight: 1,
        minWidth:   24,
        textAlign:  "center",
      }}>
        {item.letter}
      </span>

      {/* Dash */}
      <span style={{ fontSize: 20, fontWeight: FONT_WEIGHT.extraBold, color: COLOR.textSecondary }}>
        —
      </span>

      {/* Word */}
      <span style={{
        fontSize:      26,
        fontWeight:    FONT_WEIGHT.extraBold,
        color:         COLOR.ringPrimary,
        letterSpacing: "0.1em",
      }}>
        {item.word}
      </span>
    </div>
  );
};

export const SMARTGuarantee: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOp  = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const heroOp    = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  return (
    <GraphicWrapper>
      <div style={{ display: "flex", flexDirection: "column", gap: 0, alignItems: "flex-start" }}>

        {/* Header */}
        <div style={{ opacity: headerOp, marginBottom: 10 }}>
          <span style={{
            fontSize:      13,
            fontWeight:    FONT_WEIGHT.extraBold,
            color:         COLOR.textSecondary,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            THE GUARANTEE — IF THE PLAN ISN'T SMART, FULL REFUND
          </span>
        </div>

        {/* Hero SMART word */}
        <div style={{
          opacity:     heroOp,
          display:     "flex",
          gap:         4,
          marginBottom: 22,
          lineHeight:  1,
        }}>
          {SMART.map((item, i) => (
            <HeroLetter key={i} letter={item.letter} rowDelay={ROW_DELAYS[i]} />
          ))}
        </div>

        {/* Stagger rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {SMART.map((item, i) => (
            <SmartRow key={i} item={item} delay={ROW_DELAYS[i]} />
          ))}
        </div>

      </div>
    </GraphicWrapper>
  );
};
