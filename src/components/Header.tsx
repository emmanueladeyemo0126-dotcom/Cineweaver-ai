import React from 'react';
import { FilmProject } from '../types/film';
import {
  Clapperboard,
  Compass,
  UserCheck,
  LayoutGrid,
  Cpu,
  ShieldCheck,
  BookOpen,
  Plus,
  Sparkles,
  Flame,
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  projects: FilmProject[];
  currentProject: FilmProject;
  onSelectProject: (project: FilmProject) => void;
  onNewProjectClick: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onTriggerHaptic?: (type?: 'light' | 'medium') => void;
}

export const Header: React.FC<HeaderProps> = ({
  projects,
  currentProject,
  onSelectProject,
  onNewProjectClick,
  activeTab,
  onSelectTab,
  onTriggerHaptic,
}) => {
  const tabs = [
    { id: 'trends', label: '🔥 AI Trend Radar', icon: Flame },
    { id: 'discovery', label: '1. Vision & Treatments', icon: Compass },
    { id: 'characters', label: '2. Character Consistency', icon: UserCheck },
    { id: 'storyboard', label: '3. Storyboard Matrix', icon: LayoutGrid },
    { id: 'prompts', label: '4. Prompt Hub', icon: Cpu },
    { id: 'auditor', label: '5. Continuity Auditor', icon: ShieldCheck },
    { id: 'bible', label: '6. Production Bible', icon: BookOpen },
  ];

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md sticky top-0 z-40 pt-[env(safe-area-inset-top,0px)]">
      {/* Top Studio Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-1 ring-white/10 shrink-0">
              <Clapperboard className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-white font-mono truncate">
                  CINE<span className="text-amber-400">WEAVER</span>
                </span>
                <span className="hidden xs:inline text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-zinc-800 text-amber-300 border border-amber-500/30">
                  Android 15
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden md:block truncate">
                Intention to Reality: Storyboarding, Character Consistency & Scene Prompts
              </p>
            </div>
          </div>

          {/* Project Switcher, PWA Install & New Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Film Selector */}
            <div className="flex items-center space-x-1 sm:space-x-2 bg-zinc-900 border border-zinc-800 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 max-w-[140px] sm:max-w-[200px]">
              <span className="text-[11px] sm:text-xs text-zinc-400 font-mono hidden sm:inline">Film:</span>
              <select
                aria-label="Active Film Project"
                value={currentProject.id}
                onChange={(e) => {
                  const found = projects.find((p) => p.id === e.target.value);
                  if (found) {
                    onSelectProject(found);
                    if (onTriggerHaptic) onTriggerHaptic('light');
                  }
                }}
                className="bg-transparent text-xs sm:text-sm font-medium text-white focus:outline-none cursor-pointer truncate w-full"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id} className="bg-zinc-900 text-white">
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop PWA Install Button */}
            <div className="hidden sm:block">
              <PWAInstallButton variant="header" />
            </div>

            {/* New Film Button */}
            <button
              onClick={() => {
                if (onTriggerHaptic) onTriggerHaptic('medium');
                onNewProjectClick();
              }}
              className="inline-flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-md shadow-amber-500/20 transition-all cursor-pointer min-h-[36px]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">New Film</span>
            </button>
          </div>
        </div>

        {/* Workflow Step Tabs (desktop full bar, smooth mobile scroll) */}
        <div className="hidden md:flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-zinc-900 smooth-scroll">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (onTriggerHaptic) onTriggerHaptic('light');
                  onSelectTab(tab.id);
                }}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-sm shadow-amber-500/10'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-zinc-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

