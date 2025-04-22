import { ChevronDown, ChevronRight, Folder } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
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
          name: isDirectory ? `/${name}` : part,
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
  activePath,
}: {
  node: DirectoryNode;
  initIsOpen?: boolean;
  activePath?: string;
}) {
  const [isOpen, setIsOpen] = useState(initIsOpen);

  if (!node.isDirectory) return <></>;
  console.log({ activePath, np: node.path });
  const isActive = activePath === node.path;

  return (
    <div className="w-full">
      <div
        className={`flex items-center rounded-md p-1 ${isActive ? "bg-white text-black" : "hover:bg-accent hover:text-accent-foreground"}`}
      >
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
        <Link href={`/browse${node.path}`} className={`flex flex-1 items-center`}>
          <Folder className="mr-2 h-4 w-4" />
          <span className="truncate text-sm">{node.name}</span>
        </Link>
      </div>

      {/* Children section with proper indentation */}
      {node.children && node.children.length > 0 && (
        <div className={`pl-4 ${isOpen ? "" : "hidden"}`}>
          {node.children.map((child) => (
            <DirectoryItem key={child.path} node={child} activePath={activePath} />
          ))}
        </div>
      )}
    </div>
  );
}

export const useBrowsePath = () => {
  const router = useRouter();

  const fullPath = router.asPath;
  const initBrowsePath = fullPath.startsWith("/browse") ? fullPath.slice(7) : undefined;
  if (initBrowsePath === undefined) return { browsePath: undefined };
  if (initBrowsePath === "") return { browsePath: "/" };

  const browsePathPrefix = initBrowsePath.startsWith("/") ? "" : "/";
  const browsePathSuffix = initBrowsePath.endsWith("/") ? "" : "/";

  // browsePath always starts and ends with a slash
  const browsePath = `${browsePathPrefix}${initBrowsePath}${browsePathSuffix}`;
  return { browsePath };
};

export function DirectoryTree({ data }: { data: TFile[] }) {
  const { browsePath } = useBrowsePath();
  console.log(`FileTree.tsx:${/*LL*/ 144}`, { browsePath });

  const directoryStructure = convertFilesToDirectoryTree({ data });

  return (
    <div className="flex flex-col">
      {directoryStructure.length === 0 ? (
        <DirectoryItem
          node={{ name: "/", path: "/", isDirectory: true }}
          initIsOpen={true}
          activePath={browsePath}
        />
      ) : (
        directoryStructure.map((node) => (
          <DirectoryItem key={node.path} node={node} initIsOpen={true} activePath={browsePath} />
        ))
      )}
    </div>
  );
}
