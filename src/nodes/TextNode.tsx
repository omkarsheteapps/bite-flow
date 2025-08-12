import { Handle, Position } from "reactflow";
import type { FlowNode } from "../types/types";

export default function TextNode({ data }: { data: FlowNode["data"] }) {
  return (
    <div className="node-shell">
      <div className="node-title">Text(click to edit)</div>
      <div>
        {data.text || <span style={{ color: "#9ca3af" }}>Empty message…</span>}
      </div>
      {/* Target can have multiple incoming edges */}
      <Handle id="target" type="target" position={Position.Left} />
      {/* Source can have only one outgoing edge (we enforce in onConnect) */}
      <Handle id="source" type="source" position={Position.Right} />
    </div>
  );
}
