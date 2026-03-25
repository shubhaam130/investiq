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
// Live crypto prices — CoinGecko free API (no key required)
app.get('/api/live-prices', async (req, res) => {
  try {
    const r = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,ripple&vs_currencies=usd&include_24hr_change=true');
    const data = await r.json();
    res.json({ crypto: data, timestamp: Date.now() });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch live prices' });
  }
});

app.get('/health', (_req, res) => res.json({ status: 'ok', project: 'InvestIQ' }));

// Demo-mode responses used when no API key is configured
const DEMO_RESPONSES = [
  `**Portfolio Overview (Demo Mode)**\n\nThis portfolio covers Jan 2024 – Dec 2025 across 6 assets with a cumulative return of **+34.8%** vs NIFTY50's +21.4%.\n\n**Highlights:**\n- Best asset: AAPL (Sharpe 0.91, +1.85%/mo)\n- Highest raw return: BTC (+4.17%/mo, Sharpe 0.88)\n- Underperformers: RELIANCE (Sharpe -1.57) and TCS (Sharpe -1.12)\n- Portfolio volatility: 6.79% | Portfolio Sharpe: 0.61\n\n**Key finding:** Indian equities dragged overall returns. Reducing RELIANCE and TCS weights in favour of AAPL or BTC would have improved the Sharpe ratio materially.\n\n_To enable live AI analysis, add your Anthropic API key to the .env file._`,

  `**Risk Analysis (Demo Mode)**\n\nThe portfolio's 6.79% monthly volatility is dominated by crypto holdings (BTC 15.2%, ETH 21.7%). However, low correlations partially offset this.\n\n**Diversification benefit:**\n- AAPL↔NIFTY50 correlation: 0.08 (near-zero — excellent)\n- BTC↔ETH: 0.54 (moderate — both move together)\n- Indian equities↔US/Crypto: 0.17–0.26 (low)\n\n**Recommendation:** The portfolio benefits from genuine geographic and asset-class diversification. The main drag is negative-Sharpe Indian equities, not high volatility assets.\n\n_To enable live AI analysis, add your Anthropic API key to the .env file._`,

  `**Rebalancing Insight (Demo Mode)**\n\nBased on real 2024–25 data, the optimal rebalancing direction is clear:\n\n**Reduce:** RELIANCE (currently 15%, Sharpe -1.57) and TCS (10%, Sharpe -1.12) — both destroyed value in this period.\n\n**Increase:** AAPL (highest Sharpe at 0.91) and BTC (second-highest Sharpe at 0.88, though higher volatility).\n\n**Estimated impact of shifting 10% from RELIANCE → AAPL:**\n- Portfolio Sharpe: ~0.61 → ~0.70\n- Monthly return: ~+1.52% → ~+1.70%\n- Volatility: minimal change (similar vol profiles)\n\n_To enable live AI analysis, add your Anthropic API key to the .env file._`
];
let demoIdx = 0;

app.post('/api/chat', rateLimit, async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const { system, messages, max_tokens } = req.body;
  if (!messages?.length) return res.status(400).json({ error: 'messages array required.' });

  // Demo mode: return pre-written analytical responses when no key is configured
  if (!apiKey || apiKey === 'sk-ant-your-key-here') {
    const txt = DEMO_RESPONSES[demoIdx % DEMO_RESPONSES.length];
    demoIdx++;
    return res.json({
      content: [{ type: 'text', text: txt }],
      model: 'demo',
      demo_mode: true
    });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
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
