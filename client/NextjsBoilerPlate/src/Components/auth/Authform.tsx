import React, { useState } from 'react';
import '../../app/globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRouter } from 'next/router';

type AuthFormProps = {
  title: string;
  buttonText: string;
  isSignup?: boolean;
};

const AuthForm: React.FC<AuthFormProps> = ({ title, buttonText, isSignup = false }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isSignup
      ? 'http://localhost:3000/v1/user/auth/register'
      : 'http://localhost:3000/v1/user/auth/login';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: isSignup ? name : undefined,
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to authenticate. Please try again.');
      }

      // Process successful response
      if (result.token) {
        localStorage.setItem('token', result.token); // Save token to localStorage
        alert(isSignup ? 'Signup successful!' : 'Login successful!');
        router.push('/Dashboard'); // Redirect to dashboard
      } else {
        throw new Error('Authentication failed.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="flex space-x-4 mb-4">
        <a href="#" className="social-icon bg-gray-100 hover:bg-gray-200 rounded-full p-2">
          <i className="fab fa-facebook-f text-blue-700"></i>
        </a>
        <a href="#" className="social-icon bg-gray-100 hover:bg-gray-200 rounded-full p-2">
          <i className="fab fa-google text-red-600"></i>
        </a>
        <a href="#" className="social-icon bg-gray-100 hover:bg-gray-200 rounded-full p-2">
          <i className="fab fa-github text-gray-800"></i>
        </a>
        <a href="#" className="social-icon bg-gray-100 hover:bg-gray-200 rounded-full p-2">
          <i className="fab fa-linkedin-in text-blue-600"></i>
        </a>
      </div>
      <span className="text-gray-500 text-sm mb-4">
        or use your email to {isSignup ? 'register' : 'login'}
      </span>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        {isSignup && (
          <input
            type="text"
            placeholder="Name"
            className="input-field bg-gray-100 rounded-md p-2 mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="input-field bg-gray-100 rounded-md p-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field bg-gray-100 rounded-md p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`submit-button ${isSignup ? 'bg-green-500' : 'bg-blue-500'} text-white font-bold py-2 rounded-md hover:${isSignup ? 'bg-green-600' : 'bg-blue-600'}`}
          disabled={loading}
        >
          {loading ? (isSignup ? 'Signing Up...' : 'Logging In...') : buttonText}
        </button>
        {!isSignup && (
          <a href="#" className="text-blue-500 text-xs mt-2 mb-4">Forgot your password?</a>
        )}
      </form>
    </div>
  );
};

export default AuthForm;

