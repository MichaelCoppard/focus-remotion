import React from "react";
import { COLOR, BG_GRADIENT, FONT_WEIGHT } from "./brand";

// ─────────────────────────────────────────────────────────────────────────────
// Logo A — F in steel blue, M in gold, brand gradient BG, gold underline
// ─────────────────────────────────────────────────────────────────────────────
export const LogoFMSplit: React.FC = () => (
  <div
    style={{
      width: 300,
      height: 300,
      background: BG_GRADIENT,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 14,
      fontFamily: "'Montserrat', sans-serif",
      overflow: "hidden",
    }}
  >
    <div style={{ display: "flex", lineHeight: 1, letterSpacing: "-0.04em" }}>
      <span
        style={{
          fontSize: 140,
          fontWeight: FONT_WEIGHT.extraBold,
          color: COLOR.ringPrimary,
        }}
      >
        F
      </span>
      <span
        style={{
          fontSize: 140,
          fontWeight: FONT_WEIGHT.extraBold,
          color: COLOR.ringSecondary,
        }}
      >
        M
      </span>
    </div>
    {/* Gold underline */}
    <div
      style={{
        width: 72,
        height: 4,
        background: COLOR.ringSecondary,
        borderRadius: 2,
      }}
    />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Logo A V2 — Luminescent: brighter colours, 50% less vignette
// ─────────────────────────────────────────────────────────────────────────────
export const LogoFMSplitV2: React.FC = () => (
  <div
    style={{
      width: 300,
      height: 300,
      // Lighter edge stop (#555 instead of #222) = 50% less vignette
      background: "radial-gradient(ellipse at 50% 50%, #e0e1dd 0%, #e0e1dd 16%, #6b6b6b 60%, #555555 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 14,
      fontFamily: "'Montserrat', sans-serif",
      overflow: "hidden",
    }}
  >
    <div style={{ display: "flex", lineHeight: 1, letterSpacing: "-0.04em" }}>
      {/* Brighter steel blue + glow */}
      <span
        style={{
          fontSize: 140,
          fontWeight: FONT_WEIGHT.extraBold,
          color: "#6b9bc4",
          textShadow: "0 0 40px rgba(107,155,196,0.6), 0 0 80px rgba(107,155,196,0.3)",
        }}
      >
        F
      </span>
      {/* Brighter gold + glow */}
      <span
        style={{
          fontSize: 140,
          fontWeight: FONT_WEIGHT.extraBold,
          color: "#d9bb7e",
          textShadow: "0 0 40px rgba(217,187,126,0.6), 0 0 80px rgba(217,187,126,0.3)",
        }}
      >
        M
      </span>
    </div>
    {/* Gold underline */}
    <div
      style={{
        width: 72,
        height: 4,
        background: "#d9bb7e",
        borderRadius: 2,
        boxShadow: "0 0 12px rgba(217,187,126,0.8)",
      }}
    />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Logo B — FM steel blue fill, gold outline
// ─────────────────────────────────────────────────────────────────────────────
export const LogoFMBlueGoldOutline: React.FC = () => (
  <div
    style={{
      width: 300,
      height: 300,
      background: "#111111",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 14,
      fontFamily: "'Montserrat', sans-serif",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        fontSize: 140,
        fontWeight: FONT_WEIGHT.extraBold,
        lineHeight: 1,
        letterSpacing: "-0.04em",
        color: COLOR.ringPrimary,
        WebkitTextStroke: `3px ${COLOR.ringSecondary}`,
      }}
    >
      FM
    </div>
    {/* Gold underline */}
    <div
      style={{
        width: 72,
        height: 4,
        background: COLOR.ringSecondary,
        borderRadius: 2,
      }}
    />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Logo C — FM gold fill, steel blue outline (opposite of B)
// ─────────────────────────────────────────────────────────────────────────────
export const LogoFMGoldBlueOutline: React.FC = () => (
  <div
    style={{
      width: 300,
      height: 300,
      background: "#111111",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 14,
      fontFamily: "'Montserrat', sans-serif",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        fontSize: 140,
        fontWeight: FONT_WEIGHT.extraBold,
        lineHeight: 1,
        letterSpacing: "-0.04em",
        color: COLOR.ringSecondary,
        WebkitTextStroke: `3px ${COLOR.ringPrimary}`,
      }}
    >
      FM
    </div>
    {/* Steel blue underline */}
    <div
      style={{
        width: 72,
        height: 4,
        background: COLOR.ringPrimary,
        borderRadius: 2,
      }}
    />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Kept from previous session — Wordmark
// ─────────────────────────────────────────────────────────────────────────────
export const LogoWordmark: React.FC = () => (
  <div
    style={{
      width: 300,
      height: 300,
      background: "#111111",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Montserrat', sans-serif",
      overflow: "hidden",
    }}
  >
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
      <div
        style={{
          fontSize: 52,
          fontWeight: FONT_WEIGHT.extraBold,
          color: "#ffffff",
          letterSpacing: "0.12em",
          lineHeight: 1,
        }}
      >
        FOUNDRY
      </div>
      <div
        style={{
          width: 180,
          height: 3,
          background: COLOR.ringSecondary,
          margin: "14px 0",
          borderRadius: 2,
        }}
      />
      <div
        style={{
          fontSize: 36,
          fontWeight: FONT_WEIGHT.extraBold,
          color: COLOR.ringSecondary,
          letterSpacing: "0.28em",
          lineHeight: 1,
        }}
      >
        MEDIA
      </div>
    </div>
  </div>
);

// Kept from previous session — FM Monogram (original)
export const LogoFMMonogram: React.FC = () => (
  <div
    style={{
      width: 300,
      height: 300,
      background: "#111111",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 12,
      fontFamily: "'Montserrat', sans-serif",
      overflow: "hidden",
      position: "relative",
    }}
  >
    <div
      style={{
        position: "absolute",
        width: 220,
        height: 220,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(194,164,109,0.12) 0%, transparent 70%)`,
      }}
    />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div
        style={{
          fontSize: 136,
          fontWeight: FONT_WEIGHT.extraBold,
          color: "#ffffff",
          lineHeight: 1,
          letterSpacing: "-0.05em",
        }}
      >
        FM
      </div>
      <div
        style={{
          width: 72,
          height: 4,
          background: COLOR.ringSecondary,
          borderRadius: 2,
        }}
      />
    </div>
  </div>
);
