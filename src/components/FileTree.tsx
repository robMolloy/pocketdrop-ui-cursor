import { useState } from "react"
import { ChevronDown, ChevronRight, Folder } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

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

  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-1 px-2 rounded-md hover:bg-accent">
        {/* Arrow section */}
        <div 
          className="flex items-center cursor-pointer"
          onClick={handleArrowClick}
        >
          {isOpen ? (
            <ChevronDown className="h-4 w-4 mr-1 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 mr-1 flex-shrink-0" />
          )}
        </div>
        
        {/* Directory content */}
        <Link href={node.path} className="flex items-center flex-1">
          <Folder className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-sm truncate">{node.name}</span>
        </Link>
      </div>
      
      {/* Children section with proper indentation */}
      {isOpen && node.children && (
        <div className={cn("pl-4", level > 0 && "ml-4")}>
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