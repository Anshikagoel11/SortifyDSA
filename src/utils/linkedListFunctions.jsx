import { UseAlgoControl } from "../context/algoControlContext";

export default function useLinkedListUtils() {
  const {
    list,
    setShowTooltip,
    valueAtStart,
    valueAtEnd,
    setValueAtEnd,
    setList,
    setValueAtStart,
    setHighlightNode,
    SetHighlightColor,
    valueToDelete,
    setHighlightColor,
    setIsAnimating,
    animationRef,
    setValueToDelete,
    index,
    setIndex,
    valueAtPosition,
    setValueAtPosition,
    searchValue,
    setSearchValue,
    setFoundStatus,
    inValidIndex,
    setInValidIndex,
    valueDelete,
    setValueDelete,
    setCurrentIndex,
  } = UseAlgoControl();

  const handelAtStart = ({ position }) => {
    //if no input
    if (valueAtStart === "") {
      setShowTooltip(position);
      setTimeout(() => setShowTooltip(null), 2000); //remove tooltip after 2 sec
      return;
    }

    setList([valueAtStart, ...list]);
    setHighlightNode(0);
    setHighlightColor("bg-green-500");
    setTimeout(() => setHighlightNode(-1), 1000);
    setValueAtStart("");
  };

  const handelAtEnd = ({ position }) => {
    if (valueAtEnd === "") {
      setShowTooltip(position);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }
    setList([...list, valueAtEnd]);
    setHighlightNode(list.length);
    setHighlightColor("bg-green-500");
    setTimeout(() => setHighlightNode(-1), 1000);
    setValueAtEnd("");
  };

  const handelAtPosition = ({ position }) => {
    //if invalid index
    if (index < 0 || index >= list.length) {
      setInValidIndex(true);
      setTimeout(() => setInValidIndex(false), 2000);
      setValueAtPosition("");
      return;
    }

    //if index by user is not valid
    if (index === "" || valueAtPosition === "") {
      setShowTooltip(position);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }

    const updatedList = list.flatMap((val, i) => {
      //flatmap list ko expand karta hai by inserting multiple values, shifting rest to the right.
      if (i === Number(index)) return [valueAtPosition, val]; // insert both
      return [val];
    });

    setList(updatedList);
    setHighlightNode(Number(index));
    setHighlightColor("bg-green-500");
    setTimeout(() => setHighlightNode(-1), 1000);
    setValueAtPosition("");
    setIndex("");
  };

  const handelDeleteValue = ({ position }) => {
    if (valueToDelete === "") {
      setShowTooltip(position);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }

    const deleteIndex = list.findIndex((val) => val === Number(valueToDelete));

    if (deleteIndex !== -1) {
      setHighlightNode(deleteIndex);
      setHighlightColor("bg-red-500");
      // Wait for 1 second to show highlight, then update the list
      setTimeout(() => {
        const updatedList = list.filter((_, index) => index !== deleteIndex);
        setList(updatedList);
        setHighlightNode(-1);
        setValueToDelete("");
      }, 1000);
    } else {
      setValueDelete(true);
      setTimeout(() => setValueDelete(false), 2000);
      setValueToDelete("");
    }
  };

  const handelDeleteAt = ({ position }) => {
    if (index === "") {
      setShowTooltip(position);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }

    const idx = Number(index);
    if (idx < 0 || idx >= list.length) {
      setInValidIndex(true);
      setTimeout(() => setInValidIndex(false), 2000);
      setIndex("");
      return;
    }

    setHighlightNode(idx);
    setHighlightColor("bg-red-500");
    // Wait for 1 second to show highlight, then update the list
    setTimeout(() => {
      const updatedList = list.filter((_, ind) => ind !== idx);
      setList(updatedList);
      setHighlightNode(-1);
      setIndex("");
    }, 1000);
  };

  const handleSearch = async () => {
    if (searchValue === "") {
      setShowTooltip("search");
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }

    // stop any running animation and its clean-up timers
    clearInterval(animationRef.current);
    animationRef.current = null;

    const target = Number(searchValue); 
    setIsAnimating(true);
    setHighlightColor("bg-yellow-400");
    setFoundStatus("idle");
    setCurrentIndex(0); 
    setHighlightNode(0);

    let idx = 0;
    let found = false;

    const tick = () => {
      if (idx >= list.length) {
        // not found branch
        setHighlightNode(-1);
        setFoundStatus("not_found");
        setCurrentIndex(-1);

        animationRef.timeout1 = setTimeout(() => {
          setFoundStatus("idle");
          setIsAnimating(false);
        }, 2000);
        return;
      }

      setCurrentIndex(idx);
      setHighlightNode(idx);

      if (list[idx] === target) {
        found = true;
        setFoundStatus("found");
        setHighlightColor("bg-green-500");

        animationRef.timeout1 = setTimeout(() => setHighlightNode(-1), 1000);
        animationRef.timeout2 = setTimeout(() => {
          setFoundStatus("idle");
          setIsAnimating(false);
          setCurrentIndex(-1);
        }, 2000);
        return;
      }

      idx++;
      animationRef.current = setTimeout(tick, 700); // smoother than setInterval
    };

    tick();
    setSearchValue(""); // or move into the last timeout if you prefer
  };

  const handelTraverse = () => {

    // stop any running animation and its clean-up timers
    clearInterval(animationRef.current);
    animationRef.current = null;


    setIsAnimating(true);
    setHighlightColor("blue");
    let currentIndex = 0;

    const traverseInterval = setInterval(() => {
      if (currentIndex >= list.length) {
        clearInterval(traverseInterval);
        setTimeout(() => {
          setHighlightNode(-1);
          setIsAnimating(false);
        }, 500);
        return;
      }
      setHighlightNode(currentIndex);
      setHighlightColor("bg-yellow-500");
      currentIndex++;
    }, 800);

    animationRef.current = traverseInterval;
  };

  const generateRandomList = () => {
    const updatedList = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 100)
    );
    setList(updatedList);
  };

  const clearList = () => {
    setList([]);
  };

  return {
    handelAtStart,
    handelAtEnd,
    handelAtPosition,
    handelDeleteValue,
    handelDeleteAt,
    handleSearch,
    handelTraverse,
    generateRandomList,
    clearList,
  };
}
