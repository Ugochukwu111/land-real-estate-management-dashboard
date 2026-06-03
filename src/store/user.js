import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      accessToken: null,
      user: null,

      setAccessToken: (token) =>
        set({ accessToken: token }),

      setUser: (user) =>
        set({ user }),

      clearUser: () =>
        set({ user: null, accessToken: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useUserStore;