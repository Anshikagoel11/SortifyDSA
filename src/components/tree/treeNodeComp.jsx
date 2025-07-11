import { motion } from "framer-motion";

export default function TreeNode({ node, level = 0 }) {
  if (!node || node.val === null) {
    return <div className="h-10 w-10" />;
  }

  const spacing = Math.max(240 / (level + 1), 40); // spacing decreases as level increases

  return (
    <motion.div
      className="flex flex-col items-center relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: level * 0.1 }}
    >
      {/* Node Circle */}
      <motion.div
        className="rounded-full bg-gradient-to-br from-purple-400 to-blue-500 
                   text-white h-12 w-12 flex items-center justify-center font-medium shadow-md"
        whileHover={{ scale: 1.05 }}
      >
        {node.val}
      </motion.div>

      {/* Children */}
      {(node.left || node.right) && (
        <div className="flex mt-6 relative" style={{ gap: `${spacing}px` }}>
          {/* Left Child + Connector */}
          <div className="flex flex-col items-center relative">
            {node.left && (
              <>
                <svg
                  className="absolute top-[-30px] left-1/2 -translate-x-1/2 stroke-purple-300"
                  width="40"
                  height="30"
                >
                  <path
                    d="M20 0 Q 0 15, 20 30"
                    fill="none"
                    strokeWidth="2"
                  />
                </svg>
                <TreeNodeComponent node={node.left} level={level + 1} />
              </>
            )}
          </div>

          {/* Right Child + Connector */}
          <div className="flex flex-col items-center relative">
            {node.right && (
              <>
                <svg
                  className="absolute top-[-30px] left-1/2 -translate-x-1/2 stroke-purple-300"
                  width="40"
                  height="30"
                >
                  <path
                    d="M20 0 Q 40 15, 20 30"
                    fill="none"
                    strokeWidth="2"
                  />
                </svg>
                <TreeNodeComponent node={node.right} level={level + 1} />
              </>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
