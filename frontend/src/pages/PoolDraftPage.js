import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';

const players = [
  { name: 'S. Scheffler' },
  { name: 'R. McIlroy' },
  { name: 'B. DeChambeau' },
];

const teams = ['Team_1', 'Team_2', 'Team_3', 'Team_4'];

const PoolDraftPage = () => {
  const navigate = useNavigate();
  const { poolName } = useParams();
  const [drawerHeight, setDrawerHeight] = useState(200);
  const [isDragging, setIsDragging] = useState(false);

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
        <button onClick={() => navigate(`/${poolName}/myteam`)}>My Team</button>
        <button className="text-blue-600 border-b-2 border-blue-600">Draft</button>
      </div>

      {/* Draft Board */}
      <div className="flex-1 overflow-x-auto p-4">
        <div className="flex space-x-6 min-w-max">
          {teams.map((team, teamIdx) => (
            <div key={team} className="flex flex-col items-center space-y-2">
              <div className="font-bold text-sm">{team}</div>
              {[...Array(6)].map((_, pickIdx) => (
                <div
                  key={pickIdx}
                  className="w-20 h-12 bg-white border rounded flex items-center justify-center text-sm"
                >
                  {teamIdx + 1}.{pickIdx + 1}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Drawer */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 100, bottom: window.innerHeight - 100 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(event, info) => {
          setIsDragging(false);
          setDrawerHeight(Math.max(100, Math.min(window.innerHeight - 100, drawerHeight + info.point.y)));
        }}
        className="fixed left-0 w-full bg-white shadow-lg rounded-t-xl overflow-hidden"
        style={{ bottom: 0, height: drawerHeight }}
      >
        <div className="w-full h-6 flex justify-center items-center cursor-row-resize">
          <div className="w-12 h-1.5 bg-gray-400 rounded" />
        </div>

        <div className="px-4">
          <div className="font-semibold">Round 1 of 6</div>
          <div className="text-sm text-gray-600 mb-4">Pick 1.01 (You are up!)</div>
          <div className="flex justify-between border-b pb-1 mb-2">
            <div className="text-blue-600 font-medium">Rankings</div>
            <div className="text-gray-500">Picks</div>
          </div>

          <ul className="space-y-2">
            {players.map((player, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>
                  {index + 1}. {player.name}
                </span>
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded">
                  Draft
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default PoolDraftPage;
