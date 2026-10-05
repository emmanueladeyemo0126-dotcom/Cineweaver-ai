import {
  InterrogationResult,
  FilmTreatment,
  CharacterBible,
  Shot,
  DirectorialAudit,
  TrendingMovie,
  FilmProject,
  ReverseEngineerStrategy,
} from '../types/film';

export async function researchTrendingFilms(params: {
  culture?: string;
  category?: string;
  channel?: string;
  customQuery?: string;
}): Promise<{ trends: TrendingMovie[] }> {
  const res = await fetch('/api/trends/research', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error('Failed to research trending films');
  return res.json();
}

export async function reverseEngineerTrendingFilm(params: {
  trendingMovie: TrendingMovie;
  strategy: ReverseEngineerStrategy['strategy'];
  cultureTarget?: string;
  channelTarget?: string;
  customDirection?: string;
}): Promise<{ project: FilmProject }> {
  const res = await fetch('/api/trends/reverse-engineer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error('Failed to reverse engineer trending film');
  return res.json();
}

export async function askDirectorInterrogation(params: {
  rawPremise: string;
  genre: string;
  visualStyle: string;
  format: string;
}): Promise<InterrogationResult> {
  const res = await fetch('/api/director/interrogate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error('Interrogation request failed');
  return res.json();
}

export async function generateFilmOptions(params: {
  rawPremise: string;
  genre: string;
  visualStyle: string;
  answers: Record<string, string>;
}): Promise<{ options: FilmTreatment[] }> {
  const res = await fetch('/api/director/generate-options', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error('Failed to generate film options');
  return res.json();
}

export async function generateCharacterBible(params: {
  filmTreatment: FilmTreatment;
  characterIdea: string;
}): Promise<{ character: CharacterBible }> {
  const res = await fetch('/api/character/generate-bible', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error('Failed to generate character bible');
  return res.json();
}

export async function generateStoryboardBreakdown(params: {
  sceneDescription: string;
  visualGrammar: any;
  characters: any[];
  targetAIEngine: string;
}): Promise<{ sceneTitle: string; dramaticIntent: string; shots: Shot[] }> {
  const res = await fetch('/api/storyboard/breakdown', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error('Failed to breakdown storyboard');
  return res.json();
}

export async function runDirectorialAudit(params: {
  character: CharacterBible;
  shots: Shot[];
  filmTreatment: FilmTreatment;
}): Promise<DirectorialAudit> {
  const res = await fetch('/api/director/audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error('Failed to run directorial audit');
  return res.json();
}

export async function generateKeyframeImage(params: {
  prompt: string;
  aspectRatio?: string;
}): Promise<{ success: boolean; imageUrl?: string; message?: string }> {
  const res = await fetch('/api/keyframe/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error('Keyframe generation call failed');
  return res.json();
}
