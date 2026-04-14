import { useEditor, EditorContent } from '@tiptap/react';
import { useEffect, useRef } from 'react';
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
import './Editor.css';

const lowlight = createLowlight(common);

/**
 * Convert data-color attributes to inline styles for proper rendering
 */
function applyDataColors(html: string): string {
  if (typeof window === 'undefined') return html;
  
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
}

export function Editor({ content = '', onChange, onOpenFile }: EditorProps) {
  const isInitialMount = useRef(true);
  const isUpdatingFromProp = useRef(false);
  const prevContentRef = useRef('');

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
      prevContentRef.current = newHTML;
      onChange?.(newHTML);
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
    if (content && processedContent !== prevContentRef.current) {
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
    onSave: () => {
      if (!editor) return;
      const filename = prompt('Enter filename:', 'document.md');
      if (!filename) return; // User cancelled
      
      const html = editor.getHTML();
      const markdown = htmlToMarkdown(html);
      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    },
    onOpen: () => {
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
    },
    onPrint: () => {
      window.print();
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="editor-wrapper">
      <Toolbar editor={editor} onOpenFile={onOpenFile || (() => {})} />
      <div className="editor-container">
        <EditorContent editor={editor} />
      </div>
      <div className="editor-statusbar">
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
