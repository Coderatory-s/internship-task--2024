'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/getProfile'); 
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/v1/users/auth/login',
        formData
      );

      const token = response.data.token; 
      if (token) {
        localStorage.setItem('token', token); 
        setSuccess('Login successful!');
        setError('');
        router.push('/getProfile'); 
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white px-4">
      <header className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4">Welcome Back!</h2>
        <p className="text-xl">Login to access your dashboard</p>
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
          <label className="block text-gray-700 font-medium mb-2">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition focus:outline-none"
        >
          Login
        </button>
      </form>

      <p className="mt-6 text-gray-200">
        Not registered yet?{' '}
        <Link href="/register" className="text-white font-semibold underline">
          Click here
        </Link>
      </p>
    </div>
  );
};

export default Login;
