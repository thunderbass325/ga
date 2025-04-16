const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve HTML from /public

app.post('/api/send', async (req, res) => {
  const apiKey = req.headers['authorization'];
  const body = req.body;

  try {
    const response = await fetch('https://degens.gaia.domains/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from API', message: error.message });
  }
});

app.listen(PORT, () => console.log(`🌐 Server running on http://localhost:${PORT}`));
