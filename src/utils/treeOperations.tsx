import type { TreeNode, TreeState, FieldType } from "../types"

export const createNode = (name = "", type: FieldType = "string", parentId: string | null = null): TreeNode => ({
  id: `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  name,
  type,
  parentId,
  children: [],
  order: Date.now(),
})

export const addNodeToTree = (tree: TreeState, node: TreeNode): TreeState => {
  try {
    // Ensure node has required properties
    const safeNode = {
      ...node,
      id: node.id || `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      children: Array.isArray(node.children) ? node.children : [],
      order: node.order || Date.now()
    }
    
    const newTree = {
      nodes: { ...tree.nodes, [safeNode.id]: safeNode },
      rootNodes: [...(tree.rootNodes || [])],
    }

    if (safeNode.parentId === null) {
      newTree.rootNodes.push(safeNode.id)
    } else if (tree.nodes[safeNode.parentId]) {
      // Ensure parent has a children array
      const parentChildren = Array.isArray(tree.nodes[safeNode.parentId].children) 
        ? tree.nodes[safeNode.parentId].children 
        : []
      
      newTree.nodes[safeNode.parentId] = {
        ...tree.nodes[safeNode.parentId],
        children: [...parentChildren, safeNode.id],
      }
    }

    return newTree
  } catch (error) {
    console.error('Error adding node to tree:', error)
    return tree // Return original tree on error
  }
}

export const removeNodeFromTree = (tree: TreeState, nodeId: string): TreeState => {
  const nodeToRemove = tree.nodes[nodeId]
  if (!nodeToRemove) return tree

  // Recursively collect all descendant IDs
  const getAllDescendants = (id: string): string[] => {
    const node = tree.nodes[id]
    if (!node) return []

    let descendants = [id]
    node.children.forEach((childId) => {
      descendants = [...descendants, ...getAllDescendants(childId)]
    })
    return descendants
  }

  const idsToRemove = getAllDescendants(nodeId)
  const newNodes = { ...tree.nodes }

  // Remove all descendant nodes
  idsToRemove.forEach((id) => {
    delete newNodes[id]
  })

  // Update parent's children array or root nodes
  let newRootNodes = [...tree.rootNodes]

  if (nodeToRemove.parentId === null) {
    newRootNodes = newRootNodes.filter((id) => id !== nodeId)
  } else if (newNodes[nodeToRemove.parentId]) {
    newNodes[nodeToRemove.parentId] = {
      ...newNodes[nodeToRemove.parentId],
      children: newNodes[nodeToRemove.parentId].children.filter((id) => id !== nodeId),
    }
  }

  return {
    nodes: newNodes,
    rootNodes: newRootNodes,
  }
}

export const updateNode = (tree: TreeState, nodeId: string, updates: Partial<TreeNode>): TreeState => {
  const node = tree.nodes[nodeId]
  if (!node) return tree

  try {
    // Always preserve children regardless of type changes
    const updatedNode = { ...node, ...updates }
    
    // If changing to nesting type and no children exist, ensure children array is initialized
    if (updates.type === 'nesting' && (!updatedNode.children || !Array.isArray(updatedNode.children))) {
      updatedNode.children = []
    }

    return {
      ...tree,
      nodes: {
        ...tree.nodes,
        [nodeId]: updatedNode,
      },
    }
  } catch (error) {
    console.error('Error updating node:', error)
    return tree // Return original tree on error
  }
}

export const getNodesByParent = (tree: TreeState, parentId: string | null): TreeNode[] => {
  if (parentId === null) {
    return tree.rootNodes
      .map((id) => tree.nodes[id])
      .filter(Boolean)
      .sort((a, b) => a.order - b.order)
  }

  const parent = tree.nodes[parentId]
  if (!parent) return []

  return parent.children
    .map((id) => tree.nodes[id])
    .filter(Boolean)
    .sort((a, b) => a.order - b.order)
}
