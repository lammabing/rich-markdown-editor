import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './ErrorBoundary.tsx'
import { DebugOverlay } from './DebugOverlay.tsx'

console.log('[main.tsx] React app starting...')

const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('[main.tsx] Root element not found!')
} else {
  console.log('[main.tsx] Root element found, creating React app...')
  try {
    const root = createRoot(rootElement)
    console.log('[main.tsx] React root created, rendering App...')
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
          <DebugOverlay />
        </ErrorBoundary>
      </StrictMode>,
    )
    console.log('[main.tsx] App rendered successfully!')
  } catch (error) {
    console.error('[main.tsx] Error rendering app:', error)
  }
}
