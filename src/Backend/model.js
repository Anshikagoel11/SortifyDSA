import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Initialize Gemini with NEW API (v1)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// DSA Mentor System Prompt
const prompt = `
You are a helpful, friendly, and knowledgeable Data Structures and Algorithms (DSA) mentor.

- Explain using simple language
- Use analogies and examples
- Add time/space complexity when useful
- Provide C++, JS, or Python code when needed
- Encourage the student

If user asks non-DSA things:
Reply once that this assistant is dedicated to DSA learning.
Do not repeat this warning again.
`;

app.post('/gemini/askDoubt', async (req, res) => {
  const { messages } = req.body;

  if (!messages || messages.length === 0) {
    return res.status(400).send('No input provided.');
  }

  try {
    // Use correct model (latest SDK)
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',   // ✅ correct model for v1 API
    });

    // Prepare streaming response
    const result = await model.generateContentStream({
      systemInstruction: prompt,
      contents: messages, // messages must be [{role, parts}] – your frontend already sends correctly
    });

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) res.write(text);
    }

    res.end();
  } catch (error) {
    console.error('Error streaming response:', error);
    res.status(500).send('Something went wrong. Please try again!');
  }
});
