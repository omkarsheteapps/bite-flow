import { useMemo } from "react";

export default function Sidebar() {
  // Extensible panel: add more node cards later
  const items = useMemo(
    () => [{ type: "textNode", label: "Text Message" }],
    []
  );

  return (
    <div className="panel" onDragOver={(e) => e.preventDefault()}>
      <h3>Nodes</h3>
      <div className="tip">Drag into canvas</div>
      {items.map((it) => (
        <div
          key={it.type}
          className="node-card"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("application/reactflow", it.type);
            e.dataTransfer.effectAllowed = "move";
          }}
        >
          {it.label}
        </div>
      ))}
    </div>
  );
}
