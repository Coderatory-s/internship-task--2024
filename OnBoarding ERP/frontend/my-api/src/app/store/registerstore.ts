import { create } from "zustand";

interface RegisterFormData {
  // Renamed from FormData to RegisterFormData
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  salary: string;
  isActive: boolean;
  password: string;
}

interface Store {
  formData: RegisterFormData;
  setFormData: (data: Partial<RegisterFormData>) => void;
  resetForm: () => void;
}

export const registerstore = create<Store>((set) => ({
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    department: "",
    salary: "",
    isActive: false,
    password: "",
  },
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  resetForm: () =>
    set({
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        position: "",
        department: "",
        salary: "",
        isActive: false,
        password: "",
      },
    }),
}));
