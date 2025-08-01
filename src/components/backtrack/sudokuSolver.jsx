import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaStepForward, FaRedo, FaInfoCircle } from 'react-icons/fa';
import SudokuSolverTheory from './sudokuSolverTheory';

export function SudokuSolver() {
  // Sudoku state
  const [board, setBoard] = useState(getExampleSudoku());
  const [isSolving, setIsSolving] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [message, setMessage] = useState('Click "Visualize" to start solving');

  // Initialize example board
  function getExampleSudoku() {
    return [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
  }

  // Efficient board cloning
  function cloneBoard(board) {
    return board.map(row => [...row]);
  }

  // Initialize data structures for constraint propagation
  function initializeConstraints(board) {
    const rows = Array(9).fill().map(() => new Set());
    const cols = Array(9).fill().map(() => new Set());
    const boxes = Array(9).fill().map(() => new Set());
    const emptyCells = [];
    
    // Initialize constraints from current board
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const val = board[row][col];
        if (val !== 0) {
          rows[row].add(val);
          cols[col].add(val);
          boxes[Math.floor(row / 3) * 3 + Math.floor(col / 3)].add(val);
        } else {
          emptyCells.push({ row, col });
        }
      }
    }
    
    return { rows, cols, boxes, emptyCells };
  }

  // Get possible numbers for a cell using constraint sets
  function getPossibleNumbers(row, col, rows, cols, boxes) {
    const used = new Set([
      ...rows[row],
      ...cols[col],
      ...boxes[Math.floor(row / 3) * 3 + Math.floor(col / 3)]
    ]);
    
    const possible = [];
    for (let num = 1; num <= 9; num++) {
      if (!used.has(num)) possible.push(num);
    }
    return possible;
  }

  // Solve Sudoku with optimized backtracking and constraint propagation
  function solveSudoku() {
    setIsSolving(true);
    setIsPaused(false);
    setMessage('Solving step by step...');

    const newSteps = [];
    const tempBoard = cloneBoard(board);
    const constraints = initializeConstraints(tempBoard);
    let { rows, cols, boxes, emptyCells } = constraints;

    function backtrack(index) {
      if (index >= emptyCells.length) return true;
      
      const { row, col } = emptyCells[index];
      const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
      const possible = getPossibleNumbers(row, col, rows, cols, boxes);
      
      // Try numbers in order of least constraining value
      for (const num of possible) {
        // Record trying step
        newSteps.push({
          board: cloneBoard(tempBoard),
          message: `Trying ${num} at row ${row}, col ${col}`,
          tryingPosition: { row, col, num },
        });

        // Update board and constraints
        tempBoard[row][col] = num;
        rows[row].add(num);
        cols[col].add(num);
        boxes[boxIndex].add(num);
        
        // Record placement step
        newSteps.push({
          board: cloneBoard(tempBoard),
          message: `Placed ${num} at row ${row}, col ${col}`,
          placedNumber: { row, col, num },
        });

        if (backtrack(index + 1)) {
          return true;
        }

        // Backtrack
        tempBoard[row][col] = 0;
        rows[row].delete(num);
        cols[col].delete(num);
        boxes[boxIndex].delete(num);
        
        // Record backtracking step
        newSteps.push({
          board: cloneBoard(tempBoard),
          message: `Backtracking: Removed ${num} from row ${row}, col ${col}`,
          removedNumber: { row, col, num },
        });
      }
      return false;
    }

    // Sort empty cells by fewest possibilities first (MRV heuristic)
    emptyCells.sort((a, b) => {
      const aPossible = getPossibleNumbers(a.row, a.col, rows, cols, boxes);
      const bPossible = getPossibleNumbers(b.row, b.col, rows, cols, boxes);
      return aPossible.length - bPossible.length;
    });

    const hasSolution = backtrack(0);
    setSteps(newSteps);
    setCurrentStep(0);

    // Add final result step
    const lastStep = newSteps[newSteps.length - 1] || { board: tempBoard };
    newSteps.push({
      board: cloneBoard(lastStep.board),
      message: hasSolution 
        ? 'Sudoku solved successfully!' 
        : 'No solution exists for this Sudoku puzzle',
      isSolution: hasSolution,
      isNoSolution: !hasSolution
    });
  
  }

  useEffect(() => {
    if (!isSolving || steps.length === 0) return;

    const timer = setInterval(() => {
      if (isPaused) return;

      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
        setBoard(steps[currentStep + 1].board);
        setMessage(steps[currentStep + 1].message);
      } else {
        clearInterval(timer);
        setIsSolving(false);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [isSolving, isPaused, currentStep, steps, speed]);

 

  // Reset board (same as before)
  function resetBoard() {
    setBoard(getExampleSudoku());
    setSteps([]);
    setCurrentStep(0);
    setIsSolving(false);
    setIsPaused(false);
    setMessage('Board reset. Click "Visualize" to start');
  }

  // Render board (same as before)
  function renderBoard() {
    return (
      <div className="relative">
        {/* Main grid lines for 3x3 blocks */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Vertical lines */}
          <div className="absolute left-1/3 w-0.5 h-full bg-blue-400 opacity-30"></div>
          <div className="absolute left-2/3 w-0.5 h-full bg-blue-400 opacity-30"></div>
          {/* Horizontal lines */}
          <div className="absolute top-1/3 w-full h-0.5 bg-blue-400 opacity-30"></div>
          <div className="absolute top-2/3 w-full h-0.5 bg-blue-400 opacity-30"></div>
        </div>

        {/* Sudoku cells */}
        <div className="grid grid-cols-9 gap-0.5">
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
                currentStepData?.placedNumber?.row === rowIndex &&
                currentStepData?.placedNumber?.col === colIndex;
              const isRemoved =
                currentStepData?.removedNumber?.row === rowIndex &&
                currentStepData?.removedNumber?.col === colIndex;
              const isInitial = getExampleSudoku()[rowIndex][colIndex] !== 0;

              // Calculate subgrid position for alternating colors
              const subgridRow = Math.floor(rowIndex / 3);
              const subgridCol = Math.floor(colIndex / 3);
              const isAlternateSubgrid = (subgridRow + subgridCol) % 2 === 0;

              return (
                <motion.div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
                    flex items-center justify-center relative
                    ${isAlternateSubgrid ? 'bg-gray-700' : 'bg-gray-600'}
                    ${isInitial ? 'text-white' : 'text-blue-300'}
                    ${isTrying ? 'ring-1 xs:ring-2 ring-yellow-400 z-10' : ''}
                    ${isConflict ? 'bg-red-900/70' : ''}
                    ${isPlaced ? 'bg-green-900/50' : ''}
                    ${isRemoved ? 'bg-red-900/50' : ''}
                  `}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {cell !== 0 && (
                    <motion.span
                      className={`
                        text-xs xs:text-sm sm:text-base
                        ${isInitial ? 'font-bold' : 'font-medium'}
                        ${isPlaced ? 'text-green-300' : ''}
                        ${isRemoved ? 'text-red-300' : ''}
                      `}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      {cell}
                    </motion.span>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  // Return JSX (same as before)
  return (
    <div className="bg-gray-900 text-white p-3 sm:p-4 md:p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
       

        {/* Controls Section */}
        <div className="bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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

            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-end">
              <button
                onClick={solveSudoku}
                disabled={isSolving}
                className={`
                  px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm
                  rounded-md sm:rounded-lg flex items-center gap-1 sm:gap-2 transition-all
                  ${isSolving ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}
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
        </div>

        {/* Status Message */}
        <div className="bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 shadow-lg border-l-2 sm:border-l-4 border-blue-500">
          <div className="flex items-start gap-2 sm:gap-3">
            <FaInfoCircle className="text-blue-400 flex-shrink-0 mt-0.5 text-sm sm:text-base" />
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

        {/* Sudoku Board Container */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="bg-gray-800 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-inner border border-gray-700 max-w-full overflow-auto">
            {renderBoard()}
          </div>
        </div>

        <SudokuSolverTheory />
      </div>
    </div>
  );
}