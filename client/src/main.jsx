import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { EventProvider } from './context/EventContext'; // Import Context

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EventProvider> {/* Wrap App with Provider */}
      <App />
    </EventProvider>
  </StrictMode>
);  