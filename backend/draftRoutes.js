const express = require('express');
const router = express.Router();
const db = require('./db'); // 🔁 renamed from pool to db for consistency

// POST draft picks
router.post('/draft', async (req, res) => {
  const { user_name, golfer_name } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO drafts (user_name, golfer_name) VALUES ($1, $2) RETURNING *',
      [user_name, golfer_name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting draft:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET all draft picks
router.get('/drafts', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM drafts ORDER BY user_name');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching draft picks:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
