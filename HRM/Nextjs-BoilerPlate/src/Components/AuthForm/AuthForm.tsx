// /components/AuthForm.tsx
import React from 'react';
import '../../app/globals.css'
import { FaFacebookF, FaGoogle, FaGithub, FaLinkedinIn } from 'react-icons/fa';




type AuthFormProps = {
  title: string;
  buttonText: string;
  isSignup?: boolean;
};

const AuthForm: React.FC<AuthFormProps> = ({ title, buttonText, isSignup = false }) => (
  <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <div className="flex space-x-4 mb-4">
      <a href="#" className="social-icon bg-gray-100 hover:bg-gray-200 rounded-full p-2">
        <i className="FaFacebookF text-blue-700">    <FaFacebookF className="text-blue-700" /></i>
      </a>
      <a href="#" className="social-icon bg-gray-100 hover:bg-gray-200 rounded-full p-2">
        <i className="Fagoogle text-red-600"> <FaGoogle className="text-red-600" /></i>
      </a>
      <a href="#" className="social-icon bg-gray-100 hover:bg-gray-200 rounded-full p-2">
        <i className=" Fagithub text-gray-800"> <FaGithub className="text-gray-800" /></i>
      </a>
      <a href="#" className="social-icon bg-gray-100 hover:bg-gray-200 rounded-full p-2">
        <i className="Falinkedin text-blue-600"> <FaLinkedinIn className="text-blue-600" /></i>
      </a>
    </div>
    <span className="text-gray-500 text-sm mb-4">
      or use your email to {isSignup ? 'register' : 'login'}
    </span>
    <form className="flex flex-col w-full">
      {isSignup && <input type="text" placeholder="Name" className="input-field" />}
      <input type="email" placeholder="Email" className="input-field" />
      <input type="password" placeholder="Password" className="input-field" />
      {isSignup ? (
        <button type="submit" className="submit-button">
          {buttonText}
        </button>
      ) : (
        <>
          <a href="#" className="text-blue-500 text-xs mt-2 mb-4">Forgot your password?</a>
          <button type="submit" className="submit-button">{buttonText}</button>
        </>
      )}
    </form>
  </div>
);

export default AuthForm;
