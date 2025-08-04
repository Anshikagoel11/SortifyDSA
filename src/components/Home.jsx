import Algorithms from "./Algorithms"
import Headers from "./Headers"
import FeaturesBox from "./Features"
import ChatbotPromo from "./chatbot/chatbotPromo"
import { useRef } from "react"

export default function Home(){

  const scrollRef = useRef(null);

    return(
        <>
          <Headers scrollToRef={scrollRef} />
        <FeaturesBox/> 
        <ChatbotPromo/> 
          <Algorithms sectionRef={scrollRef}/>
        </>
      
    )
}