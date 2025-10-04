import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';

// Currency context keeps current currency (USD | TRY) and toggle / setter
const CurrencyContext = createContext({ currency: 'USD', setCurrency: () => {}, toggleCurrency: () => {} });

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => localStorage.getItem('currency') || 'USD');

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const toggleCurrency = useCallback(() => {
    setCurrency(c => c === 'USD' ? 'TRY' : 'USD');
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

export default CurrencyContext;
