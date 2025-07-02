import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-[#0F172A]">
      <motion.div
        className="text-center text-gray-400 text-base p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1 }}
      >
        <p>Built with passion, pixels, and coffee by <span className="text-blue-400">Anshika Goel</span>  ☕✨</p>

        <div className="flex justify-center space-x-6 mt-4 text-xl text-white/80">
          <span>
            <a
              href="https://www.linkedin.com/in/anshika-goel-25b537314/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="hover:text-blue-400  text-white transition" />
            </a>
          </span>
          <span>
            <a
              href="https://x.com/Anshiiiiii11"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="hover:text-sky-400  text-white transition" />
            </a>
          </span>
          <span>
            <a
              href="https://github.com/Anshikagoel11"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="hover:text-gray-600  text-white transition" />
            </a>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
