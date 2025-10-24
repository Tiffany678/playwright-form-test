import { test, expect } from "@playwright/test";
import { RegisterPage } from "../../pages/registerPage";

test("Student Registration Form submission", async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await page.goto('/');
  await registerPage.register();
  const alert = page.locator(".alert-success");
  await expect(alert).toHaveText(/successfully submitted/i);

});

