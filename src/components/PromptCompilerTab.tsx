import React, { useState } from 'react';
import { FilmProject, Shot } from '../types/film';
import {
  Cpu,
  Copy,
  Check,
  Download,
  Film,
  Sparkles,
  Sliders,
  Music,
  Mic,
  Camera,
  Layers,
} from 'lucide-react';

interface PromptCompilerTabProps {
  project: FilmProject;
  onAdvanceToAuditor: () => void;
}

export const PromptCompilerTab: React.FC<PromptCompilerTabProps> = ({
  project,
  onAdvanceToAuditor,
}) => {
  const [selectedEngine, setSelectedEngine] = useState<
    'midjourney' | 'flux' | 'runway' | 'kling' | 'audio' | 'elevenlabs'
  >('runway');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const shots = project.shots || [];
  const heroChar = project.characters[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getEnginePromptForShot = (shot: Shot, engine: string): string => {
    const charToken = heroChar?.characterAnchorToken || 'Lead protagonist';
    const aspectRatio = project.treatment?.visualGrammar?.aspectRatio || '2.39:1';

    switch (engine) {
      case 'midjourney':
        return `Cinematic movie still, ${shot.framingLens}, ${shot.shotType}, ${charToken}, ${shot.actionDescription}, ${shot.lightingAtmosphere}, 35mm film grain, Panavision anamorphic lens flare, award-winning cinematography --ar ${aspectRatio} --style raw --v 6.1 --s 250 --c 5`;

      case 'flux':
        return `Shot on Arri Alexa Mini LF, Panavision C-Series Anamorphic. ${shot.shotType} of ${charToken}. ${shot.actionDescription}. Lighting: ${shot.lightingAtmosphere}. Optics: ${shot.framingLens}. Natural skin texture, authentic film grain, high dynamic range, masterpiece film production still.`;

      case 'runway':
        return `[Camera: ${shot.cameraMovement}], [Shot: ${shot.shotType}, ${shot.framingLens}]. ${shot.actionDescription}. Cinematic lighting: ${shot.lightingAtmosphere}. Ultra-photorealistic, high budget sci-fi feature film, fluid organic physics, 24fps motion blur.`;

      case 'kling':
        return `${shot.shotType} framing with ${shot.cameraMovement}. ${shot.actionDescription}. Atmosphere: ${shot.lightingAtmosphere}. Smooth cinematic motion, stable facial features, no morphing, hyper-detailed environment.`;

      case 'audio':
        return `Soundtrack style: Cinematic dark ambient synthwave, low resonant 40Hz drone, mournful cello motifs, tempo 68 BPM. Foley: ${shot.soundDesignFoley}.`;

      case 'elevenlabs':
        return heroChar?.voiceProfile
          ? `Voice: ${heroChar.voiceProfile.elevenLabsVoiceRecommendation} | Accent: ${heroChar.voiceProfile.accent} | Tone: ${heroChar.voiceProfile.tone} | Line: "${shot.dialogueOrVoiceover || heroChar.voiceProfile.sampleLine}"`
          : 'No character dialogue assigned for this shot.';

      default:
        return shot.compiledPrompts?.runwayKlingVideo || '';
    }
  };

  const handleCopyAllPrompts = () => {
    const allPrompts = shots
      .map((shot, idx) => `=== SHOT ${idx + 1}: ${shot.shotType} ===\n${getEnginePromptForShot(shot, selectedEngine)}`)
      .join('\n\n');
    handleCopy(allPrompts, 'copy-all');
  };

  const handleDownloadBatch = () => {
    const data = {
      projectTitle: project.title,
      engine: selectedEngine,
      aspectRatio: project.treatment?.visualGrammar?.aspectRatio || '2.39:1',
      shots: shots.map((s, idx) => ({
        shotNumber: s.shotNumber || `Shot ${idx + 1}`,
        type: s.shotType,
        lens: s.framingLens,
        cameraVector: s.cameraMovement,
        prompt: getEnginePromptForShot(s, selectedEngine),
      })),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title.toLowerCase().replace(/\s+/g, '_')}_${selectedEngine}_prompts.json`;
    a.click();
  };

  const engines = [
    { id: 'runway', label: 'Runway Gen-3 Alpha', category: 'Video Motion', icon: Film },
    { id: 'midjourney', label: 'Midjourney v6.1', category: 'Keyframe Stills', icon: Camera },
    { id: 'flux', label: 'Flux.1 Pro', category: 'Photorealism', icon: Sparkles },
    { id: 'kling', label: 'Kling / Luma', category: 'Video Physics', icon: Layers },
    { id: 'audio', label: 'Suno / Udio Score', category: 'Music & Foley', icon: Music },
    { id: 'elevenlabs', label: 'ElevenLabs Voice', category: 'Dialogue & TTS', icon: Mic },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-1.5">
            <Cpu className="w-3.5 h-3.5" />
            <span>Phase 4: Multi-Engine AI Prompt Compiler</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Production Prompt Hub
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Automatically compile your shotlist into production-ready prompts formatted for top video,
            image, and audio engines.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyAllPrompts}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 cursor-pointer"
          >
            {copiedKey === 'copy-all' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">All Prompts Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy All Prompts</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadBatch}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold shadow-md cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Batch JSON</span>
          </button>
        </div>
      </div>

      {/* Engine Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {engines.map((eng) => {
          const Icon = eng.icon;
          const isSelected = selectedEngine === eng.id;
          return (
            <button
              key={eng.id}
              onClick={() => setSelectedEngine(eng.id as any)}
              className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-400 text-white ring-1 ring-amber-400/50 shadow-lg shadow-amber-500/10'
                  : 'bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-zinc-500'}`} />
                <span className="text-[9px] font-mono uppercase text-zinc-500">{eng.category}</span>
              </div>
              <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                {eng.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Engine Instructions Card */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Sliders className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <span className="font-bold text-white block">
              Active Syntax Profile: {engines.find((e) => e.id === selectedEngine)?.label}
            </span>
            <span className="text-zinc-400 text-[11px]">
              {selectedEngine === 'runway' &&
                'Optimized with explicit [Camera: Vector] tags and fluid physics cues for Runway Gen-3.'}
              {selectedEngine === 'midjourney' &&
                'Includes exact aspect ratio flags (--ar 2.39:1), stylize params, and character token anchors.'}
              {selectedEngine === 'flux' &&
                'Formatted for 35mm optical realism, Arri Alexa lighting tags, and micro-texture clarity.'}
              {selectedEngine === 'kling' &&
                'Tuned for organic character physics, stable eye-lines, and natural environmental drift.'}
              {selectedEngine === 'audio' &&
                'Provides musical arrangement notes, BPM timing, synthesizer models, and foley sound design.'}
              {selectedEngine === 'elevenlabs' &&
                'Contains recommended voice IDs, emotion pacing, and speech-synthesis audition lines.'}
            </span>
          </div>
        </div>
      </div>

      {/* Shot-by-Shot Compiled Prompts List */}
      <div className="space-y-4">
        {shots.map((shot, idx) => {
          const compiledPrompt = getEnginePromptForShot(shot, selectedEngine);
          const copyId = `prompt-${shot.id}-${selectedEngine}`;

          return (
            <div
              key={shot.id || idx}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4.5 space-y-3 shadow-md hover:border-zinc-700 transition"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-2.5">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-zinc-950 bg-amber-400 px-2 py-0.5 rounded">
                    {shot.shotNumber || `Shot ${idx + 1}`}
                  </span>
                  <span className="text-xs font-semibold text-zinc-200">{shot.shotType}</span>
                  <span className="text-[11px] font-mono text-zinc-500">({shot.framingLens})</span>
                </div>

                <button
                  onClick={() => handleCopy(compiledPrompt, copyId)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition cursor-pointer"
                >
                  {copiedKey === copyId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>

              {/* Prompt Text Box */}
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-lg p-3 text-xs font-mono text-amber-200/90 leading-relaxed select-all">
                {compiledPrompt}
              </div>

              {/* Shot Context Bar */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-zinc-400">
                <div>
                  <span className="text-zinc-500">Action:</span> {shot.actionDescription}
                </div>
                {shot.dialogueOrVoiceover && (
                  <div>
                    <span className="text-zinc-500">Line:</span>{' '}
                    <span className="italic text-amber-300">"{shot.dialogueOrVoiceover}"</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Advance to Auditor CTA */}
      <div className="flex justify-end pt-4 border-t border-zinc-800">
        <button
          onClick={onAdvanceToAuditor}
          className="py-3 px-6 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm flex items-center space-x-2 transition cursor-pointer shadow-lg shadow-amber-500/20"
        >
          <span>Run Continuity & Directorial Audit</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
