import { motion } from "framer-motion";
import { useTreeContext } from "../../context/treeContext";
import TreeStructure from "./treeStructure";
import useTreeUtils from "../../utils/treeFunction";

export default function Tree() {
  const { input, setInput ,setNodes} = useTreeContext();
 const {getTree} = useTreeUtils();
 
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-[#0F172A] to-[#1E2A3B] min-h-screen p-4"
    >
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Heading */}
        <div className="flex-1">
          
          <div className="mb-8">
            <motion.h1
              className="text-white text-3xl sm:text-4xl font-bold mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Tree Visualization
              </span>
            </motion.h1>
            <motion.div
              className="h-1.5 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 rounded-full mt-1"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: 1,
                opacity: 1,
                backgroundPosition: ["0% 50%", "100% 50%"],
              }}
              transition={{
                scaleX: { duration: 0.6, delay: 0.2, type: "spring" },
                opacity: { duration: 0.8 },
                backgroundPosition: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            />
          </div>

          {/* Tree visualization */}
          <div className="mb-8">
            <TreeStructure />
          </div>
        </div>

        {/*Input controls */}
        <div className="w-full lg:w-96">
          <div className="rounded-xl p-6 border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm shadow-lg sticky top-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-white/90 mb-2">
                Enter tree nodes (comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. 10,20,null,40,50,null,null"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-gray-800/70 text-white text-sm px-4 py-2.5 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
              />
              <p className="mt-1 text-xs text-gray-400">
                Use 'null' for empty nodes
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={getTree} className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all">
                Visualize Tree
              </button>
              <button className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all">
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}