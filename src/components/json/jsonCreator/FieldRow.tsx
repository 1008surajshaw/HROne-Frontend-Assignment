import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronDown, ChevronRight } from "lucide-react"
import type { TreeNode, FieldType, TreeState } from "@/types"
import { getNodesByParent } from "@/utils/treeOperations"

interface FieldRowProps {
  node: TreeNode
  tree: TreeState
  onUpdateNode: (nodeId: string, updates: Partial<TreeNode>) => void
  onDeleteNode: (nodeId: string) => void
  onAddChild: (parentId: string) => void
  nestingLevel?: number
}

const fieldTypes: { value: FieldType; label: string }[] = [
  { value: "string", label: "String" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
  { value: "objectId", label: "ObjectId" },
  { value: "float", label: "Float" },
  { value: "nesting", label: "Nesting" },
  { value: "array"  , label:"Array"},
]

export default function FieldRow({
  node,
  tree,
  onUpdateNode,
  onDeleteNode,
  onAddChild,
  nestingLevel = 0,
}: FieldRowProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const handleNameChange = (name: string) => {
    onUpdateNode(node.id, { name })
  }

  
  const handleTypeChange = (type: FieldType) => {
    if (type === "nesting" && (!node.name || node.name.trim() === "")) {
      alert("Please enter a name before changing the field type to 'nesting'.");
      return; // Prevent type change
    }
    onUpdateNode(node.id, { type });
  
    if (type === "nesting" && (!node.children || node.children.length === 0)) {
      setTimeout(() => onAddChild(node.id), 0);
    }
  };
  
  // Get child nodes if this is a nesting type
  const childNodes = node.type === "nesting" ? getNodesByParent(tree, node.id) : []
  
  return (
    <div className={`mb-4 p-4 border rounded-lg ${nestingLevel > 0 ? 'ml-6 bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Field Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            placeholder="Enter field name"
            value={node.name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Field Type</label>
          <select 
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            value={node.type} 
            onChange={(e) => handleTypeChange(e.target.value as FieldType)}
          >
            {fieldTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <Button type="button" variant="destructive" size="sm" onClick={() => onDeleteNode(node.id)} className="mt-6">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {node.type === "nesting" && (
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <button 
              type="button" 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="flex items-center text-sm text-blue-500 hover:text-blue-700"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
              {isExpanded ? "Hide" : "Show"} Nested Fields
            </button>
          </div>
          
          {isExpanded && (
            <div className="space-y-4">
              {childNodes.map(childNode => (
                <FieldRow
                  key={childNode.id}
                  node={childNode}
                  tree={tree}
                  onUpdateNode={onUpdateNode}
                  onDeleteNode={onDeleteNode}
                  onAddChild={onAddChild}
                  nestingLevel={nestingLevel + 1}
                />
              ))}
              
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => onAddChild(node.id)}
                className="mt-2"
              >
                Add Nested Field
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
