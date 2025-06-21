export default function Navbar() {
  const menuItems = [
    "Home",
    "Sorting",
    "Searching",
    "Tree",
    "Graph",
    "Stack/Queue",
    "DP",
    "Linked List",
  ];

  return (
    <nav className="bg-[#1E293B] text-[#E2E8F0] shadow-lg font-sans py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with improved typography */}
          <div className="flex items-center">
            <span className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent tracking-tight">
              <span className="font-mono font-semibold">sortify</span>
              <span className="font-mono font-bold text-sky-300">DSA</span>
            </span>
          </div>

          {/* Desktop Menu with better font styling */}
          <div className="hidden md:flex space-x-6 ml-12">
            {menuItems.map((item) => (
              <div
                key={item}
                className="px-4 py-2 rounded-md text-sm  hover:bg-[#334155]/80 hover:text-sky-300 transition duration-200 cursor-pointer font-medium tracking-wide"
              >
                {item}
              </div>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button className="p-2 rounded-md hover:bg-[#334155] focus:outline-none transition-colors">
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
      <div className="hidden md:hidden bg-[#1E293B] border-t border-slate-700/30">
        <div className="px-2 pt-2 pb-3 space-y-2">
          {menuItems.map((item) => (
            <div
              key={`mobile-${item}`}
              className="block px-4 py-3 rounded-md text-base font-medium hover:bg-[#334155]/80 hover:text-sky-200 transition duration-200 cursor-pointer tracking-wide"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}