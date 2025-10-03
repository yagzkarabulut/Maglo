import React, { useEffect, useState } from "react";
import useTransactions from "../../hooks/useTransactions";
import { useLocation } from "react-router-dom";

import SideBar from "../../components/ui/SideBar";
import Loading from "../../components/ui/Loading";
import MainDasboard from "./components/MainDasboard";
import SelectedDetail from "./components/ui/SelectedDetail";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { email, from, userName } = (location.state || {}) ;
  const { data: state, loading: dataLoading, error } = useTransactions();
  const [selectedDetail, setSelectedDetail] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200); 
    return () => clearTimeout(t);
  }, []);



return (
  <>
    {loading || dataLoading ? (
      <Loading />
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
            <MainDasboard
              email={email}
              from={from}
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
