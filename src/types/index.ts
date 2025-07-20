export type FieldType = "string" | "number" | "boolean" | "objectId" | "float" | "nesting" | 'array'

export interface TreeNode {
  id: string
  name: string
  type: FieldType
  parentId: string | null
  children: string[] 
  order: number
}

export interface TreeState {
  nodes: Record<string, TreeNode>
  rootNodes: string[]
}

export interface FormData {
  tree: TreeState
}

export interface JsonPreviewNode {
  id: string
  name: string
  type: FieldType
  value: any
  children: JsonPreviewNode[]
  isExpanded: boolean
  collapsed?: boolean
}
