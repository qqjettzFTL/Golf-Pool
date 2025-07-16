// src/pages/LoginPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Home } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/signup');
    };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-black text-white flex justify-between items-center px-4 py-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/')} className="hover:opacity-70">
            <Home size={24} />
          </button>
          <img src={logo} alt="Birdie Board Logo" className="h-14 w-[150px] object-contain" />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded">
            Log In/Sign Up
          </button>
        </div>
      </div>

      {/* Login form */}
      <div className="flex-grow flex flex-col items-center justify-center space-y-8 p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">LOG IN TO YOUR ACCOUNT</h1>
        <form className="space-y-6 w-full max-w-xs">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-full"
          >
            Log In
          </button>
        </form>
        <p className="text-sm text-gray-700">
          Don’t have an account?{' '}
          <button 
            onClick={handleSignUpClick} 
            className="text-blue-500 hover:underline">Sign up</button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
