/**
 * Bro Biryani - High-Performance Localhost Web Server
 * Zero-dependency native Node.js HTTP server
 * Supports: Static asset streaming, auto MIME resolution, CORS, and clean console output.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf'
};

const server = http.createServer((req, res) => {
  // Normalize URL and prevent directory traversal
  let safePath = path.normalize(decodeURI(req.url.split('?')[0])).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, safePath);

  // Security: Check if filePath is within PUBLIC_DIR
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
          <div style="font-family: sans-serif; text-align: center; padding: 50px; background: #0F0F12; color: #F9FAFB; min-height: 100vh;">
            <h1 style="color: #F59E0B; font-size: 48px;">404 - Not Found</h1>
            <p>The requested file <code>${safePath}</code> does not exist.</p>
            <p><a href="/" style="color: #F83E1C; font-weight: bold;">Return to Bro Biryani Home</a></p>
          </div>
        `);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`500 Internal Server Error: ${err.code}`);
      }
      return;
    }

    if (stats.isDirectory()) {
      res.writeHead(302, { Location: safePath + '/index.html' });
      res.end();
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('\n======================================================');
  console.log(' 🔥 BRO BIRYANI LOCALHOST SERVER RUNNING');
  console.log('======================================================');
  console.log(`\n  Local URL:    http://localhost:${PORT}`);
  console.log(`  Network URL:  http://127.0.0.1:${PORT}`);
  console.log(`  Directory:    ${PUBLIC_DIR}`);
  console.log('\n  Press Ctrl+C to stop the server anytime.\n');
  console.log('======================================================\n');
});

// Error handling (e.g. Port in use)
server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.warn(`[WARN] Port ${PORT} is in use, retrying on port ${PORT + 1}...`);
    server.listen(PORT + 1, '0.0.0.0');
  } else {
    console.error('Server error:', e);
  }
});
