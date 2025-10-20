import { test, expect } from "@playwright/test";

test("Student Registration Form submission", async ({ page }) => {
  // 1️ Open your React form app
  await page.goto("https://yang-react.web.app/");

  // 2️ Fill out the form
  await page.fill("#firstName", "John");
  await page.fill("#lastName", "Doe");
  await page.fill("#email", "john.doe@example.com");
  await page.click("#gender-Male");
  await page.fill("#mobile", "(123)456-7890");
  await page.fill("#dob", "2000-01-01");
  await page.fill("#street", "123 Main Street");

  await page.selectOption("#state", { label: "New York" });
  // Optional: If city becomes enabled dynamically, wait for it
  await page
    .waitForSelector("#city:not([disabled])", { timeout: 5000 })
    .catch(() => {});
  await page.selectOption("#city", { label: "New York City" }).catch(() => {});

  // 3️ Upload a picture (optional)
  const filePath = "./tests/dimsum.png"; // ensure this file exists
  await page.setInputFiles("#picture", filePath);

  // 4️ Submit the form
  await page.click('button[type="submit"]');

  // 5️ Verify success message
  const alert = page.locator(".alert-success");
  await expect(alert).toHaveText(/successfully submitted/i);
});
