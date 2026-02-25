import { Editor } from '@tiptap/react';
import { htmlToMarkdown, downloadFile } from '../../utils/fileUtils';
import './FileMenu.css';

interface FileMenuProps {
  editor: Editor;
  onOpenFile: (content: string) => void;
}

export function FileMenu({ editor, onOpenFile }: FileMenuProps) {
  const handleSave = () => {
    const html = editor.getHTML();
    const markdown = htmlToMarkdown(html);
    downloadFile(markdown, 'document.md', 'text/markdown');
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
        💾 Save
      </button>
      <button onClick={handleOpenClick} className="file-menu-btn" title="Open Markdown File (Ctrl+O)">
        📂 Open
      </button>
      <button onClick={handleExportHTML} className="file-menu-btn" title="Export as HTML">
        📄 Export HTML
      </button>
      <button onClick={handlePrint} className="file-menu-btn" title="Print (Ctrl+P)">
        🖨️ Print
      </button>
    </div>
  );
}
