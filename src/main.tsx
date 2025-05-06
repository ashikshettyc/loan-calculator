import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ExchangeRateProvider } from './context/FetchCurrencyContext.tsx';
import { ThemeContextProvider } from './context/ThemeContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
      <ExchangeRateProvider>
        <App />
      </ExchangeRateProvider>
    </ThemeContextProvider>
  </StrictMode>
);
