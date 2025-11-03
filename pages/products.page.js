export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');

    this.backpackAddBtn = page.locator("#add-to-cart-sauce-labs-backpack");
    this.backpackRemoveBtn = page.getByTestId("remove-sauce-labs-backpack");
  }

  async assertOnProductPage() {
    await this.title.waitFor();
  }

  async addBackpackToCart() {
    await this.backpackAddBtn.click();
  }
  async openCart() {
    await this.cartLink.click();
  }
}
