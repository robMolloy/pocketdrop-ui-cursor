import { useState } from "react"
import { ChevronDown, ChevronRight, Folder } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FileTreeProps {
  className?: string
}

interface DirectoryNode {
  name: string
  path: string
  children?: DirectoryNode[]
}

// Sample directory structure - replace with your actual data
const directoryStructure: DirectoryNode[] = [
  {
    name: "src",
    path: "/src",
    children: [
      {
        name: "components",
        path: "/src/components",
        children: [
          {
            name: "ui",
            path: "/src/components/ui",
          },
        ],
      },
      {
        name: "pages",
        path: "/src/pages",
      },
      {
        name: "styles",
        path: "/src/styles",
      },
    ],
  },
  {
    name: "public",
    path: "/public",
    children: [], // Empty array to indicate it's a directory
  },
]

function DirectoryItem({ node, level = 0 }: { node: DirectoryNode; level?: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = node.children && node.children.length > 0
  const isEmptyDirectory = node.children && node.children.length === 0

  return (
    <div>
      <div
        className={cn(
          "flex items-center py-1 px-2 rounded-md hover:bg-accent cursor-pointer",
          level > 0 && "ml-4"
        )}
        onClick={() => (hasChildren || isEmptyDirectory) && setIsOpen(!isOpen)}
      >
        {hasChildren || isEmptyDirectory ? (
          isOpen ? (
            <ChevronDown className="h-4 w-4 mr-1 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 mr-1 flex-shrink-0" />
          )
        ) : (
          <div className="w-5 mr-1 flex-shrink-0" />
        )}
        <Folder className="h-4 w-4 mr-2 text-muted-foreground" />
        <span className="text-sm truncate">{node.name}</span>
      </div>
      {hasChildren && isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <DirectoryItem key={child.path} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function FileTree({ className }: FileTreeProps) {
  return (
    <div className={cn("py-2", className)}>
      <h3 className="px-4 mb-2 text-sm font-medium text-muted-foreground">Files</h3>
      <div className="space-y-1">
        {directoryStructure.map((node) => (
          <DirectoryItem key={node.path} node={node} />
        ))}
      </div>
    </div>
  )
} 