'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Import useParams to get courseId from URL
import { Button } from '@/components/ui/button'; // Assuming you have reusable UI components
import { Input } from '@/components/ui/input'; // Assuming you have reusable UI components
import { jwtDecode } from 'jwt-decode';
import { Router } from 'next/router';

const EnrollInCourse = () => {
  const [email, setEmail] = useState(''); // Only email is needed for enrollment
  const [error, setError] = useState(''); // State to store error messages
  const [loading, setLoading] = useState(false); // State to handle loading state
  const [successMessage, setSuccessMessage] = useState(''); // State to show success message
  const { id: courseId } = useParams(); // Get the courseId from the URL params
  const router = useRouter();
  useEffect(() => {
    if (!courseId) {
      setError('Course ID is missing');
    }
  }, [courseId]); // Trigger this effect if courseId is missing

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    

    setLoading(true); // Set loading to true while making the API call
    setError(''); // Clear any previous error

    // Decode the token to get the userId
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to enroll.');
      return;
    }

    const decodedToken = jwtDecode(token) as { id: string };
    const userId = decodedToken.id;

    console.log('User ID:', userId);
    console.log('Course ID:', courseId);

    try {
      const response = await fetch(
        `http://localhost:3000/v1/users/${userId}/getCourse/${courseId}/enroll`, // API endpoint
        {
          method: 'POST', // Ensuring POST method
          headers: {
            'Content-Type': 'application/json', // Sending JSON data
            Authorization: `Bearer ${token}`, // Authorization header with token
          },
          body: JSON.stringify({ email }), // Sending email in the body
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData); // Log error response from the backend
        throw new Error(errorData.message || 'Failed to enroll student');
      }

      const data = await response.json();
      setSuccessMessage(data.message); // Show success message on successful enrollment
      setEmail(''); // Clear the email field
    } catch (err: any) {
      console.error('Enrollment Error:', err); // Log error if any issue happens
      setError(err.message); // Set error message if something goes wrong
    } finally {
      setLoading(false); // Set loading to false when the request is done
    }
  };
  const handleViewLectures = () => {
    if (courseId) {
      router.push(`/getLectureFromCourse/${courseId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required // Ensuring the email field is required
      />
      {error && <p className="text-red-500">{error}</p>} {/* Display error messages */}
      {successMessage && <p className="text-green-500">{successMessage}</p>} {/* Display success message */}

      <Button
        type="submit"
        className="bg-blue-600 text-white hover:bg-blue-700"
        disabled={loading} // Disable button during loading
        onClick={handleViewLectures}
      >
        {loading ? 'Enrolling...' : 'Enroll in Course'}
      </Button>
    </form>
  );
};

export default EnrollInCourse;
