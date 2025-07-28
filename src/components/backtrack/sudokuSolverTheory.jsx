import { motion } from "framer-motion";
import {
  FaChessQueen,
  FaCode,
  FaClock,
  FaBrain,
  FaLightbulb,
  FaQuestion,
} from "react-icons/fa";
import sudokuData from "../../utils/data/sudokusolverData";
import { useState } from "react";


export default function SudokuSolverTheory() {
  const [selectedLanguage, setSelectedLanguage] = useState("C");
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);
  const {
    name,
    definition,
    detailTheory,
    operations,
    code,
    timeComplexity,
    spaceComplexity,
    realWorldUsage,
    commonInterviewQuestions,
    variations,
    extra,
  } = sudokuData.sudoku;

  const currentCode = code.find((c) => c.language === selectedLanguage);

  return (
    <motion.div
      className="backdrop-blur-sm border border-gray-700/30 p-4 md:p-6 bg-gradient-to-b from-[#1E293B] to-[#0F172A] shadow-2xl rounded-xl mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {/* Header */}
      <div className="mb-6 text-center">
        <motion.h1
          className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-3xl md:text-3xl font-bold mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {name} Theory
        </motion.h1>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          {definition}
        </p>
      </div>

      {/* Theory Section */}
      <div className="bg-[#1E293B]/80 rounded-xl p-4 mb-6 border border-gray-700/50">
        <h3 className="text-white text-lg font-medium mb-3 flex items-center">
          <FaBrain className="mr-2 text-purple-400" /> Detailed Explanation
        </h3>
        <div className="text-gray-300 text-sm whitespace-pre-line">
          {detailTheory}
        </div>
      </div>

      {/* Operations */}
      <div className="bg-[#1E293B]/80 rounded-xl p-4 mb-6 border border-gray-700/50">
        <h3 className="text-white text-lg font-medium mb-3 flex items-center">
          <FaChessQueen className="mr-2 text-purple-400" /> Core Operations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {operations.map((op, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/30"
              whileHover={{ y: -3 }}
            >
              <h4 className="text-purple-300 font-medium">{op.name}</h4>
              <p className="text-gray-300 text-sm">{op.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Code Examples */}
      <div className="bg-[#1E293B]/80 rounded-xl p-4 mb-6 border border-gray-700/50">
        <h3 className="text-white text-lg font-medium mb-3 flex items-center">
          <FaCode className="mr-2 text-purple-400" /> Implementation Examples
        </h3>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center">
            <label className="mr-2 text-slate-400 text-xs md:text-sm">
              Language:
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-slate-800 text-white border border-slate-700 rounded-md px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {code.map((c, i) => (
                <option key={i} value={c.language}>
                  {c.language}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setIsCodeExpanded(!isCodeExpanded)}
            className="text-xs bg-slate-800 hover:bg-slate-700 px-2 md:px-3 py-1 md:py-1.5 rounded-md border border-slate-700 transition-colors"
          >
            {isCodeExpanded ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>

      <div
        className={`bg-slate-900 overflow-x-auto rounded-lg border border-slate-700 overflow-hidden transition-all mb-7 ${
          isCodeExpanded ? "" : "max-h-96 overflow-y-auto"
        }}`}
      >
        {currentCode && (
          <pre className="bg-gray-900 text-purple-400 text-xs sm:text-sm p-4 mt-4 rounded-md overflow-x-auto ">
            <code>{currentCode?.code.trim()}</code>
          </pre>
        )}
        {!isCodeExpanded && (
          <div className="sticky bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-900 to-transparent flex items-end justify-center pb-2">
            <button
              onClick={() => setIsCodeExpanded(true)}
              className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-md border border-slate-700 transition-colors"
            >
              Show More
            </button>
          </div>
        )}
      </div>
      {/* Complexity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#1E293B]/80 rounded-xl p-4 border border-gray-700/50">
          <h3 className="text-white text-lg font-medium mb-3 flex items-center">
            <FaClock className="mr-2 text-purple-400" /> Time Complexity
          </h3>
          <ul className="text-gray-300 text-sm space-y-2">
            {Object.entries(timeComplexity).map(([key, value]) => (
              <li key={key}>
                <span className="text-purple-300">{key}:</span> {value}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#1E293B]/80 rounded-xl p-4 border border-gray-700/50">
          <h3 className="text-white text-lg font-medium mb-3 flex items-center">
            <FaLightbulb className="mr-2 text-purple-400" /> Space Complexity
          </h3>
          <ul className="text-gray-300 text-sm space-y-2">
            {Object.entries(spaceComplexity).map(([key, value]) => (
              <li key={key}>
                <span className="text-purple-300">{key}:</span> {value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Practical Applications */}
      <div className="bg-[#1E293B]/80 rounded-xl p-4 mb-6 border border-gray-700/50">
        <h3 className="text-white text-lg font-medium mb-3 flex items-center">
          <FaChessQueen className="mr-2 text-purple-400" /> Real-World
          Applications
        </h3>
        <ul className="text-gray-300 text-sm list-disc pl-5 space-y-1">
          {realWorldUsage.map((use, index) => (
            <li key={index}>{use}</li>
          ))}
        </ul>
      </div>

      {/* Interview Questions */}
      <div className="bg-[#1E293B]/80 rounded-xl p-4 mb-6 border border-gray-700/50">
        <h3 className="text-white text-lg font-medium mb-3 flex items-center">
          <FaQuestion className="mr-2 text-purple-400" /> Common Interview
          Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {commonInterviewQuestions.map((question, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 p-2 rounded-lg border border-gray-700/30 text-sm"
              whileHover={{ scale: 1.02 }}
            >
              {question}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Variations */}
      {variations && (
        <div className="bg-[#1E293B]/80 rounded-xl p-4 mb-6 border border-gray-700/50">
          <h3 className="text-white text-lg font-medium mb-3 flex items-center">
            <FaChessQueen className="mr-2 text-purple-400" /> Interesting
            Variations
          </h3>
          <div className="flex flex-wrap gap-2">
            {variations.map((variation, index) => (
              <motion.span
                key={index}
                className="bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full text-xs"
                whileHover={{ scale: 1.05 }}
              >
                {variation}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {/* Additional Info */}
      <div className="bg-[#1E293B]/80 rounded-xl p-4 border border-gray-700/50">
        <h3 className="text-white text-lg font-medium mb-3 flex items-center">
          <FaLightbulb className="mr-2 text-purple-400" /> Additional Notes
        </h3>
        <p className="text-gray-300 text-sm">{extra}</p>
      </div>
    </motion.div>
  );
}
