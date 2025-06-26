import { useRef, useState } from "react";
import { motion } from "framer-motion";
import getSorting from "../utils/GetSorting";

function Sorting_navBar({ sorting }) {
  return (
    <div className="mb-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-2xl font-bold mb-1">
          {sorting}
        </h1>
        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </motion.div>
    </div>
  );
}

export default function Sorting() {
  const [sorting, setSorting] = useState("Bubble Sort");
  const [arraySize, setArraySize] = useState(8);
  const [customArray, setCustomArray] = useState("");
  const [bars, setBars] = useState([30, 80, 45, 90, 20, 60, 75, 40]);
  const [compareInfo, setCompareInfo] = useState({ smaller: null, larger: null });
  const [speed, setSpeed] = useState(3);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasReset, setHasReset] = useState(false);

  const stopSorting = useRef(false);
  const reset = useRef(false);

  function generateRandomArray() {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 90 + 5));
    setBars(newArray);
  }

  const applyCustomArray = () => {
    const numbers = customArray.split(",").map((num) => parseInt(num.trim()));
    if (numbers.every((num) => !isNaN(num))) {
      setBars(numbers);
      setArraySize(numbers.length);
    }
  };

  const clearCustomArray = () => setCustomArray("");

  return (
    <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] min-h-screen flex overflow-hidden">
      <div className="w-[20%] bg-[#1E293B]/30 p-1 rounded m-3 border-r border-gray-700/50 backdrop-blur-lg fixed h-screen overflow-y-auto">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 text-xl font-bold mb-6 flex items-center">
          <span className="mr-1">📊</span> Sorting
        </h2>
        <div className="space-y-3">
          {["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort"].map((item) => (
            <motion.button
              key={item}
              onClick={() => setSorting(item)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`
                text-white/90 relative w-[80%] text-left px-2 py-3 rounded-lg transition-all
                bg-gradient-to-r from-blue-400/10 to-blue-700/10
                ${sorting === item ? "bg-blue-600/20" : "hover:bg-blue-500/20"}
                duration-300 overflow-hidden border border-gray-600/30 shadow-sm
              `}
            >
              <span className="relative z-10">{item}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="w-[80%] ml-[20%] px-4 py-2 overflow-y-auto h-screen">
        <Sorting_navBar sorting={sorting} />

        <motion.div className="bg-white/5 backdrop-blur-sm border border-gray-700/30 rounded-xl p-4 mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-white">Algorithm Visualizer</h2>
          </div>

          <div className="h-64 mb-4 bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-lg flex items-end justify-center space-x-1 p-2 border border-gray-700/50">
            {bars.map((height, index) => {
              let barColor = "bg-gradient-to-t from-blue-400 to-cyan-300";
              if (index === compareInfo.smaller) barColor = "bg-red-400";
              if (index === compareInfo.larger) barColor = "bg-green-700";
              return (
                <motion.div key={index} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className={`${barColor} w-8 rounded-t-md hover:bg-cyan-400 cursor-pointer`} style={{ height: `${height}%` }} whileHover={{ scaleY: 1.05 }}>
                  <p className="text-blue-900 text-center">{height}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <motion.div className="bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-lg p-2 border border-gray-700/50" whileHover={{ y: -2 }}>
              <div className="flex items-center space-x-4">
                <span className="text-white/80">Size</span>
                <input type="number" min="2" max="50" value={arraySize} disabled={isActive} onChange={(e) => setArraySize(parseInt(e.target.value) || 8)} className="bg-gray-800/50 text-white px-3 py-1 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
              </div>
              <div className="mt-2">
                <span className="text-white/80">Speed</span>
                <input type="range" min="1" max="20" value={speed} disabled={isActive} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full accent-blue-500" />
              </div>
            </motion.div>

            <motion.div className="bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-lg p-2 border border-gray-700/50" whileHover={{ y: -2 }}>
              <div className="mb-2">
                <span className="text-white/80">Custom Array</span>
                <input type="text" placeholder="Enter comma separated numbers" value={customArray} disabled={isActive} onChange={(e) => setCustomArray(e.target.value)} className="w-full mt-1 bg-gray-800/50 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
              </div>
              <motion.button onClick={applyCustomArray} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`px-3 py-1 bg-blue-600/80 text-white rounded hover:bg-blue-600 transition-colors mr-2 ${isActive? "opacity-50 cursor-not-allowed" :""}`} disabled={isActive}>Get Custom Array</motion.button>
              <motion.button onClick={clearCustomArray} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`px-3 py-1 bg-blue-500/80 text-white rounded hover:bg-blue-500 transition-colors ${isActive? "opacity-50 cursor-not-allowed" :""}`} disabled={isActive}>Clear</motion.button>
            </motion.div>
          </div>

          <div className="flex space-x-4">
            <motion.button onClick={generateRandomArray} whileHover={{ scale: 1.05 }} disabled={isActive} whileTap={{ scale: 0.95 }} className={`px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg ${isActive? "opacity-50 cursor-not-allowed" :""}`}>Randomize</motion.button>
            <motion.button onClick={() => {
              setIsActive(true);
              setIsPaused(false);
              reset.current = false;
              setHasReset(false);
              const actualSpeed = (21 - speed) * 30;
              getSorting[sorting](bars, setBars, setCompareInfo, actualSpeed, setIsActive, stopSorting, reset);
            }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg ${isActive? "opacity-50 cursor-not-allowed" :""}`} disabled={isActive}>Start Visualization</motion.button>
            <motion.button onClick={() => {
              if (stopSorting.current) {
                stopSorting.current = false;
                setIsPaused(false);
                const actualSpeed = (21 - speed) * 30;
                getSorting[sorting](bars, setBars, setCompareInfo, actualSpeed, setIsActive, stopSorting, reset);
              } else {
                stopSorting.current = true;
                setIsPaused(true);
              }
            }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`px-4 py-2  text-white rounded-lg ${isPaused? "bg-green-400":"bg-red-500"}`} disabled={!isActive}>{isPaused ? "Resume" : "STOP"}</motion.button>
            <motion.button onClick={() => {
              if (hasReset) return;
              setIsActive(false);
              stopSorting.current = false;
              reset.current = true;
              setCompareInfo({ smaller: null, larger: null });
              generateRandomArray();
              setHasReset(true);
            }} whileHover={hasReset?{ scale: 1.05 } :{}} whileTap={hasReset?{ scale: 0.95 }:{}} className={`px-4 py-2  rounded-lg ${hasReset?"bg-purple-300 cursor-not-allowed opacity-40" : "bg-purple-400 text-white"}`}>Reset</motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
