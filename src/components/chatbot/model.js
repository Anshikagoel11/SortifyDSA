import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 2000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Initialize the Gemini AI model
const genAI = new GoogleGenerativeAI('AIzaSyDueABzFn9axMYT5NxzN8eyflO7CntgziQ');

// Define the prompt for DSA mentor
const prompt = `
You are a helpful, friendly, and knowledgeable Data Structures and Algorithms (DSA) mentor.

✅ Your primary goal is to explain DSA concepts clearly with:
- Simple definitions
- Real-life analogies
- Code examples (in JavaScript, C++, or Python if needed)
- Time and space complexities
- When and where to use the concept in real-world scenarios

🚫 If the user asks a non-DSA question:
- Gently reply **once** that this assistant is dedicated to DSA learning.
- Politely encourage them to refocus on DSA topics.
- Do not repeat this warning again. Just respond with silence or redirection.

🎯 Keep your tone encouraging, like a mentor guiding a student.
🎯 Avoid sounding robotic or repetitive.
🎯 Be concise but thorough.
🎯 Use simple language suitable for beginners and intermediate learners.
`;

app.post('/gemini/askDoubt', async (req, res) => {
  const { messages } = req.body;

  if (!messages || messages.length === 0) {
    return res.status(400).send('No input provided.');
  }

  try {
    //config gemini
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const stream = await model.generateContentStream({
      contents: messages,
      systemInstruction: { role: "system", parts: [{ text: prompt }] }, 
    });

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    for await (const chunk of stream.stream) {
      if (chunk.text()) {
        res.write(chunk.text());
      }
    }

    res.end();
  } catch (error) {
    console.error('Error streaming response:', error);
    res.status(500).send('Something went wrong. Please try again!');
  }
});

