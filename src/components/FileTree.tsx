import { ChevronDown, ChevronRight, Folder } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type TFile = {
  collectionId: string;
  collectionName: string;
  id: string;
  file: string;
  filePath: string;
  created: string;
  updated: string;
};

type DirectoryNode = {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: DirectoryNode[];
};

type DirectoryNodeMap = {
  [key: string]: DirectoryNode;
};

const splitAfterSlash = (path: string): string[] => {
  return path.match(/(^\/|[^\/]+\/|[^\/]+$)/g) || [];
};

const convertFilesToDirectoryTree = (p: { data: TFile[] }): DirectoryNode[] => {
  const root: DirectoryNodeMap = {};

  // Process each file
  p.data.forEach((file) => {
    const pathParts = splitAfterSlash(file.filePath);
    let currentLevel = root;

    // Process each part of the path
    pathParts.forEach((part) => {
      const isDirectory = part.endsWith("/");
      const name = isDirectory ? part.slice(0, -1) : part;

      // Create node if it doesn't exist
      if (!currentLevel[name]) {
        currentLevel[name] = {
          name,
          path: pathParts.slice(0, pathParts.indexOf(part) + 1).join(""),
          isDirectory,
          children: isDirectory ? [] : undefined,
        };
      }

      // Move to next level if this is a directory
      if (isDirectory) {
        currentLevel = currentLevel[name].children as unknown as DirectoryNodeMap;
      }
    });
  });

  // Convert the nested object structure to an array
  const convertToArray = (node: DirectoryNodeMap): DirectoryNode[] => {
    return Object.values(node).map((item) => ({
      ...item,
      children: item.children
        ? convertToArray(item.children as unknown as DirectoryNodeMap)
        : undefined,
    }));
  };

  return convertToArray(root);
};

function DirectoryItem({
  node,
  initIsOpen = false,
}: {
  node: DirectoryNode;
  initIsOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(initIsOpen);

  if (!node.isDirectory) return <></>

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
        <Link href={`/browse${node.path}`} className="flex flex-1 items-center">
          <Folder className="mr-2 h-4 w-4" />
          <span className="truncate text-sm">{node.name}</span>
        </Link>
      </div>

      {/* Children section with proper indentation */}
      {node.children && node.children.length > 0 && (
        <div className={`pl-4 ${isOpen ? "" : "hidden"}`}>
          {node.children.map((child) => (
            <DirectoryItem key={child.path} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export function DirectoryTree({ data }: { data: TFile[] }) {
  const directoryStructure = convertFilesToDirectoryTree({ data });

  return (
    <div className="flex flex-col">
      {directoryStructure.map((node) => (
        <DirectoryItem key={node.path} node={node} initIsOpen={true} />
      ))}
    </div>
  );
}
