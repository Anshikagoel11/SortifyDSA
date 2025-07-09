import { useTreeContext } from "../../context/treeContext";
import { buildTreeFromLevelOrder } from "./levelOrderTree";
import TreeNodeComponent from "./treeNodeComp";

export default function TreeStructure() {
  const { nodes } = useTreeContext();

  const cleanedNodes = nodes.map((n) =>
    n === "null" || n === "" ? null : isNaN(n) ? n : Number(n)
  );

  const treeRoot = buildTreeFromLevelOrder(cleanedNodes);

  return (
    <div className="flex justify-center mt-6 mx-auto overflow-x-auto w-full">
      <TreeNodeComponent node={treeRoot} />
    </div>
  );
}
