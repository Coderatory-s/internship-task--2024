// app/employee-search/page.tsx

"use client"; // Use client-side rendering
import { useState } from "react";
import axios from "axios";
import styles from "../CSS/Dashboard.module.css"; // Create this CSS file for styling
import Header from "../Dashboard/components/Header"; // Import Header
import Sidebar from "../Dashboard/components/Sidebar"; // Import Sidebar

const EmployeeSearch = () => {
  const [employeeId, setEmployeeId] = useState<string>("");
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployeeById = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching

    try {
      const response = await axios.get(
        `http://localhost:3000/v1/GetEmployeeDataByID//getdatabyid/670808bf4fed1ed5b6ca5b1b` // Use employeeId from the input
      );

      setEmployeeData(response.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch employee data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEmployeeById();
  };

  return (
    <div className={styles.searchContainer}>
      <Header />
      <Sidebar />
      <h2>Search for an Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {employeeData && (
        <div>
          <h3>{employeeData.welcomeMessage}</h3>
          <p>{employeeData.greetingMessage}</p>
          <p>
            <strong>ID:</strong> {employeeData.employee._id}
          </p>
          <p>
            <strong>First Name:</strong> {employeeData.employee.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {employeeData.employee.lastName}
          </p>
          <p>
            <strong>Department:</strong> {employeeData.employee.department}
          </p>
          {/* Add more fields as necessary */}
        </div>
      )}
    </div>
  );
};

export default EmployeeSearch;
