const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const insertionSort = async (
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
  let i = resumeIndex?.idxI ?? 1;
  let j = resumeIndex?.idxJ ?? i - 1;
  let key = array[i];

  for (; i < array.length; i++) {
    key = array[i];
    j = i - 1;

    if (resumeIndex?.idxI === i && resumeIndex?.idxJ !== undefined) {
      j = resumeIndex.idxJ;
    }

    setCompareInfo({ smaller: i, larger: j });
    await sleep(speed);

    while (j >= 0 && array[j] > key) {
      if (stop.current || reset.current) {
        if (stop.current) setResumeIndex({ idxI: i, idxJ: j });
        if (reset.current) setResumeIndex({ idxI: 1, idxJ: 0 });
        return;
      }

      setCompareInfo({ smaller: j + 1, larger: j });
      await sleep(speed);

      array[j + 1] = array[j];
      setBars([...array]);
      await sleep(speed);

      j--;
    }

    array[j + 1] = key;
    setBars([...array]);
    await sleep(speed);

    if (stop.current || reset.current) {
      if (stop.current) setResumeIndex({ idxI: i + 1, idxJ: i });
      if (reset.current) setResumeIndex({ idxI: 1, idxJ: 0 });
      return;
    }
  }

  setCompareInfo({ smaller: null, larger: null });
  setIsActive(false);
  setResumeIndex({ idxI: 1, idxJ: 0 });
};

export default insertionSort;
