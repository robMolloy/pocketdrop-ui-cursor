import { Button } from "@/components/ui/button";
import { useRightSidebarStore } from "@/stores/rightSidebarStore";
import { useRouter } from "next/router";
import { FileUploader } from "@/components/FileUploader";
import { useState } from "react";

export default function BrowsePage() {
  const router = useRouter();
  const { path } = router.query;
  const [refreshKey, setRefreshKey] = useState(0);

  // Convert path array to string if it exists
  const fullPath = path ? `/${Array.isArray(path) ? path.join("/") : path}` : "";
  const rightSidebarStore = useRightSidebarStore();

  const handleUploadComplete = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="mb-4 text-2xl font-bold">Current Path:</h1>
        <p className="text-lg">{fullPath}</p>
        <Button variant="outline" size="sm" onClick={rightSidebarStore.open} className="mt-4">
          Open Sidebar
        </Button>
      </div>

      <div className="mb-6">
        <FileUploader currentPath={fullPath} onUploadComplete={handleUploadComplete} />
      </div>

      {/* File list will be added here */}
      <div key={refreshKey}>
        {/* TODO: Add file list component */}
      </div>
    </div>
  );
}
