"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { registerstore } from "../store/registerstore"; // Import Zustand store
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  salary: string;
  isActive: boolean;
  password: string;
}

const Register: React.FC = () => {
  const { formData, setFormData, resetForm } = registerstore(); // Use Zustand store
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const mutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const response = await axios.post(
        "http://localhost:3000/v1/reg/register",
        data
      );
      return response.data;
    },
    onSuccess: () => {
      setSuccess("Registration successful!");
      resetForm(); // Reset form after successful registration
    },
    onError: (error: any) => {
      setError(
        error.response?.data?.message ||
          "An error occurred during registration."
      );
      console.error(error);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    mutation.mutate(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Registration Form</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Enter your last name"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div>
          <Label htmlFor="position">Position</Label>
          <Input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            placeholder="Enter your position"
          />
        </div>

        <div>
          <Label htmlFor="department">Department</Label>
          <Input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            placeholder="Enter your department"
          />
        </div>

        <div>
          <Label htmlFor="salary">Salary</Label>
          <Input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            placeholder="Enter your salary"
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="mr-2"
          />
          <Label htmlFor="isActive">Is Active</Label>
        </div>

        <div className="relative">
          <Label htmlFor="password">Password</Label>
          <Input
            type={showPassword ? "text" : "password"} // Toggle password visibility
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle the password visibility
            className="absolute inset-y-0 top:23px right-0 pr-3 flex items-center"
            style={{ top: "23px" }}
          >
            {formData.password ? (
              <EyeOffIcon className="h-4 w-4 text-gray-500" />
            ) : (
              <EyeIcon className="h-4 w-4 text-gray-500" />
            )}
          </button>
        </div>

        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

// app/register/page.tsx
// "use client";

// import { useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/hooks/use-toast";
// import { useMutation } from "@tanstack/react-query";

// interface FormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   position: string;
//   department: string;
//   salary: string;
//   isActive: boolean;
//   password: string;
// }

// const Register: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     position: "",
//     department: "",
//     salary: "",
//     isActive: false,
//     password: "",
//   });

//   const { toast } = useToast();
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   const mutation = useMutation({
//     mutationFn: async (data: FormData) => {
//       const response = await axios.post(
//         "http://localhost:3000/v1/reg/register",
//         data
//       );
//       return response.data;
//     },
//     onSuccess: () => {
//       setSuccess("Registration successful!");
//       setFormData({
//         firstName: "",
//         lastName: "",
//         email: "",
//         position: "",
//         department: "",
//         salary: "",
//         isActive: false,
//         password: "",
//       });
//     },
//     onError: (error: any) => {
//       setError(
//         error.response?.data?.message ||
//           "An error occurred during registration."
//       );
//       console.error(error);
//     },
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);
//     mutation.mutate(formData);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <h2 className="text-2xl font-bold text-center">Registration Form</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         {success && <p className="text-green-500">{success}</p>}

//         <div>
//           <Label htmlFor="firstName">First Name</Label>
//           <Input
//             type="text"
//             id="firstName"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//             placeholder="Enter your first name"
//           />
//         </div>

//         <div>
//           <Label htmlFor="lastName">Last Name</Label>
//           <Input
//             type="text"
//             id="lastName"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//             placeholder="Enter your last name"
//           />
//         </div>

//         <div>
//           <Label htmlFor="email">Email</Label>
//           <Input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             placeholder="Enter your email"
//           />
//         </div>

//         <div>
//           <Label htmlFor="position">Position</Label>
//           <Input
//             type="text"
//             id="position"
//             name="position"
//             value={formData.position}
//             onChange={handleChange}
//             required
//             placeholder="Enter your position"
//           />
//         </div>

//         <div>
//           <Label htmlFor="department">Department</Label>
//           <Input
//             type="text"
//             id="department"
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//             required
//             placeholder="Enter your department"
//           />
//         </div>

//         <div>
//           <Label htmlFor="salary">Salary</Label>
//           <Input
//             type="number"
//             id="salary"
//             name="salary"
//             value={formData.salary}
//             onChange={handleChange}
//             required
//             placeholder="Enter your salary"
//           />
//         </div>

//         <div className="flex items-center mb-4">
//           <input
//             type="checkbox"
//             id="isActive"
//             name="isActive"
//             checked={formData.isActive}
//             onChange={handleChange}
//             className="mr-2"
//           />
//           <Label htmlFor="isActive">Is Active</Label>
//         </div>

//         <div>
//           <Label htmlFor="password">Password</Label>
//           <Input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             placeholder="Enter your password"
//           />
//         </div>

//         <Button type="submit" className="w-full">
//           Register
//         </Button>
//       </form>

//       <div className="mt-6 text-center">
//         <p className="text-sm">
//           Already have an account?{" "}
//           <Link href="/login" className="text-blue-600 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
