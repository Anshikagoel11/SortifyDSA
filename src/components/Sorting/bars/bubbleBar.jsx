import { useSorting } from "../../../context/sortingContext";
import { motion } from "framer-motion";

export default function BubbleBar() {
  const { bars, compareInfo } = useSorting();

  return (
    <div className="flex items-end justify-center space-x-1 p-2 h-full w-full">
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
  );
}
