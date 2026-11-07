import http from 'node:http';
import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const loginHtml = await readFile(path.join(root, '../demo-app/index.html'));
const shopHtml = await readFile(path.join(root, '../demo-app/shop.html'));
const users = new Map();
const orders = new Map();
const products = [
  {
    id: 'p-100',
    name: 'Automation Field Guide',
    description: 'A practical guide to maintainable test automation.',
    price: 24.5,
  },
  {
    id: 'p-200',
    name: 'Quality Engineering Workbook',
    description: 'Exercises for test design and risk analysis.',
    price: 18,
  },
  {
    id: 'p-300',
    name: 'API Testing Checklist',
    description: 'A reusable checklist for REST API testing.',
    price: 9.75,
  },
];

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(payload === undefined ? undefined : JSON.stringify(payload));
}

function sendHtml(res, html) {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(html);
}

async function readJson(req) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (Buffer.byteLength(body) > 1_000_000) return { __tooLarge: true };
  }
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://127.0.0.1:4173');
  const method = req.method ?? 'GET';

  if (url.pathname === '/api/health' && method === 'GET') {
    return sendJson(res, 200, { status: 'ok' });
  }
  if (url.pathname === '/api/products' && method === 'GET') {
    return sendJson(res, 200, products);
  }

  if (url.pathname === '/api/users' && method === 'POST') {
    const input = await readJson(req);
    if (input?.__tooLarge) return sendJson(res, 413, { error: 'Request body too large' });
    if (!input || typeof input.name !== 'string' || typeof input.email !== 'string') {
      return sendJson(res, 400, { error: 'name and email are required' });
    }
    const user = { id: randomUUID(), name: input.name, email: input.email };
    users.set(user.id, user);
    return sendJson(res, 201, user);
  }

  const userMatch = url.pathname.match(/^\/api\/users\/([^/]+)$/);
  if (userMatch && method === 'GET') {
    const user = users.get(userMatch[1]);
    return sendJson(res, user ? 200 : 404, user ?? { error: 'Not found' });
  }
  if (userMatch && method === 'DELETE') {
    const existed = users.delete(userMatch[1]);
    if (existed) {
      res.writeHead(204).end();
      return;
    }
    return sendJson(res, 404, { error: 'Not found' });
  }

  if (url.pathname === '/api/orders' && method === 'POST') {
    const input = await readJson(req);
    if (input?.__tooLarge) return sendJson(res, 413, { error: 'Request body too large' });
    if (!input || !Array.isArray(input.items) || input.items.length === 0) {
      return sendJson(res, 400, { error: 'At least one order item is required' });
    }

    const normalized = [];
    for (const item of input.items) {
      if (
        !item ||
        typeof item.productId !== 'string' ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 20
      ) {
        return sendJson(res, 400, {
          error: 'Each item requires a valid productId and quantity between 1 and 20',
        });
      }
      const product = products.find((candidate) => candidate.id === item.productId);
      if (!product) return sendJson(res, 404, { error: `Unknown product: ${item.productId}` });
      normalized.push({
        productId: product.id,
        name: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
        lineTotal: Number((product.price * item.quantity).toFixed(2)),
      });
    }

    const order = {
      id: `ord-${randomUUID()}`,
      items: normalized,
      total: Number(normalized.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2)),
      status: 'confirmed',
    };
    orders.set(order.id, order);
    return sendJson(res, 201, order);
  }

  const orderMatch = url.pathname.match(/^\/api\/orders\/([^/]+)$/);
  if (orderMatch && method === 'GET') {
    const order = orders.get(orderMatch[1]);
    return sendJson(res, order ? 200 : 404, order ?? { error: 'Not found' });
  }

  if ((url.pathname === '/login' || url.pathname === '/') && method === 'GET') {
    return sendHtml(res, loginHtml);
  }
  if (url.pathname === '/shop' && method === 'GET') return sendHtml(res, shopHtml);
  if (url.pathname === '/dashboard' && method === 'GET') {
    const dashboard = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dashboard</title>
  </head>
  <body>
    <main>
      <h1>Dashboard</h1>
      <p>Welcome back.</p>
      <a href="/shop">Open demo shop</a>
      <button type="button" id="sign-out">Sign out</button>
    </main>
    <script>
      if (localStorage.getItem('testforge-authenticated') !== 'true') {
        location.replace('/login');
      }
      document.querySelector('#sign-out').addEventListener('click', () => {
        localStorage.removeItem('testforge-authenticated');
        localStorage.removeItem('testforge-user');
        location.assign('/login');
      });
    </script>
  </body>
</html>`;
    return sendHtml(res, dashboard);
  }
  return sendJson(res, 404, { error: 'Not found' });
});

const port = Number(process.env.DEMO_PORT ?? 4173);
server.listen(port, '127.0.0.1', () => {
  console.log(`TestForge demo app listening on http://127.0.0.1:${port}`);
});
