import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Copy, Check } from "lucide-react"
import type { TreeState } from "@/types"
import { generateJsonFromTree } from "@/utils/jsonGenerator"

interface JsonViewerProps {
  tree: TreeState
}

export default function JsonViewer({ tree }: JsonViewerProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [copied, setCopied] = useState(false)

  const jsonData = generateJsonFromTree(tree)
  const jsonString = JSON.stringify(jsonData, null, 2)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const isEmpty = Object.keys(jsonData).length === 0

  return (
    <div className="w-full h-full md:w-1/2 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow h-full">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">JSON Preview</h2>
          <div className="flex items-center gap-2">
            {!isEmpty && (
              <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
                {isExpanded ? "Collapse" : "Expand"}
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={isEmpty}>
              {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>
        
        <div className="p-4  overflow-auto">
          {isEmpty ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No fields to preview. Add some fields to see the JSON structure.
            </div>
          ) : (
            <pre className="font-mono text-sm whitespace-pre-wrap">
              {isExpanded ? jsonString : "{\n  ...\n}"}
            </pre>
          )}
        </div>
      </div>
    </div>
  )
}