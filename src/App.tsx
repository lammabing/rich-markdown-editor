import { useState, useEffect } from 'react';
import { Editor } from './components/Editor';
import { markdownToHtml } from './utils/fileUtils';
import exampleContent from '../example-content.md?raw';
import './App.css';

console.log('[App] App component loading...')

function App() {
  console.log('[App] App component rendering...')

  const [content, setContent] = useState(() => {
    console.log('[App] Initializing content from example file...')
    // Load example content on initialization
    try {
      const html = markdownToHtml(exampleContent);
      console.log('[App] Content initialized, length:', html.length)
      console.log('[App] First 500 chars of HTML:', html.substring(0, 500))
      return html;
    } catch (error) {
      console.error('[App] Error initializing content:', error);
      return '';
    }
  });

  useEffect(() => {
    console.log('[App] Content state:', content.substring(0, 100));
  }, [content]);

  const handleOpenFile = (markdownContent: string) => {
    const html = markdownToHtml(markdownContent);
    setContent(html);
  };

  console.log('[App] Returning JSX, content length:', content.length)

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
