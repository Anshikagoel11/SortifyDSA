const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default async function shellSort(
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
  const arr = [...bars];
  const n = arr.length;

  let startGap = resumeIndex?.gap ?? Math.floor(n / 2);
  let startI = resumeIndex?.i ?? startGap;
  let resume = true;

  for (let gap = startGap; gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = resume ? startI : gap; i < n; i++) {
      if (stop.current || reset.current) {
        if (stop.current) setResumeIndex({ gap, i });
        if (reset.current) setResumeIndex({ gap: Math.floor(n / 2), i: Math.floor(n / 2) });
        return;
      }

      const temp = arr[i];
      let j = i;

      while (j >= gap && arr[j - gap] > temp) {
        if (stop.current || reset.current) {
          if (stop.current) setResumeIndex({ gap, i });
          if (reset.current) setResumeIndex({ gap: Math.floor(n / 2), i: Math.floor(n / 2) });
          return;
        }

        setCompareInfo({ smaller: j, larger: j - gap });
        arr[j] = arr[j - gap];
        setBars([...arr]);
        await delay(speed);
        j -= gap;
      }

      arr[j] = temp;
      setBars([...arr]);
      await delay(speed);
    }
    resume = false;
  }

  setCompareInfo({ smaller: null, larger: null });
  setIsActive(false);
  setResumeIndex({ gap: Math.floor(n / 2), i: Math.floor(n / 2) });
}
