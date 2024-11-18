"use client"; // Use client-side rendering
import { useEffect } from "react";
import axios from "axios";
import Sidebar from "../Dashboard/components/Sidebar"; // Adjust the path as necessary
import Header from "../Dashboard/components/Header"; // Adjust the path as necessary
import { useTourStore } from "../store/tourStore"; // Import Zustand store

const TourPage = () => {
  const {
    tourInfo,
    message,
    error,
    isLoading,
    setTourInfo,
    setError,
    setLoading,
  } = useTourStore(); // Access Zustand store

  const fetchTourInfo = async () => {
    try {
      setLoading(true); // Set loading state to true
      const response = await axios.get(
        "http://localhost:3000/v1/CompanyTourData/Tourdata", // Adjust the URL according to your server setup
        {
          params: {
            title: "Welcome to the Company!", // Send the title as a query parameter
          },
        }
      );
      const data = response.data;
      setTourInfo(data.companyTour, data.message); // Set tour info and message in Zustand store
      setError(null); // Clear any previous error
    } catch (err: any) {
      setError(err.message || "Failed to fetch tour information"); // Set error in Zustand store
    }
  };

  useEffect(() => {
    fetchTourInfo(); // Fetch tour data when the component mounts
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-blue-50">
        <Header />
        <h1 className="text-3xl font-bold mb-4">Company Tour</h1>

        {isLoading && (
          <p className="text-gray-500">Loading tour information...</p>
        )}
        {error && <p className="text-red-600">{error}</p>}
        {tourInfo && (
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">{message}</h2>
            <ul className="mt-2 space-y-2">
              {tourInfo.map((tourItem) => (
                <li
                  key={tourItem._id}
                  className="border p-4 rounded-md bg-white shadow"
                >
                  <h3 className="text-xl font-semibold">{tourItem.title}</h3>
                  <p className="text-gray-700">{tourItem.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default TourPage;

// "use client"; // Use client-side rendering
// import axios from "axios";
// import Sidebar from "../Dashboard/components/Sidebar"; // Adjust the path as necessary
// import Header from "../Dashboard/components/Header"; // Adjust the path as necessary
// import { useQuery } from "@tanstack/react-query"; // Import useQuery

// // Define the structure of the tour item
// interface TourItem {
//   _id: string;
//   title: string;
//   description: string;
// }

// // Define the structure of the tour data
// interface TourData {
//   message: string;
//   companyTour: TourItem[];
// }

// const TourPage = () => {
//   const fetchTourInfo = async () => {
//     const response = await axios.get<TourData>(
//       "http://localhost:3000/v1/CompanyTourData/Tourdata", // Adjust the URL according to your server setup
//       {
//         params: {
//           title: "Welcome to the Company!", // Send the title as a query parameter
//         },
//       }
//     );
//     return response.data; // Return the tour data
//   };

//   // Use useQuery to fetch tour information
//   const {
//     data: tourInfo,
//     error,
//     isLoading,
//   } = useQuery<TourData>({
//     queryKey: ["tourInfo"], // Unique key for the query
//     queryFn: fetchTourInfo, // Function to fetch data
//   });

//   return (
//     <div className="flex">
//       <Sidebar />
//       <main className="flex-1 p-6 bg-blue-50">
//         <Header />
//         <h1 className="text-3xl font-bold mb-4">Company Tour</h1>
//         {isLoading && (
//           <p className="text-gray-500">Loading tour information...</p>
//         )}
//         {error && (
//           <p className="text-red-600">
//             {error.message || "Failed to fetch tour information"}
//           </p>
//         )}
//         {tourInfo && (
//           <div className="mt-4">
//             <h2 className="text-2xl font-semibold">{tourInfo.message}</h2>
//             <ul className="mt-2 space-y-2">
//               {tourInfo.companyTour.map((tourItem) => (
//                 <li
//                   key={tourItem._id}
//                   className="border p-4 rounded-md bg-white shadow"
//                 >
//                   <h3 className="text-xl font-semibold">{tourItem.title}</h3>
//                   <p className="text-gray-700">{tourItem.description}</p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default TourPage;

// "use client"; // Use client-side rendering
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../Dashboard/components/Sidebar"; // Adjust the path as necessary
// import Header from "../Dashboard/components/Header"; // Adjust the path as necessary
// import styles from "../CSS/Dashboard.module.css";

// const TourPage = () => {
//   const [tourInfo, setTourInfo] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchTourInfo = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3000/v1/CompanyTourData/Tourdata", // Adjust the URL according to your server setup
//         {
//           params: {
//             title: "Welcome to the Company!", // Send the title as a query parameter
//           },
//         }
//       );

//       setTourInfo(response.data);
//     } catch (err: any) {
//       setError(err.message || "Failed to fetch tour information");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTourInfo();
//   }, []);

//   return (
//     <div className="flex">
//       <Sidebar />
//       <main className="flex-1 p-6 bg-blue-50">
//         <Header />
//         <h1 className="text-3xl font-bold mb-4">Company Tour</h1>
//         {loading && (
//           <p className="text-gray-500">Loading tour information...</p>
//         )}
//         {error && <p className="text-red-600">{error}</p>}
//         {tourInfo && (
//           <div className="mt-4">
//             <h2 className="text-2xl font-semibold">{tourInfo.message}</h2>
//             <ul className="mt-2 space-y-2">
//               {tourInfo.companyTour.map((tourItem: any) => (
//                 <li
//                   key={tourItem._id}
//                   className="border p-4 rounded-md bg-white shadow"
//                 >
//                   <h3 className="text-xl font-semibold">{tourItem.title}</h3>
//                   <p className="text-gray-700">{tourItem.description}</p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default TourPage;
