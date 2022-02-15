import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider } from './context/appContext';
import App from './components/App';
import './assets/style/main.scss';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
