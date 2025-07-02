import { createContext, useContext, useState, useRef } from "react";

const SortingContext = createContext();

export const useSorting = () => useContext(SortingContext);

export const SortingProvider = ({ children }) => {
  const [arraySize, setArraySize] = useState(8);
  const [customArray, setCustomArray] = useState("");
  const [bars, setBars] = useState([30, 80, 45, 90, 20, 60, 75, 40]);
  const [compareInfo, setCompareInfo] = useState({
    smaller: null,
    larger: null,
  });
  const [sorting, setSorting] = useState("Bubble Sort");
  const [speed, setSpeed] = useState(3);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasReset, setHasReset] = useState(false);

  const stopSorting = useRef(false);
  const reset = useRef(false);


  return (
    <SortingContext.Provider
      value={{
        arraySize,
        setArraySize,
        customArray,
        setCustomArray,
        bars,
        setBars,
        compareInfo,
        setCompareInfo,
        speed,
        setSpeed,
        isActive,
        setIsActive,
        isPaused,
        setIsPaused,
        hasReset,
        setHasReset,
        stopSorting,
        reset,
        sorting,
        setSorting,
      }}
    >
      {children}
    </SortingContext.Provider>
  );
};
