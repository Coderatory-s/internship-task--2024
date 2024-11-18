"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../app/globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import AttendanceForm from "../Components/timeclock/ClockInButton";
import GoalSettingForm from "../Components/Goals/GoalForm";
import TaskSettingForm from "../Components/Goals/ProgressTracker";
import RecruitmentForm from "../Components/Recruitment/Jobpostform";
import Footer from "../Components/Footer/Footer";
import AnimatedModal from "@/Components/Modal/animatedModal";
import CreateCandidateList from "@/Components/Recruitment/CandidateList";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [userRole, setUserRole] = useState<"employee" | "hr" | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
 
    const name = prompt("Please enter your name:");
    const role = prompt("Are you an HR or Employee? Type 'HR' or 'Employee'")?.toLowerCase();
    if (name) setUserName(name);
    if (role === "hr") {
      setUserRole("hr");
    } else if (role === "employee") {
      setUserRole("employee");
    } else {
      alert("Invalid input. Access denied.");
    }
  }, []);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (userRole === null) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <div>
        <Navbar />
        <motion.div
          className="min-h-screen bg-gray-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
        
          <motion.div
            className="w-1/4 bg-blue-500 text-white p-6 space-y-6 shadow-md"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-2xl font-bold mb-4">Hi {userName || "User"}</h4>
            <button
              className="w-full py-2 px-4 bg-blue-700 rounded-lg hover:bg-blue-600 transition duration-200"
              onClick={() => openModal(<AttendanceForm />)}
            >
              Attendance
            </button>
            <button
              className="w-full py-2 px-4 bg-blue-700 rounded-lg hover:bg-blue-600 transition duration-200"
              onClick={() => openModal(<GoalSettingForm />)}
            >
              Goal Setting
            </button>
            <button
              className="w-full py-2 px-4 bg-blue-700 rounded-lg hover:bg-blue-600 transition duration-200"
              onClick={() => openModal(<TaskSettingForm />)}
            >
              Task Setting
            </button>
            {userRole === "hr" && (
              <><button
                className="w-full py-2 px-4 bg-blue-700 rounded-lg hover:bg-blue-600 transition duration-200"
                onClick={() => openModal(<RecruitmentForm />)}
              >
                Recruitment
              </button><button
                className="w-full py-2 px-4 bg-blue-700 rounded-lg hover:bg-blue-600 transition duration-200"
                onClick={() => openModal(<CreateCandidateList />)}
              >
                  Candidate List
                </button></>
                      
            )}
          </motion.div>

        
          <div className="flex-1 p-6">
            <div className="bg-white p-6 shadow-md rounded-lg mb-6">
              <h4 className="text-3xl font-bold text-gray-800">Welcome</h4>
              <p className="text-gray-600">This is your HRM dashboard.</p>
            </div>

      
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-between p-4 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-blue-600 text-white"
              >
                <h5 className="text-lg font-semibold">Users</h5>
                <p className="text-3xl font-bold mt-2">1 Million</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-between p-4 rounded-lg shadow-md bg-gradient-to-r from-green-500 to-green-600 text-white"
              >
                <h5 className="text-lg font-semibold">Pages</h5>
                <p className="text-3xl font-bold mt-2">100 Million</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-between p-4 rounded-lg shadow-md bg-gradient-to-r from-purple-500 to-purple-600 text-white"
              >
                <h5 className="text-lg font-semibold">Sessions</h5>
                <p className="text-3xl font-bold mt-2">10 Million</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-between p-4 rounded-lg shadow-md bg-gradient-to-r from-red-500 to-red-600 text-white"
              >
                <h5 className="text-lg font-semibold">Bounce Rate</h5>
                <p className="text-3xl font-bold mt-2">30%</p>
              </motion.div>
            </div>
          </div>

      
          <AnimatedModal isOpen={modalOpen} onClose={closeModal}>
            {modalContent}
          </AnimatedModal>
        </motion.div>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
