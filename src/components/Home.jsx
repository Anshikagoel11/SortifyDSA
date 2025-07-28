import Algorithms from "./Algorithms"
import Headers from "./Headers"
import FeaturesBox from "./Features"
import ChatbotPromo from "./chatbot/chatbotPromo"

export default function Home(){
    return(
        <>
          <Headers/>
        <FeaturesBox/> 
        <ChatbotPromo/> 
          <Algorithms/>
        </>
      
    )
}