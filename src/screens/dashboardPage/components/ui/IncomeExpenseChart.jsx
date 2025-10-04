import React from "react";
import formatCurrency from '../../../../utils/formatCurrency';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Bar } from "recharts";
import { formatDateTick, formatDateLong } from '../../../../utils/formatDate';

// Props: title, selectedRange, showIncome/showExpense to allow reuse in expense-only page
export default function IncomeExpenseChart({
  data,
  onDotClick,
  selectedRange = 7,
  setSelectedRange,
  title = 'Working Capital',
  showIncome = true,
  showExpense = true,
  bare = false
}) {
  // Tooltip ile bar highlight için state
  const [activeIndex, setActiveIndex] = React.useState(null);

  // Son X günü filtrele
  const filteredData = React.useMemo(() => {
    if (!data) return [];
    return data.slice(-selectedRange);
  }, [data, selectedRange]);

  const Wrapper = bare ? React.Fragment : 'div';
  const wrapperProps = bare ? {} : { className: 'bg-white rounded-2xl shadow p-6 mb-8' };

  const isEmpty = !filteredData || filteredData.length === 0;

  return (
    <Wrapper {...wrapperProps}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <div className="flex items-center gap-4">
          {showIncome && (
            <span className="flex items-center text-green-500 text-xs font-medium"><span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1" />Income</span>
          )}
          {showExpense && (
            <span className="flex items-center text-lime-500 text-xs font-medium"><span className="inline-block w-2 h-2 rounded-full bg-lime-500 mr-1" />Expenses</span>
          )}
          {setSelectedRange && (
            <select
              className="ml-2 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-lime-500 bg-white"
              value={selectedRange}
              onChange={e => setSelectedRange(Number(e.target.value))}
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
            </select>
          )}
        </div>
      </div>
      {isEmpty ? (
        <div className="h-56 flex items-center justify-center text-gray-500 text-sm">No data to display</div>
      ) : (
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
          {showIncome && (
            <Line
              type="monotone"
              dataKey="income"
              stroke="var(--color-green-500)"
              strokeWidth={3}
              dot={false}
              activeDot={{ fill: "var(--color-green-500)", r: 4, stroke: 'white', strokeWidth: 2, onClick: (e, payload) => onDotClick && onDotClick(payload.payload) }}
              name="Income"
              animationDuration={900}
              animationEasing="ease-out"
            />
          )}
          {showExpense && (
            <Line
              type="monotone"
              dataKey="expense"
              stroke="var(--color-lime-500)"
              strokeWidth={3}
              dot={false}
              activeDot={{ fill: "var(--color-lime-500)", r: 4, stroke: 'white', strokeWidth: 2, onClick: (e, payload) => onDotClick && onDotClick(payload.payload) }}
              name="Expenses"
              animationDuration={900}
              animationEasing="ease-out"
            />
          )}
          <XAxis
            dataKey="date"
            tickFormatter={date => formatDateTick(date, 'tr-TR')}
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
            labelFormatter={date => formatDateLong(date, 'tr-TR')}
            formatter={(value, name, props) => {
              const currency = props && props.payload && props.payload.currency ? props.payload.currency : 'TRY';
              return [formatCurrency(value, currency, 'tr-TR'), name];
            }}
          />
        </LineChart>
      </ResponsiveContainer>
      )}
    </Wrapper>
  );
}
