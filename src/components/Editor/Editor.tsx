import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { slashCommand } from '../SlashCommand';
import './Editor.css';

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
      }),
      Color,
      TextStyle,
      Underline,
      Placeholder.configure({
        placeholder: 'Type \'/\' for commands or start writing...',
      }),
      slashCommand,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none max-w-none',
      },
    },
  });

  return (
    <div className="editor-container w-full h-full">
      <EditorContent editor={editor} />
    </div>
  );
}
