import React from 'react';
import formatCurrency from '../../../../utils/formatCurrency';

const SelectedDetail = ({ detail, onClose }) => {
  if (!detail) return null;
  const details = Array.isArray(detail) ? detail : [detail];
  const incomes = details.filter((item) => item.type === "income");
  const expenses = details.filter((item) => item.type === "expense");
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
  };
  return (
    <div
      className="fixed top-10 right-96 bg-white p-3 sm:p-5 md:p-8 rounded-lg shadow-lg z-50 w-11/12 max-w-xs sm:max-w-md md:max-w-lg transition-all duration-300 ease-out animate-fadeInScale"
      style={{
        animation: 'fadeInScale 0.3s cubic-bezier(0.4,0,0.2,1)'
      }}
    >
      <h2 className="text-lg font-bold mb-2">Detaylar</h2>
      {incomes.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-green-600 mb-1">Gelirler</h3>
          {incomes.map((item, idx) => (
            <div key={item.id || idx} className="mb-2 border-b last:border-b-0 pb-1 last:pb-0">
              <p className="mb-1 text-sm sm:text-base"><b>Tarih:</b> {formatDate(item.date)}</p>
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
              <p className="mb-1 text-sm sm:text-base"><b>Tarih:</b> {formatDate(item.date)}</p>
              <p className="mb-1 text-sm sm:text-base"><b>Tutar:</b> {formatCurrency(item.amount, item.currency || "TRY", "tr-TR")}</p>
              <p className="mb-1 text-sm sm:text-base"><b>Kategori:</b> {item.category}</p>
              <p className="mb-1 text-sm sm:text-base"><b>Açıklama:</b> {item.description}</p>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={onClose}
        className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm sm:text-base"
      >
        Kapat
      </button>
    </div>
  );
};

export default SelectedDetail;
