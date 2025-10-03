import React, { useState, useRef, useEffect } from 'react';
import users from "../../assets/users.jpg";

const Header = ({ userName = "Kullanıcı" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef();
  const searchInputRef = useRef();

  // Menü dışına tıklanınca kapat
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Search input açıldığında otomatik odaklan
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <header className="bg-white ">
      <div className="flex items-center justify-between px-8 py-5 w-full relative">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-3 relative">
          {/* Search icon ve input */}
          <div className="relative">
            <button
              className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Ara"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            </button>
            {searchOpen && (
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Ara..."
                className="absolute right-0 top-0 h-10 pl-10 pr-3 rounded-lg border border-gray-200 shadow focus:ring-2 focus:ring-lime-400 focus:outline-none transition-all w-48 bg-white z-10 duration-300 ease-in-out transform scale-90 opacity-0 animate-searchIn"
                onBlur={() => setSearchOpen(false)}
                style={{animation: 'searchIn 0.25s cubic-bezier(0.4,0,0.2,1) forwards' }}
              />
            )}
          </div>
          {/* Bildirim iconu */}
          <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none" aria-label="Bildirimler">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </button>
          {/* Profil ve menü */}
         <div className="relative  bg-gray-50 rounded-3xl px-2 py-1 " ref={menuRef}>
      <button
        className="flex items-center gap-2 px-4 py-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-400"
        onClick={() => setMenuOpen(v => !v)}
        aria-haspopup="true"
        aria-expanded={menuOpen}
      >
        <img width={30} src={users} alt="users" className="rounded-full border mr-2  border-gray-200" />
        <span className="font-semibold mr-2 text-gray-900 hidden md:block">{userName}</span>
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {menuOpen && (
        <div
          className="
            absolute right-0 top-full mt-2
            bg-white border border-gray-100 rounded-lg shadow-lg w-40 z-50
            origin-top-right animate-fadeInScale
          "
        >
       
          <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700">Ayarlar</button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500 border-t border-gray-100">Çıkış Yap</button>
        </div>
      )}
    </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
