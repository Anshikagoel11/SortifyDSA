import { createContext, useContext, useState, useRef } from "react";

const AlgoControlContext = createContext();

export const UseAlgoControl = () => useContext(AlgoControlContext);

export const AlgoControlProvider = ({ children }) => {
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
  const [resumeIndex, setResumeIndex] = useState({ idxI: 0, idxJ: 0 });
  const stop = useRef(false);
  const reset = useRef(false);

  
  //searching context
  const [searchingName, setSearchingName] = useState("Linear Search");
  const [searchInput, setSearchInput] = useState("");  // for showing input value
  const [searchIndex,setSearchIndex]=useState(-1);   // index of searched value 
  const [currentCompare , setCurrentCompare] = useState(-1);
  const [IsElementFound ,setIsElementFound] = useState(false);



  return (
    <AlgoControlContext.Provider
      value={{
        IsElementFound,
        setIsElementFound,
        currentCompare,
        setCurrentCompare,
        searchIndex,
        setSearchIndex,
        searchInput,
        setSearchInput,
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
        stop,
        reset,
        sorting,
        setSorting,
        resumeIndex,
        setResumeIndex,
        searchingName,
        setSearchingName,
      }}
    >
      {children}
    </AlgoControlContext.Provider>
  );
};
