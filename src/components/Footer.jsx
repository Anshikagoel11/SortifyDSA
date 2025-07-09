import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router";

export default function Footer() {
  return (
    <div className="bg-[#0F172A] border-t border-gray-800">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand info */}
          <div className="space-y-4">
            <motion.h3 
              className="text-2xl font-bold text-white"
              whileHover={{ scale: 1.05 }}
            >
              Sortify<span className="text-blue-400">DSA</span>
            </motion.h3>
            <p className="text-gray-400">
              Interactive Data Structures and Algorithms visualizer to help you understand complex concepts through visualization.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <Link to={'/'}> <li>
                <h1 className="hover:text-blue-400 transition">Home</h1>
              </li></Link>
               <Link to={'/'}> <li>
                <h1 className="hover:text-blue-400 transition">Algorithms</h1>
              </li></Link>
               <Link to={'/sorting/bubble-sort'}> <li>
                <h1 className="hover:text-blue-400 transition">Visualizer</h1>
              </li></Link>
            
              <li>
              </li>
            </ul>
          </div>

          {/* Connect with me */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect With Me</h4>
            <div className="flex space-x-6 text-xl">
              <motion.a
                href="https://www.linkedin.com/in/anshika-goel-25b537314/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="text-white hover:text-blue-400 transition"
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                href="https://x.com/Anshiiiiii11"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="text-white hover:text-sky-400 transition"
              >
                <FaTwitter />
              </motion.a>
              <motion.a
                href="https://github.com/Anshikagoel11"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="text-white hover:text-gray-600 transition"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="mailto:anshikadevv10@gmail.com"
                whileHover={{ y: -2 }}
                className="text-white hover:text-red-400 transition"
              >
                <FaEnvelope />
              </motion.a>
            </div>
            <p className="text-gray-400">
              Have feedback? <a href="mailto:anshikadevv10@gmail.com" className="text-blue-400 hover:underline">Email me</a>!
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <motion.p 
            className="text-gray-400"
            whileHover={{ scale: 1.02 }}
          >
            Made with <FaHeart className="inline text-red-500" /> by{" "}
            <a 
              href="https://www.linkedin.com/in/anshika-goel-25b537314/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Anshika Goel
            </a>
          </motion.p>
          <p className="text-gray-500 text-sm mt-2">
            © {new Date().getFullYear()} SortifyDSA. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
}