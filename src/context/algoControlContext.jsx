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
  const [hasReset, setHasReset] = useState(true);
  const [resumeIndex, setResumeIndex] = useState({ idxI: 0, idxJ: 0 });
  const stop = useRef(false);
  const reset = useRef(false);

  //searching states
  const [searchingName, setSearchingName] = useState("Linear Search");
  const [searchInput, setSearchInput] = useState(""); // for showing input value
  const [searchIndex, setSearchIndex] = useState(-1); // index of searched value
  const [currentCompare, setCurrentCompare] = useState(-1);
  const [IsElementFound, setIsElementFound] = useState(false);
  const [IsSearchDone, setIsSearchDone] = useState(false);
  const rangeRef = useRef({ start: -1, end: -1 });
  const [rangeVersion, setRangeVersion] = useState(0);

  //linked list
  const [list, setList] = useState([10, 20, 32, 40, 50, 22, 21]);
  const [highlightNode, setHighlightNode] = useState(-1);
  const [highlightColor, setHighlightColor] = useState("bg-blue-500/60");
  const [showTooltip, setShowTooltip] = useState(null);
  const [valueAtStart, setValueAtStart] = useState("");
  const [valueAtEnd, setValueAtEnd] = useState("");
  const [valueAtPosition, setValueAtPosition] = useState("");
  const [index, setIndex] = useState("");
  const [valueToDelete, setValueToDelete] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [foundStatus, setFoundStatus] = useState("idle");
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);
  const [inValidIndex, setInValidIndex] = useState(false);
  const [valueDelete, setValueDelete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);

  return (
    <AlgoControlContext.Provider
      value={{
        valueDelete,
        currentIndex,
        setCurrentIndex,
        setValueDelete,
        foundStatus,
        setFoundStatus,
        inValidIndex,
        setInValidIndex,
        highlightColor,
        setHighlightColor,
        highlightNode,
        setHighlightNode,
        
        searchValue,
        setSearchValue,
        isAnimating,
        setIsAnimating,
        animationRef,
        valueToDelete,
        setValueToDelete,
        index,
        setIndex,
        valueAtPosition,
        setValueAtPosition,
        valueAtEnd,
        setValueAtEnd,
        valueAtStart,
        setValueAtStart,
        showTooltip,
        setShowTooltip,
        list,
        setList,
        setRangeVersion,
        rangeRef,
        IsSearchDone,
        setIsSearchDone,
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
