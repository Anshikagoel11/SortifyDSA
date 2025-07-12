import { motion } from "framer-motion";

export default function AlgorithmButton({ item, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        y: -4,
        scale: 1.02,
        boxShadow: "0 8px 20px -8px rgba(56, 182, 255, 0.4)",
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`
        relative w-full text-left px-2 py-3 rounded-xl transition-all
        ${isActive ? "text-white" : "text-white/80 hover:text-white"}
        overflow-hidden border mb-2
        ${
          isActive
            ? "border-blue-400/50"
            : "border-gray-600/30 hover:border-blue-400/30"
        }
      `}
    >
      <motion.div
        className="absolute inset-0 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isActive ? 1 : 0.7,
          background: isActive
            ? "linear-gradient(135deg, rgba(56, 182, 255, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%)"
            : "linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.7) 100%)",
        }}
        transition={{ duration: 0.4 }}
      />

      {isActive && (
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.2 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20],
                opacity: [0.8, 0],
                scale: [1, 0.5],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>
      )}

      {isActive && (
        <motion.div
          className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent "
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "linear",
          }}
        />
      )}

      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none "
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(56, 182, 255, 0.3)",
              "0 0 0 6px rgba(56, 182, 255, 0.1)",
              "0 0 0 0 rgba(56, 182, 255, 0)",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeOut",
          }}
        />
      )}

      <div className="relative z-10 flex items-center ">
        <motion.div
          className={`h-2 w-2 rounded-full mr-3 ${
            isActive ? "bg-blue-400" : "bg-gray-500"
          }`}
          animate={{
            scale: isActive ? [1, 1.4, 1] : 1,
            opacity: isActive ? [0.8, 1, 0.8] : 0.7,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="flex-1 ">
          <span className="font-medium block">{item}</span>
          <motion.span
            className="text-xs text-gray-400 block mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.2 }}
          >
            {isActive ? "Currently visualizing" : "Click to visualize"}
          </motion.span>
        </div>

        {isActive && (
          <motion.div
            className="ml-4"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}