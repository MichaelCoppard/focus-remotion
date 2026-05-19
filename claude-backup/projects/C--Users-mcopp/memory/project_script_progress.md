---
name: Script Progress
description: Which scripts have been completed and their composition counts in focus-remotion
type: project
---

Scripts completed and committed to https://github.com/MichaelCoppard/focus-remotion as of 2026-03-30.

## Completed Scripts (Scripts 1–11)

| Script | Theme | Compositions |
|---|---|---|
| 1 | Focus / Productivity | FocusPie, FourHoursCost, TwentyThreeMin, SwitchingCost, NinetyDays |
| 2 | DIY Video / Physics of Looking Pro | FiveKvsPhysics, InterrogationShadows, ThreeFixes, HundredBeats |
| 3 | Audio / Perceived Truth | PerceivedTruth, ListenerFatigue, ThreeAudioFixes, ThreeMicsUnder50 |
| 4 | Authenticity / Performance | PitchVsPartnership, AnchorPoints, ThreeTechniques, PerfectVsProlific |
| 5 | Batching / Preparation Fatigue | PreparationFatigue, ManagerVsCreator, SetupTax, ThreeBatchRules |
| 6 | Signal / Authority | SignalStrength, FlatVsDimensional, ThreeLights, HobbyistVsAuthority, HighChairEffect, PermissionVsDirection, AuthoritySignal, ThreeFramingRules |
| 7 | Productivity / Editing | SixMonthsVsSixtySeconds, ProductiveFailure, ThreeTests, InfluencerVsSystem, EditingTreadmill, EightyPercent, ThreeEditRules, OverEditingVsProducing |
| 8 | Background / Environment | HaloEffect, TenPercent, ThreeBackgroundRules, DisorganizedVsCompetent |
| 9 | Positioning / Authority | FiftyVsFiftyThousand, PopularVsRespected, RightFivePercent, TeachingVsDiagnosing, ThreeAuditQuestions |
| 10 | Conversion / Friction | WhatDoYouDo, NinetyPercent, SevenHours, VideoAsEmployee, ChasingVsAttracting, FrictionAudit |
| 11 | Authority Engine / Foundry Page | HelpfulIsNoise, ContentTreadmill, OperatingManual, AssetVsPost, ServiceToAsset, FoundryAudit, ProductionTimeline, ProductionEffort |

## Script 12: Foundry Page / Overlay Graphics (2026-03-30)

| Composition | Type | Notes |
|---|---|---|
| AreYouRunningBusiness | Overlay (transparent bg) | Brand steel blue card, left-positioned, spring pop-in. Cue: 00:00:00 |
| RealEstateAgency | Overlay (transparent bg, alpha) | Two-line staggered reveal. Line1 white, Line2 gold. TextWipeBase. |
| HighFrequencyForex | Overlay (transparent bg, alpha) | Two-line staggered reveal. fontSize 72. TextWipeBase. |
| SportsRecruiters | Overlay (transparent bg, alpha) | Two-line staggered reveal. fontSize 110. TextWipeBase. |

### Script 12 render scripts (package.json)
- `npm run render:prores:s12` — renders all four at 4K ProRes 4444
- Individual: `render:prores:s12:areyourunning`, `render:prores:s12:realestateagency`, `render:prores:s12:highfrequencyforex`, `render:prores:s12:sportsrecruiters`

### TextWipeBase.tsx
Shared component used by RealEstateAgency, HighFrequencyForex, SportsRecruiters.
Props: `line1`, `line2`, `fontSize`. Transparent background, ProRes 4444 alpha.
Animation: line1 bounces in (SPRING.bouncy), line2 slides up at frame 12, divider grows at frame 26.

