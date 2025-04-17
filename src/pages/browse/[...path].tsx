import { Button } from "@/components/ui/button";
import { useRightSidebarStore } from "@/stores/rightSidebarStore";
import { useRouter } from "next/router";
import { FileUploader } from "@/modules/files/FileUploader";
import { useFilesStore } from "@/modules/files/filesStore";
import { File, Folder } from "lucide-react";

export default function BrowsePage() {
  const router = useRouter();
  const { path } = router.query;

  // Convert path array to string if it exists
  const fullPath = path ? `/${Array.isArray(path) ? path.join("/") : path}` : "";
  const rightSidebarStore = useRightSidebarStore();
  const filesStore = useFilesStore();

  // Filter files for current path
  const currentPathFiles = filesStore.data.filter(file => {
    const fileDir = file.filePath.substring(0, file.filePath.lastIndexOf('/'));
    return fileDir === fullPath;
  });

  return (
    <div className="mx-auto p-4">
      <div className="mb-6">
        <div className="flex items-end gap-2">
          <h1 className="mb-0 text-2xl font-bold">Current Path:</h1>
          <p className="flex-1 text-lg">{fullPath}</p>
        </div>
        <Button variant="outline" size="sm" onClick={rightSidebarStore.open} className="mt-4">
          Open Sidebar
        </Button>
      </div>

      <div className="mb-6">
        <FileUploader currentPath={fullPath} onUploadComplete={() => { }} />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {currentPathFiles.map((file) => {
          const fileName = file.filePath.split('/').pop() || '';
          const isDirectory = false; // TODO: Implement directory detection

          return (
            <div
              key={file.id}
              className="flex flex-col items-center p-4 rounded-lg border hover:bg-accent cursor-pointer"
            >
              {isDirectory ? (
                <Folder className="h-12 w-12 mb-2" />
              ) : (
                <File className="h-12 w-12 mb-2" />
              )}
              <span className="text-sm text-center break-all">{fileName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
