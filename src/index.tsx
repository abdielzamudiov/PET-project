import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SpotifyTokenProvider } from './contexts/SpotifyTokenContext';
import { ThemeProvider } from './contexts/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <SpotifyTokenProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </SpotifyTokenProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

