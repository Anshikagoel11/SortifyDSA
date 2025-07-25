import { motion } from "framer-motion";
import { FaCode, FaTools, FaMoon, FaLightbulb, FaBug ,FaRobot } from "react-icons/fa";

export default function FeaturesBox() {
  const features = [
    {
      icon: <FaCode className="text-blue-400 text-xl" />,
      title: "Interactive Code",
      description:
        "Step-by-step visualization with real-time code highlighting and execution tracking.",
      color: "blue",
    },
    {
      icon: <FaTools className="text-purple-400 text-xl" />,
      title: "Customizable Inputs",
      description:
        "Adjust array size, speed, and parameters to see different algorithm behaviors.",
      color: "purple",
    },
    {
      icon: <FaRobot className="text-blue-400 text-xl" />,
      title: "DSA AI Assistant",
      description:
        "Get instant help with algorithms, debug your code, and understand complex concepts with our intelligent chatbot.",
      color: "blue",
    },

    {
      icon: <FaLightbulb className="text-amber-400 text-xl" />,
      title: "Learning Mode",
      description:
        "Detailed explanations and tips at each step of the algorithm.",
      color: "amber",
    },
    {
      icon: <FaBug className="text-rose-400 text-xl" />,
      title: "Step-by-Step Debugger",
      description:
        "Pause, resume, and inspect every step of the algorithm just like a real debugger.",
      color: "rose",
    },
  ];

  return (
    <div className=" bg-[#0F172A] min-h-screen py-12 sm:py-16 px-8 sm:px-6 lg:px-8 ">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" max-w-7xl mx-auto text-3xl sm:text-4xl font-bold text-[#E2E8F0]"
      >
        <span className="text-sky-400">Features</span> You Get!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-base sm:text-lg text-slate-300 mb-10 sm:mb-16"
      >
        Detailed explanations and tips appear at each step to help you truly
        understand the logic.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="bg-[#1E293B]/50 p-4 rounded-xl border border-gray-700/30 hover:border-blue-500/30 transition-all relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Gradient background overlay */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            {/* Feature icon */}
            <motion.div
              className={`p-3 rounded-full bg-${feature.color}-500/20 mb-2 inline-flex`}
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {feature.icon}
            </motion.div>

            {/* Feature title */}
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
              {feature.title}
              <motion.span
                className="ml-2 w-4 h-0.5 bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ width: 0 }}
                whileHover={{ width: 24 }}
                transition={{ duration: 0.3 }}
              />
            </h3>

            {/* Feature description */}
            <motion.p
              className="text-gray-400 text-sm"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {feature.description}
            </motion.p>

            {/* Hover effect elements */}
            <motion.div
              className="absolute top-0 left-0 w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ y: -10, x: -10 }}
              whileHover={{ y: 0, x: 0 }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ y: 10, x: 10 }}
              whileHover={{ y: 0, x: 0 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
