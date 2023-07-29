import { create } from "zustand";

interface useEventModalInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useEventModal = create<useEventModalInterface>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
