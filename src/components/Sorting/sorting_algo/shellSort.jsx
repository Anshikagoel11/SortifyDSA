export default async function shellSort(
  bars,
  setBars,
  setCompareInfo,
  speed,
  setIsActive,
  stopSorting,
  reset
) {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const arr = [...bars];
  const n = arr.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      if (stopSorting.current || reset.current) return;

      const temp = arr[i];
      let j = i;

      while (j >= gap && arr[j - gap] > temp) {
        if (stopSorting.current || reset.current) return;

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
  }

  setCompareInfo({ smaller: null, larger: null });
  setIsActive(false);
}
