import React from 'react';
import SideBar from '../../../components/ui/SideBar';
import Header from '../../../components/ui/Header';
import Wallet from '../components/ui/Wallet';

export default function WalletPage() {
  return (
    <div className="flex min-h-screen w-full bg-white">
      <SideBar />
      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className='bg-gray-50'><Header userName="Kullanıcı" /></div>
        <main className="px-6 pb-10 w-full max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Wallets</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="order-1"><Wallet /></div>
            <div className="order-2 bg-white rounded-2xl shadow p-6 min-h-[300px]">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Balances</h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between"><span className="text-gray-600">Primary Card</span><span className="font-medium text-gray-900">$12,450.00</span></li>
                <li className="flex items-center justify-between"><span className="text-gray-600">Business Card</span><span className="font-medium text-gray-900">$8,220.50</span></li>
                <li className="flex items-center justify-between"><span className="text-gray-600">Savings</span><span className="font-medium text-gray-900">$23,910.12</span></li>
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-100 text-sm text-gray-600">Static placeholder data. Can be wired to API later.</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
