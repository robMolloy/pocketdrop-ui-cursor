import { FileDetails } from "@/components/FileDetails";
import { FileIcon } from "@/components/FileIcon";
import { RightSidebarContent } from "@/components/RightSidebar";
import { FileUploader } from "@/modules/files/FileUploader";
import { useFilesStore } from "@/modules/files/filesStore";
import { useRightSidebarStore } from "@/stores/rightSidebarStore";
import { Folder } from "lucide-react";
import { useRouter } from "next/router";

export const BrowseScreen = (p: { path: string }) => {
  const router = useRouter();
  const rightSidebarStore = useRightSidebarStore();
  const filesStore = useFilesStore();

  // Get all unique directories in the current path
  const directories = new Set<string>();
  const files = filesStore.data;

  files?.forEach((file) => {
    const filePath = file.filePath;
    if (filePath.startsWith(p.path + "/")) {
      const remainingPath = filePath.slice(p.path.length + 1);
      const nextSlashIndex = remainingPath.indexOf("/");
      if (nextSlashIndex > 0) {
        directories.add(remainingPath.slice(0, nextSlashIndex));
      }
    }
  });

  // Filter files for current path
  const currentPathFiles = !files
    ? []
    : files
        .filter((file) => {
          const fileDir = file.filePath.substring(0, file.filePath.lastIndexOf("/"));
          return fileDir === p.path;
        })
        .filter((file) => file.file !== "");

  return (
    <>
      <div className="mb-6">
        <div className="flex items-end gap-2">
          <h1 className="mb-0 text-2xl font-bold">Current Path:</h1>
          <p className="flex-1 text-lg">{p.path}</p>
        </div>
      </div>

      <div className="mb-6">
        <FileUploader currentPath={p.path} onUploadComplete={() => {}} />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {/* Show directories first */}
        {Array.from(directories).map((dirName) => (
          <div
            key={dirName}
            onClick={() => {
              router.push(`/browse${p.path}/${dirName}`);
            }}
            className="flex cursor-pointer flex-col items-center rounded-lg border p-4 hover:bg-accent"
          >
            <Folder className="mb-2 h-12 w-12" />
            <span className="break-all text-center text-sm">{dirName}</span>
          </div>
        ))}

        {/* Then show files */}
        {currentPathFiles.map((file) => {
          const fileName = file.filePath.split("/").pop() || "";

          return (
            <div
              key={file.id}
              onClick={async () => {
                rightSidebarStore.setData(
                  <RightSidebarContent title="File Details">
                    <FileDetails
                      file={file}
                      onDelete={() => {
                        rightSidebarStore.close();
                      }}
                    />
                  </RightSidebarContent>,
                );
              }}
              className="flex cursor-pointer flex-col items-center rounded-lg border p-4 hover:bg-accent"
            >
              <FileIcon fileName={fileName} />
              <span className="break-all text-center text-sm">{fileName}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};
