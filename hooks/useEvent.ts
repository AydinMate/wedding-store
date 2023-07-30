import { create } from "zustand";

interface EventState {
  address?: string;
  setAddress: (address: string) => void;
  isDelivery: boolean;
  setIsDelivery: (isDelivery: boolean) => void;
  date: Date;
  setDate: (date: Date) => void;
}

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export const useEvent = create<EventState>()((set) => ({
  address: "",
  setAddress: (address: string) => set({ address }),
  isDelivery: true,
  setIsDelivery: (isDelivery: boolean) => set({ isDelivery }),
  date: tomorrow,
  setDate: (date: Date) => set({ date }),
}));
