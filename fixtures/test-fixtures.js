// // fixtures/test-fixtures.js
// import { test as base } from '@playwright/test';

// export const test = base.extend({
//   // Reusable fixture: logged-in storage state
//   storageState: async ({ browser }, use) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto(BASE_URL);
//     // await page.fill('#username', 'admin');
//     // await page.fill('#password', 'password123');
//     // await page.click('button[type="submit"]');

//     // Save authenticated session
//     // await context.storageState({ path: 'storage/auth.json' });
//     // await context.close();

//     // // Use that saved state in tests
//     // await use('storage/auth.json');
//   }
// });