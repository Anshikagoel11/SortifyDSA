import { useSorting } from "../context/sortingContext";

export default function useSortingUtils() {
  const {
    setIsActive,
    reset,
    setCompareInfo,
    setHasReset,
    setIsPaused,
    stopSorting,
    setBars,
    setArraySize,
    customArray,
    setCustomArray,
    arraySize,
    hasReset,
    setResumeIndex
  } = useSorting();

  const resetfn = () => {
    if (hasReset) return;
    setIsActive(false);
    stopSorting.current = false;
    reset.current = true;
    setCompareInfo({ smaller: null, larger: null });
    setResumeIndex({ idxI: 0, idxJ: 0 })
    generateRandomArray();
    setHasReset(true);
    setIsPaused(false);
  };

  const generateRandomArray = () => {
    const newArray = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 90 + 5)
    );
    setBars(newArray);
  };

  const applyCustomArray = () => {
    const numbers = customArray.split(",").map((num) => parseInt(num.trim()));
    if (numbers.every((num) => !isNaN(num))) {
      setBars(numbers);
      setArraySize(numbers.length);
    }
  };

  const clearCustomArray = () => setCustomArray("");

  return {
    resetfn,
    generateRandomArray,
    applyCustomArray,
    clearCustomArray
  };
}
