// tests/api/users.api.spec.js
import { test, expect, request } from '@playwright/test';

test.describe('Users API @api', () => {
  test('GET /users returns list', async ({}) => {
    const api = await request.newContext({
      baseURL: process.env.API_BASE || 'https://jsonplaceholder.typicode.com'
    });
    const res = await api.get('/users');
    expect(res.ok()).toBeTruthy();
    const json = await res.json();
    expect(Array.isArray(json)).toBe(true);
    expect(json[0]).toHaveProperty('email');
  });
});