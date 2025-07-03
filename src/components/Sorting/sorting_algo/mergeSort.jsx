const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const merge = async (
  array,
  start,
  mid,
  end,
  setBars,
  setCompareInfo,
  speed,
  stop,
  reset
) => {
  let left = array.slice(start, mid + 1);
  let right = array.slice(mid + 1, end + 1);
  let i = 0, j = 0, k = start;

  while (i < left.length && j < right.length) {
    if (stop.current || reset.current) return;
    setCompareInfo({ smaller: start + i, larger: mid + 1 + j });
    await sleep(speed);
    if (left[i] <= right[j]) {
      array[k++] = left[i++];
    } else {
      array[k++] = right[j++];
    }
    setBars([...array]);
    await sleep(speed);
  }

  while (i < left.length) {
    if (stop.current || reset.current) return;
    array[k++] = left[i++];
    setBars([...array]);
    await sleep(speed);
  }

  while (j < right.length) {
    if (stop.current || reset.current) return;
    array[k++] = right[j++];
    setBars([...array]);
    await sleep(speed);
  }
};

const mergeSortHelper = async (
  array,
  start,
  end,
  setBars,
  setCompareInfo,
  speed,
  stop,
  reset
) => {
  if (start >= end || stop.current || reset.current) return;
  const mid = Math.floor((start + end) / 2);
  await mergeSortHelper(array, start, mid, setBars, setCompareInfo, speed, stop, reset);
  await mergeSortHelper(array, mid + 1, end, setBars, setCompareInfo, speed, stop, reset);
  await merge(array, start, mid, end, setBars, setCompareInfo, speed, stop, reset);
};stop

const mergeSort = async (
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
  await mergeSortHelper(array, 0, array.length - 1, setBars, setCompareInfo, speed, stop, reset);
  setCompareInfo({ smaller: null, larger: null });
  setIsActive(false);
  setResumeIndex({ stage: 0 });
};

export default mergeSort;
