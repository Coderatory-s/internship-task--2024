"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming password
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const router = useRouter();
  const { token } = router?.query; // Get the reset token from the query params

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/v1/users/update-password", { token, newPassword });
      toast.success(response.data.message);
      router.push("/login"); // Redirect to login page after successful update
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
      className="flex flex-col bg-blue-500 px-2 items-center justify-center min-h-screen"
    >
      <form
        onSubmit={handleUpdatePassword}
        className="bg-white p-6 flex flex-col rounded-lg shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Update Password</h2>

        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="mb-4 placeholder:text-gray-500"
        />
        
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="mb-4 placeholder:text-gray-500"
        />

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2"
            id="updatePassword"
          />
          <label htmlFor="updatePassword" className="select-none cursor-pointer">Show Passwords</label>
        </div>

        <Button type="submit" className="w-full bg-green-800 text-white">
          Update Password
        </Button>
      </form>

      <ToastContainer />
    </motion.div>
  );
};

export default UpdatePassword;
