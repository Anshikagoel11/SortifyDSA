import { UseAlgoControl } from "../../../context/algoControlContext";
import { motion } from "framer-motion";

export default function BarFunction() {
  const { bars, compareInfo, sorting } = UseAlgoControl();

  // to make height optimize
  const maxVal = Math.max(...bars);

  return (
    <div className="flex items-end justify-center space-x-1 p-2 h-72 w-full overflow-hidden">
      {bars.map((val, i) => {
        
        const isSmaller = compareInfo.smaller === i;
        const isLarger = compareInfo.larger === i;

        // so that height should be in limit - no overflow
        const normalizedHeight = (val / maxVal) * 100;

        let barColor = "bg-blue-500";
        if (sorting === "Selection Sort") {
          if (isSmaller) barColor = "bg-green-400";
          else if(isLarger) barColor = "bg-red-400";
        } else {
          if (isSmaller) barColor = "bg-red-400";
          else if(isLarger) barColor = "bg-green-400";
        }
        return (
          <motion.div
            key={i}
            className={`w-full rounded-t-md text-white text-sm flex items-end justify-center ${barColor}`}
            style={{
              height: `${normalizedHeight}%`,
              width: `${100 / bars.length}%`,
              transition: "height 0.3s ease",
            }}
            layout
          >
            <span className="mb-1">{val}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
