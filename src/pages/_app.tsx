import { Layout } from "@/components/Layout";
import { pb } from "@/config/pocketbaseConfig";
import { useAuthDataStore, useAuthDataSync } from "@/stores/authDataStore";
import { useThemeStore } from "@/stores/themeStore";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const { useThemeStoreSideEffect } = useThemeStore();
  useThemeStoreSideEffect();

  const authDataStore = useAuthDataStore();
  useAuthDataSync({ pb: pb });

  return (
    <>
      <Layout showLeftSidebar={authDataStore.data?.token !== undefined}>
        {authDataStore.data?.token !== undefined && <Component {...pageProps} />}
        {(authDataStore.data === null || authDataStore.data?.token === undefined) && (
          <>logged out</>
        )}
        {authDataStore.data === undefined && <>loading...</>}
      </Layout>
    </>
  );
}
