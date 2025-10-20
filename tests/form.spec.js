import { test, expect } from "@playwright/test";
import { RegisterPage } from "./registerPage";

test("Student Registration Form submission", async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await page.goto("https://yang-react.web.app/");
  await registerPage.register();
  const alert = page.locator(".alert-success");
  await expect(alert).toHaveText(/successfully submitted/i);

  page.close();
});
