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

type DirectoryMap = {
  [key: string]: {
    name: string;
    path: string;
    isDirectory: boolean;
    children?: DirectoryMap;
  };
};

const convertFilesToDirectoryTree = (p: { data: TFile[] }) => {
  const root: DirectoryMap = {};

  p.data.forEach((file) => {
    const pathParts = file.filePath.split("/").filter(Boolean);
    let currentLevel = root;

    pathParts.forEach((part, index) => {
      const isLastPart = index === pathParts.length - 1;
      const path = "/" + pathParts.slice(0, index + 1).join("/");

      if (!currentLevel[part]) {
        currentLevel[part] = {
          name: part,
          path: `/browse${path}`,
          isDirectory: !isLastPart,
          children: !isLastPart ? {} : undefined,
        };
      }

      if (!isLastPart && currentLevel[part].children) {
        currentLevel = currentLevel[part].children as DirectoryMap;
      }
    });
  });

  // Convert the nested object structure to array structure
  const convertToArray = (node: DirectoryMap): DirectoryNode[] => {
    return Object.values(node)
      .filter(item => item.isDirectory) // Only include directories
      .map((item) => ({
        name: item.name,
        path: item.path,
        isDirectory: item.isDirectory,
        children: item.children ? convertToArray(item.children) : undefined,
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
