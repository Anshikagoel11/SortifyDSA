
import BubbleBar from "../components/Sorting/bars/bubbleBar";
import bubbleSort from "../components/Sorting/sorting_algo/bubbleSort";

const sortingType = {
  "bubble-sort": {
    BarComponent: <BubbleBar />,
    sortFn: bubbleSort,
  },
  "selection-sort": {
    // BarComponent: <SelectionBar />,
    // sortFn: selectionSort,
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
