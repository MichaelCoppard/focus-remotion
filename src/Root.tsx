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

// ── Script 6: Signal / Authority ──────────────────────────────────────────
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

// ── Facebook Ad Creative ──────────────────────────────────────────────────
import { FacebookFollowerAd }        from "./FacebookFollowerAd";
import { FacebookFollowerAdStatic }  from "./FacebookFollowerAdStatic";
import { FacebookFollowerAdStaticB } from "./FacebookFollowerAdStaticB";
import { FacebookFollowerAdLight }   from "./FacebookFollowerAdLight";
import { FacebookFollowerAdBlue }    from "./FacebookFollowerAdBlue";

// ── Follower Campaign — 5-variant set ─────────────────────────────────────
import { FollowerAdPhotoSplit }  from "./FollowerAdPhotoSplit";
import { FollowerAdLearnList }   from "./FollowerAdLearnList";
import { FollowerAdAnimated }    from "./FollowerAdAnimated";
import { FollowerAdStatPunch }   from "./FollowerAdStatPunch";
import { FollowerAdStories }     from "./FollowerAdStories";

import { MetaServiceAd }         from "./MetaServiceAd";

// ── Script 11: Authority Engine / Foundry Page ────────────────────────────
import { ProductionTimeline } from "./ProductionTimeline";
import { ProductionEffort }   from "./ProductionEffort";
import { HelpfulIsNoise }     from "./HelpfulIsNoise";
import { ContentTreadmill }   from "./ContentTreadmill";
import { OperatingManual }    from "./OperatingManual";
import { AssetVsPost }        from "./AssetVsPost";
import { ServiceToAsset }     from "./ServiceToAsset";
import { FoundryAudit }       from "./FoundryAudit";

// ── Script 12: Foundry Page / Overlay Graphics ────────────────────────────
import { AreYouRunningBusiness } from "./AreYouRunningBusiness";
import { RealEstateAgency }      from "./RealEstateAgency";
import { HighFrequencyForex }    from "./HighFrequencyForex";
import { SportsRecruiters }      from "./SportsRecruiters";

// ── Script 13: 1 Take Mental Model ────────────────────────────────────────
import { TwentyTakes }           from "./TwentyTakes";
import { BusinessOwnerVsCreator } from "./BusinessOwnerVsCreator";
import { ThreeHourCost }          from "./ThreeHourCost";
import { OneTakeMentalModel }     from "./OneTakeMentalModel";
import { TwoStepSystem }          from "./TwoStepSystem";
import { InfluencerVsFounder }    from "./InfluencerVsFounder";
import { ContentFormats }         from "./ContentFormats";

// ── Script 14: Event Testimonials ─────────────────────────────────────────
import { NinetyOnePercent }        from "./NinetyOnePercent";
import { VideographerCost }        from "./VideographerCost";
import { PSRFramework }            from "./PSRFramework";
import { RiskMitigator }           from "./RiskMitigator";
import { SMARTGuarantee }          from "./SMARTGuarantee";
import { ThreeLightSetup }         from "./ThreeLightSetup";
import { ThreeLightDiagram2D }     from "./ThreeLightDiagram2D";
import { ThreeLightDiagram3D }     from "./ThreeLightDiagram3D";
import { SmilesVsDataPoints }      from "./SmilesVsDataPoints";
import { PocketLightsCost }        from "./PocketLightsCost";
import { FilmingMistake }          from "./FilmingMistake";
import { AudioVsVideoTolerance }   from "./AudioVsVideoTolerance";
import { MarketingBudgetHolder }   from "./MarketingBudgetHolder";

// ── Meta Ad Campaign: Event Filming ───────────────────────────────────────
import { EventPackageBreakdown } from "./EventPackageBreakdown";
import { EventSocialProof }      from "./EventSocialProof";
import { EventValueGraphic }     from "./EventValueGraphic";

