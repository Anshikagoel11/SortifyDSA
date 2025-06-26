import { useRef, useState } from "react";
import { motion } from "framer-motion";
import getSorting from "../utils/GetSorting";
import { tr } from "framer-motion/client";

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
  const [compareInfo, setCompareInfo] = useState({
    smaller: null,
    larger: null,
  });
  const [speed, setSpeed] = useState(3);
 const [isActive , setIsActive] = useState(false);
const stopSorting = useRef(false);  //not use useState beacuse useState function call me value freeze kr deta h mtlb jo value gyi vhi jeygi agar vo baad m change hue toh vha reflect nhi hogi aur stop hume loop m har time check krna hoga current situation ke leye ki khi agar user n abhi click toh nhi kr deya

  function generateRandomArray() {
    const newArray = [];
    Array.from({ length: arraySize }, () => {
      let a = Math.floor(Math.random() * 90 + 5);
      newArray.push(a);
    });
    setBars(newArray);
    // console.log(newArray)
  }

  const applyCustomArray = () => {
    const numbers = customArray
      .split(",")
      .map((num) => parseInt(num.trim() * 10));
    if (numbers.every((num) => !isNaN(num))) {
      setBars(numbers);
    }
    setArraySize(numbers.length);
  };

  const clearCustomArray = () => {
    setCustomArray([]);
  };

  return (
    <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] min-h-screen flex overflow-hidden">
      {/* Fixed Left sidebar */}
      <div className="w-[20%] bg-[#1E293B]/30 p-1 rounded m-3 border-r border-gray-700/50 backdrop-blur-lg fixed h-screen overflow-y-auto">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 text-xl font-bold mb-6 flex items-center">
          <span className="mr-1">📊</span> Sorting
        </h2>
        <div className="space-y-3">
          {[
            "Bubble Sort",
            "Selection Sort",
            "Insertion Sort",
            "Merge Sort",
            "Quick Sort",
          ].map((item) => (
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
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Scrollable Main content area */}
      <div className="w-[80%] ml-[20%] px-4 py-2 overflow-y-auto h-screen">
        <Sorting_navBar sorting={sorting} />

        {/* Visualization container */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm border border-gray-700/30 rounded-xl p-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-2 ">
            <h2 className="text-xl font-semibold text-white">
              Algorithm Visualizer
            </h2>
          </div>

          {/* Graph Visualizer */}
          <div className="h-64 mb-4 bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-lg flex items-end justify-center space-x-1 p-2 border border-gray-700/50">
            {bars.map((height, index) => {
              let barColor = "bg-gradient-to-t from-blue-400 to-cyan-300";

              if (index === compareInfo.smaller) {
                // console.log(compareInfo.smaller)
                barColor = "bg-red-400";
              }
              if (index === compareInfo.larger) {
                //  console.log(compareInfo.larger)
                barColor = "bg-green-700";
              }

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

          {/* Controls Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            {/* Array Size Control */}
            <motion.div
              className="bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-lg p-2 border border-gray-700/50"
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
                <motion.button
                  onClick={generateRandomArray}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-1 bg-blue-600/80 text-white rounded hover:bg-blue-600 transition-colors"
                  disabled={isActive}
                >
                  Apply
                </motion.button>
              </div>
              <div className="mt-2">
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

            {/* Custom Array Input */}
            <motion.div
              className="bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-lg p-2 border border-gray-700/50"
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
                  className="w-full mt-1 bg-gray-800/50 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <motion.button
                onClick={applyCustomArray}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-1 bg-blue-600/80 text-white rounded hover:bg-blue-600 transition-colors mr-2"
                disabled={isActive}
              >
                Get Custom Array
              </motion.button>
              <motion.button
                onClick={clearCustomArray}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-1 bg-blue-500/80 text-white rounded hover:bg-blue-500 transition-colors"
                disabled={isActive}
              >
                Clear
              </motion.button>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <motion.button
              onClick={generateRandomArray}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
              }}
              disabled={isActive}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
             Get Random Array
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
              disabled={isActive}
              onClick={() => {
                setIsActive(true);
                 const actualSpeed = (21 - speed) * 30; 
                getSorting[sorting](bars, setBars, setCompareInfo, actualSpeed , setIsActive ,stopSorting);
               
              }}
            >
              Start Visualization
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 ${stopSorting}bg-red-500: bg-red-500 text-white rounded-lg hover:shadow-lg transition-all`}
              disabled={!isActive}
              onClick={() => {
               setIsActive(false)
               stopSorting.current=true;

              }}
            >
            {!stopSorting.current? 'STOP' : 'Resume'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
