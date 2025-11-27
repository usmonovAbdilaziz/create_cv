import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null, // boshlang'ich state
  setUser: (userData) => set({ user: userData }), // update qilish funksiyasi
}));

export default useUserStore;
