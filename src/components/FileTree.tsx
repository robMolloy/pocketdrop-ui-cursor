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
    path: "/browse/src",
    children: [
      {
        name: "components",
        path: "/browse/src/components",
        children: [
          {
            name: "ui",
            path: "/browse/src/components/ui",
            children: [
              {
                name: "button",
                path: "/browse/src/components/ui/button",
              },
            ],
          },
        ],
      },
      {
        name: "pages",
        path: "/browse/src/pages",
      },
      {
        name: "styles",
        path: "/browse/src/styles",
      },
    ],
  },
  {
    name: "public",
    path: "/browse/public",
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
      <div className="flex items-center rounded-md p-1 hover:bg-accent hover:text-accent-foreground">
        {/* Arrow section */}
        <div
          className="flex cursor-pointer items-center"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((x) => !x);
          }}
        >
          {(() => {
            const Comp = isOpen ? ChevronDown : ChevronRight;
            return <Comp className="mr-1 h-4 w-4 flex-shrink-0" />;
          })()}
        </div>

        {/* Directory content */}
        <Link href={node.path} className="flex flex-1 items-center">
          <Folder className="mr-2 h-4 w-4" />
          <span className="truncate text-sm">{node.name}</span>
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
    <div className="flex flex-col">
      {directoryStructure.map((node) => (
        <DirectoryItem key={node.path} node={node} initIsOpen={true} />
      ))}
    </div>
  );
}
