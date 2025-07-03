import { div } from "framer-motion/client";
import { useSorting } from "../../../context/sortingContext";
import { motion } from "framer-motion";

export default function LinearSearchBar() {
  const { bars, searchIndex ,currentCompare,IsElementFound} = useSorting();

  return (
    <div className="flex items-end justify-center  space-x-1 p-2 h-72 w-full overflow-hidden">

      {bars.map((val, i) => {
        let barColor = 'bg-blue-500';
       if(searchIndex===i) barColor='bg-green-500'
       if(currentCompare===i) barColor='bg-red-500'

       
        return (
         <motion.div
            key={i}
            className={`w-14 h-14 rounded-md flex items-center justify-center text-white font-semibold text-sm ${barColor}`}
            layout
            transition={{ duration: 0.2 }}
          >
            {val}
          </motion.div>
        );
      })}
    </div>
  );
}
