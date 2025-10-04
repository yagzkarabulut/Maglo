import React, { useEffect, useRef } from 'react';
import formatCurrency from '../../../../utils/formatCurrency';
import { formatDateLong } from '../../../../utils/formatDate';

const SelectedDetail = ({ detail, onClose }) => {
  const details = Array.isArray(detail) ? detail : [detail];
  const incomes = details.filter((item) => item.type === "income");
  const expenses = details.filter((item) => item.type === "expense");
  const dialogRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  // Focus trap & ESC close
  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement;
    const node = dialogRef.current;
    if (node) {
      // Focus first focusable
      const focusable = node.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable) focusable.focus();
    }
    function handleKey(e) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      } else if (e.key === 'Tab') {
        if (!node) return;
        const focusables = Array.from(node.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ));
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', handleKey, true);
    // Prevent body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey, true);
      document.body.style.overflow = originalOverflow;
      if (previouslyFocusedRef.current && previouslyFocusedRef.current.focus) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [onClose]);

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };
  if (!detail) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4" onMouseDown={handleBackdrop} role="presentation">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="İşlem Detayları"
        className="relative bg-white p-4 sm:p-5 md:p-8 rounded-xl shadow-xl w-full max-w-lg transition-all duration-300 ease-out animate-fadeInScale border border-gray-100"
        style={{ animation: 'fadeInScale 0.3s cubic-bezier(0.4,0,0.2,1)' }}
      >
      <h2 className="text-lg font-bold mb-2">Detaylar</h2>
      {incomes.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-green-600 mb-1">Gelirler</h3>
          {incomes.map((item, idx) => (
            <div key={item.id || idx} className="mb-2 border-b last:border-b-0 pb-1 last:pb-0">
              <p className="mb-1 text-sm sm:text-base"><b>Tarih:</b> {formatDateLong(item.date, 'tr-TR')}</p>
              <p className="mb-1 text-sm sm:text-base"><b>Tutar:</b> {formatCurrency(item.amount, item.currency || "TRY", "tr-TR")}</p>
              <p className="mb-1 text-sm sm:text-base"><b>Kategori:</b> {item.category}</p>
              <p className="mb-1 text-sm sm:text-base"><b>Açıklama:</b> {item.description}</p>
            </div>
          ))}
        </div>
      )}
      {expenses.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-red-500 mb-1">Giderler</h3>
          {expenses.map((item, idx) => (
            <div key={item.id || idx} className="mb-2 border-b last:border-b-0 pb-1 last:pb-0">
              <p className="mb-1 text-sm sm:text-base"><b>Tarih:</b> {formatDateLong(item.date, 'tr-TR')}</p>
              <p className="mb-1 text-sm sm:text-base"><b>Tutar:</b> {formatCurrency(item.amount, item.currency || "TRY", "tr-TR")}</p>
              <p className="mb-1 text-sm sm:text-base"><b>Kategori:</b> {item.category}</p>
              <p className="mb-1 text-sm sm:text-base"><b>Açıklama:</b> {item.description}</p>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-lime-400"
        >
          Kapat
        </button>
      </div>
      </div>
    </div>
  );
};

export default SelectedDetail;
