import { useState, useCallback } from 'react';
import { Editor } from './components/Editor';
import { markdownToHtml } from './utils/fileUtils';
import exampleContent from '../example-content.md?raw';
import './App.css';

function App() {
  const [content, setContent] = useState(() => {
    // Load example content on initialization
    try {
      return markdownToHtml(exampleContent);
    } catch (error) {
      console.error('[App] Error initializing content:', error);
      return '';
    }
  });

  const handleOpenFile = (markdownContent: string) => {
    const html = markdownToHtml(markdownContent);
    setContent(html);
  };

  const handleChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  return (
    <div className="app">
      <Editor
        content={content}
        onChange={handleChange}
        onOpenFile={handleOpenFile}
      />
    </div>
  );
}

export default App;
