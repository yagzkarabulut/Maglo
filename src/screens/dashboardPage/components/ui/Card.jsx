import React, { useState } from 'react'
import { FaWallet, FaMoneyBillWave, FaPiggyBank } from 'react-icons/fa';

const icons = {
  balance: <FaWallet size={20} />, // Cüzdan
  spending: <FaMoneyBillWave size={20} />, // Harcama
  saved: <FaPiggyBank size={20} />, // Birikim
};



const Card = ({ title, value, icon = "balance", active = false, onClick, children, className = "", compact = false }) => {
  // Aktiflik prop ile veya local state ile kontrol edilebilir. onClick ile parent'tan kontrol önerilir.
  return (
    <div
      className={`rounded-2xl p-6 flex flex-col items-start transition-all duration-200 cursor-pointer select-none 
        ${active
          ? 'bg-gray-800 text-white shadow-lg'
          : ' bg-gray-50 text-gray-900 shadow-sm'}
        ${className}
      `}
      onClick={onClick}
    >
      <span className="font-medium mb-2 flex items-center gap-2 text-base">
        <span
          className={`h-10 w-10 rounded-full flex items-center justify-center mr-2 shadow-sm transition-colors
            ${active ? 'bg-gray-700 text-green-500' : 'bg-gray-200 text-gray-700'}
          `}
        >
          {icons[icon]}
        </span>
        {title}
      </span>
      <span className={`${compact ? 'text-xl' : 'text-3xl'} font-bold tracking-tight mt-1 ${active ? 'text-white' : 'text-gray-900'}`}>{value}</span>
      {children}
    </div>
  );
}

export default Card
