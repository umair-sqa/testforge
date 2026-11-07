import 'dotenv/config';
import path from 'node:path';

function valueOrDefault(name: string, fallback: string): string {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : fallback;
}

function booleanFromEnv(name: string, fallback: boolean): boolean {
  const value = process.env[name];
  if (value === undefined || value.trim() === '') return fallback;
  if (value === 'true') return true;
  if (value === 'false') return false;
  throw new Error(`${name} must be either "true" or "false".`);
}

const baseUrl = valueOrDefault('BASE_URL', 'http://127.0.0.1:4173').replace(/\/+$/, '');
const configuredApiBaseUrl = valueOrDefault('API_BASE_URL', `${baseUrl}/api`);
const apiBaseUrl = configuredApiBaseUrl.endsWith('/')
  ? configuredApiBaseUrl
  : `${configuredApiBaseUrl}/`;

export const env = Object.freeze({
  baseUrl,
  apiBaseUrl,
  testUserEmail: valueOrDefault('TEST_USER_EMAIL', 'demo@example.com'),
  testUserPassword: valueOrDefault('TEST_USER_PASSWORD', 'ChangeMe123!'),
  useDemoServer: booleanFromEnv('USE_DEMO_SERVER', true),
  isCi: booleanFromEnv('CI', false),
  authStatePath: path.resolve(valueOrDefault('AUTH_STATE_PATH', '.auth/user.json')),
});
