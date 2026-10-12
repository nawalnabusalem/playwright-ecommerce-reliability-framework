import { Locator, Page } from '@playwright/test';

export class Header {
    constructor(private page: Page) {}

    async openCart() {
        await this.page
            .getByRole('button', { name: 'Shopping Cart' })
            .click();
    }

   getCartCountElement(): Locator {
        return this.page.getByRole('button', { name: 'Shopping Cart' });

    }
}