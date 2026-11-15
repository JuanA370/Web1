import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App.jsx';

// Un único cliente para toda la app: guarda en caché las respuestas de las consultas
const queryClient = new QueryClient();

// Punto de entrada: monta la aplicación en el div#root de index.html dentro del proveedor de TanStack Query
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
