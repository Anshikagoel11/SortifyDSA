
import { div } from "framer-motion/client";
import { UseAlgoControl } from "../../../context/algoControlContext";
import { motion } from "framer-motion";

export default function LinearSearchBar() {
  const { bars, searchIndex ,currentCompare,IsElementFound} = UseAlgoControl();

  return (
    <div className="flex items-end justify-center  space-x-1 p-2 h-72 w-full overflow-hidden">

      {bars.map((val, i) => {
        let barColor = 'bg-blue-500';
       if(searchIndex===i) barColor='bg-green-500'
       if(currentCompare===i) barColor='bg-red-500'

       
        return (
          <div key={i} className="flex flex-col items-center">
  {IsElementFound && searchIndex === i && (
    <div className="text-sm text-green-400 mb-1">Found!</div>
  )}
  <motion.div
    className={`w-14 h-14 rounded-md flex items-center justify-center text-white font-semibold text-sm ${barColor}`}
    layout
    transition={{ duration: 0.2 }}
  >
    {val}
  </motion.div>
</div>

        );
      })}
    </div>
    
  );
}
