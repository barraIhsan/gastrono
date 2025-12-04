import { create } from "zustand";

type AuthStore = {
  token: string;
  username: string;
  setUsername: (username: string) => void;
  setToken: (token: string) => void;
  clearToken: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: "",
  username: "",
  setUsername: (username) => set({ username }),
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: "" }),
}));
