"use client";
import { useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useEmployeeStore } from "../store/employeeStore"; // Import the Zustand store

const Dashboard = () => {
  const { employees, error, isLoading, setEmployees, setError, setLoading } =
    useEmployeeStore(); // Access Zustand store

  const fetchEmployees = async () => {
    try {
      setLoading(true); // Set loading state to true
      const response = await axios.get(
        "http://localhost:3000/v1/GetEmployeeData/getdata",
        {
          params: {
            email: "salvatore@example.com", // Pass email as a query parameter
          },
        }
      );
      setEmployees(response.data.employees); // Update employees in Zustand store
      setError(null); // Clear any previous error
    } catch (err: any) {
      setError(err.message || "Failed to fetch employee data"); // Set error in Zustand store
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []); // Fetch employees when the component mounts

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-blue-50">
        <Header />
        <h2 className="text-2xl font-bold mb-4">New Joiner Dashboard</h2>

        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading employees...</span>
          </div>
        )}

        {error && <p className="text-red-600">{error}</p>}

        {!isLoading && employees && employees.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {employees.map((employee) => (
              <Card key={employee._id} className="p-4 shadow-md bg-white">
                <h3 className="font-semibold text-lg">
                  Employee ID: {employee._id}
                </h3>
                <p>
                  <strong>First Name:</strong>{" "}
                  {employee.firstName || "No First Name Provided"}
                </p>
                <p>
                  <strong>Last Name:</strong>{" "}
                  {employee.lastName || "No Last Name Provided"}
                </p>
                <p>
                  <strong>Position:</strong>{" "}
                  {employee.position || "No Position Provided"}
                </p>
                <p>
                  <strong>Salary:</strong>{" "}
                  {employee.salary !== null
                    ? employee.salary
                    : "No Salary Provided"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {employee.isActive ? "Active" : "Inactive"}
                </p>
                <Button variant="outline" className="mt-2">
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && employees && employees.length === 0 && (
          <p>No employees found.</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

// "use client";
// import { useEffect } from "react";
// import axios from "axios"; // Import Axios
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
// import { Button } from "@/components/ui/button"; // Shadcn Button component
// import { Card } from "@/components/ui/card"; // Shadcn Card component
// import { Loader2 } from "lucide-react"; // Loading spinner icon
// import { useQuery } from "@tanstack/react-query"; // Import useQuery

// // Define the Employee type
// interface Employee {
//   _id: string;
//   firstName: string | null;
//   lastName: string | null;
//   position: string | null;
//   salary: number | null;
//   isActive: boolean;
// }

// const Dashboard = () => {
//   const fetchEmployees = async () => {
//     const response = await axios.get(
//       "http://localhost:3000/v1/GetEmployeeData/getdata",
//       {
//         params: {
//           email: "salvatore@example.com", // Pass email as a query parameter
//         },
//       }
//     );

//     return response.data.employees as Employee[]; // Cast response to Employee[]
//   };

//   // Use useQuery to fetch employees
//   const {
//     data: employees,
//     error,
//     isLoading,
//   } = useQuery<Employee[]>({
//     // Specify the type for the query data
//     queryKey: ["employees"], // Unique key for the query
//     queryFn: fetchEmployees, // Function to fetch data
//   });

//   return (
//     <div className="flex">
//       <Sidebar />
//       <main className="flex-1 p-6 bg-blue-50">
//         <Header />
//         <h2 className="text-2xl font-bold mb-4">New Joiner Dashboard</h2>

//         {isLoading && (
//           <div className="flex items-center justify-center">
//             <Loader2 className="h-6 w-6 animate-spin" />
//             <span className="ml-2">Loading employees...</span>
//           </div>
//         )}

//         {error && (
//           <p className="text-red-600">
//             {error.message || "Failed to fetch employee data"}
//           </p>
//         )}

//         {!isLoading && employees && employees.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {employees.map((employee) => (
//               <Card key={employee._id} className="p-4 shadow-md bg-white">
//                 <h3 className="font-semibold text-lg">
//                   Employee ID: {employee._id}
//                 </h3>
//                 <p>
//                   <strong>First Name:</strong>{" "}
//                   {employee.firstName || "No First Name Provided"}
//                 </p>
//                 <p>
//                   <strong>Last Name:</strong>{" "}
//                   {employee.lastName || "No Last Name Provided"}
//                 </p>
//                 <p>
//                   <strong>Position:</strong>{" "}
//                   {employee.position || "No Position Provided"}
//                 </p>
//                 <p>
//                   <strong>Salary:</strong>{" "}
//                   {employee.salary !== null
//                     ? employee.salary
//                     : "No Salary Provided"}
//                 </p>
//                 <p>
//                   <strong>Status:</strong>{" "}
//                   {employee.isActive ? "Active" : "Inactive"}
//                 </p>
//                 <Button variant="outline" className="mt-2">
//                   View Details
//                 </Button>
//               </Card>
//             ))}
//           </div>
//         )}

//         {!isLoading && employees && employees.length === 0 && (
//           <p>No employees found.</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios"; // Import Axios
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
// import { Button } from "@/components/ui/button"; // Shadcn Button component
// import { Card } from "@/components/ui/card"; // Shadcn Card component
// import { Loader2 } from "lucide-react"; // Loading spinner icon

// const Dashboard = () => {
//   const [employees, setEmployees] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3000/v1/GetEmployeeData/getdata",
//         {
//           params: {
//             email: "salvatore@example.com", // Pass email as a query parameter
//           },
//         }
//       );

//       console.log(response.data); // Log the entire response

//       // Assuming the structure of response is { employees: [...] }
//       setEmployees(response.data.employees);
//     } catch (err: any) {
//       setError(err.message || "Failed to fetch employee data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   return (
//     <div className="flex">
//       <Sidebar />
//       <main className="flex-1 p-6 bg-blue-50">
//         <Header />
//         <h2 className="text-2xl font-bold mb-4">New Joiner Dashboard</h2>

//         {loading && (
//           <div className="flex items-center justify-center">
//             <Loader2 className="h-6 w-6 animate-spin" />
//             <span className="ml-2">Loading employees...</span>
//           </div>
//         )}

//         {error && <p className="text-red-600">{error}</p>}

//         {!loading && employees.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {employees.map((employee) => (
//               <Card key={employee._id} className="p-4 shadow-md bg-white">
//                 <h3 className="font-semibold text-lg">
//                   Employee ID: {employee._id}
//                 </h3>
//                 <p>
//                   <strong>First Name:</strong>{" "}
//                   {employee.firstName || "No First Name Provided"}
//                 </p>
//                 <p>
//                   <strong>Last Name:</strong>{" "}
//                   {employee.lastName || "No Last Name Provided"}
//                 </p>
//                 <p>
//                   <strong>Position:</strong>{" "}
//                   {employee.position || "No Position Provided"}
//                 </p>
//                 <p>
//                   <strong>Salary:</strong>{" "}
//                   {employee.salary || "No Salary Provided"}
//                 </p>
//                 <p>
//                   <strong>Status:</strong>{" "}
//                   {employee.isActive ? "Active" : "Inactive"}
//                 </p>
//                 <Button variant="outline" className="mt-2">
//                   View Details
//                 </Button>
//               </Card>
//             ))}
//           </div>
//         )}

//         {!loading && employees.length === 0 && <p>No employees found.</p>}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
