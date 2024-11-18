import React from 'react';
import AuthForm from '../Components/auth/Authform';
import '../app/globals.css'

const LoginPage: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-l from-gray-300 to-gray-500">
    <AuthForm title="Sign In" buttonText="Sign In" />
  </div>
);

export default LoginPage;
