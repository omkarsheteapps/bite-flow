import { create } from 'zustand'
import type { FlowEdge, FlowNode } from './types'


interface FlowState {
  nodes: FlowNode[]
  edges: FlowEdge[]
  selectedNodeId: string | null
  setNodes: (updater: (nodes: FlowNode[]) => FlowNode[]) => void
  setEdges: (updater: (edges: FlowEdge[]) => FlowEdge[]) => void
  setSelectedNode: (id: string | null) => void
  reset: () => void
}

export const useFlowStore = create<FlowState>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  setNodes: (updater) => set((s) => ({ nodes: updater(s.nodes) })),
  setEdges: (updater) => set((s) => ({ edges: updater(s.edges) })),
  setSelectedNode: (id) => set({ selectedNodeId: id }),
  reset: () => set({ nodes: [], edges: [], selectedNodeId: null }),
}))
