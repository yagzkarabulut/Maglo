import React from "react";
import formatCurrency from '../../utils/formatCurrency';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Bar } from "recharts";


export default function IncomeExpenseChart({ data, onDotClick, selectedRange = 7, setSelectedRange }) {
  // Tooltip ile bar highlight için state
  const [activeIndex, setActiveIndex] = React.useState(null);

  // Son X günü filtrele
  const filteredData = React.useMemo(() => {
    if (!data) return [];
    return data.slice(-selectedRange);
  }, [data, selectedRange]);

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Working Capital</h2>
        <div className="flex items-center gap-4">
          <span className="flex items-center text-green-500 text-xs font-medium"><span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1" />Income</span>
          <span className="flex items-center text-red-500 text-xs font-medium"><span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1" />Expenses</span>
          <select
            className="ml-4 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500 bg-white"
            value={selectedRange}
            onChange={e => setSelectedRange(Number(e.target.value))}
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={filteredData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-gray-200)" strokeDasharray="3 3" />
          {/* Bar: aktif gün için arka plan sütunu */}
          {activeIndex !== null && (
            <Bar
              dataKey="income"
              data={filteredData.map((d, i) => i === activeIndex ? { ...d, income: d.income } : { ...d, income: 0 })}
              barSize={32}
              fill="var(--color-blue-100)"
              isAnimationActive={false}
            />
          )}
          <Line
            type="monotone"
            dataKey="income"
            stroke="var(--color-green-500)"
            strokeWidth={3}
            dot={{ fill: "var(--color-green-300)", r: 7, stroke: 'white', strokeWidth: 2, onClick: (e, payload) => onDotClick && onDotClick(payload.payload) }}
            activeDot={{ fill: "var(--color-green-500)", r: 9, stroke: 'white', strokeWidth: 2, onClick: (e, payload) => onDotClick && onDotClick(payload.payload) }}
            name="Income"
            animationDuration={900}
            animationEasing="ease-out"
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="var(--color-red-500)"
            strokeWidth={3}
            dot={{ fill: "var(--color-red-500)", r: 7, stroke: 'white', strokeWidth: 2, onClick: (e, payload) => onDotClick && onDotClick(payload.payload) }}
            activeDot={{ fill: "var(--color-red-500)", r: 9, stroke: 'white', strokeWidth: 2, onClick: (e, payload) => onDotClick && onDotClick(payload.payload) }}
            name="Expenses"
            animationDuration={900}
            animationEasing="ease-out"
          />
          <XAxis
            dataKey="date"
            tickFormatter={date => new Date(date).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' })}
            angle={-30}
            textAnchor="end"
            stroke="var(--color-gray-400)"
            fontSize={12}
            fontFamily="inherit"
          />
          <YAxis
            stroke="var(--color-gray-400)"
            fontSize={12}
            fontFamily="inherit"
            tickFormatter={v => v >= 1000 ? (v/1000)+"K" : v}
          />
          <Tooltip
            contentStyle={{ borderRadius: 12, fontSize: 14, fontWeight: 500, color: '#222' }}
            cursor={false}
            wrapperStyle={{ zIndex: 10 }}
            onMouseMove={state => {
              if (state && state.activeTooltipIndex !== undefined) setActiveIndex(state.activeTooltipIndex);
            }}
            onMouseLeave={() => setActiveIndex(null)}
            labelFormatter={date => {
              if (!date) return '';
              const d = new Date(date);
              return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
            }}
            formatter={(value, name, props) => {
              const currency = props && props.payload && props.payload.currency ? props.payload.currency : 'TRY';
              return [formatCurrency(value, currency, 'tr-TR'), name];
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
