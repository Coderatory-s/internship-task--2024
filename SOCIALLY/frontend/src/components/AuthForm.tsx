"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "next/router";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { login, register, AuthResponse, LoginData, RegisterData } from "@/services/authService";
import "react-toastify/dist/ReactToastify.css";

const AuthForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const isLogin = router.pathname === "/login";

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const loginMutation = useMutation<AuthResponse, Error, LoginData>({
    mutationFn: async (data: LoginData) => {
      const response = await login(data);
      return response;
    },
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      toast.success("Login successful");
      router.push("/feed");
    },
    onError: (error:any) => {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  });

  const registerMutation = useMutation<AuthResponse, Error, RegisterData>({
    mutationFn: async (data: RegisterData) => {
      const response = await register(data);
      return response;
    },
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      toast.success("Registration successful");
      router.push("/login");
    },
    onError: (error:any) => {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      loginMutation.mutate({ email, password });
    } else {
      registerMutation.mutate({ name, email, password });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 1 }}
      className="flex flex-col px-2 items-center justify-center min-h-screen"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 flex flex-col rounded-lg shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isLogin ? "Login" : "Register"}
        </h2>

        {!isLogin && (
          <Input
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={!isLogin}
            className="mb-4 placeholder:text-gray-500"
          />
        )}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 placeholder:text-gray-500"
        />
        <div className="relative mb-4">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="placeholder:text-gray-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-3"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <Button type="submit" className="w-full bg-green-800 text-white">
          {isLogin ? "Login" : "Register"}
        </Button>

        {isLogin && (
          <div className="mt-3 text-end">
            <Link
              href={"/forgotPassword"}
              className="text-blue-500 border-gray-300 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        )}

        <div className="mt-4 text-center">
          <span>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            {isLogin ? (
              <Link href={"/signup"} className="text-blue-500 hover:underline">
                Register
              </Link>
            ) : (
              <Link href={"/login"} className="text-blue-500 hover:underline">
                Login
              </Link>
            )}
          </span>
        </div>
      </form>

      <ToastContainer />
    </motion.div>
  );
};

export default AuthForm;
