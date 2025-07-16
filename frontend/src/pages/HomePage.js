import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const HomePage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleCreatePoolClick = () => {
        navigate('/createPool');
    };

    const handleJoinPoolClick = () => {
        navigate('/joinPool');
    };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-black text-white flex justify-between items-center px-6 py-4">
        <img src={logo} alt="Birdie Board Logo" className="h-14 w-[150px]" />
        <button
            onClick={handleLoginClick} 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded">
          Log In/Sign Up
        </button>
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col items-center justify-center space-y-10 text-center p-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Create Golf Pools<br />for any PGA Tournament!
        </h1>

        <div className="space-x-2 space-y-4">
          <button             
            onClick={handleCreatePoolClick} 
            className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded">
            Create a Pool
          </button>
          <button 
            onClick={handleJoinPoolClick} 
            className="bg-white border border-gray-300 text-black text-lg font-semibold px-6 py-3 rounded">
            Join a Pool
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;