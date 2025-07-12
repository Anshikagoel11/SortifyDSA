const AlgorithmsData = [
  {
    title: "Searching Algorithms",
    description: "Techniques to locate data efficiently within various structures like arrays or trees.",
    svg: (
      <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
        <path d="M10 2a8 8 0 105.3 14.3l4.4 4.4-1.4 1.4-4.4-4.4A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"/>
      </svg>
    ),
    path:"/searching/linear-search"
  },
  {
    title: "Sorting Algorithms",
    description: "Organize data in a defined order to improve accessibility and processing speed.",
    svg: (
      <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
        <path d="M6 2L3 6h6L6 2zm0 7H3l3 4 3-4H6zm9 9h3l-3 4-3-4h3zm0-3l-3-4-3 4h6zm-9 1h12v2H6v-2z"/>
      </svg>
    ),
    path:"/sorting/bubble-sort"
  },
  {
    title: "Tree Algorithms",
    description: "Used to traverse, search, and manipulate hierarchical tree structures.",
    svg: (
      <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
        <path d="M12 2l4 4h-3v4h-2V6H8l4-4zm-6 8v8H4v2h6v-2H8v-8H6zm10 0v8h-2v2h6v-2h-2v-8h-2z"/>
      </svg>
    ),
    // path:"/tree",
     path:"/comingSoon",
    note:"Coming soon...."
  },
  {
    title: "Graph Algorithms",
    description: "Explore connections and paths in complex networks of nodes and edges.",
    svg: (
      <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
        <path d="M4 4h4v4H4V4zm12 0h4v4h-4V4zM4 16h4v4H4v-4zm12 0h4v4h-4v-4zM7 8v8h2V8H7zm8 0v8h2V8h-2z"/>
      </svg>
    ),
    // path:"/graph",
     path:"/comingSoon",
    note:"Coming soon...."
  },
  {
    title: "Stack Algorithms",
    description: "Based on LIFO structure, useful for parsing, recursion, and expression evaluation.",
    svg: (
      <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
        <path d="M4 18h16v-2H4v2zm0-4h16v-2H4v2zm0-4h16V8H4v2z"/>
      </svg>
    ),
    path:"/stack"
  },
  {
    title: "Queue Algorithms",
    description: "Use FIFO structure to manage processes like task scheduling and resource sharing.",
    svg: (
      <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
        <path d="M4 4h16v2H4V4zm0 6h12v2H4v-2zm0 6h8v2H4v-2z"/>
      </svg>
    ),
    path:"/queue"
  },
  {
    title: "Linked List Algorithms",
    description: "Manage dynamic memory by connecting nodes through pointers efficiently.",
    svg: (
      <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
        <circle cx="6" cy="6" r="2" />
        <circle cx="6" cy="12" r="2" />
        <circle cx="6" cy="18" r="2" />
        <line x1="6" y1="6" x2="6" y2="12" stroke="white" strokeWidth="2" />
        <line x1="6" y1="12" x2="6" y2="18" stroke="white" strokeWidth="2" />
      </svg>
    ),
    // path:"/linkedlist",
     path:"/comingSoon",
    note:"Coming soon...."
  },
  {
    title: "Backtracking Algorithms",
    description: "Solve problems by exploring all possibilities and reverting incorrect paths.",
    svg: (
      <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
        <path d="M10 6v4H4v4h6v4l6-6-6-6z"/>
      </svg>
    ),
    // path:"/backtrack",
    path:"/comingSoon",
    note:"Coming soon...."
  },
];

export default AlgorithmsData;
