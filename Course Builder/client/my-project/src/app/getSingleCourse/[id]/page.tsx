'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GetStudentsInCourse from '../../components/getStudentsInCourse';
import { jwtDecode } from 'jwt-decode';
import Navbar from '@/app/components/navbar';

interface Course {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

const GetSingleCourse = () => {
  const params = useParams();
  const router = useRouter();
  const courseId = Array.isArray(params.id) ? params.id[0] : params.id;

  const token = localStorage.getItem('token');
  let userId = null;

  if (token) {
    const decodedToken = jwtDecode(token) as { id: string };
    userId = decodedToken.id;
  }

  const { data: course, isLoading, error } = useQuery<Course>({
    queryKey: ['course', courseId, userId],
    queryFn: async () => {
      if (!courseId || !userId) {
        throw new Error('Course ID or User ID not provided');
      }

      const response = await fetch(
        `http://localhost:3000/v1/users/${userId}/getCourses/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(errorResponse || 'Failed to fetch course');
      }

      return response.json();
    },
    enabled: !!courseId && !!userId,
  });

  const handleAddLecture = () => {
    if (courseId) {
      router.push(`/uploadLecture/${courseId}`);
    }
  };

  const handleViewLectures = () => {
    if (courseId) {
      router.push(`/getLectureFromCourse/${courseId}`);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-600 p-8 text-white flex flex-col items-center">
      <header className="mb-8 w-full max-w-2xl text-center">
        <Button
          onClick={() => router.push('/getAllCourses')}
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-md shadow-md"
        >
          Back to All Courses
        </Button>
      </header>

      {isLoading && (
        <p className="text-center text-xl font-medium animate-pulse">Loading course...</p>
      )}
      {error && (
        <p className="bg-red-100 text-red-600 p-4 rounded-md w-full max-w-2xl text-center">
          Error: {(error as Error).message}
        </p>
      )}

      {course && (
        <Card className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{course.title}</h2>
          <p className="text-gray-600 mb-6">{course.description}</p>
          <p className="text-gray-400 text-sm mb-6">
            Created on: {new Date(course.createdAt).toLocaleDateString()}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleAddLecture}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md"
            >
              Add Lecture
            </Button>
            <Button
              onClick={handleViewLectures}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow-md"
            >
              View Lectures
            </Button>
          </div>
        </Card>
      )}

      {!isLoading && !course && (
        <p className="text-center text-xl">No course found.</p>
      )}

      <div className="w-full max-w-3xl mt-8">
        <GetStudentsInCourse courseId={courseId} />
      </div>
    </div>
    </>
  );
};

export default GetSingleCourse;
