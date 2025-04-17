import { AuthForm } from "@/modules/auth/AuthForm";
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
      <Layout showLeftSidebar={!!authDataStore.data?.token}>
        {!!authDataStore.data?.token && <Component {...pageProps} />}
        {authDataStore.data === null && (
          <div className="flex justify-center">
            <AuthForm />
          </div>
        )}
        {(authDataStore.data === undefined || !authDataStore.data?.token) && <PageLoading />}
      </Layout>
    </>
  );
}
