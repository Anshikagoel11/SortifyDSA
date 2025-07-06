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
    setCurrentCompare,
    setIsElementFound,
    setIsSearchDone,
    SetIsElementFound,
    rangeRef
  } = UseAlgoControl();

  

  const resetfn = () => {
    if (hasReset) return;
    setIsActive(false);
    stop.current = false;
    reset.current = true;
    setCompareInfo({ smaller: null, larger: null });
    setResumeIndex({ idxI: 0, idxJ: 0 })
    setHasReset(true);
    setIsPaused(false);
     setSearchIndex(-1);
  setCurrentCompare(-1);
  setIsElementFound(false);
  setIsSearchDone(false);
   rangeRef.current={start:0,end:arraySize-1}
  };


  const generateRandomArray = (isBinarySearch) => {
    const newArray = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 90 + 5)
    );
    if(isBinarySearch){  //uses searchingType from button name not from state because state not updated instant and creating issue on first click since it is not updating
      newArray.sort((a,b)=>a-b);
      setBars(newArray)
      rangeRef.current = {start:0,end:arraySize-1}  
    }
    else setBars(newArray);


    setIsSearchDone(false);
    setIsElementFound(false)
     setSearchIndex(-1);
  setCurrentCompare(-1);
  };

 
  
  const applyCustomArray = (isBinarySearch) => {
    const numbers = customArray.split(",").map((num) => parseInt(num.trim()));
    if (numbers.every((num) => !isNaN(num))) {
      if(isBinarySearch){
       numbers.sort((a,b)=>a-b)
       rangeRef.current={start:0,end:arraySize-1}
      } 
      setBars(numbers);
      setArraySize(numbers.length);
      
    }
    setIsSearchDone(false);
  };


  const clearCustomArray = () => setCustomArray("");

  
  return {
    resetfn,
    generateRandomArray,
    applyCustomArray,
    clearCustomArray
  };
}
