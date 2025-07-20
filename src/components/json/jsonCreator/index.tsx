import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import type { TreeState } from "@/types"
import { createNode, addNodeToTree, removeNodeFromTree, updateNode, getNodesByParent } from "@/utils/treeOperations"
import FieldRow from "./FieldRow"
import AddFieldButton from "./AddFieldButton"

interface JsonCreatorProps {
  onTreeChange: (tree: TreeState) => void
  initialTree?: TreeState
}

export default function JsonCreator({ onTreeChange, initialTree }: JsonCreatorProps) {
  const [tree, setTree] = useState<TreeState>(initialTree || {
    nodes: {},
    rootNodes: []
  })
  
  const rootNodes = getNodesByParent(tree, null)

  useEffect(() => {
    onTreeChange(tree)
  }, [tree, onTreeChange])

  const handleAddRootField = () => {
    const newNode = createNode()
    const newTree = addNodeToTree(tree, newNode)
    setTree(newTree)
  }

  const handleAddChildField = (parentId: string) => {
    const newNode = createNode("", "nesting", parentId)
    const newTree = addNodeToTree(tree, newNode)
    setTree(newTree)
  }

  const handleUpdateNode = (nodeId: string, updates: Partial<any>) => {
    const newTree = updateNode(tree, nodeId, updates)
    setTree(newTree)
  }

  const handleDeleteNode = (nodeId: string) => {
    const newTree = removeNodeFromTree(tree, nodeId)
    setTree(newTree)
  }
  
  const loadExample = () => {
    const rootNode = createNode("person", "nesting")
    const nameNode = createNode("name", "string", rootNode.id)
    const ageNode = createNode("age", "number", rootNode.id)
    
    let newTree: TreeState = { nodes: {}, rootNodes: [] }
    newTree = addNodeToTree(newTree, rootNode)
    newTree = addNodeToTree(newTree, nameNode)
    newTree = addNodeToTree(newTree, ageNode)
    
    setTree(newTree)
  }

  return (
    <div className="w-full md:w-1/2 p-6 border-r bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="mb-4 p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">JSON Schema Builder</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadExample}>
            Load Example
          </Button>
          <AddFieldButton onClick={handleAddRootField} />
        </div>
      </div>
      
      <div className="p-4">
        {rootNodes.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No fields added yet. Click "Add Field" to get started.
          </div>
        ) : (
          <div className="space-y-4">
            {rootNodes.map((node) => (
              <FieldRow
                key={node.id}
                node={node}
                tree={tree}
                onUpdateNode={handleUpdateNode}
                onDeleteNode={handleDeleteNode}
                onAddChild={handleAddChildField}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


