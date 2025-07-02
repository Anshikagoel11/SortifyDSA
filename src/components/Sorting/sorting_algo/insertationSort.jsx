const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const insertionSort = async (
  arr,
  setBars,
  setCompareInfo,
  speed,
  setIsActive,
  stopSorting,
  reset
) => {
  const array = [...arr];

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    // Initially show key and first compare
    setCompareInfo({ smaller: i, larger: j });
    await sleep(speed);

    while (j >= 0 && array[j] > key) {
      if (stopSorting.current || reset.current) return;

      
      setCompareInfo({ smaller: j+1, larger: j });
      await sleep(speed);

      // Shift bar right
      array[j + 1] = array[j];
      setBars([...array]);
      await sleep(speed);

      j--;
    }

    array[j + 1] = key;
    setBars([...array]);
    await sleep(speed);
  }

  // Cleanup
  setCompareInfo({ smaller: null, larger: null });
  setIsActive(false);
};

export default insertionSort;
