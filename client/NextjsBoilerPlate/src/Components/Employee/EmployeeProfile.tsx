/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface EmployeeDetails {
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  phone?: string;
  address?: string;
  profileImageUrl?: string;
}

const EmployeeProfile: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get employee ID from the route
  const [employee, setEmployee] = useState<EmployeeDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/employees/${id}`);
        if (!response.ok) throw new Error('Failed to fetch employee details');
        const data = await response.json();
        setEmployee({
          firstName: data.firstName,
          lastName: data.lastName,
          position: data.position,
          email: data.email,
          phone: data.phone,
          address: data.address,
          profileImageUrl: data.profileImageUrl || 'https://via.placeholder.com/150',
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!employee) return <p>Employee not found</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-2">
      <div className="flex items-center mb-6">
        <img
          src={employee.profileImageUrl}
          alt={employee.firstName}
          className="w-24 h-24 rounded-full object-cover mr-6"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {employee.firstName} {employee.lastName}
          </h2>
          <p className="text-lg text-gray-600">{employee.position}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-700">Contact Information</h3>
          <p className="text-sm text-gray-600">Email: {employee.email}</p>
          <p className="text-sm text-gray-600">Phone: {employee.phone || 'N/A'}</p>
        </div>
        <div>
          <h3 className="font-medium text-gray-700">Address</h3>
          <p className="text-sm text-gray-600">{employee.address || 'N/A'}</p>
        </div>
        <div>
          <button className="py-2 px-6 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
