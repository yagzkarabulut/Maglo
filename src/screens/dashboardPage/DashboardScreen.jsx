import React, { useState } from "react";
import useTransactions from "../../hooks/useTransactions";
import { useLocation } from "react-router-dom";

import SideBar from "../../components/ui/SideBar";
import MainDashboard from "./components/MainDashboard"; // file renamed
import SelectedDetail from "./components/ui/SelectedDetail";
import Loading from "../../components/ui/Loading";

export default function Dashboard() {
  const location = useLocation();
  const { userName } = (location.state || {}) ;
  const { data: state, loading: dataLoading, error } = useTransactions();
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [showContent, setShowContent] = useState(false);

  React.useEffect(() => {
    if (!dataLoading && !error) {
      const timer = setTimeout(() => setShowContent(true), 1200);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [dataLoading, error]);

  return (
    <>
      {dataLoading || !showContent ? (
        <Loading />
      ) : error ? (
        <div className="text-red-500 p-4">Veri alınamadı: {error}</div>
      ) : (
        <>
          <div className="flex min-h-screen w-full">
            <SideBar />
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
          </div>
        </>
      )}
    </>
  );


  
}
