import type { TreeNode, TreeState } from "@/types"
import { getNodesByParent } from "@/utils/treeOperations"
import FieldRow from "./FieldRow"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface NestedFieldsProps {
  parentId: string
  tree: TreeState
  onUpdateNode: (nodeId: string, updates: Partial<TreeNode>) => void
  onDeleteNode: (nodeId: string) => void
  onAddChild: (parentId: string) => void
  nestingLevel: number
}

export default function NestedFields({
  parentId,
  tree,
  onUpdateNode,
  onDeleteNode,
  onAddChild,
  nestingLevel,
}: NestedFieldsProps) {
  const childNodes = getNodesByParent(tree, parentId)

  return (
    <div className="ml-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4 mt-4">
      {childNodes.map((childNode) => (
        <FieldRow
          key={childNode.id}
          node={childNode}
          tree={tree}
          onUpdateNode={onUpdateNode}
          onDeleteNode={onDeleteNode}
          onAddChild={onAddChild}
          nestingLevel={nestingLevel}
        />
      ))}
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        onClick={() => onAddChild(parentId)}
        className="mt-2"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add Nested Field
      </Button>
    </div>
  )
}