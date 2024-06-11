import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import global_en from './translation/eng/global.json';
import global_pl from './translation/pl/global.json';

import li8next from 'i18next';
import { I18nextProvider } from 'react-i18next';

li8next.init({
  interpolation: { escapeValue: true },
  lng: 'en',
  resources: {
    en: {
      global: global_en,
    },
    pl: {
      global: global_pl,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={li8next}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
