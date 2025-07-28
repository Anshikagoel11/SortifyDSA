import { UseAlgoControl } from "../context/algoControlContext";
import { useRef, useEffect } from "react";

export default function useSlidingWindowUtils() {
  const {
    inputArray,
    setArray,
    windowSize,
    setTip,
    array,
    setCurrentWindow,
    setCurrentSum,
    setMaxSum,
    animateSpeed,
    setMaxSumRange,
    showLine,
    setShowLine,
    setActive,
    setPause,
    stopSlidingWindow,
    isReset,
  } = UseAlgoControl();

  // Track animation state
  const animationRef = useRef(null);
  const currentIndex = useRef(0);
  const currentMaxSum = useRef(-Infinity);
  const currentMaxRange = useRef([-1, -1]);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  const ApplyArray = () => {
    // Reset all states
    setShowLine(false);
    setMaxSumRange([-1, -1]);
    setCurrentWindow({ start: -1, end: -1 });
    setCurrentSum(0);
    setMaxSum(-Infinity);
    setPause(false);
    setActive(false);
    currentIndex.current = 0;
    currentMaxSum.current = -Infinity;
    currentMaxRange.current = [-1, -1];

    // Validate window size
    const size = Number(windowSize);
    const arrayLength = inputArray ? inputArray.split(",").length : array.length;
    
    if (isNaN(size) || size <= 0 || size > arrayLength) {
      setTip(true);
      setTimeout(() => setTip(false), 2000);
      return;
    }

    // Use input array if provided
    if (inputArray) {
      const nums = inputArray.split(",").map(n => parseInt(n.trim()));
      if (nums.every(n => !isNaN(n))) {
        setArray(nums);
      }
    }
  };

  const handleStart = async () => {
    if (array.length === 0 || windowSize <= 0) return;
    
    // Reset states
    setCurrentSum(0);
    setMaxSum(-Infinity);
    setPause(false);
    setShowLine(false);
    setMaxSumRange([-1, -1]);
    isReset.current = false;
    stopSlidingWindow.current = false;
    currentIndex.current = 0;
    currentMaxSum.current = -Infinity;
    currentMaxRange.current = [-1, -1];
    
    // Start animation
    setActive(true);
    await animateSlidingWindow();
  };

  const handlePauseResume = () => {
    if (stopSlidingWindow.current) {
      // Resume
      stopSlidingWindow.current = false;
      setPause(false);
      animateSlidingWindow();
    } else {
      // Pause
      stopSlidingWindow.current = true;
      setPause(true);
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    }
  };

  const handleReset = () => {
    // Stop any ongoing animation
    stopSlidingWindow.current = true;
    isReset.current = true;
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    
    // Reset all states
    setPause(false);
    setCurrentWindow({ start: -1, end: -1 });
    setCurrentSum(0);
    setMaxSum(-Infinity);
    setMaxSumRange([-1, -1]);
    setShowLine(false);
    setActive(false);
    currentIndex.current = 0;
    currentMaxSum.current = -Infinity;
    currentMaxRange.current = [-1, -1];
  };

  const animateSlidingWindow = async () => {
    if (isReset.current || stopSlidingWindow.current) return;
    
    const arr = [...array];
    const k = Number(windowSize);
    const speed = (21 - animateSpeed) * 50;
    
    // Calculate first window if starting fresh
    if (currentIndex.current === 0) {
      let windowSum = 0;
      for (let i = 0; i < k; i++) {
        windowSum += arr[i];
      }
      
      currentMaxSum.current = windowSum;
      currentMaxRange.current = [0, k - 1];
      
      setCurrentWindow({ start: 0, end: k - 1 });
      setCurrentSum(windowSum);
      setMaxSum(windowSum);
      
      currentIndex.current = k;
      await delay(speed);
    }

    // Slide the window
    for (let i = currentIndex.current; i < arr.length; i++) {
      if (isReset.current || stopSlidingWindow.current) return;

      const windowSum = calculateWindowSum(arr, i, k);
      const start = i - k + 1;
      const end = i;

      setCurrentWindow({ start, end });
      setCurrentSum(windowSum);

      if (windowSum > currentMaxSum.current) {
        currentMaxSum.current = windowSum;
        currentMaxRange.current = [start, end];
        setMaxSum(windowSum);
      }

      currentIndex.current = i + 1;
      await delay(speed);
    }

    // Animation complete
    if (!isReset.current) {
      setMaxSumRange(currentMaxRange.current);
      setShowLine(true);
      setActive(false);
      setCurrentWindow({ start: -1, end: -1 });
    }
  };

  const calculateWindowSum = (arr, end, k) => {
    let sum = 0;
    for (let i = end - k + 1; i <= end; i++) {
      sum += arr[i];
    }
    return sum;
  };

  const getRandomArray = () => {
    const randomArray = Array.from({ length: 9 }, () => 
      Math.floor(Math.random() * 60 + 2)
    );
    setArray(randomArray);
    handleReset(); // Reset all states when generating new array
  };

  return {
    ApplyArray,
    handleStart,
    handlePauseResume,
    handleReset,
    getRandomArray,
  };
}