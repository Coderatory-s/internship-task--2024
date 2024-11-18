"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useResetPasswordStore } from "../../../store/resetpassword"; // Import Zustand store
// import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

interface Props {
  params: {
    id: string;
    token: string;
  };
}

const ResetPassword: React.FC<Props> = ({ params }) => {
  const { id, token } = params;
  const router = useRouter();

  const {
    password,
    passwordConfirmation,
    message,
    setPassword,
    setPasswordConfirmation,
    setMessage,
    resetForm,
  } = useResetPasswordStore(); // Use Zustand store

  // Define the mutation for resetting the password
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `http://localhost:3000/v1/Userpasswordreset/userresetpass/${id}/${token}`,
        {
          password,
          password_confirmation: passwordConfirmation,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status === "success") {
        setMessage("Password has been reset successfully");
        resetForm(); // Clear the form after success
        router.push("/login"); // Redirect to login
      } else {
        setMessage(data.message);
      }
    },
    onError: () => {
      setMessage("Error resetting password");
    },
  });

  const handlePasswordReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setMessage("Passwords do not match");
      return;
    }

    mutation.mutate();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div>
            <Label htmlFor="password">New Password:</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your new password"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="passwordConfirmation">Confirm Password:</Label>
            <Input
              type="password"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              placeholder="Re-enter your new password"
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
        {message && (
          <p
            className={`text-center ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

// "use client";

// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useMutation } from "@tanstack/react-query";
// import { useResetPasswordStore } from "../../../store/resetpassword"; // Import Zustand store
// // import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

// interface Props {
//   params: {
//     id: string;
//     token: string;
//   };
// }

// const ResetPassword: React.FC<Props> = ({ params }) => {
//   const { id, token } = params;
//   const router = useRouter();

//   const {
//     password,
//     passwordConfirmation,
//     message,
//     setPassword,
//     setPasswordConfirmation,
//     setMessage,
//     resetForm,
//   } = useResetPasswordStore(); // Use Zustand store

//   // Define the mutation for resetting the password
//   const mutation = useMutation({
//     mutationFn: async () => {
//       const response = await axios.post(
//         `http://localhost:3000/v1/Userpasswordreset/userresetpass/${id}/${token}`,
//         {
//           password,
//           password_confirmation: passwordConfirmation,
//         }
//       );
//       return response.data;
//     },
//     onSuccess: (data) => {
//       if (data.status === "success") {
//         setMessage("Password has been reset successfully");
//         resetForm(); // Clear the form after success
//         router.push("/login"); // Redirect to login
//       } else {
//         setMessage(data.message);
//       }
//     },
//     onError: () => {
//       setMessage("Error resetting password");
//     },
//   });

//   const handlePasswordReset = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (password !== passwordConfirmation) {
//       setMessage("Passwords do not match");
//       return;
//     }

//     mutation.mutate();
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold text-center">Reset Password</h1>
//         <form onSubmit={handlePasswordReset} className="space-y-4">
//           <div>
//             <Label htmlFor="password">New Password:</Label>
//             <Input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               placeholder="Enter your new password"
//               className="mt-1"
//             />
//           </div>
//           <div>
//             <Label htmlFor="passwordConfirmation">Confirm Password:</Label>
//             <Input
//               type="password"
//               id="passwordConfirmation"
//               value={passwordConfirmation}
//               onChange={(e) => setPasswordConfirmation(e.target.value)}
//               required
//               placeholder="Re-enter your new password"
//               className="mt-1"
//             />
//           </div>
//           <Button type="submit" className="w-full">
//             Reset Password
//           </Button>
//         </form>
//         {message && (
//           <p
//             className={`text-center ${
//               message.includes("success") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation"; // Use this for navigation
// import axios from "axios";
// import { Button } from "@/components/ui/button"; // Shadcn Button component
// import { Input } from "@/components/ui/input"; // Shadcn Input component
// import { Label } from "@/components/ui/label"; // Shadcn Label component
// import { useToast } from "@/hooks/use-toast"; // Toast hook for notifications
// import { useMutation } from "@tanstack/react-query"; // Import useMutation

// interface Props {
//   params: {
//     id: string; // Expecting id to be a string
//     token: string; // Expecting token to be a string
//   };
// }

// const ResetPassword: React.FC<Props> = ({ params }) => {
//   const router = useRouter();
//   const { id, token } = params; // Accessing id and token from params

//   const [password, setPassword] = useState<string>("");
//   const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
//   const [message, setMessage] = useState<string>("");

//   // Define the mutation for resetting the password
//   const mutation = useMutation({
//     mutationFn: async () => {
//       const response = await axios.post(
//         `http://localhost:3000/v1/Userpasswordreset/userresetpass/${id}/${token}`,
//         {
//           password,
//           password_confirmation: passwordConfirmation,
//         }
//       );
//       return response.data; // Return the response data
//     },
//     onSuccess: (data) => {
//       if (data.status === "success") {
//         setMessage("Password has been reset successfully");
//         router.push("/login"); // Redirect to login after successful reset
//       } else {
//         setMessage(data.message);
//       }
//     },
//     onError: () => {
//       setMessage("Error resetting password");
//     },
//   });

//   const handlePasswordReset = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (password !== passwordConfirmation) {
//       setMessage("Passwords do not match");
//       return;
//     }

//     // Trigger the mutation
//     mutation.mutate();
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold text-center">Reset Password</h1>
//         <form onSubmit={handlePasswordReset} className="space-y-4">
//           <div>
//             <Label htmlFor="password">New Password:</Label>
//             <Input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               placeholder="Enter your new password"
//               className="mt-1" // Add margin-top for better spacing
//             />
//           </div>
//           <div>
//             <Label htmlFor="passwordConfirmation">Confirm Password:</Label>
//             <Input
//               type="password"
//               id="passwordConfirmation"
//               value={passwordConfirmation}
//               onChange={(e) => setPasswordConfirmation(e.target.value)}
//               required
//               placeholder="Re-enter your new password"
//               className="mt-1" // Add margin-top for better spacing
//             />
//           </div>
//           <Button type="submit" className="w-full">
//             Reset Password
//           </Button>
//         </form>
//         {message && (
//           <p
//             className={`text-center ${
//               message.includes("success") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;
