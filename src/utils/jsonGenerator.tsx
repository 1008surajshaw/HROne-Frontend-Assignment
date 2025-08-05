import type { TreeState } from "../types"

const getDefaultValue = (type: string): any => {
  switch (type) {
    case "string":
      return "STRING"
    case "number":
      return "NUMBER"
    case "boolean":
      return true
    case "objectId":
      return "OBJECTID"
    case "float":
      return "FLOAT"
    case "nesting":
      return {}
    case "array":
       return "ARRAY"
    default:
      return null
  }
}

export const generateJsonFromTree = (tree: TreeState): any => {
  try {
    const buildJsonRecursive = (nodeIds: string[]): any => {
      const result: any = {}

      if (!nodeIds || !Array.isArray(nodeIds)) return result

      nodeIds.forEach((nodeId) => {
        if (!nodeId) return
        
        const node = tree.nodes[nodeId]
        if (!node || !node.name || node.name.trim() === "") return

        if (node.type === "nesting") {
          result[node.name] = {}
          
          if (node.children && Array.isArray(node.children) && node.children.length > 0) {
            const childData = buildJsonRecursive(node.children)
            Object.assign(result[node.name], childData)
          }
        } else {
        
          if (node.children && Array.isArray(node.children) && node.children.length > 0) {
            const childData = buildJsonRecursive(node.children)
            if (Object.keys(childData).length > 0) {
              result[node.name] = { value: getDefaultValue(node.type), ...childData }
            } else {
              result[node.name] = getDefaultValue(node.type)
            }
          } else {
            result[node.name] = getDefaultValue(node.type)
          }
        }
      })

      return result
    }

    return buildJsonRecursive(Array.isArray(tree.rootNodes) ? tree.rootNodes : [])
  } catch (error) {
    console.error('Error generating JSON from tree:', error)
    return {} 
  }
}

