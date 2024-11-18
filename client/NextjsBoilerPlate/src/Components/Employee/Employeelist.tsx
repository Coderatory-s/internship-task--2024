import React, { useEffect, useState } from 'react';
import EmployeeCard from './EmployeeCard';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  email: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/employees');
        if (!response.ok) throw new Error('Failed to fetch employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            id={employee.id}
            name={`${employee.firstName} ${employee.lastName}`}
            position={employee.position}
            email={employee.email}
            profileImageUrl="https://via.placeholder.com/150"
            onViewProfile={(id) => alert(`Navigate to Profile: ${id}`)}
          />
        ))
      )}
    </div>
  );
};

export default EmployeeList;
