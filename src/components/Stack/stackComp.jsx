import { motion } from "framer-motion";
import { useStackContext } from "../../context/stackContext";
import useStackUtils from "../../utils/stackFunctions";
import { useRef, useState } from "react";
import stackData from "../../utils/data/stackData";

export default function StackComp() {
  const { input, setInput, stack, pop, top } = useStackContext();
  const { pushToStack, popFromStack, topOfStack, emptyStack } = useStackUtils();
  const stackRef = useRef(null);
  const [activeTab, setActiveTab] = useState("theory");
  const [activeLang, setActiveLang] = useState("JavaScript");

  return (
    <motion.div
      className="backdrop-blur-sm border bg-gradient-to-br from-[#0F172A] to-[#1E2A3B] p-4 sm:p-6 md:p-8 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-white text-xl sm:text-2xl mb-4 sm:mb-6 font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {stackData.stack.sortingName} Visualization
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-6">
        <motion.div
          className="bg-gradient-to-b from-[#1E293B]/80 to-[#0F172A]/80 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-gray-700/50 shadow-md"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="mb-2 sm:mb-3">
            <label className="text-blue-300/90 text-xs sm:text-sm font-medium mb-1 block">
              Value
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter value to push"
              className="w-full mt-1 bg-gray-800/70 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-md sm:rounded-lg border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
            />
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-b from-[#1E293B]/80 to-[#0F172A]/80 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-gray-700/50 shadow-md flex items-center justify-center"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md sm:rounded-lg text-xs sm:text-sm font-medium shadow-lg hover:shadow-blue-500/30 transition-all"
              onClick={() => pushToStack()}
            >
              PUSH
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 10px rgba(239, 68, 68, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={popFromStack}
              className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md sm:rounded-lg text-xs sm:text-sm font-medium shadow-lg hover:shadow-red-500/30 transition-all"
            >
              POP
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={topOfStack}
              className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-md sm:rounded-lg text-xs sm:text-sm font-medium shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              TOP
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-md sm:rounded-lg text-xs sm:text-sm font-medium shadow-lg hover:shadow-emerald-500/30 transition-all"
              onClick={emptyStack}
            >
              EMPTY
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mb-4 sm:mb-6 bg-gradient-to-b from-[#1E293B]/90 to-[#0F172A]/90 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-gray-700/50 shadow-inner flex justify-center"
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="relative border-l-2 border-r-2 border-b-2 border-gray-600/80 w-28 sm:w-32 md:w-35 flex flex-col-reverse items-center rounded-b-md bg-gray-900/30 py-2 sm:py-3 transition-all duration-300">
          {stack.length === 0 && (
            <h2 className="text-center text-gray-600 italic text-xs sm:text-sm">
              Stack is Empty
            </h2>
          )}
          {stack.map((item, i) => {
            let color = "bg-blue-300";
            if (i === pop) color = "bg-red-400";
            else if (i === top) color = "bg-purple-500";
            return (
              <motion.div
                key={i}
                className={`text-black font-bold rounded m-1 p-1 ${color} w-20 sm:w-24 md:w-25 text-center italic text-xs sm:text-sm`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {item}
              </motion.div>
            );
          })}
          <div className="absolute -bottom-4 sm:-bottom-5 w-full text-center text-[10px] xs:text-xs text-gray-400">
            BASE
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bg-gradient-to-b from-[#1E293B]/80 to-[#0F172A]/80 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-gray-700/50 shadow-inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex mb-3 sm:mb-4 border-b border-gray-700/50 overflow-x-auto">
          <div className="flex space-x-1 sm:space-x-2">
            <button
              className={`px-3 sm:px-4 py-1 sm:py-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === "theory"
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("theory")}
            >
              Theory
            </button>
            <button
              className={`px-3 sm:px-4 py-1 sm:py-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === "code"
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("code")}
            >
              Code
            </button>
            <button
              className={`px-3 sm:px-4 py-1 sm:py-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === "complexity"
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("complexity")}
            >
              Complexity
            </button>
            <button
              className={`px-3 sm:px-4 py-1 sm:py-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === "applications"
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("applications")}
            >
              Applications
            </button>
          </div>
        </div>

        {activeTab === "theory" && (
          <div className="text-gray-300/90 text-xs sm:text-sm space-y-3 sm:space-y-4">
            <h2 className="text-white text-base sm:text-lg font-medium mb-1 sm:mb-2 flex items-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 w-2 h-4 sm:h-5 rounded-full mr-2"></span>
              {stackData.stack.sortingName} Theory
            </h2>
            <p className="whitespace-pre-line">
              {stackData.stack.detailTheory}
            </p>
            <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-700/50">
              <span className="text-blue-300">Basic Operations:</span>
              <ul className="list-disc list-inside space-y-1 mt-1 sm:mt-2">
                {stackData.stack.operations.map((op, index) => (
                  <li key={index}>
                    <span className="font-medium">{op.name}:</span>{" "}
                    {op.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "code" && (
          <div>
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
              {stackData.stack.code.map((codeBlock) => (
                <button
                  key={codeBlock.language}
                  className={`px-2 sm:px-3 py-1 text-[10px] xs:text-xs rounded ${
                    activeLang === codeBlock.language
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  onClick={() => setActiveLang(codeBlock.language)}
                >
                  {codeBlock.language}
                </button>
              ))}
            </div>
            <pre className="bg-gray-900/70 p-2 sm:p-3 md:p-4 rounded-md sm:rounded-lg overflow-x-auto text-xs sm:text-sm text-gray-300 font-mono">
              <code>
                {stackData.stack.code.find(
                  (c) => c.language === activeLang
                )?.code || "No code available"}
              </code>
            </pre>
          </div>
        )}

        {activeTab === "complexity" && (
          <div className="text-gray-300/90 text-xs sm:text-sm space-y-3 sm:space-y-4">
            <h2 className="text-white text-base sm:text-lg font-medium mb-1 sm:mb-2 flex items-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 w-2 h-4 sm:h-5 rounded-full mr-2"></span>
              Time & Space Complexity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gray-900/50 p-2 sm:p-3 md:p-4 rounded-md sm:rounded-lg border border-gray-700/50">
                <h3 className="text-blue-300 font-medium mb-1 sm:mb-2">
                  Time Complexity
                </h3>
                <ul className="space-y-1 sm:space-y-2">
                  <li className="flex justify-between">
                    <span>Push:</span>
                    <span className="text-green-400">
                      {stackData.stack.timeComplexity.push}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Pop:</span>
                    <span className="text-green-400">
                      {stackData.stack.timeComplexity.pop}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Peek:</span>
                    <span className="text-green-400">
                      {stackData.stack.timeComplexity.peek}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-2 sm:p-3 md:p-4 rounded-md sm:rounded-lg border border-gray-700/50">
                <h3 className="text-blue-300 font-medium mb-1 sm:mb-2">
                  Space Complexity
                </h3>
                <p className="text-green-400">
                  {stackData.stack.spaceComplexity}
                </p>
                <p className="text-gray-400 text-[10px] xs:text-xs mt-1 sm:mt-2">
                  Where n is the number of elements in the stack
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div className="text-gray-300/90 text-xs sm:text-sm space-y-3 sm:space-y-4">
            <h2 className="text-white text-base sm:text-lg font-medium mb-1 sm:mb-2 flex items-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 w-2 h-4 sm:h-5 rounded-full mr-2"></span>
              Real-world Applications
            </h2>
            <ul className="list-disc list-inside space-y-1 sm:space-y-2">
              {stackData.stack.realWorldUsage.map((app, index) => (
                <li key={index}>{app}</li>
              ))}
            </ul>
            <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-700/50">
              <h3 className="text-blue-300 font-medium mb-1 sm:mb-2">
                Common Interview Questions
              </h3>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2">
                {stackData.stack.commonInterviewQuestions.map((q, index) => (
                  <li key={index}>{q}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}