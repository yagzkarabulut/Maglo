import React, { useState } from 'react';
import formatCurrency from '../../../../utils/formatCurrency';

const TableDashboad = ({ data = [] }) => {
  const [currency, setCurrency] = useState("TRY");
  const locale = currency === "USD" ? "en-US" : currency === "EUR" ? "de-DE" : "tr-TR";
  return (
    <div className="mt-4 sm:mt-8 min-w-0">
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor="currency-select" className="text-sm font-semibold">Para Birimi:</label>
        <select
          id="currency-select"
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="TRY">₺ TL</option>
          <option value="USD">$ USD</option>
          <option value="EUR">€ EUR</option>
        </select>
      </div>
      <table className="table-auto border-collapse min-w-full whitespace-nowrap text-xs sm:text-sm bg-white shadow border rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 sm:px-4 py-2 text-left font-semibold">Tarih</th>
            <th className="px-2 sm:px-4 py-2 text-left font-semibold">Tür</th>
            <th className="px-2 sm:px-4 py-2 text-left font-semibold">Tutar</th>
            <th className="px-2 sm:px-4 py-2 text-left font-semibold">TL Karşılığı</th>
            <th className="px-2 sm:px-4 py-2 text-left font-semibold">Kategori</th>
            <th className="px-2 sm:px-4 py-2 text-left font-semibold">Açıklama</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-400">Veri yok</td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition-all duration-200 ease-in opacity-0 translate-y-2 animate-fadeInRow"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <td className="px-2 sm:px-4 py-2">
                  {new Date(item.date).toLocaleDateString(locale, { day: '2-digit', month: 'long', year: 'numeric' })}
                </td>
                <td className="px-2 sm:px-4 py-2">
                  <span className={item.type === "income" ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                    {item.type === "income" ? "Gelir" : "Gider"}
                  </span>
                </td>
                <td className={
                  `px-2 sm:px-4 py-2 ${item.type === "income" ? "text-green-600 font-semibold" : ""}`
                }>
                  {currency === "TRY"
                    ? formatCurrency(item.amount, "TRY", "tr-TR")
                    : currency === "USD"
                    ? formatCurrency(item.amount / 45, "USD", "en-US")
                    : formatCurrency(item.amount / 50, "EUR", "de-DE")}
                </td>
                <td className="px-2 sm:px-4 py-2">
                  {formatCurrency(item.amount, "TRY", "tr-TR")}
                </td>
                <td className="px-2 sm:px-4 py-2">{item.category}</td>
                <td className="px-2 sm:px-4 py-2">{item.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TableDashboad