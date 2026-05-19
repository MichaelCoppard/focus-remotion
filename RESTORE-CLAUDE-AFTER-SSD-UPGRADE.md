# Claude + Focus-Remotion — Full Restoration Guide
## Follow this after your SSD upgrade

---

## BEFORE YOU SWAP THE DRIVE — Do This Now

1. Open File Explorer
2. Click the **View** tab at the top → tick **Hidden items**
3. Navigate to `C:\Users\mcopp\`
4. You will see a folder called `.claude` — copy the entire folder to a USB drive or cloud storage (OneDrive, Google Drive, etc.)
5. That's the only manual step before the upgrade

Your `focus-remotion` project code is already safely on GitHub — nothing else to back up.

---

## AFTER THE UPGRADE — Step-by-Step

### Step 1 — Install Git

Download and install Git from: https://git-scm.com/download/win

Use all default settings during installation.

---

### Step 2 — Install Node.js

Download and install Node.js (LTS version) from: https://nodejs.org

Use all default settings.

---

### Step 3 — Install Claude Code

Open a terminal (press Windows key, type `cmd`, press Enter) and run:

```
npm install -g @anthropic-ai/claude-code
```

---

### Step 4 — Restore Your .claude Folder

1. Open File Explorer
2. Click **View** → tick **Hidden items**
3. Navigate to `C:\Users\mcopp\`
4. Copy the `.claude` folder from your USB drive / cloud storage back into `C:\Users\mcopp\`
5. If a `.claude` folder already exists there, replace it with your backup

This restores all Claude memory files, settings, and preferences.

---

### Step 5 — Clone Your Project from GitHub

In the terminal, run these commands one at a time:

```
cd C:\Users\mcopp
git clone https://github.com/MichaelCoppard/focus-remotion.git
```

---

### Step 6 — Install Project Dependencies

```
cd focus-remotion
npm install
```

---

### Step 7 — Open Claude Code in Your Project

```
claude
```

You are now back where you left off.

---

## IMPORTANT — Paste This Into Claude on First Launch

If Claude doesn't seem to remember the project context, copy and paste the block below into the chat. This restores all working memory manually.

---

### PASTE THIS INTO CLAUDE IF NEEDED:

```
Hi Claude. I have just restored my system after an SSD upgrade. Here is a full summary of our project so you can pick up exactly where we left off.

PROJECT: focus-remotion
GitHub: https://github.com/MichaelCoppard/focus-remotion.git
Local path: C:\Users\mcopp\focus-remotion
Brand tokens file: C:\Users\mcopp\focus-remotion\src\brand.ts

--- BRAND GUIDELINES ---
Always apply these automatically to any motion graphic or infographic unless I say otherwise.

Colours:
- Background: radial gradient #e0e1dd (centre) → #6b6b6b (mid) → #222222 (edge), centre stop at 16%
- Primary accent (steel blue): #415a77
- Secondary accent (warm gold): #c2a46d
- Text primary: #1D1D1F
- Text secondary: rgba(29,29,31,0.45)
- Text muted: rgba(29,29,31,0.6)
- Text accent: #415a77

Typography: Montserrat Extra Bold (weight 800) — all display text, no exceptions.

Animation (Remotion):
- Duration: 3 seconds for callout/stat graphics (323 frames at 30fps including 9 in + 10s dwell + 14 out)
- In: spring scale 0.84→1 + staggered left-to-right reveals
- Out: Gaussian blur dissolve (blur 0→24px + opacity 1→0, 0.8s, starts at 2.2s)
- Springs: snappy {damping:15,stiffness:220} / bouncy {damping:12,stiffness:280} / smooth {damping:14,stiffness:200}

Always import from ./brand — never hardcode values.

--- TECHNICAL NOTES ---
- Project: 1920×1080 @ 30fps
- 4K output at render time via --scale 2 flag (→ 3840×2160) — do NOT change composition dimensions
- ProRes 4K renders: --codec prores --prores-profile 4444 --scale 2
- Standard compositions: 323 frames
- Complex stagger compositions: last element + 300 frames dwell + 14 frames out
- Overlay/alpha compositions: transparent background + ProRes 4444, do NOT use GraphicWrapper
- All compositions registered in Root.tsx

--- RENDERING PREFERENCES ---
IMPORTANT: Never run render commands automatically. Always give me the npm run command as a code block to paste into my own terminal. Never invoke renders via Bash. If I say "render all of them", clarify scope first before doing anything.

