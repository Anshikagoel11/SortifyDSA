
import { useStackContext } from "../context/stackContext";


export default function useStackUtils() {
  

  const {input,stack,setStack,setInput,setPop,top,setTop} = useStackContext()

const sleep = (ms)=> new Promise((resolve) => setTimeout(resolve,ms) );

  const pushToStack = () => {
    if (!input.trim()) return; // don't allow empty
    // setStack([...stack, input]); not using since not sure ki instant state update ho jeygi ya nhi
    setStack((prev) => [...prev, input]);
    // console.log("instant",stack)  //prev stack print kregi kyuki state set krte hi print kra rhe h toh vo ekdm update nhi  hote , useEffect m print kra rhe h toh shi ho rha h
    setInput(""); // clear input after push
  };


  const popFromStack= async()=>{
    if(stack.length===0) return;

  setPop(stack.length-1);
  await sleep(300);

//  const updatedStack =  stack.pop()  not uses since pop make changes in a original array and take cause issue in re-rendering and if we use pop then give array by spread - [...newArray] bcoz that create a referce still it is risky since original array is changed 
//pop returns last element
  const updatedStack = stack.slice(0,-1);  //creates a new array with the last element removed
  setStack(updatedStack);
  setPop(-1)
  }

  const topOfStack = async ()=>{
  if(stack.length===0) return;
  setTop(stack.length-1);
  await sleep(600);
setTop(-1);
  }


  const emptyStack=()=>{
  setStack([]);
  }

  
  return {
    pushToStack,
    popFromStack,
    topOfStack,
    emptyStack
  };
}
