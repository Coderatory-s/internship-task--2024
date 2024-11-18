'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

type Student = {
  _id: string;
  name: string;
  email: string;
  // Add other fields as necessary
};

const GetStudentsInCourse = ({ courseId }: { courseId: string }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true); // Set loading to true while fetching
      const token = localStorage.getItem('token');
  if (!token) {
    setError('You must be logged in to view courses.');
    return null;
  }
  const decodedToken = jwtDecode(token) as { id: string };
  const userId = decodedToken.id;

      try {
        const response = await axios.get(`http://localhost:3000/v1/users/${userId}/getCourse/${courseId}/enrolledStudent`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });

        setStudents(response.data); // Set students data on successful fetch
        setError(null); // Reset error if fetch is successful
      } catch (err:any) {
        if (err.response?.status === 403) {
          setError('You are not authorized to view the students.');
        } else {
          setError('Failed to fetch students'); // Set error message if fetch fails
        }
        console.error('Error fetching students:', err);
      } finally {
        setIsLoading(false); // Set loading to false once the fetch is done
      }
    };

    fetchStudents(); // Fetch students whenever courseId changes or component mounts
  }, [courseId]);

  if (isLoading) {
    return <p>Loading students...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="w-full max-w-3xl p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Students Enrolled in this Course</h2>
      
      {students.length > 0 ? (
        <div className="space-y-4">
          {students.map((student) => (
            <div key={student._id} className="p-4 border rounded-md shadow-md">
              <h3 className="text-xl font-semibold">{student.name}</h3>
              <p className="text-sm">Email: {student.email}</p>
              {/* You can add more details about the student here */}
            </div>
          ))}
        </div>
      ) : (
        <p>No students enrolled in this course.</p>
      )}
    </div>
  );
};

export default GetStudentsInCourse;
