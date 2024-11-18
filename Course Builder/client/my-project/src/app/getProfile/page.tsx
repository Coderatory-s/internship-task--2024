'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../components/navbar'; // Assuming Navbar is in the same folder
import GetAllCourses from '../getAllCourses/page';
import GetAllCourseStudents from '../getAllCourseStudents/page';

interface GetProfile {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  role: string;
}

const GetProfile = () => {
  const [user, setUser] = useState<GetProfile | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Redirect to login page if no token is found
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const decodedToken: { id: string; name: string; role: string } = jwtDecode(token); // Decode the token to get user ID, name, and role
        const userId = decodedToken.id;

        const response = await axios.get(`http://localhost:3000/v1/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the request header
          },
        });

        setUser(response.data); // Set user data from the backend response
        setLoading(false); // Set loading to false when data is fetched
        setError(''); // Reset any previous error

      } catch (err: any) {
        setLoading(false); // Stop loading if error occurs
        setError(err.response?.data?.message || 'Failed to fetch user profile');
      }
    };

    fetchUserProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => router.push('/login')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* <Navbar /> Include Navbar component */}
      <div
      //  className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 mt-16"
       >
        {user ? (
    <div>
       {user?.role === 'admin' ? (
        <GetAllCourses /> // Show admin page
      ) : user?.role === 'student' ? (
        <GetAllCourseStudents /> // Show student page
      ) : null}
    </div> 
    ) : (
          <p>Loading profile...</p>
        )}
      </div>

    </div>
  );
};

export default GetProfile;
