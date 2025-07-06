//need to wait after updating states (sleep) - becoz on state change , react re-render & that re-render must be allowed time to visibly happen before the loop continues.
//if we not wait then update UI will not visible since loop always contiue to run and only final result will show
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


const LinearSearch = async (
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
) => {
  const array = [...arr];
  let startI = resumeIndex?.idxI ?? 0;

  setIsSearchDone(false);
  setIsElementFound(false); //reset here because sometimes after return react not able to re-render instant
  setSearchIndex(-1)

  for (let i = startI; i < array.length; i++) {


    if(searchInput === "") return;

 
    if (stop.current || reset.current) {
      if (stop.current) setResumeIndex({ idxI: i, idxJ: null });
      if (reset.current) {
        setIsElementFound(false);
        setResumeIndex({ idxI: 0, idxJ: null });
      }
      return;
    }

    setCurrentCompare(i);
    await sleep(actualSpeed);

    if (array[i] === searchInput) {
      setSearchIndex(i);
      setCurrentCompare(-1);
      setIsActive(false);
      setIsElementFound(true);
      await sleep(actualSpeed);
      return;
    }

    if (stop.current || reset.current) {
      if (stop.current) setResumeIndex({ idxI: i, idxJ: null });
      if (reset.current) {
        setResumeIndex({ idxI: 0, idxJ: null });
        setIsElementFound(false);
      }

      await sleep(actualSpeed);
      return;
    }
  }
 setIsSearchDone(true)  //search comp but element not found

 //reset all states
  setSearchIndex(-1);
  setCurrentCompare(-1);
  setIsActive(false);
  setIsElementFound(false);
  setResumeIndex({ idxI: 0, idxJ: null });
  // await sleep(actualSpeed);

  //green color box is not removing on again clicking the start button
};

export default LinearSearch;
