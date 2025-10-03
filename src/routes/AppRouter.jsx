// routes/AppRouter.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "../screens/loginPage/LoginScreen";
import DashboardScreen from "../screens/dashboardPage/DashboardScreen";



export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
