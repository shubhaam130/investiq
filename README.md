# InvestIQ — Portfolio Analytics Platform

> Real-data investment portfolio analysis system.
> Jan 2024 – Dec 2025 · 6 assets · 144 verified price observations.

**Built by Shubhaam** | Data Modeling with Spreadsheet Project

---

## Quick Start (Local)

```bash
# 1. Install dependencies
npm install

# 2. Add your API key
cp .env.example .env
# Open .env and paste your key: ANTHROPIC_API_KEY=sk-ant-...

# 3. Run
npm start
# Open http://localhost:3000
```

---

## Deploy to Railway (Free — Recommended)

### Step 1 — Get your API key
1. Go to **console.anthropic.com**
2. Sign up (free)
3. Click **API Keys → Create Key**
4. Copy it — looks like `sk-ant-api03-...`

### Step 2 — Push to GitHub
```bash
git init
git add .
git commit -m "InvestIQ v1.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/investiq.git
git push -u origin main
```

### Step 3 — Deploy on Railway
1. Go to **railway.app** → Login with GitHub
2. **New Project → Deploy from GitHub repo** → select `investiq`
3. Go to **Variables** tab → Add:
   - `ANTHROPIC_API_KEY` = `sk-ant-your-key`
   - `ALLOWED_ORIGIN` = `https://your-project.up.railway.app`
4. Your live URL appears in ~2 minutes ✅

---

## Data Sources

| Asset | Source | Verification |
|-------|--------|-------------|
| BTC | StatMuse (CoinGecko data) | Full 24-month closes confirmed |
| ETH | CoinMarketCap / Statista | Key closes verified |
| AAPL | StockAnalysis.com | Dec 2024 = $249.06 confirmed |
| NIFTY50 | NSE India / Dhan.co | Sep 2024 peak 26,178 confirmed |
| RELIANCE | NSE India / Moneycontrol | Decline trend verified |
| TCS | NSE India / Investing.com | 52W range ₹2,360–₹3,710 confirmed |

---

## Tech Stack
- **Backend:** Node.js, Express, node-fetch, dotenv
- **Frontend:** HTML/CSS/JS, Chart.js 4.4
- **Analytics:** Claude (Anthropic API)
- **Data model:** Excel (openpyxl, 9 sheets, 218 formulas)
- **Hosting:** Railway
