"use client";
import axios from "axios";
import styles from "../CSS/Resetpassemail.module.css";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useResetPasswordStore } from "../store/resetPasswordStore"; // Import Zustand store

const ResetPasswordEmailForm: React.FC = () => {
  // Destructure from Zustand store with appropriate TypeScript types
  const { email, message, error, setEmail, setMessage, setError, resetForm } =
    useResetPasswordStore();

  // Define the mutation for sending the reset email
  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await axios.post(
        "http://localhost:3000/v1/passwordreset/passwordresetemail",
        { email }
      );
      return response.data;
    },
    onSuccess: () => {
      // Update success message
      console.log("email sent succesfully");
      setMessage("Email successfully sent! Please check your inbox.");
      resetForm(); // Clear the form after success
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || "Failed to send reset email.");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    mutation.mutate(email);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.heading}>Reset Password</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {message && <p className={styles.successMessage}>{message}</p>}

      <label htmlFor="email" className={styles.label}>
        Email:
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.inputField}
        required
      />
      <Button type="submit" className="mt-4">
        Send Reset Link
      </Button>
    </form>
  );
};

export default ResetPasswordEmailForm;

// "use client";
// import axios from "axios";
// import styles from "../CSS/Resetpassemail.module.css";
// import { Button } from "@/components/ui/button";
// import { useMutation } from "@tanstack/react-query";
// import { useResetPasswordStore } from "../store/resetPasswordStore"; // Import Zustand store

// const ResetPasswordEmailForm = () => {
//   const { email, message, error, setEmail, setMessage, setError, resetForm } =
//     useResetPasswordStore(); // Use Zustand store

//   // Define the mutation for sending the reset email
//   const mutation = useMutation({
//     mutationFn: async (email: string) => {
//       const response = await axios.post(
//         "http://localhost:3000/v1/passwordreset/passwordresetemail",
//         { email }
//       );
//       return response.data;
//     },
//     onSuccess: () => {
//       setMessage("Reset password email sent! Please check your inbox.");
//       resetForm(); // Clear the form after success
//     },
//     onError: (err: any) => {
//       setError(err.response?.data?.message || "Failed to send reset email.");
//     },
//   });

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);
//     setMessage(null);

//     if (!email) {
//       setError("Please enter your email address.");
//       return;
//     }

//     mutation.mutate(email);
//   };

//   return (
//     <form onSubmit={handleSubmit} className={styles.formContainer}>
//       <h2 className={styles.heading}>Reset Password</h2>
//       {error && <p className={styles.errorMessage}>{error}</p>}
//       {message && <p className={styles.successMessage}>{message}</p>}

//       <label htmlFor="email" className={styles.label}>
//         Email:
//       </label>
//       <input
//         type="email"
//         id="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className={styles.inputField}
//         required
//       />

//       <Button type="submit" className="mt-4">
//         Send Reset Link
//       </Button>
//     </form>
//   );
// };

// export default ResetPasswordEmailForm;

// "use client";
// import { useState } from "react";
// import axios from "axios"; // Import axios
// import styles from "../CSS/Resetpassemail.module.css";
// import { Button } from "@/components/ui/button"; // Import Button component
// import { useMutation } from "@tanstack/react-query"; // Import useMutation

// const ResetPasswordEmailForm = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   // Define the mutation for sending the reset email
//   const mutation = useMutation({
//     mutationFn: async (email: string) => {
//       const response = await axios.post(
//         "http://localhost:3000/v1/passwordreset/passwordresetemail",
//         { email }
//       );
//       return response.data; // Return the response data
//     },
//     onSuccess: () => {
//       setMessage("Reset password email sent! Please check your inbox.");
//       setEmail(""); // Clear the email input
//     },
//     onError: (err: any) => {
//       setError(err.response?.data?.message || "Failed to send reset email.");
//     },
//   });

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);
//     setMessage(null);

//     // Simple validation
//     if (!email) {
//       setError("Please enter your email address.");
//       return;
//     }

//     // Trigger the mutation
//     mutation.mutate(email);
//   };

//   return (
//     <form onSubmit={handleSubmit} className={styles.formContainer}>
//       <h2 className={styles.heading}>Reset Password</h2>
//       {error && <p className={styles.errorMessage}>{error}</p>}
//       {message && <p className={styles.successMessage}>{message}</p>}

//       <label htmlFor="email" className={styles.label}>
//         Email:
//       </label>
//       <input
//         type="email"
//         id="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className={styles.inputField}
//         required
//       />

//       <Button type="submit" className="mt-4">
//         Send Reset Link
//       </Button>
//     </form>
//   );
// };

// export default ResetPasswordEmailForm;
