import { create } from "zustand";

export const useStore = create((set) => ({
  messages: [],
  addMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),
}));