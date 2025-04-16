import { Button } from "@/components/ui/button";
import { useRightSidebarStore } from "@/stores/rightSidebarStore";
import { useRouter } from "next/router";

export default function BrowsePage() {
  const router = useRouter();
  const { path } = router.query;

  // Convert path array to string if it exists
  const fullPath = path ? `/${Array.isArray(path) ? path.join("/") : path}` : "";
  const rightSidebarStore = useRightSidebarStore();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Current Path:</h1>
      <p className="text-lg">{fullPath}</p>
      <Button variant="outline" size="sm" onClick={rightSidebarStore.open}>
        Open Sidebar
      </Button>
    </div>
  );
}
