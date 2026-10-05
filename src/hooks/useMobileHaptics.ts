import { useState, useCallback } from 'react';

export function useMobileHaptics() {
  const [hapticsEnabled, setHapticsEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('cineweaver_haptics');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const toggleHaptics = useCallback(() => {
    setHapticsEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('cineweaver_haptics', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const triggerHaptic = useCallback(
    (type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' = 'light') => {
      if (!hapticsEnabled || typeof window === 'undefined' || !('vibrate' in navigator)) {
        return;
      }
      try {
        switch (type) {
          case 'light':
            navigator.vibrate(10);
            break;
          case 'medium':
            navigator.vibrate(20);
            break;
          case 'heavy':
            navigator.vibrate(40);
            break;
          case 'success':
            navigator.vibrate([15, 40, 20]);
            break;
          case 'warning':
            navigator.vibrate([30, 60, 30]);
            break;
        }
      } catch {
        // Safe fail
      }
    },
    [hapticsEnabled]
  );

  return {
    hapticsEnabled,
    toggleHaptics,
    triggerHaptic,
  };
}
