
import { useState, useEffect } from "react"
import { ChevronDown, ChevronRight, Plus } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { JsonPreviewNode } from "@/types"

interface JsonNodeProps {
  node: JsonPreviewNode
  level: number
  isLast?: boolean
  onAddNesting?: (nodeId: string) => void
}

export default function JsonNode({ node, level, isLast = false, onAddNesting }: JsonNodeProps) {
  const [isExpanded, setIsExpanded] = useState(node.isExpanded !== false)
  const hasChildren = node.children && node.children.length > 0
  const indent = "  ".repeat(level)
  
  useEffect(() => {
    setIsExpanded(node.isExpanded !== false)
  }, [node.isExpanded])
  
//   const toggleExpand = (e: React.MouseEvent) => {
//     e.stopPropagation() 
//     setIsExpanded(!isExpanded)
//   }

  const renderValue = () => {
    if (node.type === "nesting") {
      if (!hasChildren) {
        return (
          <div className="inline-flex items-center">
            <span className="text-blue-600 cursor-pointer  px-1 rounded" onClick={(e) => {
              e.stopPropagation()
              if (onAddNesting) onAddNesting(node.id)
            }}>{"{}"}</span>
            {onAddNesting && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      onAddNesting(node.id)
                    }}
                    className="ml-2 p-1 rounded-full "
                  >
                    <Plus className="w-3 h-3 text-blue-600" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Add nested field</TooltipContent>
              </Tooltip>
            )}
            {!isLast && <span className="">,</span>}
          </div>
        )
      }

      return (
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <button
              className="inline-flex items-center hover:bg-gray-200 rounded px-1"
            >
              {isExpanded ? <ChevronDown className="w-3 h-3 mr-1" /> : <ChevronRight className="w-3 h-3 mr-1" />}
              <span className="text-blue-600">{"{"}</span>
              {!isExpanded && (
                <>
                  <span className=" ml-1">...</span>
                  <span className="text-blue-600">{"}"}</span>
                  {!isLast && <span className="">,</span>}
                </>
              )}
            </button>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div>
              {node.children.map((child, index) => (
                <JsonNode 
                  key={child.id} 
                  node={child} 
                  level={level + 1} 
                  isLast={index === node.children.length - 1}
                  onAddNesting={onAddNesting}
                />
              ))}
            </div>
            <div className={indent}>
              <span className="text-blue-600">{"}"}</span>
              {!isLast && <span className="">,</span>}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )
    }

    // Render primitive values
    const valueColor =
      {
        string: "text-green-600",
        number: "text-purple-600",
        boolean: "text-orange-600",
        objectId: "text-pink-600",
        float: "text-purple-600",
        array: "text-blue-600",
        
        
      }[node.type] || "text-gray-600"

    const displayValue = typeof node.value === "string" ? `"${node.value}"` : String(node.value)

    return (
      <>
        <span className={valueColor}>{displayValue}</span>
        {!isLast && <span className="">,</span>}
      </>
    )
  }

  if (!node.name || node.name.trim() === "") return null

  return (
    <div className="font-mono text-sm">
      <span className={indent}>
        <span className="text-blue-800">"{node.name}"</span>
        <span className="">: </span>
        {renderValue()}
      </span>
    </div>
  )
}
