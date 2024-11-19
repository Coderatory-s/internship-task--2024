// /app/signup/page.tsx
import React from 'react';
import AuthForm from '../Components/AuthForm/AuthForm';

const SignupPage: React.FC = () => {
  return (
    <div className="flex items-center h-8 justify-center min-h-screen bg-gray-100">
      <AuthForm 
        title="Create Your Account" 
        buttonText="Sign Up" 
        isSignup={true} 
      />
    </div>
  );
};

export default SignupPage;
