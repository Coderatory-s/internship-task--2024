
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../../app/globals.css';

const Navbar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0); // Track notification count
  const router = useRouter();

  // Function to fetch notifications (mock implementation)
  const fetchNotifications = () => {
    // Replace this mock logic with an actual API call
    setTimeout(() => {
      setNotificationCount((prev) => prev + 1); // Simulate a new notification
    }, 5000);
  };

  // UseEffect to poll notifications
  useEffect(() => {
    fetchNotifications(); // Initial fetch
    const interval = setInterval(fetchNotifications, 15000); // Poll every 15 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="flex items-center justify-between bg-gray-100 px-4 py-3 shadow-md">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
          >
            {/* Menu Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
        </div>

        <div className="text-xl font-semibold text-gray-800">
          <a href="/">HRM</a>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Notifications Icon with Dynamic Badge */}
          <button className="relative p-2 rounded-full hover:bg-gray-200 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 text-xs font-bold text-white bg-red-500 rounded-full">
                {notificationCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-200 shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center bg-gray-300 px-4 py-3 shadow-md">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={toggleSidebar} className="text-gray-600 focus:outline-none">
            {/* Close Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <ul className="p-4 space-y-4">
          <li className="px-4 py-2 hover:bg-gray-300 rounded-lg cursor-pointer">
            <button onClick={() => handleNavigation('/')}>Homepage</button>
          </li>
          <li className="px-4 py-2 hover:bg-gray-300 rounded-lg cursor-pointer">
            <button onClick={() => handleNavigation('/service')}>Service</button>
          </li>
          <li className="px-4 py-2 hover:bg-gray-300 rounded-lg cursor-pointer">
            <button onClick={() => handleNavigation('/about')}>About</button>
          </li>
          <li className="px-4 py-2 hover:bg-gray-300 rounded-lg cursor-pointer">
            <button onClick={() => handleNavigation('/signup')}>Registration</button>
          </li>
          <li className="px-4 py-2 hover:bg-gray-300 rounded-lg cursor-pointer">
            <button onClick={() => handleNavigation('/Dashboard')}>Dashboard</button>
          </li>
          <li className="px-4 py-2 hover:bg-gray-300 rounded-lg cursor-pointer">
            <button onClick={() => handleNavigation('/Profile')}>Profile</button>
          </li>
          <li className="px-4 py-2 hover:bg-gray-300 rounded-lg cursor-pointer">
            <button onClick={() => handleNavigation('/Jobs')}>Jobs</button>
          </li>
        </ul>

        <ul>
          <li className="px-4 py-2 hover:bg-gray-300 rounded-lg cursor-pointer mt-auto">
            <button onClick={() => handleNavigation('/signup')}>Logout</button>
          </li>
        </ul>
      </div>

      {/* Overlay for Sidebar when open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Navbar;
