import React, { useEffect, useState } from "react";

const TreeNode = ({ node }) => {
  if (!node) return null;

  return (
    <div
      className="tree-node"
      style={{
        position: "absolute",
        top: `${node.y}px`,
        left: `${node.x}px`,
        transform: "translate(-50%, -50%)",
        background: "#a3e635",
        padding: "10px",
        borderRadius: "50%",
        border: "2px solid black",
        minWidth: "30px",
        textAlign: "center",
      }}
    >
      {node.value}
    </div>
  );
};

const TreeStructure = () => {
  const [tree, setTree] = useState(null);
  const [nodes, setNodes] = useState([]);

  // Step 1: Sample Tree
  const sampleTree = {
    value: 1,
    left: {
      value: 2,
      left: {
        value: 4,
      },
      right: {
        value: 5,
      },
    },
    right: {
      value: 3,
      right: {
        value: 6,
      },
    },
  };

  // Step 2: Assign Position Recursively (postorder style)
  const assignPositions = (node, depth = 0, x = { value: 0 }) => {
    if (!node) return;

    assignPositions(node.left, depth + 1, x);
    node.x = x.value * 80 + 60; // spacing between nodes
    node.y = depth * 100 + 50;  // level gap
    x.value += 1;
    assignPositions(node.right, depth + 1, x);
  };

  // Step 3: Collect nodes for rendering
  const collectNodes = (node, result = []) => {
    if (!node) return;
    result.push(node);
    collectNodes(node.left, result);
    collectNodes(node.right, result);
    return result;
  };

  useEffect(() => {
    const treeCopy = JSON.parse(JSON.stringify(sampleTree)); // avoid state mutation
    assignPositions(treeCopy);
    const allNodes = collectNodes(treeCopy);
    setTree(treeCopy);
    setNodes(allNodes);
  }, []);

  return (
    <div style={{ position: "relative", height: "500px", width: "100%", background: "#fef9c3" }}>
      {nodes.map((node, i) => (
        <TreeNode key={i} node={node} />
      ))}
    </div>
  );
};

export default TreeStructure;
