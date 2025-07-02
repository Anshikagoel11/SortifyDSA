export default async function heapSort(
  bars,
  setBars,
  setCompareInfo,
  speed,
  setIsActive,
  stopSorting,
  reset
) {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const array = [...bars];
  const n = array.length;

  const swap = (i, j) => {
    [array[i], array[j]] = [array[j], array[i]];
    setBars([...array]);
  };

  const heapify = async (n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (stopSorting.current || reset.current) return;

    if (left < n && array[left] > array[largest]) {
      largest = left;
    }

    if (right < n && array[right] > array[largest]) {
      largest = right;
    }

    if (largest !== i) {
      setCompareInfo({ smaller: i, larger: largest });
      await delay(speed);
      await swap(i, largest);
      await heapify(n, largest);
    }
  };

  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (stopSorting.current || reset.current) break;
    await heapify(n, i);
  }

  // One by one extract an element from heap
  for (let i = n - 1; i > 0; i--) {
    if (stopSorting.current || reset.current) break;

    setCompareInfo({ smaller: 0, larger: i });
    await delay(speed);
    await swap(0, i);
    await heapify(i, 0);
  }

  setCompareInfo({ smaller: null, larger: null });
  setIsActive(false);
}
