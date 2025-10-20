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
class RegisterPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator("#firstName");
    this.lastName = page.locator("#lastName");
    this.email = page.locator("#userEmail");
    this.gender = page.locator('input[name="gender"]');
    this.mobile = page.locator("#userNumber");
    this.submitButton = page.locator("#submit");
  }

  async goto() {
    await this.page.goto("https://yang-react.web.app/");
  }

  async register(formData) {
    await this.firstName.fill(formData.firstName);
    await this.lastName.fill(formData.lastName);
    await this.email.fill(formData.email);
    await this.gender.first().check(); // Example: selects first gender option
    await this.mobile.fill(formData.mobile);
    await this.submitButton.click();
  }
}

module.exports = { RegisterPage };
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
