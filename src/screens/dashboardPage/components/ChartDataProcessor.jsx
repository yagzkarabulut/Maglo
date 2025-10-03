import React from "react";

// Veriyi işleyip, her tarih için income, expense ve net hesaplar
export default function ChartDataProcessor({ transactions, children }) {
  // Tüm tarihleri bul (en eski ve en yeni arası)
  const dates = transactions.map(t => t.date).sort();
  const minDate = dates[0];
  const maxDate = dates[dates.length - 1];
  // Tarih aralığını dizi olarak oluştur
  function getDateArray(start, end) {
    const arr = [];
    let dt = new Date(start);
    const endDt = new Date(end);
    while (dt <= endDt) {
      arr.push(dt.toISOString().slice(0, 10));
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  }
  const allDates = getDateArray(minDate, maxDate);
  // Her gün için income/expense/net hesapla
  const grouped = {};
  allDates.forEach(date => {
    grouped[date] = { date, income: 0, expense: 0, net: 0 };
  });
  transactions.forEach(item => {
    if (item.type === "income") {
      grouped[item.date].income += item.amount;
    } else if (item.type === "expense") {
      grouped[item.date].expense += item.amount;
    }
    grouped[item.date].net = grouped[item.date].income - grouped[item.date].expense;
  });
  // Tarihe göre sıralı dizi
  const chartData = allDates.map(date => grouped[date]);
  return children(chartData);
}
