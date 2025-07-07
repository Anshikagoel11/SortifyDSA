const queueData = {
  queue: {
    sortingName: "Queue",
    definition:
      "A linear data structure that follows the First-In-First-Out (FIFO) principle. Elements are inserted at the rear and removed from the front.",
    detailTheory:
      "A Queue is an abstract data type in which elements are added from one end (rear) and removed from the other (front), following the FIFO (First In First Out) principle.\n\nKey Operations:\n1. Enqueue: Add an element to the rear.\n2. Dequeue: Remove an element from the front.\n\nAdditional operations include:\n- Front/Pee: View the front element without removing it.\n- isEmpty: Check if the queue is empty.\n- isFull : Check if the queue is full (in fixed-size implementations).\n\nQueues are implemented using arrays, linked lists, or specialized data structures like circular queues or dequeues. Most languages offer queue utilities in libraries or modules.",

    operations: [
      {
        name: "Enqueue",
        description: "Adds an element to the rear of the queue."
      },
      {
        name: "Dequeue",
        description: "Removes an element from the front of the queue."
      },
      {
        name: "Front/Peek",
        description: "Returns the front element without removing it."
      },
      {
        name: "isEmpty",
        description: "Checks if the queue is empty."
      },
      {
        name: "isFull",
        description: "Checks if the queue is full (in fixed-size implementation)."
      }
    ],

    code: [
      {
        language: "C",
        code: `#define MAX 100
int queue[MAX], front = 0, rear = -1;

void enqueue(int x) {
  if (rear < MAX - 1)
    queue[++rear] = x;
}

int dequeue() {
  if (front <= rear)
    return queue[front++];
  return -1; // Queue Underflow
}`
      },
      {
        language: "C++",
        code: `#include <queue>
std::queue<int> q;

q.push(10);    // Enqueue
q.pop();       // Dequeue
int front = q.front();`
      },
      {
        language: "Python",
        code: `from collections import deque

queue = deque()

# Enqueue
queue.append(10)

# Dequeue
queue.popleft()

# Peek
front = queue[0] if queue else None`
      },
      {
        language: "JavaScript",
        code: `let queue = [];

// Enqueue
queue.push(10);

// Dequeue
queue.shift();

// Peek
let front = queue[0];`
      },
      {
        language: "Java",
        code: `import java.util.LinkedList;
import java.util.Queue;

Queue<Integer> queue = new LinkedList<>();
queue.add(10);     // Enqueue
queue.poll();      // Dequeue
int front = queue.peek();`
      }
    ],

    timeComplexity: {
      enqueue: "O(1)",
      dequeue: "O(1)",
      front: "O(1)"
    },

    spaceComplexity: "O(n)",

    realWorldUsage: [
      "Printer job scheduling",
      "CPU task scheduling",
      "Call center systems (first come, first served)",
      "Breadth-First Search (BFS) in graphs",
      "Order processing systems"
    ],

    commonInterviewQuestions: [
      "Implement a queue using arrays/linked lists.",
      "Implement a circular queue.",
      "Implement a queue using two stacks.",
      "Design a stack using queues.",
      "Reverse the first K elements of a queue."
    ],

    extra:
      "Queues are essential for processing elements in the order they arrive. They are widely used in OS-level operations, scheduling tasks, and asynchronous data handling like IO buffers and messaging systems."
  }
};

export default queueData;
