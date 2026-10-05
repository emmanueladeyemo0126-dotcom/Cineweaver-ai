import React, { useState } from 'react';
import { FilmProject } from '../types/film';
import {
  BookOpen,
  Download,
  Printer,
  Copy,
  Check,
  Camera,
  Film,
  User,
  Music,
  ShieldCheck,
  Palette,
} from 'lucide-react';

interface ProductionBibleTabProps {
  project: FilmProject;
}

export const ProductionBibleTab: React.FC<ProductionBibleTabProps> = ({ project }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const generateMarkdownBible = (): string => {
    const p = project;
    const t = p.treatment;
    const c = p.characters[0];

    return `# FILM PRODUCTION BIBLE: ${p.title}
*A Production Blueprint for AI Filmmaking*

## 1. EXECUTIVE PITCH & LOGLINE
- **Genre & Style:** ${t.artisticStyle}
- **Target Format:** ${p.format}
- **Logline:** ${t.logline}
- **Tone Pitch:** ${t.pitchTone}
- **Core Conflict:** ${t.coreConflict}
- **Pacing Rhythm:** ${t.pacingStyle}

---

## 2. CINEMATOGRAPHY & LOOKBOOK GRAMMAR
- **Aspect Ratio:** ${t.visualGrammar?.aspectRatio || '2.39:1'}
- **Optics & Lens Package:** ${t.visualGrammar?.lensChoice}
- **Lighting Atmosphere:** ${t.visualGrammar?.lightingStyle}
- **Color Palette Hex:** ${t.visualGrammar?.colorPalette?.join(', ')}
- **Recommended AI Toolchain:** ${t.aiWorkflowRecommendation}

---

## 3. LEAD CHARACTER DOSSIER & CONSISTENCY ANCHOR
- **Character Name:** ${c?.name} (${c?.role})
- **Archetype & Age:** ${c?.archetype} | Age: ${c?.age}
- **Facial Architecture:** ${c?.physicalSignature}
- **Signature Wardrobe:** ${c?.wardrobeSignature}
- **Master Anchor Token:** \`${c?.characterAnchorToken}\`
- **Voice Recommendation:** ${c?.voiceProfile?.elevenLabsVoiceRecommendation} (${c?.voiceProfile?.accent})

---

## 4. SHOT-BY-SHOT PRODUCTION MATRIX
${p.shots
  .map(
    (s, idx) => `
### ${s.shotNumber || `Shot ${idx + 1}`}: ${s.shotType}
- **Lens:** ${s.framingLens}
- **Camera Movement:** ${s.cameraMovement}
- **Lighting:** ${s.lightingAtmosphere}
- **Action:** ${s.actionDescription}
${s.dialogueOrVoiceover ? `- **Dialogue:** "${s.dialogueOrVoiceover}"` : ''}
- **Sound / Foley:** ${s.soundDesignFoley}
- **Midjourney/Flux Prompt:** \`${s.compiledPrompts?.midjourneyFlux}\`
- **Runway/Kling Prompt:** \`${s.compiledPrompts?.runwayKlingVideo}\`
`
  )
  .join('\n')}

