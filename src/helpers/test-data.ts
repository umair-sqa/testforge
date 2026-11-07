import { randomUUID } from 'node:crypto';

export interface UserData {
  name: string;
  email: string;
  password: string;
}

export function createUser(overrides: Partial<UserData> = {}): UserData {
  const id = randomUUID().slice(0, 8);
  return {
    name: `Test User ${id}`,
    email: `test-${id}@example.com`,
    password: 'TestPassword123!',
    ...overrides,
  };
}
