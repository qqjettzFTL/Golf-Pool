import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add API call to handle user signup
    console.log('Signup with:', { username, email, password });
    navigate('/');
  };

    const handleLoginClick = () => {
        navigate('/login');
    };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-black text-white flex justify-between items-center px-6 py-4">
        <button onClick={() => navigate('/')} className="hover:opacity-70">
            <Home size={24} />
        </button>
        <img src={logo} alt="Birdie Board Logo" className="h-14 w-[150px]" />
        <button
            onClick={handleLoginClick} 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded">
          Log In/Sign Up
        </button>
      </div>

      {/* Sign Up Form */}
      <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">CREATE A NEW ACCOUNT</h1>
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xs">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded bg-white text-black border border-gray-300"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded bg-white text-black border border-gray-300"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded bg-white text-black border border-gray-300"
            required
          />
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;