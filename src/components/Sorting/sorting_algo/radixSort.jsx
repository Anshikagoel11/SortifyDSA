export default async function radixSort(
  bars,
  setBars,
  setCompareInfo,
  speed,
  setIsActive,
  stopSorting,
  reset
) {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  let arr = [...bars];
  const maxNum = Math.max(...arr);
  let exp = 1;

  while (Math.floor(maxNum / exp) > 0) {
    if (stopSorting.current || reset.current) return;

    const count = new Array(10).fill(0);
    const output = new Array(arr.length).fill(0);

    // Count occurrences of digits
    for (let i = 0; i < arr.length; i++) {
      const digit = Math.floor((arr[i] / exp) % 10);
      count[digit]++;
      setCompareInfo({ smaller: i, larger: null });
      await delay(speed / 2);
    }

    // Cumulative count
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
      const digit = Math.floor((arr[i] / exp) % 10);
      output[count[digit] - 1] = arr[i];
      count[digit]--;
      setCompareInfo({ smaller: i, larger: count[digit] });
      await delay(speed / 2);
    }

    // Copy back
    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
      setBars([...arr]);
      setCompareInfo({ smaller: i, larger: null });
      await delay(speed);
    }

    exp *= 10;
  }

  setCompareInfo({ smaller: null, larger: null });
  setIsActive(false);
}
