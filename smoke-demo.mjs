import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const port = 4189;
const baseUrl = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ['scripts/demo-server.mjs'], {
  env: { ...process.env, DEMO_PORT: String(port) },
  stdio: ['ignore', 'pipe', 'pipe'],
});
let serverOutput = '';
server.stdout.on('data', (chunk) => { serverOutput += chunk.toString(); });
server.stderr.on('data', (chunk) => { serverOutput += chunk.toString(); });

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (server.exitCode !== null) throw new Error(`Demo server exited early. ${serverOutput}`);
    try {
      const response = await fetch(`${baseUrl}/api/health`);
      if (response.ok) return;
    } catch { /* server is still starting */ }
    await delay(100);
  }
  throw new Error(`Demo server did not start. ${serverOutput}`);
}

try {
  await waitForServer();
  const health = await fetch(`${baseUrl}/api/health`).then((response) => response.json());
  assert.deepEqual(health, { status: 'ok' });

  const shop = await fetch(`${baseUrl}/shop`);
  assert.equal(shop.status, 200);
  assert.match(await shop.text(), /Your cart/);

  const productsResponse = await fetch(`${baseUrl}/api/products`);
  assert.equal(productsResponse.status, 200);
  const products = await productsResponse.json();
  assert.equal(products.length, 3);

  const orderResponse = await fetch(`${baseUrl}/api/orders`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ items: [{ productId: 'p-100', quantity: 2 }, { productId: 'p-300', quantity: 1 }] }),
  });
  assert.equal(orderResponse.status, 201);
  const order = await orderResponse.json();
  assert.equal(order.total, 58.75);
  assert.equal(order.status, 'confirmed');

  const retrievedOrder = await fetch(`${baseUrl}/api/orders/${order.id}`);
  assert.equal(retrievedOrder.status, 200);
  assert.deepEqual(await retrievedOrder.json(), order);

  const invalidOrder = await fetch(`${baseUrl}/api/orders`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ items: [{ productId: 'p-100', quantity: 0 }] }),
  });
  assert.equal(invalidOrder.status, 400);

  console.log('PASS demo health endpoint');
  console.log('PASS demo shop page');
  console.log('PASS product catalogue API');
  console.log('PASS order creation and retrieval');
  console.log('PASS invalid order validation');
} finally {
  server.kill('SIGTERM');
}
