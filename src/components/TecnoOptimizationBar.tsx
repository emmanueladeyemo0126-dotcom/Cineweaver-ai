import React, { useState } from 'react';
import { Smartphone, Zap, BatteryCharging, Sparkles, Sliders, ChevronDown, ChevronUp, Vibrate, CheckCircle } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface TecnoOptimizationBarProps {
  isAmoledBlack: boolean;
  onToggleAmoledBlack: () => void;
  hapticsEnabled: boolean;
  onToggleHaptics: () => void;
  onTriggerHaptic: (type?: 'light' | 'medium' | 'success') => void;
}

export const TecnoOptimizationBar: React.FC<TecnoOptimizationBarProps> = ({
  isAmoledBlack,
  onToggleAmoledBlack,
  hapticsEnabled,
  onToggleHaptics,
  onTriggerHaptic,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      {/* Compact Status Chip / Indicator */}
      <div className="flex items-center justify-between bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-white font-mono text-[11px]">
            Tecno Pova 6 • Android 15 Profile
          </span>
          <span className="hidden sm:inline text-zinc-500">|</span>
          <span className="hidden sm:inline text-emerald-400 text-[11px] font-medium">
            120Hz AMOLED & Haptics Ready
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              onTriggerHaptic('light');
              setIsOpen(!isOpen);
            }}
            className="flex items-center space-x-1 text-zinc-400 hover:text-amber-400 text-[11px] font-medium transition cursor-pointer"
          >
            <span>{isOpen ? 'Close' : 'Tuning'}</span>
            {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          <div className="hidden xs:block">
            <PWAInstallButton variant="header" />
          </div>
        </div>
      </div>

      {/* Expanded Hardware Calibration Details */}
      {isOpen && (
        <div className="mt-2 p-3.5 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl space-y-3 text-xs animate-in fade-in duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Display Spec */}
            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                <Zap className="w-3.5 h-3.5" />
                <span>6.78" FHD+ 120Hz</span>
              </div>
              <p className="text-[10px] text-zinc-400 mt-1">
                20.5:9 Ultra-Tall Aspect Ratio with touch momentum acceleration.
              </p>
            </div>

            {/* AMOLED Battery Mode */}
            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-1.5 text-amber-400 font-bold">
                  <BatteryCharging className="w-3.5 h-3.5" />
                  <span>AMOLED True-Black</span>
                </div>
                <p className="text-[10px] text-zinc-400 mt-0.5">
                  Maximizes 6000mAh battery life.
                </p>
              </div>
              <button
                onClick={() => {
                  onTriggerHaptic('light');
                  onToggleAmoledBlack();
                }}
                className={`px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer transition ${
                  isAmoledBlack
                    ? 'bg-emerald-500 text-zinc-950'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {isAmoledBlack ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Z-Axis Linear Haptics */}
            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-1.5 text-indigo-400 font-bold">
                  <Vibrate className="w-3.5 h-3.5" />
                  <span>Z-Axis Haptics</span>
                </div>
                <p className="text-[10px] text-zinc-400 mt-0.5">
                  Tactile feedback on taps.
                </p>
              </div>
              <button
                onClick={() => {
                  onToggleHaptics();
                  if (!hapticsEnabled) onTriggerHaptic('success');
                }}
                className={`px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer transition ${
                  hapticsEnabled
                    ? 'bg-indigo-500 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {hapticsEnabled ? 'ACTIVE' : 'MUTED'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-zinc-800/80 text-[10px] text-zinc-400">
            <span>Optimized for Android 15 Edge-to-Edge Navigation & HiOS 14/15 gestures</span>
            <span className="text-amber-400/80 font-mono">Tecno Pova 6 Calibrated</span>
          </div>
        </div>
      )}
    </div>
  );
};
