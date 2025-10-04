import React from 'react';
import { Link } from 'react-router-dom';
import formatCurrency from '../../../../utils/formatCurrency';
import { formatDateShort } from '../../../../utils/formatDate';
import phoneIcon from '../../../../assets/phone.svg';
import netflixIcon from '../../../../assets/netflix.svg';
import figmaIcon from '../../../../assets/figma.svg';

const COLUMNS = { grid: 'grid grid-cols-4' };

function Avatar({ label, img }) {
  if (img) {
    return (
      <div className="h-12 w-12 r bg-amber-50 border rounded-lg border-gray-300 flex items-center justify-center overflow-hidden p-1 shadow-sm">
        <img src={img} alt={label} className="h-full w-9 object-cover " />
      </div>
    );
  }
  const letter = (label || '?').toString().trim().charAt(0).toUpperCase();
  return (
    <div className="h-12 w-12 rounded-xl bg-white border border-gray-300 flex items-center justify-center text-gray-700 font-bold shadow-sm">
      {letter}
    </div>
  );
}

const TableDashboard = ({ data = [] }) => {
  return (
    <div className="mt-4 min-w-0">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-4">
        <div className="px-2 pb-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Recent Transaction</h3>
          <Link to="/transactions" className="text-green-600 font-medium inline-flex items-center gap-1 text-sm hover:underline">
            View All
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
        <div className={`px-2 pb-1 ${COLUMNS.grid} text-xs font-semibold text-gray-600`}>
          <div>NAME/BUSINESS</div>
          <div className='ml-6'>TYPE</div>
          <div>AMOUNT</div>
          <div>DATE</div>
        </div>
        <ul className="px-1">
          {data.length === 0 ? (
            <li className="px-2 py-8 text-center text-gray-600 text-sm">No data</li>
          ) : (
            data.slice(0, 3).map((item, idx) => {
              const fallbackProductNames = [
                { name: 'Iphone 13 Pro MAX', company: 'Apple Inc' },
                { name: 'Netflix Subscription', company: 'Netflix' },
                { name: 'Figma Subscription', company: 'Figma Inc' }
              ];
              const rawDesc = item.description || '';
              const isGeneric = /Günlük\s+gelir|Günlük\s+gider/i.test(rawDesc);
              const mapped = fallbackProductNames[idx];
              const title = (isGeneric && mapped?.name) || mapped?.name || rawDesc || (item.type === 'income' ? 'Income' : 'Expense');
              const subtitle = (isGeneric && mapped?.company) || mapped?.company || item.category || (item.type || '').toString();
              const amountUSD = formatCurrency(item.amount, 'USD', 'en-US');
              const img = idx === 0 ? phoneIcon : idx === 1 ? netflixIcon : idx === 2 ? figmaIcon : undefined;
              return (
                <li key={item.id || idx} className={`px-2 py-3 ${COLUMNS.grid} items-center text-sm`} style={{ animationDelay: `${idx * 40}ms` }}>
                  <div className="flex items-center min-w-0">
                    <Avatar label={subtitle || title} img={img} />
                    <div className="ml-3 min-w-0">
                      <div className="text-gray-900 font-medium truncate text-xs">{title}</div>
                      <div className="text-gray-600 text-xs truncate">{subtitle}</div>
                    </div>
                  </div>
                  <div className="text-gray-600 font-normal ml-6 text-xs sm:text-sm">{item.type === 'income' ? 'Mobile' : subtitle}</div>
                  <div className="text-gray-900 font-semibold text-sm">{amountUSD}</div>
                  <div className="text-gray-600 font-normal text-xs sm:text-sm">{formatDateShort(item.date, 'en-GB')}</div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default TableDashboard;
