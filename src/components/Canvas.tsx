import React, { useCallback, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { useFlowStore } from "../types/store";
import type { FlowNode } from "../types/types";
import { nodeTypes } from "../types/NodeTypes";

function InnerCanvas() {
  const { nodes, edges, setNodes, setEdges, setSelectedNode } = useFlowStore();
  const rf = useReactFlow();
  const idRef = useRef(1);

  const onNodesChange = useCallback(
    (changes: any) => {
      setNodes((ns) => {
        let res = ns;
        changes.forEach((c: any) => {
          if (c.type === "position" && c.dragging) {
            res = res.map((n) =>
              n.id === c.id ? { ...n, position: c.position } : n
            );
          }
          if (c.type === "remove") {
            res = res.filter((n) => n.id !== c.id);
          }
          if (c.type === "select") {
            // managed by onSelectionChange
          }
        });
        return res;
      });
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: any) => {
      setEdges((es) => {
        let res = es;
        changes.forEach((c: any) => {
          if (c.type === "remove") res = res.filter((e) => e.id !== c.id);
          if (c.type === "select") {
            /* ignore */
          }
        });
        return res;
      });
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (params: any) => {
      // Enforce: only one edge from a given source handle
      setEdges((es) => {
        const alreadyHas = es.some(
          (e) =>
            e.source === params.source &&
            e.sourceHandle === (params.sourceHandle ?? "source")
        );
        if (alreadyHas) return es; // ignore connection
        return addEdge({ ...params, animated: false }, es);
      });
    },
    [setEdges]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;
      const reactFlowBounds = (
        event.target as HTMLElement
      ).getBoundingClientRect();
      const position = rf.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const id = String(idRef.current++);
      const newNode: FlowNode = {
        id,
        type,
        position,
        data: { text: "" },
      };
      setNodes((ns) => ns.concat(newNode));
    },
    [rf, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onSelectionChange = useCallback(
    ({ nodes: selNodes }: { nodes: FlowNode[] }) => {
      setSelectedNode(selNodes[0]?.id ?? null);
    },
    [setSelectedNode]
  );

  return (
    <div className="canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onSelectionChange={onSelectionChange}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background gap={16} />
      </ReactFlow>
    </div>
  );
}

export default function Canvas() {
  return (
    <ReactFlowProvider>
      <InnerCanvas />
    </ReactFlowProvider>
  );
}
