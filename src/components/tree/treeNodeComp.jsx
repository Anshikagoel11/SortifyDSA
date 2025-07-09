import { motion } from "framer-motion";

export default function TreeNode({ node, level = 0 }) {
  if (!node || node.val === null) {
    return <div className="inline-block h-16 w-16" />;
  }

  // This spacing formula actually works properly
  const spacing = Math.max(200 / (level + 1), 60);

  return (
    <div className="flex flex-col items-center">
      {/* Node */}
      <motion.div
        className="rounded-full bg-blue-500 text-white h-12 w-12 flex items-center justify-center font-bold shadow-lg z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: level * 0.1 }}
      >
        {node.val}
      </motion.div>

      {/* Children */}
      {(node.left || node.right) && (
        <div className="flex mt-4 relative">
          {/* Left Child */}
          <div className="relative" style={{ marginRight: `${spacing}px` }}>
            {node.left && (
              <>
                <svg
                  className="absolute top-[-16px] left-1/2 h-4 w-full"
                  style={{ width: `${spacing/2}px` }}
                >
                  <path
                    d={`M ${spacing/2} 0 Q ${spacing/4} 30 0 60`}
                    stroke="purple"
                    strokeWidth="2"
                    fill="none"
                  />
                  <polygon points="0,60 5,50 -5,50" fill="purple" />
                </svg>
                <TreeNode node={node.left} level={level + 1} />
              </>
            )}
          </div>

          {/* Right Child */}
          <div className="relative" style={{ marginLeft: `${spacing}px` }}>
            {node.right && (
              <>
                <svg
                  className="absolute top-[-16px] right-1/2 h-4 w-full"
                  style={{ width: `${spacing/2}px` }}
                >
                  <path
                    d={`M 0 0 Q ${spacing/4} 30 ${spacing/2} 60`}
                    stroke="purple"
                    strokeWidth="2"
                    fill="none"
                  />
                  <polygon points={`${spacing/2},60 ${spacing/2-5},50 ${spacing/2+5},50`} fill="purple" />
                </svg>
                <TreeNode node={node.right} level={level + 1} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}