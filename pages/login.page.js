export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto("/");
    // extra safety
    await this.usernameInput.waitFor({ state: "visible" });
  }

  async login(username, password) {
    //  THIS is the important fix
    const user = username ?? "visual_user";
    const pass = password ?? "secret_sauce";

    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
}
