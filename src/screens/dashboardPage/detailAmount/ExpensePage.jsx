import React, { useEffect, useState } from "react";
import useTransactions from "../../../hooks/useTransactions";
import Loading from "../../../components/ui/Loading";
import ChartDataProcessor from "../components/ChartDataProcessor";
import IncomeExpenseChart from "../components/ui/IncomeExpenseChart";
import TableDashboad from "../components/ui/TableDashboad";
import SideBar from "../../../components/ui/SideBar";
import { useLocation } from "react-router-dom";
import SelectedDetail from "../components/ui/SelectedDetail";

export default function ExpensePage() {
  const [loading, setLoading] = useState(true);
  const { data: state, loading: dataLoading, error } = useTransactions();
  const location = useLocation();
  const { email, from } = location.state || {};
  const [selectedDetail, setSelectedDetail] = useState(null);
  // Sadece giderleri filtrele
  const expenses = Array.isArray(state) ? state.filter(item => item.type === "expense") : [];
  // Grafik noktasına tıklanınca detay modalı aç
  const handleDotClick = (dot) => {
    if (!dot?.date || !Array.isArray(expenses)) return;
    const details = expenses.filter((item) => item.date === dot.date);
    setSelectedDetail(details.length === 1 ? details[0] : details);
  };
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {loading  ? (
        <Loading />
      ) : error ? (
        <div className="text-red-500 p-4">Veri alınamadı: {error}</div>
      ) : (
        <>
         
          <div className="flex min-h-screen w-full">
            {/* SideBar sadece md ve üstünde görünür, mobilde hamburger ile açılır */}
            <div className="hidden md:block md:w-64 md:h-auto">
              <SideBar mode="desktop" />
            </div>
            <div className="flex-1 min-w-0 w-full p-2 sm:p-4 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Giderler</h2>
              <div className="mb-6">
                <ChartDataProcessor transactions={expenses}>
                  {(chartData) => (
                    <IncomeExpenseChart
                      data={chartData}
                      onDotClick={handleDotClick}
                    />
                  )}
                </ChartDataProcessor>
              </div>
              <TableDashboad data={expenses} />
              {selectedDetail && (
                <SelectedDetail detail={selectedDetail} onClose={() => setSelectedDetail(null)} />
              )}
            </div>
            {/* Hamburger ve overlay mobilde her zaman aktif */}
            <div className="md:hidden">
              <SideBar mode="mobile" />
            </div>
          </div>
        </>
      )}
    </>
  );
}
