import { motion } from "framer-motion";
import { FaCode, FaTools, FaClock, FaRocket } from "react-icons/fa";

export default function ComingSoon() {
  return (
    <motion.div
      className="bg-gradient-to-br from-[#0F172A] to-[#1E2A3B] min-h-screen flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl w-full bg-[#1E293B]/30 backdrop-blur-lg rounded-xl border border-gray-700/50 p-8 md:p-12 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            className="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-6"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <FaRocket className="text-4xl text-white" />
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text mb-4"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
          Coming Soon!
          </motion.h1>
          
          <motion.div
            className="h-1.5 w-32 mx-auto bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 rounded-full mb-6"
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: 1,
              backgroundPosition: ["0% 50%", "100% 50%"],
            }}
            transition={{
              scaleX: { duration: 0.6, delay: 0.2, type: "spring" },
              backgroundPosition: {
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          />
          
          <p className="text-lg md:text-xl text-gray-300 mb-8">
          working to bring you this visualization!
          </p>
        </div>

        

        
      </div>

      {/* Footer */}
      <motion.div 
        className="mt-12 text-center text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
      
        <p className="mt-1">Check back soon for updates!</p>
      </motion.div>
    </motion.div>
  );
}