import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AlgorithmsData from "../utils/data/algorithmsData";
import { Link } from "react-router-dom";


const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    }
  }
};

const item = {
  hidden: { y: 40, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function Algorithms() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="bg-[#0F172A] min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-[#E2E8F0] mb-2 sm:mb-3"
        >
          Explore <span className="text-sky-400">Algorithms</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base sm:text-lg text-slate-300 mb-10 sm:mb-16"
        >
          Interactive visualizations of various computer science algorithms
        </motion.p>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {AlgorithmsData.map((algo) => (
            <motion.div
              key={algo.title}
              className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-white/10 hover:border-sky-400/30 relative"
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-sky-900/20 to-indigo-900/20 text-right text-red-700 pr-3 pt-2 italic font-bold rou">{algo.note}</div>
              <div className="p-4 sm:p-5 relative overflow-hidden flex bg-gradient-to-br from-sky-900/20 to-indigo-900/20">
              
                <div className="p-2 sm:p-3 m-1 sm:m-2 flex items-center justify-center relative bg-sky-800/80 rounded-lg backdrop-blur-sm">
                  {algo.svg}
                </div>
                <div>
                  
                  <h2 className="text-xl sm:text-2xl font-semibold text-[#E2E8F0] mb-2 sm:mb-3 group-hover:text-sky-400 transition-colors duration-300">
                    {algo.title}
                    <span className="block w-6 sm:w-8 h-0.5 bg-sky-400 mt-1 sm:mt-2 group-hover:w-10 sm:group-hover:w-16 transition-all duration-500"></span>
                  </h2>
                </div>
              </div>

              <div className="p-5 sm:p-6 relative">
                <p className="text-sm sm:text-base text-slate-300 mb-4 sm:mb-6 group-hover:text-slate-200 transition-colors duration-300">
                  {algo.description}
                </p>
                <Link to={algo.path}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-lg text-sm sm:text-base font-medium hover:from-sky-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:shadow-sky-400/20 group-hover:-translate-y-0.5 flex items-center"
                  >
                    Visualize
                    <motion.svg
                      className="ml-2 w-3 h-3 sm:w-4 sm:h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </motion.svg>
                  </motion.button>
                </Link>
              </div>

              <div className="absolute top-0 right-0 w-2 h-2 sm:w-3 sm:h-3 bg-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <motion.div
                className="absolute -inset-1 bg-gradient-to-br from-white/15 via-transparent to-transparent rounded-xl pointer-events-none"
                initial={{ opacity: 0, x: "-100%" }}
                whileHover={{ opacity: 0.8, x: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}