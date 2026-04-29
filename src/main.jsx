import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// TODO (Prompt 03+): For react-snap pre-rendering, swap createRoot for hydrateRoot:
//   import { hydrateRoot } from 'react-dom/client'
//   const root = document.getElementById('root')
//   root.hasChildNodes()
//     ? hydrateRoot(root, <StrictMode><App /></StrictMode>)
//     : createRoot(root).render(<StrictMode><App /></StrictMode>)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
