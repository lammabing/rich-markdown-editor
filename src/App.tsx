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

<p>Inline math: <span data-latex="E = mc^2" data-display-mode="false"></span></p>

<p>Block math equation:</p>
<span data-latex="\int_{0}^{\infty} x^2 dx = \left[\frac{x^3}{3}\right]_{0}^{\infty}" data-display-mode="true"></span>

<p>Another example - Euler's identity:</p>
<span data-latex="e^{i\pi} + 1 = 0" data-display-mode="true"></span>

<h2>💻 Code Support</h2>

<h3>Inline Code</h3>

<p>Use <code>console.log()</code> for debugging or <code>npm install</code> to add packages. Inline code is styled with a monospace font and light background.</p>

<h3>Code Blocks with Syntax Highlighting</h3>

<p>Code blocks support syntax highlighting for multiple languages:</p>

<pre><code class="language-javascript">// JavaScript Example
function greet(name) {
  console.log("Hello, " + name + "!");
  return "Welcome, " + name + "!";
}

greet("World");</code></pre>

<pre><code class="language-python"># Python Example
def fibonacci(n):
    """Generate Fibonacci sequence up to n terms."""
    if n &lt;= 0:
        return []
    elif n == 1:
        return [0]
    
    sequence = [0, 1]
    while len(sequence) &lt; n:
        next_num = sequence[-1] + sequence[-2]
        sequence.append(next_num)
    
    return sequence

print(fibonacci(10))</code></pre>

<pre><code class="language-typescript">// TypeScript Example
interface User {
  id: number;
  name: string;
  email: string;
}

const createUser = (name: string, email: string): User =&gt; {
  return {
    id: Date.now(),
    name: name,
    email: email
  };
};</code></pre>

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
