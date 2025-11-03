export class CartPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartItem = page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator("#checkout");
  }

  async assertOnCartPage() {
    await this.title.waitFor();
  }

  async getItemNames() {
    return this.page
      .locator('[data-test="inventory-item-name"]')
      .allTextContents();
  }
}
