import { create } from "zustand";

type AuthStore = {
  token: string;
  username: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setUsername: (username: string) => void;
  setToken: (token: string) => void;
  clearToken: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: "",
  username: "",
  loading: true,
  setToken: (token) => set({ token }),
  setUsername: (username) => set({ username }),
  setLoading: (loading) => set({ loading }),
  clearToken: () => set({ token: "" }),
}));
