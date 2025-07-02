const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const bubbleSort = async (
  arr,
  setBars,
  setCompareInfo,
  speed,
  setIsActive,
  stopSorting,
  reset,
  resumeIndex,
  setResumeIndex
) => {
  const array = [...arr];

  let startI = resumeIndex?.idxI ?? 0;
  let startJ = resumeIndex?.idxJ ?? 0;

  for (let i = startI; i < array.length - 1; i++) {
    for (let j = i === startI ? startJ : 0; j < array.length - i - 1; j++) {

      if (stopSorting.current || reset.current) {
  if (stopSorting.current) setResumeIndex({ idxI: i, idxJ: j });
  if(reset.current) setResumeIndex({idexI:0,IdxJ:0})
  return;
}


      const isGreater = array[j] > array[j + 1];
      
      // checking again if stop/reset btn gets clicked
        if (stopSorting.current || reset.current) {
  if (stopSorting.current) setResumeIndex({ idxI: i, idxJ: j });
  if(reset.current) setResumeIndex({idexI:0,IdxJ:0})
  return;
}
      setCompareInfo({
        smaller: isGreater ? j + 1 : j,
        larger: isGreater ? j : j + 1,
      });

      await sleep(speed);

      if (isGreater) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        setBars([...array]);

        await sleep(speed);
      }
    }
  }

  setCompareInfo({ smaller: null, larger: null });
  setIsActive(false);
  setResumeIndex({ idxI: 0, idxJ: 0 }); // Reset after full sort
};

export default bubbleSort;
