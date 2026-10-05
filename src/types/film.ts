export interface QuestionOption {
  label: string;
  description: string;
}

export interface InterrogationQuestion {
  id: string;
  category: 'Character Core' | 'Aesthetic & Lighting' | 'Narrative Climax' | 'Audio & Tone';
  question: string;
  options: QuestionOption[];
  selectedOption?: string;
  customAnswer?: string;
}

export interface InterrogationResult {
  interrogationTitle: string;
  visionAnalysis: string;
  questions: InterrogationQuestion[];
}

export interface VisualGrammar {
  aspectRatio: '2.39:1' | '16:9' | '4:3' | '1:1';
  lensChoice: string;
  lightingStyle: string;
  colorPalette: string[];
}

export interface FilmTreatment {
  id: string;
  title: string;
  artisticStyle: string;
  pitchTone: string;
  logline: string;
  visualGrammar: VisualGrammar;
  coreConflict: string;
  pacingStyle: string;
  aiWorkflowRecommendation: string;
}

export interface CharacterAnglePrompt {
  angle: 'Front Portrait' | 'Three-Quarter Angle' | 'Action Profile' | 'Emotional Close-Up';
  prompt: string;
  previewImage?: string;
}

export interface VoiceProfile {
  accent: string;
  tone: string;
  speed: string;
  elevenLabsVoiceRecommendation: string;
  sampleLine: string;
}

export interface CharacterBible {
  id: string;
  name: string;
  role: string;
  age: string;
  archetype: string;
  physicalSignature: string;
  wardrobeSignature: string;
  characterAnchorToken: string;
  heroImage?: string;
  multiAnglePrompts: CharacterAnglePrompt[];
  voiceProfile: VoiceProfile;
  continuityRules: string[];
}

export interface CompiledPrompts {
  midjourneyFlux: string;
  runwayKlingVideo: string;
}

export interface Shot {
  id: string;
  shotNumber: string;
  shotType: 'Extreme Wide Establishing' | 'Wide Shot' | 'Medium Tracking' | 'Over-The-Shoulder' | 'Close-Up' | 'Extreme Macro Close-Up' | 'Dutch Angle';
  framingLens: string;
  cameraMovement: string;
  lightingAtmosphere: string;
  actionDescription: string;
  dialogueOrVoiceover?: string | null;
  soundDesignFoley: string;
  compiledPrompts: CompiledPrompts;
  continuityNote: string;
  keyframeImage?: string;
}

export interface ContinuityAlert {
  severity: 'Warning' | 'Notice' | 'Critical';
  issue: string;
  fix: string;
}

export interface PromptOptimizationTip {
  targetTool: string;
  recommendation: string;
}

export interface DirectorialEnhancement {
  title: string;
  concept: string;
  impact: string;
}

export interface DirectorialAudit {
  continuityScore: number;
  overallVerdict: string;
  continuityAlerts: ContinuityAlert[];
  promptOptimizationTips: PromptOptimizationTip[];
  directorialEnhancements: DirectorialEnhancement[];
}

export interface DeconstructedFormula {
  openingHookTrigger: string;
  narrativeClimaxBeat: string;
  characterArchetypes: string[];
  visualAestheticStack: string;
  soundtrackFormula: string;
  whyItWentViral: string;
  originalFlawsToOvercome?: string[];
  makeItBetterUpgrades?: {
    cinematographyUpgrade: string;
    scriptAndDialogueUpgrade: string;
    characterConsistencyUpgrade: string;
    soundtrackUpgrade: string;
  };
}

export interface TrendingMovie {
  id: string;
  title: string;
  genre: string;
  category: 'African Cinema' | 'The Billionaire Trope' | 'Romance & Drama' | 'Action & Thriller' | 'Sci-Fi & Speculative' | 'AI Film Fest Winner' | 'Bollywood Epic' | 'K-Drama & Asian Cinema' | 'Hollywood High-Concept';
  culture: 'Nollywood & African' | 'Bollywood & South Asian' | 'Hollywood & Western' | 'East Asian & K-Drama' | 'Latin American' | 'European & Nordic Noir' | 'Middle Eastern' | 'Global / Cross-Cultural';
  targetChannel?: 'YouTube Cinema' | 'TikTok & Reels' | 'Film Festival' | 'Streaming Pitch' | 'Feature Film';
  regionOrCulturalContext: string;
  viralStats: string;
  viralHook: string;
  logline: string;
  visualAesthetic: string;
  toolsUsed: string;
  deconstructedFormula: DeconstructedFormula;
  previewImage?: string;
}

export interface ReverseEngineerStrategy {
  strategy: 'Elevate & Prestige' | 'Genre Fusion' | 'Invert Dynamics' | 'Action Spectacle';
  cultureTarget?: string;
  channelTarget?: string;
  customDirection?: string;
}

export interface FilmProject {
  id: string;
  title: string;
  logline: string;
  genre: string;
  format: string;
  visualStyle: string;
  treatment: FilmTreatment;
  characters: CharacterBible[];
  shots: Shot[];
  audit?: DirectorialAudit;
  updatedAt: string;
}
