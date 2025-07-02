export default async function countingSort(
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

  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);
  const output = new Array(n).fill(0);

  // Count occurrences
  for (let i = 0; i < n; i++) {
    if (stopSorting.current || reset.current) return;
    count[arr[i]]++;
    setCompareInfo({ smaller: i, larger: null });
    await delay(speed / 2);
  }

  // Cumulative count
  for (let i = 1; i <= max; i++) {
    if (stopSorting.current || reset.current) return;
    count[i] += count[i - 1];
  }

  // Build output array
  for (let i = n - 1; i >= 0; i--) {
    if (stopSorting.current || reset.current) return;
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
    setCompareInfo({ smaller: i, larger: count[arr[i]] });
    await delay(speed / 2);
  }

  // Copy output back to bars
  for (let i = 0; i < n; i++) {
    if (stopSorting.current || reset.current) return;
    arr[i] = output[i];
    setBars([...arr]);
    setCompareInfo({ smaller: i, larger: null });
    await delay(speed);
  }

  setCompareInfo({ smaller: null, larger: null });
  setIsActive(false);
}
