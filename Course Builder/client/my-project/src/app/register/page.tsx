'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student', 
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/v1/users/auth/register', formData);
      setSuccess('Registration successful!');
      setError('');
      router.push('/login'); 
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white px-4">
      <header className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4">Join Course Builder</h2>
        <p className="text-xl">Create, manage, and share courses with ease</p>
      </header>

      {error && (
        <p className="bg-red-200 text-red-700 p-3 rounded-md mb-4 w-full max-w-md text-center">
          {error}
        </p>
      )}

      {success && (
        <p className="bg-green-200 text-green-700 p-3 rounded-md mb-4 w-full max-w-md text-center">
          {success}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-gray-800"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Role:</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="student"
                checked={formData.role === 'student'}
                onChange={handleChange}
                className="mr-2"
              />
              Student
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={formData.role === 'admin'}
                onChange={handleChange}
                className="mr-2"
              />
              Admin
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-semibold transition focus:outline-none"
        >
          Register
        </button>
      </form>

      <p className="mt-6 text-gray-200">
        Already signed up?{' '}
        <Link href="/login" className="text-white font-semibold underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
