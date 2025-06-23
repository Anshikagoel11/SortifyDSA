import { motion } from "framer-motion";

export default function Sorting_navBar({ sorting }) {
  return (
    <div className="mb-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-2xl font-bold mb-1">
          {sorting}
        </h1>
        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </motion.div>
    </div>
  );
}