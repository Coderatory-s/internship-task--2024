// store/employeeStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Define the Employee type
interface Employee {
  _id: string;
  firstName: string | null;
  lastName: string | null;
  position: string | null;
  salary: number | null;
  isActive: boolean;
}

interface EmployeeState {
  employees: Employee[]; // Store the employee data
  error: string | null; // Store any error messages
  isLoading: boolean; // Store the loading state
  setEmployees: (employees: Employee[]) => void; // Function to set employees
  setError: (error: string | null) => void; // Function to set error
  setLoading: (isLoading: boolean) => void; // Function to set loading state
}

export const useEmployeeStore = create<EmployeeState>()(
  devtools((set) => ({
    employees: [],
    error: null,
    isLoading: false,
    setEmployees: (employees) => set({ employees }),
    setError: (error) => set({ error }),
    setLoading: (isLoading) => set({ isLoading }),
  }))
);
