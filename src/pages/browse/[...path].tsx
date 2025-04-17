import { RightSidebarContent } from "@/components/RightSidebar";
import { FileDetails } from "@/components/FileDetails";
import { pb } from "@/config/pocketbaseConfig";
import { FileUploader } from "@/modules/files/FileUploader";
import { getFileFromFileRecord } from "@/modules/files/dbFilesUtils";
import { useFilesStore } from "@/modules/files/filesStore";
import { useRightSidebarStore } from "@/stores/rightSidebarStore";
import { File, Folder } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function BrowsePage() {
  const router = useRouter();
  const { path } = router.query;

  // Convert path array to string if it exists
  const fullPath = path ? `/${Array.isArray(path) ? path.join("/") : path}` : "";
  const rightSidebarStore = useRightSidebarStore();
  const filesStore = useFilesStore();

  const [imageBlob, setImageBlob] = useState<Blob>();

  // Filter files for current path
  const currentPathFiles = filesStore.data.filter((file) => {
    const fileDir = file.filePath.substring(0, file.filePath.lastIndexOf("/"));
    return fileDir === fullPath;
  });

  return (
    <div className="mx-auto p-4">
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
                const result = await getFileFromFileRecord({ pb, data: file });
                if (result.success) setImageBlob(result.data.file);

                rightSidebarStore.setData(
                  <RightSidebarContent title="File Details">
                    <FileDetails file={file} />
                  </RightSidebarContent>,
                );
              }}
              className="flex cursor-pointer flex-col items-center rounded-lg border p-4 hover:bg-accent"
            >
              {isDirectory ? (
                <Folder className="mb-2 h-12 w-12" />
              ) : (
                <File className="mb-2 h-12 w-12" />
              )}
              <span className="break-all text-center text-sm">{fileName}</span>
            </div>
          );
        })}
      </div>

      {imageBlob && (
        <div className="mb-6">
          <img
            src={URL.createObjectURL(imageBlob)}
            alt="Selected file"
            className="h-96 w-96 rounded-lg border"
          />
        </div>
      )}
    </div>
  );
}