## Technical Notes
- Project: 1920×1080 @ 30fps (compositions stay at 1080p in Root.tsx)
- 4K output: achieved at render time via `--scale 2` flag (→ 3840×2160) — do NOT change composition dimensions
- ProRes 4K renders: `--codec prores --prores-profile 4444 --scale 2`
- Standard compositions: 323 frames (9 frames in + 10s dwell + 14 frames out)
- Complex stagger compositions (ProductionTimeline, ProductionEffort): custom durations — last element + 300 frames dwell + 14 frames out
- Rule: dwell = 10 seconds from last element on screen
- Background gradient centre stop: 16% (set in brand.ts)
- All compositions registered in Root.tsx
- All import from `./brand` — never hardcode values
- New script render scripts in package.json must include `--scale 2` for 4K output
- Overlay/alpha compositions: use transparent background + ProRes 4444 — do NOT use GraphicWrapper for these
- Always use `npm run render:prores:s12` (or equivalent script) rather than Studio render button for 4K
- `render:prores:all` in package.json currently only chains s1–s10, ls1, ls2 — does NOT include s11–s14. Individual script commands for s1–ls2 also missing `--scale 2` flag.

## Script 13: 1 Take Mental Model (2026-04-11)

| Composition | Type | Notes |
|---|---|---|
| TwentyTakes | Standard | 323 frames |
| BusinessOwnerVsCreator | Standard | 323 frames |
| ThreeHourCost | Standard | 323 frames |
| OneTakeMentalModel | Standard | 323 frames |
| TwoStepSystem | Standard | 323 frames |
| InfluencerVsFounder | Overlay (transparent bg, alpha) | ProRes 4444 alpha |
| ContentFormats | Standard | 323 frames |

### Script 13 render script (package.json)
- `npm run render:prores:s13` — renders all seven at 4K ProRes 4444

## Script 14: Event Testimonials (2026-04-12)

13 compositions total. Original 6 were all redesigned/improved in session on 2026-04-12. 7 new ones added same session.

