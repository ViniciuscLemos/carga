import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Safari and Chrome may clear a site's storage when space runs low or it goes unused for a
// while; asking for persistent storage keeps the workouts from being thrown away with it.
navigator.storage?.persist?.().catch(() => {});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
