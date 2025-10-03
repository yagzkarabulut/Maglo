import { useState } from "react";
import { FaSignInAlt, FaFileAlt, FaFolder, FaBars } from "react-icons/fa";

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  const itemBase =
    "flex items-center gap-2 px-4 py-3 rounded-lg transition-colors duration-150 text-base";
  const itemJustify = collapsed ? "justify-center" : "justify-start";
  const labelClass = collapsed ? "hidden" : "";

  return (
    <aside
      className={`${collapsed ? "w-16" : "w-64"} h-screen bg-gray-50 border-r border-gray-100 flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden`}
      aria-label="Sidebar Navigation"
    >
      <nav className="flex flex-col h-full p-6">
       
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

          {/* Toggle*/}
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle sidebar"
            aria-expanded={!collapsed}
            title={collapsed ? "Menüyü genişlet" : "Menüyü daralt"}
          >
            <FaBars className="text-lg" />
          </button>
        </div>

        {/* Menu */}
        <ul className="mt-2 flex-1 flex flex-col gap-1">
          <li>
            <a
              href="/dashboard"
              className={`${itemBase} ${itemJustify} bg-lime-300 text-gray-900 font-semibold`}
              title="Dashboard"
            >
              <FaFolder className="text-lg" />
              <span className={labelClass}>Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`${itemBase} ${itemJustify} text-gray-500 hover:bg-gray-100`}
              title="Transactions"
            >
              <FaFileAlt className="text-lg" />
              <span className={labelClass}>Transactions</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`${itemBase} ${itemJustify} text-gray-500 hover:bg-gray-100`}
              title="Invoices"
            >
              <FaFileAlt className="text-lg" />
              <span className={labelClass}>Invoices</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`${itemBase} ${itemJustify} text-gray-500 hover:bg-gray-100`}
              title="My Wallets"
            >
              <FaFolder className="text-lg" />
              <span className={labelClass}>My Wallets</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`${itemBase} ${itemJustify} text-gray-500 hover:bg-gray-100`}
              title="Settings"
            >
              <FaBars className="text-lg" />
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
          <a
            href="/"
            className={`${itemBase} ${itemJustify} text-gray-500 hover:bg-gray-100 w-full`}
            title="Logout"
          >
            <FaSignInAlt className="text-lg" />
            <span className={labelClass}>Logout</span>
          </a>
        </div>
      </nav>
    </aside>
  );
}
