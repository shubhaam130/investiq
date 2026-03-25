# InvestIQ — Portfolio Analytics Platform

> Real-data investment portfolio analysis · Jan 2024 – Dec 2025 · 6 assets · 144 verified price observations

**Built by Shubhaam** | Data Modeling with Spreadsheet Project

---

## ✅ How to Run (3 steps, ~60 seconds)

### Prerequisites

- **Node.js 18+** — download from [nodejs.org](https://nodejs.org) (LTS version recommended)
- A terminal / command prompt

Check you have Node.js installed:

```bash
node -v   # should print v18.x.x or higher (v20, v22, v24 also work)
```

---

### Step 1 — Clone & install

```bash
git clone https://github.com/shubhaam130/investiq.git
cd investiq
npm install
```

---

### Step 2 — Start the server

```bash
npm start
```

You will see:

```
✅  InvestIQ server running → http://localhost:3000
   API key: ✗ MISSING — check .env
```

> **No API key needed to try the app.** It runs in **Demo Mode** out of the box — all charts, data tables, forecasts and pre-written AI responses are fully functional. See the next step only if you want live AI chat.

---

### Step 3 — Open in browser

```
http://localhost:3000
```

That's it. 🎉

---

## 🤖 Enable Live AI Analysis (optional)

The Analyst Chat and Rebalancer features use [Claude by Anthropic](https://console.anthropic.com). Without a key they return demo responses; with a key they answer in real-time.

### Quick way — interactive setup script

```bash
npm run setup
```

The script will ask for your Anthropic API key, create `.env` for you, and tell you what to do next. That's it.

### Manual way

1. **Get a free API key** — sign up at [console.anthropic.com](https://console.anthropic.com) → API Keys → Create Key
   - It looks like: `sk-ant-api03-...`

2. **Create your `.env` file:**

   ```bash
   cp .env.example .env
   ```

3. **Open `.env`** in any text editor and replace the placeholder:

   ```
   ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
   ```

4. **Restart the server:**

   ```bash
   npm start
   ```

   You should now see:

   ```
   ✅  InvestIQ server running → http://localhost:3000
      API key: ✓ loaded
   ```

---

## 🔄 Development Mode (auto-restart on file changes)

```bash
npm run dev
```

This uses [nodemon](https://nodemon.io) — the server restarts automatically whenever you save changes to `server.js`.

---

## 🚀 Deploy to Railway (Free hosting)

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "InvestIQ v1.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/investiq.git
git push -u origin main
```

### Step 2 — Deploy on Railway

1. Go to **[railway.app](https://railway.app)** → Login with GitHub
2. **New Project → Deploy from GitHub repo** → select `investiq`
3. Go to **Variables** tab → Add:
   - `ANTHROPIC_API_KEY` = `sk-ant-your-key`
   - `ALLOWED_ORIGIN` = `https://your-project.up.railway.app`
4. Your live URL appears in ~2 minutes ✅

---

## 🔧 Troubleshooting

| Problem | Fix |
|---------|-----|
| `node: command not found` | Install Node.js from [nodejs.org](https://nodejs.org) |
| `npm: command not found` | npm comes with Node.js — reinstall it |
| `Error: Cannot find module 'express'` | Run `npm install` in the project folder |
| Port 3000 already in use | Change port in `.env`: `PORT=3001` then visit `http://localhost:3001` |
| Charts not loading | The CDN for Chart.js is blocked on some networks — try a different network or browser |
| AI chat returns demo responses | Add your `ANTHROPIC_API_KEY` to `.env` and restart the server |
| `ANTHROPIC_API_KEY` not loading | Make sure the file is named exactly `.env` (not `.env.txt`) and is in the root folder |

---

## 📊 What's Inside

| Page | Description |
|------|-------------|
| **Overview** | Portfolio KPIs, cumulative return chart, allocation weights |
| **Returns** | Monthly returns bar chart, period-by-period breakdown table |
| **Risk** | Per-asset volatility, risk–return scatter plot, full risk profile table |
| **Benchmark** | Portfolio vs NIFTY 50 comparison, alpha (excess return) chart |
| **Correlation** | Pairwise heatmap, diversification key findings |
| **Analyst Chat** | Ask questions in natural language about the portfolio data |
| **Forecast** | 6-month price forecast — linear regression, moving average, momentum |
| **Rebalancer** | Adjust allocation sliders, run AI simulation of impact |

---

## 📁 Project Structure

```
investiq/
├── server.js          # Express server — API proxy, rate limiting
├── public/
│   └── index.html     # Single-page app — all UI, charts, data
├── .env.example       # Template for environment variables
├── .env               # Your local secrets (never committed)
├── package.json
└── README.md
```

---

## 🗄️ Data Sources

| Asset | Source | Verification |
|-------|--------|--------------|
| BTC | StatMuse (CoinGecko data) | Full 24-month closes confirmed |
| ETH | CoinMarketCap / Statista | Key closes verified |
| AAPL | StockAnalysis.com | Dec 2024 = $249.06 confirmed |
| NIFTY50 | NSE India / Dhan.co | Sep 2024 peak 26,178 confirmed |
| RELIANCE | NSE India / Moneycontrol | Decline trend verified |
| TCS | NSE India / Investing.com | 52W range ₹2,360–₹3,710 confirmed |

---

## 🛠️ Tech Stack

- **Backend:** Node.js · Express · node-fetch · dotenv
- **Frontend:** Vanilla HTML/CSS/JS · Chart.js 4.4 · Playfair Display + DM Sans fonts
- **AI:** Claude 3.5 Sonnet (Anthropic API) — optional, demo mode works without it
- **Data model:** Excel (9 sheets, 218 formulas, 144 real price observations)
- **Hosting:** Railway (recommended) · Render · Fly.io · any Node.js host
