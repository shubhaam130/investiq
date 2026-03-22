// InvestIQ — Secure API Proxy Server
// Keeps your Anthropic API key hidden on the server side.

const express  = require('express');
const cors     = require('cors');
const fetch    = require('node-fetch');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '16kb' }));
app.use(express.static('public'));
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));

// Rate limiter — 30 requests/IP/minute
const rateMap = new Map();
function rateLimit(req, res, next) {
  const ip  = req.headers['x-forwarded-for']?.split(',')[0] || req.ip || 'unknown';
  const now = Date.now();
  const rec = rateMap.get(ip) || { count: 0, start: now };
  if (now - rec.start > 60000) { rec.count = 0; rec.start = now; }
  rec.count++;
  rateMap.set(ip, rec);
  if (rec.count > 30) return res.status(429).json({ error: 'Too many requests. Wait a moment.' });
  next();
}

app.get('/health', (_req, res) => res.json({ status: 'ok', project: 'InvestIQ' }));

app.post('/api/chat', rateLimit, async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured on server.' });

  const { system, messages, max_tokens } = req.body;
  if (!messages?.length) return res.status(400).json({ error: 'messages array required.' });

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: Math.min(parseInt(max_tokens) || 1000, 1500),
        messages,
        ...(system ? { system } : {})
      })
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || 'API error.' });
    return res.json(data);
  } catch (err) {
    console.error('Proxy error:', err.message);
    return res.status(502).json({ error: 'Could not reach Anthropic API.' });
  }
});

app.get('*', (_req, res) => res.sendFile('index.html', { root: './public' }));

app.listen(PORT, () => {
  console.log(`\n✅  InvestIQ server running → http://localhost:${PORT}`);
  console.log(`   API key: ${process.env.ANTHROPIC_API_KEY ? '✓ loaded' : '✗ MISSING — check .env'}\n`);
});
