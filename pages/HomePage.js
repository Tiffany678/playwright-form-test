import { BasePage } from './base.page.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    // Prefer role-based locators for stability
    this.startBtn = page.getByRole('button', { name: /start|get started/i });
    this.welcomeBanner = page.getByTestId('welcome-banner');
    this.searchInput = page.getByPlaceholder('Search products');
  }
  async start() {
    await this.startBtn.click();
  }
  async search(term) {
    await this.searchInput.fill(term);
    await this.page.keyboard.press('Enter');
  }
}