const sortingAlgorithms = {
  "bubble-sort": {
    sortingName: "Bubble Sort",
    definition:
      "A simple comparison-based sorting algorithm that repeatedly steps through the list and swaps adjacent elements if they are in the wrong order.",
    detailTheory:
      "Bubble Sort works by repeatedly iterating through the array, comparing each pair of adjacent items, and swapping them if they are in the wrong order. After each full pass, the largest unsorted element 'bubbles' to its correct position at the end of the array. This process is repeated until no more swaps are needed.",
    code: [
      {
        language: "C++",
        code: `
void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++)
    for (int j = 0; j < n - i - 1; j++)
      if (arr[j] > arr[j + 1])
        std::swap(arr[j], arr[j + 1]);
}`
      },
      {
        language: "C",
        code: `
void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++)
    for (int j = 0; j < n - i - 1; j++)
      if (arr[j] > arr[j + 1]) {
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
}`
      },
      {
        language: "Python",
        code: `
def bubble_sort(arr):
  n = len(arr)
  for i in range(n):
    for j in range(0, n - i - 1):
      if arr[j] > arr[j + 1]:
        arr[j], arr[j + 1] = arr[j + 1], arr[j]
  return arr`
      },
      {
        language: "Java",
        code: `
void bubbleSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n - 1; i++)
    for (int j = 0; j < n - i - 1; j++)
      if (arr[j] > arr[j + 1]) {
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
}`
      },
      {
        language: "JavaScript",
        code: `
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`
      }
    ],
    timeComplexity: {
      best: "O(n)",
      average: "O(n^2)",
      worst: "O(n^2)"
    },
    spaceComplexity: "O(1)",
    extra: "Very slow for large data sets. Good for educational purposes."
  },

  "selection-sort": {
    sortingName: "Selection Sort",
    definition:
      "A simple comparison-based sorting algorithm that divides the list into sorted and unsorted parts, repeatedly selecting the minimum element from the unsorted part.",
    detailTheory:
      "Selection Sort works by selecting the smallest (or largest) element from the unsorted section and swapping it with the first unsorted element. This process continues, growing the sorted portion of the list one element at a time.",
    code: [
      {
        language: "C++",
        code: `
void selectionSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++)
      if (arr[j] < arr[minIdx])
        minIdx = j;
    std::swap(arr[i], arr[minIdx]);
  }
}`
      },
      {
        language: "C",
        code: `
void selectionSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++)
      if (arr[j] < arr[minIdx])
        minIdx = j;
    int temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
  }
}`
      },
      {
        language: "Python",
        code: `
def selection_sort(arr):
  n = len(arr)
  for i in range(n):
    min_idx = i
    for j in range(i+1, n):
      if arr[j] < arr[min_idx]:
        min_idx = j
    arr[i], arr[min_idx] = arr[min_idx], arr[i]
  return arr`
      },
      {
        language: "Java",
        code: `
void selectionSort(int[] arr) {
  for (int i = 0; i < arr.length - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < arr.length; j++)
      if (arr[j] < arr[minIdx])
        minIdx = j;
    int temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
  }
}`
      },
      {
        language: "JavaScript",
        code: `
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}`
      }
    ],
    timeComplexity: {
      best: "O(n^2)",
      average: "O(n^2)",
      worst: "O(n^2)"
    },
    spaceComplexity: "O(1)",
    extra: "Performs fewer swaps than bubble sort. Still inefficient for large data sets."
  }
};

export default sortingAlgorithms;
