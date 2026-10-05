import React, { useState } from 'react';
import {
  FilmProject,
  InterrogationResult,
  FilmTreatment,
} from '../types/film';
import {
  askDirectorInterrogation,
  generateFilmOptions,
} from '../services/api';
import {
  Sparkles,
  HelpCircle,
  Film,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Palette,
  Camera,
  Play,
  Flame,
} from 'lucide-react';

interface DiscoveryTabProps {
  project: FilmProject;
  onUpdateProject: (updated: FilmProject) => void;
  onAdvanceToCharacters: () => void;
}

export const DiscoveryTab: React.FC<DiscoveryTabProps> = ({
  project,
  onUpdateProject,
  onAdvanceToCharacters,
}) => {
  const [rawPremise, setRawPremise] = useState(
    project.logline ||
      'In a flooded subterranean megacity where synthetic memories can be weaponized, a disgraced chronometric investigator discovers their own murder scheduled for dawn.'
  );
  const [genre, setGenre] = useState(project.genre || 'Neo-Noir Cyber-Thriller');
  const [visualStyle, setVisualStyle] = useState(
    project.visualStyle || 'Arri Alexa 35mm anamorphic, Chiaroscuro neon, Blade Runner 2049 aesthetic'
  );
  const [format, setFormat] = useState(project.format || 'Cinematic Short Film (5-10 min)');

  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [interrogation, setInterrogation] = useState<InterrogationResult | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [loadingOptions, setLoadingOptions] = useState(false);
  const [treatments, setTreatments] = useState<FilmTreatment[]>([project.treatment]);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>(project.treatment.id);

  // Creative Inspiration Sparks
  const sparks = [
    {
      title: 'Subterranean Cyberpunk',
      premise: 'A disgraced memory investigator in a rain-drenched megacity finds her own murder pre-recorded on an encrypted optical disc.',
      genre: 'Neo-Noir Cyber-Thriller',
      style: '35mm anamorphic, deep cyan and amber neon rim-lighting, rain reflections',
    },
    {
      title: 'Solaris Deep Space',
      premise: 'A lone deep-space scientist at the edge of a dying star realizes the strange solar flares are physically manifesting his childhood home.',
      genre: 'Poetic Hard Sci-Fi',
      style: 'Arri 65mm, titanium white brutalism, volumetric god rays, hyper-minimalist',
    },
    {
      title: '70s Paranoia Thriller',
      premise: 'A blind audio surveillance technician intercepts a phone call detailing an assassination that already happened yesterday.',
      genre: 'Analog Psychological Thriller',
      style: 'Gritty 16mm film grain, zoom-lens tracking, muted mustard and olive tones',
    },
    {
      title: 'Ancient Biomech Odyssey',
      premise: 'A nomadic warrior in a petrified forest finds a sleeping colossus made of clockwork bone and ancient silicon.',
      genre: 'Dark Mythic Fantasy',
      style: 'Epic widescreen 2.39:1, golden hour dust motes, heavy atmospheric fog',
    },
  ];

  const handleApplySpark = (spark: typeof sparks[0]) => {
    setRawPremise(spark.premise);
    setGenre(spark.genre);
    setVisualStyle(spark.style);
  };

  const handleInterrogate = async () => {
    setLoadingQuestions(true);
    try {
      const result = await askDirectorInterrogation({
        rawPremise,
        genre,
        visualStyle,
        format,
      });
      setInterrogation(result);
      // Pre-select first option for each question
      const initialAnswers: Record<string, string> = {};
      result.questions.forEach((q) => {
        if (q.options.length > 0) {
          initialAnswers[q.id] = q.options[0].label;
        }
      });
      setAnswers(initialAnswers);
    } catch (err) {
      console.warn('Notice: Error asking interrogation questions:', err);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleSelectOption = (questionId: string, optionLabel: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionLabel }));
  };

  const handleSynthesizeOptions = async () => {
    setLoadingOptions(true);
    try {
      const res = await generateFilmOptions({
        rawPremise,
        genre,
        visualStyle,
        answers,
      });
      if (res.options && res.options.length > 0) {
        setTreatments(res.options);
        setSelectedTreatmentId(res.options[0].id);
      }
    } catch (err) {
      console.warn('Notice: Error generating treatments:', err);
    } finally {
      setLoadingOptions(false);
    }
  };

  const handleCommitTreatment = (treatment: FilmTreatment) => {
    const updated: FilmProject = {
      ...project,
      title: treatment.title,
      logline: treatment.logline,
      genre: treatment.artisticStyle,
      visualStyle: `${treatment.visualGrammar.lensChoice}, ${treatment.visualGrammar.lightingStyle}`,
      treatment,
      updatedAt: new Date().toISOString(),
    };
    onUpdateProject(updated);
    onAdvanceToCharacters();
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phase 1: Directorial Discovery & Treatment Synthesis</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Turn Your Filmmaking Intention Into Reality
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Every great AI film begins with focused directorial intent. Describe your raw idea, let
            our AI Creative Executive interrogate the dramatic, visual, and sonic core of your
            concept, and synthesize 3 production-grade treatments with tailored AI toolchains.
          </p>
        </div>
      </div>

      {/* Step 1.1: Raw Intention & Premise Intake */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Film className="w-5 h-5 text-amber-400" />
              <span>1. Define Your Raw Film Intention</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Provide your initial seed, premise, or rough idea. No matter how raw, we will shape it.
            </p>
          </div>

          <div className="text-xs text-zinc-400 font-mono">
            Target: <span className="text-amber-400 font-semibold">{format}</span>
          </div>
        </div>

        {/* Premise TextArea */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Raw Film Premise / Intention / Logline
          </label>
          <textarea
            value={rawPremise}
            onChange={(e) => setRawPremise(e.target.value)}
            rows={3}
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition"
            placeholder="e.g. A rogue deep-space archaeologist discovers that a distant asteroid's radio frequency is physically transmitting their deceased child's voice..."
          />
        </div>

        {/* Quick Creative Sparks */}
        <div className="space-y-2">
          <div className="flex items-center space-x-1.5 text-xs text-zinc-400">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Need a spark? Click a proven cinematic archetype:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {sparks.map((spark) => (
              <button
                key={spark.title}
                onClick={() => handleApplySpark(spark)}
                className="text-left p-3 rounded-lg bg-zinc-950/60 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-amber-500/40 transition group cursor-pointer"
              >
                <div className="text-xs font-bold text-white group-hover:text-amber-400 transition">
                  {spark.title}
                </div>
                <div className="text-[11px] text-zinc-400 line-clamp-2 mt-1 leading-snug">
                  {spark.premise}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Parameter Grid: Genre, Visual Style, Format */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block mb-1">
              Genre & Mood
            </label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
              placeholder="e.g. Neo-Noir Cyber-Thriller"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block mb-1">
              Cinematic Reference & Lens Style
            </label>
            <input
              type="text"
              value={visualStyle}
              onChange={(e) => setVisualStyle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
              placeholder="e.g. 35mm anamorphic, Chiaroscuro neon"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block mb-1">
              Production Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
            >
              <option value="Cinematic Short Film (5-10 min)">Cinematic Short Film (5-10 min)</option>
              <option value="High-Concept Feature Teaser (2 min)">High-Concept Feature Teaser (2 min)</option>
              <option value="Cinematic Narrative Music Video (4 min)">Cinematic Narrative Music Video (4 min)</option>
              <option value="Pilot Episode Proof-of-Concept">Pilot Episode Proof-of-Concept</option>
            </select>
          </div>
        </div>

        {/* Primary Action Button: Interrogate */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleInterrogate}
            disabled={loadingQuestions || !rawPremise.trim()}
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-sm shadow-lg shadow-amber-500/20 disabled:opacity-50 transition cursor-pointer"
          >
            {loadingQuestions ? (
              <>
                <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                <span>Interrogating Vision with AI...</span>
              </>
            ) : (
              <>
                <HelpCircle className="w-4 h-4" />
                <span>Ask Directorial Questions (Vision Discovery)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Step 1.2: Director's Interrogation Questions */}
      {interrogation && (
        <div className="bg-zinc-900/90 border border-amber-500/30 rounded-xl p-6 space-y-6 animate-in fade-in duration-300">
          <div className="border-b border-zinc-800 pb-4">
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-semibold mb-2">
              <Sparkles className="w-3 h-3" />
              <span>{interrogation.interrogationTitle}</span>
            </div>
            <p className="text-sm text-zinc-300 italic bg-zinc-950/70 p-3 rounded-lg border border-zinc-800">
              "{interrogation.visionAnalysis}"
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Select Your Directorial Preferences:</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interrogation.questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl p-4.5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {q.category}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">Q{idx + 1}</span>
                  </div>

                  <p className="text-sm font-semibold text-zinc-100">{q.question}</p>

                  <div className="space-y-2 pt-1">
                    {q.options.map((opt) => {
                      const isSelected = answers[q.id] === opt.label;
                      return (
                        <div
                          key={opt.label}
                          onClick={() => handleSelectOption(q.id, opt.label)}
                          className={`p-3 rounded-lg border text-left cursor-pointer transition ${
                            isSelected
                              ? 'bg-amber-500/10 border-amber-400/80 text-white shadow-sm shadow-amber-500/10'
                              : 'bg-zinc-900/50 border-zinc-800/80 text-zinc-300 hover:bg-zinc-900 hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-300">{opt.label}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                          </div>
                          <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                            {opt.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-zinc-800">
            <button
              onClick={handleSynthesizeOptions}
              disabled={loadingOptions}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              {loadingOptions ? (
                <>
                  <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing Treatments...</span>
                </>
              ) : (
                <>
                  <Layers className="w-4 h-4" />
                  <span>Synthesize 3 Film Treatments / Best Options</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 1.3: 3 Curated Film Treatments / Options */}
      {treatments && treatments.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <span>3. Select Your Production Treatment</span>
              </h2>
              <p className="text-xs text-zinc-400">
                Compare these 3 distinct creative spins. Choose the one that will drive your character
                design and storyboard generation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {treatments.map((treatment, idx) => {
              const isSelected = selectedTreatmentId === treatment.id;
              const labels = ['Option A: Visceral', 'Option B: Contemplative', 'Option C: Kinetic'];
              const optionTag = labels[idx] || `Option ${idx + 1}`;

              return (
                <div
                  key={treatment.id}
                  className={`flex flex-col justify-between rounded-xl border p-5 transition relative overflow-hidden ${
                    isSelected
                      ? 'bg-zinc-900 border-amber-400 ring-1 ring-amber-400/50 shadow-xl shadow-amber-500/10'
                      : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-amber-300 font-semibold border border-zinc-700">
                        {optionTag}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">
                        {treatment.visualGrammar?.aspectRatio || '2.39:1'}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-extrabold text-white tracking-tight">
                        {treatment.title}
                      </h3>
                      <p className="text-xs text-amber-400 font-medium mt-0.5">
                        {treatment.artisticStyle}
                      </p>
                    </div>

                    <p className="text-xs text-zinc-300 italic bg-zinc-900/60 p-2.5 rounded border border-zinc-800">
                      "{treatment.pitchTone}"
                    </p>

                    <div className="space-y-2">
                      <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                        Logline
                      </div>
                      <p className="text-xs text-zinc-200 leading-relaxed">{treatment.logline}</p>
                    </div>

                    {/* Cinematography & Color Palette */}
                    <div className="space-y-2 border-t border-zinc-800 pt-3">
                      <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-zinc-400">
                        <Camera className="w-3.5 h-3.5 text-zinc-300" />
                        <span>Lens & Lighting Grammar:</span>
                      </div>
                      <p className="text-[11px] text-zinc-300 font-mono">
                        {treatment.visualGrammar?.lensChoice}
                      </p>
                      <p className="text-[11px] text-zinc-400">
                        {treatment.visualGrammar?.lightingStyle}
                      </p>

                      {/* Color Swatches */}
                      {treatment.visualGrammar?.colorPalette && (
                        <div className="flex items-center space-x-1.5 pt-1">
                          <Palette className="w-3.5 h-3.5 text-zinc-400" />
                          <div className="flex space-x-1">
                            {treatment.visualGrammar.colorPalette.map((color, cIdx) => (
                              <div
                                key={cIdx}
                                className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* AI Workflow Recommendation */}
                    <div className="bg-zinc-950/70 p-3 rounded-lg border border-zinc-800/80 space-y-1">
                      <div className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold">
                        Recommended AI Toolchain:
                      </div>
                      <p className="text-[11px] text-zinc-300 leading-snug">
                        {treatment.aiWorkflowRecommendation}
                      </p>
                    </div>
                  </div>

                  {/* Commit Button */}
                  <div className="pt-5 mt-4 border-t border-zinc-800/80">
                    <button
                      onClick={() => handleCommitTreatment(treatment)}
                      className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center space-x-2 transition cursor-pointer shadow-md shadow-amber-500/20"
                    >
                      <span>Commit Treatment & Build Characters</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
