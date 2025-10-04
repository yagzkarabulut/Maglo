import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const UserContext = createContext({ userName: null, email: null, setUser: () => {}, logout: () => {} });

export function UserProvider({ children }) {
  const [userName, setUserName] = useState(() => localStorage.getItem('userName') || null);
  const [email, setEmail] = useState(() => localStorage.getItem('email') || null);

  useEffect(() => {
    if (userName) localStorage.setItem('userName', userName); else localStorage.removeItem('userName');
  }, [userName]);
  useEffect(() => {
    if (email) localStorage.setItem('email', email); else localStorage.removeItem('email');
  }, [email]);

  const setUser = useCallback((name, mail) => {
    setUserName(name || null);
    setEmail(mail || null);
  }, []);

  const logout = useCallback(() => {
    setUserName(null);
    setEmail(null);
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
  }, []);

  return (
    <UserContext.Provider value={{ userName, email, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
