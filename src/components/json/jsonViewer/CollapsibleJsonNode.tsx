import { useState, useEffect } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { JsonPreviewNode } from "@/types"
import JsonNode from "./JsonNode"

interface CollapsibleJsonNodeProps {
  node: JsonPreviewNode
  level: number
  isLast?: boolean
  isRootCollapsed?: boolean
}

export default function CollapsibleJsonNode({ 
  node, 
  level, 
  isLast = false,
  isRootCollapsed = false
}: CollapsibleJsonNodeProps) {
  const [isOpen, setIsOpen] = useState(!isRootCollapsed && node.isExpanded !== false)
  const hasChildren = node.children && node.children.length > 0
  const indent = "  ".repeat(level)
  
  useEffect(() => {
    if (isRootCollapsed) {
      setIsOpen(false)
    }
  }, [isRootCollapsed])

  if (node.type !== "nesting" || !hasChildren) {
    return <JsonNode node={node} level={level} isLast={isLast} />
  }

  return (
    <div className="font-mono text-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className={indent}>
          <span className="text-blue-800">"{node.name}"</span>
          <span className="">: </span>
          <CollapsibleTrigger asChild>
            <button className="inline-flex items-center hover:bg-gray-200 rounded px-1">
              {isOpen ? <ChevronDown className="w-3 h-3 mr-1" /> : <ChevronRight className="w-3 h-3 mr-1" />}
              <span className="text-blue-600">{"{"}</span>
              {!isOpen && <span className="text-gray-400 ml-1">...</span>}
              {!isOpen && <span className="text-blue-600">{"}"}</span>}
              {!isOpen && !isLast && <span className="">,</span>}
            </button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <div>
            {node.children.map((child, index) => (
              <JsonNode 
                key={child.id} 
                node={child} 
                level={level + 1} 
                isLast={index === node.children.length - 1} 
              />
            ))}
          </div>
          <div className={indent}>
            <span className="text-blue-600">{"}"}</span>
            {!isLast && <span className="">,</span>}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}