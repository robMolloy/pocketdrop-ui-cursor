import { AuthForm } from "@/components/AuthForm";
import { Layout } from "@/components/Layout";
import { PageLoading } from "@/components/PageLoading";
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
      {/* <pre>{JSON.stringify({ v: 1, x: pb.authStore, y: authDataStore.data }, undefined, 2)}</pre> */}

      <Layout showLeftSidebar={authDataStore.data?.token !== undefined}>
        {authDataStore.data?.token !== undefined && <Component {...pageProps} />}
        {(authDataStore.data === null || authDataStore.data?.token === undefined) && (
          <div className="flex justify-center">
            <AuthForm />
          </div>
        )}
        {authDataStore.data === undefined && <PageLoading />}
      </Layout>
    </>
  );
}
