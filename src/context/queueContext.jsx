import { createContext, useContext, useState } from "react";

// 1. Create context
const QueueContext = createContext();

// 2. Custom hook for easy access
export const useQueueContext = () => useContext(QueueContext);

// 3. Properly named and capitalized provider
export const QueueProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [input, setInput] = useState('');
 const [front,setFront] = useState(-1);
 const [pop,setPop] = useState(-1);
  return (
    <QueueContext.Provider
      value={{
        queue,
        setQueue,
        input,
        setInput,
        front,
        setFront,
        pop,
        setPop
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};
