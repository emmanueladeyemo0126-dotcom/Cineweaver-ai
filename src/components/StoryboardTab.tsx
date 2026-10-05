import React, { useState } from 'react';
import { FilmProject, Shot } from '../types/film';
import { generateStoryboardBreakdown, generateKeyframeImage } from '../services/api';
import {
  LayoutGrid,
  Sparkles,
  Camera,
  Film,
  Move,
  Sun,
  Volume2,
  Copy,
  Check,
  RefreshCw,
  Plus,
  Trash2,
  Grid,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface StoryboardTabProps {
  project: FilmProject;
  onUpdateProject: (updated: FilmProject) => void;
  onAdvanceToPrompts: () => void;
}

export const StoryboardTab: React.FC<StoryboardTabProps> = ({
  project,
  onUpdateProject,
  onAdvanceToPrompts,
}) => {
  const shots = project.shots || [];
  const [scenePrompt, setScenePrompt] = useState(
    'Scene 01: Elena meets the masked Broker on a rain-swept maintenance walkway above the flooded canal to retrieve the memory crystal, only to trigger an ambush.'
  );
  const [breakingDown, setBreakingDown] = useState(false);
  const [showGridOverlay, setShowGridOverlay] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [renderingShotId, setRenderingShotId] = useState<string | null>(null);
  const [editingShotId, setEditingShotId] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleBreakdownScene = async () => {
    setBreakingDown(true);
    try {
      const res = await generateStoryboardBreakdown({
        sceneDescription: scenePrompt,
        visualGrammar: project.treatment?.visualGrammar,
        characters: project.characters,
        targetAIEngine: 'Runway Gen-3 + Midjourney v6.1 + Flux.1',
      });
      if (res.shots && res.shots.length > 0) {
        const enrichedShots: Shot[] = res.shots.map((shot, idx) => ({
          ...shot,
          id: `shot-${Date.now()}-${idx}`,
          keyframeImage: shots[idx]?.keyframeImage || undefined,
        }));
        onUpdateProject({
          ...project,
          shots: enrichedShots,
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn('Notice: Storyboard breakdown error:', err);
    } finally {
      setBreakingDown(false);
    }
  };

  const handleRenderKeyframe = async (shot: Shot) => {
    setRenderingShotId(shot.id);
    try {
      const res = await generateKeyframeImage({
        prompt: shot.compiledPrompts.midjourneyFlux,
        aspectRatio: project.treatment?.visualGrammar?.aspectRatio === '2.39:1' ? '16:9' : '16:9',
      });
      if (res.success && res.imageUrl) {
        const updatedShots = shots.map((s) =>
          s.id === shot.id ? { ...s, keyframeImage: res.imageUrl } : s
        );
        onUpdateProject({
          ...project,
          shots: updatedShots,
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn('Notice: Render keyframe error:', err);
    } finally {
      setRenderingShotId(null);
    }
  };

  const handleDeleteShot = (shotId: string) => {
    const updated = shots.filter((s) => s.id !== shotId);
    onUpdateProject({
      ...project,
      shots: updated,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleAddCustomShot = () => {
    const newShot: Shot = {
      id: `shot-${Date.now()}`,
      shotNumber: `Shot ${shots.length + 1}`,
      shotType: 'Close-Up',
      framingLens: '50mm Prime f/1.8',
      cameraMovement: 'Slow push in 3s',
      lightingAtmosphere: 'High contrast key light, soft fill',
      actionDescription: 'Character reacts to the sudden silence.',
      dialogueOrVoiceover: null,
      soundDesignFoley: 'Wind gust and heartbeat pulse',
      compiledPrompts: {
        midjourneyFlux: `Cinematic close-up of ${project.characters[0]?.characterAnchorToken || 'protagonist'}, high drama --ar 2.39:1`,
        runwayKlingVideo: 'Slow camera push in on character face, intense emotional reaction, 4k 24fps',
      },
      continuityNote: 'Check eye-line direction matches previous shot.',
    };
    onUpdateProject({
      ...project,
      shots: [...shots, newShot],
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phase 3: Cinematic Storyboard & Framing Matrix</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Director's Shotlist & Storyboard
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Define camera focal length, motion vectors, lighting grammar, and action for each shot.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Rule of Thirds Overlay Toggle */}
          <button
            onClick={() => setShowGridOverlay(!showGridOverlay)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center space-x-1.5 cursor-pointer transition ${
              showGridOverlay
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Rule of Thirds: {showGridOverlay ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={handleAddCustomShot}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Add Shot</span>
          </button>
        </div>
      </div>

      {/* AI Scene Breakdown Generator Box */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-5 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <div className="flex items-center space-x-2">
            <Film className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              AI Scene-to-Shot Breakdown Engine
            </h2>
          </div>
          <span className="text-xs text-zinc-400 font-mono">
            Aspect: <span className="text-amber-400">{project.treatment?.visualGrammar?.aspectRatio || '2.39:1'}</span>
          </span>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
            Scene Narrative & Dramatic Goal
          </label>
          <textarea
            value={scenePrompt}
            onChange={(e) => setScenePrompt(e.target.value)}
            rows={2}
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-sans"
            placeholder="Describe what happens in this scene, the dramatic climax, and emotional beats..."
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleBreakdownScene}
            disabled={breakingDown || !scenePrompt.trim()}
            className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center space-x-2 transition shadow-md shadow-amber-500/20 cursor-pointer disabled:opacity-50"
          >
            {breakingDown ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Directing 5-Shot Sequence with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Shot Breakdown & Camera Directions</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Shot Cards Matrix */}
      <div className="space-y-6">
        {shots.map((shot, idx) => {
          const isRendering = renderingShotId === shot.id;
          const isEditing = editingShotId === shot.id;

          return (
            <div
              key={shot.id || idx}
              className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl hover:border-zinc-700 transition"
            >
              {/* Shot Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-zinc-950 border-b border-zinc-800">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono font-black text-zinc-950 bg-amber-400 px-2.5 py-0.5 rounded">
                    {shot.shotNumber || `Shot ${idx + 1}`}
                  </span>
                  <span className="text-xs font-semibold text-zinc-200 uppercase tracking-wide">
                    {shot.shotType}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-xs">
                  <button
                    onClick={() => setEditingShotId(isEditing ? null : shot.id)}
                    className="px-2.5 py-1 text-[11px] rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition cursor-pointer"
                  >
                    {isEditing ? 'Done Editing' : 'Edit Specs'}
                  </button>
                  <button
                    onClick={() => handleDeleteShot(shot.id)}
                    className="p-1 text-zinc-500 hover:text-rose-400 transition cursor-pointer"
                    title="Delete Shot"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Shot Content: Viewport (Left) + Directorial Specs (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
                {/* Cinema Viewport (Col 5) */}
                <div className="lg:col-span-5 bg-black p-4 flex flex-col justify-center">
                  <div className="relative aspect-16/9 bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 shadow-2xl group">
                    {/* Keyframe Image */}
                    {shot.keyframeImage ? (
                      <img
                        src={shot.keyframeImage}
                        alt={shot.shotNumber}
                        className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 space-y-2 p-4 text-center">
                        <Camera className="w-10 h-10 text-zinc-700" />
                        <span className="text-[11px] font-mono text-zinc-500">
                          Framing: {shot.framingLens}
                        </span>
                      </div>
                    )}

                    {/* Rule of Thirds Cinematic Grid Overlay */}
                    {showGridOverlay && (
                      <div className="absolute inset-0 pointer-events-none opacity-25">
                        {/* Vertical Lines */}
                        <div className="absolute top-0 bottom-0 left-1/3 w-px bg-amber-400/80" />
                        <div className="absolute top-0 bottom-0 left-2/3 w-px bg-amber-400/80" />
                        {/* Horizontal Lines */}
                        <div className="absolute left-0 right-0 top-1/3 h-px bg-amber-400/80" />
                        <div className="absolute left-0 right-0 top-2/3 h-px bg-amber-400/80" />
                        {/* Center Reticle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-amber-400/60 rounded-full" />
                      </div>
                    )}

                    {/* Aspect Ratio Badge */}
                    <div className="absolute top-2 left-2 pointer-events-none">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-950/80 text-amber-300 font-semibold border border-zinc-800 backdrop-blur-sm">
                        {project.treatment?.visualGrammar?.aspectRatio || '2.39:1'}
                      </span>
                    </div>

                    {/* Render Keyframe Floating Button */}
                    <div className="absolute bottom-2 right-2">
                      <button
                        onClick={() => handleRenderKeyframe(shot)}
                        disabled={isRendering}
                        className="px-2.5 py-1 text-[11px] font-semibold bg-amber-500/90 hover:bg-amber-400 text-zinc-950 rounded shadow-md flex items-center space-x-1 transition cursor-pointer backdrop-blur-sm"
                      >
                        <RefreshCw className={`w-3 h-3 ${isRendering ? 'animate-spin' : ''}`} />
                        <span>{isRendering ? 'Rendering...' : 'Render Keyframe'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Directorial Specs & Script Details (Col 7) */}
                <div className="lg:col-span-7 p-5 space-y-4">
                  {/* Technical Direction Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {/* Lens */}
                    <div className="bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-800">
                      <div className="flex items-center space-x-1 text-[10px] font-mono text-zinc-400 uppercase">
                        <Camera className="w-3 h-3 text-amber-400" />
                        <span>Optics & Lens</span>
                      </div>
                      <p className="text-xs font-bold text-zinc-200 font-mono mt-0.5">
                        {shot.framingLens}
                      </p>
                    </div>

                    {/* Camera Movement */}
                    <div className="bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-800">
                      <div className="flex items-center space-x-1 text-[10px] font-mono text-zinc-400 uppercase">
                        <Move className="w-3 h-3 text-amber-400" />
                        <span>Camera Vector</span>
                      </div>
                      <p className="text-xs font-semibold text-zinc-200 mt-0.5 line-clamp-1">
                        {shot.cameraMovement}
                      </p>
                    </div>

                    {/* Lighting */}
                    <div className="bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-800">
                      <div className="flex items-center space-x-1 text-[10px] font-mono text-zinc-400 uppercase">
                        <Sun className="w-3 h-3 text-amber-400" />
                        <span>Lighting Atmos</span>
                      </div>
                      <p className="text-xs font-semibold text-zinc-200 mt-0.5 line-clamp-1">
                        {shot.lightingAtmosphere}
                      </p>
                    </div>
                  </div>

                  {/* Action & Dialogue */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase text-zinc-400 font-semibold">
                      Script Action & Direction
                    </div>
                    <p className="text-xs text-zinc-200 leading-relaxed bg-zinc-950/50 p-2.5 rounded-lg border border-zinc-800">
                      {shot.actionDescription}
                    </p>

                    {shot.dialogueOrVoiceover && (
                      <div className="bg-zinc-950 p-2.5 rounded-lg border-l-2 border-amber-400 text-xs italic text-amber-200">
                        {shot.dialogueOrVoiceover}
                      </div>
                    )}
                  </div>

                  {/* Sound Design & Foley */}
                  <div className="flex items-start space-x-2 text-xs text-zinc-400 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800/80">
                    <Volume2 className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-mono text-[10px] uppercase text-zinc-500 block">
                        Foley & Score Cue:
                      </span>
                      <span className="text-zinc-300">{shot.soundDesignFoley}</span>
                    </div>
                  </div>

                  {/* Continuity Note */}
                  {shot.continuityNote && (
                    <div className="text-[11px] text-amber-300/90 bg-amber-500/5 px-2.5 py-1.5 rounded border border-amber-500/20 font-mono">
                      <span className="font-bold">Continuity Watch:</span> {shot.continuityNote}
                    </div>
                  )}

                  {/* Fast Prompt Copy Buttons */}
                  <div className="flex items-center space-x-2 pt-1 border-t border-zinc-800">
                    <button
                      onClick={() =>
                        handleCopy(shot.compiledPrompts?.midjourneyFlux || '', `mj-${shot.id}`)
                      }
                      className="flex-1 py-1.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded flex items-center justify-center space-x-1.5 transition cursor-pointer"
                    >
                      {copiedKey === `mj-${shot.id}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied MJ / Flux Prompt!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Copy Image Prompt</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        handleCopy(shot.compiledPrompts?.runwayKlingVideo || '', `runway-${shot.id}`)
                      }
                      className="flex-1 py-1.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded flex items-center justify-center space-x-1.5 transition cursor-pointer"
                    >
                      {copiedKey === `runway-${shot.id}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied Video Prompt!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-amber-400" />
                          <span>Copy Runway Video Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Advance to Prompt Hub CTA */}
      <div className="flex justify-end pt-4 border-t border-zinc-800">
        <button
          onClick={onAdvanceToPrompts}
          className="py-3 px-6 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm flex items-center space-x-2 transition cursor-pointer shadow-lg shadow-amber-500/20"
        >
          <span>Open Multi-Engine Prompt Hub</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
