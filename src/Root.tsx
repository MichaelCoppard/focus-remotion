import React from "react";
import { Composition } from "remotion";

// ── Script 1: Focus / Productivity ────────────────────────────────────────
import { FocusPie }       from "./FocusPie";
import { FourHoursCost }  from "./FourHoursCost";
import { TwentyThreeMin } from "./TwentyThreeMin";
import { SwitchingCost }  from "./SwitchingCost";
import { NinetyDays }     from "./NinetyDays";

// ── Script 2: DIY Video / Physics of Looking Pro ──────────────────────────
import { FiveKvsPhysics }       from "./FiveKvsPhysics";
import { InterrogationShadows } from "./InterrogationShadows";
import { ThreeFixes }           from "./ThreeFixes";
import { HundredBeats }         from "./HundredBeats";

// ── Script 3: Audio / Perceived Truth ─────────────────────────────────────
import { PerceivedTruth }    from "./PerceivedTruth";
import { ListenerFatigue }   from "./ListenerFatigue";
import { ThreeAudioFixes }   from "./ThreeAudioFixes";
import { ThreeMicsUnder50 }  from "./ThreeMicsUnder50";

// ── Script 4: Authenticity / Performance ──────────────────────────────────
import { PitchVsPartnership } from "./PitchVsPartnership";
import { AnchorPoints }       from "./AnchorPoints";
import { ThreeTechniques }    from "./ThreeTechniques";
import { PerfectVsProlific }  from "./PerfectVsProlific";

// ── Script 5: Batching / Preparation Fatigue ──────────────────────────────
import { PreparationFatigue } from "./PreparationFatigue";
import { ManagerVsCreator }   from "./ManagerVsCreator";
import { SetupTax }           from "./SetupTax";
import { ThreeBatchRules }    from "./ThreeBatchRules";

// ── Script 6: Lighting / Signal Strength ──────────────────────────────────
import { HobbyistVsAuthority } from "./HobbyistVsAuthority";
import { SignalStrength }       from "./SignalStrength";
import { FlatVsDimensional }    from "./FlatVsDimensional";
import { ThreeLights }          from "./ThreeLights";

// ── Script 7: Camera Framing / High Chair Effect ───────────────────────────
import { HighChairEffect }       from "./HighChairEffect";
import { PermissionVsDirection } from "./PermissionVsDirection";
import { AuthoritySignal }       from "./AuthoritySignal";
import { ThreeFramingRules }     from "./ThreeFramingRules";

// ── Script 8: Productive Failure / First Video ─────────────────────────────
import { SixMonthsVsSixtySeconds } from "./SixMonthsVsSixtySeconds";
import { ProductiveFailure }       from "./ProductiveFailure";
import { ThreeTests }              from "./ThreeTests";
import { InfluencerVsSystem }      from "./InfluencerVsSystem";

// ── Script 9: Editing Treadmill / Diminishing Returns ─────────────────────
import { EditingTreadmill }      from "./EditingTreadmill";
import { EightyPercent }         from "./EightyPercent";
import { ThreeEditRules }        from "./ThreeEditRules";
import { OverEditingVsProducing } from "./OverEditingVsProducing";

// ── Script 10: Halo Effect / Background Staging ───────────────────────────
import { DisorganizedVsCompetent } from "./DisorganizedVsCompetent";
import { TenPercent }              from "./TenPercent";
import { HaloEffect }              from "./HaloEffect";
import { ThreeBackgroundRules }    from "./ThreeBackgroundRules";

// ── Long Script 1: Specificity / Talking to the Right 5% ──────────────────
import { FiftyVsFiftyThousand }  from "./FiftyVsFiftyThousand";
import { PopularVsRespected }    from "./PopularVsRespected";
import { RightFivePercent }      from "./RightFivePercent";
import { TeachingVsDiagnosing }  from "./TeachingVsDiagnosing";
import { ThreeAuditQuestions }   from "./ThreeAuditQuestions";

// ── Long Script 2: Pre-Sales / Video as Infrastructure ─────────────────────
import { WhatDoYouDo }          from "./WhatDoYouDo";
import { NinetyPercent }        from "./NinetyPercent";
import { SevenHours }           from "./SevenHours";
import { VideoAsEmployee }      from "./VideoAsEmployee";
import { ChasingVsAttracting }  from "./ChasingVsAttracting";
import { FrictionAudit }        from "./FrictionAudit";

