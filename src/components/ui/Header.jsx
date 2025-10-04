import React, { useState, useRef, useEffect } from 'react';
import users from "../../assets/users.jpg";
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ userName: propUserName }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef();
  const notifButtonRef = useRef();
  const menuRef = useRef();
  const searchInputRef = useRef();
  const { userName, logout } = useUser();
  const navigate = useNavigate();

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

  // ESC ile modal kapat
  useEffect(() => {
    function handleKey(e){
      if(e.key === 'Escape'){ setNotifOpen(false); setMenuOpen(false); }
    }
    if(notifOpen){ window.addEventListener('keydown', handleKey); }
    return () => window.removeEventListener('keydown', handleKey);
  }, [notifOpen]);

  // Bildirim modal dış tık kapatma
  useEffect(() => {
    function handleClickOutside(e){
      if(notifRef.current && !notifRef.current.contains(e.target)){
        setNotifOpen(false);
      }
    }
    if(notifOpen){ document.addEventListener('mousedown', handleClickOutside); }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notifOpen]);

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
                className="absolute right-0 top-0 h-10  pr-3 rounded-2xl pl-3 border  border-gray-200 shadow focus:ring-2 focus:ring-lime-400 focus:outline-none transition-all w-96  bg-white z-10 duration-300 ease-in-out transform scale-90 opacity-0 animate-searchIn"
                onBlur={() => setSearchOpen(false)}
                style={{animation: 'searchIn 0.25s cubic-bezier(0.4,0,0.2,1) forwards' }}
              />
            )}
          </div>
          {/* Bildirim iconu */}
          <div className="relative" ref={notifRef}>
            <button
              className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none"
              aria-label="Bildirimler"
              ref={notifButtonRef}
              onClick={() => setNotifOpen(o=>!o)}
              aria-expanded={notifOpen}
              aria-haspopup="true"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-lime-500 rounded-full ring-2 ring-white"></span>
            </button>
            {notifOpen && (
              <div
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 z-50 origin-top animate-fadeInScale"
                role="menu" aria-label="Bildirimler"
                tabIndex={-1}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') { setNotifOpen(false); notifButtonRef.current?.focus(); }
                  if (e.key === 'Tab') {
                    // keep focus inside
                    const focusables = Array.from(e.currentTarget.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])'));
                    if (focusables.length === 0) return;
                    const first = focusables[0];
                    const last = focusables[focusables.length -1];
                    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
                  }
                }}
                ref={notifRef}
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-gray-900">Bildirimler</h2>
                  <button onClick={() => setNotifOpen(false)} className="p-2 rounded-full hover:bg-gray-100" aria-label="Kapat">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6"/></svg>
                  </button>
                </div>
                <ul className="space-y-3 max-h-72 overflow-auto pr-1">
                  {[{id:1,title:'Yeni transfer onayı',time:'2 dk önce'},{id:2,title:'Bütçe limiti yaklaşıyor',time:'1 saat önce'},{id:3,title:'Rapor hazır',time:'Dün'}].map(n => (
                    <li key={n.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors animate-fadeInRow">
                      <div className="w-2 h-2 mt-2 rounded-full bg-lime-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{n.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{n.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-end gap-2">
                  <button onClick={() => setNotifOpen(false)} className="px-4 py-2 text-sm font-medium text-white bg-lime-500 hover:bg-lime-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400 mt-2">Kapat</button>
                </div>
              </div>
            )}
          </div>
          {/* Profil ve menü */}
         <div className="relative  bg-gray-50 rounded-2xl px-2 py-1 " ref={menuRef}>
      <button
        className="flex items-center gap-2 px-4 py-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-400"
        onClick={() => setMenuOpen(v => !v)}
        aria-haspopup="true"
        aria-expanded={menuOpen}
      >
        <img width={30} src={users} alt="users" className="rounded-full border mr-2  border-gray-200" />
  <span className="font-semibold mr-2 text-gray-900 hidden md:block">{userName || propUserName || 'Kullanıcı'}</span>
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
          role="menu"
          tabIndex={-1}
          onKeyDown={(e)=>{
            if(e.key==='Escape'){ setMenuOpen(false); }
            if(e.key==='Tab'){
              const container = e.currentTarget;
              const focusables = Array.from(container.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])'));
              if(focusables.length){
                const first=focusables[0];
                const last=focusables[focusables.length-1];
                if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
                else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
              }
            }
          }}
        >
          <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700" role="menuitem">Ayarlar</button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500 border-t border-gray-100"
            onClick={() => {
              logout();
              navigate('/', { replace: true });
            }}
            role="menuitem"
          >Çıkış Yap</button>
        </div>
      )}
    </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
