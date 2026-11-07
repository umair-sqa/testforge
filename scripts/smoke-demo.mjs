import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { once } from 'node:events';
import { spawn } from 'node:child_process';
import net from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';

async function getAvailablePort() {
  const probe = net.createServer();
  await new Promise((resolve, reject) => {
    probe.once('error', reject);
    probe.listen(0, '127.0.0.1', resolve);
  });
  const address = probe.address();
  if (!address || typeof address === 'string') {
    throw new Error('Could not determine an available demo port.');
  }
  await new Promise((resolve, reject) => {
    probe.close((error) => (error ? reject(error) : resolve()));
  });
  return address.port;
}

const port = await getAvailablePort();
const baseUrl = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ['scripts/demo-server.mjs'], {
  env: { ...process.env, DEMO_PORT: String(port) },
  stdio: ['ignore', 'pipe', 'pipe'],
});
let serverOutput = '';
server.stdout.on('data', (chunk) => {
  serverOutput += chunk.toString();
});
server.stderr.on('data', (chunk) => {
  serverOutput += chunk.toString();
});

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Demo server exited early. ${serverOutput}`);
    }
    try {
      const response = await fetch(`${baseUrl}/api/health`);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await delay(100);
  }
  throw new Error(`Demo server did not start. ${serverOutput}`);
}

async function expectStatus(response, expectedStatus, description) {
  assert.equal(response.status, expectedStatus, description);
}

try {
  await waitForServer();

  const healthResponse = await fetch(`${baseUrl}/api/health`);
  await expectStatus(healthResponse, 200, 'Health endpoint should return 200.');
  assert.deepEqual(await healthResponse.json(), { status: 'ok' });
  console.log('PASS demo health endpoint');

  const shopResponse = await fetch(`${baseUrl}/shop`);
  await expectStatus(shopResponse, 200, 'Demo shop should return 200.');
  assert.match(await shopResponse.text(), /Your cart/);
  console.log('PASS demo shop page');

  const productsResponse = await fetch(`${baseUrl}/api/products`);
  await expectStatus(productsResponse, 200, 'Product catalogue should return 200.');
  const products = await productsResponse.json();
  assert.equal(products.length, 3);
  assert.equal(products[0].id, 'p-100');
  console.log('PASS product catalogue API');

  const userData = {
    name: 'Smoke Test User',
    email: `smoke-${randomUUID()}@example.com`,
  };
  const createUserResponse = await fetch(`${baseUrl}/api/users`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(userData),
  });
  await expectStatus(createUserResponse, 201, 'User creation should return 201.');
  const user = await createUserResponse.json();
  assert.deepEqual({ name: user.name, email: user.email }, userData);

  const getUserResponse = await fetch(`${baseUrl}/api/users/${user.id}`);
  await expectStatus(getUserResponse, 200, 'User retrieval should return 200.');
  assert.deepEqual(await getUserResponse.json(), user);

  const deleteUserResponse = await fetch(`${baseUrl}/api/users/${user.id}`, {
    method: 'DELETE',
  });
  await expectStatus(deleteUserResponse, 204, 'User deletion should return 204.');

  const missingUserResponse = await fetch(`${baseUrl}/api/users/${user.id}`);
  await expectStatus(missingUserResponse, 404, 'Deleted user should return 404.');

  const invalidUserResponse = await fetch(`${baseUrl}/api/users`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Missing email' }),
  });
  await expectStatus(invalidUserResponse, 400, 'Invalid user payload should return 400.');
  console.log('PASS user API create, retrieve, delete and validation');

  const orderResponse = await fetch(`${baseUrl}/api/orders`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      items: [
        { productId: 'p-100', quantity: 2 },
        { productId: 'p-300', quantity: 1 },
      ],
    }),
  });
  await expectStatus(orderResponse, 201, 'Valid order should return 201.');
  const order = await orderResponse.json();
  assert.equal(order.total, 58.75);
  assert.equal(order.status, 'confirmed');

  const retrievedOrderResponse = await fetch(`${baseUrl}/api/orders/${order.id}`);
  await expectStatus(retrievedOrderResponse, 200, 'Order retrieval should return 200.');
  assert.deepEqual(await retrievedOrderResponse.json(), order);
  console.log('PASS order creation and retrieval');

  const invalidOrders = [
    { items: [] },
    { items: [{ productId: 'p-100', quantity: 0 }] },
    { items: [{ productId: 'unknown', quantity: 1 }] },
  ];
  const expectedStatuses = [400, 400, 404];
  for (const [index, payload] of invalidOrders.entries()) {
    const response = await fetch(`${baseUrl}/api/orders`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    await expectStatus(response, expectedStatuses[index], `Invalid order case ${index + 1}.`);
  }
  console.log('PASS order validation for empty, invalid-quantity and unknown-product cases');

  const malformedJsonResponse = await fetch(`${baseUrl}/api/orders`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{',
  });
  await expectStatus(malformedJsonResponse, 400, 'Malformed JSON should return 400.');

  const oversizedBodyResponse = await fetch(`${baseUrl}/api/orders`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ payload: 'x'.repeat(1_000_001) }),
  });
  await expectStatus(oversizedBodyResponse, 413, 'Oversized JSON should return 413.');
  console.log('PASS malformed and oversized request handling');
} finally {
  if (server.exitCode === null) {
    const exited = once(server, 'exit');
    server.kill('SIGTERM');
    await exited;
  }
}
