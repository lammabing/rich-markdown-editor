import { useEditor, EditorContent } from '@tiptap/react';
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
import { MathExtension } from '../../extensions/MathExtension';
import { Highlight } from '../../extensions/Highlight';
import { CriticDeletion, CriticInsertion, CriticHighlight } from '../../extensions/CriticMarkup';
import { FootnoteReference, FootnoteDefinition } from '../../extensions/Footnotes';
import { AlertExtension } from '../../extensions/AlertExtension';
import { EmojiExtension } from '../../extensions/EmojiExtension';
import { HTMLBlockExtension } from '../../extensions/HTMLBlockExtension';
import { HelpExtension } from '../../extensions/HelpExtension';
import SlashCommandExtension from '../../extensions/SlashCommandExtension.js';
import { Toolbar } from '../Toolbar/Toolbar';
import './Editor.css';

const lowlight = createLowlight(common);

export interface EditorProps {
  content?: string;
  onChange?: (content: string) => void;
}

export function Editor({ content = '', onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        codeBlock: false,
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
      Highlight,
      CriticDeletion,
      CriticInsertion,
      CriticHighlight,
      FootnoteReference,
      FootnoteDefinition,
      AlertExtension,
      EmojiExtension,
      HTMLBlockExtension,
      HelpExtension,
      Placeholder.configure({
        placeholder: 'Type \'/\' for commands or start writing...',
      }),
      SlashCommandExtension,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none max-w-none editor-content',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="editor-wrapper">
      <Toolbar editor={editor} />
      <div className="editor-container">
        <EditorContent editor={editor} />
      </div>
      <div className="editor-statusbar">
        <span className="status-item">
          {editor.storage.characterCount?.words() || 0} words
        </span>
        <span className="status-item">
          {editor.storage.characterCount?.characters() || 0} characters
        </span>
      </div>
    </div>
  );
}
