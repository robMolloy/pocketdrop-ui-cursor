import { Button } from "@/components/ui/button";
import { useRightSidebarStore } from "@/stores/rightSidebarStore";
import { useRouter } from "next/router";
import { FileUploader } from "@/modules/files/FileUploader";

export default function BrowsePage() {
  const router = useRouter();
  const { path } = router.query;

  // Convert path array to string if it exists
  const fullPath = path ? `/${Array.isArray(path) ? path.join("/") : path}` : "";
  const rightSidebarStore = useRightSidebarStore();

  return (
    <div className="mx-auto p-4">
      <div className="mb-6">
        <h1 className="mb-4 text-2xl font-bold">Current Path:</h1>
        <p className="text-lg">{fullPath}</p>
        <Button variant="outline" size="sm" onClick={rightSidebarStore.open} className="mt-4">
          Open Sidebar
        </Button>
      </div>

      <div className="mb-6">
        <FileUploader currentPath={fullPath} onUploadComplete={() => { }} />
      </div>
    </div>
  );
}
