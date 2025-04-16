import { ChevronDown, ChevronRight, Folder } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface DirectoryNode {
  name: string;
  path: string;
  children?: DirectoryNode[];
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
            children: [
              {
                name: "button",
                path: "/src/components/ui/button",
              },
            ],
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
];

function DirectoryItem({
  node,
  initIsOpen = false,
}: {
  node: DirectoryNode;
  initIsOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(initIsOpen);

  return (
    <div className="w-full">
      <div className="flex items-center p-1 rounded-md hover:bg-accent hover:text-accent-foreground">
        {/* Arrow section */}
        <div
          className="flex items-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((x) => !x);
          }}
        >
          {(() => {
            const Comp = isOpen ? ChevronDown : ChevronRight;
            return <Comp className="h-4 w-4 mr-1 flex-shrink-0" />;
          })()}
        </div>

        {/* Directory content */}
        <Link href={node.path} className="flex items-center flex-1">
          <Folder className="h-4 w-4 mr-2" />
          <span className="text-sm truncate">{node.name}</span>
        </Link>
      </div>

      {/* Children section with proper indentation */}
      {node.children && (
        <div className={`pl-4 ${isOpen ? "" : "hidden"}`}>
          {node.children.map((child) => (
            <DirectoryItem key={child.path} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileTree() {
  return (
    <div className="px-2 flex flex-col gap-2">
      <h3 className="px-4 mb-2 text-sm font-medium">Files</h3>
      {directoryStructure.map((node) => (
        <DirectoryItem key={node.path} node={node} initIsOpen={true} />
      ))}
    </div>
  );
}
