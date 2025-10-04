import React, { useMemo, useState } from 'react';
import useTransactions from '../../../hooks/useTransactions';
import formatCurrency from '../../../utils/formatCurrency';
import { formatDateShort } from '../../../utils/formatDate';
import SideBar from '../../../components/ui/SideBar';
import Header from '../../../components/ui/Header';

// Basit kolon şeması
const COLUMNS = [
  { key: 'description', label: 'Description', width: '32%' },
  { key: 'type', label: 'Type', width: '12%' },
  { key: 'amount', label: 'Amount (USD)', width: '16%' },
  { key: 'category', label: 'Category', width: '16%' },
  { key: 'date', label: 'Date', width: '18%' }
];


export default function TransactionsPage() {
  const { data, loading, error } = useTransactions();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    let rows = Array.isArray(data) ? data.slice() : [];
    if (search.trim()) {
      const s = search.toLowerCase();
      rows = rows.filter(r => (r.description || '').toLowerCase().includes(s) || (r.category || '').toLowerCase().includes(s));
    }
    if (typeFilter !== 'all') {
      rows = rows.filter(r => r.type === typeFilter);
    }
    rows.sort((a,b) => {
      let av = a[sortKey];
      let bv = b[sortKey];
      if (sortKey === 'date') {
        av = new Date(a.date).getTime();
        bv = new Date(b.date).getTime();
      }
      if (sortKey === 'amount') {
        av = Number(a.amount) || 0;
        bv = Number(b.amount) || 0;
      }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return rows;
  }, [data, search, typeFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const paginated = filtered.slice((pageSafe-1)*pageSize, pageSafe*pageSize);

  function toggleSort(key) {
    if (key === sortKey) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  const incomeTotal = filtered.filter(r => r.type === 'income').reduce((s,r)=> s + (Number(r.amount)||0),0);
  const expenseTotal = filtered.filter(r => r.type === 'expense').reduce((s,r)=> s + (Number(r.amount)||0),0);
  const net = incomeTotal - expenseTotal;

  return (
    <div className="flex min-h-screen w-full bg-white">
      <SideBar />
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header userName="Kullanıcı" />
        <main className="p-6 max-w-7xl mx-auto w-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Transactions</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-xs text-gray-500 font-medium mb-1">Total Income</div>
          <div className="text-green-600 font-semibold text-lg">{formatCurrency(incomeTotal, 'USD', 'en-US')}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-xs text-gray-500 font-medium mb-1">Total Expense</div>
          <div className="text-lime-600 font-semibold text-lg">{formatCurrency(expenseTotal, 'USD', 'en-US')}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-xs text-gray-500 font-medium mb-1">Net</div>
          <div className={`font-semibold text-lg ${net >=0 ? 'text-green-600' : 'text-red-500'}`}>{formatCurrency(net, 'USD', 'en-US')}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-600 mb-1">Search</label>
          <input value={search} onChange={e=>{setSearch(e.target.value); setPage(1);}} placeholder="Description or category" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-lime-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
          <select value={typeFilter} onChange={e=>{setTypeFilter(e.target.value); setPage(1);}} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-lime-500">
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Sort by</label>
          <select value={sortKey} onChange={e=>setSortKey(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-lime-500">
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="description">Description</option>
            <option value="category">Category</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Direction</label>
          <select value={sortDir} onChange={e=>setSortDir(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-lime-500">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="hidden md:grid" style={{gridTemplateColumns: COLUMNS.map(c=>c.width).join(' ')}}>
          {COLUMNS.map(col => (
            <button key={col.key} onClick={()=>toggleSort(col.key)} className="text-left text-xs font-semibold tracking-wide text-gray-600 px-4 py-3 border-b border-gray-200 flex items-center gap-1 hover:text-gray-900">
              {col.label}
              {sortKey === col.key && (
                <span className="text-[10px] font-bold">{sortDir === 'asc' ? '▲' : '▼'}</span>
              )}
            </button>
          ))}
        </div>
        <ul className="divide-y divide-gray-100 text-sm">
          {loading && <li className="p-6 text-gray-500">Loading...</li>}
          {error && <li className="p-6 text-red-500">{error}</li>}
          {!loading && !error && paginated.length === 0 && <li className="p-6 text-gray-500">No transactions found</li>}
          {!loading && !error && paginated.map(tr => (
            <li key={tr.id} className="grid md:grid-cols-[32%,12%,16%,16%,18%] px-4 py-3 hover:bg-gray-50 transition-colors">
              <div className="pr-4">
                <div className="text-gray-900 font-medium truncate">{tr.description || (tr.type === 'income' ? 'Income' : 'Expense')}</div>
                <div className="text-gray-500 text-xs truncate">{tr.category || tr.type}</div>
              </div>
              <div className="text-gray-600 capitalize md:block text-xs md:text-sm mb-1 md:mb-0">{tr.type}</div>
              <div className="text-gray-900 font-semibold text-xs md:text-sm">{formatCurrency(tr.amount,'USD','en-US')}</div>
              <div className="text-gray-600 text-xs md:text-sm truncate">{tr.category || '-'}</div>
              <div className="text-gray-600 text-xs md:text-sm">{formatDateShort(tr.date, 'en-GB')}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 text-sm">
        <span className="text-gray-600">Page {pageSafe} / {totalPages} • {filtered.length} records</span>
        <div className="flex items-center gap-2">
          <button disabled={pageSafe===1} onClick={()=>setPage(p=>Math.max(1,p-1))} className={`px-3 py-1 rounded-lg border text-xs font-medium ${pageSafe===1 ? 'text-gray-300 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`}>Prev</button>
          <button disabled={pageSafe===totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))} className={`px-3 py-1 rounded-lg border text-xs font-medium ${pageSafe===totalPages ? 'text-gray-300 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`}>Next</button>
        </div>
      </div>
        </main>
      </div>
    </div>
  );
}
