import { useState } from "react";
import { FaSignInAlt, FaFileAlt, FaFolder } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useUser();
  const navigate = useNavigate();

  const current = location.pathname;
  function isActive(path) {
    if (path === '/') return current === '/';
    return current.startsWith(path);
  }

  const itemBase =
    "flex items-center gap-2 px-4 py-3 rounded-lg transition-colors duration-150 text-base";
  const activeItem = "bg-lime-300 font-semibold text-gray-900";
  const itemJustify = collapsed ? "justify-center" : "justify-start";
  const labelClass = collapsed ? "hidden" : "";

  return (
    <aside
      className={`${collapsed ? "w-16" : "w-64"} h-full bg-gray-50 border-r border-gray-100 flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden`}
      aria-label="Sidebar Navigation"
    >
  <nav className="flex flex-col h-full p-6 pt-8">
       
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center">
            <img
              src={require("../../assets/logo.JPG")}
              alt="Logo"
              className="w-10 h-10 mr-2"
            />
            <span className={`font-bold text-2xl text-gray-900 ${labelClass}`}>
              Maglo.
            </span>
          </div>

          {/* Toggle Hamburger */}
          <button
            type="button"
            onClick={() => setCollapsed(c => !c)}
            className="hamburger-btn"
            data-collapsed={collapsed}
            aria-label={collapsed ? "Menüyü genişlet" : "Menüyü daralt"}
            aria-expanded={!collapsed}
            title={collapsed ? "Menüyü genişlet" : "Menüyü daralt"}
          >
            <span className="hamburger-box" aria-hidden="true">
              <span className="hamburger-bar" />
              <span className="hamburger-bar" />
              <span className="hamburger-bar" />
            </span>
          </button>
        </div>

        {/* Menu */}
  <ul className="mt-10 flex-1 flex flex-col gap-1">
          <li>
            <a
              href="/dashboard"
              className={`${itemBase} ${itemJustify} ${ isActive('/dashboard') ? activeItem : 'text-gray-500 hover:bg-gray-100'}`}
              title="Dashboard"
            >
              <FaFolder className="text-lg" />
              <span className={labelClass}>Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="/transactions"
              className={`${itemBase} ${itemJustify} ${ isActive('/transactions') ? activeItem : 'text-gray-500 hover:bg-gray-100'}`}
              title="Transactions"
            >
              <FaFileAlt className="text-lg" />
              <span className={labelClass}>Transactions</span>
            </a>
          </li>
          <li>
            <a
              href="/invoices"
              className={`${itemBase} ${itemJustify} ${ isActive('/invoices') ? activeItem : 'text-gray-500 hover:bg-gray-100'}`}
              title="Invoices (Expenses)"
            >
              <FaFileAlt className="text-lg" />
              <span className={labelClass}>Invoices</span>
            </a>
          </li>
          <li>
            <a
              href="/wallet"
              className={`${itemBase} ${itemJustify} ${ isActive('/wallet') ? activeItem : 'text-gray-500 hover:bg-gray-100'}`}
              title="My Wallets"
            >
              <FaFolder className="text-lg" />
              <span className={labelClass}>My Wallets</span>
            </a>
          </li>
          <li>
            <a
              href="/settings"
              className={`${itemBase} ${itemJustify} ${ isActive('/settings') ? activeItem : 'text-gray-500 hover:bg-gray-100'}`}
              title="Settings"
            >
              <FaFileAlt className="text-lg" />
              <span className={labelClass}>Settings</span>
            </a>
          </li>
        </ul>

        {/* Bottom Buttons */}
        <div className="mt-auto space-y-2">
          <button
            className={`${itemBase} ${itemJustify} text-gray-500 hover:bg-gray-100 w-full`}
            title="Help"
          >
            <FaFileAlt className="text-lg" />
            <span className={labelClass}>Help</span>
          </button>
          <button
            onClick={() => { logout(); navigate('/', { replace: true }); }}
            className={`${itemBase} ${itemJustify} text-gray-500 hover:bg-gray-100 w-full`}
            title="Logout"
          >
            <FaSignInAlt className="text-lg" />
            <span className={labelClass}>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
