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

  const handleDotClick = (dot) => {
    if (!dot?.date || !Array.isArray(data)) return;
    const details = data.filter((item) => item.date === dot.date);
    setSelectedDetail(details.length === 1 ? details[0] : details);
  };

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
