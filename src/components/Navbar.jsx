import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer";
import { TiArrowBack } from "react-icons/ti";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome } from "react-icons/fa";
import useSortingUtils from "../utils/commanFn";

export default function Navbar() {
 
  const location =  useLocation();
  const path = location.pathname;
  
  const [isOpen, setIsOpen] = useState(false);
 const  {resetStates}= useSortingUtils()

  const menuItems = [
    {label: "ChatBot" , path:'/chatbot'}, 
    { label: "Home", path: "/" },
    { label: "Sorting", path: "/sorting/bubble-sort" },
    { label: "Searching", path: "/searching/linear-search" },
    { label: "Stack", path: "/stack" },
    { label: "Queue", path: "/queue" },
    //  { label: "Tree", path: "/tree" },
    // { label: "Graph", path: "/graph" },
    { label: "Linked List", path: "/linkedlist" },
    // { label: "Backtracking", path: "/backtracking" },
    // { label: "SlidingWindow", path: "/slidingwindow" }
  ];

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const menuItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <>
      <nav className="bg-[#1E293B] text-[#E2E8F0] shadow-lg font-sans sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
             <FaHome className="mr-2"/>
              <motion.span 
                className=" pl-6 md:pl-0 text-2xl sm:text-xl font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent tracking-tight"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="font-mono font-semibold">sortify</span>
                <span className="font-mono font-bold text-sky-300">DSA</span>
              </motion.span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-1 ml-12">
              {menuItems.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium tracking-wide transition-all duration-200 ${item.label==='ChatBot'? 'bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent border-2 border-blue-300 font-bold text-5xl mr-2' :
                        isActive
                          ? "text-sky-300 bg-[#334155]/50 shadow-inner"
                          : "text-slate-300 hover:text-sky-300 hover:bg-[#334155]/30"
                      }`
                    }
                    onClick={resetStates}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <motion.div 
              className="md:hidden"
              whileTap={{ scale: 0.9 }}
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md hover:bg-[#334155] focus:outline-none transition-colors"
                aria-label="Toggle menu"
              >
                <motion.svg
                  className="h-6 w-6 text-slate-300 hover:text-sky-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  animate={isOpen ? "open" : "closed"}
                  variants={{
                    open: { rotate: 90 },
                    closed: { rotate: 0 }
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={isOpen ?
                       "M6 18L18 6M6 6l12 12" :  //cross icon
                       "M4 6h16M4 12h16M4 18h16"   //hamburger icon (three horizontal lines)
                      }
                  />
                </motion.svg>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden bg-[#1E293B] border-t border-slate-700/30 overflow-hidden"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
            >
              <div className="px-2 pt-1 pb-3 space-y-1">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={menuItemVariants}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                          isActive
                            ? "text-sky-300 bg-[#334155]"
                            : "text-slate-300 hover:bg-[#334155]/50 hover:text-sky-300"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <Outlet />

     {
      path !== '/chatbot' &&   <Footer />
     }
    
    </>
  );
}