--- SCRIPTS COMPLETED ---
Scripts 1–14 are complete and committed to GitHub.

Script 1 — Focus/Productivity: FocusPie, FourHoursCost, TwentyThreeMin, SwitchingCost, NinetyDays
Script 2 — DIY Video: FiveKvsPhysics, InterrogationShadows, ThreeFixes, HundredBeats
Script 3 — Audio: PerceivedTruth, ListenerFatigue, ThreeAudioFixes, ThreeMicsUnder50
Script 4 — Authenticity: PitchVsPartnership, AnchorPoints, ThreeTechniques, PerfectVsProlific
Script 5 — Batching: PreparationFatigue, ManagerVsCreator, SetupTax, ThreeBatchRules
Script 6 — Signal/Authority: SignalStrength, FlatVsDimensional, ThreeLights, HobbyistVsAuthority, HighChairEffect, PermissionVsDirection, AuthoritySignal, ThreeFramingRules
Script 7 — Productivity/Editing: SixMonthsVsSixtySeconds, ProductiveFailure, ThreeTests, InfluencerVsSystem, EditingTreadmill, EightyPercent, ThreeEditRules, OverEditingVsProducing
Script 8 — Background/Environment: HaloEffect, TenPercent, ThreeBackgroundRules, DisorganizedVsCompetent
Script 9 — Positioning: FiftyVsFiftyThousand, PopularVsRespected, RightFivePercent, TeachingVsDiagnosing, ThreeAuditQuestions
Script 10 — Conversion/Friction: WhatDoYouDo, NinetyPercent, SevenHours, VideoAsEmployee, ChasingVsAttracting, FrictionAudit
Script 11 — Authority Engine: HelpfulIsNoise, ContentTreadmill, OperatingManual, AssetVsPost, ServiceToAsset, FoundryAudit, ProductionTimeline, ProductionEffort
Script 12 — Foundry Page Overlays (transparent bg, ProRes 4444 alpha): AreYouRunningBusiness, RealEstateAgency, HighFrequencyForex, SportsRecruiters. Shared component: TextWipeBase.tsx
Script 13 — 1 Take Mental Model: TwentyTakes, BusinessOwnerVsCreator, ThreeHourCost, OneTakeMentalModel, TwoStepSystem, InfluencerVsFounder (overlay), ContentFormats
Script 14 — Event Testimonials (13 compositions): NinetyOnePercent, VideographerCost, PSRFramework, RiskMitigator, SMARTGuarantee, ThreeLightSetup, ThreeLightDiagram2D, ThreeLightDiagram3D (566 frames), SmilesVsDataPoints, PocketLightsCost, FilmingMistake, AudioVsVideoTolerance, MarketingBudgetHolder

Meta Ad Campaign (Event Filming): EventPackageBreakdown (436 frames), EventSocialProof (210 frames, transparent overlay), EventValueGraphic (390 frames)

LinkedIn Assets: LinkedInCover, LinkedInCoverHeadshot, LogoFMSplit (chosen style, render at --scale=4), LogoFMSplitV2, LogoWordmark, LogoFMBlueGoldOutline, LogoFMGoldBlueOutline, LinkedInFollowerAd (1200×628 static)

--- RENDER SCRIPTS IN PACKAGE.JSON ---
npm run render:prores:s12   — Script 12 (4 compositions)
npm run render:prores:s13   — Script 13 (7 compositions)
npm run render:prores:s14   — Script 14 (13 compositions)
npm run render:prores:eventads — Event ad campaign (3 compositions)
NOTE: render:prores:all only chains s1–s10, ls1, ls2 — does NOT include s11–s14.
NOTE: Individual older render scripts are missing --scale 2 flag.

--- FACEBOOK / LINKEDIN ---
Facebook account permanently disabled. Pivoting all paid social to LinkedIn.

Please confirm you have received this and we can continue from Script 15.
```

---

## Quick Reference — Common Commands

| Task | Command |
|---|---|
| Start Remotion Studio | `npm run dev` |
| Render Script 12 | `npm run render:prores:s12` |
| Render Script 13 | `npm run render:prores:s13` |
| Render Script 14 | `npm run render:prores:s14` |
| Render Event Ads | `npm run render:prores:eventads` |
| Open Claude Code | `claude` (run inside the focus-remotion folder) |

---

This file is also saved in your GitHub repo at:
`focus-remotion/RESTORE-CLAUDE-AFTER-SSD-UPGRADE.md`
