import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { UseAlgoControl } from "../../context/algoControlContext";
import searchingType from "../../utils/searchingType";
import SearchingTheory from "./searchingTheory";
import useSortingUtils from "../../utils/commanFn";

export default function SearchingComp() {
  const {
    bars,
    setBars,
    arraySize,
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
    setResumeIndex,
    searchInput,
    setSearchInput,
    searchIndex,
    setSearchIndex,
    currentCompare,
    setCurrentCompare,
    IsElementFound,
    setIsElementFound,
    IsSearchDone,
    setIsSearchDone,
    searchingName,
    rangeRef,
    setRangeVersion
  } = UseAlgoControl();

  // console.log("resume index is" , resumeIndex)
  // const scrollRef =   useRef(null);

  const { type } = useParams();
  //   console.log(type);

  const { applyCustomArray, clearCustomArray, generateRandomArray, resetfn } =
    useSortingUtils();

    const isBinarySearch = searchingName === 'Binary Search'
    // console.log("from searchComponent",isBinarySearch)

  return (
    <motion.div
      className=" backdrop-blur-sm border border-gray-700/30 rounded-xl p-2 mb-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* bar */}
      <div
        className={`h-70 mb-2 bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-lg flex items-center justify-center space-x-1 p-2 border border-gray-700/50`}
      >
        {searchingType[type].barComponent}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-1">
        <motion.div
          className="bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-lg p-1 border border-gray-700/50"
          whileHover={{ y: -2 }}
        >
          <div className="flex ">
            <div className="flex items-center space-x-4 mr-4">
              <span className="text-white/80">Size</span>
              <input
                type="number"
                min="2"
                max="40"
                value={arraySize}
                disabled={isActive}
                onChange={(e) => setArraySize(parseInt(e.target.value) || 8)}
                className="bg-gray-800/50 text-white px-3 py-1 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white/80 font-bold text-sm">
                Search Element
              </span>
              <input
                value={searchInput}
                type="number"
                disabled={isActive}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchInput(val === "" ? "" : parseInt(val));
                  
                }}
                className="bg-gray-800/50 text-white px-3 py-1 w-[50%] rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
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
            onClick={()=>{applyCustomArray(isBinarySearch)}}
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
          onClick={()=>{generateRandomArray(isBinarySearch)}}
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
            // current sort to stop
            if(searchInput==='') return;
           
            stop.current = true;

            // Step 2: Use a slightly longer delay to ensure it's fully stopped
            setTimeout(() => {
              reset.current = false;
              stop.current = false;

              setIsActive(true);
              setIsPaused(false);
              setHasReset(false);
              rangeRef.current={start:0,end:arraySize-1}
              const actualSpeed = (21 - speed) * 30;
 
              // Step 3: Start sorting
              searchingType[type].sortFn(
                bars,
                setSearchIndex,
                actualSpeed,
                setIsActive,
                stop,
                reset,
                resumeIndex,
                setResumeIndex,
                searchInput,
                setCurrentCompare,
                setIsElementFound,
                setIsSearchDone,
                rangeRef,
                setRangeVersion
              );
            }, 300); // Increased to 300ms for better cleanup
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
            if (stop.current) {
              stop.current = false;
              setIsPaused(false);
              const actualSpeed = (21 - speed) * 30;
              searchingType[type].sortFn(
                bars,
                setSearchIndex,
                actualSpeed,
                setIsActive,
                stop,
                reset,
                resumeIndex,
                setResumeIndex,
                searchInput,
                setCurrentCompare,
                setIsElementFound,
                setIsSearchDone,
                rangeRef
              );
            } else {
              stop.current = true;
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
            resetfn();
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

      {/* sorting algo data */}
      <SearchingTheory />
    </motion.div>
  );
}
