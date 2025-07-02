const sortingAlgorithms = {
  "bubble-sort": {
    sortingName: "Bubble Sort",
    definition: "A simple comparison-based sorting algorithm that repeatedly steps through the list and swaps adjacent elements if they are in the wrong order.",
    detailTheory: "Bubble Sort works by repeatedly iterating through the array, comparing each pair of adjacent items, and swapping them if they are in the wrong order. After each full pass, the largest unsorted element 'bubbles' to its correct position at the end of the array. This process is repeated until no more swaps are needed.",
    code: [
      {
        language: "C",
        code: `void bubbleSort(int arr[], int n) {
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
        language: "C++",
        code: `void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++)
    for (int j = 0; j < n - i - 1; j++)
      if (arr[j] > arr[j + 1])
        std::swap(arr[j], arr[j + 1]);
}`
      },
      {
        language: "Python",
        code: `def bubble_sort(arr):
  n = len(arr)
  for i in range(n):
    for j in range(0, n - i - 1):
      if arr[j] > arr[j + 1]:
        arr[j], arr[j + 1] = arr[j + 1], arr[j]
  return arr`
      },
      {
        language: "JavaScript",
        code: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`
      },
      {
        language: "Java",
        code: `void bubbleSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n - 1; i++)
    for (int j = 0; j < n - i - 1; j++)
      if (arr[j] > arr[j + 1]) {
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
}`
      }
    ],
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    extra: "Very slow for large data sets. Good for educational purposes."
  },

  "selection-sort": {
    sortingName: "Selection Sort",
    definition: "A simple comparison-based sorting algorithm that divides the list into sorted and unsorted parts, repeatedly selecting the minimum element from the unsorted part.",
    detailTheory: "Selection Sort works by selecting the smallest (or largest) element from the unsorted section and swapping it with the first unsorted element. This process continues, growing the sorted portion of the list one element at a time.",
    code: [
      {
        language: "C",
        code: `void selectionSort(int arr[], int n) {
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
        language: "C++",
        code: `void selectionSort(int arr[], int n) {
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
        language: "Python",
        code: `def selection_sort(arr):
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
        language: "JavaScript",
        code: `function selectionSort(arr) {
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
      },
      {
        language: "Java",
        code: `void selectionSort(int[] arr) {
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
      }
    ],
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    extra: "Performs fewer swaps than bubble sort. Still inefficient for large data sets."
  },

  "insertion-sort": {
    sortingName: "Insertion Sort",
    definition: "A simple sorting algorithm that builds the sorted array one item at a time by comparing and inserting elements into their correct position.",
    detailTheory: "Insertion Sort works by taking elements from the unsorted part and inserting them at the correct position in the sorted part. It is efficient for small data sets and mostly sorted arrays.",
    code: [
      {
        language: "C",
        code: `void insertionSort(int arr[], int n) {
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`
      },
      {
        language: "C++",
        code: `void insertionSort(int arr[], int n) {
  for (int i = 1; i < n; i++) {
    int key = arr[i], j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`
      },
      {
        language: "Python",
        code: `def insertion_sort(arr):
  for i in range(1, len(arr)):
    key = arr[i]
    j = i - 1
    while j >= 0 and key < arr[j]:
      arr[j + 1] = arr[j]
      j -= 1
    arr[j + 1] = key
  return arr`
      },
      {
        language: "JavaScript",
        code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`
      },
      {
        language: "Java",
        code: `void insertionSort(int[] arr) {
  for (int i = 1; i < arr.length; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`
      }
    ],
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    extra: "Efficient for small or nearly sorted data sets."
  },

  "merge-sort": {
    sortingName: "Merge Sort",
    definition: "A divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges the sorted halves.",
    detailTheory: "Merge Sort divides the array into halves until each half has one element, then merges sorted halves together. It guarantees O(n log n) performance.",
    code: [
      {
        language: "C",
        code: `void merge(int arr[], int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  
  int L[n1], R[n2];
  for (int i = 0; i < n1; i++)
    L[i] = arr[l + i];
  for (int j = 0; j < n2; j++)
    R[j] = arr[m + 1 + j];
  
  int i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }
  
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }
  
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}

void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`
      },
      {
        language: "C++",
        code: `void merge(vector<int>& arr, int l, int m, int r) {
  vector<int> L(arr.begin() + l, arr.begin() + m + 1);
  vector<int> R(arr.begin() + m + 1, arr.begin() + r + 1);
  
  int i = 0, j = 0, k = l;
  while (i < L.size() && j < R.size()) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }
  
  while (i < L.size()) {
    arr[k] = L[i];
    i++;
    k++;
  }
  
  while (j < R.size()) {
    arr[k] = R[j];
    j++;
    k++;
  }
}

void mergeSort(vector<int>& arr, int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`
      },
      {
        language: "Python",
        code: `def merge_sort(arr):
  if len(arr) > 1:
    mid = len(arr) // 2
    L = arr[:mid]
    R = arr[mid:]

    merge_sort(L)
    merge_sort(R)

    i = j = k = 0
    while i < len(L) and j < len(R):
      if L[i] < R[j]:
        arr[k] = L[i]
        i += 1
      else:
        arr[k] = R[j]
        j += 1
      k += 1

    while i < len(L):
      arr[k] = L[i]
      i += 1
      k += 1

    while j < len(R):
      arr[k] = R[j]
      j += 1
      k += 1
  return arr`
      },
      {
        language: "JavaScript",
        code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}`
      },
      {
        language: "Java",
        code: `void merge(int arr[], int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  
  int[] L = new int[n1];
  int[] R = new int[n2];
  
  for (int i = 0; i < n1; ++i)
    L[i] = arr[l + i];
  for (int j = 0; j < n2; ++j)
    R[j] = arr[m + 1 + j];
  
  int i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }
  
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }
  
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}

void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`
      }
    ],
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)"
    },
    spaceComplexity: "O(n)",
    extra: "Stable and efficient, but requires extra space."
  },

  "quick-sort": {
    sortingName: "Quick Sort",
    definition: "A divide-and-conquer algorithm that selects a pivot, partitions the array, and recursively sorts the subarrays.",
    detailTheory: "Quick Sort picks a pivot and partitions the array such that elements less than the pivot go to the left and greater to the right. It then recursively sorts the subarrays.",
    code: [
      {
        language: "C",
        code: `void swap(int* a, int* b) {
  int t = *a;
  *a = *b;
  *b = t;
}

int partition(int arr[], int low, int high) {
  int pivot = arr[high];
  int i = (low - 1);
  
  for (int j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(&arr[i], &arr[j]);
    }
  }
  swap(&arr[i + 1], &arr[high]);
  return (i + 1);
}

void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`
      },
      {
        language: "C++",
        code: `int partition(vector<int>& arr, int low, int high) {
  int pivot = arr[high];
  int i = (low - 1);
  
  for (int j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr[i], arr[j]);
    }
  }
  swap(arr[i + 1], arr[high]);
  return (i + 1);
}

void quickSort(vector<int>& arr, int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`
      },
      {
        language: "Python",
        code: `def quick_sort(arr):
  if len(arr) <= 1:
    return arr
  pivot = arr[len(arr) // 2]
  left = [x for x in arr if x < pivot]
  middle = [x for x in arr if x == pivot]
  right = [x for x in arr if x > pivot]
  return quick_sort(left) + middle + quick_sort(right)`
      },
      {
        language: "JavaScript",
        code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}`
      },
      {
        language: "Java",
        code: `int partition(int arr[], int low, int high) {
  int pivot = arr[high];
  int i = (low - 1);
  
  for (int j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  
  int temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  
  return i + 1;
}

void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`
      }
    ],
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(log n)",
    extra: "Very fast on average. Not stable."
  },

  "heap-sort": {
    sortingName: "Heap Sort",
    definition: "A comparison-based sorting algorithm using a binary heap to build a max-heap and sort the elements.",
    detailTheory: "Heap Sort builds a max-heap from the array, then extracts the maximum and places it at the end, shrinking the heap and repeating.",
    code: [
      {
        language: "C",
        code: `void heapify(int arr[], int n, int i) {
  int largest = i;
  int l = 2 * i + 1;
  int r = 2 * i + 2;
  
  if (l < n && arr[l] > arr[largest])
    largest = l;
  
  if (r < n && arr[r] > arr[largest])
    largest = r;
  
  if (largest != i) {
    int temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;
    heapify(arr, n, largest);
  }
}

void heapSort(int arr[], int n) {
  for (int i = n / 2 - 1; i >= 0; i--)
    heapify(arr, n, i);
  
  for (int i = n - 1; i > 0; i--) {
    int temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    heapify(arr, i, 0);
  }
}`
      },
      {
        language: "C++",
        code: `void heapify(vector<int>& arr, int n, int i) {
  int largest = i;
  int l = 2 * i + 1;
  int r = 2 * i + 2;
  
  if (l < n && arr[l] > arr[largest])
    largest = l;
  
  if (r < n && arr[r] > arr[largest])
    largest = r;
  
  if (largest != i) {
    swap(arr[i], arr[largest]);
    heapify(arr, n, largest);
  }
}

void heapSort(vector<int>& arr) {
  int n = arr.size();
  
  for (int i = n / 2 - 1; i >= 0; i--)
    heapify(arr, n, i);
  
  for (int i = n - 1; i > 0; i--) {
    swap(arr[0], arr[i]);
    heapify(arr, i, 0);
  }
}`
      },
      {
        language: "Python",
        code: `def heapify(arr, n, i):
  largest = i
  l = 2 * i + 1
  r = 2 * i + 2
  
  if l < n and arr[i] < arr[l]:
    largest = l
  
  if r < n and arr[largest] < arr[r]:
    largest = r
  
  if largest != i:
    arr[i], arr[largest] = arr[largest], arr[i]
    heapify(arr, n, largest)

def heap_sort(arr):
  n = len(arr)
  
  for i in range(n // 2 - 1, -1, -1):
    heapify(arr, n, i)
  
  for i in range(n - 1, 0, -1):
    arr[i], arr[0] = arr[0], arr[i]
    heapify(arr, i, 0)
  return arr`
      },
      {
        language: "JavaScript",
        code: `function heapify(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest])
    largest = left;
  
  if (right < n && arr[right] > arr[largest])
    largest = right;
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

function heapSort(arr) {
  const n = arr.length;
  
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
    heapify(arr, n, i);
  
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}`
      },
      {
        language: "Java",
        code: `void heapify(int arr[], int n, int i) {
  int largest = i;
  int l = 2 * i + 1;
  int r = 2 * i + 2;
  
  if (l < n && arr[l] > arr[largest])
    largest = l;
  
  if (r < n && arr[r] > arr[largest])
    largest = r;
  
  if (largest != i) {
    int swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;
    heapify(arr, n, largest);
  }
}

void heapSort(int arr[]) {
  int n = arr.length;
  
  for (int i = n / 2 - 1; i >= 0; i--)
    heapify(arr, n, i);
  
  for (int i = n - 1; i > 0; i--) {
    int temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    heapify(arr, i, 0);
  }
}`
      }
    ],
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)"
    },
    spaceComplexity: "O(1)",
    extra: "Efficient and in-place, but not stable."
  },

  "radix-sort": {
    sortingName: "Radix Sort",
    definition: "A non-comparison sorting algorithm that sorts numbers by processing individual digits.",
    detailTheory: "Radix Sort processes numbers digit by digit, from least significant to most significant, using counting sort as a subroutine. It can be implemented to process digits from left to right (MSD) or right to left (LSD).",
    code: [
      {
        language: "C",
        code: `int getMax(int arr[], int n) {
  int max = arr[0];
  for (int i = 1; i < n; i++)
    if (arr[i] > max)
      max = arr[i];
  return max;
}

void countSort(int arr[], int n, int exp) {
  int output[n];
  int count[10] = {0};
  
  for (int i = 0; i < n; i++)
    count[(arr[i] / exp) % 10]++;
  
  for (int i = 1; i < 10; i++)
    count[i] += count[i - 1];
  
  for (int i = n - 1; i >= 0; i--) {
    output[count[(arr[i] / exp) % 10] - 1] = arr[i];
    count[(arr[i] / exp) % 10]--;
  }
  
  for (int i = 0; i < n; i++)
    arr[i] = output[i];
}

void radixSort(int arr[], int n) {
  int m = getMax(arr, n);
  
  for (int exp = 1; m / exp > 0; exp *= 10)
    countSort(arr, n, exp);
}`
      },
      {
        language: "C++",
        code: `int getMax(vector<int>& arr) {
  return *max_element(arr.begin(), arr.end());
}

void countSort(vector<int>& arr, int exp) {
  vector<int> output(arr.size());
  vector<int> count(10, 0);
  
  for (int i = 0; i < arr.size(); i++)
    count[(arr[i] / exp) % 10]++;
  
  for (int i = 1; i < 10; i++)
    count[i] += count[i - 1];
  
  for (int i = arr.size() - 1; i >= 0; i--) {
    output[count[(arr[i] / exp) % 10] - 1] = arr[i];
    count[(arr[i] / exp) % 10]--;
  }
  
  arr = output;
}

void radixSort(vector<int>& arr) {
  int m = getMax(arr);
  
  for (int exp = 1; m / exp > 0; exp *= 10)
    countSort(arr, exp);
}`
      },
      {
        language: "Python",
        code: `def counting_sort(arr, exp):
  n = len(arr)
  output = [0] * n
  count = [0] * 10
  
  for i in range(n):
    index = arr[i] // exp
    count[index % 10] += 1
  
  for i in range(1, 10):
    count[i] += count[i - 1]
  
  i = n - 1
  while i >= 0:
    index = arr[i] // exp
    output[count[index % 10] - 1] = arr[i]
    count[index % 10] -= 1
    i -= 1
  
  for i in range(n):
    arr[i] = output[i]

def radix_sort(arr):
  max_num = max(arr)
  exp = 1
  while max_num // exp > 0:
    counting_sort(arr, exp)
    exp *= 10
  return arr`
      },
      {
        language: "JavaScript",
        code: `function countingSort(arr, exp) {
  const n = arr.length;
  const output = new Array(n).fill(0);
  const count = new Array(10).fill(0);
  
  for (let i = 0; i < n; i++) {
    const index = Math.floor(arr[i] / exp) % 10;
    count[index]++;
  }
  
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  for (let i = n - 1; i >= 0; i--) {
    const index = Math.floor(arr[i] / exp) % 10;
    output[count[index] - 1] = arr[i];
    count[index]--;
  }
  
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}

function radixSort(arr) {
  const max = Math.max(...arr);
  
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSort(arr, exp);
  }
  return arr;
}`
      },
      {
        language: "Java",
        code: `int getMax(int arr[]) {
  int max = arr[0];
  for (int i = 1; i < arr.length; i++)
    if (arr[i] > max)
      max = arr[i];
  return max;
}

void countSort(int arr[], int exp) {
  int[] output = new int[arr.length];
  int[] count = new int[10];
  
  for (int i = 0; i < arr.length; i++)
    count[(arr[i] / exp) % 10]++;
  
  for (int i = 1; i < 10; i++)
    count[i] += count[i - 1];
  
  for (int i = arr.length - 1; i >= 0; i--) {
    output[count[(arr[i] / exp) % 10] - 1] = arr[i];
    count[(arr[i] / exp) % 10]--;
  }
  
  for (int i = 0; i < arr.length; i++)
    arr[i] = output[i];
}

void radixSort(int arr[]) {
  int m = getMax(arr);
  
  for (int exp = 1; m / exp > 0; exp *= 10)
    countSort(arr, exp);
}`
      }
    ],
    timeComplexity: {
      best: "O(nk)",
      average: "O(nk)",
      worst: "O(nk)"
    },
    spaceComplexity: "O(n + k)",
    extra: "Efficient for numbers with small digit counts. Works only with integers."
  },

  "shell-sort": {
    sortingName: "Shell Sort",
    definition: "An optimization of insertion sort that allows exchange of far apart elements.",
    detailTheory: "Shell Sort works by sorting elements far apart from each other and progressively reducing the gap between elements to be compared. It improves on insertion sort by moving out-of-place elements into position faster.",
    code: [
      {
        language: "C",
        code: `void shellSort(int arr[], int n) {
  for (int gap = n / 2; gap > 0; gap /= 2) {
    for (int i = gap; i < n; i++) {
      int temp = arr[i];
      int j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
        arr[j] = arr[j - gap];
      arr[j] = temp;
    }
  }
}`
      },
      {
        language: "C++",
        code: `void shellSort(vector<int>& arr) {
  int n = arr.size();
  for (int gap = n / 2; gap > 0; gap /= 2) {
    for (int i = gap; i < n; i++) {
      int temp = arr[i];
      int j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
        arr[j] = arr[j - gap];
      arr[j] = temp;
    }
  }
}`
      },
      {
        language: "Python",
        code: `def shell_sort(arr):
  n = len(arr)
  gap = n // 2
  
  while gap > 0:
    for i in range(gap, n):
      temp = arr[i]
      j = i
      while j >= gap and arr[j - gap] > temp:
        arr[j] = arr[j - gap]
        j -= gap
      arr[j] = temp
    gap //= 2
  return arr`
      },
      {
        language: "JavaScript",
        code: `function shellSort(arr) {
  let n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      arr[j] = temp;
    }
  }
  return arr;
}`
      },
      {
        language: "Java",
        code: `void shellSort(int arr[]) {
  int n = arr.length;
  for (int gap = n / 2; gap > 0; gap /= 2) {
    for (int i = gap; i < n; i++) {
      int temp = arr[i];
      int j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      arr[j] = temp;
    }
  }
}`
      }
    ],
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n^(3/2))",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    extra: "Improves on insertion sort. Performance depends on gap sequence."
  },

  "counting-sort": {
    sortingName: "Counting Sort",
    definition: "A non-comparison sorting algorithm that counts the frequency of each element to determine their positions.",
    detailTheory: "Counting Sort is used for integers within a range. It counts occurrences and calculates positions using prefix sums, then places elements into output.",
    code: [
      {
        language: "C",
        code: `void countingSort(int arr[], int n) {
  int max = arr[0];
  for (int i = 1; i < n; i++)
    if (arr[i] > max)
      max = arr[i];
  
  int count[max + 1];
  for (int i = 0; i <= max; i++)
    count[i] = 0;
  
  for (int i = 0; i < n; i++)
    count[arr[i]]++;
  
  for (int i = 1; i <= max; i++)
    count[i] += count[i - 1];
  
  int output[n];
  for (int i = n - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  
  for (int i = 0; i < n; i++)
    arr[i] = output[i];
}`
      },
      {
        language: "C++",
        code: `void countingSort(vector<int>& arr) {
  int max = *max_element(arr.begin(), arr.end());
  vector<int> count(max + 1, 0);
  
  for (int num : arr)
    count[num]++;
  
  for (int i = 1; i <= max; i++)
    count[i] += count[i - 1];
  
  vector<int> output(arr.size());
  for (int i = arr.size() - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  
  arr = output;
}`
      },
      {
        language: "Python",
        code: `def counting_sort(arr):
  max_val = max(arr)
  count = [0] * (max_val + 1)
  
  for num in arr:
    count[num] += 1
  
  for i in range(1, len(count)):
    count[i] += count[i - 1]
  
  output = [0] * len(arr)
  for num in reversed(arr):
    output[count[num] - 1] = num
    count[num] -= 1
  
  return output`
      },
      {
        language: "JavaScript",
        code: `function countingSort(arr) {
  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);
  
  for (const num of arr) {
    count[num]++;
  }
  
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }
  
  const output = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  
  return output;
}`
      },
      {
        language: "Java",
        code: `void countingSort(int arr[]) {
  int max = Arrays.stream(arr).max().getAsInt();
  int[] count = new int[max + 1];
  
  for (int num : arr) {
    count[num]++;
  }
  
  for (int i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }
  
  int[] output = new int[arr.length];
  for (int i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  
  System.arraycopy(output, 0, arr, 0, arr.length);
}`
      }
    ],
    timeComplexity: {
      best: "O(n + k)",
      average: "O(n + k)",
      worst: "O(n + k)"
    },
    spaceComplexity: "O(k)",
    extra: "Fast for small integer ranges. Not suitable for large ranges or negative numbers."
  },

  "bucket-sort": {
    sortingName: "Bucket Sort",
    definition: "A distribution sort that works by distributing elements into buckets and sorting them individually.",
    detailTheory: "Bucket Sort divides the range of numbers into buckets, distributes the elements into these buckets, sorts each bucket (typically with insertion sort), and concatenates the results.",
    code: [
      {
        language: "C",
        code: `void bucketSort(float arr[], int n) {
  // Create n empty buckets
  float buckets[n][n];
  int bucket_sizes[n];
  for (int i = 0; i < n; i++)
    bucket_sizes[i] = 0;
  
  // Put array elements in different buckets
  for (int i = 0; i < n; i++) {
    int bi = n * arr[i]; // Index in bucket
    buckets[bi][bucket_sizes[bi]++] = arr[i];
  }
  
  // Sort individual buckets
  for (int i = 0; i < n; i++)
    insertionSort(buckets[i], bucket_sizes[i]);
  
  // Concatenate all buckets into arr[]
  int index = 0;
  for (int i = 0; i < n; i++)
    for (int j = 0; j < bucket_sizes[i]; j++)
      arr[index++] = buckets[i][j];
}`
      },
      {
        language: "C++",
        code: `void bucketSort(vector<float>& arr) {
  int n = arr.size();
  vector<vector<float>> buckets(n);
  
  // Put elements into different buckets
  for (int i = 0; i < n; i++) {
    int bi = n * arr[i]; // Index in bucket
    buckets[bi].push_back(arr[i]);
  }
  
  // Sort individual buckets
  for (int i = 0; i < n; i++)
    sort(buckets[i].begin(), buckets[i].end());
  
  // Concatenate all buckets into arr
  int index = 0;
  for (int i = 0; i < n; i++)
    for (int j = 0; j < buckets[i].size(); j++)
      arr[index++] = buckets[i][j];
}`
      },
      {
        language: "Python",
        code: `def bucket_sort(arr):
  max_val = max(arr)
  size = max_val / len(arr)
  buckets = [[] for _ in range(len(arr))]
  
  for num in arr:
    i = int(num / size)
    if i != len(arr):
      buckets[i].append(num)
    else:
      buckets[len(arr) - 1].append(num)
  
  for bucket in buckets:
    bucket.sort()
  
  result = []
  for bucket in buckets:
    result += bucket
  
  return result`
      },
      {
        language: "JavaScript",
        code: `function bucketSort(arr) {
  const n = arr.length;
  const buckets = Array.from({ length: n }, () => []);
  
  // Put elements into different buckets
  for (const num of arr) {
    const bi = Math.floor(n * num);
    buckets[bi].push(num);
  }
  
  // Sort individual buckets
  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b);
  }
  
  // Concatenate all buckets
  return buckets.flat();
}`
      },
      {
        language: "Java",
        code: `void bucketSort(float[] arr) {
  int n = arr.length;
  ArrayList<Float>[] buckets = new ArrayList[n];
  
  for (int i = 0; i < n; i++) {
    buckets[i] = new ArrayList<>();
  }
  
  // Put elements into different buckets
  for (float num : arr) {
    int bi = (int) (n * num);
    buckets[bi].add(num);
  }
  
  // Sort individual buckets
  for (ArrayList<Float> bucket : buckets) {
    Collections.sort(bucket);
  }
  
  // Concatenate all buckets into arr
  int index = 0;
  for (ArrayList<Float> bucket : buckets) {
    for (float num : bucket) {
      arr[index++] = num;
    }
  }
}`
      }
    ],
    timeComplexity: {
      best: "O(n + k)",
      average: "O(n + k)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(n + k)",
    extra: "Works best when input is uniformly distributed. Often used for floating-point numbers."
  }
};

export default sortingAlgorithms;