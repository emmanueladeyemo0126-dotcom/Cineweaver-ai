import React, { useState } from 'react';
import {
  Flame,
  Compass,
  UserCheck,
  LayoutGrid,
  Layers,
  Cpu,
  ShieldCheck,
  BookOpen,
  Smartphone,
  Sparkles,
  Zap,
  Sliders,
  X,
  Plus,
} from 'lucide-react';
import { FilmProject } from '../types/film';
import { PWAInstallButton } from './PWAInstallButton';

interface MobileBottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  projects: FilmProject[];
  currentProject: FilmProject;
  onSelectProject: (p: FilmProject) => void;
  onNewProjectClick: () => void;
  onTriggerHaptic: (type?: 'light' | 'medium' | 'success') => void;
  isAmoledBlack: boolean;
  onToggleAmoledBlack: () => void;
  hapticsEnabled: boolean;
  onToggleHaptics: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  projects,
  currentProject,
  onSelectProject,
  onNewProjectClick,
  onTriggerHaptic,
  isAmoledBlack,
  onToggleAmoledBlack,
  hapticsEnabled,
  onToggleHaptics,
}) => {
  const [isMoreSheetOpen, setIsMoreSheetOpen] = useState(false);

  const primaryTabs = [
    { id: 'trends', label: 'Trends', icon: Flame, badge: 'Radar' },
    { id: 'discovery', label: 'Vision', icon: Compass },
    { id: 'characters', label: 'Cast', icon: UserCheck },
    { id: 'storyboard', label: 'Shots', icon: LayoutGrid },
  ];

  const handleTabClick = (tabId: string) => {
    onTriggerHaptic('light');
    onSelectTab(tabId);
    setIsMoreSheetOpen(false);
  };

  const moreTabs = [
    {
      id: 'prompts',
      label: 'Prompt Hub (Runway & Midjourney)',
      description: 'Platform-optimized cinematic video & image prompts',
      icon: Cpu,
    },
    {
      id: 'auditor',
      label: 'Continuity Auditor & Health',
      description: 'AI prompt stability, lighting & coherence audit',
      icon: ShieldCheck,
    },
    {
      id: 'bible',
      label: 'Production Bible & Export',
      description: 'Comprehensive film deck, character dossiers & PDF',
      icon: BookOpen,
    },
  ];

  const isMoreTabActive = ['prompts', 'auditor', 'bible'].includes(activeTab);

  return (
    <>
      {/* Thumb-Reachable Bottom Navigation Bar (Visible on mobile/tablet) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800/80 pb-[env(safe-area-inset-bottom,12px)] transition-all"
      >
        <div className="flex items-center justify-around px-2 py-1.5">
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative flex flex-col items-center justify-center py-1.5 px-3 min-w-[56px] min-h-[48px] rounded-xl transition-all cursor-pointer ${
                  isActive ? 'text-amber-400' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`w-5 h-5 transition-transform ${
                      isActive ? 'scale-110 text-amber-400' : ''
                    }`}
                  />
                  {tab.badge && (
                    <span className="absolute -top-1 -right-2.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  )}
                </div>
                <span
                  className={`text-[10px] mt-1 font-medium transition-all ${
                    isActive ? 'text-amber-400 font-bold' : 'text-zinc-400'
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 w-8 h-0.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
                )}
              </button>
            );
          })}

          {/* More Studio Hub Drawer Trigger */}
          <button
            onClick={() => {
              onTriggerHaptic('light');
              setIsMoreSheetOpen(true);
            }}
            className={`relative flex flex-col items-center justify-center py-1.5 px-3 min-w-[56px] min-h-[48px] rounded-xl transition-all cursor-pointer ${
              isMoreTabActive ? 'text-amber-400' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <div className="relative">
              <Layers
                className={`w-5 h-5 transition-transform ${
                  isMoreTabActive ? 'scale-110 text-amber-400' : ''
                }`}
              />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>
            <span
              className={`text-[10px] mt-1 font-medium transition-all ${
                isMoreTabActive ? 'text-amber-400 font-bold' : 'text-zinc-400'
              }`}
            >
              Studio
            </span>
            {isMoreTabActive && (
              <div className="absolute bottom-0 w-8 h-0.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
            )}
          </button>
        </div>
      </nav>

      {/* Slide-Up Bottom Sheet for More Studio Features & Tecno Pova 6 Hardware Controls */}
      {isMoreSheetOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full bg-zinc-900 border-t border-zinc-700 rounded-t-3xl p-5 pb-[calc(env(safe-area-inset-bottom,16px)+1.5rem)] space-y-5 max-h-[85vh] overflow-y-auto smooth-scroll shadow-2xl"
          >
            {/* Sheet Handle & Close */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <h3 className="text-sm font-bold text-white tracking-wide">
                  CineWeaver Studio Tools
                </h3>
              </div>
              <button
                onClick={() => setIsMoreSheetOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Film Switcher */}
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-mono">Current Film Project:</span>
                <button
                  onClick={() => {
                    setIsMoreSheetOpen(false);
                    onNewProjectClick();
                  }}
                  className="flex items-center space-x-1 text-amber-400 font-bold hover:underline"
                >
                  <Plus className="w-3 h-3" />
                  <span>New Film</span>
                </button>
              </div>
              <select
                value={currentProject.id}
                onChange={(e) => {
                  const found = projects.find((p) => p.id === e.target.value);
                  if (found) {
                    onSelectProject(found);
                    onTriggerHaptic('light');
                  }
                }}
                className="w-full bg-zinc-900 text-sm font-semibold text-white border border-zinc-700 rounded-lg p-2.5 focus:outline-none focus:border-amber-400"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.genre})
                  </option>
                ))}
              </select>
            </div>

            {/* Studio Navigation Options */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 font-bold block">
                Production Stages:
              </span>
              {moreTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`w-full flex items-start space-x-3 p-3 rounded-xl border text-left transition cursor-pointer min-h-[52px] ${
                      isActive
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                        : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        isActive ? 'bg-amber-500/20 text-amber-400' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-white">{tab.label}</div>
                      <div className="text-[11px] text-zinc-400 leading-snug">{tab.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Tecno Pova 6 & Android 15 Device Hardware Optimization Controls */}
            <div className="bg-gradient-to-br from-zinc-950 to-zinc-900 border border-zinc-800 p-3.5 rounded-2xl space-y-3">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">
                  Tecno Pova 6 Hardware Engine (Android 15)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* 120Hz Mode Info */}
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col justify-between">
                  <span className="text-[10px] text-zinc-400 font-mono">Display</span>
                  <div className="flex items-center space-x-1.5 mt-1 text-emerald-400 font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    <span>120Hz Active</span>
                  </div>
                </div>

                {/* Haptics Toggle */}
                <button
                  onClick={() => {
                    onToggleHaptics();
                    if (!hapticsEnabled) onTriggerHaptic('success');
                  }}
                  className={`p-2.5 rounded-lg border text-left flex flex-col justify-between cursor-pointer transition ${
                    hapticsEnabled
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <span className="text-[10px] font-mono">Z-Axis Haptics</span>
                  <span className="font-bold text-xs mt-1">
                    {hapticsEnabled ? 'Enabled ⚡' : 'Muted'}
                  </span>
                </button>
              </div>

              {/* AMOLED Pure Black Battery Saver */}
              <button
                onClick={() => {
                  onTriggerHaptic('light');
                  onToggleAmoledBlack();
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-xs font-semibold cursor-pointer transition ${
                  isAmoledBlack
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                }`}
              >
                <span>AMOLED True-Black Mode</span>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-800">
                  {isAmoledBlack ? 'OLED Saver ON' : 'Default Dark'}
                </span>
              </button>

              {/* Install PWA Prompt inside mobile sheet */}
              <PWAInstallButton variant="banner" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
