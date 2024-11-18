//  app/store/resetPasswordStore.ts
import { create } from "zustand";

interface ResetPasswordState {
  email: string;
  message: string | null;
  error: string | null;
  setEmail: (email: string) => void;
  setMessage: (message: string | null) => void;
  setError: (error: string | null) => void;
  resetForm: () => void;
}

export const useResetPasswordStore = create<ResetPasswordState>((set) => ({
  email: "",
  message: null,
  error: null,
  setEmail: (email) => set({ email }),
  setMessage: (message) => set({ message }),
  setError: (error) => set({ error }),
  resetForm: () => set({ email: "", message: null, error: null }),
}));
