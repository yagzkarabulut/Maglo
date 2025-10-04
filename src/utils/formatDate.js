// Unified date formatting utility
// Usage: formatDate(date, { style: 'short' | 'long' | 'monthDay' | 'chartTick', locale })
// Defaults: style='short', locale='tr-TR'
export function formatDate(dateInput, { style = 'short', locale = 'tr-TR' } = {}) {
  if (!dateInput) return '';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return '';
  const STYLE_MAP = {
    short: { day: '2-digit', month: 'short', year: 'numeric' },
    long: { day: '2-digit', month: 'long', year: 'numeric' },
    monthDay: { day: '2-digit', month: 'short' },
    chartTick: { day: '2-digit', month: 'short' }
  };
  const opts = STYLE_MAP[style] || STYLE_MAP.short;
  return d.toLocaleDateString(locale, opts);
}

// Convenience wrappers for common patterns
export function formatDateShort(d, locale) { return formatDate(d, { style: 'short', locale }); }
export function formatDateLong(d, locale) { return formatDate(d, { style: 'long', locale }); }
export function formatDateTick(d, locale) { return formatDate(d, { style: 'chartTick', locale }); }

export default formatDate;
