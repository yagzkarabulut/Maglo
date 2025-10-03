// Sidebar.jsx
import { useState } from "react";
import {
  FaSignInAlt,
  FaThLarge,
  FaMoon,
  FaSun,
  FaFileAlt,
  FaFolder,
} from "react-icons/fa";

export default function Sidebar() {
  const [openLayout, setOpenLayout] = useState(false);
  const [openPages, setOpenPages] = useState(false);
  const [openSubPages, setOpenSubPages] = useState(false);

  return (
    <aside
      className="w-64 shadow-md shadow-gray-400  h-screen flex-shrink-0"
      aria-label="Sidebar Navigation"
    >
      <nav className="flex flex-col gap-1 p-2 text-sm">
        
        <a
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-400"
        >
          <FaSignInAlt className="text-md" /> Çıkış Yap
        </a>
 
        <button
          onClick={() => setOpenPages(!openPages)}
          className="flex cursor-pointer items-center gap-2 px-3 py-2 rounded hover:bg-gray-400 w-full text-left fon"
          aria-expanded={openPages}
        >
          <FaFileAlt className="text-md" /> Örnek Sayfalar
        </button>
        {openPages && (
          <ul className="ml-6 flex flex-col">
            <li>
              <a className="block cursor-pointer px-3 py-2 hover:bg-gray-400 rounded">Sayfa 1</a>
            </li>
            <li>
              <a className="block cursor-pointer px-3 py-2 hover:bg-gray-400 rounded">Sayfa 2 </a>
            </li>

            
            <button
              onClick={() => setOpenSubPages(!openSubPages)}
              className="flex cursor-pointer items-center gap-2 px-3 py-2 rounded hover:bg-gray-400 w-full text-left"
              aria-expanded={openSubPages}
            >
              <FaFolder /> Örnek Sayfalar 2
            </button>
            {openSubPages && (
              <ul className="ml-6 flex flex-col">
                <li>
                  <a className="block px-3 py-2 cursor-pointer hover:bg-gray-400 rounded">
                    Ekstra sayfa 1
                  </a>
                </li>
                <li>
                  <a className="block cursor-pointer px-3 py-2 hover:bg-gray-400 rounded">
                    Ekstra sayfa 2
                  </a>
                </li>
              </ul>
            )}
          </ul>
        )}
      </nav>
    </aside>
  );
}
