import { useState, useEffect } from 'react';
import { FilmProject } from './types/film';
import { INITIAL_PROJECTS } from './data/sampleProjects';
import { Header } from './components/Header';
import { TrendRadarTab } from './components/TrendRadarTab';
import { DiscoveryTab } from './components/DiscoveryTab';
import { CharacterStudioTab } from './components/CharacterStudioTab';
import { StoryboardTab } from './components/StoryboardTab';
import { PromptCompilerTab } from './components/PromptCompilerTab';
import { AuditorTab } from './components/AuditorTab';
import { ProductionBibleTab } from './components/ProductionBibleTab';
import { NewProjectModal } from './components/NewProjectModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { TecnoOptimizationBar } from './components/TecnoOptimizationBar';
import { OfflineIndicator } from './components/OfflineIndicator';
import { useMobileHaptics } from './hooks/useMobileHaptics';

export default function App() {
  const [projects, setProjects] = useState<FilmProject[]>(() => {
    try {
      const saved = localStorage.getItem('cineweaver_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Notice: Error loading saved projects:', e);
    }
    return INITIAL_PROJECTS;
  });

  const [currentProjectId, setCurrentProjectId] = useState<string>(projects[0]?.id || 'proj-emerald-heir');
  const [activeTab, setActiveTab] = useState<string>('trends');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  // Tecno Pova 6 AMOLED True-Black Mode (for battery saving and AMOLED contrast)
  const [isAmoledBlack, setIsAmoledBlack] = useState<boolean>(() => {
    try {
      return localStorage.getItem('cineweaver_amoled') === 'true';
    } catch {
      return false;
    }
  });

  // Z-Axis Linear Haptics (Android 15 / Tecno Pova 6)
  const { hapticsEnabled, toggleHaptics, triggerHaptic } = useMobileHaptics();

  useEffect(() => {
    try {
      localStorage.setItem('cineweaver_projects', JSON.stringify(projects));
    } catch (e) {
      console.warn('Notice: Error saving projects:', e);
    }
  }, [projects]);

  const handleToggleAmoled = () => {
    setIsAmoledBlack((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('cineweaver_amoled', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const currentProject = projects.find((p) => p.id === currentProjectId) || projects[0];

  const handleUpdateProject = (updated: FilmProject) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    triggerHaptic('light');
  };

  const handleCreateProject = (newProject: FilmProject) => {
    setProjects((prev) => [newProject, ...prev]);
    setCurrentProjectId(newProject.id);
    setActiveTab('discovery');
    triggerHaptic('success');
  };

  const handleLoadReverseEngineeredProject = (newProject: FilmProject) => {
    setProjects((prev) => [newProject, ...prev]);
    setCurrentProjectId(newProject.id);
    triggerHaptic('success');
  };

  return (
    <div
      className={`min-h-screen text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-zinc-950 transition-colors duration-200 ${
        isAmoledBlack ? 'bg-black' : 'bg-zinc-950'
      }`}
    >
      {/* Offline Status Alert */}
      <OfflineIndicator />

      {/* Header */}
      <Header
        projects={projects}
        currentProject={currentProject}
        onSelectProject={(p) => setCurrentProjectId(p.id)}
        onNewProjectClick={() => setIsNewProjectModalOpen(true)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onTriggerHaptic={triggerHaptic}
      />

      {/* Main Container with responsive padding for Tecno Pova 6 / Android 15 bottom nav */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6 pb-bottom-nav md:pb-16 smooth-scroll">
        {/* Device Tuning Status for Tecno Pova 6 */}
        <TecnoOptimizationBar
          isAmoledBlack={isAmoledBlack}
          onToggleAmoledBlack={handleToggleAmoled}
          hapticsEnabled={hapticsEnabled}
          onToggleHaptics={toggleHaptics}
          onTriggerHaptic={triggerHaptic}
        />

        {activeTab === 'trends' && (
          <TrendRadarTab
            onLoadProject={handleLoadReverseEngineeredProject}
            onNavigateToStoryboard={() => {
              triggerHaptic('medium');
              setActiveTab('storyboard');
            }}
          />
        )}

        {activeTab === 'discovery' && (
          <DiscoveryTab
            project={currentProject}
            onUpdateProject={handleUpdateProject}
            onAdvanceToCharacters={() => {
              triggerHaptic('medium');
              setActiveTab('characters');
            }}
          />
        )}

        {activeTab === 'characters' && (
          <CharacterStudioTab
            project={currentProject}
            onUpdateProject={handleUpdateProject}
            onAdvanceToStoryboard={() => {
              triggerHaptic('medium');
              setActiveTab('storyboard');
            }}
          />
        )}

        {activeTab === 'storyboard' && (
          <StoryboardTab
            project={currentProject}
            onUpdateProject={handleUpdateProject}
            onAdvanceToPrompts={() => {
              triggerHaptic('medium');
              setActiveTab('prompts');
            }}
          />
        )}

        {activeTab === 'prompts' && (
          <PromptCompilerTab
            project={currentProject}
            onAdvanceToAuditor={() => {
              triggerHaptic('medium');
              setActiveTab('auditor');
            }}
          />
        )}

        {activeTab === 'auditor' && (
          <AuditorTab
            project={currentProject}
            onUpdateProject={handleUpdateProject}
            onAdvanceToBible={() => {
              triggerHaptic('medium');
              setActiveTab('bible');
            }}
          />
        )}

        {activeTab === 'bible' && <ProductionBibleTab project={currentProject} />}
      </main>

      {/* Thumb-Reachable Mobile Bottom Navigation (Tecno Pova 6 & Android 15) */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        projects={projects}
        currentProject={currentProject}
        onSelectProject={(p) => setCurrentProjectId(p.id)}
        onNewProjectClick={() => setIsNewProjectModalOpen(true)}
        onTriggerHaptic={triggerHaptic}
        isAmoledBlack={isAmoledBlack}
        onToggleAmoledBlack={handleToggleAmoled}
        hapticsEnabled={hapticsEnabled}
        onToggleHaptics={toggleHaptics}
      />

      {/* New Project Modal */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
}

