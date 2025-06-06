const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Test DB connection
app.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT NOW() AS time');
    res.json({ message: 'DB connected', time: rows[0].time });
  } catch (err) {
    console.error('❌ DB Error:', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
