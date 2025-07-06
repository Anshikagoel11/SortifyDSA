const stackData = {
  stack: {
    sortingName: "Stack",
    definition:
      "A linear data structure that follows the Last-In-First-Out (LIFO) principle. Elements are inserted and removed from only one end: the top of the stack.",
    detailTheory:
      "A Stack is an abstract data type that stores items in a LIFO (Last In First Out) manner. It allows two primary operations:\n\n1. **Push**: Add an item to the top.\n2. **Pop**: Remove the top item.\n\nOther helpful operations include:\n- **Peek / Top**: Get the current top item without removing it.\n- **isEmpty**: Check whether the stack is empty.\n\nStacks are commonly implemented using arrays or linked lists. Internally, the top pointer indicates the current top element. Most programming languages offer built-in support for stack operations (like `push`, `pop`, and `peek`).",
    
    operations: [
      {
        name: "Push",
        description: "Adds an element to the top of the stack."
      },
      {
        name: "Pop",
        description: "Removes the top element from the stack."
      },
      {
        name: "Peek/Top",
        description: "Returns the top element without removing it."
      },
      {
        name: "isEmpty",
        description: "Checks if the stack is empty."
      },
      {
        name: "isFull",
        description: "Checks if the stack is full (in fixed-size implementation)."
      }
    ],

    code: [
      {
        language: "C",
        code: `#define MAX 100
int stack[MAX], top = -1;

void push(int x) {
  if (top < MAX - 1)
    stack[++top] = x;
}

int pop() {
  if (top >= 0)
    return stack[top--];
  return -1; // Stack Underflow
}`
      },
      {
        language: "C++",
        code: `#include <stack>
std::stack<int> s;

s.push(10);
s.pop();
int top = s.top();`
      },
      {
        language: "Python",
        code: `stack = []

# Push
stack.append(10)

# Pop
stack.pop()

# Peek
top = stack[-1] if stack else None`
      },
      {
        language: "JavaScript",
        code: `let stack = [];

// Push
stack.push(10);

// Pop
stack.pop();

// Peek
let top = stack[stack.length - 1];`
      },
      {
        language: "Java",
        code: `import java.util.Stack;

Stack<Integer> stack = new Stack<>();
stack.push(10);
stack.pop();
int top = stack.peek();`
      }
    ],

    timeComplexity: {
      push: "O(1)",
      pop: "O(1)",
      peek: "O(1)"
    },

    spaceComplexity: "O(n)",

    realWorldUsage: [
      "Function call stack (to manage return addresses)",
      "Undo/redo operations in editors",
      "Expression parsing (e.g., infix to postfix)",
      "Backtracking problems (e.g., maze, Sudoku solver)",
      "Browser history navigation"
    ],

    commonInterviewQuestions: [
      "Implement a stack using arrays/linked lists.",
      "Implement two stacks in one array.",
      "Design a stack that supports getMin() in O(1) time.",
      "Check for balanced parentheses using a stack.",
      "Convert infix expression to postfix/prefix using stacks."
    ],

    extra:
      "Stacks are fundamental in both iterative and recursive problem-solving. They play a crucial role in compiler design, memory management, and algorithmic strategies such as DFS (Depth-First Search)."
  }
};

export default stackData;
