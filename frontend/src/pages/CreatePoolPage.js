import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';
import { Home } from 'lucide-react';

const CreatePoolPage = () => {
  const [poolName, setPoolName] = useState('');
  const [poolPassword, setPoolPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleCreatePool = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3001/api/pools', {
        pool_name: poolName,
        pool_password: poolPassword,
      });
      setSuccess(true);
    } catch (err) {
      console.error('Error creating pool:', err);
      setError('An error occurred. Please try again later.');
    }
};

  const handleGoToPool = () => {
    navigate(`/${poolName}/leaderboard`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-black text-white flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-4">
          <Home
            className="cursor-pointer"
            size={28}
            onClick={() => navigate('/')}
          />
          <img src={logo} alt="Birdie Board Logo" className="h-14 w-[150px]" />
        </div>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded"
        >
          Log In/Sign Up
        </button>
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col items-center justify-center space-y-6 p-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 leading-relaxed">
          Creating a New<br />PGA Draft Pool
        </h1>

        <form onSubmit={handleCreatePool} className="space-y-6 w-full max-w-sm">
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Pool Name</label>
            <input
              type="text"
              value={poolName}
              onChange={(e) => setPoolName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Pool Password</label>
            <input
              type="password"
              value={poolPassword}
              onChange={(e) => setPoolPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-full w-full"
          >
            Create Pool
          </button>
        </form>

        {success && (
          <div className="mt-4">
            <p className="text-green-600 font-semibold mb-2">You have successfully created a new pool!</p>
            <button
              onClick={handleGoToPool}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
            >
              Go to Pool Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePoolPage;
