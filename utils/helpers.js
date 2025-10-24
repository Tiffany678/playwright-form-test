// utils/helpers.js
// ==============================================
// 🔧 Playwright Helper Utility Library
// Author: Xinjie Yang
// Description: Reusable functions for browser,
// context, data generation, waits, API, tracing, etc.
// ==============================================

import { chromium } from '@playwright/test';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

// ===========================
// 🧱 1. Browser / Context Helpers
// ===========================

/**
 * Launch a Chromium browser instance.
 * @param {boolean} headless - Launch in headless mode (default: true)
 */
export async function launchBrowser(headless = true) {
  const browser = await chromium.launch({ headless });
  return browser;
}

/**
 * Create an authenticated browser context using a saved storage state.
 * @param {Browser} browser - The browser instance
 * @param {string} storageStatePath - Path to storage state file
 */
export async function createContextWithAuth(browser, storageStatePath = 'storage/auth.json') {
  return await browser.newContext({ storageState: storageStatePath });
}

/**
 * Login manually and save authentication state for reuse.
 * Typically used once to create storage/auth.json
 */
export async function loginAndSaveState(baseURL = process.env.BASE_URL, credentials) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(`${baseURL}/login`);
  await page.fill('#username', credentials.user);
  await page.fill('#password', credentials.pass);
  await page.click('button[type="submit"]');
  await page.waitForURL(/dashboard|home/);

  await context.storageState({ path: 'storage/auth.json' });
  console.log('✅ Auth state saved to storage/auth.json');

  await browser.close();
}

// ===========================
// ⏳ 2. Wait & Synchronization Helpers
// ===========================

/**
 * Wait for an element to appear on the page.
 */
export async function waitForElement(page, selector, timeout = 5000) {
  await page.waitForSelector(selector, { timeout });
}

/**
 * Wait until all network requests are complete.
 */
export async function waitForNetworkIdle(page, timeout = 3000) {
  await page.waitForLoadState('networkidle', { timeout });
}

// ===========================
// 🧮 3. Data Generation Helpers
// ===========================

/**
 * Generate a unique random email address.
 */
export function generateRandomEmail(prefix = 'user') {
  const timestamp = Date.now();
  return `${prefix}${timestamp}@example.com`;
}

/**
 * Generate a random alphanumeric string.
 */
export function generateRandomString(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// ===========================
// 📂 4. File & Screenshot Helpers
// ===========================

/**
 * Read and parse a JSON file.
 */
export function readJSON(filePath) {
  if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

/**
 * Capture a screenshot with a timestamped filename.
 */
export async function takeScreenshot(page, name = 'screenshot') {
  const dir = 'reports/screenshots';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const path = `${dir}/${name}-${Date.now()}.png`;
  await page.screenshot({ path });
  console.log(`📸 Screenshot saved: ${path}`);
}

// ===========================
// 🌐 5. API Helpers
// ===========================

/**
 * Perform a GET request via Playwright API context.
 */
export async function apiGet(request, endpoint) {
  const response = await request.get(endpoint);
  if (!response.ok()) throw new Error(`GET ${endpoint} failed: ${response.status()}`);
  return await response.json();
}

/**
 * Perform a POST request via Playwright API context.
 */
export async function apiPost(request, endpoint, payload) {
  const response = await request.post(endpoint, { data: payload });
  if (!response.ok()) throw new Error(`POST ${endpoint} failed: ${response.status()}`);
  return await response.json();
}

// ===========================
// ⚙️ 6. Environment & Config Helpers
// ===========================

/**
 * Get the active base URL from environment variables.
 */
export function getBaseUrl() {
  return process.env.BASE_URL || 'https://example.com';
}

/**
 * Detect if running in a CI/CD environment.
 */
export function isCI() {
  return !!process.env.CI;
}

// ===========================
// 🧠 7. Debugging & Tracing Helpers
// ===========================

/**
 * Start Playwright tracing for a test.
 */
export async function enableTracing(context, testName = 'test') {
  await context.tracing.start({ screenshots: true, snapshots: true });
  console.log(`🟢 Tracing started for ${testName}`);
}

/**
 * Stop and save Playwright trace to file.
 */
export async function stopTracing(context, testName = 'test') {
  const dir = 'reports/traces';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const path = `${dir}/${testName}-${Date.now()}.zip`;
  await context.tracing.stop({ path });
  console.log(`🧾 Trace saved: ${path}`);
}

// ===========================
// 🧹 8. Utility Helpers
// ===========================

/**
 * Pause test execution manually (for debugging)
 */
export async function pauseForDebug(seconds = 3) {
  console.log(`⏸ Pausing for ${seconds}s...`);
  await new Promise((r) => setTimeout(r, seconds * 1000));
}

/**
 * Format a date for logs or filenames
 */
export function formatDate() {
  const now = new Date();
  return now.toISOString().replace(/[:.]/g, '-');
}