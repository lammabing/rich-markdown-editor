import { useEffect, useRef } from 'react';

interface UseKeyboardShortcutsOptions {
  onSave?: () => void;
  onOpen?: () => void;
  onPrint?: () => void;
}

export function useKeyboardShortcuts({ onSave, onOpen, onPrint }: UseKeyboardShortcutsOptions) {
  const onSaveRef = useRef(onSave);
  const onOpenRef = useRef(onOpen);
  const onPrintRef = useRef(onPrint);

  useEffect(() => { onSaveRef.current = onSave; }, [onSave]);
  useEffect(() => { onOpenRef.current = onOpen; }, [onOpen]);
  useEffect(() => { onPrintRef.current = onPrint; }, [onPrint]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modKey = isMac ? e.metaKey : e.ctrlKey;

      if (modKey) {
        switch (e.key.toLowerCase()) {
          case 's':
            e.preventDefault();
            onSaveRef.current?.();
            break;
          case 'o':
            e.preventDefault();
            onOpenRef.current?.();
            break;
          case 'p':
            e.preventDefault();
            onPrintRef.current?.();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
