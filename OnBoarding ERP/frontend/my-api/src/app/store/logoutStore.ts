// store/logoutStore.ts
import { create } from "zustand";

interface LogoutStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useLogoutStore = create<LogoutStore>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}));
