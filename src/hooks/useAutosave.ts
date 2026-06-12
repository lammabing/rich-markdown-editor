import { useState, useEffect, useRef, useCallback } from 'react';
import { htmlToMarkdown } from '../utils/fileUtils';
import { saveFileHandle, loadFileHandle, clearFileHandle, verifyFileHandle } from '../utils/fileHandlePersistence';

export type AutosaveStatus = 'idle' | 'saving' | 'saved' | 'error' | 'unsaved';

const DRAFT_KEY = 'editor-draft';
const DRAFT_TIMESTAMP_KEY = 'editor-draft-timestamp';
const DEBOUNCE_MS = 30000;

interface UseAutosaveOptions {
  content: string;
  currentFileHandle: FileSystemFileHandle | null;
  onFileHandleChange: (handle: FileSystemFileHandle | null) => void;
}

interface UseAutosaveReturn {
  status: AutosaveStatus;
  clearDraft: () => void;
  hasDraft: () => boolean;
  loadDraft: () => { content: string; timestamp: number } | null;
}

export function useAutosave({ content, currentFileHandle, onFileHandleChange }: UseAutosaveOptions): UseAutosaveReturn {
  const [status, setStatus] = useState<AutosaveStatus>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<string>('');
  const lastSavedMarkdownRef = useRef<string>('');
  const isUnmountedRef = useRef(false);

  const saveDraft = useCallback((html: string) => {
    try {
      localStorage.setItem(DRAFT_KEY, html);
      localStorage.setItem(DRAFT_TIMESTAMP_KEY, String(Date.now()));
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        // Try to free space by removing old data, then retry
        try {
          localStorage.removeItem(DRAFT_KEY);
          localStorage.removeItem(DRAFT_TIMESTAMP_KEY);
          localStorage.setItem(DRAFT_KEY, html);
          localStorage.setItem(DRAFT_TIMESTAMP_KEY, String(Date.now()));
        } catch {
          // Give up — document is too large for localStorage
        }
      }
    }
  }, []);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(DRAFT_KEY);
    localStorage.removeItem(DRAFT_TIMESTAMP_KEY);
  }, []);

  const hasDraft = useCallback((): boolean => {
    return localStorage.getItem(DRAFT_KEY) !== null;
  }, []);

  const loadDraft = useCallback((): { content: string; timestamp: number } | null => {
    const html = localStorage.getItem(DRAFT_KEY);
    const ts = localStorage.getItem(DRAFT_TIMESTAMP_KEY);
    if (html) {
      return { content: html, timestamp: ts ? parseInt(ts, 10) : 0 };
    }
    return null;
  }, []);

  const saveToFile = useCallback(async (handle: FileSystemFileHandle, html: string) => {
    try {
      const permission = await handle.queryPermission({ mode: 'readwrite' });
      if (permission !== 'granted') {
        const requested = await handle.requestPermission({ mode: 'readwrite' });
        if (requested !== 'granted') return;
      }
      const markdown = htmlToMarkdown(html);
      if (markdown === lastSavedMarkdownRef.current) return;
      const writable = await handle.createWritable();
      await writable.write(markdown);
      await writable.close();
      lastSavedMarkdownRef.current = markdown;
    } catch {
      // Permission denied or file unavailable — fall back to draft
    }
  }, []);

  const performAutosave = useCallback(async (html: string) => {
    if (isUnmountedRef.current) return;

    setStatus('saving');

    try {
      // Always save draft to localStorage
      saveDraft(html);

      // If we have a file handle, also save to file
      if (currentFileHandle) {
        await saveToFile(currentFileHandle, html);
      }

      if (!isUnmountedRef.current) {
        lastSavedRef.current = html;
        setStatus('saved');
        setTimeout(() => {
          if (!isUnmountedRef.current) {
            setStatus(prev => prev === 'saved' ? 'idle' : prev);
          }
        }, 3000);
      }
    } catch {
      if (!isUnmountedRef.current) {
        setStatus('error');
        setTimeout(() => {
          if (!isUnmountedRef.current) {
            setStatus(prev => prev === 'error' ? 'idle' : prev);
          }
        }, 5000);
      }
    }
  }, [currentFileHandle, saveDraft, saveToFile]);

  // Deferred "unsaved" status update when content changes
  useEffect(() => {
    if (content === lastSavedRef.current) return;

    const raf = requestAnimationFrame(() => {
      setStatus('unsaved');
    });

    return () => cancelAnimationFrame(raf);
  }, [content]);

  // Debounced autosave on content change
  useEffect(() => {
    if (content === lastSavedRef.current) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      performAutosave(content);
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [content, performAutosave]);

  // Restore file handle from IndexedDB on mount
  useEffect(() => {
    let cancelled = false;

    async function restoreHandle() {
      const handle = await loadFileHandle();
      if (cancelled) return;
      if (handle) {
        const valid = await verifyFileHandle(handle);
        if (cancelled) return;
        if (valid) {
          onFileHandleChange(handle);
        }
      }
    }

    restoreHandle();

    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist file handle to IndexedDB when it changes
  useEffect(() => {
    if (currentFileHandle) {
      saveFileHandle(currentFileHandle);
    } else {
      clearFileHandle();
    }
  }, [currentFileHandle]);

  // Save draft before page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (content && content !== lastSavedRef.current) {
        saveDraft(content);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [content, saveDraft]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isUnmountedRef.current = true;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { status, clearDraft, hasDraft, loadDraft };
}
