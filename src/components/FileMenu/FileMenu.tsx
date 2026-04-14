import { Editor } from '@tiptap/react';
import { htmlToMarkdown, downloadFile } from '../../utils/fileUtils';
import './FileMenu.css';

interface FileMenuProps {
  editor: Editor;
  onOpenFile: (content: string) => void;
}

export function FileMenu({ editor, onOpenFile }: FileMenuProps) {
  const handleSave = () => {
    const filename = prompt('Enter filename:', 'document.md');
    if (!filename) return; // User cancelled
    
    const html = editor.getHTML();
    const markdown = htmlToMarkdown(html);
    downloadFile(markdown, filename, 'text/markdown');
  };

  const handleOpenClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.md,.markdown,.txt';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const content = await file.text();
        onOpenFile(content);
      }
    };
    input.click();
  };

  const handleExportHTML = () => {
    const html = editor.getHTML();
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Document</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 2rem auto; padding: 1rem; line-height: 1.6; }
    pre { background: #f6f8fa; padding: 1em; border-radius: 6px; overflow-x: auto; }
    code { background: #f6f8fa; padding: 0.2em 0.4em; border-radius: 3px; }
    table { border-collapse: collapse; width: 100%; margin: 1em 0; }
    th, td { border: 1px solid #ddd; padding: 0.5em 1em; text-align: left; }
    th { background: #f6f8fa; }
    blockquote { border-left: 4px solid #ddd; padding-left: 1em; color: #666; }
  </style>
</head>
<body>
${html}
</body>
</html>`;
    downloadFile(fullHTML, 'document.html', 'text/html');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="file-menu">
      <button onClick={handleSave} className="file-menu-btn" title="Save as Markdown (Ctrl+S)">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
      </button>
      <button onClick={handleOpenClick} className="file-menu-btn" title="Open Markdown File (Ctrl+O)">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
      </button>
      <button onClick={handleExportHTML} className="file-menu-btn" title="Export as HTML">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
      </button>
      <button onClick={handlePrint} className="file-menu-btn" title="Print (Ctrl+P)">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
      </button>
    </div>
  );
}
