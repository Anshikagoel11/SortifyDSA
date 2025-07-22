import { motion } from "framer-motion";
import { useStackContext } from "../../context/stackContext";
import useStackUtils from "../../utils/stackFunctions";
import { useState } from "react";
import stackData from "../../utils/data/stackData";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function Stack() {
  const { input, setInput, stack, pop, top } = useStackContext();
  const { pushToStack, popFromStack, topOfStack, emptyStack } = useStackUtils();
  const [activeTab, setActiveTab] = useState("theory");
  const [activeLang, setActiveLang] = useState("JavaScript");
  const [operationHistory, setOperationHistory] = useState([]);

  
  const handlePush = () => {
    if (input.trim() === "") return;
    pushToStack();
    setOperationHistory([...operationHistory, `Pushed: ${input}`]);
    setInput("");
  };

  const handlePop = () => {
    if (stack.length === 0) return;
    const poppedValue = stack[stack.length - 1];
    popFromStack();
    setOperationHistory([...operationHistory, `Popped: ${poppedValue}`]);
  };

  const handleTop = () => {
    if (stack.length === 0) return;
    topOfStack();
    setOperationHistory([...operationHistory, `Peeked: ${stack[0]}`]);
  };

  const handleEmpty = () => {
    emptyStack();
    setOperationHistory([...operationHistory, "Emptied stack"]);
  };

  return (
    <motion.div
      className="backdrop-blur-sm border bg-gradient-to-br from-[#0F172A] to-[#1E2A3B] p-4 sm:p-6 md:p-8 shadow-lg p-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.h1
        className="text-white text-xl sm:text-3xl mb-4 sm:mb-6 font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {stackData.stack.sortingName} Visualization
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Input Section */}
        <motion.div
          className="bg-gradient-to-b from-[#1E293B]/80 to-[#0F172A]/80 rounded-xl p-4 border border-gray-700/50 shadow-md col-span-1"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="mb-3">
            <label className="text-blue-300/90 text-sm font-medium mb-1 block">
              Enter Value
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter value to push"
              className="w-full mt-1 bg-gray-800/70 text-white px-4 py-2 rounded-lg border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 text-sm"
              onKeyPress={(e) => e.key === "Enter" && handlePush()}
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-blue-500/30 transition-all flex-1 min-w-[80px]"
              onClick={handlePush}
            >
              Push
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePop}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-red-500/30 transition-all flex-1 min-w-[80px]"
              disabled={stack.length === 0}
            >
              Pop
            </motion.button>
          </div>
        </motion.div>

        {/* Stack Visualization */}
        <motion.div
          className="bg-gradient-to-b from-[#1E293B]/90 to-[#0F172A]/90 rounded-xl p-5 border border-gray-700/50 shadow-inner col-span-2"
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-center mb-2 text-sm text-gray-400">
              <div className="flex items-center">
                <FaArrowUp className="mr-1" />
                <span>Top of Stack</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col-reverse items-center justify-end bg-gray-900/30 rounded-lg border border-gray-700/50 p-4 relative min-h-[200px]">
              {stack.length === 0 ? (
                <div className="text-center text-gray-500 italic text-sm my-auto">
                  Stack is Empty
                </div>
              ) : (
                <div className="w-full flex flex-col items-center">
                  {stack.slice().reverse().map((item, index) => (
                    <motion.div
                      key={index}
                      className={`flex flex-col items-center my-1 ${
                        index === 0? "text-purple-400" : "text-blue-400"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div
                        className={`w-20 h-10 flex items-center justify-center rounded-lg font-bold ${
                          index === 0
                            ? "bg-purple-500/90"
                            : "bg-blue-500/90"
                        } shadow-md`}
                      >
                        {item}
                      </div>
                      {index === 0 && (
                        <div className="text-xs mt-1 text-purple-300">
                          Top
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-3 flex justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleTop}
                className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-xs font-medium shadow-lg hover:shadow-purple-500/30 transition-all"
                disabled={stack.length === 0}
              >
                Peek Top
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-xs font-medium shadow-lg hover:shadow-emerald-500/30 transition-all"
                onClick={handleEmpty}
                disabled={stack.length === 0}
              >
                Clear Stack
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Operation History */}
      <motion.div
        className="bg-gradient-to-b from-[#1E293B]/80 to-[#0F172A]/80 rounded-xl p-4 border border-gray-700/50 shadow-md mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-blue-300 text-sm font-medium mb-2">
          Operation History
        </h3>
        <div className="bg-gray-900/50 rounded-lg p-3 h-40 overflow-y-auto">
          {operationHistory.length === 0 ? (
            <div className="text-gray-500 italic text-sm text-center mt-4">
              No operations yet
            </div>
          ) : (
            <ul className="space-y-1 text-xs">
              {operationHistory
                .slice()
                .reverse()
                .map((op, index) => (
                  <li
                    key={index}
                    className="border-b border-gray-700/50 pb-1 text-gray-300"
                  >
                    {op}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </motion.div>

      {/* Information Tabs */}
      <motion.div
        className="bg-gradient-to-b from-[#1E293B]/80 to-[#0F172A]/80 rounded-xl p-4 border border-gray-700/50 shadow-inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex mb-4 border-b border-gray-700/50 overflow-x-auto">
          {["theory", "code", "complexity", "applications"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "theory" && (
          <div className="text-gray-300/90 text-sm space-y-4">
            <h2 className="text-white text-lg font-medium mb-2 flex items-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 w-2 h-5 rounded-full mr-2"></span>
              Stack Theory
            </h2>
            <p className="whitespace-pre-line">
              {stackData.stack.detailTheory}
            </p>
            <div className="mt-3 pt-3 border-t border-gray-700/50">
              <span className="text-blue-300">Basic Operations:</span>
              <ul className="list-disc list-inside space-y-2 mt-2">
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
            <div className="flex flex-wrap gap-2 mb-4">
              {stackData.stack.code.map((codeBlock) => (
                <button
                  key={codeBlock.language}
                  className={`px-3 py-1 text-xs rounded ${
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
            <pre className="bg-gray-900/70 p-3 rounded-lg overflow-x-auto text-sm text-gray-300 font-mono">
              <code>
                {stackData.stack.code.find((c) => c.language === activeLang)
                  ?.code || "No code available"}
              </code>
            </pre>
          </div>
        )}

        {activeTab === "complexity" && (
          <div className="text-gray-300/90 text-sm space-y-4">
            <h2 className="text-white text-lg font-medium mb-2 flex items-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 w-2 h-5 rounded-full mr-2"></span>
              Stack Complexity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                <h3 className="text-blue-300 font-medium mb-2">
                  Time Complexity
                </h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Push:</span>
                    <span className="text-green-400">O(1)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Pop:</span>
                    <span className="text-green-400">O(1)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Peek:</span>
                    <span className="text-green-400">O(1)</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                <h3 className="text-blue-300 font-medium mb-2">
                  Space Complexity
                </h3>
                <p className="text-green-400">O(n)</p>
                <p className="text-gray-400 text-xs mt-2">
                  Where n is the number of elements in the stack
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div className="text-gray-300/90 text-sm space-y-4">
            <h2 className="text-white text-lg font-medium mb-2 flex items-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 w-2 h-5 rounded-full mr-2"></span>
              Stack Applications
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {stackData.stack.realWorldUsage.map((app, index) => (
                <li key={index}>{app}</li>
              ))}
            </ul>
            <div className="mt-4 pt-3 border-t border-gray-700/50">
              <h3 className="text-blue-300 font-medium mb-2">
                Common Interview Questions
              </h3>
              <ul className="list-disc list-inside space-y-2">
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