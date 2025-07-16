import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Home } from 'lucide-react';

const PoolMyTeamPage = ({ teamName = 'TEAM_1', teamScore = -12, players = [] }) => {
  const { poolName } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-black text-white flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-4">
          <Home className="cursor-pointer" size={28} onClick={() => navigate('/')} />
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
        <button onClick={() => navigate(`/${poolName}/leaderboard`)}>Leaderboard</button>
        <button className="text-blue-600 border-b-2 border-blue-600">My Team</button>
        <button onClick={() => navigate(`/${poolName}/draft`)}>Draft</button>
      </div>

      {/* Team Info */}
      <div className="flex flex-col items-center justify-center mt-6 space-y-4">
        <div className="bg-black text-white font-bold text-xl rounded-full px-6 py-2">
          {teamName} <span className="ml-8">Total Score: {teamScore >= 0 ? `+${teamScore}` : teamScore}</span>
        </div>

        {/* Table Header */}
        <div className="flex justify-between w-full max-w-md font-semibold text-gray-700 px-4">
          <span>Position</span>
          <span>Player Name</span>
          <span>Score</span>
        </div>

        {/* Player Rows */}
        <div className="w-full max-w-md space-y-2">
          {players.map((player, idx) => (
            <div
              key={player.name}
              className="flex justify-between bg-white shadow rounded px-4 py-2 text-left"
            >
              <span>{idx + 1}.</span>
              <span className="flex-1 ml-2">{player.name}</span>
              <span className="ml-auto">{player.score >= 0 ? `+${player.score}` : player.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PoolMyTeamPage;
