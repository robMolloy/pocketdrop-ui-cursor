import { BrowseScreen } from "@/screens/BrowseScreen";
import { useRouter } from "next/router";

export default function BrowsePage() {
  const router = useRouter();
  const path = router.query.path;
  const fullPath = path ? `/${Array.isArray(path) ? path.join("/") : path}` : "";
  return <BrowseScreen path={fullPath} />;
}
