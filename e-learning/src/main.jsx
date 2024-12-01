import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure your global styles are correctly applied
import App from './components/App'; // Correct path to App.jsx

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
