import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setupInterceptors } from '@utils/api';
import '@assets/styles/index.css';

// Register service worker for PWA support
if ('serviceWorker' in window) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
        console.log('ServiceWorker registration successful');
      })
      .catch((err) => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

// Initialize API interceptors
setupInterceptors();

// Error boundary for application
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);