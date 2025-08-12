import type { Edge, Node } from 'reactflow'

export type TextNodeData = {
  text: string
}

export type FlowNode = Node<TextNodeData>
export type FlowEdge = Edge

export const NODE_TYPES = {
  TEXT: 'textNode',
} as const
export type NodeKind = typeof NODE_TYPES[keyof typeof NODE_TYPES]
