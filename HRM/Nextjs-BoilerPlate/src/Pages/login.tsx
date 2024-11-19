// /app/login/page.tsx
import React from 'react';
import AuthForm from '../Components/AuthForm/AuthForm';

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AuthForm 
        title="Login to Your Account" 
        buttonText="Login" 
        isSignup={false} 
      />
    </div>
  );
};

export default LoginPage;
