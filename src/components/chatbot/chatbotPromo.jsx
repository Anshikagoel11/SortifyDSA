import { motion } from "framer-motion";
import { FaRobot, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ChatbotPromo() {
  const navigate = useNavigate();

  const handleChatbotClick = () => {
    navigate('/chatbot'); 
  };

  return (
    <div className="bg-[#0F172A]">
    <div className="  pt-10 pb-10 max-w-7xl mx-auto rounded">
      <motion.div 
        className="bg-[#1E293B] border border-gray-700/30 hover:border-blue-500/30 rounded-xl p-6 sm:p-8 relative overflow-hidden cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Chatbot icon */}
          <motion.div
            className="p-4 rounded-full bg-blue-500/20 flex-shrink-0"
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaRobot className="text-blue-400 text-3xl" />
          </motion.div>
          
          {/* Content */}
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 flex items-center">
              DSA Problem Solver AI
              <motion.span
                className="ml-2 w-4 h-0.5 bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ width: 0 }}
                whileHover={{ width: 24 }}
                transition={{ duration: 0.3 }}
              />
            </h3>
            
            <p className="text-gray-400 mb-4">
              Stuck on a data structure or algorithm problem? Our AI assistant can help explain concepts, 
              debug your code, and provide optimized solutions. Click to chat now!
            </p>
            
            <motion.button
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={handleChatbotClick}
            >
              Try the AI Assistant <FaArrowRight />
            </motion.button>
          </div>
          
          {/* Preview messages */}
          <div className="hidden lg:block flex-shrink-0 w-64">
            <div className="space-y-3">
              <motion.div
                className="bg-[#0F172A] p-3 rounded-lg rounded-bl-none text-sm text-white"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                viewport={{ infinite:true }}
              >
                "How Dijkstra's algorithm works?"
              </motion.div>
              <motion.div
                className="bg-blue-500/20 p-3 rounded-lg rounded-br-none text-sm text-white ml-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                viewport={{  infinite:true }}
              >
                "Which is best sorting technique?"
              </motion.div>
              <motion.div
                className="bg-[#0F172A] p-3 rounded-lg rounded-bl-none text-sm text-white "
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                viewport={{  infinite:true }}

              >
                "How elements stores in stack and queue"
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Hover effect elements */}
        <motion.div
          className="absolute top-0 left-0 w-1 h-1 bg-blue-500 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500"
          initial={{ y: -10, x: -10 }}
          whileHover={{ y: 0, x: 0 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-1 h-1 bg-blue-500 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500"
          initial={{ y: 10, x: 10 }}
          whileHover={{ y: 0, x: 0 }}
        />
      </motion.div>
    </div>
    </div>
  );
}