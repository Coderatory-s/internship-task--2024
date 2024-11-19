import React, { useState } from "react";
import "../../app/globals.css";

const CreateAttendanceForm: React.FC = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    date: "",
    status: "",
    checkInTime: "",
    checkOutTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!formData.employeeId || !formData.date || !formData.status || !formData.checkInTime || !formData.checkOutTime) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      // Convert time fields into the correct format (ISO 8601 format: YYYY-MM-DDTHH:mm)
      const formattedCheckInTime = `${formData.date}T${formData.checkInTime}:00`; // Assuming the backend expects a full datetime string
      const formattedCheckOutTime = `${formData.date}T${formData.checkOutTime}:00`;

      const updatedFormData = {
        ...formData,
        checkInTime: formattedCheckInTime,
        checkOutTime: formattedCheckOutTime,
      };

      const response = await fetch("http://localhost:3000/v1/attendence/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        alert("Attendance record created successfully!");
        setFormData({
          employeeId: "",
          date: "",
          status: "",
          checkInTime: "",
          checkOutTime: "",
        });
      } else {
        // Log the response and error message
        const errorData = await response.json();
        console.error("Error response from API:", errorData);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating attendance:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Create Attendance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
            Employee ID
          </label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="on leave">On Leave</option>
          </select>
        </div>
        <div>
          <label htmlFor="checkInTime" className="block text-sm font-medium text-gray-700">
            Check-In Time
          </label>
          <input
            type="time"
            id="checkInTime"
            name="checkInTime"
            value={formData.checkInTime}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="checkOutTime" className="block text-sm font-medium text-gray-700">
            Check-Out Time
          </label>
          <input
            type="time"
            id="checkOutTime"
            name="checkOutTime"
            value={formData.checkOutTime}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-center mt-2">{errorMessage}</p>
        )}
        <div>
          <button
            type="submit"
            className={`w-full ${loading ? "bg-gray-400" : "bg-indigo-600"} text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Create Attendance"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAttendanceForm;
