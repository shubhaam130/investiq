# InvestIQ — Portfolio Analytics Platform

> Real-data investment portfolio analysis · Jan 2024 – Dec 2025 · 6 assets · 144 verified price observations

**Built by Shubhaam** | Data Modeling with Spreadsheet Project

---

## 🏁 Complete Setup Guide — Add API Key & Run the Project

> Follow these **6 steps** from a fresh machine to a fully running app with live AI chat.
> Each step takes about 30 seconds — total time ≈ 3–5 minutes.

---

### Step 1 — Install Node.js (skip if you already have it)

1. Go to **[nodejs.org](https://nodejs.org)** and download the **LTS** version.
2. Run the installer — accept all defaults.
3. Open a **terminal** (macOS/Linux) or **Command Prompt / PowerShell** (Windows) and verify:

```bash
node -v   # must print v18.x.x or higher
npm -v    # must print 9.x.x or higher
```

If either command says "not found", restart your terminal after installing and try again.

---

### Step 2 — Download the project

```bash
git clone https://github.com/shubhaam130/investiq.git
cd investiq
npm install
```

`npm install` downloads all dependencies (express, dotenv, etc.) into a local `node_modules` folder.
It is safe to run multiple times.

---

### Step 3 — Get your Anthropic API key

> ⚠️ **Security — read before continuing**
>
> Your API key is a **secret credential** that charges your Anthropic account.
> - **Never** share it in a GitHub issue, Discord, chat, or screenshot.
> - **Never** hard-code it directly in a source file.
> - If you accidentally expose it, **revoke it immediately** at
>   [console.anthropic.com](https://console.anthropic.com) → API Keys → Delete, then create a new one.
>
> The steps below store it in a local `.env` file that `.gitignore` prevents from ever being committed.

1. Go to **[console.anthropic.com](https://console.anthropic.com)** and sign in (free account is fine).
2. Click **API Keys** in the left sidebar.
3. Click **Create Key** → give it a name (e.g. *InvestIQ*) → click **Create**.
4. **Copy the key immediately** — it starts with `sk-ant-api03-…` and is shown only once.

> 💡 **No key? No problem.** Skip to Step 4b to run in Demo Mode — all charts, tables and
> forecasts work fully without a key. Only the live AI chat requires one.

---

### Step 4a — Add the key (recommended: interactive script)

Run this command inside the `investiq` folder:

```bash
npm run setup
```

When prompted, **paste your key** and press Enter. The script creates `.env` for you.
You will see:

```
✅  .env created with your API key.

   Next steps:
     npm start               # start the server
     open http://localhost:3000
```

Jump to **Step 5** ↓

---

### Step 4b — Add the key manually (alternative)

1. Create your `.env` file from the template:

   ```bash
   cp .env.example .env
   ```

2. Open `.env` in any text editor (Notepad, VS Code, nano …).
   You will see this line:

   ```
   ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```

3. Replace `sk-ant-your-key-here` with your real key:

   ```
   ANTHROPIC_API_KEY=sk-ant-api03-YOUR-ACTUAL-KEY-HERE
   ```

4. **Save the file.** Make sure it is named exactly `.env` — not `.env.txt`.

---

### Step 5 — Start the server

```bash
npm start
```

You will see one of:

```
✅  InvestIQ server running → http://localhost:3000
   API key: ✓ loaded           ← live AI chat is active
```

or (Demo Mode, if you skipped the API key):

```
✅  InvestIQ server running → http://localhost:3000
   API key: ✗ MISSING — check .env
```

Both are fine. The app works in both modes.

---

### Step 6 — Open in your browser

```
http://localhost:3000
```

You should see the InvestIQ dashboard. 🎉
Click **Analyst Chat** or **Rebalancer** to test the AI features.

---

> **To stop the server**, press `Ctrl + C` in the terminal.
> **To restart it later**, just run `npm start` again from the `investiq` folder.

---

## ✅ How to Run (quick reference — 3 steps)

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

> ⚠️ **Security — please read first**
>
> Your Anthropic API key is a **secret password** that grants access to a paid service.
> - **Never** paste it into a GitHub issue, chat message, or anywhere else that is publicly visible.
> - **Never** commit it into a file that is tracked by git.
> - If you accidentally share it publicly, **revoke it immediately** at [console.anthropic.com](https://console.anthropic.com) → API Keys → delete the key, then create a new one.
>
> This project is designed so the key stays in a local `.env` file (which `.gitignore` prevents from ever being committed).

---

### Step-by-step: add your API key

**Step 1 — Get your key**

1. Go to [console.anthropic.com](https://console.anthropic.com) and sign in (or create a free account).
2. Click **API Keys** in the left sidebar.
3. Click **Create Key**, give it a name (e.g. *InvestIQ*), and copy the key.
   - It looks like: `sk-ant-api03-...`
   - You can only see it once — copy it now.

**Step 2 — Create your `.env` file** *(one-time, do this in your terminal)*

```bash
cp .env.example .env
```

This copies the template. The resulting `.env` file is listed in `.gitignore` so it will **never** be committed to GitHub.

**Step 3 — Add the key to `.env`**

Open `.env` in any text editor (Notepad, VS Code, nano, etc.) and change this line:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

to your actual key:

```
ANTHROPIC_API_KEY=sk-ant-api03-YOUR-ACTUAL-KEY-HERE
```

Save the file.

**Step 4 — Restart the server**

```bash
npm start
```

You should now see:

```
✅  InvestIQ server running → http://localhost:3000
   API key: ✓ loaded
```

If you still see `✗ MISSING`, double-check that the file is named exactly `.env` (not `.env.txt`) and is in the root of the project folder.

---

### Quick alternative — interactive setup script

Instead of Steps 2–3 above you can run:

```bash
npm run setup
```

The script will prompt you to paste your key, write `.env` for you, and print next steps.

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
| Key was accidentally shared publicly | Revoke it immediately at [console.anthropic.com](https://console.anthropic.com) → API Keys, then create a new one |

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
