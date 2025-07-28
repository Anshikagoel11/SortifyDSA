import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaPause, FaRedo, FaRandom, FaTrash } from "react-icons/fa";
import { UseAlgoControl } from "../../context/algoControlContext";
import useSlidingWindowUtils from "../../utils/slidingWindowFunc";
import SlidingWindowTheory from "./slidingWindowTheory";

const SlidingWindow = () => {
  const { 
    setInputArray, windowSize, setWindowSize, array, inputArray, tip,
    animateSpeed, setAnimateSpeed, currentWindow, currentSum, maxSum, 
    maxSumRange, isAnimating, showLine, pause, active, 
    isReset, stopSlidingWindow 
  } = UseAlgoControl();

  const { ApplyArray, handlePauseResume, handleStart, getRandomArray, handleReset } = useSlidingWindowUtils();

  return (
    <motion.div
      className="backdrop-blur-sm border border-gray-700/30 p-3 sm:p-4 md:p-6 bg-gradient-to-b from-[#1E293B] to-[#0F172A] shadow-2xl "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {/* Header */}
      <div className="mb-4 sm:mb-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 md:mb-3">
            Sliding Window Visualizer
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
            Visualize how sliding window algorithms work with interactive controls.
          </p>
        </motion.div>
      </div>

      {/* Visualization Section */}
      <motion.div
        className="bg-[#0F172A] rounded-xl p-3 sm:p-4 md:p-6 mb-3 sm:mb-4 border border-gray-700/50 shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Stats - Single line */}
        <div className="flex flex-wrap justify-center iterms-center sm:gap-17 gap-2 mb-3 sm:mb-4">
          <div className="bg-[#0F172A]/50 px-2 sm:px-5  py-1 sm:py-4 rounded-lg border border-gray-700/30 min-w-[80px]">
            <p className="text-[10px] sm:text-base text-white mb-0.5">Window</p>
            <p className="text-xs sm:text-base font-bold text-cyan-400">
              [{currentWindow.start},{currentWindow.end}]
            </p>
          </div>
          <div className="bg-[#0F172A]/50 px-2 sm:px-5 py-1 sm:py-4 rounded-lg border border-gray-700/30 min-w-[80px]">
            <p className="text-[10px] sm:text-base text-white mb-0.5">Sum</p>
            <p className="text-xs sm:text-base font-bold text-blue-400">{currentSum}</p>
          </div>
          <div className="bg-[#0F172A]/50 px-2 sm:px-5 py-1 sm:py-4 rounded-lg border border-gray-700/30 min-w-[80px]">
            <p className="text-[10px] sm:text-base text-white mb-0.5">Max Sum</p>
            <p className="text-xs sm:text-base font-bold text-green-400">{maxSum}</p>
          </div>
        </div>

        {showLine && (
          <div className="text-green-500 text-[10px] sm:text-xs md:text-sm text-center mb-1 sm:mb-2 font-medium">
            Maximum sum window
          </div>
        )}

        {/* Array visualization */}
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 py-2 px-1 sm:py-7 bg-gray-800/50 rounded-lg overflow-x-auto">
          <AnimatePresence>
            {array.map((num, index) => {
              const isInWindow = index >= currentWindow.start && index <= currentWindow.end;
              const maxWindow = index >= maxSumRange[0] && index <= maxSumRange[1];
              
              return (
                <motion.div
                  key={index}
                  className="flex-shrink-0"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] sm:text-[10px] md:text-xs text-gray-400 mb-0.5 sm:mb-1">{index}</span>
                    <motion.div
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-15 md:h-15 flex items-center justify-center rounded-md sm:rounded-lg font-bold text-sm sm:text-base md:text-base shadow-md mr-2 ${
                        isInWindow
                          ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
                          : !isAnimating && maxWindow
                          ? "bg-green-500 text-gray-700"
                          : "bg-gray-700 text-gray-300"
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {num}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Controls Section */}
      <div className="bg-[#1E293B]/80 rounded-xl p-2 sm:p-3 md:p-4 border border-gray-700/50 shadow-lg">
        {/* Compact Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-3 sm:mb-4 m-4 ">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            disabled={active}
            className={`px-2 py-2 sm:px-4 sm:py-2 rounded-lg flex items-center gap-1 text-xs sm:text-sm  ${
              active ? "bg-green-300" : "bg-green-500/80 hover:bg-green-500 text-white"
            }`}
          >
            <FaPlay className="text-[10px] sm:text-base " />
            <span>Start</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePauseResume}
            disabled={!active}
            className={`px-2 py-2 sm:px-3 sm:py-2 rounded-lg flex items-center gap-1 text-xs sm:text-sm ${
              !active ? "bg-orange-300" : pause ? "bg-orange-500" : "bg-yellow-500/80 hover:bg-yellow-600"
            } text-white`}
          >
            {pause ? <FaPlay className="text-[10px] sm:text-xs" /> : <FaPause className="text-[10px] sm:text-xs" />}
            <span>{pause ? 'Resume' : 'Pause'}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              isReset.current = true;
              stopSlidingWindow.current = true;
              handleReset();
            }}
            disabled={!active}
            className={`px-2 py-1 sm:px-3 sm:py-2 rounded-lg flex items-center gap-1 text-xs sm:text-sm ${
              !active ? "bg-red-500" : "bg-red-600/80 hover:bg-red-700"
            } text-white`}
          >
            <FaRedo className="text-[10px] sm:text-xs" />
            <span>Reset</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={getRandomArray}
            disabled={active}
            className={`px-2 py-2 sm:px-3 sm:py-2 rounded-lg flex items-center gap-1 text-xs sm:text-sm ${
              active ? 'bg-purple-400' : 'bg-purple-600/80 hover:bg-purple-700'
            } text-white`}
          >
            <FaRandom className="text-[10px] sm:text-xs" />
            <span>Random</span>
          </motion.button>
        </div>

        {/* Inputs Section */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-1 sm:gap-2">
            <input
              type="text"
              value={inputArray}
              onChange={(e) => setInputArray(e.target.value)}
              className="flex-1 bg-gray-800/70 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-xs sm:text-sm"
              placeholder="Array elements (e.g. 5,2,8,3,9)"
            />
            <button 
              onClick={() => setInputArray("")}
              className="p-1 sm:p-1.5 text-gray-400 hover:text-white rounded-lg"
            >
              <FaTrash className="text-[10px] sm:text-xs" />
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={ApplyArray}
              className="px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-500/80 hover:bg-blue-600 text-white rounded-lg text-xs sm:text-sm"
            >
              Apply
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <div>
              <label className="block text-[10px] sm:text-xs text-gray-300 mb-0.5 sm:mb-1">
                Window Size
              </label>
              <div className="flex gap-1 sm:gap-2 items-center">
                <input
                  type="range"
                  min="1"
                  max={array.length}
                  value={windowSize}
                  onChange={(e) => setWindowSize(e.target.value)}
                  className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-white w-8 text-center">{windowSize}</span>
              </div>
              {tip && (
                <motion.div
                  className="mt-1 bg-red-500 text-white text-[9px] sm:text-[10px] p-1 rounded"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Invalid Window size
                </motion.div>
              )}
            </div>
            <div>
              <label className="block text-[10px] sm:text-xs text-gray-300 mb-0.5 sm:mb-1">
                Speed
              </label>
              <div className="flex gap-1 sm:gap-2 items-center">
                <input
                  type="range"
                  value={animateSpeed}
                  onChange={(e) => setAnimateSpeed(e.target.value)}
                  min="1"
                  max="20"
                  className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-white w-8 text-center">{animateSpeed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SlidingWindowTheory/>
    </motion.div>
  );
};

export default SlidingWindow;