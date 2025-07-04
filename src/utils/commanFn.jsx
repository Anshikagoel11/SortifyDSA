import { UseAlgoControl } from "../context/algoControlContext";

export default function useSortingUtils() {
  const {
    setIsActive,
    reset,
    setCompareInfo,
    setHasReset,
    setIsPaused,
    stop,
    setBars,
    setArraySize,
    customArray,
    setCustomArray,
    arraySize,
    hasReset,
    setResumeIndex,
    setSearchIndex,
    setCurrentCompare
  } = UseAlgoControl();

  const resetfn = () => {
    if (hasReset) return;
    setIsActive(false);
    stop.current = false;
    reset.current = true;
    setCompareInfo({ smaller: null, larger: null });
    setResumeIndex({ idxI: 0, idxJ: 0 })
    generateRandomArray();
    setHasReset(true);
    setIsPaused(false);
     setSearchIndex(-1);
  setCurrentCompare(-1);
  setIsElementFound(false);
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
