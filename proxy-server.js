/**
 * Proxy server for Nominatim API to handle CORS and rate limiting.
 * Uses Express.js with rate limiting middleware.
 */

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (adjust as needed for production)
app.use(cors());

// Rate limiter to prevent abuse (max 60 requests per minute per IP)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60,
  message: {
    error: 'Too many requests, please try again later.'
  }
});

app.use(limiter);

// Proxy endpoint for reverse geocoding
app.get('/nominatim/reverse', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing lat or lon query parameter' });
  }
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`, {
      headers: {
        'User-Agent': 'TipRideApp/1.0 (your-email@example.com)'
      }
    });
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Nominatim API error' });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Nominatim' });
  }
});

// Proxy endpoint for search geocoding
app.get('/nominatim/search', async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Missing q query parameter' });
  }
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(q)}`, {
      headers: {
        'User-Agent': 'TipRideApp/1.0 (your-email@example.com)'
      }
    });
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Nominatim API error' });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Nominatim' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
