import { useEffect } from 'react';

interface UseKeyboardShortcutsOptions {
  onSave?: () => void;
  onOpen?: () => void;
  onPrint?: () => void;
}

export function useKeyboardShortcuts({ onSave, onOpen, onPrint }: UseKeyboardShortcutsOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl/Cmd key
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modKey = isMac ? e.metaKey : e.ctrlKey;

      if (modKey) {
        switch (e.key.toLowerCase()) {
          case 's':
            e.preventDefault();
            onSave?.();
            break;
          case 'o':
            e.preventDefault();
            onOpen?.();
            break;
          case 'p':
            e.preventDefault();
            onPrint?.();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSave, onOpen, onPrint]);
}
