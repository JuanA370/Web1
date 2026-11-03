import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// StrictMode monta dos veces en desarrollo: el cleanup del efecto aborta la primera petición
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
