
import { UseAlgoControl } from "../../../context/algoControlContext";
import { motion } from "framer-motion";

export default function LinearSearchBar() {
  const { bars, searchIndex ,currentCompare,IsElementFound,IsSearchDone,searchInput} = UseAlgoControl();

   const arrayLength = bars.length;
  const shouldShrink = arrayLength > 10;
  const barSize = shouldShrink ? Math.min(50, Math.floor(800 / arrayLength)) : 56;

  return (
    <div className="flex flex-col items-center space-y-2 w-full">
    <div className="flex items-end justify-center flex-wrap gap-1 p-2 w-full">

      {bars.map((val, i) => {
        let barColor = 'bg-blue-500';
       if(searchIndex===i) barColor='bg-green-500'
       if(currentCompare===i  && i!==searchIndex) barColor='bg-red-500'

       
        return (
          <div key={i} className="flex flex-col items-center">

  {IsElementFound && searchIndex === i && (
    <div className="text-sm text-green-400 mb-1">✅ Found!</div>
  )}
  
  <motion.div
    className={`w-14 h-14 rounded-md flex items-center justify-center text-white font-semibold text-sm ${barColor}`}
    layout
    transition={{ duration: 0.2 }}
     style={{
                  width: `${barSize}px`,
                  height: `${barSize}px`,
                }}
  >
    {val}
  </motion.div>
  <div className="text-sm text-cyan-300 mt-1">{i}</div>
</div>

        );
      })}

     
    </div>
     {
        IsSearchDone && !IsElementFound && (
          <div className="text-red-400 font-semibold mt-2 text-center w-full">

            ❌ Element Not Found!
          </div>
        )
      }
      {
         searchInput==='' && (
          <div className="text-white font-semibold mt-2 text-center w-full">

            Enter Element to search!
          </div>
        )
      }
      </div>
    
  );
}
