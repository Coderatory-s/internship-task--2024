// pages/forgotPassword.tsx
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/v1/users/reset-password", { email });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "An error occurred, please try again"
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 1 }}
      className="flex flex-col px-2  bg-blue-900 items-center justify-center min-h-screen"
    >
      <form
        onSubmit={handleForgotPassword}
        className="bg-white p-6 flex flex-col rounded-lg shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center  mb-4">Forgot Password</h2>

        <Input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 placeholder:text-gray-500"
        />

        <Button type="submit" className="w-full bg-green-800 text-white">
          Send Reset Link
        </Button>
      </form>

      <ToastContainer />
    </motion.div>
  );
};

export default ForgotPassword;
