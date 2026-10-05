import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, Check, X, ShieldCheck } from 'lucide-react';

interface PWAInstallButtonProps {
  variant?: 'header' | 'banner' | 'modal';
  onInstalled?: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [showAndroidGuide, setShowAndroidGuide] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  if (isInstalled || installedSuccess) {
    return (
      <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
        <Check className="w-3.5 h-3.5" />
        <span className="font-mono text-[11px]">Android App Active</span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setInstalledSuccess(true);
      }
    } else if (isAndroid) {
      setShowAndroidGuide(true);
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      setShowAndroidGuide(true);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        aria-label="Install CineWeaver App on Android"
        className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
          variant === 'banner'
            ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20 w-full justify-center py-2.5'
            : 'bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-500/30 shadow-sm'
        }`}
      >
        <Smartphone className="w-3.5 h-3.5 text-amber-400" />
        <span>Install App</span>
      </button>

      {/* Android 15 & Chrome Guide Dialog */}
      {showAndroidGuide && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-zinc-900 border border-zinc-700 p-5 shadow-2xl text-left space-y-4 animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Install on Android 15 (Tecno Pova 6)</h3>
              </div>
              <button
                onClick={() => setShowAndroidGuide(false)}
                className="text-zinc-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Run <strong>CineWeaver AI</strong> in full-screen standalone mode with 120Hz smooth scrolling and zero browser address bar interference:
            </p>

            <ol className="text-xs text-zinc-300 space-y-2 list-decimal list-inside bg-zinc-950 p-3 rounded-xl border border-zinc-800">
              <li>Tap the <strong>Chrome Menu (⋮)</strong> in the top-right corner.</li>
              <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
              <li>Tap <strong>Install</strong> to add CineWeaver directly to your Tecno app drawer.</li>
            </ol>

            <div className="flex items-center space-x-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Offline-ready & AMOLED battery optimized</span>
            </div>

            <button
              onClick={() => setShowAndroidGuide(false)}
              className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-lg text-xs transition cursor-pointer"
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* iOS Guide Dialog */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-zinc-900 border border-zinc-700 p-5 shadow-2xl text-left space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Install on Mobile Device</h3>
              <button onClick={() => setShowIOSGuide(false)} className="text-zinc-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-zinc-300">
              1. Tap the <strong>Share</strong> button in browser toolbar.<br />
              2. Scroll down and tap <strong>Add to Home Screen</strong>.
            </p>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-lg text-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};
