// routes/AppRouter.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import LoginScreen from "../screens/loginPage/LoginScreen";
import DashboardScreen from "../screens/dashboardPage/DashboardScreen";
import ExpensePage from "../screens/dashboardPage/detailAmount/ExpensePage";
import WalletPage from "../screens/dashboardPage/detailAmount/WalletPage";
import TransactionsPage from "../screens/dashboardPage/detailAmount/TransactionsPage";
import Loading from "../components/ui/Loading";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/expense" element={<ExpensePage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/invoices" element={<ExpensePage />} />
      </Routes>
    </BrowserRouter>
  );
}
