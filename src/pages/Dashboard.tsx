import JsonCreator from "@/components/json/jsonCreator"
import JsonViewer from "@/components/json/jsonViewer"
import { TreeState } from "@/types"
import { useState } from "react"


export default function Dashboard() {
  const [tree, setTree] = useState<TreeState>({
    nodes: {},
    rootNodes: [],
  })

  const handleTreeChange = (newTree: TreeState) => {
    setTree(newTree)
  }

    return (
      <div className="flex flex-col lg:flex-row">
        <JsonCreator 
          onTreeChange={handleTreeChange} 
        />
        <JsonViewer 
          tree={tree} 
        />
      </div>
    )
}