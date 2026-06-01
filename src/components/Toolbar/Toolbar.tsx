import { useState } from 'react';
import { Editor } from '@tiptap/react';
import { FileMenu } from '../FileMenu/FileMenu';
import { FONTS } from '../../utils/fontLoader';
import './Toolbar.css';

interface ToolbarProps {
  editor: Editor;
  onOpenFile: (content: string) => void;
  onNewDocument: () => void;
  currentFileHandle?: FileSystemFileHandle | null;
  onFileHandleChange?: (handle: FileSystemFileHandle | null) => void;
  fontFamily?: string;
  onFontFamilyChange?: (cssFamily: string) => void;
}

export function Toolbar({ editor, onOpenFile, onNewDocument, currentFileHandle, onFileHandleChange, fontFamily, onFontFamilyChange }: ToolbarProps) {
  const [mathDialogOpen, setMathDialogOpen] = useState(false);
  const [blockMathDialogOpen, setBlockMathDialogOpen] = useState(false);
  const [mathInput, setMathInput] = useState('');

  const insertMath = () => {
    if (mathInput.trim()) {
      editor.chain().focus().insertMath({ latex: mathInput.trim(), displayMode: false }).run();
    }
    setMathInput('');
    setMathDialogOpen(false);
  };

  const insertBlockMath = () => {
    if (mathInput.trim()) {
      editor.chain().focus().insertBlockMath({ latex: mathInput.trim() }).run();
    }
    setMathInput('');
    setBlockMathDialogOpen(false);
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="toolbar">
      <FileMenu editor={editor} onOpenFile={onOpenFile} onNewDocument={onNewDocument} currentFileHandle={currentFileHandle} onFileHandleChange={onFileHandleChange} />

      <div className="toolbar-divider" />

      <div className="toolbar-group" title="Headings">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          title="Heading 1 (H1)"
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          title="Heading 2 (H2)"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          title="Heading 3 (H3)"
        >
          H3
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group" title="Text Formatting">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
          title="Bold (Ctrl+B)"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          title="Italic (Ctrl+I)"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
          title="Underline (Ctrl+U)"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path><line x1="4" y1="21" x2="20" y2="21"></line></svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
          title="Strikethrough"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"></path><path d="M14 12a4 4 0 0 1 0 8H6"></path><line x1="4" y1="12" x2="20" y2="12"></line></svg>
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group" title="Lists">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          title="Bullet List"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
          title="Numbered List"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="10" y1="6" x2="21" y2="6"></line><line x1="10" y1="12" x2="21" y2="12"></line><line x1="10" y1="18" x2="21" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path></svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={editor.isActive('taskList') ? 'is-active' : ''}
          title="Task List"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group" title="Blocks">
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
          title="Blockquote"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path></svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
          title="Code Block"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group" title="Formatting">
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive('highlight') ? 'is-active' : ''}
          title="Highlight"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
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

      <div className="toolbar-group" title="Insert">
        <button
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          title="Insert Table"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>
        </button>
        <button
          onClick={() => setMathDialogOpen(true)}
          title="Inline Math"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 18l4-12h4l4 12"></path><line x1="4" y1="12" x2="20" y2="12"></line></svg>
        </button>
        <button
          onClick={() => setBlockMathDialogOpen(true)}
          title="Block Math"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="12" x2="21" y2="12"></line><line x1="8" y1="6" x2="16" y2="18"></line></svg>
        </button>
        <button
          onClick={() => editor.chain().focus().insertEmoji({ emoji: '😀' }).run()}
          title="Insert Emoji"
        >
          😀
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group" title="History">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (Ctrl+Z)"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path></svg>
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (Ctrl+Y)"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 3.7"></path></svg>
        </button>
      </div>

      <div className="toolbar-spacer" />

      <div className="toolbar-group toolbar-colors" title="Text Colors">
        <button
          onClick={() => editor.chain().focus().setColor('#dc2626').run()}
          className="color-btn color-red"
          title="Red Text"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#16a34a').run()}
          className="color-btn color-green"
          title="Green Text"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#2563eb').run()}
          className="color-btn color-blue"
          title="Blue Text"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
        </button>
        <button
          onClick={() => editor.chain().focus().unsetColor().run()}
          title="Clear Color"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group toolbar-font" title="Font Family">
        <select
          className="font-select"
          value={fontFamily || ''}
          onChange={(e) => onFontFamilyChange?.(e.target.value)}
          title="Editor Font"
        >
          {(['sans-serif', 'serif', 'monospace'] as const).map(category => (
            <optgroup key={category} label={category === 'sans-serif' ? 'Sans Serif' : category === 'serif' ? 'Serif' : 'Monospace'}>
              {FONTS.filter(f => f.category === category).map(font => (
                <option key={font.family} value={font.cssFamily} style={{ fontFamily: font.cssFamily }}>
                  {font.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      {mathDialogOpen && (
        <div className="dialog-overlay" onClick={() => setMathDialogOpen(false)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Insert Inline Math</h3>
            <input
              type="text"
              value={mathInput}
              onChange={(e) => setMathInput(e.target.value)}
              placeholder="Enter LaTeX (e.g., \frac{a}{b})"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') insertMath();
                if (e.key === 'Escape') setMathDialogOpen(false);
              }}
            />
            <div className="dialog-buttons">
              <button onClick={() => setMathDialogOpen(false)}>Cancel</button>
              <button onClick={insertMath} className="primary">Insert</button>
            </div>
          </div>
        </div>
      )}
      {blockMathDialogOpen && (
        <div className="dialog-overlay" onClick={() => setBlockMathDialogOpen(false)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Insert Block Math</h3>
            <input
              type="text"
              value={mathInput}
              onChange={(e) => setMathInput(e.target.value)}
              placeholder="Enter LaTeX (e.g., \int_0^1 x dx)"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') insertBlockMath();
                if (e.key === 'Escape') setBlockMathDialogOpen(false);
              }}
            />
            <div className="dialog-buttons">
              <button onClick={() => setBlockMathDialogOpen(false)}>Cancel</button>
              <button onClick={insertBlockMath} className="primary">Insert</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
