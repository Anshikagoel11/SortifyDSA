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
import NQueensTheory from "./N_queenTheory";



export default function NQueensSolver() {
  // State variables
  const [boardSize, setBoardSize] = useState(4);
  const [board, setBoard] = useState(createEmptyBoard(4));
  const [isSolving, setIsSolving] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [message, setMessage] = useState(
    'Select board size and click "Visualize" to start'
  );

  // Create empty board
  function createEmptyBoard(size) {
    return Array(size)
      .fill()
      .map(() => Array(size).fill(0));
  }

  // Initialize or reset the board
  function resetBoard() {
    setBoard(createEmptyBoard(boardSize));
    setSteps([]);
    setCurrentStep(0);
    setIsSolving(false);
    setIsPaused(false);
    setMessage('Board reset. Click "Visualize" to start');
  }

  // N-Queens helper function to check safety
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
      if (col >= boardSize) {
        newSteps.push({
          board: JSON.parse(JSON.stringify(tempBoard)),
          message: `Solution found for ${boardSize} queens!`,
          isSolution: true,
        });
        return true;
      }

      let foundSolution = false;

      for (let row = 0; row < boardSize; row++) {
        newSteps.push({
          board: JSON.parse(JSON.stringify(tempBoard)),
          message: `Trying row ${row} in column ${col}`,
          tryingPosition: { row, col },
        });

        if (isSafe(tempBoard, row, col)) {
          tempBoard[row][col] = 1;
          newSteps.push({
            board: JSON.parse(JSON.stringify(tempBoard)),
            message: `Placed queen at row ${row}, column ${col}`,
            placedQueen: { row, col },
          });

          if (backtrack(col + 1)) {
            foundSolution = true;
          }

          if (!foundSolution) {
            tempBoard[row][col] = 0;
            newSteps.push({
              board: JSON.parse(JSON.stringify(tempBoard)),
              message: `Backtracking: Removed queen from row ${row}, column ${col}`,
              removedQueen: { row, col },
            });
          }
        } else {
          newSteps.push({
            board: JSON.parse(JSON.stringify(tempBoard)),
            message: `Conflict at row ${row}, column ${col}`,
            conflictAt: { row, col },
          });
        }
      }

      return foundSolution;
    }

    backtrack(0);
    setSteps(newSteps);
    setCurrentStep(0);

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

  // Handle board size change
  useEffect(() => {
    resetBoard();
  }, [boardSize]);

  return (
    <div className="bg-gray-900 text-white p-3 sm:p-4 md:p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
       
        {/* Controls Section */}
        <div className="bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Board Size Control */}
            <div>
              <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-300">
                Board Size: {boardSize}x{boardSize}
              </label>
              <select
                value={boardSize}
                onChange={(e) => setBoardSize(parseInt(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded-md sm:rounded-lg p-2 text-xs sm:text-sm"
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
              <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-300">
                Animation Speed: {speed}ms
              </label>
              <input
                type="range"
                min="100"
                max="1000"
                value={1000 - speed}
                onChange={(e) => setSpeed(1000 - e.target.value)}
                className="w-full h-1.5 sm:h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                disabled={isSolving}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 justify-center md:justify-start">
            <button
              onClick={solveNQueens}
              disabled={isSolving}
              className={`
                px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm
                rounded-md sm:rounded-lg flex items-center gap-1 sm:gap-2 transition-all
                ${isSolving ? 'bg-gray-600' : 'bg-purple-600 hover:bg-purple-700'}
              `}
            >
              <FaPlay className="text-xs sm:text-sm" />
              <span>Visualize</span>
            </button>

            <button
              onClick={() => setIsPaused(!isPaused)}
              disabled={!isSolving}
              className={`
                px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm
                rounded-md sm:rounded-lg flex items-center gap-1 sm:gap-2 transition-all
                ${!isSolving
                  ? 'bg-gray-600'
                  : isPaused
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-yellow-600 hover:bg-yellow-700'
                }
              `}
            >
              {isPaused ? (
                <FaPlay className="text-xs sm:text-sm" />
              ) : (
                <FaPause className="text-xs sm:text-sm" />
              )}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>

           

            <button
              onClick={resetBoard}
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-red-600 hover:bg-red-700 rounded-md sm:rounded-lg flex items-center gap-1 sm:gap-2 transition-all"
            >
              <FaRedo className="text-xs sm:text-sm" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 shadow-lg border-l-2 sm:border-l-4 border-purple-500">
          <div className="flex items-start gap-2 sm:gap-3">
            <FaInfoCircle className="text-purple-400 flex-shrink-0 mt-0.5 text-sm sm:text-base" />
            <p className="text-xs sm:text-sm md:text-base leading-tight sm:leading-normal">
              {message}
            </p>
          </div>
          {steps.length > 0 && (
            <div className="mt-1 sm:mt-2 text-[0.6rem] xs:text-xs text-gray-400">
              Step {currentStep + 1} of {steps.length}
              {steps[currentStep]?.isSolution && ' (Solution found)'}
              {steps[currentStep]?.isNoSolution && ' (No solution exists)'}
            </div>
          )}
        </div>

        {/* Chess Board Container */}
        <div className="flex justify-center mb-6 sm:mb-8 overflow-auto">
          <div className="bg-gray-800 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-inner border border-gray-700">
            <div
              className="grid gap-0.5 sm:gap-1"
              style={{
                gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
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
                      className={`
                        w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                        flex items-center justify-center relative
                        ${(rowIndex + colIndex) % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}
                        ${isTrying ? 'ring-1 xs:ring-2 ring-yellow-400 z-10' : ''}
                        ${isConflict ? 'bg-red-900/70' : ''}
                        ${isPlaced ? 'bg-green-900/50' : ''}
                        ${isRemoved ? 'bg-red-900/50' : ''}
                      `}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {cell === 1 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                        >
                          <FaChessQueen className="text-pink-400 text-lg xs:text-xl sm:text-2xl" />
                        </motion.div>
                      )}
                      {boardSize <= 6 && (
                        <div className="absolute bottom-0 right-0 text-[0.5rem] xs:text-xs text-gray-400/50">
                          {rowIndex},{colIndex}
                        </div>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <NQueensTheory />
      </div>
    </div>
  );
}