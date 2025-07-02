import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import SortingComp from "./SortingComp";
import { useSorting } from "../../context/sortingContext";
import useSortingUtils from "../../utils/commanFn";

const sortingAlgorithms = [
  "Bubble Sort",
  "Selection Sort",
  "Insertion Sort",
  "Merge Sort",
  "Quick Sort",
  "Heap Sort",
  "Radix Sort",
  "Shell Sort",
  "Counting Sort",
  "Bucket Sort",
];

const algorithmIcons = {
  "Bubble Sort": "🫧",
  "Selection Sort": "🔍",
  "Insertion Sort": "📥",
  "Merge Sort": "🔄",
  "Quick Sort": "⚡",
  "Heap Sort": "📊",
  "Radix Sort": "🔢",
  "Shell Sort": "🐚",
  "Counting Sort": "🧮",
  "Bucket Sort": "🪣",
};

function SortingNavBar({ sorting }) {
  
  return (
    <div className="mb-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, type: "spring" }}
        className="flex flex-col sm:flex-row sm:items-end justify-between"
      >
        <div className="flex items-center mb-2 sm:mb-0">
          <motion.div
            className="mr-4 text-4xl"
            animate={{
              y: [0, -5, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {algorithmIcons[sorting] || "📊"}
          </motion.div>
          <div>
            <motion.h1
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-3xl font-bold"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {sorting}
            </motion.h1>
            <motion.div
              className="h-1.5 w-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 rounded-full mt-1"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: 1,
                opacity: 1,
                backgroundPosition: ["0% 50%", "100% 50%"],
              }}
              transition={{
                scaleX: { duration: 0.6, delay: 0.2, type: "spring" },
                opacity: { duration: 0.8 },
                backgroundPosition: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function AlgorithmButton({ item, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        y: -4,
        scale: 1.02,
        boxShadow: "0 8px 20px -8px rgba(56, 182, 255, 0.4)",
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`
        relative w-full text-left px-2 py-3 rounded-xl transition-all
        ${isActive ? "text-white" : "text-white/80 hover:text-white"}
        overflow-hidden border
        ${
          isActive
            ? "border-blue-400/50"
            : "border-gray-600/30 hover:border-blue-400/30"
        }
      `}
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isActive ? 1 : 0.7,
          background: isActive
            ? "linear-gradient(135deg, rgba(56, 182, 255, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%)"
            : "linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.7) 100%)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Particle background for active item */}
      {isActive && (
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.2 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20],
                opacity: [0.8, 0],
                scale: [1, 0.5],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Shimmer effect */}
      {isActive && (
        <motion.div
          className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "linear",
          }}
        />
      )}

      {/* Continuous glow animation */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(56, 182, 255, 0.3)",
              "0 0 0 6px rgba(56, 182, 255, 0.1)",
              "0 0 0 0 rgba(56, 182, 255, 0)",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeOut",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center">
        <motion.div
          className={`h-2 w-2 rounded-full mr-3 ${
            isActive ? "bg-blue-400" : "bg-gray-500"
          }`}
          animate={{
            scale: isActive ? [1, 1.4, 1] : 1,
            opacity: isActive ? [0.8, 1, 0.8] : 0.7,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="flex-1">
          <span className="font-medium block">{item}</span>
          <motion.span
            className="text-xs text-gray-400 block mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.2 }}
          >
            {isActive ? "Currently visualizing" : "Click to visualize"}
          </motion.span>
        </div>

        {isActive && (
          <motion.div
            className="ml-4"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}

export default function Sorting() {
  const { sorting, setSorting ,setCompareInfo,setIsActive,stopSorting,setArraySize} = useSorting();
const {generateRandomArray} = useSortingUtils();

  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");



  useEffect(() => {
    // Update active sorting based on route
    const currentSort = sortingAlgorithms.find((alg) =>
      location.pathname.includes(alg.toLowerCase().replaceAll(" ", "-"))
    );
    if (currentSort) {
      setSorting(currentSort);
    }
  }, [location]);



  const filteredAlgorithms = sortingAlgorithms.filter((alg) =>
    alg.toLowerCase().includes(searchTerm.toLowerCase())
  );


  
  return (
    <div className="bg-gradient-to-br from-[#0F172A] to-[#1E2A3B] min-h-screen flex overflow-hidden ">
      {/* Sidebar */}
      <motion.div
        className="w-[22%] min-w-[260px] bg-[#1E293B]/20 p-4 rounded-lg m-3 border border-gray-700/30 backdrop-blur-xl fixed h-[calc(100vh-1.5rem)] overflow-y-auto"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="sticky top-0 pt-2 pb-4 bg-gradient-to-b from-[#1E293B]/80 via-[#1E293B]/50 to-transparent z-10"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 text-xl font-bold flex items-center">
              <motion.span
                className="mr-2"
                animate={{ rotate: [0, 20, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                📊
              </motion.span>
              Sorting Visualizer
            </h2>

            <motion.div
              className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <span className="text-xs font-bold text-white">VS</span>
            </motion.div>
          </div>

          <motion.div
            className="relative mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <input
              type="text"
              placeholder="Search algorithms..."
              className="w-full bg-[#1E293B]/50 border border-gray-700/50 rounded-lg px-4 py-2 text-white/80 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500 absolute right-3 top-2.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </motion.div>
        </motion.div>

        <div className="space-y-3 mt-2">
          <AnimatePresence>
            {filteredAlgorithms.length > 0 ? (
              filteredAlgorithms.map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  exit={{ opacity: 0, x: -10 }}
                  layout
                >
                  <Link
                    to={`/sorting/${item.toLowerCase().replaceAll(" ", "-")}`}
                  >
                    <AlgorithmButton
                      item={item}
                      isActive={sorting === item}
                      onClick={() => {
                       setSorting(item);
  setIsActive(false);
  setCompareInfo({ smaller: null, larger: null });
   setArraySize(8)
  generateRandomArray();
  stopSorting.current = true; 
                       
                      }}
                    />
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="text-center py-8 text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No algorithms found
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#1E293B] to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        />
      </motion.div>

      {/* Main content */}
      <div className="w-[78%] ml-[22%] px-8 py-6 overflow-y-auto h-screen">
        <SortingNavBar sorting={sorting} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#1E293B]/30 backdrop-blur-sm rounded-xl border border-gray-700/30 p-6 shadow-lg"
        >
          <SortingComp />
        </motion.div>
      </div>
    </div>
  );
}
