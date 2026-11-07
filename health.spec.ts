import { test, expect } from '../../src/fixtures/test.fixture';
import { createUser } from '../../src/helpers/test-data';

interface UserResponse {
  id: string;
  name: string;
  email: string;
}

test.describe('Demo API', () => {
  test('@smoke returns a healthy status', async ({ apiClient }) => {
    const response = await apiClient.get('/health');
    expect(response.status()).toBe(200);
    await expect(response).toBeOK();
    expect(await response.json()).toEqual({ status: 'ok' });
  });

  test('@regression creates, retrieves and deletes a user', async ({ apiClient }) => {
    const userData = createUser();
    const createResponse = await apiClient.post('/users', userData);
    expect(createResponse.status()).toBe(201);
    const created = (await createResponse.json()) as UserResponse;
    expect(created).toMatchObject({ name: userData.name, email: userData.email });
    expect(created.id).toBeTruthy();

    try {
      const getResponse = await apiClient.get(`/users/${created.id}`);
      expect(getResponse.status()).toBe(200);
      expect(await getResponse.json()).toEqual(created);
    } finally {
      const deleteResponse = await apiClient.delete(`/users/${created.id}`);
      expect(deleteResponse.status()).toBe(204);
    }

    const missingResponse = await apiClient.get(`/users/${created.id}`);
    expect(missingResponse.status()).toBe(404);
  });

  test('@regression validates required user fields', async ({ apiClient }) => {
    const response = await apiClient.post('/users', { name: 'Incomplete user' });
    expect(response.status()).toBe(400);
    expect(await response.json()).toEqual({ error: 'name and email are required' });
  });

  test('@regression returns 404 for an unknown user', async ({ apiClient }) => {
    const response = await apiClient.get('/users/does-not-exist');
    expect(response.status()).toBe(404);
    expect(await response.json()).toEqual({ error: 'Not found' });
  });
});
