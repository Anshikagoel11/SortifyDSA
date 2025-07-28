import { useState } from 'react';
import NQueensSolver from './n_queen';
import { SudokuSolver } from './sudokuSolver';


export default function Backtracking() {
  const [activeAlgorithm, setActiveAlgorithm] = useState('nqueens');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Backtracking Visualizer
        </h1>

        {/* Algorithm Selection */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setActiveAlgorithm('nqueens')}
            className={`px-4 py-2 rounded-lg mx-2 ${
              activeAlgorithm === 'nqueens' ? 'bg-purple-600' : 'bg-gray-700'
            }`}
          >
            N-Queens
          </button>
          <button
            onClick={() => setActiveAlgorithm('sudoku')}
            className={`px-4 py-2 rounded-lg mx-2 ${
              activeAlgorithm === 'sudoku' ? 'bg-purple-600' : 'bg-gray-700'
            }`}
          >
            Sudoku
          </button>
        </div>

        {/* Render the active component */}
        {activeAlgorithm === 'nqueens' ? <NQueensSolver /> : <SudokuSolver />}
      </div>
    </div>
  );
}