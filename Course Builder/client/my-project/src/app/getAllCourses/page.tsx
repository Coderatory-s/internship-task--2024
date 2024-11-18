'use client';
import { useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '../components/navbar';
import { jwtDecode } from 'jwt-decode';

const GetAllCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState('');

  // Decode the token to get the userId
  const token = localStorage.getItem('token');
  if (!token) {
    setError('You must be logged in to view courses.');
    return null;
  }
  const decodedToken = jwtDecode(token) as { id: string };
  const userId = decodedToken.id;

  // Query to fetch all courses for the authenticated user
  const { data: coursesData, isLoading, isError } = useQuery({
    queryKey: ['user-courses'],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/v1/users/${userId}/getCourses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
  });

  // Mutation to delete a course
  const deleteCourseMutation = useMutation({
    mutationFn: async (courseId: string) => {
      await axios.delete(`http://localhost:3000/v1/users/${userId}/getCourses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => queryClient.invalidateQueries({queryKey:['user-courses']}),
  });

  const handleDeleteCourse = (courseId: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      deleteCourseMutation.mutate(courseId);
    }
  };

  const filteredCourses = coursesData
    ? coursesData.courses.filter((course: { title: string }) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center p-6 text-white">
        <header className="w-full max-w-3xl mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">My Courses</h1>
          <p className="text-lg">Manage and explore your uploaded courses</p>
        </header>

        {isError && (
          <p className="text-red-500 bg-white rounded-lg p-4 text-center w-full max-w-md mb-4">
            Error loading courses.
          </p>
        )}

        <div className="flex flex-col w-full max-w-3xl mb-6 gap-4">
          <div className="flex justify-between">
            <Button
              onClick={() => router.push('/createCourse')}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-md font-medium shadow-lg"
            >
              Create Course
            </Button>
            <input
              type="text"
              placeholder="Search courses by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow ml-4 px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        <div className="w-full max-w-3xl">
          {isLoading ? (
            <p className="text-center">Loading courses...</p>
          ) : filteredCourses.length > 0 ? (
            <div className="grid gap-6">
              {filteredCourses.map(
                (course: {
                  _id: string;
                  title: string;
                  description: string;
                  createdAt: string;
                }) => (
                  <Card
                    key={course._id}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-800">{course.title}</h3>
                      <p className="text-gray-600 mb-4">{course.description}</p>
                      <p className="text-sm text-gray-400 mb-4">
                        Created on: {new Date(course.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex justify-between">
                        <Button
                          onClick={() => handleDeleteCourse(course._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={() => router.push(`/getSingleCourse/${course._id}`)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              )}
            </div>
          ) : (
            <p className="text-center">No courses found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default GetAllCourses;
