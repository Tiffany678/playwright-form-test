import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page.js";
import { ProductsPage } from "../pages/products.page.js";
import { CartPage } from "../pages/cart.page.js";

test("user can add product to cart and see it in cart", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  //login
  await loginPage.goto();
  await loginPage.login("visual_user", "secret_sauce");

  //on products
  await productsPage.assertOnProductPage();

  //add backpack
  await productsPage.addBackpackToCart();

  //badge should be 1
  await expect(productsPage.cartBadge).toHaveText("1");

  //go to cart
  await productsPage.openCart();
  await cartPage.assertOnCartPage();

  // verify item exists
  const itemNames = await cartPage.getItemNames();
  expect(itemNames).toContain("Sauce Labs Backpack");
});
