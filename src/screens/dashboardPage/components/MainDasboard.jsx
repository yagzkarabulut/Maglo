import React from "react";
import ChartDataProcessor from "./ChartDataProcessor";
import IncomeExpenseChart from "./ui/IncomeExpenseChart";
import TableDashboad from "./ui/TableDashboad";
import Header from "../../../components/ui/Header";
import db from "../../../components/services/db.services.json";
import Card from "./ui/Card";
import Wallet from "./ui/Wallet";

const MainDasboard = ({ email, from, userName, data, setSelectedDetail }) => {
  // Toplamlar
  const transactions = db.transactions;
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalBalance = totalIncome - totalExpense;
  console.log(
    "totalIncome",
    totalIncome,
    "totalExpense",
    totalExpense,
    "totalBalance",
    totalBalance
  );

  // Grafik noktasına tıklanınca, orijinal transaction'ları bulup modalda göster
  const handleDotClick = (dot) => {
    if (!dot?.date || !Array.isArray(data)) return;
    const details = data.filter((item) => item.date === dot.date);
    setSelectedDetail(details.length === 1 ? details[0] : details);
  };

  // Aktif kartı state ile tut
  const [activeCard, setActiveCard] = React.useState(0); // 0: balance, 1: spending, 2: saved
  // Grafik için gün aralığı state
  const [selectedRange, setSelectedRange] = React.useState(7);

  return (
    <main className="p-4 md:p-8 flex-1 w-full">
      <Header userName={userName} />


        {/* Card Grid */}
        <div className="flex f-row gap-4">
          {/* Sol ana alan */}
          <div className="flex-1">
            {/* KPI kartları: responsive grid */}
            <div className="flex flex-row gap-4 justify-between">
              <Card
                title="Total balance"
                value={`$${totalBalance.toLocaleString()}`}
                icon="balance"
                active={activeCard === 0}
                onClick={() => setActiveCard(0)}
                className="flex-1"
              />
              <Card
                title="Total spending"
                value={`$${totalExpense.toLocaleString()}`}
                icon="spending"
                active={activeCard === 1}
                onClick={() => setActiveCard(1)}
                className="flex-1"
              />
              <Card
                title="Total saved"
                value={`$${totalIncome.toLocaleString()}`}
                icon="saved"
                active={activeCard === 2}
                onClick={() => setActiveCard(2)}
                className="flex-1"
              />
            </div>

            {/* Grafik */}
            <ChartDataProcessor transactions={data}>
              {(chartData) => (
                <IncomeExpenseChart
                  data={chartData}
                  onDotClick={handleDotClick}
                  selectedRange={selectedRange}
                  setSelectedRange={setSelectedRange}
                />
              )}
            </ChartDataProcessor>

              {/* Tablo alanı */}
        <section className="mt-8 ">
          <div className="overflow-x-auto min-w-0">
            <TableDashboad data={data} />
          </div>
        </section>
          </div>

          {/* Sağ Wallet alanı */}
          <div className="col-span-1 min-w-[370px] max-w-[440px]">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Wallet</h2>
            <Wallet />
          </div>

        </div>

      
      
      {/* Sağ Wallet alanı */}
      <aside className="w-full max-w-[370px] mx-auto lg:mx-0 sticky top-8 z-10 flex flex-col gap-6">
        {/* Buraya Scheduled Transfers ve diğer sağ alanlar eklenebilir */}
      </aside>
    </main>
  );
};

export default MainDasboard;
