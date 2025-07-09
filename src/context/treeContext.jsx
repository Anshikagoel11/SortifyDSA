import { createContext, useContext } from "react";
import { useState } from "react"

const TreeContext = createContext();

export const useTreeContext =()=> useContext(TreeContext)

export const TreeProvider = ({children})=>{

    const [input,setInput] = useState('');
    const [nodes,setNodes] = useState([]);

    return(
        <TreeContext.Provider
        value={{
            input,setInput,nodes,setNodes
        }}>
 {children}
        </TreeContext.Provider>
    )
}