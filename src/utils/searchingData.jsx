const searchingAlgorithms = {
  "linear-search": {
    sortingName: "Linear Search",
    definition:
      "A simple search algorithm that checks each element in the list sequentially until the target value is found or the list ends.",
    detailTheory:
      "Linear Search iterates through each element of the array one by one. It compares the target element with each value in the list. If a match is found, the index is returned. If no match is found after checking all elements, the search returns unsuccessful. It's the most basic searching technique and works on both sorted and unsorted arrays.",
    code: [
      {
        language: "C",
        code: `int linearSearch(int arr[], int n, int x) {
  for (int i = 0; i < n; i++) {
    if (arr[i] == x)
      return i;
  }
  return -1;
}`
      },
      {
        language: "C++",
        code: `int linearSearch(int arr[], int n, int x) {
  for (int i = 0; i < n; i++) {
    if (arr[i] == x)
      return i;
  }
  return -1;
}`
      },
      {
        language: "Python",
        code: `def linear_search(arr, x):
  for i in range(len(arr)):
    if arr[i] == x:
      return i
  return -1`
      },
      {
        language: "JavaScript",
        code: `function linearSearch(arr, x) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) return i;
  }
  return -1;
}`
      },
      {
        language: "Java",
        code: `int linearSearch(int[] arr, int x) {
  for (int i = 0; i < arr.length; i++) {
    if (arr[i] == x)
      return i;
  }
  return -1;
}`
      }
    ],
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)"
    },
    spaceComplexity: "O(1)",
    extra: "Simple to implement but inefficient for large datasets."
  },

  "binary-search": {
    sortingName: "Binary Search",
    definition:
      "A fast search algorithm that works on sorted arrays by repeatedly dividing the search interval in half.",
    detailTheory:
      "Binary Search is an efficient algorithm for finding an item in a **sorted** array. It begins by comparing the target value with the middle element of the array. If they are not equal, it halves the search space: discarding the left half if the target is greater, or the right half if it's smaller. This process continues recursively or iteratively until the target is found or the search space is empty.",
    code: [
      {
        language: "C",
        code: `int binarySearch(int arr[], int l, int r, int x) {
  while (l <= r) {
    int mid = l + (r - l) / 2;
    if (arr[mid] == x)
      return mid;
    if (arr[mid] < x)
      l = mid + 1;
    else
      r = mid - 1;
  }
  return -1;
}`
      },
      {
        language: "C++",
        code: `int binarySearch(int arr[], int l, int r, int x) {
  while (l <= r) {
    int mid = l + (r - l) / 2;
    if (arr[mid] == x)
      return mid;
    if (arr[mid] < x)
      l = mid + 1;
    else
      r = mid - 1;
  }
  return -1;
}`
      },
      {
        language: "Python",
        code: `def binary_search(arr, x):
  left, right = 0, len(arr) - 1
  while left <= right:
    mid = (left + right) // 2
    if arr[mid] == x:
      return mid
    elif arr[mid] < x:
      left = mid + 1
    else:
      right = mid - 1
  return -1`
      },
      {
        language: "JavaScript",
        code: `function binarySearch(arr, x) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === x) return mid;
    else if (arr[mid] < x) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`
      },
      {
        language: "Java",
        code: `int binarySearch(int[] arr, int x) {
  int left = 0, right = arr.length - 1;
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (arr[mid] == x)
      return mid;
    if (arr[mid] < x)
      left = mid + 1;
    else
      right = mid - 1;
  }
  return -1;
}`
      }
    ],
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)"
    },
    spaceComplexity: "O(1)",
    extra: "Only works on **sorted** data. Much faster than linear search on large arrays."
  }
};
export default searchingAlgorithms;
