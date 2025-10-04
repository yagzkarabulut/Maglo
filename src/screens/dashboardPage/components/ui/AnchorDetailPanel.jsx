import React from 'react';
import formatCurrency from '../../../../utils/formatCurrency';

// Reusable anchored detail panel (used in MainDashboard-like behavior)
// Props:
// - anchor: { detail: obj | obj[], x: number, y: number }
// - containerRef: ref to relative positioned parent for boundary clamping
// - onClose: function to close panel
export default function AnchorDetailPanel({ anchor, containerRef, onClose }) {
  if (!anchor) return null;
  const details = Array.isArray(anchor.detail) ? anchor.detail : [anchor.detail];
  const isMulti = details.length > 1;
  const incomeTotal = details.filter(d=>d.type==='income').reduce((s,d)=> s + (Number(d.amount)||0),0);
  const expenseTotal = details.filter(d=>d.type==='expense').reduce((s,d)=> s + (Number(d.amount)||0),0);
  const net = incomeTotal - expenseTotal;
  const currencyGuess = details[0]?.currency || 'TRY';

  const style = (() => {
    const PAD = 12;
    const panelW = 300; // approximate width
    const panelH = 240; // approximate height (will auto grow if needed)
    const rect = containerRef.current?.getBoundingClientRect();
    let left = anchor.x - panelW - 16; // try left of point
    if (left < 0) left = anchor.x + 16; // fallback to right
    let top = anchor.y - panelH / 2;
    if (top < 0) top = 0;
    const maxTop = (rect ? rect.height : 0) - panelH - PAD;
    if (top > maxTop) top = Math.max(0, maxTop);
    return { left, top };
  })();

  return (
    <div className="absolute z-40" style={style}>
      <div className="bg-white rounded-xl shadow-xl p-4 w-[300px] text-sm animate-fadeInScale relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xs" aria-label="Kapat">✕</button>
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{isMulti ? 'Seçilen Gün İşlemleri' : 'İşlem Detayı'}</h3>
          <div className="text-[11px] text-gray-500 mb-3">Toplam {details.length} kayıt</div>
          <ul className="space-y-2 max-h-56 overflow-auto pr-1">
            {details.slice(0,10).map((item, idx) => {
              const color = item.type === 'income' ? 'text-green-600' : 'text-red-500';
              return (
                <li key={idx} className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-start gap-4">
                    <span className={`text-xs font-medium uppercase tracking-wide ${color}`}>{item.type}</span>
                    <span className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <div className="mt-1 font-semibold text-gray-900 text-sm">{formatCurrency(Number(item.amount)||0, item.currency || currencyGuess, item.currency === 'TRY' ? 'tr-TR' : 'en-US')}</div>
                  {item.category && <div className="text-xs text-gray-600 mt-0.5">Kategori: {item.category}</div>}
                  {item.description && <div className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">{item.description}</div>}
                </li>
              );
            })}
          </ul>
          {details.length > 10 && <div className="mt-2 text-[11px] text-gray-500">+{details.length - 10} daha...</div>}
          {isMulti && (
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="p-2 rounded-lg bg-green-50">
                <div className="text-green-600 font-semibold text-xs">{formatCurrency(incomeTotal, currencyGuess, currencyGuess==='TRY'?'tr-TR':'en-US')}</div>
                <div className="text-gray-500 mt-0.5">Gelir</div>
              </div>
              <div className="p-2 rounded-lg bg-red-50">
                <div className="text-red-500 font-semibold text-xs">{formatCurrency(expenseTotal, currencyGuess, currencyGuess==='TRY'?'tr-TR':'en-US')}</div>
                <div className="text-gray-500 mt-0.5">Gider</div>
              </div>
              <div className="p-2 rounded-lg bg-gray-100">
                <div className={`font-semibold text-xs ${net>=0?'text-green-600':'text-red-500'}`}>{formatCurrency(net, currencyGuess, currencyGuess==='TRY'?'tr-TR':'en-US')}</div>
                <div className="text-gray-500 mt-0.5">Net</div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-3 text-right">
          <button onClick={onClose} className="px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 text-xs font-medium">Kapat</button>
        </div>
      </div>
    </div>
  );
}
