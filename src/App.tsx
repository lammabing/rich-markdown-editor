import { useState, useCallback } from 'react';
import { Editor } from './components/Editor';
import { markdownToHtml } from './utils/fileUtils';
import { useAutosave } from './hooks/useAutosave';
import exampleContent from '../example-content.md?raw';
import './App.css';

function App() {
  const [currentFileHandle, setCurrentFileHandle] = useState<FileSystemFileHandle | null>(null);

  const [showDraftBanner, setShowDraftBanner] = useState(() => {
    try {
      const ts = localStorage.getItem('editor-draft-timestamp');
      return ts !== null && parseInt(ts, 10) > 0;
    } catch {
      return false;
    }
  });

  const [content, setContent] = useState(() => {
    try {
      const draft = localStorage.getItem('editor-draft');
      if (draft) {
        return draft;
      }
      return markdownToHtml(exampleContent);
    } catch (error) {
      console.error('[App] Error initializing content:', error);
      return '';
    }
  });

  const autosave = useAutosave({
    content,
    currentFileHandle,
    onFileHandleChange: setCurrentFileHandle,
  });

  const hideDraftBanner = useCallback(() => {
    setShowDraftBanner(false);
  }, []);

  const handleOpenFile = useCallback((markdownContent: string) => {
    const html = markdownToHtml(markdownContent);
    setContent(html);
    autosave.clearDraft();
    setShowDraftBanner(false);
  }, [autosave]);

  const handleChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  const handleNewDocument = useCallback(() => {
    setContent('');
    setCurrentFileHandle(null);
    autosave.clearDraft();
    setShowDraftBanner(false);
  }, [autosave]);

  const handleFileHandleChange = useCallback((handle: FileSystemFileHandle | null) => {
    setCurrentFileHandle(handle);
  }, []);

  const handleRestoreDraft = useCallback(() => {
    const draft = autosave.loadDraft();
    if (draft) {
      setContent(draft.content);
      setShowDraftBanner(false);
    }
  }, [autosave]);

  return (
    <div className="app">
      {showDraftBanner && (
        <div className="draft-banner">
          <span>Unsaved changes from a previous session found. Restore?</span>
          <button className="draft-banner-btn draft-banner-restore" onClick={handleRestoreDraft}>
            Restore
          </button>
          <button className="draft-banner-btn draft-banner-dismiss" onClick={() => { autosave.clearDraft(); hideDraftBanner(); }}>
            Dismiss
          </button>
        </div>
      )}
      <Editor
        content={content}
        onChange={handleChange}
        onOpenFile={handleOpenFile}
        onNewDocument={handleNewDocument}
        currentFileHandle={currentFileHandle}
        onFileHandleChange={handleFileHandleChange}
        autosaveStatus={autosave.status}
        onAutosaveClearDraft={autosave.clearDraft}
      />
    </div>
  );
}

export default App;
