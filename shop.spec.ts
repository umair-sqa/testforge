import { test, expect } from '../../src/fixtures/test.fixture';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}
interface OrderResponse {
  id: string;
  items: Array<{ productId: string; quantity: number; lineTotal: number }>;
  total: number;
  status: 'confirmed';
}

test.describe('Shop API', () => {
  test('@smoke lists the available products', async ({ apiClient }) => {
    const response = await apiClient.get('/products');
    expect(response.status()).toBe(200);
    const products = (await response.json()) as Product[];
    expect(products).toHaveLength(3);
    expect(products[0]).toMatchObject({ id: 'p-100', name: 'Automation Field Guide', price: 24.5 });
  });

  test('@regression creates and retrieves a valid order', async ({ apiClient }) => {
    const createResponse = await apiClient.post('/orders', {
      items: [{ productId: 'p-100', quantity: 2 }, { productId: 'p-300', quantity: 1 }],
    });
    expect(createResponse.status()).toBe(201);
    const order = (await createResponse.json()) as OrderResponse;
    expect(order).toMatchObject({ total: 58.75, status: 'confirmed' });
    expect(order.items).toHaveLength(2);

    const getResponse = await apiClient.get(`/orders/${order.id}`);
    expect(getResponse.status()).toBe(200);
    expect(await getResponse.json()).toEqual(order);
  });

  test('@regression rejects an empty order', async ({ apiClient }) => {
    const response = await apiClient.post('/orders', { items: [] });
    expect(response.status()).toBe(400);
    expect(await response.json()).toEqual({ error: 'At least one order item is required' });
  });

  test('@regression rejects an unknown product', async ({ apiClient }) => {
    const response = await apiClient.post('/orders', { items: [{ productId: 'unknown', quantity: 1 }] });
    expect(response.status()).toBe(404);
    expect(await response.json()).toEqual({ error: 'Unknown product: unknown' });
  });

  test('@regression rejects an invalid quantity', async ({ apiClient }) => {
    const response = await apiClient.post('/orders', { items: [{ productId: 'p-100', quantity: 0 }] });
    expect(response.status()).toBe(400);
    expect(await response.json()).toEqual({ error: 'Each item requires a valid productId and quantity between 1 and 20' });
  });
});
