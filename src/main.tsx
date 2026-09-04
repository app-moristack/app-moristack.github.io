import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import { App } from './App'
import { ErrorBoundary } from './components/ErrorBoundary'
import './styles/theme.css'

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root is missing from index.html')

createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      {/*
        HashRouter keeps every route reachable on GitHub Pages, which serves
        static files only and cannot rewrite unknown paths to index.html.
      */}
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  </StrictMode>,
)
