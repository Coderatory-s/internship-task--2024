// app/store/resetPasswordStore.ts
import { create } from "zustand";

interface ResetPasswordState {
  password: string;
  passwordConfirmation: string;
  message: string;
  setPassword: (password: string) => void;
  setPasswordConfirmation: (passwordConfirmation: string) => void;
  setMessage: (message: string) => void;
  resetForm: () => void;
}

export const useResetPasswordStore = create<ResetPasswordState>((set) => ({
  password: "",
  passwordConfirmation: "",
  message: "",
  setPassword: (password) => set({ password }),
  setPasswordConfirmation: (passwordConfirmation) =>
    set({ passwordConfirmation }),
  setMessage: (message) => set({ message }),
  resetForm: () => set({ password: "", passwordConfirmation: "", message: "" }),
}));
