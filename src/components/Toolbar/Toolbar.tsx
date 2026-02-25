import { Editor } from '@tiptap/react';
import { FileMenu } from '../FileMenu/FileMenu';
import './Toolbar.css';

interface ToolbarProps {
  editor: Editor;
  onOpenFile: (content: string) => void;
}

export function Toolbar({ editor, onOpenFile }: ToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="toolbar">
      <FileMenu editor={editor} onOpenFile={onOpenFile} />

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          title="Heading 1"
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          title="Heading 2"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          title="Heading 3"
        >
          H3
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
          title="Underline (Ctrl+U)"
        >
          <u>U</u>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
          title="Strikethrough"
        >
          <s>S</s>
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          title="Bullet List"
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
          title="Numbered List"
        >
          1. List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={editor.isActive('taskList') ? 'is-active' : ''}
          title="Task List"
        >
          ☑ Task
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
          title="Blockquote"
        >
          ❝ Quote
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
          title="Code Block"
        >
          {'</>'}
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive('highlight') ? 'is-active' : ''}
          title="Highlight"
        >
          🖍️
        </button>
        <button
          onClick={() => editor.chain().focus().insertAlert({ alertType: 'note' }).run()}
          title="Note Callout"
        >
          📝
        </button>
        <button
          onClick={() => editor.chain().focus().insertAlert({ alertType: 'tip' }).run()}
          title="Tip Callout"
        >
          💡
        </button>
        <button
          onClick={() => editor.chain().focus().insertAlert({ alertType: 'warning' }).run()}
          title="Warning Callout"
        >
          ⚠️
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          title="Insert Table"
        >
          📊 Table
        </button>
        <button
          onClick={() => editor.chain().focus().insertMath({ latex: 'x^2', displayMode: false }).run()}
          title="Inline Math"
        >
          ∑ Math
        </button>
        <button
          onClick={() => editor.chain().focus().insertEmoji({ emoji: '😀' }).run()}
          title="Insert Emoji"
        >
          😀
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (Ctrl+Z)"
        >
          ↩️
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (Ctrl+Y)"
        >
          ↪️
        </button>
      </div>

      <div className="toolbar-spacer" />

      <div className="toolbar-group toolbar-colors">
        <button
          onClick={() => editor.chain().focus().setColor('#dc2626').run()}
          className="color-btn color-red"
          title="Red Text"
        >
          A
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#16a34a').run()}
          className="color-btn color-green"
          title="Green Text"
        >
          A
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#2563eb').run()}
          className="color-btn color-blue"
          title="Blue Text"
        >
          A
        </button>
        <button
          onClick={() => editor.chain().focus().unsetColor().run()}
          title="Clear Color"
        >
          🎨 Clear
        </button>
      </div>
    </div>
  );
}
