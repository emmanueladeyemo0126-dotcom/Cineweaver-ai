import React, { useState } from 'react';
import { FilmProject } from '../types/film';
import { Clapperboard, Sparkles } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newProject: FilmProject) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('Sci-Fi Cyberpunk');
  const [format, setFormat] = useState('Cinematic Short Film (5-10 min)');
  const [logline, setLogline] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProject: FilmProject = {
      id: `proj-${Date.now()}`,
      title: title.trim(),
      genre,
      format,
      visualStyle: '35mm anamorphic, atmospheric rim-lighting',
      logline: logline.trim() || 'A compelling new film concept waiting for directorial refinement.',
      treatment: {
        id: `treatment-${Date.now()}`,
        title: title.trim(),
        artisticStyle: genre,
        pitchTone: 'Cinematic visual journey with psychological depth.',
        logline: logline.trim() || 'A compelling new film concept waiting for directorial refinement.',
        visualGrammar: {
          aspectRatio: '2.39:1',
          lensChoice: '35mm Anamorphic T2.0',
          lightingStyle: 'Chiaroscuro, rim light, volumetric atmospheric haze',
          colorPalette: ['#0f172a', '#38bdf8', '#f59e0b', '#ef4444'],
        },
        coreConflict: 'Protagonist faces an insurmountable paradigm shift.',
        pacingStyle: 'Deliberate building to kinetic resolution',
        aiWorkflowRecommendation: 'Midjourney v6.1 + Runway Gen-3 + ElevenLabs',
      },
      characters: [
        {
          id: `char-${Date.now()}`,
          name: 'Hero Protagonist',
          role: 'Lead',
          age: '30',
          archetype: 'The Catalyst',
          physicalSignature: 'Striking gaze, sharp facial features, determined silhouette.',
          wardrobeSignature: 'Tactical weather-resistant jacket, understated dark palette.',
          characterAnchorToken: `[CHAR_${title.replace(/\s+/g, '_').toUpperCase()}_HERO] 30yo protagonist, sharp gaze, tactical jacket`,
          multiAnglePrompts: [
            {
              angle: 'Front Portrait',
              prompt: `Cinematic front portrait of protagonist in ${title}, soft key light --ar 16:9`,
            },
            {
              angle: 'Three-Quarter Angle',
              prompt: `Medium three-quarter shot of protagonist in ${title}, atmospheric rim light --ar 2.39:1`,
            },
            {
              angle: 'Action Profile',
              prompt: `Dynamic side profile of protagonist moving through scene in ${title} --ar 2.39:1`,
            },
            {
              angle: 'Emotional Close-Up',
              prompt: `Macro close up on eyes of protagonist, intense expression --ar 16:9`,
            },
          ],
          voiceProfile: {
            accent: 'Neutral Cinematic',
            tone: 'Low, focused, quiet determination',
            speed: 'Measured',
            elevenLabsVoiceRecommendation: 'Adam or Rachel',
            sampleLine: 'There are things you see once that change the world forever.',
          },
          continuityRules: [
            'Maintain consistent hair color and silhouette',
            'Keep wardrobe palette cohesive across shots',
          ],
        },
      ],
      shots: [
        {
          id: `shot-${Date.now()}-1`,
          shotNumber: 'Shot 1',
          shotType: 'Extreme Wide Establishing',
          framingLens: '24mm Anamorphic',
          cameraMovement: 'Slow forward dolly',
          lightingAtmosphere: 'Moody twilight, volumetric fog',
          actionDescription: 'Establishing view of the primary environment as the story commences.',
          dialogueOrVoiceover: null,
          soundDesignFoley: 'Ambient atmospheric room tone, gentle wind',
          compiledPrompts: {
            midjourneyFlux: `Cinematic extreme wide establishing shot of ${genre} environment, 24mm anamorphic --ar 2.39:1`,
            runwayKlingVideo: `Slow forward dolly shot through ${genre} environment, 4k 24fps smooth motion`,
          },
          continuityNote: 'Check weather and atmospheric gradient.',
        },
      ],
      updatedAt: new Date().toISOString(),
    };

    onCreate(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-md w-full space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center space-x-2">
            <Clapperboard className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Create New AI Film Project</h3>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white cursor-pointer">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block mb-1">
              Film Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
              placeholder="e.g. THE NEON LABYRINTH"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block mb-1">
              Genre & Archetype
            </label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
              placeholder="e.g. Psychological Sci-Fi Thriller"
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

          <div>
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block mb-1">
              Raw Logline / Intention (Optional)
            </label>
            <textarea
              value={logline}
              onChange={(e) => setLogline(e.target.value)}
              rows={2}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              placeholder="What is the central premise or vision?"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-lg flex items-center space-x-1.5 shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Initialize Project</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
