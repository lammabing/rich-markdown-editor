import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './ErrorBoundary.tsx'

console.info(
  '%c[Markdown Editor]%c If the page appears stuck or blank, browser extensions (ad blockers, style changers, dark mode) may interfere. Try disabling extensions or using Incognito mode.',
  'font-weight:bold;color:#3b82f6', 'font-weight:normal;color:inherit'
)

const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('[App] Root element not found!')
  throw new Error('Root element not found')
}

const root = createRoot(rootElement)
root.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
