import { create } from "zustand";

const useUserStore = create((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  user: null,
  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null, accessToken: null }),

}));

export default useUserStore;