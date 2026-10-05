import React, { useState, useEffect } from 'react';
import { TrendingMovie, FilmProject, ReverseEngineerStrategy } from '../types/film';
import { researchTrendingFilms, reverseEngineerTrendingFilm } from '../services/api';
import { CINEMATIC_ASSETS } from '../assets/sampleAssets';
import {
  Flame,
  Search,
  Sparkles,
  RefreshCw,
  Wand2,
  Film,
  Eye,
  TrendingUp,
  Cpu,
  Layers,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Globe2,
  Tv,
  AlertCircle,
  CheckCircle2,
  Sliders,
  Zap,
  Award,
  Video,
  Play,
  HeartHandshake,
} from 'lucide-react';

interface TrendRadarTabProps {
  onLoadProject: (project: FilmProject) => void;
  onNavigateToStoryboard: () => void;
}

export const TrendRadarTab: React.FC<TrendRadarTabProps> = ({
  onLoadProject,
  onNavigateToStoryboard,
}) => {
  const [activeCulture, setActiveCulture] = useState<string>('All');
  const [activeChannel, setActiveChannel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [trends, setTrends] = useState<TrendingMovie[]>([]);
  const [selectedMovieForReverse, setSelectedMovieForReverse] = useState<TrendingMovie | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Reverse Engineering / Make It Better State
  const [strategy, setStrategy] = useState<ReverseEngineerStrategy['strategy']>('Elevate & Prestige');
  const [targetCulture, setTargetCulture] = useState('Global / Universal');
  const [targetChannel, setTargetChannel] = useState('YouTube Cinema');
  const [customDirection, setCustomDirection] = useState('');
  const [isReverseEngineering, setIsReverseEngineering] = useState(false);

  // Map preview images to cultural cinematic assets
  const getMovieImage = (movie: TrendingMovie, idx: number) => {
    if (movie.culture === 'Bollywood & South Asian' || movie.category === 'Bollywood Epic') {
      return CINEMATIC_ASSETS.bollywoodEpic;
    }
    if (movie.culture === 'East Asian & K-Drama' || movie.category === 'K-Drama & Asian Cinema') {
      return CINEMATIC_ASSETS.kdramaNoir;
    }
    if (movie.culture === 'Nollywood & African' || movie.category === 'The Billionaire Trope') {
      return idx % 2 === 0 ? CINEMATIC_ASSETS.africanBillionaire : CINEMATIC_ASSETS.africanQueenAction;
    }
    if (movie.category === 'Hollywood High-Concept' || movie.culture === 'Hollywood & Western') {
      return CINEMATIC_ASSETS.heroShot;
    }
    return CINEMATIC_ASSETS.storyboardWide;
  };

  const fetchTrends = async (
    cult = activeCulture,
    chan = activeChannel,
    query = searchQuery
  ) => {
    setLoading(true);
    try {
      const res = await researchTrendingFilms({
        culture: cult,
        channel: chan,
        customQuery: query,
      });
      if (res && res.trends) {
        setTrends(res.trends);
      }
    } catch (err) {
      console.warn('Notice: Error fetching trends:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  const handleCultureFilter = (cult: string) => {
    setActiveCulture(cult);
    fetchTrends(cult, activeChannel, searchQuery);
  };

  const handleChannelFilter = (chan: string) => {
    setActiveChannel(chan);
    fetchTrends(activeCulture, chan, searchQuery);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrends(activeCulture, activeChannel, searchQuery);
  };

  const handleOpenReverseEngineer = (movie: TrendingMovie) => {
    setSelectedMovieForReverse(movie);
    setTargetCulture(movie.culture);
    setTargetChannel(movie.targetChannel || 'YouTube Cinema');
    setCustomDirection(
      `Eliminate amateur AI flaws from the viral video: upgrade to Panavision 2.39:1 anamorphic cinematography, write razor-sharp dialogue with dramatic subtext, lock character consistency token, and compose an authentic cultural score.`
    );
  };

  const handleExecuteReverseEngineering = async () => {
    if (!selectedMovieForReverse) return;
    setIsReverseEngineering(true);
    try {
      const res = await reverseEngineerTrendingFilm({
        trendingMovie: selectedMovieForReverse,
        strategy,
        cultureTarget: targetCulture,
        channelTarget: targetChannel,
        customDirection,
      });

      if (res && res.project) {
        const enrichedProject: FilmProject = {
          ...res.project,
          id: `proj-rev-${Date.now()}`,
          updatedAt: new Date().toISOString(),
        };

        // Attach appropriate cultural hero image
        if (enrichedProject.characters && enrichedProject.characters[0]) {
          enrichedProject.characters[0].heroImage = getMovieImage(selectedMovieForReverse, 0);
        }

        // Attach keyframe images to shots
        if (enrichedProject.shots) {
          enrichedProject.shots = enrichedProject.shots.map((shot, sIdx) => ({
            ...shot,
            keyframeImage:
              sIdx === 0
                ? getMovieImage(selectedMovieForReverse, 0)
                : sIdx === 4
                ? CINEMATIC_ASSETS.storyboardWide
                : undefined,
          }));
        }

        onLoadProject(enrichedProject);
        setSelectedMovieForReverse(null);
        onNavigateToStoryboard();
      }
    } catch (err) {
      console.warn('Notice: Error executing reverse engineering:', err);
    } finally {
      setIsReverseEngineering(false);
    }
  };

  const cultures = [
    { id: 'All', label: '🌐 All Global Cultures' },
    { id: 'Bollywood & South Asian', label: '🇮🇳 Bollywood & South Asian' },
    { id: 'Hollywood & Western', label: '🇺🇸 Hollywood & Western' },
    { id: 'Nollywood & African', label: '🇳🇬 Nollywood & African' },
    { id: 'East Asian & K-Drama', label: '🇰🇷 East Asian & K-Drama' },
    { id: 'Latin American', label: '🇨🇴 Latin American Cinema' },
    { id: 'European & Nordic Noir', label: '🇪🇺 European & Nordic Noir' },
  ];

  const channels = [
    { id: 'All', label: 'All Channels / Formats' },
    { id: 'YouTube Cinema', label: 'YouTube Cinema & Pilot' },
    { id: 'TikTok & Reels', label: 'TikTok / Reels Viral' },
    { id: 'Film Festival', label: 'AI Film Festival' },
    { id: 'Streaming Pitch', label: 'Streaming Series Pitch' },
  ];

  const filteredTrends = trends.filter((t) => {
    const matchesCulture =
      activeCulture === 'All' ||
      t.culture === activeCulture ||
      t.genre.toLowerCase().includes(activeCulture.toLowerCase());
    const matchesChannel =
      activeChannel === 'All' ||
      t.targetChannel === activeChannel ||
      !t.targetChannel;
    return matchesCulture && matchesChannel;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner: Global Scope & Make It Better Engine */}
      <div className="bg-gradient-to-r from-zinc-900 via-amber-950/20 to-zinc-950 border border-amber-500/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Global AI Trend Radar • The "Make The Best Better" Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Research Any Trending Movie Across Any Culture — Then Make It 10x Better
          </h1>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Whether it’s a <strong>Bollywood mythological epic</strong> with 40M views, a <strong>viral African billionaire status-reversal</strong>, a <strong>rain-drenched Korean revenge thriller</strong>, or a <strong>high-concept Hollywood sci-fi trailer</strong>:
            our mission is to extract the viral retention hook, diagnose every amateur AI flaw, and reverse engineer it into an original, elevated masterpiece.
          </p>
        </div>
      </div>

      {/* Control Center: Search, Culture Filter, and Channel Selector */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-5 space-y-4 shadow-xl">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trending AI films in any genre or culture (e.g. 'Bollywood mythological AI', 'Korean revenge noir', 'Hollywood A24 trailer', 'Billionaire in Africa')..."
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-lg flex items-center justify-center space-x-2 transition shadow-md shadow-amber-500/20 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Scanning Global AI Radar...' : 'Scan Global Radar'}</span>
          </button>
        </form>

        {/* Culture Row */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 font-bold block">
            Filter by Film Culture & Tradition:
          </span>
          <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {cultures.map((c) => {
              const isSelected = activeCulture === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => handleCultureFilter(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                      : 'bg-zinc-950/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Channel Row */}
        <div className="space-y-1.5 pt-1 border-t border-zinc-800/80">
          <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 font-bold block">
            Target Platform / Channel Audience:
          </span>
          <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {channels.map((chan) => {
              const isSelected = activeChannel === chan.id;
              return (
                <button
                  key={chan.id}
                  onClick={() => handleChannelFilter(chan.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-100 text-zinc-950 font-bold shadow-md'
                      : 'bg-zinc-950/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80'
                  }`}
                >
                  {chan.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Radar Section Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Globe2 className="w-5 h-5 text-amber-400" />
            <span>Trending Films on Radar ({filteredTrends.length} Active Breakdowns)</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Deconstruct their viral retention formulas, diagnose amateur AI flaws, and execute the "Make It Better" upgrade.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTrends.map((movie, idx) => {
          const isExpanded = expandedCardId === movie.id;
          const movieImage = getMovieImage(movie, idx);

          return (
            <div
              key={movie.id || idx}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/40 transition flex flex-col justify-between group"
            >
              <div>
                {/* Visual Header */}
                <div className="relative aspect-16/9 bg-zinc-950 overflow-hidden">
                  <img
                    src={movieImage}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-zinc-950/80 text-amber-300 font-bold border border-zinc-800 backdrop-blur-md">
                      {movie.culture}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-rose-500/90 text-white shadow-md flex items-center space-x-1">
                      <Flame className="w-3 h-3" />
                      <span>{movie.viralStats}</span>
                    </span>
                  </div>

                  {/* Bottom Title on Image */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center space-x-2 text-[11px] font-mono text-zinc-300">
                      <span>{movie.regionOrCulturalContext}</span>
                      <span>•</span>
                      <span className="text-amber-400">{movie.targetChannel || 'YouTube Cinema'}</span>
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight drop-shadow-md mt-0.5">
                      {movie.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4">
                  {/* The 3-Second Viral Hook */}
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 space-y-1">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold flex items-center space-x-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>The Viral Hook That Arrested Attention:</span>
                    </div>
                    <p className="text-xs text-amber-200/90 leading-relaxed font-medium">
                      "{movie.viralHook}"
                    </p>
                  </div>

                  {/* Premise */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 font-bold">
                      Viral Premise / Logline
                    </span>
                    <p className="text-xs text-zinc-200 leading-relaxed">{movie.logline}</p>
                  </div>

                  {/* Flaw Diagnosis & Make It Better Breakdown */}
                  {movie.deconstructedFormula?.originalFlawsToOvercome && (
                    <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3.5 space-y-2.5">
                      <div className="flex items-center space-x-1.5 text-rose-400 text-xs font-bold font-mono">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Flaws in the Viral Video to Eliminate:</span>
                      </div>
                      <div className="space-y-1">
                        {movie.deconstructedFormula.originalFlawsToOvercome.map((flaw, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-start space-x-2 text-[11px] text-zinc-400"
                          >
                            <span className="text-rose-500 font-bold">✕</span>
                            <span>{flaw}</span>
                          </div>
                        ))}
                      </div>

                      {/* Make It Better Upgrades Preview */}
                      {movie.deconstructedFormula?.makeItBetterUpgrades && (
                        <div className="pt-2 border-t border-zinc-800/80 space-y-1.5">
                          <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-bold font-mono">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Our CineWeaver "Make It Better" Upgrades:</span>
                          </div>
                          <div className="text-[11px] text-zinc-300 space-y-1 bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800">
                            <div>
                              <strong className="text-amber-400">Cinematography:</strong>{' '}
                              {movie.deconstructedFormula.makeItBetterUpgrades.cinematographyUpgrade}
                            </div>
                            <div>
                              <strong className="text-amber-400">Character Lock:</strong>{' '}
                              {movie.deconstructedFormula.makeItBetterUpgrades.characterConsistencyUpgrade}
                            </div>
                            <div>
                              <strong className="text-amber-400">Script Depth:</strong>{' '}
                              {movie.deconstructedFormula.makeItBetterUpgrades.scriptAndDialogueUpgrade}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* View Deep Formula Accordion */}
                  <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950/40">
                    <button
                      onClick={() => setExpandedCardId(isExpanded ? null : movie.id)}
                      className="w-full px-3.5 py-2 text-left flex items-center justify-between text-xs font-semibold text-zinc-300 hover:text-white transition cursor-pointer"
                    >
                      <span className="flex items-center space-x-1.5">
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>Inspect Complete Viral DNA & Sound Formula</span>
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="p-3.5 border-t border-zinc-800 text-xs space-y-2 bg-zinc-950/80 animate-in fade-in duration-200">
                        <div>
                          <span className="text-[10px] uppercase font-mono text-amber-400 font-bold block">
                            Why It Captured Millions:
                          </span>
                          <p className="text-[11px] text-zinc-300 mt-0.5">
                            {movie.deconstructedFormula.whyItWentViral}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono text-zinc-400 font-bold block">
                            Soundtrack & Acoustic Blueprint:
                          </span>
                          <p className="text-[11px] text-zinc-300 mt-0.5">
                            {movie.deconstructedFormula.soundtrackFormula}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button: Make It Better */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => handleOpenReverseEngineer(movie)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Reverse Engineer & Make It 10x Better</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Reverse-Engineering & Make It Better Studio */}
      {selectedMovieForReverse && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <div className="inline-flex items-center space-x-1.5 text-xs text-amber-400 font-mono font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The "Make The Best Better" Engine</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Re-Engineering: {selectedMovieForReverse.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMovieForReverse(null)}
                className="text-zinc-400 hover:text-white text-lg p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Source Reference Summary */}
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold">
                Viral Trigger We Are Upgrading:
              </span>
              <p className="text-xs text-zinc-300 italic">
                "{selectedMovieForReverse.viralHook}"
              </p>
            </div>

            {/* Choose Transformation Strategy */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white uppercase tracking-wider block font-mono">
                1. Select Elevation Strategy:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    id: 'Elevate & Prestige',
                    title: 'Elevate to Prestige Cinema',
                    desc: 'Eliminate cheap tropes, add A24/Nolan psychological depth, Panavision 35mm optical realism, and poetic subtext.',
                  },
                  {
                    id: 'Action Spectacle',
                    title: 'Epic Action Upgrade',
                    desc: 'Amplify kinetic camera vectors, high-velocity choreography, and grand mythological or sci-fi scale.',
                  },
                  {
                    id: 'Genre Fusion',
                    title: 'Genre Fusion / Re-imagining',
                    desc: 'Cross-pollinate with cyber-espionage, dark supernatural folklore, or high-concept speculative thriller.',
                  },
                  {
                    id: 'Invert Dynamics',
                    title: 'Invert Power Dynamics',
                    desc: 'Flip the gender roles, invert status secrets, or shift the perspective to an unexpected protagonist.',
                  },
                ].map((s) => {
                  const isSelected = strategy === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setStrategy(s.id as any)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 text-white shadow-md shadow-amber-500/10'
                          : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:bg-zinc-950 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-300">{s.title}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{s.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Target Culture & Channel Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-white uppercase tracking-wider block font-mono mb-1">
                  2. Target Cultural Tradition:
                </label>
                <select
                  value={targetCulture}
                  onChange={(e) => setTargetCulture(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Bollywood & South Asian">🇮🇳 Bollywood & South Asian Epics</option>
                  <option value="Hollywood & Western">🇺🇸 Hollywood & Western Cinema</option>
                  <option value="Nollywood & African">🇳🇬 Nollywood & African Cinema</option>
                  <option value="East Asian & K-Drama">🇰🇷 East Asian Cinema & K-Drama</option>
                  <option value="Latin American">🇨🇴 Latin American Magical Realism</option>
                  <option value="European & Nordic Noir">🇪🇺 European & Nordic Noir</option>
                  <option value="Global / Cross-Cultural">🌐 Global / Cross-Cultural Fusion</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-white uppercase tracking-wider block font-mono mb-1">
                  3. Target Platform / Channel:
                </label>
                <select
                  value={targetChannel}
                  onChange={(e) => setTargetChannel(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="YouTube Cinema">YouTube Cinema / Pilot (2.39:1)</option>
                  <option value="TikTok & Reels">TikTok / Reels Viral (Fast Retention)</option>
                  <option value="Film Festival">AI Film Festival / Showcase</option>
                  <option value="Streaming Pitch">Streaming Series / Feature Pitch</option>
                </select>
              </div>
            </div>

            {/* Directorial Instructions */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-white uppercase tracking-wider block font-mono">
                4. Your "Make It Better" Directorial Directives:
              </label>
              <textarea
                value={customDirection}
                onChange={(e) => setCustomDirection(e.target.value)}
                rows={2}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                placeholder="What specific improvements or twists do you want to inject into the story, cinematography, or character arc?"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-zinc-800 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setSelectedMovieForReverse(null)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleExecuteReverseEngineering}
                disabled={isReverseEngineering}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center space-x-2 shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
              >
                {isReverseEngineering ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Elevating & Outperforming Viral Source...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Launch Elevated Film Project</span>
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
