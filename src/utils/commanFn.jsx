import { UseAlgoControl } from "../context/algoControlContext";
import { useStackContext } from "../context/stackContext";

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
    setCurrentCompare,
    setIsElementFound,
    setIsSearchDone,
    SetIsElementFound,
    rangeRef,
  } = UseAlgoControl();

  const { input, stack, setStack, setInput } = useStackContext();

  const resetfn = () => {
    if (hasReset) return;
    setIsActive(false);
    stop.current = false;
    reset.current = true;
    setCompareInfo({ smaller: null, larger: null });
    setResumeIndex({ idxI: 0, idxJ: 0 });
    setHasReset(true);
    setIsPaused(false);
    setSearchIndex(-1);
    setCurrentCompare(-1);
    setIsElementFound(false);
    setIsSearchDone(false);
    rangeRef.current = { start: 0, end: arraySize - 1 };
  };

  const generateRandomArray = (isBinarySearch) => {
    const newArray = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 90 + 5)
    );
    if (isBinarySearch) {
      //uses searchingType from button name not from state because state not updated instant and creating issue on first click since it is not updating
      newArray.sort((a, b) => a - b);
      setBars(newArray);
      rangeRef.current = { start: 0, end: arraySize - 1 };
    } else setBars(newArray);

    setIsSearchDone(false);
    setIsElementFound(false);
    setSearchIndex(-1);
    setCurrentCompare(-1);
  };

  const applyCustomArray = (isBinarySearch) => {
    const numbers = customArray.split(",").map((num) => parseInt(num.trim()));
    if (numbers.every((num) => !isNaN(num))) {
      if (isBinarySearch) {
        numbers.sort((a, b) => a - b);
        rangeRef.current = { start: 0, end: arraySize - 1 };
      }
      setBars(numbers);
      setArraySize(numbers.length);
    }
    setIsSearchDone(false);
  };

  const clearCustomArray = () => setCustomArray("");

  const pushToStack = () => {
    if (!input.trim()) return; // don't allow empty
    // setStack([...stack, input]); not using since not sure ki instant state update ho jeygi ya nhi
    setStack((prev) => [...prev, input]);
    // console.log("instant",stack)  //prev stack print kregi kyuki state set krte hi print kra rhe h toh vo ekdm update nhi  hote , useEffect m print kra rhe h toh shi ho rha h
    setInput(""); // clear input after push
  };

  //uses sames state for two algorthim so need to update them all
  const resetStates = () => {
    setIsActive(false);
    setCompareInfo({ smaller: null, larger: null });
    setArraySize(window.innerWidth < 768 ? 10 : 15);
    setIsPaused(false);
    generateRandomArray();
    setHasReset(true);
    clearCustomArray();
    stop.current = true;
  };

  return {
    resetfn,
    generateRandomArray,
    applyCustomArray,
    clearCustomArray,
    pushToStack,
    resetStates,
  };
}
