import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/ui/Header";
import SideBar from "../../components/ui/SideBar";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { email, from } = (location.state || {}) ;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200); 
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="flex flex-col items-center gap-4">
          <span className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-gray-600">Dashboard yükleniyor…</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <Header />
  <div className="flex justify-between min-h-screen">
    <SideBar />
    <main className="p-6 flex-1">
        
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      {from === "login" && (
        <p className="text-gray-600 mb-6">
          Hoş geldin{email ? `, ${email}` : ""}! 👋
        </p>
      )}

      {/* Örnek içerik */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="p-4 border rounded">Toplam Bakiye</div>
        <div className="p-4 border rounded">Gelir</div>
        <div className="p-4 border rounded">Gider</div>
      </section>
    </main>
    </div>
    </>
  );
}
