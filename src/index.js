import './index.css';
import App from './App';
import React from 'react';
import './assets/customCss/theme.css';
import Context from './Context/Context';
import ReactDOM from 'react-dom/client';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>
);