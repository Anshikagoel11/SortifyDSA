import { GoogleGenAI } from "@google/genai";
import  readlineSync from 'readline-sync';


const ai = new GoogleGenAI({apiKey:"AIzaSyCP8RFSjo7OtsWIa2sH0l-2FXG3oNqTdvo"});

const prompt = `
You are a friendly and knowledgeable mentor who helps users with Data Structures and Algorithms (DSA) topics only.

If a question is clearly unrelated to DSA (like personal, career, or non-technical topics), politely respond **once** that this platform is strictly for DSA help and suggest they focus on those topics.

Avoid repeating the same warning multiple times. If users return with valid DSA questions, assist them thoroughly. Always explain DSA concepts clearly, with helpful examples and practical understanding — suitable for beginners and intermediate learners. Keep replies natural, engaging, and concise.
`

let history=[];

async function main() {
  const response = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: history,
    config: {
      systemInstruction:prompt,
    },
  });


  let fullResponse = '';
 

  for await (const chunk of response) {
    //since response is streaming
    fullResponse += chunk.text;
    console.log(chunk.text);
  }

    //store response to history
   history.push({
    role:'model',
    parts:[{text:fullResponse}]
  })
  console.log()
}


async function input(){
  const userQuestion = readlineSync.question('\n what you want to ask? ask me!');

  //add userQuestion into history
  history.push({
    role:"user",
    parts:[{text:userQuestion}]
  })
  //call function
  await main();
  input();
}

input();

