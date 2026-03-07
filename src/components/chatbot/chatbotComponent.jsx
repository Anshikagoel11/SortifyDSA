import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaRobot, FaUser, FaRegLightbulb } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import cleanChunk from "../../utils/cleanChunks";

const QUICK_QUESTIONS = [
  "Explain Dijkstra's algorithm",
  "Time complexity of quicksort?",
  "BFS vs DFS difference",
];

export default function ChatBot() {
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickTips, setShowQuickTips] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [history, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!userInput.trim() || isLoading) return;
    setShowQuickTips(false);

    const userMessage = { role: "user", parts: [{ text: userInput }] };
    const updatedHistory = [...history, userMessage];
    setHistory(updatedHistory);
    setUserInput("");
    setIsLoading(true);

    try {
      let currentModelResponse = { role: "model", parts: [{ text: "" }] };
      setHistory((prevHistory) => [...prevHistory, currentModelResponse]);

      const response = await fetch(`https://sortifychatbot-server-f5ih.onrender.com/gemini/askDoubt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedHistory }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        let chunk = decoder.decode(value, { stream: true });
        chunk = cleanChunk(chunk);
        result += chunk;

        setHistory((prevHistory) => {
          const newHistory = [...prevHistory];
          const lastMessageIndex = newHistory.length - 1;
          if (newHistory[lastMessageIndex].role === "model") {
            newHistory[lastMessageIndex].parts[0].text = result;
          }
          return newHistory;
        });

        if (Math.random() > 0.7) scrollToBottom();
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setHistory((prev) => [
        ...prev,
        {
          role: "model",
          parts: [{ text: "Sorry, I encountered an error. Please try again." }],
        },
      ]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const handleQuickQuestion = (question) => {
    setUserInput(question);
    inputRef.current.focus();
  };

  return (
    <div className="bg-[#0F172A] min-h-screen p-3 md:p-4 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 mb-3 md:mb-4 mx-auto w-full max-w-3xl"
      >
        <motion.div
          className="p-2 md:p-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.05, 1.05, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <FaRobot className="text-white text-xl md:text-2xl" />
        </motion.div>
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-white">DSA AI Assistant</h2>
          <p className="text-xs md:text-sm text-gray-400">Ask me about DSA concepts</p>
        </div>
      </motion.div>

      {/* Chat container */}
      <div className="flex-1 mb-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 w-full max-w-3xl mx-auto">
        <AnimatePresence>
          {history.length === 0 && showQuickTips && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-4 px-2"
            >
              <div className="mb-3">
                <FaRobot className="inline-block text-4xl md:text-5xl text-blue-400/30 animate-pulse" />
              </div>
              <h3 className="text-gray-400 font-medium text-base md:text-lg mb-1">
                How can I help you today?
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mb-3">
                Ask about algorithms, time complexity, or debugging
              </p>

              {/* Quick question suggestions - centered with content width */}
              <div className="flex flex-col items-center gap-2 px-2">
                {QUICK_QUESTIONS.map((question, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#1E293B]/50 border border-gray-700/30 rounded-lg p-2 cursor-pointer w-auto max-w-full"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    <div className="flex items-center gap-2 text-blue-400">
                      <FaRegLightbulb className="text-sm md:text-base flex-shrink-0" />
                      <span className="text-xs md:text-sm text-gray-300 whitespace-normal">
                        {question}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {history.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} px-1 mb-2`}
            >
              <div
                className={`max-w-[90%] md:max-w-[80%] rounded-lg p-3 ${
                  msg.role === "user"
                    ? "bg-blue-500/10 border border-blue-500/20 rounded-br-none"
                    : "bg-[#1E293B] border border-gray-700/50 rounded-bl-none"
                }`}
              >
                <div className="flex items-center gap-1 mb-1">
                  {msg.role === "user" ? (
                    <FaUser className="text-blue-400 text-sm md:text-base" />
                  ) : (
                    <FaRobot className="text-indigo-400 text-sm md:text-base" />
                  )}
                  <span className="font-medium text-xs md:text-sm text-gray-300 capitalize">
                    {msg.role}
                  </span>
                </div>
                <p className="text-gray-100 text-sm md:text-base whitespace-pre-wrap">
                  {msg.parts[0].text}
                </p>

                {index === history.length - 1 && msg.role === "model" && (
                  <motion.div className="flex justify-end mt-1">
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full"
                          animate={{
                            y: [0, -2, 0],
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div className="flex justify-start px-1 mb-2">
              <div className="max-w-[90%] md:max-w-[80%] rounded-lg rounded-bl-none bg-[#1E293B] border border-gray-700/50 p-3">
                <div className="flex items-center gap-1 mb-1">
                  <FaRobot className="text-indigo-400 text-sm md:text-base" />
                  <span className="font-medium text-xs md:text-sm text-gray-300">model</span>
                </div>
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full"
                      animate={{
                        y: [0, -3, 0],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} className="h-2" />
        </AnimatePresence>
      </div>

      {/* Input area */}
      <motion.div className="sticky bottom-0 bg-[#0F172A]/90 backdrop-blur-sm pt-2 pb-1 px-1 w-full max-w-3xl mx-auto">
        <div className="flex gap-1">
          <div className="flex-1">
            <input
              ref={inputRef}
              className="w-full bg-[#1E293B] border border-gray-700/50 rounded-lg px-3 py-2 text-sm md:text-base text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask your DSA doubt..."
              disabled={isLoading}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
          </div>
          <motion.button
            className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-2 md:p-3 rounded-lg flex items-center justify-center"
            onClick={sendMessage}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IoIosSend className="text-lg md:text-xl" />
          </motion.button>
        </div>
        <p className="text-[0.6rem] md:text-xs text-gray-500 mt-1 text-center">
          Try: binary trees, sorting algorithms, or debugging
        </p>
      </motion.div>
    </div>
  );
}