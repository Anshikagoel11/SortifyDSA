import { createContext, useContext } from "react";
import { useState } from "react"

const TreeContext = createContext();

export const useTreeContext =()=> useContext(TreeContext)

export const TreeProvider = ({children})=>{

    const [input,setInput] = useState('');
    const [nodes,setNodes] = useState([10,20,30,40,50,60,70]);

    return(
        <TreeContext.Provider
        value={{
            input,setInput,nodes,setNodes
        }}>
 {children}
        </TreeContext.Provider>
    )
}