// hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { fetchUser } from "@/api/authApi";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { IUser } from "@/types/userTypes";

// Define the type for the mutation variables
export interface MutationVariables {
  url: string;
  payload: object;
}

// Define the type of the data returned from the fetchUser function
export interface AuthResponse {
  token: string;
  user: IUser; // Replace 'object' with a more specific user type if available
}

// Define the custom hook for authentication
export const useAuth = (isLogin: boolean) => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const mutation = useMutation<AuthResponse, Error, MutationVariables>({
    mutationFn: async ({ url, payload }) => {
      const response = await fetchUser(url, payload);
      return response; // Return the response directly
    },
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      toast.success(isLogin ? "Login successful" : "Registration successful");
      router.push(isLogin ? "/feed" : "/login");
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred, please try again");
    },
  });

  return mutation;
};
