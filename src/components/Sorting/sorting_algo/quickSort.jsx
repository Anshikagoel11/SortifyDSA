const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const quickSort = async (
  arr,
  setBars,
  setCompareInfo,
  speed,
  setIsActive,
  stopSorting,
  reset
) => {
  const array = [...arr];

  async function partition(low, high) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (stopSorting.current || reset.current) return -1;
      setCompareInfo({ smaller: j, larger: high }); // comparing with pivot
      await sleep(speed);

      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        setBars([...array]);
        await sleep(speed);
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    setBars([...array]);
    await sleep(speed);
    return i + 1;
  }

  async function quick(low, high) {
    if (low < high) {
      const pi = await partition(low, high);
      if (pi === -1) return; // stop triggered
      await quick(low, pi - 1);
      await quick(pi + 1, high);
    }
  }

  await quick(0, array.length - 1);

  setCompareInfo({ smaller: null, larger: null });
  setIsActive(false);
};

export default quickSort;
