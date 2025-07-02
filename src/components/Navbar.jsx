import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer";
import { TiArrowBack } from "react-icons/ti";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Sorting", path: "/sorting/bubble-sort" },
    { label: "Searching", path: "/searching" },
    { label: "Tree", path: "/tree" },
    { label: "Graph", path: "/graph" },
    { label: "Stack/Queue", path: "/stack-queue" },
    { label: "DP", path: "/dp" },
    { label: "Linked List", path: "/linked-list" },
  ];

  return (
    <>
      <nav className="bg-[#1E293B] text-[#E2E8F0] shadow-lg font-sans py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <Link to={"/"}>
              <span className="h-10 w-10 flex items-center justify-center text-2xl text-white bg-gray-700 rounded-full shadow-md hover:text-blue-400 transition-all ">
                <TiArrowBack />
              </span>
            </Link>

            {/* Logo */}
            <div className="flex items-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent tracking-tight">
                <span className="font-mono font-semibold">sortify</span>
                <span className="font-mono font-bold text-sky-300">DSA</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 ml-12">
              {menuItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md text-sm font-medium tracking-wide transition duration-200 ${
                      isActive
                        ? "text-sky-300 border-b-2 border-sky-400"
                        : "hover:text-sky-300 hover:bg-[#334155]/80"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md hover:bg-[#334155] focus:outline-none transition-colors"
              >
                <svg
                  className="h-6 w-6 text-slate-300 hover:text-sky-300 transition duration-200"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-[#1E293B] border-t border-slate-700/30">
            <div className="px-2 pt-2 pb-3 space-y-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-md text-base font-medium tracking-wide transition duration-200 ${
                      isActive
                        ? "text-sky-300 bg-[#334155]"
                        : "hover:bg-[#334155]/80 hover:text-sky-200"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      <Outlet />

      <Footer />
    </>
  );
}
