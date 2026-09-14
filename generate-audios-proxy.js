/**
 * Gera arquivos MP3 de narração via o proxy interno TecnoCursos
 * (https://texttospeech.escolatecnocursos.cloud), que por sua vez chama a ElevenLabs.
 *
 * Diferente do generate-audios.js (chave direta da ElevenLabs), este script faz
 * login com usuário/senha (AUTH_USERNAME/AUTH_PASSWORD no .env) para obter um
 * token Bearer e então chama POST /api/tts.
 *
 * Uso:
 *   node generate-audios-proxy.js --all
 *   node generate-audios-proxy.js s2b s2c
 *
 * O token Bearer pode vir de TTS_BEARER_TOKEN ou da constante
 * NR12_TTS_BEARER_TOKEN em index.html. Sem token, tenta login.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { buildManifest, writeManifest, MANIFEST_PATH } = require('./audio-data');

const API_BASE = 'https://texttospeech.escolatecnocursos.cloud';

function loadEnvFile() {
  for (const filename of ['.env', '.env.local']) {
    const envPath = path.join(__dirname, filename);
    if (!fs.existsSync(envPath)) continue;
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

async function login() {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: process.env.AUTH_USERNAME,
      password: process.env.AUTH_PASSWORD,
    }),
  });
  if (!res.ok) {
    throw new Error(`Login falhou (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  return data.token;
}

async function synthesize(text, token) {
  const res = await fetch(`${API_BASE}/api/tts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    throw new Error(`TTS falhou (${res.status}): ${await res.text()}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

function readTokenFromHtml() {
  const htmlPath = path.join(__dirname, 'index.html');
  if (!fs.existsSync(htmlPath)) return '';
  const match = fs.readFileSync(htmlPath, 'utf8').match(/NR12_TTS_BEARER_TOKEN = '([^']+)'/);
  return match ? match[1] : '';
}

async function synthesizeWithRetry(text, token) {
  let lastError = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await synthesize(text, token);
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, 1500 * attempt));
    }
  }
  throw lastError;
}

async function main() {
  loadEnvFile();

  const args = process.argv.slice(2);
  const all = args.includes('--all') || args.length === 0;
  const ids = args.filter((a) => a !== '--all').map((a) => a.replace(/^--slide=/, ''));

  const manifest = buildManifest();
  const slides = all
    ? manifest.slides
    : ids.map((id) => manifest.slides.find((s) => s.id === id)).filter(Boolean);

  if (!slides.length) {
    console.error('Nenhum slide para gerar.');
    process.exit(1);
  }

  let token = process.env.TTS_BEARER_TOKEN || readTokenFromHtml();
  if (!token) {
    if (!process.env.AUTH_USERNAME || !process.env.AUTH_PASSWORD) {
      console.error('Defina o Bearer ou AUTH_USERNAME/AUTH_PASSWORD.');
      process.exit(1);
    }
    console.log('Autenticando no proxy...');
    token = await login();
    console.log('Login ok.');
  }

  console.log(`Gerando ${slides.length} áudio(s) em audios/`);
  const hashPath = path.join(__dirname, 'audios', '.text-hashes.json');
  let hashes = {};
  if (fs.existsSync(hashPath)) {
    try { hashes = JSON.parse(fs.readFileSync(hashPath, 'utf8')); } catch { hashes = {}; }
  }

  const total = slides.length;

  for (const slide of slides) {
    const spoken = `Página ${slide.index + 1} de ${total}. ${slide.text}`;
    process.stdout.write(`▶ ${slide.id} (${spoken.length} chars)... `);
    try {
      const audio = await synthesizeWithRetry(spoken, token);
      const outputPath = path.join(__dirname, slide.file);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, audio);
      hashes[slide.id] = crypto.createHash('sha256').update(slide.text, 'utf8').digest('hex');
      fs.writeFileSync(hashPath, JSON.stringify(hashes, null, 2), 'utf8');
      console.log(`ok (${audio.length} bytes)`);
    } catch (error) {
      console.log('falhou');
      console.error(`  ${error.message}`);
      process.exitCode = 1;
    }
  }

  const refreshed = buildManifest();
  writeManifest(refreshed, MANIFEST_PATH);
  console.log('\nManifesto atualizado (manifest.json + audio-manifest.js).');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
