import { FileDetails } from "@/components/FileDetails";
import { FileIcon } from "@/components/FileIcon";
import { RightSidebarContent } from "@/components/RightSidebar";
import { FileUploader } from "@/modules/files/FileUploader";
import { useFilesStore } from "@/modules/files/filesStore";
import { useRightSidebarStore } from "@/stores/rightSidebarStore";
import { Folder } from "lucide-react";
import { useRouter } from "next/router";

export default function BrowsePage() {
  const router = useRouter();
  const { path } = router.query;

  // Convert path array to string if it exists
  const fullPath = path ? `/${Array.isArray(path) ? path.join("/") : path}` : "";
  const rightSidebarStore = useRightSidebarStore();
  const filesStore = useFilesStore();

  // Filter files for current path
  const currentPathFiles = filesStore.data.filter((file) => {
    const fileDir = file.filePath.substring(0, file.filePath.lastIndexOf("/"));
    return fileDir === fullPath;
  });

  return (
    <>
      <div className="mb-6">
        <div className="flex items-end gap-2">
          <h1 className="mb-0 text-2xl font-bold">Current Path:</h1>
          <p className="flex-1 text-lg">{fullPath}</p>
        </div>
      </div>

      <div className="mb-6">
        <FileUploader currentPath={fullPath} onUploadComplete={() => { }} />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {currentPathFiles.map((file) => {
          const fileName = file.filePath.split("/").pop() || "";
          const isDirectory = false; // TODO: Implement directory detection

          return (
            <div
              key={file.id}
              onClick={async () => {
                rightSidebarStore.setData(
                  <RightSidebarContent title="File Details">
                    <FileDetails file={file} onDelete={() => { rightSidebarStore.close() }} />
                  </RightSidebarContent>,
                );
              }}
              className="flex cursor-pointer flex-col items-center rounded-lg border p-4 hover:bg-accent"
            >
              {isDirectory ? (
                <Folder className="mb-2 h-12 w-12" />
              ) : (
                <FileIcon fileName={fileName} />
              )}
              <span className="break-all text-center text-sm">{fileName}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
