import { create } from "zustand";

interface EventState {
  address?: string | undefined;
  setAddress: (address: string | undefined) => void;
  isDelivery: boolean | undefined;
  setIsDelivery: (isDelivery: boolean) => void;
  date: Date | null;
  setDate: (date: Date) => void;
}

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export const useEvent = create<EventState>()((set) => ({
  address: undefined,
  setAddress: (address: string | undefined) => set({ address }),
  isDelivery: true,
  setIsDelivery: (isDelivery: boolean) => set({ isDelivery }),
  date: tomorrow,
  setDate: (date: Date) => set({ date }),
}));
