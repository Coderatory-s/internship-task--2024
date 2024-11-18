'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation'; // Use the router from next/navigation
import axios from 'axios';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Navbar from '../components/navbar';
import { jwtDecode } from 'jwt-decode';

const GetAllCourseStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [courseIdForRating, setCourseIdForRating] = useState<string | null>(null);
  const router = useRouter();
  const [error, setError] = useState('');

  // Decode the token to get the userId
  const token = localStorage.getItem('token');
  if (!token) {
    setError('You must be logged in to view courses.');
    return null;
  }
  const decodedToken = jwtDecode(token) as { id: string };
  const userId = decodedToken.id;

  // Fetch all courses for the student
  const coursesQuery = useQuery({
    queryKey: ['courses-student'],
    queryFn: async () => {
      if (!token) throw new Error('User not authenticated');
      const response = await axios.get(`http://localhost:3000/v1/users/${userId}/getCourse`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.courses;
    },
    enabled: !!token,
  });

  const filteredCourses = coursesQuery.data
    ? coursesQuery.data.filter((course: { title: string }) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleOpenRatingModal = (courseId: string) => {
    setCourseIdForRating(courseId);
    setShowRatingModal(true);
  };

  const handleRatingSubmit = async () => {
    if (!courseIdForRating) return;
    try {
      await axios.post(
        `http://localhost:3000/v1/courses/${courseIdForRating}/rate`,
        { rating: selectedRating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Thank you for your rating!');
      setShowRatingModal(false);
      setSelectedRating(0);
    } catch (error) {
      alert('Failed to submit rating. Please try again.');
    }
  };

  // Handle the Enroll button click to navigate to the enrollInCourse/[id] page
  const handleEnrollClick = (courseId: string) => {
    router.push(`/enrollInCourse/${courseId}`); // Navigate using router.push
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center p-6 text-white">
        <header className="w-full max-w-3xl mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">All Courses for Students</h1>
          <p className="text-lg">Discover and rate your enrolled courses</p>
        </header>

        {error && (
          <p className="text-red-500 bg-white rounded-lg p-4 text-center w-full max-w-md mb-4">
            {error}
          </p>
        )}

        <div className="flex flex-col w-full max-w-3xl mb-6 gap-4">
          <div className="flex justify-between">
            {/* <Button
              onClick={() => router.push('/')}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-md font-medium shadow-lg"
            >
              Go Back Home
            </Button> */}
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
          {coursesQuery.isLoading ? (
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
                          onClick={() => handleEnrollClick(course._id)} // Call handleEnrollClick on button click
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                        >
                          Enroll
                        </Button>
                        {/* <Button
                          onClick={() => handleOpenRatingModal(course._id)}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md"
                        >
                          Rate Us
                        </Button> */}
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

        {showRatingModal && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Rate this Course</h2>
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setSelectedRating(star)}
                    className="text-3xl text-yellow-500"
                  >
                    {star <= selectedRating ? <AiFillStar /> : <AiOutlineStar />}
                  </button>
                ))}
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowRatingModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRatingSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GetAllCourseStudents;
