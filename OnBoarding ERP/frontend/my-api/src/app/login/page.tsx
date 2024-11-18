"use client";

// import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useLoginStore } from "../store/useloginstore";

export default function LoginPage() {
  const { formData, setFormData, loading, setLoading } = useLoginStore();
  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "http://localhost:3000/v1/loggin/login",
        formData,
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: (data: any) => {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
        duration: 3000,
      });
      // Save user data to local storage
      if (data.user) {
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userEmail", data.user.email);
      }
      router.push("/Dashboard");
    },
    onError: (err: any) => {
      toast({
        title: "Login Failed",
        description:
          err.response?.data?.message ||
          "Please check your credentials and try again.",
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value }); // Update the form data in Zustand store
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting

    // Trigger the mutation with form data
    mutation.mutate();

    // Wait for the mutation to complete
    await mutation.mutateAsync();

    setLoading(false); // Set loading to false after mutation
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={formData.password ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() =>
                setFormData({
                  password: formData.password === "" ? "text" : "",
                })
              } // Toggle password visibility
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {formData.password ? (
                <EyeOffIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <EyeIcon className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <Link
          href="/ResetPasswordEmail"
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot password?
        </Link>
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

// "use client";

// import { useEffect } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import Link from "next/link";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useMutation } from "@tanstack/react-query";
// import { useLoginStore } from "../store/useloginstore";

// export default function LoginPage() {
//   const { formData, setFormData, loading, setLoading } = useLoginStore();
//   const { toast } = useToast();
//   const router = useRouter();

//   const mutation = useMutation({
//     mutationFn: async () => {
//       const response = await axios.post(
//         "http://localhost:3000/v1/loggin/login",
//         formData
//       );
//       return response.data;
//     },
//     onSuccess: () => {
//       toast({
//         title: "Login Successful",
//         description: "Welcome back!",
//         duration: 3000,
//       });
//       router.push("/Dashboard");
//     },
//     onError: (err: any) => {
//       toast({
//         title: "Login Failed",
//         description:
//           err.response?.data?.message ||
//           "Please check your credentials and try again.",
//         variant: "destructive",
//         duration: 3000,
//       });
//     },
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ [name]: value }); // Update the form data in Zustand store
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true); // Set loading to true when submitting

//     // Trigger the mutation with form data
//     mutation.mutate();

//     // Wait for the mutation to complete
//     await mutation.mutateAsync();

//     setLoading(false); // Set loading to false after mutation
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"
//     >
//       <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//             placeholder="Enter your email"
//           />
//         </div>
//         <div>
//           <Label htmlFor="password">Password</Label>
//           <div className="relative">
//             <Input
//               id="password"
//               name="password"
//               type={formData.password ? "text" : "password"}
//               value={formData.password}
//               onChange={handleInputChange}
//               required
//               placeholder="Enter your password"
//             />
//             <button
//               type="button"
//               onClick={() =>
//                 setFormData({
//                   password: formData.password === "" ? "text" : "",
//                 })
//               } // Toggle password visibility
//               className="absolute right-3 top-1/2 transform -translate-y-1/2"
//             >
//               {formData.password ? (
//                 <EyeOffIcon className="h-4 w-4 text-gray-500" />
//               ) : (
//                 <EyeIcon className="h-4 w-4 text-gray-500" />
//               )}
//             </button>
//           </div>
//         </div>
//         <Button type="submit" className="w-full" disabled={loading}>
//           {loading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Logging in...
//             </>
//           ) : (
//             "Login"
//           )}
//         </Button>
//       </form>
//       <div className="mt-4 text-center">
//         <Link
//           href="/ResetPasswordEmail"
//           className="text-sm text-blue-600 hover:underline"
//         >
//           Forgot password?
//         </Link>
//       </div>
//       <div className="mt-6 text-center">
//         <p className="text-sm text-gray-600">
//           Don't have an account?{" "}
//           <Link href="/register" className="text-blue-600 hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </motion.div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import Link from "next/link";
// import axios from "axios"; // Import Axios
// import { useRouter } from "next/navigation"; // Import useRouter for navigation
// import { useMutation } from "@tanstack/react-query"; // Import useMutation

// interface LoginFormData {
//   email: string;
//   password: string;
// }

// export default function LoginPage() {
//   const [formData, setFormData] = useState<LoginFormData>({
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false); // Local loading state
//   const { toast } = useToast();
//   const router = useRouter(); // Initialize useRouter

//   // Define the mutation for the login request
//   const mutation = useMutation({
//     mutationFn: async (data: LoginFormData) => {
//       const response = await axios.post(
//         "http://localhost:3000/v1/loggin/login",
//         data
//       );
//       return response.data; // Return the response data
//     },
//     onSuccess: () => {
//       toast({
//         title: "Login Successful",
//         description: "Welcome back!",
//         duration: 3000,
//       });
//       router.push("/Dashboard"); // Navigate to the Dashboard page on success
//     },
//     onError: (err: any) => {
//       toast({
//         title: "Login Failed",
//         description:
//           err.response?.data?.message ||
//           "Please check your credentials and try again.",
//         variant: "destructive",
//         duration: 3000,
//       });
//     },
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true); // Set loading to true when submitting

//     mutation.mutate(formData); // Trigger the mutation with form data

//     // Wait for the mutation to complete
//     await mutation.mutateAsync(formData);

//     setLoading(false); // Set loading to false after mutation
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"
//     >
//       <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//             placeholder="Enter your email"
//           />
//         </div>
//         <div>
//           <Label htmlFor="password">Password</Label>
//           <div className="relative">
//             <Input
//               id="password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               value={formData.password}
//               onChange={handleInputChange}
//               required
//               placeholder="Enter your password"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2"
//             >
//               {showPassword ? (
//                 <EyeOffIcon className="h-4 w-4 text-gray-500" />
//               ) : (
//                 <EyeIcon className="h-4 w-4 text-gray-500" />
//               )}
//             </button>
//           </div>
//         </div>
//         <Button type="submit" className="w-full" disabled={loading}>
//           {loading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Logging in...
//             </>
//           ) : (
//             "Login"
//           )}
//         </Button>
//       </form>
//       <div className="mt-4 text-center">
//         <Link
//           href="/ResetPasswordEmail"
//           className="text-sm text-blue-600 hover:underline"
//         >
//           Forgot password?
//         </Link>
//       </div>
//       <div className="mt-6 text-center">
//         <p className="text-sm text-gray-600">
//           Don't have an account?{" "}
//           <Link href="/register" className="text-blue-600 hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </motion.div>
//   );
// }
