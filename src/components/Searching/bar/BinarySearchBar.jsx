
import { UseAlgoControl } from "../../../context/algoControlContext";
import {motion} from 'framer-motion'

export default function BinarySearchBar(){
    const {bars,setSearchIndex} = UseAlgoControl();

    return(

        <div className="flex items-end justify-center space-x-1 p-2 h-72 w-full overflow-hidden">
{
    bars.map((val,i)=>{
        const match = setSearchIndex===i;
  let barColor = "bg-blue-500";
  if(match) barColor = "bg-green-400";
  else if(!match) barColor = "bg-red-400";
        return(
            <motion.div  key={i} className={`w-full rounded-t-md text-white text-sm flex items-end justify-center ${barColor}`}
                style={{
              transition: "height 0.3s ease",
            }}>
            layout
  <span className="mb-1">{val}</span>
            </motion.div>
        )
    })
}
        </div>
    )
}