---
*Generated with CineWeaver AI Filmmaker Studio*
`;
  };

  const handleDownloadMarkdown = () => {
    const md = generateMarkdownBible();
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title.toLowerCase().replace(/\s+/g, '_')}_production_bible.md`;
    a.click();
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title.toLowerCase().replace(/\s+/g, '_')}_project.json`;
    a.click();
  };

  const t = project.treatment;
  const heroChar = project.characters[0];

  return (
    <div className="space-y-10 pb-16 print:space-y-4 print:text-black">
      {/* Header Banner - hidden on print */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5 print:hidden">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Phase 6: Master Production Bible</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Film Production Bible & Export Suite
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Export a comprehensive production deck, shotlist, and character bible ready for production.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Markdown (.md)</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Project (.json)</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold shadow-md cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Master Document */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-10 space-y-8 shadow-2xl print:bg-white print:border-none print:p-0 print:shadow-none">
        {/* Cover / Title */}
        <div className="border-b border-zinc-800 print:border-zinc-300 pb-6 space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-400 print:text-zinc-600 font-bold">
            Official Production Bible & Director's Deck
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white print:text-black tracking-tight">
            {project.title}
          </h1>
          <p className="text-sm font-semibold text-amber-300 print:text-zinc-700">
            {t?.artisticStyle} • {project.format}
          </p>
          <p className="text-sm text-zinc-300 print:text-zinc-800 italic pt-1">
            "{t?.pitchTone}"
          </p>
        </div>

        {/* Section 1: Executive Overview */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-white print:text-black uppercase tracking-wider font-mono flex items-center space-x-2">
            <Film className="w-4 h-4 text-amber-400" />
            <span>1. Executive Overview & Narrative Core</span>
          </h2>
          <div className="bg-zinc-950/80 print:bg-zinc-50 border border-zinc-800 print:border-zinc-200 rounded-xl p-4.5 space-y-3">
            <div>
              <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold">
                Logline
              </span>
              <p className="text-sm text-zinc-200 print:text-black leading-relaxed mt-0.5">
                {t?.logline}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/80 print:border-zinc-200">
              <div>
                <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold">
                  Core Dramatic Conflict
                </span>
                <p className="text-xs text-zinc-300 print:text-zinc-800 mt-0.5">
                  {t?.coreConflict}
                </p>
              </div>
              <div>
                <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold">
                  Pacing Rhythm & Structure
                </span>
                <p className="text-xs text-zinc-300 print:text-zinc-800 mt-0.5">
                  {t?.pacingStyle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Cinematography & Lookbook Grammar */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-white print:text-black uppercase tracking-wider font-mono flex items-center space-x-2">
            <Camera className="w-4 h-4 text-amber-400" />
            <span>2. Cinematography Specification & Lookbook</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-zinc-950/80 print:bg-zinc-50 border border-zinc-800 print:border-zinc-200 rounded-xl p-3.5 space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400">Optics & Lenses</span>
              <p className="text-xs font-semibold text-zinc-200 print:text-black font-mono">
                {t?.visualGrammar?.lensChoice}
              </p>
            </div>

            <div className="bg-zinc-950/80 print:bg-zinc-50 border border-zinc-800 print:border-zinc-200 rounded-xl p-3.5 space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400">Aspect Ratio</span>
              <p className="text-xs font-semibold text-amber-400 print:text-black font-mono">
                {t?.visualGrammar?.aspectRatio || '2.39:1'} Anamorphic
              </p>
            </div>

            <div className="bg-zinc-950/80 print:bg-zinc-50 border border-zinc-800 print:border-zinc-200 rounded-xl p-3.5 space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400">Color Palette</span>
              <div className="flex space-x-1.5 pt-1">
                {t?.visualGrammar?.colorPalette?.map((c, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Lead Character Dossier */}
        {heroChar && (
          <div className="space-y-3">
            <h2 className="text-base font-bold text-white print:text-black uppercase tracking-wider font-mono flex items-center space-x-2">
              <User className="w-4 h-4 text-amber-400" />
              <span>3. Lead Character Consistency Dossier</span>
            </h2>
            <div className="bg-zinc-950/80 print:bg-zinc-50 border border-zinc-800 print:border-zinc-200 rounded-xl p-4.5 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800 print:border-zinc-200 pb-2">
                <div>
                  <h3 className="text-lg font-black text-white print:text-black">
                    {heroChar.name}
                  </h3>
                  <p className="text-xs text-amber-400 print:text-zinc-600 font-medium">
                    {heroChar.role} ({heroChar.archetype}) • Age {heroChar.age}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase text-zinc-400 font-bold">
                  Master Consistency Anchor Token:
                </span>
                <div className="bg-zinc-900 print:bg-zinc-100 p-2.5 rounded border border-zinc-800 print:border-zinc-300 text-xs font-mono text-amber-300 print:text-black mt-1">
                  {heroChar.characterAnchorToken}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-semibold text-zinc-400">Facial Architecture:</span>
                  <p className="text-zinc-300 print:text-black mt-0.5">
                    {heroChar.physicalSignature}
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-zinc-400">Costume & Signature Props:</span>
                  <p className="text-zinc-300 print:text-black mt-0.5">
                    {heroChar.wardrobeSignature}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Shot-by-Shot Schedule & Technical Board */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white print:text-black uppercase tracking-wider font-mono flex items-center space-x-2">
            <Film className="w-4 h-4 text-amber-400" />
            <span>4. Master Shotlist & Production Schedule</span>
          </h2>

          <div className="divide-y divide-zinc-800 print:divide-zinc-200 border border-zinc-800 print:border-zinc-200 rounded-xl overflow-hidden">
            {project.shots.map((shot, idx) => (
              <div key={shot.id || idx} className="p-4 bg-zinc-950/60 print:bg-white space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold bg-amber-400 text-zinc-950 px-2 py-0.5 rounded">
                      {shot.shotNumber || `Shot ${idx + 1}`}
                    </span>
                    <span className="text-xs font-bold text-white print:text-black">
                      {shot.shotType}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">({shot.framingLens})</span>
                  </div>
                  <span className="text-xs font-mono text-amber-300 print:text-zinc-600">
                    Vector: {shot.cameraMovement}
                  </span>
                </div>

                <p className="text-xs text-zinc-200 print:text-black">{shot.actionDescription}</p>

                {shot.dialogueOrVoiceover && (
                  <p className="text-xs italic text-amber-300 print:text-zinc-800 border-l-2 border-amber-400 pl-2">
                    "{shot.dialogueOrVoiceover}"
                  </p>
                )}

                <div className="text-[11px] text-zinc-400 pt-1 font-mono">
                  <span className="text-zinc-500">Audio/Foley:</span> {shot.soundDesignFoley}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
