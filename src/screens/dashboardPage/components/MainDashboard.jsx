import React from "react";
import ChartDataProcessor from "./ChartDataProcessor";
import IncomeExpenseChart from "./ui/IncomeExpenseChart";
import TableDashboard from "./ui/TableDashboard"; // renamed file
import db from "../../../components/services/db.services.json";
import Card from "./ui/Card";
import formatCurrency from "../../../utils/formatCurrency";
import Wallet from "./ui/Wallet";
import Transfer from "./ui/Transfer";
import Header from "../../../components/ui/Header";
import CurrencySwitch from "../../../components/ui/CurrencySwitch";
import { useCurrency } from '../../../context/CurrencyContext';

const MainDashboard = ({ userName, data, setSelectedDetail }) => {
  const transactions = db.transactions;
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  const [anchorDetail, setAnchorDetail] = React.useState(null); // { detail, x, y }
  const chartRef = React.useRef(null);

  const handleDotClick = (dot, evt) => {
    if (!dot?.date || !Array.isArray(data)) return;
    const details = data.filter((item) => item.date === dot.date);
    // Ekran koordinatlarını al ve chart container'a göre relative konum hesapla
    const rect = chartRef.current ? chartRef.current.getBoundingClientRect() : { left: 0, top: 0 };
    const x = (evt && evt.clientX) ? evt.clientX - rect.left : 0;
    const y = (evt && evt.clientY) ? evt.clientY - rect.top : 0;
    setAnchorDetail({ detail: details.length === 1 ? details[0] : details, x, y });
  };
  const closeAnchor = () => setAnchorDetail(null);

  const USD_TO_TRY = 34.5; // placeholder conversion
  const [activeCard, setActiveCard] = React.useState(0);
  const [selectedRange, setSelectedRange] = React.useState(7);
  const { currency } = useCurrency();

  const formatAmounts = (value) => {
    if (currency === 'TRY') {
      const tryVal = value * USD_TO_TRY;
      return formatCurrency(tryVal, 'TRY', 'tr-TR');
    }
    return formatCurrency(value, 'USD', 'en-US');
  };

  const handleCardClick = (index) => {
    setActiveCard(index);
  };

  return (
    <main className="p-4 md:p-8 flex-1 w-full">
      <Header userName={userName} />
      <div className="flex justify-end mb-4"><CurrencySwitch /></div>
        <div className="flex f-row gap-4">
          <div className="flex-1">
            <div className="flex flex-row gap-4 justify-between mb-8">
              <Card
                title="Total balance"
                value={formatAmounts(totalBalance)}
                icon="balance"
                active={activeCard === 0}
                onClick={() => handleCardClick(0)}
                className="flex-1"
                compact={currency === 'TRY'}
              />
              <Card
                title="Total spending"
                value={formatAmounts(totalExpense)}
                icon="spending"
                active={activeCard === 1}
                onClick={() => handleCardClick(1)}
                className="flex-1"
                compact={currency === 'TRY'}
              />
              <Card
                title="Total saved"
                value={formatAmounts(totalIncome)}
                icon="saved"
                active={activeCard === 2}
                onClick={() => handleCardClick(2)}
                className="flex-1"
                compact={currency === 'TRY'}
              />
            </div>
            <div ref={chartRef} className="relative">
              <ChartDataProcessor  transactions={data}>
                {(chartData) => (
                  <IncomeExpenseChart
                    data={chartData}
                    onDotClick={handleDotClick}
                    selectedRange={selectedRange}
                    setSelectedRange={setSelectedRange}
                  />
                )}
              </ChartDataProcessor>
              {anchorDetail && (
                <div
                  className="absolute z-40"
                  style={(() => {
                    const PAD = 12;
                    const panelW = 260;
                    const panelH = 220;
                    const rect = chartRef.current?.getBoundingClientRect();
                    let left = anchorDetail.x - panelW - 16; // hedef sol
                    if (left < 0) left = anchorDetail.x + 16; // sığmazsa sağa kay
                    let top = anchorDetail.y - panelH / 2;
                    if (top < 0) top = 0;
                    const maxTop = (rect ? rect.height : 0) - panelH - PAD;
                    if (top > maxTop) top = Math.max(0, maxTop);
                    return { left, top };
                  })()}
                >
                  <div className="bg-white rounded-xl shadow-xl p-4 w-[300px] text-sm animate-fadeInScale relative">
                    <button onClick={closeAnchor} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xs">✕</button>
                    {(() => {
                      const details = Array.isArray(anchorDetail.detail) ? anchorDetail.detail : [anchorDetail.detail];
                      const isMulti = details.length > 1;
                      const incomeTotal = details.filter(d=>d.type==='income').reduce((s,d)=> s + (Number(d.amount)||0),0);
                      const expenseTotal = details.filter(d=>d.type==='expense').reduce((s,d)=> s + (Number(d.amount)||0),0);
                      const net = incomeTotal - expenseTotal;
                      const currencyGuess = details[0]?.currency || 'USD';
                      return (
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
                      );
                    })()}
                    <div className="mt-3 text-right">
                      <button onClick={closeAnchor} className="px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 text-xs font-medium">Kapat</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
        <section className="mt-8 ">
          <div className="overflow-x-auto min-w-0">
            <TableDashboard data={data} />
          </div>
        </section>
          </div>
          <div className="col-span-1 min-w-[420px] max-w-[560px] lg:basis-[520px]">
            <div className="flex flex-col gap-4">
              <Wallet />
              <Transfer/>
            </div>
          </div>
        </div>
    </main>
  );
};

export default MainDashboard;
