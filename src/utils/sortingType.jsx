
import BubbleBar from "../components/Sorting/bars/bubbleBar";
import SelectionBar from "../components/Sorting/bars/selectionBar";
import InsertionBar from "../components/Sorting/bars/insertationBar";
import MergeBar from '../components/Sorting/bars/mergeBar'
import QuickBar from "../components/Sorting/bars/quickBar";
import HeapBar from "../components/Sorting/bars/heapBar"
import CountingBar from "../components/Sorting/bars/countingBar"
import ShellBar from "../components/Sorting/bars/shellBar"
import RadixBar from "../components/Sorting/bars/radixBar"

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
    BarComponent: <BubbleBar />,
    sortFn: bubbleSort,
  },
  "selection-sort": {
    BarComponent: <SelectionBar />,
    sortFn: selectionSort,
  },
  "insertion-sort": {
    BarComponent: <InsertionBar />,
    sortFn: insertionSort,
  },
  "merge-sort": {
    BarComponent: <MergeBar />,
    sortFn: mergeSort,
  },
  "quick-sort": {
    sortFn: quickSort,
    BarComponent: <QuickBar />,
  },
  "heap-sort":{
    sortFn:heapSort,
    BarComponent:<HeapBar/>
  },
  "radix-sort": {
    BarComponent: <RadixBar />,
    sortFn: radixSort,
  },
  "counting-sort":{
     BarComponent: <CountingBar />,
    sortFn: countingSort,
  },
  "shell-sort":{
     BarComponent: <ShellBar />,
    sortFn: shellSort,
  }

};

export default sortingType;
