export class RegisterPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.firstNameInput = page.locator("#firstName");
    this.lastNameInput = page.locator("#lastName");
    this.emailInput = page.locator("#email");
    this.genderInput = page.locator("#gender-Male");
    this.mobileInput = page.locator("#mobile");
    this.dateOfBirthInput = page.locator("#dob");
    this.streetInput = page.locator("#street");
    this.stateSelect = page.locator("#state");
    this.citySelect = page.locator("#city");
    this.pictureInput = page.locator("#picture");
    this.submitButton = page.locator('button[type="submit"]');

    // Test asset
    this.imageFile = "./tests/dimsum.png";
  }

  async register() {
    // Fill fields
    await this.firstNameInput.fill("John");
    await this.lastNameInput.fill("Doe");
    await this.emailInput.fill("john.doe@example.com");
    await this.genderInput.click();
    await this.mobileInput.fill("(123)456-7890");
    await this.dateOfBirthInput.fill("2000-01-01");
    await this.streetInput.fill("123 Main Street");

    // Select State
    await this.stateSelect.selectOption({ label: "New York" });

    // Wait for city to become enabled
    await this.page.waitForSelector("#city:not([disabled])");

    // If your app populates "New York City", select it; otherwise ignore
    await this.citySelect
      .selectOption({ label: "New York City" })
      .catch(() => {});

    await this.pictureInput.setInputFiles(this.imageFile);
    await this.page.screenshot({
      path: "screens/before-submit.png",
      fullPage: true,
    });

    await this.submitButton.click();
  }
}
