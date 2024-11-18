"use client";
import { useState } from "react"; // Import useState
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card"; // Import Shadcn Card component
import LogoutModal from "../components/Logoutmodal"; // Import the LogoutModal component

const Sidebar = () => {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false); // State for modal visibility

  return (
    <Card className="w-64 h-screen-347 p-4 bg-sky-900 shadow-md text-white">
      <h2 className="text-lg font-bold mb-4">Dashboard</h2>
      <ul className="space-y-2">
        <li>
          <Link
            href="/Dashboard"
            className="block text-white hover:underline transition duration-200"
          >
            New Joiners
          </Link>
        </li>
        <li>
          <Link
            href="/CompanyTour"
            className="block text-white hover:underline transition duration-200"
          >
            Company Tour
          </Link>
        </li>
        {/* Add other navigation links as needed */}
        <li>
          <Button onClick={() => setLogoutModalOpen(true)} className="w-full">
            Logout
          </Button>
        </li>
      </ul>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
      />
    </Card>
  );
};

export default Sidebar;

// // components/Sidebar.tsx
// "use client";
// import Link from "next/link";
// import { Card } from "@/components/ui/card"; // Import Shadcn Card component

// const Sidebar = () => {
//   return (
//     <Card className="w-64 h-screen-347 p-4 bg-sky-900 shadow-md text-white">
//       {" "}
//       {/* Shadcn Card styling */}
//       <h2 className="text-lg font-bold mb-4">Dashboard</h2>
//       <ul className="space-y-2">
//         <li>
//           <Link
//             href="/Dashboard"
//             className="block text-white hover:underline transition duration-200"
//           >
//             New Joiners
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/CompanyTour"
//             className="block text-white hover:underline transition duration-200"
//           >
//             Company Tour
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/Logout"
//             className="block text-white hover:underline transition duration-200"
//           >
//             Logout
//           </Link>
//         </li>
//         {/* Add other navigation links as needed */}
//       </ul>
//     </Card>
//   );
// };

// export default Sidebar;

// // app/dashboard/components/Sidebar.tsx
// import { FC } from "react";
// import Link from "next/link"; // Import Link for navigation
// import styles from "../../CSS/sidebar.module.css"; // Assuming you have a CSS module for styling

// interface SidebarProps {
//   onSelect: (page: string) => void; // Define the type for onSelect
// }

// const Sidebar: FC<SidebarProps> = ({ onSelect }) => {
//   return (
//     <nav className={styles.sidebar}>
//       <ul>
//         <li>
//           <Link href="/" onClick={() => onSelect("dashboard")}>
//             Dashboard
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/employee specific data"
//             onClick={() => onSelect("employees")}
//           >
//             Employees
//           </Link>
//         </li>
//         <li>
//           <Link href="/Company Tour" onClick={() => onSelect("settings")}>
//             Company Tour
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Sidebar;
