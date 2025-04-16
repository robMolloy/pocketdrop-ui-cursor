import PocketBase, { BaseAuthStore } from "pocketbase";
import { useEffect } from "react";
import { z } from "zod";
import { create } from "zustand";

export const pocketbaseAuthStoreSchema = z.object({
  token: z.string(),
  record: z.object({
    avatar: z.string(),
    collectionId: z.string(),
    collectionName: z.string(),
    created: z.string(),
    email: z.string(),
    id: z.string(),
    name: z.string(),
    updated: z.string(),
    emailVisibility: z.boolean(),
    verified: z.boolean(),
  }),
});

type TPocketbaseAuthStore = z.infer<typeof pocketbaseAuthStoreSchema>;
type TState = TPocketbaseAuthStore | null | undefined;

export const useAuthDataStore = create<{
  data: TState;
  setData: (x: TState) => void;
  clear: () => void;
}>()((set) => ({
  data: undefined,
  setData: (data) => set(() => ({ data })),
  clear: () => set(() => ({ data: undefined })),
}));

// const safeJsonParse = (x?: string | null) => {
//   try {
//     const data = JSON.parse(x as string);
//     return { success: true, data: data as unknown } as const;
//   } catch (error) {
//     return { success: false, error } as const;
//   }
// };

const extractAuthData = (authStore: BaseAuthStore) => {
  return pocketbaseAuthStoreSchema.safeParse(authStore);
};

export const useAuthDataSync = (p: { pb: PocketBase }) => {
  const authDataStore = useAuthDataStore();
  useEffect(() => {
    if (!p.pb.authStore.isValid) return authDataStore.setData(null);

    const resp = extractAuthData(p.pb.authStore);
    authDataStore.setData(resp.success ? resp.data : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    p.pb.authStore.onChange(() => {
      if (p.pb.authStore.isValid) {
        const resp = extractAuthData(p.pb.authStore);
        authDataStore.setData(resp.success ? resp.data : null);
      } else {
        authDataStore.setData(null);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
