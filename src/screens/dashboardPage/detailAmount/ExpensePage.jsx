import React, { useMemo } from "react";
import useTransactions from "../../../hooks/useTransactions";
import Loading from "../../../components/ui/Loading";
import ChartDataProcessor from "../components/ChartDataProcessor";
import IncomeExpenseChart from "../components/ui/IncomeExpenseChart";
import TableDashboard from "../components/ui/TableDashboard";
import SideBar from "../../../components/ui/SideBar";
import Header from "../../../components/ui/Header";
import SelectedDetail from "../components/ui/SelectedDetail";

export default function ExpensePage() {
  const { data: state, loading: dataLoading, error } = useTransactions();
  const [selectedDetail, setSelectedDetail] = React.useState(null);
  const expenses = Array.isArray(state) ? state.filter(item => item.type === "expense") : [];

  const totalExpense = useMemo(() => expenses.reduce((s,e)=> s + (Number(e.amount)||0),0), [expenses]);
  const categories = useMemo(() => {
    const map = {};
    expenses.forEach(e => {
      const key = e.category || 'Other';
      map[key] = (map[key] || 0) + (Number(e.amount)||0);
    });
    return Object.entries(map)
      .map(([name,value]) => ({ name, value }))
      .sort((a,b)=> b.value - a.value)
      .slice(0,6);
  }, [expenses]);

  const handleDotClick = (dot) => {
    if (!dot?.date) return;
    const details = expenses.filter(i => i.date === dot.date);
    setSelectedDetail(details.length === 1 ? details[0] : details);
  };

  if (dataLoading) return <Loading />;
  if (error) return <div className="text-red-500 p-4">Veri alınamadı: {error}</div>;

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <div className="hidden md:block md:w-64 md:h-auto border-r border-gray-100 bg-gray-50">
        <SideBar />
      </div>
      <div className="md:hidden">
        <SideBar mode="mobile" />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <Header userName="Kullanıcı" />
        <main className="px-6 pb-10 w-full max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Expenses (Invoices)</h1>
            <div className="flex items-center gap-3 text-sm">
              <span className="px-3 py-1 rounded-full bg-lime-100 text-lime-700 font-medium">Total: ${totalExpense.toLocaleString()}</span>
              <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">Top</button>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <ChartDataProcessor transactions={expenses}>
                {chartData => (
                  <IncomeExpenseChart
                    data={chartData}
                    onDotClick={handleDotClick}
                    title="Expenses Trend"
                    showIncome={false}
                    showExpense={true}
                  />
                )}
              </ChartDataProcessor>
            </div>
            <div className="bg-white rounded-2xl shadow p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Categories</h2>
              <ul className="space-y-3 text-sm">
                {categories.map(c => {
                  const pct = totalExpense ? ((c.value/ totalExpense)*100).toFixed(1) : 0;
                  return (
                    <li key={c.name} className="flex items-start gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-lime-500 mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between mb-1 gap-2">
                          <span className="text-gray-700 font-medium truncate">{c.name}</span>
                          <span className="text-gray-500 flex-shrink-0">{pct}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded overflow-hidden">
                          <div className="h-full bg-lime-500" style={{width: pct+ '%'}} />
                        </div>
                      </div>
                      <span className="text-gray-900 font-semibold whitespace-nowrap">${c.value.toLocaleString()}</span>
                    </li>
                  )
                })}
                {categories.length === 0 && <li className="text-gray-500">No expenses</li>}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-4 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Expense List</h2>
            <TableDashboard data={expenses} />
          </div>
          {selectedDetail && (
            <SelectedDetail detail={selectedDetail} onClose={() => setSelectedDetail(null)} />
          )}
        </main>
      </div>
    </div>
  );
}
