import { Layout } from "@/components/Layout";
import { PageLoading } from "@/components/PageLoading";
import { pb } from "@/config/pocketbaseConfig";
import { AuthForm } from "@/modules/auth/AuthForm";
import { smartSubscribeToFiles } from "@/modules/files/dbFilesUtils";
import { useFilesStore } from "@/modules/files/filesStore";
import { smartSubscribeToUsers } from "@/modules/users/dbUsersUtils";
import { useUsersStore } from "@/modules/users/usersStore";
import { useAuthDataStore, useAuthDataSync } from "@/stores/authDataStore";
import { useThemeStore } from "@/stores/themeStore";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const themeStore = useThemeStore();
  const authDataStore = useAuthDataStore();
  const filesStore = useFilesStore();
  const usersStore = useUsersStore();

  themeStore.useThemeStoreSideEffect();
  useAuthDataSync({ pb: pb });

  useEffect(() => {
    const isLoggedIn = !!authDataStore.data?.token;
    if (isLoggedIn) {
      smartSubscribeToFiles({ pb: pb, onChange: (x) => filesStore.setData(x) });
      smartSubscribeToUsers({ pb: pb, onChange: (x) => usersStore.setData(x) });
    }

    if (!isLoggedIn) {
      filesStore.clear();
      usersStore.clear();
    }
  }, [authDataStore.data?.token]);

  const authState = (() => {
    if (authDataStore.data === undefined) return "loading" as const;
    if (!!authDataStore.data?.token) return "loggedIn" as const;
    return "loggedOut" as const;
  })();

  return (
    <>
      <Layout showLeftSidebar={!!authDataStore.data?.token}>
        {authState === "loggedIn" && <Component {...pageProps} />}
        {authState === "loggedOut" && (
          <div className="flex justify-center">
            <AuthForm />
          </div>
        )}
        {authState === "loading" && <PageLoading />}
      </Layout>
    </>
  );
}
