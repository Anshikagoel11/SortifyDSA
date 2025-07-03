
const sleep = (ms)=> new Promise ((resolve) => setTimeout(resolve,ms));

const BinarySearch = async( arr,
      setBars,
      setSearchIndex,
      setsearchIndexMatch,
      actualSpeed,
      setIsActive,
      stop,
      reset,
      resumeIndex,
      setResumeIndex,
      searchInput
    ) => {
  const array = [...arr];

  let startI = resumeIndex?.idxI ?? 0;

  for(let i=startI ; i<array.length;i++){

    
      if (stop.current || reset.current) {
        if (stop.current) setResumeIndex({ idxI: i, idxJ: null });
        if (reset.current) setResumeIndex({ idxI: 0, idxJ: null });
        await sleep(speed);
        return;
      }

    if(array[i]===searchInput){
        setSearchIndex(i);
        await sleep(speed)
        return;
    }

     if (stop.current || reset.current) {
        if (stop.current) setResumeIndex({ idxI: i, idxJ: null });
        if (reset.current) setResumeIndex({ idxI: 0, idxJ: null });
        await sleep(speed);
        return;
      }
  }

  setSearchIndex(-1);
  setIsActive(false);
  setResumeIndex({ idxI: 0, idxJ: null })
}

export default BinarySearch;