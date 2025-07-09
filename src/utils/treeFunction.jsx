import { useTreeContext } from "../context/treeContext";

export default function useTreeUtils(){
    const {setNodes,input,nodes} = useTreeContext();


    const getTree=()=>{
      const nodeValues = input.split(',').map((val)=>val)
       setNodes(nodeValues)
    }

    return{
        getTree
    }
}