import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import './styles.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <div className="bg-gray-100 min-h-screen">
        <App />
      </div>
    </React.StrictMode>
  );
}
