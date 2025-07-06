const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const BinarySearch = async (
  arr,
  setSearchIndex,
  actualSpeed,
  setIsActive,
  stop,
  reset,
  resumeIndex,
  setResumeIndex,
  searchInput,
  setCurrentCompare,
  setIsElementFound,
  setIsSearchDone,
  rangeRef,
  setRangeVersion
) => {
  const array = [...arr];

  let startI = resumeIndex?.idxI ?? 0;
  let low = startI,
    high = array.length - 1;

  setIsSearchDone(false);

 while (low <= high) {
  if (searchInput === "") return;

  const mid = Math.floor(low + (high - low) / 2);

  //  Update range first
  rangeRef.current = { start: low, end: high };
  setCurrentCompare(-1) // so  that previous red color of mid remove before updating next range
  setRangeVersion((prev)=> prev+1);  // to force render so that selected part shows clearly
  await sleep(actualSpeed*1.5); // for better understanding to user  that which part has been chosen 

  // Then show mid 
  setCurrentCompare(mid);
  await sleep(actualSpeed); 

  if (stop.current || reset.current) {
    if (stop.current) setResumeIndex({ idxI: mid, idxJ: null });
    if (reset.current) setResumeIndex({ idxI: 0, idxJ: null });
    return;
  }

  if (array[mid] === searchInput) {
    setSearchIndex(mid);
    setCurrentCompare(-1);
    setIsActive(false);
    setIsElementFound(true);
    rangeRef.current={start:-1,end:-1}
    return;
  } else if (array[mid] < searchInput) {
    low = mid + 1;
  } else {
    high = mid - 1;
  }

  if (stop.current || reset.current) {
    if (stop.current) setResumeIndex({ idxI: mid, idxJ: null });
    if (reset.current) setResumeIndex({ idxI: 0, idxJ: null });
    return;
  }
}


  setIsSearchDone(true); 
  setSearchIndex(-1);
  setCurrentCompare(-1)
  setIsActive(false);
  setResumeIndex({ idxI: 0, idxJ: null });
  rangeRef.current = { start: -1, end: -1 };

};

export default BinarySearch;
