# 🧪 Playwright Form Test (POM Design)

## 📋 Overview

This project automates the testing of a **Student Registration Form** using [Microsoft Playwright](https://playwright.dev).  
It follows the **Page Object Model (POM)** design pattern to ensure clean, maintainable, and reusable test code.

<!--

## 🧱 Project Structure

playwright-form-test/
│
├── tests/
│ ├── form.spec.js # Main test file
│ └── registerPage.js # Page Object file
│
├── playwright.config.js # Playwright configuration
├── package.json
└── README.md -->

---

## 🧩 What is the Page Object Model (POM)?

The **Page Object Model (POM)** is a design pattern that helps you organize your test code by separating:

- **Test logic** (what to test) from
- **Page interactions** (how to interact with the UI)

Each page of the application is represented by a **Page Object Class** that contains:

- Locators for elements
- Methods that perform user actions

### ✅ Benefits:

- Cleaner test code
- Easier maintenance when UI changes
- Improved reusability across multiple test cases

---

## 🗂 Example: `registerPage.js`

```js
// tests/registerPage.js
export class RegisterPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.firstNameInput = page.locator("#firstName");
    this.lastNameInput = page.locator("#lastName");
    // ...more locators and the test asset
  }

  async register() {
    // Fill fields
    await this.firstNameInput.fill("John");
    await this.lastNameInput.fill("Doe");
    // ...other input fields

    // Select State
    await this.stateSelect.selectOption({ label: "New York" });

    // Wait for city to become enabled
    await this.page.waitForSelector("#city:not([disabled])");
  }
}
```

## 🧪 Example Test: `form.spec.js`

```js
// tests/form.spec.js
test("Student Registration Form submission", async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await page.goto("https://yang-react.web.app/");
  await registerPage.register();
  const alert = page.locator(".alert-success");
  await expect(alert).toHaveText(/successfully submitted/i);
});
```

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```properties
git clone https://github.com/Tiffany678/playwright-form-test.git
cd playwright-form-test
```

### 2️⃣ Install Dependencies

```properties
npm install
npx playwright install
npm install @playwright/test
```

### 3️⃣ Run Tests (Headless Mode)

```properties
npx playwright test
```

### 4️⃣ Run Tests with Browser Visible

```properties
npx playwright test --headed
```

## 🧾 Generating Test Reports

### 🖥️ HTML Report

Run the following command to generate an HTML report:

```properties
npx playwright test --reporter=html
```

Then open the report with:

```properties
npx playwright show-report
```

## ⚙️ Permanent Configuration in playwright.config.js

You can configure reporters globally:

```js
// playwright.config.js
export const reporter = [["list"], ["html"]];
};
```
