// tests/smoke/home.spec.js
import { test, expect } from '../test-base.js';

test.describe('Home @smoke', () => {
  test('loads and can search', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('welcome-banner')).toBeVisible();
    await page.getByPlaceholder('Search products').fill('camera');
    await page.keyboard.press('Enter');

    await expect(page.getByRole('heading', { name: /results/i })).toBeVisible();
  });
});