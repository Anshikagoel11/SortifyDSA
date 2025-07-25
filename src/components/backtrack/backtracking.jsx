import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaChessQueen,
  FaPlay,
  FaPause,
  FaStepForward,
  FaRedo,
  FaInfoCircle,
} from "react-icons/fa";
import NQueensTheory from "./backtrackTheory";



export default function Backtracking() {
  // State variables
  const [activeAlgorithm, setActiveAlgorithm] = useState("nqueens");
  const [boardSize, setBoardSize] = useState(4);
  const [board, setBoard] = useState(createEmptyBoard(4));
  const [isSolving, setIsSolving] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [message, setMessage] = useState(
    'Select N-Queens and click "Visualize" to start'
  );

  // Create empty board
  function createEmptyBoard(size) {
    return Array(size)
      .fill()
      .map(() => Array(size).fill(0));
  }

  // Initialize or reset the board
  function resetBoard() {
    const newBoard = createEmptyBoard(boardSize);
    setBoard(newBoard);
    setSteps([]);
    setCurrentStep(0);
    setIsSolving(false);
    setIsPaused(false);
    setMessage('Board reset. Click "Visualize" to start');
  }

  // Check if a queen can be placed at given position
  function isSafe(board, row, col) {
    // Check left side of this row
    for (let i = 0; i < col; i++) {
      if (board[row][i] === 1) return false;
    }

    // Check upper diagonal on left side
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) return false;
    }

    // Check lower diagonal on left side
    for (let i = row, j = col; i < boardSize && j >= 0; i++, j--) {
      if (board[i][j] === 1) return false;
    }

    return true;
  }

  // Solve N-Queens using backtracking and record all steps
  function solveNQueens() {
    setIsSolving(true);
    setIsPaused(false);
    setMessage("Solving step by step...");

    const newSteps = [];
    const tempBoard = createEmptyBoard(boardSize);

    function backtrack(col) {
      // Base case: all queens placed
      if (col >= boardSize) {
        newSteps.push({
          board: JSON.parse(JSON.stringify(tempBoard)),
          message: `Solution found for ${boardSize} queens!`,
          isSolution: true,
        });
        return true;
      }

      let foundSolution = false;

      // Try all rows in current column
      for (let row = 0; row < boardSize; row++) {
        // Record the attempt
        newSteps.push({
          board: JSON.parse(JSON.stringify(tempBoard)),
          message: `Trying row ${row} in column ${col}`,
          tryingPosition: { row, col },
        });

        if (isSafe(tempBoard, row, col)) {
          // Place queen
          tempBoard[row][col] = 1;
          newSteps.push({
            board: JSON.parse(JSON.stringify(tempBoard)),
            message: `Placed queen at row ${row}, column ${col}`,
            placedQueen: { row, col },
          });

          // Recurse to next column
          if (backtrack(col + 1)) {
            foundSolution = true;
          }

          // Backtrack (remove queen) if no solution found
          if (!foundSolution) {
            tempBoard[row][col] = 0;
            newSteps.push({
              board: JSON.parse(JSON.stringify(tempBoard)),
              message: `Backtracking: Removed queen from row ${row}, column ${col}`,
              removedQueen: { row, col },
            });
          }
        } else {
          // Record conflict
          newSteps.push({
            board: JSON.parse(JSON.stringify(tempBoard)),
            message: `Conflict at row ${row}, column ${col}`,
            conflictAt: { row, col },
          });
        }
      }

      return foundSolution;
    }

    // Start the backtracking
    backtrack(0);
    setSteps(newSteps);
    setCurrentStep(0);

    // If no solution found
    if (newSteps.length > 0 && !newSteps.some((step) => step.isSolution)) {
      newSteps.push({
        board: JSON.parse(JSON.stringify(tempBoard)),
        message: `No solution exists for ${boardSize} queens`,
        isNoSolution: true,
      });
    }
  }

  // Visualize the solution step by step
  useEffect(() => {
    if (!isSolving || steps.length === 0) return;

    const timer = setInterval(() => {
      if (isPaused) return;

      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
        setBoard(steps[currentStep + 1].board);
        setMessage(steps[currentStep + 1].message);
      } else {
        clearInterval(timer);
        setIsSolving(false);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [isSolving, isPaused, currentStep, steps, speed]);

  // Handle next step manually
  function handleNextStep() {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setBoard(steps[currentStep + 1].board);
      setMessage(steps[currentStep + 1].message);
    } else {
      setIsSolving(false);
    }
  }

  // Handle board size change
  useEffect(() => {
    resetBoard();
  }, [boardSize]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Backtracking Visualizer
        </h1>

        {/* Algorithm Selection */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setActiveAlgorithm("nqueens")}
            className={`px-4 py-2 rounded-lg mx-2 ${
              activeAlgorithm === "nqueens" ? "bg-purple-600" : "bg-gray-700"
            }`}
          >
            N-Queens
          </button>
        </div>

        {/* Controls Section */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Board Size Control */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Board Size:
              </label>
              <select
                value={boardSize}
                onChange={(e) => setBoardSize(parseInt(e.target.value))}
                className="bg-gray-700 border border-gray-600 rounded-lg p-2 w-full"
                disabled={isSolving}
              >
                {[4, 5, 6, 7, 8].map((size) => (
                  <option key={size} value={size}>
                    {size}x{size}
                  </option>
                ))}
              </select>
            </div>

            {/* Speed Control */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Speed: {speed}ms
              </label>
              <input
                type="range"
                min="100"
                max="1000"
                value={1000 - speed}
                onChange={(e) => setSpeed(1000 - e.target.value)}
                className="w-full"
                disabled={isSolving}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={solveNQueens}
              disabled={isSolving}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                isSolving ? "bg-gray-600" : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              <FaPlay /> Visualize
            </button>

            <button
              onClick={() => setIsPaused(!isPaused)}
              disabled={!isSolving}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                !isSolving
                  ? "bg-gray-600"
                  : isPaused
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-yellow-600 hover:bg-yellow-700"
              }`}
            >
              {isPaused ? <FaPlay /> : <FaPause />}{" "}
              {isPaused ? "Resume" : "Pause"}
            </button>

            <button
              onClick={handleNextStep}
              disabled={
                !isSolving || isPaused || currentStep >= steps.length - 1
              }
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                !isSolving || isPaused || currentStep >= steps.length - 1
                  ? "bg-gray-600"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              <FaStepForward /> Next Step
            </button>

            <button
              onClick={resetBoard}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-2"
            >
              <FaRedo /> Reset
            </button>
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <FaInfoCircle className="text-blue-400" />
            <p>{message}</p>
          </div>
          {steps.length > 0 && (
            <div className="mt-2 text-sm text-gray-400">
              Step {currentStep + 1} of {steps.length}
              {steps[currentStep]?.isSolution && " (Solution found)"}
              {steps[currentStep]?.isNoSolution && " (No solution exists)"}
            </div>
          )}
        </div>

        {/* Chess Board - Fixed Size Container */}
        <div className="flex justify-center mb-8 overflow-auto">
          <div
            className="grid gap-1 border-2 border-gray-700 p-2 rounded-lg bg-gray-800"
            style={{
              gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
              width: "fit-content",
            }}
          >
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const currentStepData = steps[currentStep];
                const isTrying =
                  currentStepData?.tryingPosition?.row === rowIndex &&
                  currentStepData?.tryingPosition?.col === colIndex;
                const isConflict =
                  currentStepData?.conflictAt?.row === rowIndex &&
                  currentStepData?.conflictAt?.col === colIndex;
                const isPlaced =
                  currentStepData?.placedQueen?.row === rowIndex &&
                  currentStepData?.placedQueen?.col === colIndex;
                const isRemoved =
                  currentStepData?.removedQueen?.row === rowIndex &&
                  currentStepData?.removedQueen?.col === colIndex;

                return (
                  <motion.div
                    key={`${rowIndex}-${colIndex}`}
                    className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border relative
                      ${
                        (rowIndex + colIndex) % 2 === 0
                          ? "bg-gray-700"
                          : "bg-gray-600"
                      }
                      ${isTrying ? "ring-2 ring-yellow-400" : ""}
                      ${isConflict ? "bg-red-900/70" : ""}
                      ${isPlaced ? "bg-green-900/50" : ""}
                      ${isRemoved ? "bg-red-900/50" : ""}`}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {cell === 1 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <FaChessQueen className="text-pink-400 text-xl sm:text-2xl" />
                      </motion.div>
                    )}
                    {/* Position indicator for small boards */}
                    {boardSize <= 6 && (
                      <div className="absolute bottom-0 right-0 text-xs text-gray-400">
                        {rowIndex},{colIndex}
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        <NQueensTheory/>
      </div>
    </div>
  );
}
