import { create } from "zustand";

interface AuthState {
  token: string | null;
  user: object | null;
  setToken: (token: string) => void;
  setUser: (user: object) => void;
  clearToken: () => void; // Function to clear the token and user
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setToken: (token) => set(() => ({ token })),
  setUser: (user) => set(() => ({ user })),
  clearToken: () => set(() => ({ token: null, user: null })), // Clears token and user
}));

// /src/store/useAuthStore.ts
// import { create } from "zustand";

// type AuthState = {
//   token: string | null;
//   user: object | null;
//   setToken: (token: string) => void;
//   setUser: (user: object) => void;
// };

// export const useAuthStore = create<AuthState>((set) => ({
//   token: null,
//   user: null,
//   setToken: (token) => set({ token }),
//   setUser: (user) => set({ user }),
// }));
