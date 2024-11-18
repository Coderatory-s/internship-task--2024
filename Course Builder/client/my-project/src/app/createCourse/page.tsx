'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../components/navbar';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');  // New state for success message
  const router = useRouter();

  // Handle the form submission for course creation
  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to upload a course.');
      return;
    }

    const decodedToken = jwtDecode(token) as { id: string };  // Decode the token to extract userId
    const userId = decodedToken.id;

    // Perform the API request to upload the course
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:3000/v1/users/${userId}/courses`, // Using the userId as part of the URL
        { title, description },  // Send course details in the body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in header for authentication
          },
        }
      );
      setLoading(false);
      setSuccessMessage('Course created successfully!'); // Show success message
      setTimeout(() => {
        router.push('/getAllCourses'); // Redirect to the courses list or dashboard after success
      }, 2000); // Delay for 2 seconds before redirecting
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to upload course');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white px-4 py-8">
        <header className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Upload a New Course</h2>
          <p className="text-xl">Share your knowledge with the world</p>
        </header>

        {/* Success message pop-up */}
        {successMessage && (
          <div className="bg-green-200 text-green-700 p-3 rounded-md mb-4 w-full max-w-md text-center">
            {successMessage}
          </div>
        )}

        {/* Error message */}
        {error && (
          <p className="bg-red-200 text-red-700 p-3 rounded-md mb-4 w-full max-w-md text-center">
            {error}
          </p>
        )}

        <form
          onSubmit={handleCourseSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-gray-800"
        >
          <div className="mb-4">
            <Label htmlFor="title">Course Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter course title"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="description">Course Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter course description"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-semibold transition focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload Course'}
          </Button>
        </form>

        <p className="mt-6 text-gray-200">
          <span className="text-white">Need help?</span>
          <a href="/help" className="text-white font-semibold underline">
            Visit our Help Center
          </a>
        </p>
      </div>
    </>
  );
};

export default CreateCourse;
