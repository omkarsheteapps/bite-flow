import { useEffect, useState, useCallback } from "react";
import { useFlowStore } from "../types/store";

export default function SettingsPanel() {
  const { nodes, setNodes, selectedNodeId } = useFlowStore();
  const node = nodes.find((n) => n.id === selectedNodeId);

  const [text, setText] = useState(node?.data.text ?? "");

  // when selection changes, sync the editor once (doesn't run on every keystroke)
  useEffect(() => {
    setText(node?.data.text ?? "");
  }, [node?.id]);

  const commit = useCallback(() => {
    if (!node) return;
    setNodes((ns) =>
      ns.map((n) =>
        n.id === node.id ? { ...n, data: { ...n.data, text } } : n
      )
    );
  }, [node, text, setNodes]);

  if (!node) return null;

  return (
    <div
      className="panel"
      // prevent React Flow canvas from grabbing focus/selection while editing
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
    >
      <h3>Settings</h3>
      <div className="settings-group">
        <label>
          <div>Text</div>
          <textarea
            key={node.id} // stable per node; NOT tied to text
            rows={5}
            className="input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={commit} // or debounce commit if you prefer live updates
          />
        </label>
        <div className="tip">
          Tip: this panel stays mounted, so focus won’t jump.
        </div>
      </div>
    </div>
  );
}
