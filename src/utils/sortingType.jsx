
import bubbleSort from "../components/Sorting/sorting_algo/bubbleSort";
import selectionSort from "../components/Sorting/sorting_algo/selectionSort";
import insertionSort from "../components/Sorting/sorting_algo/insertationSort";
import mergeSort from '../components/Sorting/sorting_algo/mergeSort'
import quickSort from "../components/Sorting/sorting_algo/quickSort";
import heapSort from '../components/Sorting/sorting_algo/heapSort'
import countingSort from '../components/Sorting/sorting_algo/countingSort'
import shellSort from '../components/Sorting/sorting_algo/shellSort'
import radixSort from '../components/Sorting/sorting_algo/radixSort'

const sortingType = {
  "bubble-sort": {
    sortFn: bubbleSort,
  },
  "selection-sort": {
    sortFn: selectionSort,
  },
  "insertion-sort": {
    sortFn: insertionSort,
  },
  "merge-sort": {
    sortFn: mergeSort,
  },
  "quick-sort": {
    sortFn: quickSort,
  },
  "heap-sort":{
    sortFn:heapSort,
  },
  "radix-sort": {
    sortFn: radixSort,
  },
  "counting-sort":{
    sortFn: countingSort,
  },
  "shell-sort":{
    sortFn: shellSort,
  }

};

export default sortingType;
