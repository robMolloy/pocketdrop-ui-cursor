import { Button } from "@/components/ui/button";
import { useRightSidebarStore } from "@/stores/rightSidebarStore";
import { useRouter } from "next/router";
import { FileUploader } from "@/modules/files/FileUploader";
import { useFilesStore } from "@/modules/files/filesStore";
import { File, Folder } from "lucide-react";
import { getFile, getFileRecord } from "@/modules/files/dbFilesUtils";
import { pb } from "@/config/pocketbaseConfig";
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
        <Button variant="outline" size="sm" onClick={rightSidebarStore.open} className="mt-4">
          Open Sidebar
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={async () => {
            const f1 = await getFileRecord({
              pb,
              id: "m96qfbxdn7w41sy",
            });
            if (f1.success) setImageBlob(f1.data.file);
            console.log(`[...path].tsx:${/*LL*/ 43}`, { f1 });
          }}
          className="mt-4"
        >
          getFileRecord
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={async () => {
            const f1 = await getFile({ pb, id: "m96qfbxdn7w41sy" });
            console.log(`[...path].tsx:${/*LL*/ 54}`, { f1 });
            if (!f1.success) return;
            setImageBlob(f1.data.file);
            console.log(`[...path].tsx:${/*LL*/ 54}`, {
              x: f1.data.file,
              y: URL.createObjectURL(f1.data.file),
            });
          }}
          className="mt-4"
        >
          getFile
        </Button>
      </div>

      {imageBlob && <img src={URL.createObjectURL(imageBlob)} alt="Downloaded image" />}

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
    </div>
  );
}