export const Root: React.FC = () => {
  return (
    <>
      {/* ── Script 1: Focus / Productivity ─────────────────────────────── */}
      <Composition id="FocusPie"       component={FocusPie}       durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="FourHoursCost"  component={FourHoursCost}  durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="TwentyThreeMin" component={TwentyThreeMin} durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="SwitchingCost"  component={SwitchingCost}  durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="NinetyDays"     component={NinetyDays}     durationInFrames={323}  fps={30} width={1920} height={1080} />

      {/* ── Script 2: DIY Video / Physics of Looking Pro ────────────────── */}
      <Composition id="FiveKvsPhysics"       component={FiveKvsPhysics}       durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="InterrogationShadows" component={InterrogationShadows} durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ThreeFixes"           component={ThreeFixes}           durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="HundredBeats"         component={HundredBeats}         durationInFrames={323}  fps={30} width={1920} height={1080} />

      {/* ── Script 3: Audio / Perceived Truth ───────────────────────────── */}
      <Composition id="PerceivedTruth"   component={PerceivedTruth}   durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ListenerFatigue"  component={ListenerFatigue}  durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ThreeAudioFixes"  component={ThreeAudioFixes}  durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ThreeMicsUnder50" component={ThreeMicsUnder50} durationInFrames={323}  fps={30} width={1920} height={1080} />

      {/* ── Script 4: Authenticity / Performance ─────────────────────────── */}
      <Composition id="PitchVsPartnership" component={PitchVsPartnership} durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="AnchorPoints"       component={AnchorPoints}       durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ThreeTechniques"    component={ThreeTechniques}    durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="PerfectVsProlific"  component={PerfectVsProlific}  durationInFrames={323}  fps={30} width={1920} height={1080} />

      {/* ── Script 5: Batching / Preparation Fatigue ─────────────────────── */}
      <Composition id="PreparationFatigue" component={PreparationFatigue} durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ManagerVsCreator"   component={ManagerVsCreator}   durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="SetupTax"           component={SetupTax}           durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ThreeBatchRules"    component={ThreeBatchRules}    durationInFrames={323}  fps={30} width={1920} height={1080} />

      {/* ── Script 6: Signal / Authority ─────────────────────────────────── */}
      <Composition id="HobbyistVsAuthority" component={HobbyistVsAuthority} durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="SignalStrength"      component={SignalStrength}      durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="FlatVsDimensional"   component={FlatVsDimensional}   durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ThreeLights"         component={ThreeLights}         durationInFrames={323}  fps={30} width={1920} height={1080} />

      {/* ── Script 7: Camera Framing / High Chair Effect ──────────────────── */}
      <Composition id="HighChairEffect"       component={HighChairEffect}       durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="PermissionVsDirection" component={PermissionVsDirection} durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="AuthoritySignal"       component={AuthoritySignal}       durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ThreeFramingRules"     component={ThreeFramingRules}     durationInFrames={323}  fps={30} width={1920} height={1080} />

      {/* ── Script 8: Productive Failure / First Video ────────────────────── */}
      <Composition id="SixMonthsVsSixtySeconds" component={SixMonthsVsSixtySeconds} durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ProductiveFailure"       component={ProductiveFailure}       durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ThreeTests"              component={ThreeTests}              durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="InfluencerVsSystem"      component={InfluencerVsSystem}      durationInFrames={323}  fps={30} width={1920} height={1080} />

      {/* ── Script 9: Editing Treadmill / Diminishing Returns ─────────────── */}
      <Composition id="EditingTreadmill"       component={EditingTreadmill}       durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="EightyPercent"          component={EightyPercent}          durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ThreeEditRules"         component={ThreeEditRules}         durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="OverEditingVsProducing" component={OverEditingVsProducing} durationInFrames={323}  fps={30} width={1920} height={1080} />

      {/* ── Script 10: Halo Effect / Background Staging ───────────────────── */}
      <Composition id="DisorganizedVsCompetent" component={DisorganizedVsCompetent} durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="TenPercent"              component={TenPercent}              durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="HaloEffect"              component={HaloEffect}              durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ThreeBackgroundRules"    component={ThreeBackgroundRules}    durationInFrames={323}  fps={30} width={1920} height={1080} />

      {/* ── Long Script 1: Specificity / Talking to the Right 5% ─────────── */}
      <Composition id="FiftyVsFiftyThousand" component={FiftyVsFiftyThousand} durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="PopularVsRespected"   component={PopularVsRespected}   durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="RightFivePercent"     component={RightFivePercent}     durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="TeachingVsDiagnosing" component={TeachingVsDiagnosing} durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ThreeAuditQuestions"  component={ThreeAuditQuestions}  durationInFrames={323}  fps={30} width={1920} height={1080} />

      {/* ── Long Script 2: Pre-Sales / Video as Infrastructure ────────────── */}
      <Composition id="WhatDoYouDo"         component={WhatDoYouDo}         durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="NinetyPercent"       component={NinetyPercent}       durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="SevenHours"          component={SevenHours}          durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="VideoAsEmployee"     component={VideoAsEmployee}     durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ChasingVsAttracting" component={ChasingVsAttracting} durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="FrictionAudit"       component={FrictionAudit}       durationInFrames={323}  fps={30} width={1920} height={1080} />

      {/* ── Facebook Ad Creative ──────────────────────────────────────────── */}
      <Composition id="FacebookFollowerAd"        component={FacebookFollowerAd}        durationInFrames={180} fps={30} width={1080} height={1080} />
      <Composition id="FacebookFollowerAdStatic"  component={FacebookFollowerAdStatic}  durationInFrames={1}   fps={30} width={1080} height={1080} />
      <Composition id="FacebookFollowerAdLight"   component={FacebookFollowerAdLight}   durationInFrames={1}   fps={30} width={1080} height={1080} />
      <Composition id="FacebookFollowerAdBlue"    component={FacebookFollowerAdBlue}    durationInFrames={1}   fps={30} width={1080} height={1080} />
      <Composition id="FacebookFollowerAdStaticB" component={FacebookFollowerAdStaticB} durationInFrames={1}   fps={30} width={1080} height={1080} />

      {/* ── Follower Campaign — 5-variant set ────────────────────────────── */}
      <Composition id="FollowerAdPhotoSplit"  component={FollowerAdPhotoSplit}  durationInFrames={1}   fps={30} width={1080} height={1350} />
      <Composition id="FollowerAdLearnList"   component={FollowerAdLearnList}   durationInFrames={1}   fps={30} width={1080} height={1080} />
      <Composition id="FollowerAdAnimated"    component={FollowerAdAnimated}    durationInFrames={180} fps={30} width={1080} height={1350} />
      <Composition id="FollowerAdStatPunch"   component={FollowerAdStatPunch}   durationInFrames={180} fps={30} width={1080} height={1080} />
      <Composition id="FollowerAdStories"     component={FollowerAdStories}     durationInFrames={1}   fps={30} width={1080} height={1920} />

      {/* ── Meta Service Ad ───────────────────────────────────────────────── */}
      <Composition id="MetaServiceAd" component={MetaServiceAd} durationInFrames={1} fps={30} width={1080} height={1350} />

      {/* ── Script 11: Authority Engine / Foundry Page ───────────────────── */}
      <Composition id="HelpfulIsNoise"     component={HelpfulIsNoise}     durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ContentTreadmill"   component={ContentTreadmill}   durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="OperatingManual"    component={OperatingManual}    durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="AssetVsPost"        component={AssetVsPost}        durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ServiceToAsset"     component={ServiceToAsset}     durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="FoundryAudit"       component={FoundryAudit}       durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ProductionTimeline" component={ProductionTimeline} durationInFrames={476}  fps={30} width={1920} height={1080} />
      <Composition id="ProductionEffort"   component={ProductionEffort}   durationInFrames={466}  fps={30} width={1920} height={1080} />

      {/* ── Script 12: Foundry Page / Overlay Graphics ───────────────────── */}
      <Composition id="AreYouRunningBusiness" component={AreYouRunningBusiness} durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="RealEstateAgency"      component={RealEstateAgency}      durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="HighFrequencyForex"    component={HighFrequencyForex}    durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="SportsRecruiters"      component={SportsRecruiters}      durationInFrames={323}  fps={30} width={1920} height={1080} />

      {/* ── Script 13: 1 Take Mental Model ──────────────────────────────── */}
      <Composition id="TwentyTakes"            component={TwentyTakes}            durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="BusinessOwnerVsCreator" component={BusinessOwnerVsCreator} durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ThreeHourCost"          component={ThreeHourCost}          durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="OneTakeMentalModel"     component={OneTakeMentalModel}     durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="TwoStepSystem"          component={TwoStepSystem}          durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="InfluencerVsFounder"    component={InfluencerVsFounder}    durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ContentFormats"         component={ContentFormats}         durationInFrames={323}  fps={30} width={1920} height={1080} />

      {/* ── Script 14: Event Testimonials ────────────────────────────────── */}
      <Composition id="NinetyOnePercent"     component={NinetyOnePercent}     durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="VideographerCost"     component={VideographerCost}     durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="PSRFramework"         component={PSRFramework}         durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="RiskMitigator"        component={RiskMitigator}        durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="SMARTGuarantee"       component={SMARTGuarantee}       durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ThreeLightSetup"      component={ThreeLightSetup}      durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ThreeLightDiagram2D"    component={ThreeLightDiagram2D}    durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="ThreeLightDiagram3D"    component={ThreeLightDiagram3D}    durationInFrames={566}  fps={30} width={1920} height={1080} />
      <Composition id="SmilesVsDataPoints"     component={SmilesVsDataPoints}     durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="PocketLightsCost"       component={PocketLightsCost}       durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="FilmingMistake"         component={FilmingMistake}         durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="AudioVsVideoTolerance"  component={AudioVsVideoTolerance}  durationInFrames={323}  fps={30} width={1920} height={1080} />
      <Composition id="MarketingBudgetHolder"  component={MarketingBudgetHolder}  durationInFrames={323}  fps={30} width={1920} height={1080} />

      {/* ── Meta Ad Campaign: Event Filming ──────────────────────────────── */}
      <Composition id="EventPackageBreakdown" component={EventPackageBreakdown} durationInFrames={436}  fps={30} width={1920} height={1080} />
      <Composition id="EventSocialProof"      component={EventSocialProof}      durationInFrames={210}  fps={30} width={1920} height={1080} />
      <Composition id="EventValueGraphic"     component={EventValueGraphic}     durationInFrames={390}  fps={30} width={1920} height={1080} />
    </>
  );
};
