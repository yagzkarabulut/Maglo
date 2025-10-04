import React from 'react';
import TransferItem from './TransferItem';
import users1 from '../../../../assets/user1.png';
import users2 from '../../../../assets/user2.png';
import users3 from '../../../../assets/user3.png';
import users4 from '../../../../assets/user4.png';
import users5 from '../../../../assets/user5.png';

const TRANSFERS = [
  {
    id: 1,
    name: 'Saleh Ahmed',
    date: '2022-04-28T11:00:00',
    amount: 435,
    img: users1
  },
  {
    id: 2,
    name: 'Delowar Hossain',
    date: '2022-04-28T11:00:00',
    amount: 132,
    img: users2
  },
  {
    id: 3,
    name: 'Moinul Hasan Nayem',
    date: '2022-04-25T11:00:00',
    amount: 826,
    img: users3
  },
  {
    id: 4,
    name: 'Dr. Jubed Ahmed',
    date: '2022-04-16T11:00:00',
    amount: 435,
    img: users4
  },
  {
    id: 5,
    name: 'AR. Jakir Alp',
    date: '2022-04-14T11:00:00',
    amount: 228,
    img: users5
  }
];

// Tarih formatlama artık unified formatDate util üzerinden (TransferItem kullanıyor)

const Transfer = () => {
  return (
        <div className="transfer-section-hide bg-white rounded-2xl shadow-sm p-6 w-full">
      <div className="flex items-center justify-between gap-4 pb-4">
        <h3 className="text-xl font-semibold text-gray-900">Scheduled Transfers</h3>
        <button className="text-green-600 font-semibold text-sm inline-flex items-center gap-1">
          View All
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      <ul className='flex flex-col items-center justify-center'>
        {TRANSFERS.map((t, idx) => (
          <TransferItem key={t.id} transfer={t} index={idx} />
        ))}
      </ul>
    </div>
  );
};

export default Transfer;
