import { create } from "zustand";
import { utcToZonedTime, format } from "date-fns-tz";

interface EventState {
  address?: string;
  setAddress: (address: string) => void;
  isDelivery: boolean;
  setIsDelivery: (isDelivery: boolean) => void;
  date: Date;
  setDate: (date: Date) => void;
  dateString: string;
  setDateString: (dateString: string) => void;
}

const today = new Date();

// Get the day of the week in UTC where 0 is Sunday
const dayOfWeek = today.getUTCDay();

// Calculate the number of days until next Monday in UTC
const daysUntilNextMonday = (1 - dayOfWeek + 7) % 7;

// Calculate the number of days until Monday two weeks from now in UTC
const daysUntilMondayTwoWeeksFromNow = daysUntilNextMonday + 14;

// Get the date for Monday two weeks from now in UTC
const mondayTwoWeeksFromNow = new Date(
  Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate() + daysUntilMondayTwoWeeksFromNow
  )
);

export const useEvent = create<EventState>((set) => ({
  address: "",
  setAddress: (address: string) => set({ address }),
  isDelivery: true,
  setIsDelivery: (isDelivery: boolean) => set({ isDelivery }),
  date: mondayTwoWeeksFromNow,
  setDate: (date: Date) => {
    const melbourneDate = utcToZonedTime(date, "Australia/Melbourne");
    const melbourneDateString = format(
      melbourneDate,
      "yyyy-MM-dd'T'HH:mm:ssXXX",
      { timeZone: "Australia/Melbourne" }
    );
    set({ date });
    set({ dateString: melbourneDateString });
  },
  dateString: mondayTwoWeeksFromNow.toISOString(), // Initialize dateString with the current date string
  setDateString: (dateString: string) => set({ dateString }),
}));
