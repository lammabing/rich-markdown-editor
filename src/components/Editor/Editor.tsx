import { useEditor, EditorContent } from '@tiptap/react';
import { useState, useEffect, useRef, useCallback } from 'react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import CharacterCount from '@tiptap/extension-character-count';
import { common, createLowlight } from 'lowlight';
import { MathExtension, BlockMathExtension } from '../../extensions/MathExtension';
import { Highlight } from '../../extensions/Highlight';
import { CriticDeletion, CriticInsertion, CriticHighlight } from '../../extensions/CriticMarkup';
import { FootnoteReference, FootnoteDefinition } from '../../extensions/Footnotes';
import { AlertExtension } from '../../extensions/AlertExtension';
import { AlertParserExtension } from '../../extensions/AlertParserExtension';
import { EmojiExtension } from '../../extensions/EmojiExtension';
import { HTMLBlockExtension } from '../../extensions/HTMLBlockExtension';
import { HelpExtension } from '../../extensions/HelpExtension';
import SlashCommandExtension from '../../extensions/SlashCommandExtension';
import { Toolbar } from '../Toolbar/Toolbar';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { htmlToMarkdown } from '../../utils/fileUtils';
import { FONTS, loadGoogleFont } from '../../utils/fontLoader';
import type { AutosaveStatus } from '../../hooks/useAutosave';
import './Editor.css';

const lowlight = createLowlight(common);

/**
 * Convert data-color attributes to inline styles for proper rendering
 * Only processes the HTML if it contains data-color attributes
 */
function applyDataColors(html: string): string {
  if (typeof window === 'undefined') return html;
  
  // Quick check: if no data-color attributes, return as-is
  if (!html.includes('data-color')) {
    return html;
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Find all spans with data-color attribute
    const spans = doc.querySelectorAll('span[data-color]');
    spans.forEach(span => {
      const color = span.getAttribute('data-color');
      if (color && span instanceof HTMLElement) {
        // Apply as inline style
        span.style.color = color;
      }
    });

    return doc.body.innerHTML;
  } catch {
    // Fallback to regex if parsing fails
    return html.replace(/<span([^>]*)data-color="([^"]*)"([^>]*)>/gi,
      (_match, before, color, after) => {
        return `<span${before}${after} style="color: ${color}">`;
      }
    );
  }
}

export interface EditorProps {
  content?: string;
  onChange?: (content: string) => void;
  onOpenFile?: (content: string) => void;
  onNewDocument?: () => void;
  currentFileHandle?: FileSystemFileHandle | null;
  onFileHandleChange?: (handle: FileSystemFileHandle | null) => void;
  autosaveStatus?: AutosaveStatus;
  onAutosaveClearDraft?: () => void;
}

const AUTOSAVE_LABELS: Record<AutosaveStatus, string> = {
  idle: '',
  saving: 'Saving...',
  saved: 'Saved',
  error: 'Save error',
  unsaved: 'Unsaved changes',
};

