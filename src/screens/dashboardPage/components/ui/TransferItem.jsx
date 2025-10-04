import React from 'react';
import { formatDateLong } from '../../../../utils/formatDate';

// Tek bir transfer satırını render eder
// Props: { transfer: { id,name,date,amount,img }, index }
const TransferItem = ({ transfer, index }) => {
  const { id, name, date, amount, img } = transfer;
  return (
    <li key={id} className={`flex items-center w-full border-t ${index === 0 ? 'border-transparent' : 'border-gray-300'}`} style={{ height: 64 }}>
      <div className="flex items-center flex-1 min-w-0 h-full">
        <div className="h-10 w-10 overflow-hidden bg-white mr-2 flex items-center justify-center rounded-full border border-gray-300 shadow-sm">
          <img src={img} alt={name} className="h-10 w-10 object-cover rounded-full" />
        </div>
        <div className="ml-8 min-w-0">
          <div className="text-gray-900 font-semibold text-sm leading-snug truncate" style={{ maxWidth: '240px' }}>{name}</div>
          <div className="text-gray-600 text-xs">{formatDateLong(date, 'en-US')}</div>
        </div>
      </div>
      <div className="text-gray-900 font-semibold text-sm" style={{ width: 110, textAlign: 'right' }}>
        - ${amount.toLocaleString('en-US')},00
      </div>
    </li>
  );
};

export default TransferItem;
