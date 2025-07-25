const nQueensData = {
  nQueens: {
    name: "N-Queens Problem",
    definition:
      "A classic backtracking problem that asks how to place N chess queens on an N×N chessboard so that no two queens threaten each other.",
    detailTheory:
      "The N-Queens problem requires that no two queens share the same row, column, or diagonal.\n\nKey Concepts:\n1. Backtracking: A systematic way to try different configurations and undo (backtrack) when constraints are violated\n2. Constraint Satisfaction: Each queen placement must satisfy the non-attacking condition\n3. State Space Tree: The recursive exploration forms a tree of possible configurations\n\nSolutions exist for all natural numbers N ≥ 4. The problem demonstrates fundamental backtracking techniques used in many algorithms.",

    operations: [
      {
        name: "Place Queen",
        description: "Attempt to place a queen in a safe position in the current column"
      },
      {
        name: "Check Safety",
        description: "Verify no conflicts with previously placed queens"
      },
      {
        name: "Backtrack",
        description: "Remove last placed queen when no safe positions remain in current column"
      },
      {
        name: "Solution Found",
        description: "When all N queens are placed safely on the board"
      }
    ],

    code: [
      {
        language: "C",
        code: `#include <stdbool.h>
#include <stdio.h>
#define N 4

bool isSafe(int board[N][N], int row, int col) {
  // Check row on left side
  for (int i = 0; i < col; i++)
    if (board[row][i]) return false;
  
  // Check upper diagonal on left
  for (int i = row, j = col; i >= 0 && j >= 0; i--, j--)
    if (board[i][j]) return false;
  
  // Check lower diagonal on left
  for (int i = row, j = col; j >= 0 && i < N; i++, j--)
    if (board[i][j]) return false;
  
  return true;
}

bool solveNQ(int board[N][N], int col) {
  if (col >= N) return true;
  
  for (int i = 0; i < N; i++) {
    if (isSafe(board, i, col)) {
      board[i][col] = 1;
      if (solveNQ(board, col + 1)) return true;
      board[i][col] = 0; // Backtrack
    }
  }
  return false;
}`
      },
      {
        language: "Python",
        code: `def solve_n_queens(n):
    def is_safe(board, row, col):
        # Check row on left side
        for i in range(col):
            if board[row][i] == 1:
                return False
        # Check upper diagonal
        for i, j in zip(range(row, -1, -1), range(col, -1, -1)):
            if board[i][j] == 1:
                return False
        # Check lower diagonal
        for i, j in zip(range(row, n), range(col, -1, -1)):
            if board[i][j] == 1:
                return False
        return True

    def backtrack(col):
        if col >= n:
            return True
        for row in range(n):
            if is_safe(board, row, col):
                board[row][col] = 1
                if backtrack(col + 1):
                    return True
                board[row][col] = 0  # Backtrack
        return False

    board = [[0] * n for _ in range(n)]
    backtrack(0)
    return board`
      },
      {
        language: "JavaScript",
        code: `function solveNQueens(n) {
  const board = Array(n).fill().map(() => Array(n).fill(0));
  
  function isSafe(row, col) {
    // Check row on left side
    for (let i = 0; i < col; i++) {
      if (board[row][i]) return false;
    }
    // Check upper diagonal
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j]) return false;
    }
    // Check lower diagonal
    for (let i = row, j = col; i < n && j >= 0; i++, j--) {
      if (board[i][j]) return false;
    }
    return true;
  }

  function backtrack(col) {
    if (col >= n) return true;
    for (let row = 0; row < n; row++) {
      if (isSafe(row, col)) {
        board[row][col] = 1;
        if (backtrack(col + 1)) return true;
        board[row][col] = 0; // Backtrack
      }
    }
    return false;
  }

  backtrack(0);
  return board;
}`
      },
      {
        language: "Java",
        code: `class NQueens {
  static boolean isSafe(int board[][], int row, int col) {
    // Check row on left side
    for (int i = 0; i < col; i++)
      if (board[row][i] == 1) return false;
    
    // Check upper diagonal
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--)
      if (board[i][j] == 1) return false;
    
    // Check lower diagonal
    for (int i = row, j = col; j >= 0 && i < board.length; i++, j--)
      if (board[i][j] == 1) return false;
    
    return true;
  }

  static boolean solveNQ(int board[][], int col) {
    if (col >= board.length) return true;
    
    for (int i = 0; i < board.length; i++) {
      if (isSafe(board, i, col)) {
        board[i][col] = 1;
        if (solveNQ(board, col + 1)) return true;
        board[i][col] = 0; // Backtrack
      }
    }
    return false;
  }
}`
      }
    ],

    timeComplexity: {
      bruteForce: "O(N!) - Worst case explores all permutations",
      backtracking: "O(N!) - But much better average case due to pruning",
      optimized: "O(N!) - No known polynomial time solution exists"
    },

    spaceComplexity: {
      basic: "O(N²) - For storing the board",
      optimized: "O(N) - Using bitmasking or column tracking"
    },

    realWorldUsage: [
      "Circuit board design (component placement)",
      "Scheduling problems",
      "Constraint satisfaction problems",
      "Algorithm design patterns",
      "Puzzle solving frameworks"
    ],

    commonInterviewQuestions: [
      "Count all possible N-Queens solutions",
      "Print all distinct solutions",
      "Solve with minimal space complexity",
      "Adapt for other chess pieces",
      "Parallelize the solution",
      "Solve with additional constraints"
    ],

    variations: [
      "N-Rooks (only rows/columns matter)",
      "N-Knights problem",
      "Superqueens (queens + knights movement)",
      "Toroidal boards (wrapping edges)",
      "3D N-Queens"
    ],

    extra:
      "The N-Queens problem is a classic example demonstrating backtracking algorithms. It's often used to teach recursive problem solving and constraint satisfaction. The problem has solutions for all N ≥ 4, with the number of solutions growing rapidly with N (92 solutions for N=8)."
  }
};

export default nQueensData;