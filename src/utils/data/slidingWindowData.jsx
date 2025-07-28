const slidingWindowData = {
  slidingWindow: {
    name: "Sliding Window",
    definition:
      "A technique used to reduce the time complexity of problems involving arrays or lists by creating a 'window' that slides over the data structure.",
    detailTheory:
      "The Sliding Window technique is used for problems involving linear data structures like arrays or strings. Instead of using nested loops (which results in O(n²) time), a window of fixed or variable size moves across the data to process elements efficiently.\n\nThere are two main types:\n- Fixed-size Sliding Window: Useful for problems like finding maximum sum of k consecutive elements.\n- Variable-size Sliding Window: Useful when the size of the window depends on certain conditions (e.g., substring with no repeating characters).\n\nThis approach helps reduce unnecessary computations and optimizes performance.",

    operations: [
      {
        name: "Calculate Sum",
        description: "Calculates the sum of each window of size k as it slides through the array."
      },
      {
        name: "Track Max/Min",
        description: "Finds the maximum or minimum value in each window."
      },
      {
        name: "Substring Analysis",
        description: "Finds the longest/shortest substring satisfying a given condition."
      },
      {
        name: "Frequency Count",
        description: "Tracks frequency/count of elements within the window."
      },
      {
        name: "Pattern Matching",
        description: "Checks if a pattern or target condition is met within a sliding window."
      }
    ],

    code: [
      {
        language: "Python",
        code: `def max_sum_subarray(arr, k):
  n = len(arr)
  if n < k:
    return -1

  window_sum = sum(arr[:k])
  max_sum = window_sum

  for i in range(n - k):
    window_sum = window_sum - arr[i] + arr[i + k]
    max_sum = max(max_sum, window_sum)

  return max_sum`
      },
      {
        language: "JavaScript",
        code: `function maxSumSubarray(arr, k) {
  if (arr.length < k) return -1;

  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += arr[i];

  let maxSum = windowSum;

  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}`
      },
      {
        language: "Java",
        code: `public int maxSumSubarray(int[] arr, int k) {
  if (arr.length < k) return -1;

  int windowSum = 0;
  for (int i = 0; i < k; i++) windowSum += arr[i];

  int maxSum = windowSum;

  for (int i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}`
      },
      {
        language: "C++",
        code: `int maxSumSubarray(vector<int>& arr, int k) {
  if (arr.size() < k) return -1;

  int windowSum = accumulate(arr.begin(), arr.begin() + k, 0);
  int maxSum = windowSum;

  for (int i = k; i < arr.size(); i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = max(maxSum, windowSum);
  }

  return maxSum;
}`
      }
    ],

    timeComplexity: {
      fixedWindow: "O(n)",
      variableWindow: "O(n) in most optimized cases"
    },

    spaceComplexity: "O(1) (ignoring input data) for fixed-size window",

    realWorldUsage: [
      "Stock market analysis (moving averages)",
      "Network packet inspection",
      "Finding maximum temperature in last X days",
      "Anomaly detection in time-series data",
      "Pattern matching in DNA sequences"
    ],

    commonInterviewQuestions: [
      "Find the maximum sum of k consecutive elements.",
      "Longest substring without repeating characters.",
      "Minimum size subarray with sum >= target.",
      "Count occurrences of anagrams in a string.",
      "Max consecutive 1s with at most K flips."
    ],

    extra:
      "Sliding Window is a highly efficient approach for problems that require scanning subsets of contiguous data. It avoids redundant calculations and significantly improves performance over brute force methods."
  }
};

export default slidingWindowData;
