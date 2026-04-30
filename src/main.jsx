import { hydrateRoot, createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const root = document.getElementById('root');
const AppTree = <App />;

// react-snap pre-renders pages — on those pages we hydrate instead of re-render.
if (root.hasChildNodes()) {
  hydrateRoot(root, AppTree);
} else {
  createRoot(root).render(AppTree);
}
