require('dotenv').config({ path: '../.env' }); // load env vars

// Import required modules
const express = require('express');
const cors = require('cors');
const db = require('./db');
const pools = require('./pools');
const login = require('./auth')
// const draftRoutes = require('./draftRoutes');


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());           // allows frontend to make requests to this API
app.use(express.json());   // parses incoming JSON payloads

app.use('/api', pools); // Post pools call
// app.use('/api', draftRoutes); // Post draftRoutes call

// Test route to confirm API is running
app.get('/', (req, res) => {
  res.send('PGA Golf Pool API is running!');
});

// GET all golfers from DB
app.get('/api/golfers', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM golfers ORDER BY name');
    res.json(result.rows); // send golfer list to frontend
  } catch (err) {
    console.error('Error fetching golfers:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});