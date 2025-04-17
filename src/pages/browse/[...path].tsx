import { Button } from "@/components/ui/button";
import { useRightSidebarStore } from "@/stores/rightSidebarStore";
import { useRouter } from "next/router";
import { FileUploader } from "@/modules/files/FileUploader";
import { useFilesStore } from "@/modules/files/filesStore";

export default function BrowsePage() {
  const router = useRouter();
  const { path } = router.query;

  // Convert path array to string if it exists
  const fullPath = path ? `/${Array.isArray(path) ? path.join("/") : path}` : "";
  const rightSidebarStore = useRightSidebarStore();

  const filesStore = useFilesStore();

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
        <FileUploader currentPath={fullPath} onUploadComplete={() => {}} />
      </div>
      <pre>{JSON.stringify(filesStore.data, undefined, 2)}</pre>
    </div>
  );
}
