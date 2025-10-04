// routes/AppRouter.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import LoginScreen from "../screens/loginPage/LoginScreen";
import DashboardScreen from "../screens/dashboardPage/DashboardScreen";
import ExpensePage from "../screens/dashboardPage/detailAmount/ExpensePage";
import WalletPage from "../screens/dashboardPage/detailAmount/WalletPage";
import TransactionsPage from "../screens/dashboardPage/detailAmount/TransactionsPage";
import Loading from "../components/ui/Loading";

// Wrapper: route path değiştiğinde kısa süre loader gösterir
function RouteWithLoader({ element, minDelay = 600 }) {
  const location = useLocation();
  const [show, setShow] = useState(true);
  const [content, setContent] = useState(null);

  useEffect(() => {
    setShow(true);
    setContent(null);
    const t = setTimeout(() => {
      setShow(false);
      setContent(element);
    }, minDelay);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return show ? <Loading /> : content;
}



export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteWithLoader element={<LoginScreen />} />} />
        <Route path="/dashboard" element={<RouteWithLoader element={<DashboardScreen />} />} />
        <Route path="/expense" element={<RouteWithLoader element={<ExpensePage />} />} />
        <Route path="/wallet" element={<RouteWithLoader element={<WalletPage />} />} />
        <Route path="/transactions" element={<RouteWithLoader element={<TransactionsPage />} />} />
        <Route path="/invoices" element={<RouteWithLoader element={<ExpensePage />} />} />
      </Routes>
    </BrowserRouter>
  );
}
