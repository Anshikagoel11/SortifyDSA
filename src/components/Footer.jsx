import { motion } from "framer-motion";
import { div } from "framer-motion/client";
export default function Footer(){
     {/* Footer */}
       return(
        <div className="bg-[#0F172A]">
         <motion.div
          className=" text-center text-gray-400 text-sm p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1 }}
        >
          <p>Made by Anshika Goel with love!</p>
          <p>Sorting Algorithm Visualization Tool</p>
          <p className="mt-1">Click on different algorithms to see how they work</p>
        </motion.div>
        </div>
       )
}