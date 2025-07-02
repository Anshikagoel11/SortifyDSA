const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default async function radixSort(
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
  let arr = [...bars];
  const maxNum = Math.max(...arr);
  let exp = resumeIndex?.exp ?? 1;

  while (Math.floor(maxNum / exp) > 0) {
    if (stopSorting.current || reset.current) {
      if (stopSorting.current) setResumeIndex({ exp });
      if (reset.current) setResumeIndex({ exp: 1 });
      return;
    }

    const count = new Array(10).fill(0);
    const output = new Array(arr.length).fill(0);

    for (let i = 0; i < arr.length; i++) {
      if (stopSorting.current || reset.current) {
        if (stopSorting.current) setResumeIndex({ exp });
        if (reset.current) setResumeIndex({ exp: 1 });
        return;
      }
      const digit = Math.floor((arr[i] / exp) % 10);
      count[digit]++;
      setCompareInfo({ smaller: i, larger: null });
      await delay(speed / 2);
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
      if (stopSorting.current || reset.current) {
        if (stopSorting.current) setResumeIndex({ exp });
        if (reset.current) setResumeIndex({ exp: 1 });
        return;
      }
      const digit = Math.floor((arr[i] / exp) % 10);
      output[count[digit] - 1] = arr[i];
      count[digit]--;
      setCompareInfo({ smaller: i, larger: count[digit] });
      await delay(speed / 2);
    }

    for (let i = 0; i < arr.length; i++) {
      if (stopSorting.current || reset.current) {
        if (stopSorting.current) setResumeIndex({ exp });
        if (reset.current) setResumeIndex({ exp: 1 });
        return;
      }
      arr[i] = output[i];
      setBars([...arr]);
      setCompareInfo({ smaller: i, larger: null });
      await delay(speed);
    }

    exp *= 10;
  }

  setCompareInfo({ smaller: null, larger: null });
  setIsActive(false);
  setResumeIndex({ exp: 1 });
}
