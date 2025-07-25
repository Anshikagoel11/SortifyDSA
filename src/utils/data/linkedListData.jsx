const linkedListData = {
  linkedList: {
    name: "Linked List",
    definition:
      "A linear data structure where each element (node) contains data and a reference (link) to the next node in the sequence.",
    detailTheory:
      "A Linked List is a dynamic data structure made up of nodes, where each node contains:\n1. Data\n2. A pointer/reference to the next node in the list\n\nTypes of Linked Lists:\n- Singly Linked List: Each node points to the next node only.\n- Doubly Linked List: Each node points to both next and previous nodes.\n- Circular Linked List: Last node points back to the head, forming a circle.\n\nLinked Lists are useful when you need efficient insertions and deletions without shifting elements, unlike arrays.",

    operations: [
      {
        name: "Insert",
        description: "Adds a new node to the list at the beginning, end, or specific position."
      },
      {
        name: "Delete",
        description: "Removes a node from the list by value or position."
      },
      {
        name: "Search",
        description: "Finds if a value exists in the list."
      },
      {
        name: "Traverse",
        description: "Visits each node and prints or processes its data."
      },
      {
        name: "Reverse",
        description: "Reverses the entire linked list."
      }
    ],

    code: [
      {
        language: "C",
        code: `struct Node {
  int data;
  struct Node* next;
};

void insertAtFront(struct Node** head, int newData) {
  struct Node* newNode = (struct Node*) malloc(sizeof(struct Node));
  newNode->data = newData;
  newNode->next = *head;
  *head = newNode;
}`
      },
      {
        language: "C++",
        code: `struct Node {
  int data;
  Node* next;
};

void insertFront(Node*& head, int data) {
  Node* newNode = new Node{data, head};
  head = newNode;
}`
      },
      {
        language: "Python",
        code: `class Node:
  def __init__(self, data):
    self.data = data
    self.next = None

class LinkedList:
  def __init__(self):
    self.head = None

  def insert_front(self, data):
    new_node = Node(data)
    new_node.next = self.head
    self.head = new_node`
      },
      {
        language: "JavaScript",
        code: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFront(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }
}`
      },
      {
        language: "Java",
        code: `class Node {
  int data;
  Node next;

  Node(int data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  Node head;

  void insertFront(int data) {
    Node newNode = new Node(data);
    newNode.next = head;
    head = newNode;
  }
}`
      }
    ],

    timeComplexity: {
      insert: "O(1) at front, O(n) at end or position",
      delete: "O(n)",
      search: "O(n)",
      traverse: "O(n)",
      reverse: "O(n)"
    },

    spaceComplexity: "O(n) (for storing n nodes)",

    realWorldUsage: [
      "Music or photo galleries (next/prev navigation)",
      "Undo functionality in text editors",
      "Dynamic memory allocation",
      "Hash table chaining (for collision resolution)",
      "Implementation of stacks and queues"
    ],

    commonInterviewQuestions: [
      "Reverse a linked list.",
      "Detect a loop in a linked list.",
      "Find the middle of a linked list.",
      "Merge two sorted linked lists.",
      "Remove Nth node from end of the list.",
      "Check if a linked list is a palindrome."
    ],

    extra:
      "Linked Lists provide dynamic memory usage and are efficient for frequent insertions/deletions. They're foundational in building other data structures like stacks, queues, graphs, and adjacency lists."
  }
};

export default linkedListData;
