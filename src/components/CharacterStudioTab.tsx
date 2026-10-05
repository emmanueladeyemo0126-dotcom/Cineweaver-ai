import React, { useState } from 'react';
import { FilmProject, CharacterBible } from '../types/film';
import { generateCharacterBible, generateKeyframeImage } from '../services/api';
import {
  UserCheck,
  Sparkles,
  Copy,
  Check,
  Volume2,
  ShieldAlert,
  Camera,
  Layers,
  Plus,
  RefreshCw,
  Image as ImageIcon,
} from 'lucide-react';

interface CharacterStudioTabProps {
  project: FilmProject;
  onUpdateProject: (updated: FilmProject) => void;
  onAdvanceToStoryboard: () => void;
}

export const CharacterStudioTab: React.FC<CharacterStudioTabProps> = ({
  project,
  onUpdateProject,
  onAdvanceToStoryboard,
}) => {
  const characters = project.characters || [];
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(0);
  const activeCharacter: CharacterBible | undefined = characters[selectedCharacterIndex];

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [generatingNewChar, setGeneratingNewChar] = useState(false);
  const [newCharIdea, setNewCharIdea] = useState('');
  const [showNewCharModal, setShowNewCharModal] = useState(false);

  const [generatingImageIdx, setGeneratingImageIdx] = useState<number | null>(null);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleAuditionVoice = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 0.9;
      utterance.onstart = () => setIsPlayingVoice(true);
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleGenerateNewCharacter = async () => {
    setGeneratingNewChar(true);
    try {
      const res = await generateCharacterBible({
        filmTreatment: project.treatment,
        characterIdea: newCharIdea || 'Key antagonist or secondary lead',
      });
      if (res.character) {
        const newChar: CharacterBible = {
          ...res.character,
          id: `char-${Date.now()}`,
          heroImage: activeCharacter?.heroImage,
        };
        const updatedChars = [...characters, newChar];
        onUpdateProject({
          ...project,
          characters: updatedChars,
          updatedAt: new Date().toISOString(),
        });
        setSelectedCharacterIndex(updatedChars.length - 1);
        setShowNewCharModal(false);
        setNewCharIdea('');
      }
    } catch (err) {
      console.warn('Notice: Error generating character:', err);
    } finally {
      setGeneratingNewChar(false);
    }
  };

  const handleGenerateKeyframeForAngle = async (idx: number, prompt: string) => {
    setGeneratingImageIdx(idx);
    try {
      const res = await generateKeyframeImage({ prompt, aspectRatio: '16:9' });
      if (res.success && res.imageUrl && activeCharacter) {
        const updatedAnglePrompts = [...activeCharacter.multiAnglePrompts];
        updatedAnglePrompts[idx] = {
          ...updatedAnglePrompts[idx],
          previewImage: res.imageUrl,
        };
        const updatedChar: CharacterBible = {
          ...activeCharacter,
          multiAnglePrompts: updatedAnglePrompts,
        };
        const updatedChars = [...characters];
        updatedChars[selectedCharacterIndex] = updatedChar;
        onUpdateProject({
          ...project,
          characters: updatedChars,
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn('Notice: Keyframe generation error:', err);
    } finally {
      setGeneratingImageIdx(null);
    }
  };

  if (!activeCharacter) {
    return (
      <div className="p-8 text-center bg-zinc-900 border border-zinc-800 rounded-xl space-y-4">
        <UserCheck className="w-10 h-10 text-amber-400 mx-auto" />
        <h3 className="text-lg font-bold text-white">No Characters Created Yet</h3>
        <p className="text-sm text-zinc-400">
          Generate your lead protagonist with strict consistency tokens.
        </p>
        <button
          onClick={handleGenerateNewCharacter}
          disabled={generatingNewChar}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-lg text-sm"
        >
          Generate Lead Protagonist
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phase 2: Character Consistency & Identity Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Cast & Character Turnaround Studio
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Lock in facial architecture, distinctive scars, signature silhouette, and consistency
            tokens across AI image & video generators.
          </p>
        </div>

        {/* Character Tabs & Add New */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-1">
            {characters.map((char, cIdx) => (
              <button
                key={char.id || cIdx}
                onClick={() => setSelectedCharacterIndex(cIdx)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                  selectedCharacterIndex === cIdx
                    ? 'bg-amber-500 text-zinc-950 font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {char.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowNewCharModal(true)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Add Character</span>
          </button>
        </div>
      </div>

      {/* Main Character Showcase: Dossier + Hero Anchor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Hero Character Visual & Token */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
            {/* Visual Frame */}
            <div className="relative aspect-square sm:aspect-4/3 lg:aspect-square bg-zinc-950 overflow-hidden group">
              {activeCharacter.heroImage ? (
                <img
                  src={activeCharacter.heroImage}
                  alt={activeCharacter.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600">
                  <ImageIcon className="w-12 h-12" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {activeCharacter.archetype}
                  </span>
                  <h2 className="text-xl font-black text-white mt-1">{activeCharacter.name}</h2>
                </div>
                <div className="text-right">
                  <span className="text-xs text-zinc-300 font-mono">Age: {activeCharacter.age}</span>
                  <p className="text-[11px] text-amber-400 font-medium">{activeCharacter.role}</p>
                </div>
              </div>
            </div>

            {/* Anchor Token Box */}
            <div className="p-4 space-y-2 border-t border-zinc-800 bg-zinc-950/80">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Master Consistency Token</span>
                </span>
                <button
                  onClick={() =>
                    handleCopy(activeCharacter.characterAnchorToken, 'anchor-token')
                  }
                  className="inline-flex items-center space-x-1 text-[11px] px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition cursor-pointer"
                >
                  {copiedKey === 'anchor-token' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Token</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-amber-300/90 font-mono leading-relaxed select-all">
                {activeCharacter.characterAnchorToken}
              </div>

              <p className="text-[10px] text-zinc-400 leading-tight">
                Paste this token string into Midjourney (--cref or prompt header) and Runway Gen-3 to
                lock character face, hair, and wardrobe across shots.
              </p>
            </div>
          </div>

          {/* Voice Direction & Audition */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4.5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-white">
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>Voice Profile & Dialogue Direction</span>
              </div>
              <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                ElevenLabs
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Accent:</span>
                <span className="text-zinc-200 font-medium">
                  {activeCharacter.voiceProfile?.accent}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Tone:</span>
                <span className="text-zinc-200 font-medium">
                  {activeCharacter.voiceProfile?.tone}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Recommended Voice:</span>
                <span className="text-amber-400 font-mono font-medium">
                  {activeCharacter.voiceProfile?.elevenLabsVoiceRecommendation}
                </span>
              </div>
            </div>

            {/* Audition Sample Line */}
            <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 space-y-2">
              <div className="text-[10px] uppercase font-mono text-zinc-500">Audition Line</div>
              <p className="text-xs text-zinc-200 italic">
                "{activeCharacter.voiceProfile?.sampleLine}"
              </p>
              <button
                onClick={() =>
                  handleAuditionVoice(activeCharacter.voiceProfile?.sampleLine || '')
                }
                disabled={isPlayingVoice}
                className="w-full py-1.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded flex items-center justify-center space-x-1.5 transition cursor-pointer"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isPlayingVoice ? 'text-amber-400 animate-pulse' : ''}`} />
                <span>{isPlayingVoice ? 'Speaking Sample Line...' : 'Audition Voice (Speech Synth)'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (2 cols): Physical Specs, Continuity Rules & Multi-Angle Matrix */}
        <div className="lg:col-span-2 space-y-6">
          {/* Physical & Wardrobe Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                Physical Facial Architecture
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/70 p-3 rounded-lg border border-zinc-800">
                {activeCharacter.physicalSignature}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                Signature Wardrobe & Props
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/70 p-3 rounded-lg border border-zinc-800">
                {activeCharacter.wardrobeSignature}
              </p>
            </div>
          </div>

          {/* Strict Continuity Checklist */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200 font-mono">
                Mandatory Continuity Rules for Every Generation
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeCharacter.continuityRules?.map((rule, rIdx) => (
                <div
                  key={rIdx}
                  className="flex items-start space-x-2 text-xs text-zinc-300 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800/80"
                >
                  <span className="text-amber-400 font-bold font-mono text-[10px] mt-0.5">
                    #{rIdx + 1}
                  </span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-Angle Turnaround Prompts Matrix */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-amber-400" />
                  <span>Multi-Angle Consistency Turnaround Matrix</span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Generate these 4 key angles first to feed Midjourney --cref or Runway character seeds.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCharacter.multiAnglePrompts?.map((angleItem, aIdx) => {
                const isGenerating = generatingImageIdx === aIdx;
                return (
                  <div
                    key={angleItem.angle}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col justify-between"
                  >
                    {/* Visual Preview */}
                    <div className="relative aspect-16/9 bg-zinc-950 overflow-hidden group">
                      {angleItem.previewImage ? (
                        <img
                          src={angleItem.previewImage}
                          alt={angleItem.angle}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 space-y-1">
                          <ImageIcon className="w-8 h-8" />
                          <span className="text-[10px] font-mono">No Keyframe Rendered</span>
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-950/80 text-amber-300 border border-zinc-800 font-semibold backdrop-blur-sm">
                          {angleItem.angle}
                        </span>
                      </div>
                    </div>

                    {/* Prompt & Action */}
                    <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono uppercase text-zinc-400">
                          Production Prompt
                        </div>
                        <p className="text-xs text-zinc-200 line-clamp-3 font-mono leading-relaxed bg-zinc-950 p-2 rounded border border-zinc-800">
                          {angleItem.prompt}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 pt-1">
                        <button
                          onClick={() => handleCopy(angleItem.prompt, `angle-${aIdx}`)}
                          className="flex-1 py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded flex items-center justify-center space-x-1.5 transition cursor-pointer"
                        >
                          {copiedKey === `angle-${aIdx}` ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Prompt</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleGenerateKeyframeForAngle(aIdx, angleItem.prompt)}
                          disabled={isGenerating}
                          className="py-1.5 px-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold rounded flex items-center justify-center space-x-1 transition cursor-pointer"
                          title="Generate Keyframe with Gemini Image API"
                        >
                          <RefreshCw
                            className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`}
                          />
                          <span>{isGenerating ? 'Rendering...' : 'Render'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Advance to Storyboard CTA */}
          <div className="flex justify-end pt-4 border-t border-zinc-800">
            <button
              onClick={onAdvanceToStoryboard}
              className="py-3 px-6 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm flex items-center space-x-2 transition cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <span>Proceed to Storyboard & Shot Matrix</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Generate New Character */}
      {showNewCharModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Create Co-Star / Antagonist</span>
              </h3>
              <button
                onClick={() => setShowNewCharModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                Character Concept or Role
              </label>
              <textarea
                value={newCharIdea}
                onChange={(e) => setNewCharIdea(e.target.value)}
                rows={3}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                placeholder="e.g. A cybernetic black-market dealer who wears an antique chrome respirator mask and knows Elena's past..."
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowNewCharModal(false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateNewCharacter}
                disabled={generatingNewChar}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-lg flex items-center space-x-1.5"
              >
                {generatingNewChar ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Synthesizing Character...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Character Bible</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
