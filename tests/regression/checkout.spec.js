// // tests/regression/checkout.spec.js
// import { test, expect } from '../test-base.js';
// import { CheckoutPage } from '../../pages/checkout.page.js';

// test.describe('Checkout @regression', () => {
//   test('submits order (standard user) @e2e', async ({ page, user }) => {
//     const checkout = new CheckoutPage(page);
//     await checkout.goto('/checkout');

//     await checkout.fillCustomer({
//       firstName: 'Grace',
//       lastName: 'Yang',
//       country: 'United States'
//     });

//     await checkout.submitForm();
//     await checkout.expectSuccess(expect);
//   });
// });