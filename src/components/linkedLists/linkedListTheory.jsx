import linkedListData from "../../utils/data/linkedListData";

import { motion } from "framer-motion";
import { FaCode, FaListUl, FaClock, FaGlobe, FaQuestionCircle } from "react-icons/fa";

export default function LinkedListTheory() {
    const data = linkedListData.linkedList;
  return (
    <motion.div 
      className="mt-10 bg-[#1E293B]/80 rounded-xl p-6 border border-gray-700/50 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-2">
          {data.name}
        </h2>
        <p className="text-gray-300">{data.definition}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Detailed Theory */}
        <motion.div 
          className="bg-[#0F172A] p-4 rounded-lg border border-gray-700/30"
          whileHover={{ y: -3 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <FaListUl className="mr-2 text-blue-400" /> Detailed Theory
          </h3>
          <div className="text-gray-300 text-sm space-y-3">
            {data.detailTheory.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        {/* Operations */}
        <motion.div 
          className="bg-[#0F172A] p-4 rounded-lg border border-gray-700/30"
          whileHover={{ y: -3 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <FaListUl className="mr-2 text-green-400" /> Operations
          </h3>
          <ul className="text-gray-300 text-sm space-y-2">
            {data.operations.map((op, i) => (
              <li key={i} className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <div>
                  <span className="font-medium text-white">{op.name}:</span> {op.description}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Code Examples */}
        <motion.div 
          className="bg-[#0F172A] p-4 rounded-lg border border-gray-700/30"
          whileHover={{ y: -3 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <FaCode className="mr-2 text-purple-400" /> Code Examples
          </h3>
          <div className="space-y-4">
            {data.code.map((example, i) => (
              <div key={i}>
                <h4 className="text-sm font-medium text-gray-400 mb-1">{example.language}</h4>
                <pre className="bg-gray-800/70 text-gray-200 p-3 rounded-md text-xs overflow-x-auto">
                  <code>{example.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Time & Space Complexity */}
        <motion.div 
          className="bg-[#0F172A] p-4 rounded-lg border border-gray-700/30"
          whileHover={{ y: -3 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <FaClock className="mr-2 text-yellow-400" /> Complexity Analysis
          </h3>
          <div className="text-gray-300 text-sm space-y-3">
            <div>
              <h4 className="font-medium text-white mb-1">Time Complexity:</h4>
              <ul className="space-y-1 ml-1">
                {Object.entries(data.timeComplexity).map(([op, complexity]) => (
                  <li key={op} className="flex">
                    <span className="text-blue-400 mr-2">•</span>
                    <span className="font-medium">{op}:</span> <span className="ml-1">{complexity}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white">Space Complexity:</h4>
              <p>{data.spaceComplexity}</p>
            </div>
          </div>
        </motion.div>

        {/* Real World Usage */}
        <motion.div 
          className="bg-[#0F172A] p-4 rounded-lg border border-gray-700/30"
          whileHover={{ y: -3 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <FaGlobe className="mr-2 text-emerald-400" /> Real World Usage
          </h3>
          <ul className="text-gray-300 text-sm space-y-2">
            {data.realWorldUsage.map((use, i) => (
              <li key={i} className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                {use}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Interview Questions */}
        <motion.div 
          className="bg-[#0F172A] p-4 rounded-lg border border-gray-700/30"
          whileHover={{ y: -3 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <FaQuestionCircle className="mr-2 text-red-400" /> Common Interview Questions
          </h3>
          <ul className="text-gray-300 text-sm space-y-2">
            {data.commonInterviewQuestions.map((question, i) => (
              <li key={i} className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                {question}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Extra Info */}
      {data.extra && (
        <motion.div 
          className="mt-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-4 rounded-lg border border-blue-700/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-300 text-sm italic">{data.extra}</p>
        </motion.div>
      )}
    </motion.div>
  );
}