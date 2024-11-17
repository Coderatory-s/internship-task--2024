// ProtectedRoute.tsx
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "../store/useAuthStore";

interface ProtectedRouteProps {
  children: ReactNode; // Define the type for children
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const [savedToken, setSavedToken] = useState<string>("");

  useEffect(() => {
    const tokenFromLocalStorage: string | null = localStorage.getItem("token");
    setSavedToken(tokenFromLocalStorage || ""); // Store the value in state
    if (!token && !tokenFromLocalStorage) {
      router.push("/login"); // Redirect to login if no token found
    }
  }, [token, router]);

  return <>{token || savedToken ? children : null}</>; // Render children only if token exists
};

export default ProtectedRoute;
