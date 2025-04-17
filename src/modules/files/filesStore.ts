import { TFile } from "@/modules/files/dbFilesUtils";
import { create } from "zustand";

type TState = TFile[];

export const useFilesStore = create<{
  data: TState;
  setData: (x: TState) => void;
  clear: () => void;
}>()((set) => ({
  data: [],
  setData: (data) => set(() => ({ data })),
  clear: () => set(() => ({ data: undefined })),
}));
