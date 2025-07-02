import { useSorting } from "../../../context/sortingContext";
import { motion } from "framer-motion";

export default function RadixBar() {
  const { bars, compareInfo } = useSorting();

  // to make height optimize 
  const maxVal = Math.max(...bars); 


  return (
    <div className="flex items-end justify-center space-x-1 p-2 h-72 w-full overflow-hidden">


      {bars.map((val, i) => {
        const isSmaller = compareInfo.smaller === i;
        const isLarger = compareInfo.larger === i;

        // so that height should be in limit - no overflow
        const normalizedHeight = (val / maxVal) * 100;

        return (
          <motion.div
            key={i}
            className={`w-full rounded-t-md text-white text-sm flex items-end justify-center ${
              isSmaller
                ? "bg-green-400"
                : isLarger
                ? "bg-red-400"
                : "bg-blue-500"
            }`}
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
