
import BubbleBar from "../components/Sorting/bars/bubbleBar";
import SelectionBar from "../components/Sorting/bars/selectionBar";


import bubbleSort from "../components/Sorting/sorting_algo/bubbleSort";
import selectionSort from "../components/Sorting/sorting_algo/selectionSort";

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
    // BarComponent: <InsertionBar />,
    // sortFn: insertionSort,
  },
  "merge-sort": {
    // BarComponent: <MergeBar />,
    // sortFn: mergeSort,
  },
  "quick-sort": {
    // BarComponent: <QuickBar />,
    // sortFn: quickSort,
  },
  "radix-sort": {
    // BarComponent: <RadixBar />,
    // sortFn: radixSort,
  },
};

export default sortingType;
