import { useState } from "react";
import { FaSignInAlt, FaFileAlt, FaFolder } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import SmallSpinner from './SmallSpinner';
import { useGlobalLoader } from '../../App';
import { useUser } from '../../context/UserContext';

export default function SideBar() {
  const { setShow } = useGlobalLoader();
  const { logout } = useUser();
  const [collapsed, setCollapsed] = useState(false);
  const [loadingPath, setLoadingPath] = useState(null); // hangi menüde loader var
  const location = useLocation();
  const navigate = useNavigate();

  const current = location.pathname;
  function isActive(path) {
    if (path === '/') return current === '/';
    return current.startsWith(path);
  }

  const itemBase =
    "flex items-center gap-2 py-3 rounded-lg transition-colors duration-150 text-base";
  const activeItem = "bg-lime-300 font-semibold text-gray-900";
  const itemJustify = "justify-start"; // always left align
  const labelClass = collapsed ? "hidden" : "";
  // Narrower icon column when collapsed
  const iconWrapper = collapsed ? "w-8 flex justify-center" : "w-6";
  const linkPadding = collapsed ? "px-2" : "px-4";

  return (
    <aside
      className={`${collapsed ? "w-12" : "w-64"} min-h-screen bg-gray-50 border-r border-gray-100 flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden flex`}
      aria-label="Sidebar Navigation"
    >
      <nav className="flex flex-col flex-1 p-6 pt-8">
        <div className="flex items-center justify-between mb-10 pr-1">
          <div className="flex items-center overflow-hidden">
            <img
              src={require("../../assets/logo.JPG")}
              alt="Logo"
              className="w-10 h-10 mr-2"
            />
            {!collapsed && (
              <span className={`font-bold text-2xl text-gray-900`}>
                Maglo.
              </span>
            )}
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
          {[
            { path: '/dashboard', icon: <FaFolder className="text-lg mx-auto" />, label: 'Dashboard' },
            { path: '/transactions', icon: <FaFileAlt className="text-lg mx-auto" />, label: 'Transactions' },
            { path: '/invoices', icon: <FaFileAlt className="text-lg mx-auto" />, label: 'Invoices' },
            { path: '/wallet', icon: <FaFolder className="text-lg mx-auto" />, label: 'My Wallets' },
            { path: '/settings', icon: <FaFileAlt className="text-lg mx-auto" />, label: 'Settings' },
          ].map(item => (
            <li key={item.path}>
              <button
                type="button"
                className={`${itemBase} ${linkPadding} ${ isActive(item.path) ? activeItem : 'text-gray-500 hover:bg-gray-100'}`}
                title={item.label}
                disabled={loadingPath !== null}
                onClick={() => {
                  if (current === item.path) return;
                  setLoadingPath(item.path);
                  setTimeout(() => {
                    setLoadingPath(null);
                    navigate(item.path);
                  }, 1200);
                }}
              >
                <span className={iconWrapper}>{item.icon}</span>
                <span className={labelClass}>{item.label}</span>
                {loadingPath === item.path && <SmallSpinner />}
              </button>
            </li>
          ))}
        </ul>

        {/* Bottom Buttons */}
        <div className="mt-auto pt-8 space-y-2">
          <button
            className={`${itemBase} ${linkPadding} text-gray-500 hover:bg-gray-100 w-full`}
            title="Help"
          >
            <span className={iconWrapper}><FaFileAlt className="text-lg mx-auto" /></span>
            <span className={labelClass}>Help</span>
          </button>
          <button
            className={`${itemBase} ${linkPadding} text-gray-500 hover:bg-gray-100 w-full`}
            title="Logout"
            onClick={() => {
              setShow(true);
              setTimeout(() => {
                logout();
                setShow(false);
                // React Router ile yönlendir
                navigate('/');
              }, 1200);
            }}
          >
            <span className={iconWrapper}><FaSignInAlt className="text-lg mx-auto" /></span>
            <span className={labelClass}>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
