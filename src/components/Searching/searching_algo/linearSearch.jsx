const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const LinearSearch = async (
  arr,
  setBars,
  searchIndex,
  setSearchIndex,
  actualSpeed,
  setIsActive,
  stop,
  reset,
  resumeIndex,
  setResumeIndex,
  searchInput,
  currentCompare,
  setCurrentCompare,
  IsElementFound,
  setIsElementFound
) => {
  const array = [...arr];
  let startI = resumeIndex?.idxI ?? 0;

  for (let i = startI; i < array.length; i++) {
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

  setSearchIndex(-1);
  setCurrentCompare(-1);
  setIsActive(false);
  setIsElementFound(false);
  setResumeIndex({ idxI: 0, idxJ: null });
};

export default LinearSearch;
