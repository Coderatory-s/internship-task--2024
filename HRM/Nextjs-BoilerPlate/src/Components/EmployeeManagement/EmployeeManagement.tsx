import React, { useState, useEffect } from "react";
import axios from "axios";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  dateOfJoining: string;
  salary: number;
  isActive: boolean;
}

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Failed to fetch employees", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Management</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Position</th>
              <th className="border border-gray-300 px-4 py-2">Department</th>
              <th className="border border-gray-300 px-4 py-2">Salary</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.firstName} {employee.lastName}
                </td>
                <td className="border border-gray-300 px-4 py-2">{employee.email}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.position}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.department}</td>
                <td className="border border-gray-300 px-4 py-2">${employee.salary}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeManagement;