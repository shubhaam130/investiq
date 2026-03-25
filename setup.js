#!/usr/bin/env node
// InvestIQ — Interactive Setup Script
// Helps you configure your .env file with the Anthropic API key.
// Run with:  node setup.js   or   npm run setup

'use strict';

const fs       = require('fs');
const path     = require('path');
const readline = require('readline');

const ROOT        = __dirname;
const ENV_FILE    = path.join(ROOT, '.env');
const ENV_EXAMPLE = path.join(ROOT, '.env.example');

// ─── Helpers ─────────────────────────────────────────────────────────────────

function ask(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

function readExample() {
  if (!fs.existsSync(ENV_EXAMPLE)) {
    console.error('❌  .env.example not found. Please re-clone the repository.');
    process.exit(1);
  }
  return fs.readFileSync(ENV_EXAMPLE, 'utf8');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🚀  InvestIQ Setup\n');

  // Use a single readline interface for all prompts
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  // ── Check for an existing .env ─────────────────────────────────────────────
  if (fs.existsSync(ENV_FILE)) {
    const answer = await ask(rl, '⚠️   .env already exists. Overwrite it? [y/N] ');
    if (answer.trim().toLowerCase() !== 'y') {
      rl.close();
      console.log('   Keeping existing .env — no changes made.\n');
      process.exit(0);
    }
  }

  // ── Prompt for API key ─────────────────────────────────────────────────────
  console.log('\n   The Analyst Chat and Rebalancer features use Claude by Anthropic.');
  console.log('   You can skip this step — the app runs in Demo Mode without a key.\n');
  console.log('   Get a free API key at: https://console.anthropic.com → API Keys\n');

  const rawKey = await ask(rl, '   Paste your Anthropic API key (or press Enter to skip): ');
  rl.close();

  const key = rawKey.trim();

  // ── Validate key format (optional, non-blocking) ───────────────────────────
  if (key && !key.startsWith('sk-ant-')) {
    console.log('\n   ⚠️   That doesn\'t look like an Anthropic key (expected: sk-ant-...).');
    console.log('   Saving it anyway — double-check the value if AI chat doesn\'t work.\n');
  }

  // ── Write .env ────────────────────────────────────────────────────────────
  let content = readExample();
  if (key) {
    content = content.replace(/^ANTHROPIC_API_KEY=.*/m, `ANTHROPIC_API_KEY=${key}`);
  }

  fs.writeFileSync(ENV_FILE, content, 'utf8');

  // ── Done ──────────────────────────────────────────────────────────────────
  if (key) {
    console.log('\n✅  .env created with your API key.');
  } else {
    console.log('\n✅  .env created (Demo Mode — no API key set).');
  }

  console.log('\n   Next steps:');
  console.log('     npm start               # start the server');
  console.log('     open http://localhost:3000\n');
}

main().catch(err => {
  console.error('\n❌  Setup failed:', err.message);
  process.exit(1);
});
