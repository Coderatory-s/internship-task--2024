import axios from "axios";
import { IUser } from "@/types/userTypes"; // Adjust the path as needed

export interface AuthResponse {
  token: string; // The JWT token returned from the API
  user: IUser; // The user object
}

// Login and Register data types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const API_URL = "http://localhost:3000/v1/users/auth";

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/login`, data);
  return response.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/register`, data);
  return response.data;
};

export const resetPassword = async (email: string): Promise<any> => {
  const response = await axios.post(`${API_URL}/reset-password`, { email });
  return response.data;
};

export const updatePassword = async (data: {
  token: string;
  newPassword: string;
}): Promise<any> => {
  const response = await axios.post(`${API_URL}/update-password`, data);
  return response.data;
};
