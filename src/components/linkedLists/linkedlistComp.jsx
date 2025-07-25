import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaMinus,
  FaSearch,
  FaArrowRight,
  FaInfoCircle,
  FaRandom,
  FaTrash,
} from "react-icons/fa";
import { UseAlgoControl } from "../../context/algoControlContext";
import useLinkedListUtils from "../../utils/linkedListFunctions";
import { useEffect, useState } from "react";
import LinkedListTheory from "./linkedListTheory";

export default function LinkedList() {
  const {
    list,
    showTooltip,
    setValueAtStart,
    valueAtStart,
    highlightNode,
    valueAtEnd,
    setValueAtEnd,
    index,
    setIndex,
    valueAtPosition,
    setValueAtPosition,
    valueToDelete,
    setValueToDelete,
    highlightColor,
    searchValue,
    setSearchValue,
    foundStatus,
    inValidIndex,
    valueDelete,
    currentIndex,
  } = UseAlgoControl();

  const {
    handelAtStart,
    handelAtEnd,
    handelAtPosition,
    handelDeleteValue,
    handelDeleteAt,
    handleSearch,
    handelTraverse,
    generateRandomList,
    clearList,
  } = useLinkedListUtils();



  return (
    <motion.div
      className="backdrop-blur-sm border border-gray-700/30 p-3 sm:p-4 md:p-6 bg-gradient-to-b from-[#1E293B] to-[#0F172A] shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {/* Header with animated gradient */}
      <div className="mb-4 sm:mb-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 text-2xl sm:text-3xl md:text-4xl font-bold mt-2 sm:mt-3 mb-2 sm:mb-3">
            Linked List Visualizer
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
            Visualize how linked lists work with interactive operations. Each
            node contains data and a pointer to the next node.
          </p>
        </motion.div>
      </div>

      {/* Control buttons */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => generateRandomList()}
          className="px-3 sm:px-4 py-1 sm:py-2 bg-purple-600/80 hover:bg-purple-600 text-white rounded-lg flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium"
        >
          <FaRandom className="text-xs sm:text-sm" />
          <span className="hidden xs:inline">Random List</span>
          <span className="xs:hidden">Random</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => clearList()}
          className="px-3 sm:px-4 py-1 sm:py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium"
        >
          <FaTrash className="text-xs sm:text-sm" />
          <span>Clear</span>
        </motion.button>
      </div>

      {/* Linked List Visualization with enhanced animation */}
      <div className="bg-[#0F172A] rounded-xl p-3 sm:p-4 md:p-6 mb-6 sm:mb-8 border border-gray-700/50 shadow-lg relative">
        {/* Animated background elements */}
        {inValidIndex && (
          <div className="text-red-600 text-xs sm:text-sm text-center p-1 sm:p-2 font-bold">
            Invalid Index
          </div>
        )}
        {valueDelete && (
          <div className="text-red-600 text-xs sm:text-sm text-center p-1 sm:p-2 font-bold">
            Value Not Found In LinkedList
          </div>
        )}

        {foundStatus === "not_found" && (
          <motion.div
            className="text-red-600 text-xs sm:text-sm text-center p-1 sm:p-2 font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            ❌ Element Not Found!
          </motion.div>
        )}

        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full filter blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/10 rounded-full filter blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10 ">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
            {list.length === 0 ? (
              <motion.div
                className="text-gray-400 italic py-4 sm:py-6 md:py-8 text-sm sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                The list is empty. Add some nodes to get started!
              </motion.div>
            ) : (
              list.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center "
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="flex flex-col items-center">
                    {currentIndex === i && foundStatus === "found" && (
                      <motion.div
                        className="text-green-600 text-xs sm:text-sm text-center p-1 sm:p-2 font-bold"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        ✅ Found!
                      </motion.div>
                    )}
                    {/* Node index */}
                    <span className="text-[10px] xs:text-xs text-gray-400 mb-1">
                      {i}
                    </span>
                    {/* Node */}
                    <div
                      className={`${
                        i === highlightNode
                          ? highlightColor
                          : "bg-gradient-to-br from-blue-500 to-blue-600"
                      } text-white rounded-lg px-2 sm:px-3 md:px-4 py-2 sm:py-3 flex items-center shadow-lg relative min-w-[40px] sm:min-w-[50px] md:min-w-[60px] justify-center`}
                    >
                      <div className="p-1 text-center font-bold text-sm sm:text-base">
                        {item}
                      </div>
                      {i !== list.length - 1 && (
                        <motion.div
                          className="ml-1 sm:ml-2 text-lg sm:text-xl text-gray-300"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          →
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
            {list.length > 0 && (
              <motion.div
                className="bg-gray-700/50 text-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 font-mono shadow-inner text-sm sm:text-base my-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: list.length * 0.1 }}
              >
                NULL
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-[#1E293B]/80 rounded-lg p-2 sm:p-3 mb-4 sm:mb-6 border border-gray-700/50 flex flex-wrap justify-between items-center text-xs sm:text-sm">
        <div className="text-gray-300 flex items-center">
          <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-1 sm:mr-2"></span>
          Nodes: <span className="font-bold ml-1">{list.length}</span>
        </div>
      </div>

      {/* Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* Insert Operations */}
        <motion.div
          className="bg-[#1E293B]/80 rounded-xl p-3 sm:p-4 border border-gray-700/50 shadow-lg relative overflow-hidden"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full filter blur-xl"></div>
          <h3 className="text-white text-base sm:text-lg font-medium mb-2 sm:mb-3 flex items-center">
            <FaPlus className="mr-1 sm:mr-2 text-green-400 text-sm sm:text-base" />
            <span className="whitespace-nowrap">Insert Operations</span>
            <button
              onClick={() => showExplanation("insertStart")}
              className="ml-auto text-gray-400 hover:text-white text-sm sm:text-base"
            >
              <FaInfoCircle />
            </button>
          </h3>
          <div className="space-y-2 sm:space-y-3 relative z-10">
            <div className="relative">
              <div className="flex gap-1 sm:gap-2">
                <input
                  type="text"
                  placeholder="Value"
                  value={valueAtStart}
                  className="flex-1 bg-gray-800/70 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-xs sm:text-sm placeholder-gray-400"
                  onChange={(e) => setValueAtStart(e.target.value.trim())}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg text-xs sm:text-sm font-medium shadow-md flex items-center gap-1 sm:gap-2"
                  onClick={() => handelAtStart({ position: "start" })}
                >
                  <FaPlus size={10} className="flex-shrink-0" />
                  <span className="whitespace-nowrap">At Start</span>
                </motion.button>
              </div>
              <AnimatePresence>
                {showTooltip === "start" && (
                  <motion.div
                    className="absolute top-full left-0 mt-1 bg-red-500 text-white text-[10px] xs:text-xs p-1 sm:p-2 rounded-lg shadow-lg z-20"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Please enter a value
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <div className="flex gap-1 sm:gap-2">
                <input
                  type="text"
                  value={valueAtEnd}
                  onChange={(e) => setValueAtEnd(e.target.value.trim())}
                  placeholder="Value"
                  className="flex-1 bg-gray-800/70 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-xs sm:text-sm placeholder-gray-400"
                />
                <motion.button
                  onClick={() => handelAtEnd({ position: "end" })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg text-xs sm:text-sm font-medium shadow-md flex items-center gap-1 sm:gap-2"
                >
                  <FaPlus size={10} className="flex-shrink-0" />
                  <span className="whitespace-nowrap">At End</span>
                </motion.button>
              </div>
              <AnimatePresence>
                {showTooltip === "end" && (
                  <motion.div
                    className="absolute top-full left-0 mt-1 bg-red-500 text-white text-[10px] xs:text-xs p-1 sm:p-2 rounded-lg shadow-lg z-20"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Please enter a value
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <div className="grid grid-cols-3 gap-1 sm:gap-2">
                <input
                  value={index}
                  onChange={(e) => setIndex(e.target.value)}
                  type="text"
                  placeholder="Index"
                  className="bg-gray-800/70 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-xs sm:text-sm placeholder-gray-400"
                />
                <input
                  type="text"
                  value={valueAtPosition}
                  onChange={(e) => setValueAtPosition(e.target.value)}
                  placeholder="Value"
                  className="col-span-2 bg-gray-800/70 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-xs sm:text-sm placeholder-gray-400"
                />
                <motion.button
                  onClick={() => handelAtPosition({ position: "position" })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="col-span-3 px-2 sm:px-3 md:px-4 py-1 sm:py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg text-xs sm:text-sm font-medium shadow-md flex items-center justify-center gap-1 sm:gap-2"
                >
                  <FaPlus size={10} className="flex-shrink-0" />
                  <span className="whitespace-nowrap">At Position</span>
                </motion.button>
              </div>
              <AnimatePresence>
                {showTooltip === "position" && (
                  <motion.div
                    className="absolute top-full left-0 mt-1 bg-red-500 text-white text-[10px] xs:text-xs p-1 sm:p-2 rounded-lg shadow-lg z-20"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Please enter valid details
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

      
        </motion.div>

        {/* Delete/Search Operations */}
        <motion.div
          className="bg-[#1E293B]/80 rounded-xl p-3 sm:p-4 border border-gray-700/50 shadow-lg relative overflow-hidden"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-red-500/10 rounded-full filter blur-xl"></div>
          <h3 className="text-white text-base sm:text-lg font-medium mb-2 sm:mb-3 flex items-center">
            <FaMinus className="mr-1 sm:mr-2 text-red-400 text-sm sm:text-base" />
            <span className="whitespace-nowrap">Delete/Search</span>
            <button
              onClick={() => showExplanation("deleteValue")}
              className="ml-auto text-gray-400 hover:text-white text-sm sm:text-base"
            >
              <FaInfoCircle />
            </button>
          </h3>
          <div className="space-y-2 sm:space-y-3 relative z-10">
            <div className="relative">
              <div className="flex gap-1 sm:gap-2">
                <input
                  type="text"
                  value={valueToDelete}
                  onChange={(e) => setValueToDelete(e.target.value)}
                  placeholder="Value"
                  className="flex-1 bg-gray-800/70 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-xs sm:text-sm placeholder-gray-400"
                />
                <motion.button
                  onClick={() => handelDeleteValue({ position: "deleteValue" })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg text-xs sm:text-sm font-medium shadow-md flex items-center gap-1 sm:gap-2"
                >
                  <FaMinus size={10} className="flex-shrink-0" />
                  <span className="whitespace-nowrap">Delete Value</span>
                </motion.button>
              </div>
              <AnimatePresence>
                {showTooltip === "deleteValue" && (
                  <motion.div
                    className="absolute top-full left-0 mt-1 bg-red-500 text-white text-[10px] xs:text-xs p-1 sm:p-2 rounded-lg shadow-lg z-20"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Please enter a valid value
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <div className="flex gap-1 sm:gap-2">
                <input
                  value={index}
                  onChange={(e) => setIndex(e.target.value)}
                  type="text"
                  placeholder="Index"
                  className="flex-1 bg-gray-800/70 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-xs sm:text-sm placeholder-gray-400"
                />
                <motion.button
                  onClick={() => handelDeleteAt({ position: "deleteAt" })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg text-xs sm:text-sm font-medium shadow-md flex items-center gap-1 sm:gap-2"
                >
                  <FaMinus size={10} className="flex-shrink-0" />
                  <span className="whitespace-nowrap">Delete At</span>
                </motion.button>
              </div>
              <AnimatePresence>
                {showTooltip === "deleteAt" && (
                  <motion.div
                    className="absolute top-full left-0 mt-1 bg-red-500 text-white text-[10px] xs:text-xs p-1 sm:p-2 rounded-lg shadow-lg z-20"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Please enter a valid input
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <div className="flex gap-1 sm:gap-2">
                <input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  type="text"
                  placeholder="Search Value"
                  className="flex-1 bg-gray-800/70 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-xs sm:text-sm placeholder-gray-400"
                />
                <motion.button
                  onClick={() => handleSearch({ position: "search" })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-xs sm:text-sm font-medium shadow-md flex items-center justify-center gap-1 sm:gap-2"
                >
                  <FaSearch size={10} className="flex-shrink-0" />
                  <span className="whitespace-nowrap">Search</span>
                </motion.button>
              </div>
              <AnimatePresence>
                {showTooltip === "search" && (
                  <motion.div
                    className="absolute top-full left-0 mt-1 bg-red-500 text-white text-[10px] xs:text-xs p-1 sm:p-2 rounded-lg shadow-lg z-20"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Please enter value to search
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Traverse Button with enhanced animation */}
      <div className="flex justify-center">
        <motion.button
          onClick={() => {
            handelTraverse();
            showExplanation("traverse");
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 sm:px-5 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white rounded-xl flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm md:text-base font-medium shadow-lg relative overflow-hidden"
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-300"
            animate={{ x: [-100, 100] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="relative z-10 flex items-center gap-1 sm:gap-2">
            <FaArrowRight className="text-xs sm:text-sm" />
            <span>Traverse List</span>
          </span>
        </motion.button>
      </div>

      
      <LinkedListTheory />
    </motion.div>
  );
}
