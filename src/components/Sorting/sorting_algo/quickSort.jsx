const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const quickSort = async (
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
  const stack = [{ low: 0, high: array.length - 1 }];
  const visited = new Set();

  while (stack.length) {
    if (stopSorting.current || reset.current) {
      if (stopSorting.current) setResumeIndex({ stack });
      if (reset.current) setResumeIndex({ stack: [] });
      return;
    }

    const { low, high } = stack.pop();
    const key = `${low}-${high}`;
    if (visited.has(key)) continue;
    visited.add(key);

    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (stopSorting.current || reset.current) {
        if (stopSorting.current) setResumeIndex({ stack: [...stack, { low, high }] });
        if (reset.current) setResumeIndex({ stack: [] });
        return;
      }

      setCompareInfo({ smaller: j, larger: high });
      await sleep(speed);

      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        setBars([...array]);
        await sleep(speed);
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    setBars([...array]);
    await sleep(speed);

    const pi = i + 1;
    if (pi - 1 > low) stack.push({ low, high: pi - 1 });
    if (pi + 1 < high) stack.push({ low: pi + 1, high });
  }

  setCompareInfo({ smaller: null, larger: null });
  setIsActive(false);
  setResumeIndex({ stack: [] });
};

export default quickSort;