export const Root: React.FC = () => {
  return (
    <>
      {/* ── Script 1: Focus / Productivity ─────────────────────────────── */}
      <Composition id="FocusPie"       component={FocusPie}       durationInFrames={120}  fps={30} width={1920} height={1080} />
      <Composition id="FourHoursCost"  component={FourHoursCost}  durationInFrames={120}  fps={30} width={1920} height={1080} />
      <Composition id="TwentyThreeMin" component={TwentyThreeMin} durationInFrames={120}  fps={30} width={1920} height={1080} />
      <Composition id="SwitchingCost"  component={SwitchingCost}  durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="NinetyDays"     component={NinetyDays}     durationInFrames={120}  fps={30} width={1920} height={1080} />

      {/* ── Script 2: DIY Video / Physics of Looking Pro ────────────────── */}
      <Composition id="FiveKvsPhysics"       component={FiveKvsPhysics}       durationInFrames={120}  fps={30} width={1920} height={1080} />
      <Composition id="InterrogationShadows" component={InterrogationShadows} durationInFrames={120}  fps={30} width={1920} height={1080} />
      <Composition id="ThreeFixes"           component={ThreeFixes}           durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="HundredBeats"         component={HundredBeats}         durationInFrames={120}  fps={30} width={1920} height={1080} />

      {/* ── Script 3: Audio / Perceived Truth ───────────────────────────── */}
      <Composition id="PerceivedTruth"   component={PerceivedTruth}   durationInFrames={120}  fps={30} width={1920} height={1080} />
      <Composition id="ListenerFatigue"  component={ListenerFatigue}  durationInFrames={120}  fps={30} width={1920} height={1080} />
      <Composition id="ThreeAudioFixes"  component={ThreeAudioFixes}  durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="ThreeMicsUnder50" component={ThreeMicsUnder50} durationInFrames={120}  fps={30} width={1920} height={1080} />

      {/* ── Script 4: Authenticity / Performance ─────────────────────────── */}
      <Composition id="PitchVsPartnership" component={PitchVsPartnership} durationInFrames={120}  fps={30} width={1920} height={1080} />
      <Composition id="AnchorPoints"       component={AnchorPoints}       durationInFrames={120}  fps={30} width={1920} height={1080} />
      <Composition id="ThreeTechniques"    component={ThreeTechniques}    durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="PerfectVsProlific"  component={PerfectVsProlific}  durationInFrames={120}  fps={30} width={1920} height={1080} />

      {/* ── Script 5: Batching / Preparation Fatigue ─────────────────────── */}
      <Composition id="PreparationFatigue" component={PreparationFatigue} durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="ManagerVsCreator"   component={ManagerVsCreator}   durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="SetupTax"           component={SetupTax}           durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="ThreeBatchRules"    component={ThreeBatchRules}    durationInFrames={120} fps={30} width={1920} height={1080} />

      {/* ── Script 6: Lighting / Signal Strength ─────────────────────────── */}
      <Composition id="HobbyistVsAuthority" component={HobbyistVsAuthority} durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="SignalStrength"      component={SignalStrength}      durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="FlatVsDimensional"   component={FlatVsDimensional}   durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="ThreeLights"         component={ThreeLights}         durationInFrames={120} fps={30} width={1920} height={1080} />

      {/* ── Script 7: Camera Framing / High Chair Effect ──────────────────── */}
      <Composition id="HighChairEffect"       component={HighChairEffect}       durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="PermissionVsDirection" component={PermissionVsDirection} durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="AuthoritySignal"       component={AuthoritySignal}       durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="ThreeFramingRules"     component={ThreeFramingRules}     durationInFrames={120} fps={30} width={1920} height={1080} />

      {/* ── Script 8: Productive Failure / First Video ────────────────────── */}
      <Composition id="SixMonthsVsSixtySeconds" component={SixMonthsVsSixtySeconds} durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="ProductiveFailure"       component={ProductiveFailure}       durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="ThreeTests"              component={ThreeTests}              durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="InfluencerVsSystem"      component={InfluencerVsSystem}      durationInFrames={120} fps={30} width={1920} height={1080} />

      {/* ── Script 9: Editing Treadmill / Diminishing Returns ─────────────── */}
      <Composition id="EditingTreadmill"      component={EditingTreadmill}      durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="EightyPercent"         component={EightyPercent}         durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="ThreeEditRules"        component={ThreeEditRules}        durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="OverEditingVsProducing" component={OverEditingVsProducing} durationInFrames={120} fps={30} width={1920} height={1080} />

      {/* ── Script 10: Halo Effect / Background Staging ───────────────────── */}
      <Composition id="DisorganizedVsCompetent" component={DisorganizedVsCompetent} durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="TenPercent"              component={TenPercent}              durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="HaloEffect"              component={HaloEffect}              durationInFrames={120} fps={30} width={1920} height={1080} />
      <Composition id="ThreeBackgroundRules"    component={ThreeBackgroundRules}    durationInFrames={120} fps={30} width={1920} height={1080} />

      {/* ── Long Script 1: Specificity / Talking to the Right 5% ─────────── */}
      <Composition id="FiftyVsFiftyThousand" component={FiftyVsFiftyThousand} durationInFrames={210} fps={30} width={1920} height={1080} />
      <Composition id="PopularVsRespected"   component={PopularVsRespected}   durationInFrames={210} fps={30} width={1920} height={1080} />
      <Composition id="RightFivePercent"     component={RightFivePercent}     durationInFrames={210} fps={30} width={1920} height={1080} />
      <Composition id="TeachingVsDiagnosing" component={TeachingVsDiagnosing} durationInFrames={210} fps={30} width={1920} height={1080} />
      <Composition id="ThreeAuditQuestions"  component={ThreeAuditQuestions}  durationInFrames={210} fps={30} width={1920} height={1080} />

      {/* ── Long Script 2: Pre-Sales / Video as Infrastructure ────────────── */}
      <Composition id="WhatDoYouDo"         component={WhatDoYouDo}         durationInFrames={210} fps={30} width={1920} height={1080} />
      <Composition id="NinetyPercent"       component={NinetyPercent}       durationInFrames={210} fps={30} width={1920} height={1080} />
      <Composition id="SevenHours"          component={SevenHours}          durationInFrames={210} fps={30} width={1920} height={1080} />
      <Composition id="VideoAsEmployee"     component={VideoAsEmployee}     durationInFrames={210} fps={30} width={1920} height={1080} />
      <Composition id="ChasingVsAttracting" component={ChasingVsAttracting} durationInFrames={210} fps={30} width={1920} height={1080} />
      <Composition id="FrictionAudit"       component={FrictionAudit}       durationInFrames={210} fps={30} width={1920} height={1080} />
    </>
  );
};
