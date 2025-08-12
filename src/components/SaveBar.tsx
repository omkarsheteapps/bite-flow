import { useMemo } from "react";
import { useFlowStore } from "../types/store";

export default function SaveBar() {
  const { nodes, edges } = useFlowStore();

  const incomingCount = useMemo(() => {
    const map: Record<string, number> = {};
    nodes.forEach((n) => (map[n.id] = 0));
    edges.forEach((e) => {
      if (map[e.target] != null) map[e.target]++;
    });
    return map;
  }, [nodes, edges]);

  function handleSave() {
    const nodesWithNoIncoming = Object.values(incomingCount).filter(
      (c) => c === 0
    ).length;

    if (nodes.length > 1 && nodesWithNoIncoming > 1) {
      const msg =
        "Cannot save flow: more than one node has no incoming connection.";

      alert(msg);
      return;
    }

    const payload = {
      nodes: nodes.map(({ id, type, position, data }) => ({
        id,
        type,
        position,
        data,
      })),
      edges: edges.map(
        ({ id, source, target, sourceHandle, targetHandle }) => ({
          id,
          source,
          target,
          sourceHandle,
          targetHandle,
        })
      ),
    };

    alert("Flow saved successfully! Open console to inspect.");
    console.log("Saved flow:", payload);
  }

  return (
    <div className="footer">
      <button className="btn primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}
