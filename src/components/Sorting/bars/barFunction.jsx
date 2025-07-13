import { UseAlgoControl } from "../../../context/algoControlContext";
import { motion } from "framer-motion";

export default function BarFunction() {
  const { bars, compareInfo, sorting } = UseAlgoControl();
  const maxVal = Math.max(...bars);

  return (
    <div className="flex items-end justify-center space-x-0.5 p-1 h-full w-full overflow-hidden">
      {bars.map((val, i) => {
        const isSmaller = compareInfo.smaller === i;
        const isLarger = compareInfo.larger === i;
        // so that height of bar maintains every value of array
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
            className={`w-full rounded-t-sm flex items-end justify-center ${barColor}`}
            style={{
              height: `${normalizedHeight}%`,
              width: `${100 / bars.length}%`,
              transition: "height 0.2s ease",
            }}
            layout
          >
            {bars.length <= 15 && (
              <span className="text-[8px] md:text-xs mb-0.5 text-white/80">
                {val}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}