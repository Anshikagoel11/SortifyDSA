const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const selectionSort = async (
  arr,
  setBars,
  setCompareInfo,
  speed,
  setIsActive,
  stopSorting,
  reset
) => {
  const array = [...arr];

  for (let i = 0; i < array.length; i++) {
    let minIndex = i;

    
    setCompareInfo({ smaller: minIndex, larger: null });
     await sleep(speed);
     
    for (let j = i + 1; j < array.length; j++) {
      if (stopSorting.current || reset.current) return;

      setCompareInfo({ smaller: i, larger: j });
      await sleep(speed);

      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];

      if (stopSorting.current || reset.current) return;
      setBars([...array]);
      await sleep(speed);
    }
  }

  setCompareInfo({ smaller: null, larger: null });
  setIsActive(false);
};

export default selectionSort;
