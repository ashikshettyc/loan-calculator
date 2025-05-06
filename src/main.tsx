import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ExchangeRateProvider } from './context/FetchCurrencyContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ExchangeRateProvider>
      <App />
    </ExchangeRateProvider>
  </StrictMode>
);
