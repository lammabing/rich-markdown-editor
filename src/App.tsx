import { useState } from 'react';
import { Editor } from './components/Editor';
import { markdownToHtml } from './utils/fileUtils';
import './App.css';

const defaultContent = `
<h1>Welcome to the Markdown Editor! 👋</h1>

<p>This is a <strong>modern, feature-rich</strong> markdown editor with real-time in-place rendering.</p>

<h2>🚀 Quick Start</h2>

<p>Type <code>/</code> to open the command palette and see all available commands!</p>

<h3>Try these commands:</h3>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false"><div><p>Type <code>/help</code> to see the syntax guide</p></div></li>
  <li data-type="taskItem" data-checked="false"><div><p>Type <code>/tip</code> to insert a tip callout</p></div></li>
  <li data-type="taskItem" data-checked="false"><div><p>Type <code>/table</code> to insert a table</p></div></li>
  <li data-type="taskItem" data-checked="true"><div><p>Use the toolbar above for quick formatting</p></div></li>
</ul>

<h2>💡 Tip Callout</h2>

<div data-alert-type="tip">
  <p><strong>💡 TIP</strong></p>
  <p>Use the toolbar buttons above for quick access to common formatting options!</p>
</div>

<h2>📊 Example Table</h2>

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Status</th>
      <th>Priority</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Real-time Rendering</td>
      <td>✅ Done</td>
      <td>High</td>
    </tr>
    <tr>
      <td>Slash Commands</td>
      <td>✅ Done</td>
      <td>High</td>
    </tr>
    <tr>
      <td>Syntax Highlighting</td>
      <td>✅ Done</td>
      <td>Medium</td>
    </tr>
  </tbody>
</table>

<h2>∑ Math Support</h2>

<p>Type <code>/inline-math</code> for inline equations like $x^2$ or <code>/block-math</code> for displayed equations.</p>

<div data-alert-type="tip">
  <p><strong>💡 TIP</strong></p>
  <p>Try typing <code>/math</code> and selecting "Inline Math" or "Block Math" from the command menu!</p>
</div>

<h2>💻 Code Support</h2>

<h3>Inline Code</h3>

<p>Use backticks for <code>inline code</code> like <code>console.log()</code> or <code>npm install</code>.</p>

<h3>Code Blocks with Syntax Highlighting</h3>

<p>Type <code>/code</code> or <code>/code-block</code> to insert a code block, then specify the language.</p>

<div data-alert-type="note">
  <p><strong>📝 NOTE</strong></p>
  <p>Supported languages include: JavaScript, TypeScript, Python, Java, C++, Go, Rust, Ruby, PHP, HTML, CSS, SQL, and many more!</p>
</div>

<h2>📋 Note Callout</h2>

<div data-alert-type="note">
  <p><strong>📝 NOTE</strong></p>
  <p>For full documentation, see <strong>README.md</strong> in the project root.</p>
</div>

<h2>💾 Save & Open Files</h2>

<p>Use the file menu in the toolbar:</p>
<ul>
  <li><strong>💾 Save</strong> - Download as Markdown file (Ctrl+S)</li>
  <li><strong>📂 Open</strong> - Open a Markdown file (Ctrl+O)</li>
  <li><strong>📄 Export HTML</strong> - Export as styled HTML</li>
  <li><strong>🖨️ Print</strong> - Print the document (Ctrl+P)</li>
</ul>

<p>Happy writing! ✍️</p>
`;

function App() {
  const [content, setContent] = useState(defaultContent);

  const handleOpenFile = (markdownContent: string) => {
    const html = markdownToHtml(markdownContent);
    setContent(html);
  };

  return (
    <div className="app">
      <Editor 
        content={content} 
        onChange={setContent}
        onOpenFile={handleOpenFile}
      />
    </div>
  );
}

export default App;