export function Editor({ content = '', onChange, onOpenFile, onNewDocument, currentFileHandle, onFileHandleChange, autosaveStatus = 'idle', onAutosaveClearDraft }: EditorProps) {
  const isInitialMount = useRef(true);
  const isUpdatingFromProp = useRef(false);
  const prevContentRef = useRef('');
  const onChangeRef = useRef(onChange);
  const latestHtmlRef = useRef('');
  const mountedRef = useRef(true);

  const defaultFont = FONTS.find(f => f.family === 'Inter') || FONTS[0];
  const [fontFamily, setFontFamily] = useState<string>(() => {
    return localStorage.getItem('editor-font') || defaultFont.cssFamily;
  });

  useEffect(() => {
    const storedFamily = localStorage.getItem('editor-font') || FONTS[0].cssFamily;
    const storedFont = FONTS.find(f => f.cssFamily === storedFamily);
    if (storedFont) {
      loadGoogleFont(storedFont.family);
    }
  }, []);

  const handleFontFamilyChange = useCallback((cssFamily: string) => {
    setFontFamily(cssFamily);
    localStorage.setItem('editor-font', cssFamily);
    const font = FONTS.find(f => f.cssFamily === cssFamily);
    if (font) {
      loadGoogleFont(font.family);
    }
  }, []);

  // Keep ref in sync with onChange prop
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Cleanup on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Debounced content update - stores latest HTML to avoid losing content on fast typing
  const scheduleUpdate = useCallback((html: string) => {
    latestHtmlRef.current = html;
    
    if (!mountedRef.current) return;
    
    // Use requestAnimationFrame for smooth batching
    requestAnimationFrame(() => {
      if (!mountedRef.current) return;
      
      const htmlToNotify = latestHtmlRef.current;
      if (htmlToNotify && htmlToNotify !== prevContentRef.current) {
        prevContentRef.current = htmlToNotify;
        onChangeRef.current?.(htmlToNotify);
      }
    });
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        codeBlock: false,
        underline: false, // Disable StarterKit's underline since we're using the separate extension
      }),
      Color,
      TextStyle,
      Underline,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      CharacterCount.configure({
        limit: null,
      }),
      MathExtension,
      BlockMathExtension,
      Highlight,
      CriticDeletion,
      CriticInsertion,
      CriticHighlight,
      FootnoteReference,
      FootnoteDefinition,
      AlertExtension,
      AlertParserExtension,
      EmojiExtension,
      HTMLBlockExtension,
      HelpExtension,
      Placeholder.configure({
        placeholder: 'Type \'/\' for commands or start writing...',
      }),
      SlashCommandExtension,
    ],
    content: applyDataColors(content),
    onUpdate: ({ editor }) => {
      // Don't trigger onChange if we're updating from a prop change
      if (isUpdatingFromProp.current) {
        return;
      }
      const newHTML = editor.getHTML();
      scheduleUpdate(newHTML);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none max-w-none editor-content',
      },
    },
  });

  // Update editor content when content prop changes (e.g., opening a file)
  useEffect(() => {
    if (!editor) return;

    // Skip initial mount since useEditor already sets the content
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevContentRef.current = editor.getHTML();
      return;
    }

    // Only update if content actually changed from external source
    const processedContent = applyDataColors(content);
    const contentChanged = processedContent !== prevContentRef.current;
    if (contentChanged) {
      isUpdatingFromProp.current = true;
      editor.commands.setContent(processedContent);
      prevContentRef.current = processedContent;
      // Reset the flag after the update is complete
      requestAnimationFrame(() => {
        isUpdatingFromProp.current = false;
      });
    }
  }, [content, editor]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSave: async () => {
      if (!editor) return;
      
      try {
        const html = editor.getHTML();
        const markdown = htmlToMarkdown(html);
        
        if (currentFileHandle) {
          const writable = await currentFileHandle.createWritable();
          await writable.write(markdown);
          await writable.close();
          onAutosaveClearDraft?.();
          return;
        }
        
        if ('showSaveFilePicker' in window) {
          const handle = await (window as any).showSaveFilePicker({
            suggestedName: 'document.md',
            types: [
              {
                description: 'Markdown files',
                accept: { 'text/markdown': ['.md', '.markdown'] },
              },
            ],
          });
          const writable = await handle.createWritable();
          await writable.write(markdown);
          await writable.close();
          onFileHandleChange?.(handle);
          onAutosaveClearDraft?.();
        } else {
          const filename = prompt('Enter filename:', 'document.md');
          if (!filename) return;
          const blob = new Blob([markdown], { type: 'text/markdown' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.click();
          URL.revokeObjectURL(url);
          onAutosaveClearDraft?.();
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Save error:', err);
        }
      }
    },
    onOpen: async () => {
      try {
        if ('showOpenFilePicker' in window) {
          const [handle] = await (window as any).showOpenFilePicker({
            types: [
              {
                description: 'Markdown files',
                accept: { 'text/markdown': ['.md', '.markdown', '.txt'] },
              },
            ],
          });
          const file = await handle.getFile();
          const markdown = await file.text();
          onOpenFile?.(markdown);
          onFileHandleChange?.(handle);
        } else {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = '.md,.markdown,.txt';
          input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file && onOpenFile) {
              const markdown = await file.text();
              onOpenFile(markdown);
            }
          };
          input.click();
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Open error:', err);
        }
      }
    },
    onPrint: () => {
      window.print();
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="editor-wrapper" style={{ fontFamily }}>
      <Toolbar 
        editor={editor} 
        onOpenFile={onOpenFile || (() => {})} 
        onNewDocument={onNewDocument || (() => {})} 
        currentFileHandle={currentFileHandle}
        onFileHandleChange={onFileHandleChange}
        fontFamily={fontFamily}
        onFontFamilyChange={handleFontFamilyChange}
      />
      <div className="editor-container">
        <EditorContent editor={editor} />
      </div>
      <div className="editor-statusbar">
        <span className={`status-item autosave-status autosave-${autosaveStatus}`}>
          {AUTOSAVE_LABELS[autosaveStatus]}
        </span>
        <span className="status-item">
          {editor.storage.characterCount ? editor.storage.characterCount.words() : 0} words
        </span>
        <span className="status-item">
          {editor.storage.characterCount ? editor.storage.characterCount.characters() : 0} characters
        </span>
      </div>
    </div>
  );
}
