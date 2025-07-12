import { UseAlgoControl } from "../../../context/algoControlContext";
import { motion } from "framer-motion";

export default function BinarySearchBar() {
  const {
    bars,
    searchIndex,
    currentCompare,
    IsElementFound,
    IsSearchDone,
    searchInput, 
    rangeRef,
  } = UseAlgoControl();

  const arrayLength = bars.length;
  const shouldShrink = arrayLength > 10;
  const barSize = shouldShrink ? Math.min(50, Math.floor(800 / arrayLength)) : 56;

  return (
    <div className="flex flex-col items-center space-y-2 w-full">
      <div className="flex items-end justify-center flex-wrap gap-1 w-full md:p-20 p-5">
        {bars.map((val, i) => {
          let barColor = "bg-blue-500";
          let label = null;

          if (searchIndex === i) {
            barColor = "bg-green-500";
            label = "✅ Found!";
          } else if (currentCompare === i) {
            barColor = "bg-red-500";
            label = "🔍 Mid";
          } else if (
            !IsSearchDone &&
            i >= rangeRef.current.start &&
            i <= rangeRef.current.end
          ) {
            barColor = "bg-yellow-500";
            if (i === rangeRef.current.start) {
              label = "START";
            } else if (i === rangeRef.current.end) {
              label = "END";
            }
          }

          return (
            <div key={i} className="flex flex-col items-center space-y-1">
              {label && (
                <div className="text-[10px] sm:text-xs md:text-sm text-white mb-1">{label}</div>
              )}

              <motion.div
                className={`rounded-md flex items-center justify-center text-white font-semibold text-xs md:text-sm ${barColor}`}
                layout
                transition={{ duration: 0.2 }}
                style={{
                  width: `${barSize}px`,
                  height: `${barSize}px`,
                }}
              >
                {val}
              </motion.div>

              <div className="text-[10px] sm:text-xs md:text-sm text-cyan-300 mt-1">{i}</div>
            </div>
          );
        })}
      </div>

      {IsSearchDone && !IsElementFound && (
        <div className="text-red-400 font-semibold mt-2 mb-4 text-center w-full text-sm md:text-base">
          ❌ Element Not Found!
        </div>
      )}

      {searchInput === "" && (
        <div className="text-white mb-4 font-semibold mt-2 text-center w-full text-sm md:text-base">
          Enter Element to search!
        </div>
      )}
    </div>
  );
}