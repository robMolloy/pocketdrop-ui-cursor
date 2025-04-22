import { BrowseScreen } from "@/screens/BrowseScreen";
import { useRouter } from "next/router";

export default function BrowsePage() {
  const router = useRouter();
  const path = router.asPath;
  const browsePath = path.slice(7);

  return <BrowseScreen browsePath={browsePath} />;
}
