'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [user, setUser] = useState<{ name: string } | null>(null); // State to store user info
  const [profile, setProfile] = useState<any | null>(null); // State to store user profile data
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false); // State to control popup visibility
  const router = useRouter();

  // Fetch user info from localStorage (decoded token) when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT to extract user data
        setUser({
          name: decodedToken.name, // Assuming the name is stored in the token
        });
      } catch (err) {
        console.error('Error decoding token:', err);
      }
    }
  }, []);

  // Fetch user profile details when the Profile button is clicked
  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: { id: string } = jwtDecode(token);
        const userId = decodedToken.id;

        const response = await axios.get(
          `http://localhost:3000/v1/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfile(response.data);
        setIsProfileOpen(true); // Open the profile popup
      } catch (err: any) {
        console.error('Error fetching profile:', err);
      }
    }
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  // Close profile popup
  const closeProfilePopup = () => {
    setIsProfileOpen(false);
    setProfile(null); // Clear profile data
  };

  return (
    <div>
      <div className="bg-gray-900 text-white flex justify-between items-center p-4 shadow-lg">
        <div className="text-xl font-semibold text-blue-500 hover:text-blue-400 cursor-pointer">
          W3 2.0
        </div>

        {/* Profile and Logout Buttons */}
        <div className="flex items-center space-x-6">
          {user && (
            <>
              {/* Profile Button */}
              <button
                onClick={fetchUserProfile}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                Profile
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Profile Popup */}
      {isProfileOpen && profile && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center relative transition duration-300 ease-in-out transform hover:scale-105">
            <button
              onClick={closeProfilePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out"
            >
              <span className="font-bold text-2xl">&times;</span>
            </button>
            <div className="mb-4">
              <h2 className="text-3xl font-semibold text-gray-800">Name : {profile.name}</h2>
              <p className="text-gray-600">Email : {profile.email}</p>
              <p className="text-gray-500 mb-4">Role :  {profile.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
