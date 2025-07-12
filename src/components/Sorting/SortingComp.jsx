import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { UseAlgoControl } from "../../context/algoControlContext";
import sortingType from "../../utils/sortingType";
import SortingTheory from "./sortingTheory";
import useSortingUtils from "../../utils/commanFn";
import BarFunction from "./bars/barFunction";
import { FaPlay, FaPause, FaRedo, FaRandom } from "react-icons/fa";

export default function SortingComp() {
  const {
    bars,
    setBars,
    arraySize,
    setCompareInfo,
    setCustomArray,
    setArraySize,
    stop,
    customArray,
    reset,
    isPaused,
    setIsPaused,
    hasReset,
    setHasReset,
    speed,
    setSpeed,
    isActive,
    setIsActive,
    resumeIndex,
    setResumeIndex
  } = UseAlgoControl();

  const { type } = useParams();
  const { applyCustomArray, clearCustomArray, generateRandomArray, resetfn } = useSortingUtils();

  const handleStartVisualization = () => {
    stop.current = true;
    setTimeout(() => {
      reset.current = false;
      stop.current = false;
      setIsActive(true);
      setIsPaused(false);
      setHasReset(false);
      const actualSpeed = (21 - speed) * 30;
      sortingType[type].sortFn(
        bars,
        setBars,
        setCompareInfo,
        actualSpeed,
        setIsActive,
        stop,
        reset,
        resumeIndex,
        setResumeIndex
      );
    }, 300);
  };

  const handleTogglePause = () => {
    if (stop.current) {
      stop.current = false;
      setIsPaused(false);
      const actualSpeed = (21 - speed) * 30;
      sortingType[type].sortFn(
        bars,
        setBars,
        setCompareInfo,
        actualSpeed,
        setIsActive,
        stop,
        reset,
        resumeIndex,
        setResumeIndex
      );
    } else {
      stop.current = true;
      setIsPaused(true);
    }
  };

  return (
    <motion.div
      className="backdrop-blur-sm border border-gray-700/30 rounded-xl p-3 md:p-4 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={`h-48 md:h-64 mb-3 md:mb-4 bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-lg flex items-end justify-center space-x-1 p-2 border border-gray-700/50`}>
        <BarFunction/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 md:mb-4">
        <motion.div
          className="bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-lg p-3 border border-gray-700/50"
          whileHover={{ y: -2 }}
        >
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div>
              <label className="block text-xs md:text-sm text-white/80 mb-1">Array Size</label>
              <input
                type="range"
                min="5"
                max={window.innerWidth < 768 ? 20 : 35}
                value={arraySize}
                disabled={isActive}
                onChange={(e) => setArraySize(parseInt(e.target.value))}
                className="w-full accent-blue-500 mb-1"
              />
              <div className="text-center text-white/70 text-xs md:text-sm">{arraySize} elements</div>
            </div>
            <div>
              <label className="block text-xs md:text-sm text-white/80 mb-1">Speed</label>
              <input
                type="range"
                min="1"
                max="20"
                value={speed}
                disabled={isActive}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full accent-blue-500 mb-1"
              />
              <div className="text-center text-white/70 text-xs md:text-sm">{21 - speed}x</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-lg p-3 border border-gray-700/50"
          whileHover={{ y: -2 }}
        >
          <div className="mb-2">
            <label className="block text-xs md:text-sm text-white/80 mb-1">Custom Array</label>
            <input
              type="text"
              placeholder="e.g. 10,20,30,40,50"
              value={customArray}
              disabled={isActive}
              onChange={(e) => setCustomArray(e.target.value)}
              className="w-full bg-gray-800/50 text-white px-2 py-1.5 md:px-3 md:py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-xs md:text-sm"
            />
          </div>
          <div className="flex space-x-2">
            <motion.button
              onClick={() => applyCustomArray(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 px-2 py-1.5 md:px-3 md:py-2 bg-blue-600/80 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center space-x-1 text-xs md:text-sm ${
                isActive ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isActive}
            >
              <span>Apply Array</span>
            </motion.button>
            <motion.button
              onClick={() => clearCustomArray()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-2 py-1.5 md:px-3 md:py-2 bg-blue-500/80 text-white rounded hover:bg-blue-500 transition-colors flex items-center justify-center text-xs md:text-sm ${
                isActive ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isActive}
            >
              <span>Clear</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <motion.button
          onClick={() => generateRandomArray(false)}
          whileHover={{ scale: 1.05 }}
          disabled={isActive}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg flex items-center space-x-1 ${
            isActive ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaRandom className="text-xs md:text-sm" />
          <span>Randomize</span>
        </motion.button>

        <motion.button
          onClick={handleStartVisualization}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg flex items-center space-x-1 ${
            isActive ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isActive}
        >
          <FaPlay className="text-xs md:text-sm" />
          <span>Start</span>
        </motion.button>

        <motion.button
          onClick={handleTogglePause}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-2 text-xs md:text-sm text-white rounded-lg flex items-center space-x-1 ${
            isPaused ? "bg-green-400" : "bg-red-500"
          } ${!isActive ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!isActive}
        >
          {isPaused ? <FaPlay className="text-xs md:text-sm" /> : <FaPause className="text-xs md:text-sm" />}
          <span>{isPaused ? "Resume" : "Pause"}</span>
        </motion.button>

        <motion.button
          onClick={() => resetfn()}
          whileHover={hasReset ? { scale: 1.05 } : {}}
          whileTap={hasReset ? { scale: 0.95 } : {}}
          className={`px-3 py-2 text-xs md:text-sm rounded-lg flex items-center space-x-1 ${
            hasReset
              ? "bg-purple-300 cursor-not-allowed opacity-40"
              : "bg-purple-400 text-white"
          }`}
        >
          <FaRedo className="text-xs md:text-sm" />
          <span>Reset</span>
        </motion.button>
      </div>

        <SortingTheory />
     
    </motion.div>
  );
}