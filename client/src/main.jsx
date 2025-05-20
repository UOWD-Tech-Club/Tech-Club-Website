import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop.js';

// Configure future flags for React Router
const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/Tech-Club-Website/" {...routerConfig}>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </StrictMode>,
);