| Composition | Type | Notes |
|---|---|---|
| NinetyOnePercent | Standard | SVG donut arc ring filling to 91%, horizontal layout, Wyzowl 2026 source label |
| VideographerCost | Standard | £2,000+ count-up with animated gold progress bar |
| PSRFramework | Standard | 3-card horizontal flow (Problem/Shift/Result), animated SVG arrows between cards |
| RiskMitigator | Standard | Solid gold circle badges + vertical timeline connector between rows |
| SMARTGuarantee | Standard | Hero "SMART" word with letter-by-letter gold highlight + stagger rows |
| ThreeLightSetup | Standard | Colour-coded glow indicator circles per light, pulsing halo animation |
| ThreeLightDiagram2D | Standard | Top-down SVG floor plan: speaker, camera, 3 lights with beam cones + dashed guides |
| ThreeLightDiagram3D | Standard | 566 frames. CSS 3D room reveal: front wall lifts, interior scene with audience/lights |
| SmilesVsDataPoints | Standard | Versus/split style. "SMILES" dimmed vs "DATA POINTS" gold |
| PocketLightsCost | Standard | Dual stat: £60 (gold) vs £2,000+ (dimmed). "SAME RESULT. DIFFERENT BUDGET." |
| FilmingMistake | Standard | SVG split diagram WRONG vs CORRECT. Left: camera→dark speaker→glowing window (radial gradient: white centre → brand beige #e0e1dd). Right: 3-light setup→lit speaker→camera→plain wall |
| AudioVsVideoTolerance | Standard | Animated horizontal bar chart. VIDEO 80% (gold), AUDIO 16% (steel blue) |
| MarketingBudgetHolder | Standard | Stagger reveal. C-Suite struck through, "MARKETING BUDGET HOLDERS" gold |

### Script 14 render script (package.json)
- `npm run render:prores:s14` — renders all 13 at 4K ProRes 4444

## Meta Ad Campaign: Event Filming (2026-04-12)

3 compositions built to support a Meta ad campaign targeting UK event organisers (age 28–60+, job titles: Event Manager, Marketing Manager, Comms Director, HR, Conference Organiser).

Ad structure: filmed hook (varies) → filmed body (fixed) → Remotion graphic overlay → CTA.

| Composition | Type | Notes |
|---|---|---|
| EventPackageBreakdown | Standard, 436 frames | Stagger reveals 4 deliverables with gold badges + timeline connector. Header: "WHAT'S INCLUDED" |
| EventSocialProof | Transparent overlay, 210 frames | Lower-third dark card. Quote + gold attribution. QUOTE and ATTRIBUTION are constants at top of file — swap per variant |
| EventValueGraphic | Standard, 390 frames | 2×2 grid of deliverable cards. Footer: "EVERYTHING YOU NEED. NOTHING YOU DON'T." |

### 6 filmed hook scripts written (in conversation history / memory):
1. Problem — "leaving money on the table"
2. Social proof — client used highlight reel to secure next year's sponsor
3. Curiosity — "most event organisers make the same mistake"
4. Cost/value — video is the only thing that lives beyond the day
5. Authority — open on footage, then to camera
6. Direct/bold — straight to camera, walks through the package

### Body script (fixed): walks through all 4 deliverables ending "One shoot. Four deliverables. Everything you need."
### CTA: "the link is below"

### Render script
- `npm run render:prores:eventads` — renders all 3 at 4K ProRes 4444
- Individual: `render:prores:eventads:packagebreakdown`, `render:prores:eventads:socialproof`, `render:prores:eventads:valuegraphic`

## LinkedIn Assets (2026-04-17)

Facebook account permanently disabled — pivoting to LinkedIn content.

### Cover Images
| Composition | Type | Notes |
|---|---|---|
| LinkedInCover | Static 1584×396 | Full-bleed BTS filming photo (public/bts-filming.png), dark gradient overlay left, white text + gold title |
| LinkedInCoverHeadshot | Static 1584×396 | Brand radial gradient BG, headshot (profile-085.jpg) fading in from right |

- Render at 2x for sharp LinkedIn display: `npx remotion still LinkedInCover out/linkedin-cover-bts.jpg --jpeg-quality=100 --scale=2`
- Text shifted to `left: 340px` to clear LinkedIn profile picture overlap (bottom-left ~340px zone)

### Logo Variations
| Composition | Notes |
|---|---|
| LogoFMSplit | **Chosen style.** F steel blue + M gold, brand gradient BG, gold underline. Render at `--scale=4` for 1200×1200 |
| LogoFMSplitV2 | Luminescent version: brighter colours + glow, 50% less vignette (edge #555 not #222) |
| LogoWordmark | FOUNDRY/MEDIA stacked, white + gold, dark BG |
| LogoFMBlueGoldOutline | FM steel blue fill + gold outline |
| LogoFMGoldBlueOutline | FM gold fill + steel blue outline |

- All logos are 300×300 compositions; use `--scale=4` for high-res output
- Logo assets in `src/LinkedInLogos.tsx`

### LinkedIn Follower Ad (2026-04-20)
| Composition | Type | Notes |
|---|---|---|
| LinkedInFollowerAd | Static 1200×628 | Single image ad. Face right (profile-085.jpg), copy left. Hero: "STOP / CHASING / CLIENTS." (white/white/gold, 88px). Sub: "Use video to attract them instead." Gold pill CTA: "FOLLOW FOUNDRY MEDIA →". Targeting business owners seeking lead gen via video. |

- File: `src/LinkedInFollowerAd.tsx`
- Render: `npx remotion still LinkedInFollowerAd out/linkedin-follower-ad.jpg --jpeg-quality=100`
- Strategy: bypasses LinkedIn's native Follower ad format (£7.30/engagement) using a single image ad instead
- Copy angle: video as lead generation / stop chasing, start attracting

**Why:** Tracking script completion helps resume work quickly across conversations.
**How to apply:** When starting a new script, check this file first to understand the existing pattern and numbering.
