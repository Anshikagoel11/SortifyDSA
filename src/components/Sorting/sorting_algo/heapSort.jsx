export default async function heapSort(
  bars,
  setBars,
  setCompareInfo,
  speed,
  setIsActive,
  stopSorting,
  reset,
  resumeIndex,
  setResumeIndex
) {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const array = [...bars];
  const n = array.length;
  let stage = resumeIndex?.stage ?? 0;
  let idx = resumeIndex?.idx ?? Math.floor(n / 2) - 1;

  const swap = (i, j) => {
    [array[i], array[j]] = [array[j], array[i]];
    setBars([...array]);
  };

  const heapify = async (n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (stopSorting.current || reset.current) return;
    if (left < n && array[left] > array[largest]) largest = left;
    if (right < n && array[right] > array[largest]) largest = right;
    if (largest !== i) {
      setCompareInfo({ smaller: i, larger: largest });
      await delay(speed);
      await swap(i, largest);
      await heapify(n, largest);
    }
  };

  if (stage <= 0) {
    for (let i = idx; i >= 0; i--) {
      if (stopSorting.current || reset.current) {
        if (stopSorting.current) setResumeIndex({ stage: 0, idx: i });
        if (reset.current) setResumeIndex({ stage: 0, idx: Math.floor(n / 2) - 1 });
        return;
      }
      await heapify(n, i);
    }
    stage = 1;
    idx = n - 1;
  }

  if (stage <= 1) {
    for (let i = idx; i > 0; i--) {
      if (stopSorting.current || reset.current) {
        if (stopSorting.current) setResumeIndex({ stage: 1, idx: i });
        if (reset.current) setResumeIndex({ stage: 0, idx: Math.floor(n / 2) - 1 });
        return;
      }
      setCompareInfo({ smaller: 0, larger: i });
      await delay(speed);
      await swap(0, i);
      await heapify(i, 0);
    }
  }

  setCompareInfo({ smaller: null, larger: null });
  setIsActive(false);
  setResumeIndex({ stage: 0, idx: Math.floor(n / 2) - 1 });
}
