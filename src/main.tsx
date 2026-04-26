import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import ContextStore, { ContextStoreProvider } from './Context/contextStore';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextStoreProvider>
    <App />
    </ContextStoreProvider>
  </React.StrictMode>,
);
