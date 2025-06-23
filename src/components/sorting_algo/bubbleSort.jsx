const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const bubbleSort = async (arr, setBars, setCompareInfo, speed) => {
  const array = [...arr];  //necessary to copy since in js - array & obj passes by refernce by default , so if we dont copy and  start working on real array then react can show unpredictable behaviour like - no update in UI , improper update

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        setCompareInfo({smaller:j+1,larger:j})
}else{
     setCompareInfo({smaller:j,larger:j+1})
}
await sleep(speed);
        // swap
        if(array[j]>array[j+1]){
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        setBars([...array]); // update UI
        await sleep(speed);
        }

        // setCompareInfo({smaller:null,larger:null})
      
    }
  }
};
export default bubbleSort;