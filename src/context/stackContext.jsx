import { createContext, useContext, useState } from "react";

// 1. Create context
const StackContext = createContext();

// 2. Custom hook for easy access
export const useStackContext = () => useContext(StackContext);

// 3. Properly named and capitalized provider
export const StackProvider = ({ children }) => {
  const [input, setInput] = useState("");

  return (
    <StackContext.Provider value={{ input, setInput }}>
      {children}
    </StackContext.Provider>
  );
};
