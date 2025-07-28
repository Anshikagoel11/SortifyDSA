const sudokuData = {
  sudoku: {
    name: "Sudoku Solver",
    definition:
      "A backtracking algorithm that solves Sudoku puzzles by systematically trying possible numbers in empty cells and backtracking when constraints are violated.",
    detailTheory:
      "Sudoku is a logic-based number placement puzzle with the following rules:\n\n1. Each row must contain all digits from 1-9 without repetition\n2. Each column must contain all digits from 1-9 without repetition\n3. Each of the 9 3x3 subgrids must contain all digits from 1-9 without repetition\n\nKey Concepts:\n1. Backtracking: Try numbers in empty cells and undo (backtrack) when no valid number exists\n2. Constraint Propagation: Eliminate invalid candidates based on row, column and box constraints\n3. Search Space Reduction: Heuristics like 'most constrained variable' can optimize the solution",

    operations: [
      {
        name: "Find Empty Cell",
        description: "Locate the next empty cell (typically processed row-wise)"
      },
      {
        name: "Check Validity",
        description: "Verify if a number can be placed without violating Sudoku rules"
      },
      {
        name: "Place Number",
        description: "Temporarily place a valid number in the empty cell"
      },
      {
        name: "Backtrack",
        description: "Remove the number when no valid placements exist for subsequent cells"
      },
      {
        name: "Solution Found",
        description: "When all cells are filled without violating constraints"
      }
    ],

    code: [
      {
        language: "C",
        code: `#include <stdbool.h>
#define N 9

bool isSafe(int grid[N][N], int row, int col, int num) {
  // Check row
  for (int x = 0; x < N; x++)
    if (grid[row][x] == num) return false;
  
  // Check column
  for (int x = 0; x < N; x++)
    if (grid[x][col] == num) return false;
  
  // Check 3x3 box
  int boxStartRow = row - row % 3;
  int boxStartCol = col - col % 3;
  for (int i = 0; i < 3; i++)
    for (int j = 0; j < 3; j++)
      if (grid[i + boxStartRow][j + boxStartCol] == num)
        return false;
  
  return true;
}

bool solveSudoku(int grid[N][N]) {
  int row, col;
  
  // Find empty cell
  bool isEmpty = false;
  for (row = 0; row < N; row++) {
    for (col = 0; col < N; col++) {
      if (grid[row][col] == 0) {
        isEmpty = true;
        break;
      }
    }
    if (isEmpty) break;
  }
  
  // No empty cells left
  if (!isEmpty) return true;
  
  // Try digits 1-9
  for (int num = 1; num <= 9; num++) {
    if (isSafe(grid, row, col, num)) {
      grid[row][col] = num;
      if (solveSudoku(grid)) return true;
      grid[row][col] = 0; // Backtrack
    }
  }
  return false;
}`
      },
      {
        language: "Python",
        code: `def solve_sudoku(grid):
    def find_empty():
        for i in range(9):
            for j in range(9):
                if grid[i][j] == 0:
                    return (i, j)
        return None
    
    def is_valid(num, pos):
        # Check row
        for i in range(9):
            if grid[pos[0]][i] == num and pos[1] != i:
                return False
        
        # Check column
        for i in range(9):
            if grid[i][pos[1]] == num and pos[0] != i:
                return False
        
        # Check 3x3 box
        box_x = pos[1] // 3
        box_y = pos[0] // 3
        for i in range(box_y*3, box_y*3 + 3):
            for j in range(box_x*3, box_x*3 + 3):
                if grid[i][j] == num and (i,j) != pos:
                    return False
        return True
    
    empty = find_empty()
    if not empty:
        return True
    
    row, col = empty
    for num in range(1, 10):
        if is_valid(num, (row, col)):
            grid[row][col] = num
            if solve_sudoku(grid):
                return True
            grid[row][col] = 0
    return False`
      },
      {
        language: "JavaScript",
        code: `function solveSudoku(grid) {
  function findEmpty() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === 0) return [i, j];
      }
    }
    return null;
  }

  function isValid(num, [row, col]) {
    // Check row
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num && col !== i) return false;
    }
    
    // Check column
    for (let i = 0; i < 9; i++) {
      if (grid[i][col] === num && row !== i) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (grid[i][j] === num && i !== row && j !== col) return false;
      }
    }
    return true;
  }

  const emptyPos = findEmpty();
  if (!emptyPos) return true;

  const [row, col] = emptyPos;
  for (let num = 1; num <= 9; num++) {
    if (isValid(num, [row, col])) {
      grid[row][col] = num;
      if (solveSudoku(grid)) return true;
      grid[row][col] = 0;
    }
  }
  return false;
}`
      },
      {
        language: "Java",
        code: `public class SudokuSolver {
  private static final int SIZE = 9;
  
  private static boolean isSafe(int[][] grid, int row, int col, int num) {
    // Check row
    for (int x = 0; x < SIZE; x++)
      if (grid[row][x] == num) return false;
    
    // Check column
    for (int x = 0; x < SIZE; x++)
      if (grid[x][col] == num) return false;
    
    // Check 3x3 box
    int boxStartRow = row - row % 3;
    int boxStartCol = col - col % 3;
    for (int i = 0; i < 3; i++)
      for (int j = 0; j < 3; j++)
        if (grid[i + boxStartRow][j + boxStartCol] == num)
          return false;
    
    return true;
  }
  
  public static boolean solve(int[][] grid) {
    for (int row = 0; row < SIZE; row++) {
      for (int col = 0; col < SIZE; col++) {
        if (grid[row][col] == 0) {
          for (int num = 1; num <= SIZE; num++) {
            if (isSafe(grid, row, col, num)) {
              grid[row][col] = num;
              if (solve(grid)) return true;
              grid[row][col] = 0; // Backtrack
            }
          }
          return false;
        }
      }
    }
    return true;
  }
}`
      }
    ],

    timeComplexity: {
      bruteForce: "O(9^(n*n)) - Worst case for empty grid",
      backtracking: "O(9^n) - Where n is number of empty cells (significantly better than brute force)",
      optimized: "O(n^3) - Using exact cover/Dancing Links algorithm"
    },

    spaceComplexity: {
      basic: "O(n²) - For storing the board",
      optimized: "O(1) - If solving in-place without additional data structures"
    },

    realWorldUsage: [
      "Puzzle solving applications",
      "Constraint satisfaction problems",
      "Algorithm design education",
      "AI and machine learning (constraint learning)",
      "Scheduling and timetabling problems"
    ],

    commonInterviewQuestions: [
      "Count all possible solutions for a given puzzle",
      "Generate valid Sudoku puzzles",
      "Implement a Sudoku validator",
      "Solve with minimal space complexity",
      "Optimize using human-like solving strategies",
      "Parallelize the solution"
    ],

    variations: [
      "Diagonal Sudoku (additional diagonal constraints)",
      "Hyper Sudoku (additional 3x3 regions)",
      "Samurai Sudoku (overlapping grids)",
      "Killer Sudoku (cage-based sums)",
      "Word Sudoku (using letters instead of numbers)"
    ],

    extra:
      "Sudoku solving demonstrates classic backtracking techniques. While brute-force approaches would be impractical, backtracking efficiently prunes the search space. Advanced solvers often combine backtracking with constraint propagation and other optimizations. The problem is known to be NP-complete, meaning no known polynomial-time solution exists for all cases."
  }
};

export default sudokuData;