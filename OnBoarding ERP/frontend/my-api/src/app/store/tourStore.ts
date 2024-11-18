// store/tourStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Define the structure of the tour item
interface TourItem {
  _id: string;
  title: string;
  description: string;
}

// Define the structure of the store state
interface TourState {
  tourInfo: TourItem[]; // Store the tour information
  message: string | null; // Store the message (e.g., "Welcome to the Company!")
  error: string | null; // Store any error messages
  isLoading: boolean; // Store the loading state
  setTourInfo: (tourInfo: TourItem[], message: string) => void; // Function to set tour info
  setError: (error: string | null) => void; // Function to set error
  setLoading: (isLoading: boolean) => void; // Function to set loading state
}

// Create the Zustand store
export const useTourStore = create<TourState>()(
  devtools((set) => ({
    tourInfo: [],
    message: null,
    error: null,
    isLoading: false,
    setTourInfo: (tourInfo, message) =>
      set({ tourInfo, message, isLoading: false }),
    setError: (error) => set({ error, isLoading: false }),
    setLoading: (isLoading) => set({ isLoading }),
  }))
);
