import { motion } from "framer-motion";

export default function StackComp() {
  return (
    <motion.div
      className="backdrop-blur-sm border bg-gradient-to-br from-[#0F172A] to-[#1E2A3B]  p-6 mb-4 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-white text-2xl mb-6 font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Stack Visualization
      </motion.h1>

      {/* Stack Visualization */}
      <motion.div 
        className="h-80 mb-6 bg-gradient-to-b from-[#1E293B]/90 to-[#0F172A]/90 rounded-xl p-6 border border-gray-700/50 shadow-inner flex justify-center"
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="relative border-l-2 border-r-2 border-b-2 border-gray-600/80 min-h-10 w-35 flex flex-col-reverse items-center rounded-b-md bg-gray-900/30 ">
          {/* Empty stack state */}
          <motion.div
            className="text-gray-400/80 p-4 italic text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Stack is empty
          </motion.div>
          
          {/* Stack base indicator */}
          <div className="absolute -bottom-5 w-full text-center text-xs text-gray-400">
            BASE
          </div>
        </div>
      </motion.div>

      {/* Input and Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <motion.div
          className="bg-gradient-to-b from-[#1E293B]/80 to-[#0F172A]/80 rounded-xl p-5 border border-gray-700/50 shadow-md"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="mb-3">
            <label className="text-blue-300/90 text-sm font-medium mb-1 block">Value</label>
            <input
              type="text"
              placeholder="Enter value to push"
              className="w-full mt-1 bg-gray-800/70 text-white px-4 py-2 rounded-lg border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
            />
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-b from-[#1E293B]/80 to-[#0F172A]/80 rounded-xl p-5 border border-gray-700/50 shadow-md flex items-center justify-center"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex flex-wrap gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              PUSH
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(239, 68, 68, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium shadow-lg hover:shadow-red-500/30 transition-all"
            >
              POP
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(168, 85, 247, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              TOP
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-medium shadow-lg hover:shadow-emerald-500/30 transition-all"
            >
              EMPTY
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Stack Theory Section */}
      <motion.div
        className="bg-gradient-to-b from-[#1E293B]/80 to-[#0F172A]/80 rounded-xl p-5 border border-gray-700/50 shadow-inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-white text-lg font-medium mb-3 flex items-center">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 w-2 h-5 rounded-full mr-2"></span>
          Stack Theory
        </h2>
        <div className="text-gray-300/90 text-sm space-y-2">
          <p>
            A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle.
          </p>
          <p>
            The last element added to the stack will be the first one to be removed.
          </p>
          <div className="mt-3 pt-3 border-t border-gray-700/50">
            <span className="text-blue-300">Basic Operations:</span>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li>Push: Add an element to the top</li>
              <li>Pop: Remove the top element</li>
              <li>Peek/Top: View the top element</li>
              <li>isEmpty: Check if stack is empty</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}