import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeManager } from "@/components/ThemeManager";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeManager />
      <Component {...pageProps} />
    </>
  );
}
