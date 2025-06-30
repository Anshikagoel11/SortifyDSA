
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const bubbleSort = async (
  arr,
  setBars,
  setCompareInfo,
  speed,
  setIsActive,
  stopSorting,
  reset
) => {
  const array = [...arr];
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (stopSorting.current || reset.current) return;

      const isGreater = array[j] > array[j + 1];

      if (stopSorting.current || reset.current) return;
      setCompareInfo({
        smaller: isGreater ? j + 1 : j,
        larger: isGreater ? j : j + 1,
      });

      if (stopSorting.current || reset.current) return;
      await sleep(speed);

      if (isGreater) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        if (stopSorting.current || reset.current) return;
        setBars([...array]);

        if (stopSorting.current || reset.current) return;
        await sleep(speed);
      }
    }
  }
  setCompareInfo({ smaller: null, larger: null });
  setIsActive(false);
};

export default bubbleSort;
