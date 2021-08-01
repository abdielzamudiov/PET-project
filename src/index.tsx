import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SpotifyTokenProvider } from './contexts/SpotifyTokenContext';

ReactDOM.render(
  <React.StrictMode>
    <SpotifyTokenProvider>
      <App />
    </SpotifyTokenProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

