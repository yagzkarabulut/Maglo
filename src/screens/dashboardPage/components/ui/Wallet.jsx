import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/wallet.css";

// Wallet: başlık + üç nokta menü + üst üste iki kart görünümü
const Wallet = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Dışarı tıklayınca menüyü kapat
  useEffect(() => {
    const onClick = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <section className="wallet">
      {/* Header */}
      <div className="wallet__header" ref={menuRef}>
        <h3 className="wallet__title">Wallet</h3>
        <button
          type="button"
          aria-label="Menüyü aç/kapat"
          className="wallet__menu-button"
          onClick={() => setOpen((s) => !s)}
        >
          {/* three-dots icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="5" cy="12" r="2" fill="#6B7280" />
            <circle cx="12" cy="12" r="2" fill="#6B7280" />
            <circle cx="19" cy="12" r="2" fill="#6B7280" />
          </svg>
        </button>

        {open && (
          <div className="wallet__menu" role="menu">
            <button
              className="wallet__menu-item"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                navigate('/wallet');
              }}
            >
              Ayarlar
            </button>
          </div>
        )}
      </div>

      {/* Card stack */}
      <div className="wallet__stack">
        {/* Üst (koyu) kart */}
        <div className="wallet-card wallet-card--dark">
          <div className="wallet-card__row">
            <div className="wallet-card__chip" />
            <div className="wallet-card__nfc" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 8c4 0 8 4 8 8" stroke="#334155" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 11c2.5 0 5 2.5 5 5" stroke="#334155" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <div className="wallet-card__brand">
            <span className="wallet-card__bank">Maglo.</span>
            <span className="wallet-card__type">Universal Bank</span>
          </div>
          <div className="wallet-card__number">5495&nbsp;7381&nbsp;3759&nbsp;2321</div>
          <div className="wallet-card__footer">
            <div>
              <div className="wallet-card__label">VALID THRU</div>
              <div className="wallet-card__value">09/25</div>
            </div>
          </div>
        </div>

        {/* Alt (açık) kart */}
        <div className="wallet-card wallet-card--light">
          <div className="wallet-card__brand">
            <span className="wallet-card__bank">Maglo.</span>
            <span className="wallet-card__type">Commercial Bank</span>
          </div>
          <div className="wallet-card__row wallet-card__row--middle">
            <div className="wallet-card__chip" />
            <div className="wallet-card__nfc" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 8c4 0 8 4 8 8" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 11c2.5 0 5 2.5 5 5" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <div className="wallet-card__number wallet-card__number--masked">85952548****</div>
          <div className="wallet-card__footer">
            <div>
              <div className="wallet-card__label">09/25</div>
            </div>
            <div className="wallet-card__logo">VISA</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wallet;
