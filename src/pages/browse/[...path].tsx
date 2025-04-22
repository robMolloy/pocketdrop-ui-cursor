import { BrowseScreen } from "@/screens/BrowseScreen";
import { useRouter } from "next/router";

export default function BrowsePage() {
  const router = useRouter();
  const path = router.query.path as string;
  return <BrowseScreen path={path} />;
}
