export default async function countingSort(
  bars,
  setBars,
  setCompareInfo,
  speed,
  setIsActive,
  stop,
  reset,
  resumeIndex,
  setResumeIndex
) {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const arr = [...bars];
  const n = arr.length;
  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);
  const output = new Array(n).fill(0);

  let stage = resumeIndex?.stage ?? 0;
  let idx = resumeIndex?.idx ?? 0;

  if (stage <= 0) {
    for (let i = idx; i < n; i++) {
      if (stop.current || reset.current) {
        if (stop.current) setResumeIndex({ stage: 0, idx: i });
        if (reset.current) setResumeIndex({ stage: 0, idx: 0 });
        return;
      }
      count[arr[i]]++;
      setCompareInfo({ smaller: i, larger: null });
      await delay(speed / 2);
    }
    idx = 1;
    stage = 1;
  }

  if (stage <= 1) {
    for (let i = idx; i <= max; i++) {
      if (stop.current || reset.current) {
        if (stop.current) setResumeIndex({ stage: 1, idx: i });
        if (reset.current) setResumeIndex({ stage: 0, idx: 0 });
        return;
      }
      count[i] += count[i - 1];
    }
    idx = n - 1;
    stage = 2;
  }

  if (stage <= 2) {
    for (let i = idx; i >= 0; i--) {
      if (stop.current || reset.current) {
        if (stop.current) setResumeIndex({ stage: 2, idx: i });
        if (reset.current) setResumeIndex({ stage: 0, idx: 0 });
        return;
      }
      output[count[arr[i]] - 1] = arr[i];
      count[arr[i]]--;
      setCompareInfo({ smaller: i, larger: count[arr[i]] });
      await delay(speed / 2);
    }
    idx = 0;
    stage = 3;
  }

  if (stage <= 3) {
    for (let i = idx; i < n; i++) {
      if (stop.current || reset.current) {
        if (stop.current) setResumeIndex({ stage: 3, idx: i });
        if (reset.current) setResumeIndex({ stage: 0, idx: 0 });
        return;
      }
      arr[i] = output[i];
      setBars([...arr]);
      setCompareInfo({ smaller: i, larger: null });
      await delay(speed);
    }
  }

  setCompareInfo({ smaller: null, larger: null });
  setIsActive(false);
  setResumeIndex({ stage: 0, idx: 0 });
}
