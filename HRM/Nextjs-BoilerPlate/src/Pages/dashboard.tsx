/* eslint-disable react/jsx-no-undef */
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import '../app/globals.css';
import Navbar from '@/Components/Navbar/Navbar';
import AttendanceForm from '../Components/Attendence/attendence';
import GoalSettingForm from '../Components/goalSetting/GoalSetting';
import TaskSettingForm from '../Components/ProgressTracker/ProgressTracker';
import JobList from '@/Components/Joblist/Joblist';
import EmployeeManagement from '@/Components/EmployeeManagement/EmployeeManagement'; // New Component
import Footer from '../Components/Footer/Footer';
import AnimatedModal from '@/Components/AnimatedModal/AnimatedModal';

interface DashboardProps {
  isHR: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isHR }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [userRole, setUserRole] = useState<'employee' | 'hr' | null>(null); // To store user role (employee or hr)

  useEffect(() => {
    // Prompt the user for their role when the dashboard is first loaded
    const role = prompt("Are you an HR or Employee? Type 'HR' or 'Employee'");

    if (role) {
      const lowercasedRole = role.toLowerCase();
      if (lowercasedRole === 'hr') {
        setUserRole('hr');
      } else if (lowercasedRole === 'employee') {
        setUserRole('employee');
      } else {
        alert("Invalid input. Access denied.");
      }
    } else {
      alert("Access denied.");
    }
  }, []);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Reusable metric card component with animation
  const MetricCard = ({
    title,
    value,
    color,
  }: {
    title: string;
    value: string | number;
    color: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col justify-between p-4 rounded-lg shadow-md bg-gradient-to-r ${color} text-white`}
    >
      <h5 className="text-lg font-semibold">{title}</h5>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </motion.div>
  );

  if (userRole === null) {
    return <div>Loading...</div>; // Wait for the user role to be set
  }

  return (
    <>
      <div>
        <Navbar />
        <motion.div
          className="min-h-screen bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar for large screens */}
              {userRole === 'hr' && (
                <motion.div
                  className="hidden lg:block bg-white p-4 rounded-lg shadow-md"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <h2 className="text-2xl font-semibold mb-6 text-gray-800">HRM Tools</h2>
                  <ul className="space-y-4">
                    <li>
                      <a href="#dashboard" className="text-lg font-medium hover:text-blue-600">
                        Dashboard
                      </a>
                    </li>
                    <li
                      onClick={() => openModal(<AttendanceForm />)}
                      className="cursor-pointer text-lg font-medium hover:text-blue-600"
                    >
                      Attendance
                    </li>
                    <li
                      onClick={() => openModal(<GoalSettingForm />)}
                      className="cursor-pointer text-lg font-medium hover:text-blue-600"
                    >
                      Goal Setting
                    </li>
                    <li
                      onClick={() => openModal(<TaskSettingForm />)}
                      className="cursor-pointer text-lg font-medium hover:text-blue-600"
                    >
                      Task Setting
                    </li>
                    <li
                      onClick={() => openModal(<JobList />)}
                      className="cursor-pointer text-lg font-medium hover:text-blue-600"
                    >
                      Recruitment
                    </li>
                  </ul>
                </motion.div>
              )}

              {/* Sidebar for employees */}
              {userRole === 'employee' && (
                <motion.div
                  className="hidden lg:block bg-white p-4 rounded-lg shadow-md"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <h2 className="text-2xl font-semibold mb-6 text-gray-800">Employee Tools</h2>
                  <ul className="space-y-4">
                    <li>
                      <a href="#dashboard" className="text-lg font-medium hover:text-blue-600">
                        Dashboard
                      </a>
                    </li>
                    <li
                      onClick={() => openModal(<AttendanceForm />)}
                      className="cursor-pointer text-lg font-medium hover:text-blue-600"
                    >
                      Attendance
                    </li>
                    <li
                      onClick={() => openModal(<GoalSettingForm />)}
                      className="cursor-pointer text-lg font-medium hover:text-blue-600"
                    >
                      Goal Setting
                    </li>
                    <li
                      onClick={() => openModal(<EmployeeManagement />)} // New Employee Management Component
                      className="cursor-pointer text-lg font-medium hover:text-blue-600"
                    >
                      Employee Management
                    </li>
                    <li
                      onClick={() => openModal(<JobList />)} // Show Job List for employees
                      className="cursor-pointer text-lg font-medium hover:text-blue-600"
                    >
                      Job List
                    </li>
                  </ul>
                </motion.div>
              )}

              {/* Main Content */}
              <motion.div
                className="lg:col-span-3 bg-white p-6 shadow-md rounded-lg"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* Dashboard Header */}
                <div className="mb-6">
                  <h4 className="text-3xl font-bold text-gray-800">Dashboard</h4>
                  <p className="text-gray-600">Overview of HRM Metrics</p>
                </div>

                {/* Metrics Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <MetricCard title="Users" value="1 Million" color="from-blue-500 to-blue-600" />
                  <MetricCard title="Pages" value="100 Million" color="from-green-500 to-green-600" />
                  <MetricCard title="Sessions" value="10 Million" color="from-purple-500 to-purple-600" />
                  <MetricCard title="Bounce Rate" value="30%" color="from-red-500 to-red-600" />
                </div>

                {/* Features Section */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { staggerChildren: 0.2 },
                    },
                  }}
                >
                  <motion.div
                    className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openModal(<AttendanceForm />)}
                  >
                    <h5 className="text-xl font-semibold">Attendance Management</h5>
                    <p className="text-sm mt-2">Track and log employee attendance seamlessly.</p>
                  </motion.div>
                  <motion.div
                    className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openModal(<GoalSettingForm />)}
                  >
                    <h5 className="text-xl font-semibold">Goal Setting</h5>
                    <p className="text-sm mt-2">Set and track employee goals effectively.</p>
                  </motion.div>
                  <motion.div
                    className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openModal(<TaskSettingForm />)}
                  >
                    <h5 className="text-xl font-semibold">Task Management</h5>
                    <p className="text-sm mt-2">Track and manage employee tasks.</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal for displaying forms */}
      {modalOpen && <AnimatedModal isOpen={modalOpen} onClose={closeModal}>{modalContent}</AnimatedModal>}

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Dashboard;
