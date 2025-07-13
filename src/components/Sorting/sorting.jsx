import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SortingComp from "./SortingComp";
import { UseAlgoControl } from "../../context/algoControlContext";
import useSortingUtils from "../../utils/commanFn";
import AlgorithmButton from "./algoButton";
import Sorting_navBar from "./sorting_navbar";

const sortingAlgorithms = [
  "Bubble Sort",
  "Selection Sort",
  "Insertion Sort",
  "Merge Sort",
  "Quick Sort",
  "Heap Sort",
  "Radix Sort",
  "Shell Sort",
  "Counting Sort"
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
  "Counting Sort": "🧮"
};

export default function Sorting() {
  const {
    sorting,
    setSorting,
    setCompareInfo,
    setIsActive,
    stop,
    setArraySize,
    setIsPaused,
    setHasReset,
  } = UseAlgoControl();
  const { generateRandomArray, clearCustomArray,resetStates } = useSortingUtils();

  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const currentSort = sortingAlgorithms.find((alg) =>
      location.pathname.includes(alg.toLowerCase().replaceAll(" ", "-"))
    );
    if (currentSort) {
      setSorting(currentSort);
    }
  }, [location, setSorting]);

  const filteredAlgorithms = sortingAlgorithms.filter((alg) =>
    alg.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-[#0F172A] to-[#1E2A3B] min-h-screen flex flex-col md:flex-row">
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden fixed top-5 left-2 z-50 rounded bg-[#1E293B]/80 backdrop-blur-sm border border-gray-700/30"
        onClick={() => setShowSidebar(!showSidebar)}
      >
       <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
</svg>

      </button>

      {/* Sidebar - Mobile Overlay */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setShowSidebar(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="w-3/4 h-full bg-[#1E293B]/90 backdrop-blur-lg p-4"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 text-xl font-bold">
                  Sorting Visualizer
                </h2>
                <button 
                  onClick={() => setShowSidebar(false)}
                  className="p-1 rounded-full hover:bg-gray-700/50"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search algorithms..."
                  className="w-full bg-[#1E293B]/50 border border-gray-700/50 rounded-lg px-4 py-2 text-white/80 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
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
              </div>

              <div className="space-y-2 overflow-y-auto h-[calc(100%-100px)]">
                {filteredAlgorithms.map((item) => (
                  <Link
                    key={item}
                    to={`/sorting/${item.toLowerCase().replaceAll(" ", "-")}`}
                    onClick={() => setShowSidebar(false)}
                  >
                    <AlgorithmButton
                      item={item}
                      isActive={sorting === item}
                      onClick={() => {
                        if (item === sorting) return;
                       resetStates();
                      }}
                    />
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop */}
      <motion.div
        className="hidden md:block w-full md:w-[22%] min-w-[260px] bg-[#1E293B]/20 p-4 rounded-lg m-3 border border-gray-700/30 backdrop-blur-xl max-h-[calc(100vh-1.5rem)] overflow-y-auto"
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
                        if (item === sorting) return;
                        setSorting(item);
                        setIsActive(false);
                        setCompareInfo({ smaller: null, larger: null });
                        setArraySize(window.innerWidth < 768 ? 10 : 15);
                        setIsPaused(false);
                        generateRandomArray();
                        setHasReset(true);
                        setIsPaused(false);
                        clearCustomArray();
                        stop.current = true;
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

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#1E293B] to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        />
      </motion.div>

      {/* Main content */}
      <div className="w-full md:w-[78%] px-3 md:px-6 py-4 md:py-6 overflow-y-auto h-screen">
        <Sorting_navBar sorting={sorting} />
        <SortingComp />
      </div>
    </div>
  );
}