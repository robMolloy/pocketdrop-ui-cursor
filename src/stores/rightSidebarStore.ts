import { create } from "zustand";

interface SidebarState {
  data: boolean;
  setData: (data: boolean) => void;
}

const useInitSidebarStore = create<SidebarState>()((set) => ({
  data: false,
  setData: (x) => set({ data: x }),
}));

export const useRightSidebarStore = () => {
  const { data, setData } = useInitSidebarStore();

  return {
    data,
    setData,
    open: () => setData(true),
    close: () => setData(false),
  };
};
