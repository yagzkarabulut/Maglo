// src/utils/formatCurrency.js

/**
 * Parasal değeri istenen para birimi ve locale ile formatlar.
 * @param {number} value - Formatlanacak değer
 * @param {string} currency - Para birimi kodu (örn: 'TRY', 'USD', 'EUR')
 * @param {string} locale - Locale (örn: 'tr-TR', 'en-US')
 * @returns {string}
 */
export default function formatCurrency(value, currency = "TRY", locale = "tr-TR") {
  if (typeof value !== "number") return "-";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}
