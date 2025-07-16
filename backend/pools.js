const express = require('express');
const router = express.Router();
const db = require('./db'); // 🔁 renamed from pool to db for consistency

// POST pools
router.post('/pools', async (req, res) => {
  const { pool_name, pool_password } = req.body;

  try {
    // Check if a pool with the same name already exists
    const existing = await db.query(
      'SELECT * FROM pools WHERE pool_name = $1',
      [pool_name]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Pool name already exists' });
    }

    // Insert the new pool
    const result = await db.query(
      'INSERT INTO pools (pool_name, pool_password) VALUES ($1, $2) RETURNING *',
      [pool_name, pool_password]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error creating pool:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET Pools
router.get('/pools/:pool_name', async (req, res) => {
  const { pool_name } = req.params;

  try {
    const result = await db.query(
      'SELECT * FROM pools WHERE pool_name = $1',
      [pool_name]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pool not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching pool:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// // GET all draft picks
// router.get('/drafts', async (req, res) => {
//   try {
//     const result = await db.query('SELECT * FROM drafts ORDER BY user_name');
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error fetching draft picks:', err.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

module.exports = router;
