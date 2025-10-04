import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';

// Simple segmented control style toggle (USD <-> TRY)
const CurrencySwitch = () => {
  const { currency, toggleCurrency } = useCurrency();
  return (
    <div className="inline-flex items-center bg-gray-100 rounded-full p-1 text-xs font-semibold select-none" role="group" aria-label="Currency switch">
      <button
        type="button"
        onClick={() => currency !== 'USD' && toggleCurrency()}
        className={`px-3 py-1 rounded-full transition-colors ${currency === 'USD' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
        aria-pressed={currency === 'USD'}
      >USD</button>
      <button
        type="button"
        onClick={() => currency !== 'TRY' && toggleCurrency()}
        className={`px-3 py-1 rounded-full transition-colors ${currency === 'TRY' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
        aria-pressed={currency === 'TRY'}
      >TRY</button>
    </div>
  );
};

export default CurrencySwitch;
