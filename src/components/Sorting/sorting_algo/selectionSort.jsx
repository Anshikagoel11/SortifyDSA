const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const selectionSort = async (
  arr,
  setBars,
  setCompareInfo,
  speed,
  setIsActive,
  stop,
  reset,
  resumeIndex,
  setResumeIndex
) => {
  const array = [...arr];

  let startI = resumeIndex?.idxI ?? 0;

  for (let i = startI; i < array.length; i++) {
    let minIndex = i;
    setCompareInfo({ smaller: minIndex, larger: null });
    await sleep(speed);

    for (let j = i + 1; j < array.length; j++) {
      if (stop.current || reset.current) {
        if (stop.current) setResumeIndex({ idxI: i });
        if (reset.current) setResumeIndex({ idxI: 0 });
        return;
      }

      setCompareInfo({ smaller: i, larger: j });
      await sleep(speed);

      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      if (stop.current || reset.current) {
        if (stop.current) setResumeIndex({ idxI: i });
        if (reset.current) setResumeIndex({ idxI: 0 });
        return;
      }
      setBars([...array]);
      await sleep(speed);
    }
  }

  setCompareInfo({ smaller: null, larger: null });
  setIsActive(false);
  setResumeIndex({ idxI: 0 });
};

export default selectionSort;
