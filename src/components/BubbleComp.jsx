import { useRef, useState } from "react";
import { motion } from "framer-motion";
import bubbleSort from "./sorting_algo/bubbleSort";

export default function BubbleSort() {
  const [arraySize, setArraySize] = useState(8);
  const [customArray, setCustomArray] = useState("");
  const [bars, setBars] = useState([30, 80, 45, 90, 20, 60, 75, 40]);
  const [compareInfo, setCompareInfo] = useState({
    smaller: null,
    larger: null,
  });
  const [speed, setSpeed] = useState(3);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasReset, setHasReset] = useState(false);

  const stopSorting = useRef(false);
  const reset = useRef(false);

  function generateRandomArray() {
    const newArray = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 90 + 5)
    );
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
    <motion.div
      className="bg-white/5 backdrop-blur-sm border border-gray-700/30 rounded-xl p-2 mb-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >

      <div className="h-64 mb-2 bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-lg flex items-end justify-center space-x-1 p-2 border border-gray-700/50">
        {bars.map((height, index) => {
          let barColor = "bg-gradient-to-t from-blue-400 to-cyan-300";
          if (index === compareInfo.smaller) barColor = "bg-red-400";
          if (index === compareInfo.larger) barColor = "bg-green-700";
          return (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`${barColor} w-8 rounded-t-md hover:bg-cyan-400 cursor-pointer`}
              style={{ height: `${height}%` }}
              whileHover={{ scaleY: 1.05 }}
            >
              <p className="text-blue-900 text-center">{height}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-1">
        <motion.div
          className="bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-lg p-1 border border-gray-700/50"
          whileHover={{ y: -2 }}
        >
          <div className="flex items-center space-x-4">
            <span className="text-white/80">Size</span>
            <input
              type="number"
              min="2"
              max="50"
              value={arraySize}
              disabled={isActive}
              onChange={(e) => setArraySize(parseInt(e.target.value) || 8)}
              className="bg-gray-800/50 text-white px-3 py-1 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div className="mt-1">
            <span className="text-white/80">Speed</span>
            <input
              type="range"
              min="1"
              max="20"
              value={speed}
              disabled={isActive}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-lg p-1 border border-gray-700/50"
          whileHover={{ y: -2 }}
        >
          <div className="mb-2">
            <span className="text-white/80">Custom Array</span>
            <input
              type="text"
              placeholder="Enter comma separated numbers"
              value={customArray}
              disabled={isActive}
              onChange={(e) => setCustomArray(e.target.value)}
              className="w-full mt-1 bg-gray-800/50 text-white px-3 py-1 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <motion.button
            onClick={applyCustomArray}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-2 py-1 mt-1 bg-blue-600/80 text-white rounded hover:bg-blue-600 transition-colors mr-2 ${
              isActive ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isActive}
          >
            Get Custom Array
          </motion.button>
          <motion.button
            onClick={clearCustomArray}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-2 py-1 mt-1 bg-blue-500/80 text-white rounded hover:bg-blue-500 transition-colors ${
              isActive ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isActive}
          >
            Clear
          </motion.button>
        </motion.div>
      </div>

      <div className="flex space-x-4 mt-2">
        <motion.button
          onClick={generateRandomArray}
          whileHover={{ scale: 1.05 }}
          disabled={isActive}
          whileTap={{ scale: 0.95 }}
          className={`px-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg ${
            isActive ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Randomize
        </motion.button>
        <motion.button
          onClick={() => {
            setIsActive(true);
            setIsPaused(false);
            reset.current = false;
            setHasReset(false);
            const actualSpeed = (21 - speed) * 30;
            bubbleSort(
              bars,
              setBars,
              setCompareInfo,
              actualSpeed,
              setIsActive,
              stopSorting,
              reset
            );
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg ${
            isActive ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isActive}
        >
          Start Visualization
        </motion.button>
        <motion.button
          onClick={() => {
            if (stopSorting.current) {
              stopSorting.current = false;
              setIsPaused(false);
              const actualSpeed = (21 - speed) * 30;
              bubbleSort(
                bars,
                setBars,
                setCompareInfo,
                actualSpeed,
                setIsActive,
                stopSorting,
                reset
              );
            } else {
              stopSorting.current = true;
              setIsPaused(true);
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2  text-white rounded-lg ${
            isPaused ? "bg-green-400" : "bg-red-500"
          }`}
          disabled={!isActive}
        >
          {isPaused ? "Resume" : "STOP"}
        </motion.button>
        <motion.button
          onClick={() => {
            if (hasReset) return;
            setIsActive(false);
            stopSorting.current = false;
            reset.current = true;
            setCompareInfo({ smaller: null, larger: null });
            generateRandomArray();
            setHasReset(true);
          }}
          whileHover={hasReset ? { scale: 1.05 } : {}}
          whileTap={hasReset ? { scale: 0.95 } : {}}
          className={`px-4 py-2  rounded-lg ${
            hasReset
              ? "bg-purple-300 cursor-not-allowed opacity-40"
              : "bg-purple-400 text-white"
          }`}
        >
          Reset
        </motion.button>
      </div>
    </motion.div>
  );
}
