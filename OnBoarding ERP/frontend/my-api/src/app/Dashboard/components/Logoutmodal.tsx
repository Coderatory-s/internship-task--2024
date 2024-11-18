"use client"; // Mark this file as a client component

import { useEffect } from "react";
import { Button } from "@/components/ui/button"; // Import Shadcn Button component
import { useToast } from "@/hooks/use-toast"; // Adjust the import according to your toast hook path
import { useMutation } from "@tanstack/react-query"; // Import React Query's useMutation
import axios from "axios";
import { Card } from "@/components/ui/card"; // Import Shadcn Card component
import { useLogoutStore } from "../../store/logoutStore"; // Import the Zustand store

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const { loading, setLoading } = useLogoutStore(); // Destructure from Zustand store

  // Define the mutation for the logout request
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "http://localhost:3000/v1/LogOut/logout",
        {},
        {
          withCredentials: true, // Important for sending cookies
        }
      );
      return response; // Return the response to use in onSuccess/onError
    },
    onSuccess: () => {
      toast({
        title: "Logout Successful",
        description: "You have been logged out.",
        duration: 3000,
      });
      // Optionally, redirect the user to the login page or home page
      window.location.href = "/login"; // Redirect to login page
    },
    onError: (error: any) => {
      toast({
        title: "Logout Failed",
        description:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    },
    onMutate: () => {
      setLoading(true); // Set loading to true when the mutation starts
    },
    onSettled: () => {
      setLoading(false); // Reset loading to false when mutation settles
    },
  });

  const handleLogout = () => {
    mutation.mutate(); // Trigger the mutation
  };

  useEffect(() => {
    if (!isOpen) {
      setLoading(false); // Reset loading state when modal closes
    }
  }, [isOpen, setLoading]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
        <p className="mb-4">Are you sure you want to log out?</p>
        <div className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleLogout} disabled={loading}>
            {loading ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LogoutModal;

// "use client"; // Mark this file as a client component

// import { useState } from "react";
// import { Button } from "@/components/ui/button"; // Import Shadcn Button component
// import { useToast } from "@/hooks/use-toast"; // Adjust the import according to your toast hook path
// import axios from "axios";
// import { Card } from "@/components/ui/card"; // Import Shadcn Card component

// interface LogoutModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
//   const [loading, setLoading] = useState(false);
//   const { toast } = useToast();

//   const handleLogout = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/v1/LogOut/logout",
//         {},
//         {
//           withCredentials: true, // Important for sending cookies
//         }
//       );

//       if (response.status === 200) {
//         toast({
//           title: "Logout Successful",
//           description: "You have been logged out.",
//           duration: 3000,
//         });

//         // Optionally, redirect the user to the login page or home page
//         window.location.href = "/login"; // Redirect to login page
//       }
//     } catch (error: any) {
//       toast({
//         title: "Logout Failed",
//         description:
//           error.response?.data?.message ||
//           "An error occurred. Please try again.",
//         variant: "destructive",
//         duration: 3000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <Card className="bg-white rounded-lg shadow-lg p-6 w-96">
//         <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
//         <p className="mb-4">Are you sure you want to log out?</p>
//         <div className="flex justify-between">
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleLogout} disabled={loading}>
//             {loading ? "Logging out..." : "Logout"}
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default LogoutModal;
