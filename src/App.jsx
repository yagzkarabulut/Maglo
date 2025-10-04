

import React, { createContext, useState, useContext } from 'react';
import Loading from './components/ui/Loading';
import AppRouter from './routes/AppRouter';
import { UserProvider } from './context/UserContext';
import { CurrencyProvider } from './context/CurrencyContext';

// Global loader context
const LoaderContext = createContext({ show: false, setShow: () => {} });
export function useGlobalLoader() {
  return useContext(LoaderContext);
}

const App = () => {
  const [showLoader, setShowLoader] = useState(false);
  return (
    <UserProvider>
      <CurrencyProvider>
        <LoaderContext.Provider value={{ show: showLoader, setShow: setShowLoader }}>
          <AppRouter />
          {showLoader && (
            <div className="fixed inset-0 z-[9999] bg-white/70 backdrop-blur flex items-center justify-center">
              <Loading variant="full" size="md" />
            </div>
          )}
        </LoaderContext.Provider>
      </CurrencyProvider>
    </UserProvider>
  );
}

export default App;
