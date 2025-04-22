import { create } from "zustand";
import { z } from "zod";
import { userSchema } from "./dbUsersUtils";

export type TUser = z.infer<typeof userSchema>;

type TState = TUser[];

export const useUsersStore = create<{
  data: TState;
  setData: (x: TState) => void;
  clear: () => void;
}>()((set) => ({
  data: [],
  setData: (data) => set(() => ({ data })),
  clear: () => set(() => ({ data: [] })),
}));
