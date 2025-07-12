import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [golfers, setGolfers] = useState([]);
  const [userName, setUserName] = useState('');
  const [draftPick, setDraftPick] = useState('');
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    fetchGolfers();
    fetchDrafts();
  }, []);

  const fetchGolfers = async () => {
    const res = await axios.get('http://localhost:3001/api/golfers');
    setGolfers(res.data);
  };

  const fetchDrafts = async () => {
    const res = await axios.get('http://localhost:3001/api/drafts');
    setDrafts(res.data);
  };

  const handleDraft = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/draft', {
        user_name: userName,
        golfer_name: draftPick
      });
      setUserName('');
      setDraftPick('');
      fetchDrafts();
    } catch (err) {
      alert('Error drafting golfer.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">⛳ PGA Golf Pool</h1>

      <form onSubmit={handleDraft} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Golfer name"
          value={draftPick}
          onChange={(e) => setDraftPick(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Draft Golfer</button>
      </form>

      <h2 className="text-xl font-semibold mb-2">🏌️ Draft Picks</h2>
      <ul className="list-disc pl-6">
        {drafts.map((d, idx) => (
          <li key={idx}>{d.user_name} - {d.golfer_name}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">📋 Leaderboard</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Place</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Thru</th>
          </tr>
        </thead>
        <tbody>
          {golfers.map((g, idx) => (
            <tr key={idx}>
              <td className="border p-2">{g.name}</td>
              <td className="border p-2">{g.place}</td>
              <td className="border p-2">{g.score}</td>
              <td className="border p-2">{g.thru}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
