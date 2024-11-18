// useCourseStore.ts
import {create} from 'zustand';

interface CourseState {
  title: string;
  description: string;
  isSuccess: boolean;
  isError: boolean;
  popupMessage:string; 
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setSuccess: (success: boolean) => void;
  setError: (error: boolean) => void;
  setPopupMessage: (popupMessage: string) => void;
  reset: () => void;
}

export const useCourseStore = create<CourseState>((set) => ({
  title: '',
  description: '',
  isSuccess: false,
  isError: false,
  popupMessage:'',
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setSuccess: (success) => set({ isSuccess: success }),
  setError: (error) => set({ isError: error }),
  setPopupMessage:(popupMsg) => set({popupMessage: popupMsg}),
  reset: () => set({ title: '', description: '', isSuccess: false, isError: false }),
}));
