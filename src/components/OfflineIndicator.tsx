import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-2 bg-amber-500/95 text-zinc-950 px-3.5 py-1.5 rounded-full shadow-lg border border-amber-400 text-xs font-semibold backdrop-blur-md">
      <WifiOff className="w-3.5 h-3.5" />
      <span>Offline Mode — Saved scripts & cached project ready</span>
    </div>
  );
};
