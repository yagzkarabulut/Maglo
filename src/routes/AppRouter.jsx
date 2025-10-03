// routes/AppRouter.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "../screens/loginPage/LoginScreen";
import DashboardScreen from "../screens/dashboardPage/DashboardScreen";
import IncomePage from "../screens/dashboardPage/detailAmount/IncomePage";
import ExpensePage from "../screens/dashboardPage/detailAmount/ExpensePage";



export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
  <Route path="/dashboard" element={<DashboardScreen />} />
  <Route path="/income" element={<IncomePage />} />
  <Route path="/expense" element={<ExpensePage />} />
      </Routes>
    </BrowserRouter>
  );
}
