import React, { useState } from "react";
import useTransactions from "../../hooks/useTransactions";
import { useLocation } from "react-router-dom";

import SideBar from "../../components/ui/SideBar";
import MainDashboard from "./components/MainDashboard"; // file renamed
import SelectedDetail from "./components/ui/SelectedDetail";

export default function Dashboard() {
  const location = useLocation();
  const { userName } = (location.state || {}) ;
  const { data: state, loading: dataLoading, error } = useTransactions();
  const [selectedDetail, setSelectedDetail] = useState(null);

  return (
    <>
      {dataLoading ? (
        <div className="p-8 text-gray-500 text-sm">Yükleniyor...</div>
      ) : error ? (
      <div className="text-red-500 p-4">Veri alınamadı: {error}</div>
    ) : (
      <>
        
        <div className="flex min-h-screen w-full">
          {/* SideBar sadece md ve üstünde görünür, mobilde hamburger ile açılır */}
          <div className="flex flex-row"> 
              <div className="hidden md:block md:w-64 md:h-auto">
            <SideBar mode="desktop" />
            
          </div>
          

          </div>
        
          <div className="flex-1 min-w-0 w-full">
            <MainDashboard
              userName={userName}
              data={state}
              setSelectedDetail={setSelectedDetail}
            />
            {selectedDetail && (
              <SelectedDetail detail={selectedDetail} onClose={() => setSelectedDetail(null)} />
            )}
          </div>
          {/* Hamburger ve overlay mobilde her zaman aktif */}
          <div className="md:hidden">
            <SideBar mode="mobile" />
          </div>
        </div>
      </>
    )}
    </>
  );


  
}
