import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Home } from 'lucide-react';

const PoolLeaderboardPage = () => {
  const { poolName } = useParams();
  const navigate = useNavigate();

  // Placeholder data for teams
  const teams = [
    { name: 'TEAM_1', score: -12 },
    { name: 'TEAM_2', score: -10 },
    { name: 'TEAM_3', score: -8 },
    { name: 'TEAM_4', score: -4 },
    { name: 'TEAM_5', score: +2 },
  ];

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
          Log In
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-300 flex justify-center space-x-12 py-2 text-lg font-medium">
        <button className="text-blue-600 border-b-2 border-blue-600">Leaderboard</button>
        <button onClick={() => navigate(`/${poolName}/myteam`)}>My Team</button>
        <button onClick={() => navigate(`/${poolName}/draft`)}>Draft</button>
      </div>

      {/* Pool Title */}
      <div className="mt-8 mb-6 text-center">
        <div className="inline-block bg-black text-white text-xl font-bold px-6 py-2 rounded-full">
          {poolName.toUpperCase()}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="w-full max-w-md mx-auto mt-6">
        <div className="flex justify-between font-semibold text-gray-600 px-4 py-2 border-b border-gray-300">
          <span>Pos.</span>
          <span className="flex-1 text-left pl-6">Team Name</span>
          <span>Score</span>
        </div>

        {teams.map((team, index) => (
          <div key={team.name} className="flex justify-between items-center bg-white shadow-sm rounded px-4 py-3 mt-2">
            <span className="w-10 text-left">{index + 1}.</span>
            <span className="flex-1 text-left pl-4 font-medium">{team.name}</span>
            <span className="text-right font-semibold">{team.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoolLeaderboardPage;
