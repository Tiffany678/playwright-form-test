import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page.js";
import { ProductsPage } from "../pages/products.page.js";

test("user can login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login("");
  await loginPage.login("standard_user", "secret_sauce");

  await productsPage.assertOnProductPage();
  await expect(productsPage.title).toHaveText("Products");
});
