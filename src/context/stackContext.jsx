import { createContext, useContext, useState } from "react";

// 1. Create context
const StackContext = createContext();

// 2. Custom hook for easy access
export const useStackContext = () => useContext(StackContext);

// 3. Properly named and capitalized provider
export const StackProvider = ({ children }) => {
  const [stack, setStack] = useState([]);
  const [input, setInput] = useState('');
 const [pop,setPop] = useState(-1);
 const [top,setTop] = useState(-1);
  return (
    <StackContext.Provider
      value={{
        stack,
        setStack,
        input,
        setInput,
        pop,
        setPop,
        top,
        setTop
      }}
    >
      {children}
    </StackContext.Provider>
  );
};
