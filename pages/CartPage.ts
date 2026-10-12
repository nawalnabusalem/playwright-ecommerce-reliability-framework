import { Locator, Page } from '@playwright/test';

export class CartPage {
    constructor(private page: Page) {}

    async getCartItemQuantity(productName: string): Promise<number> {
        const quantityText = await this
            .getCartItemByName(productName)
            .locator('span.tabular-nums')
            .innerText();

        return Number(quantityText);
    }

    async getCartItemUnitPrice(productName: string): Promise<number> {
        const priceText = await this
            .getCartItemByName(productName)
            .locator('p:visible')
            .filter({ hasText: 'each' })
            .innerText();

        return this.parsePrice(priceText);
    }

    async getCartItemTotalPrice(productName: string): Promise<number> {
        const item = this.getCartItemByName(productName);

        const totalPriceText = await item
            .locator('div.hidden.sm\\:block.text-right > p')
            .first()
            .innerText();

        return this.parsePrice(totalPriceText);
    }

    async increaseCartItemQuantity(productName: string) {
        await this
            .getCartItemByName(productName)
            .locator('span.tabular-nums + button')
            .click();
    }

    async decreaseCartItemQuantity(productName: string) {
        await this
            .getCartItemByName(productName)
            .locator('button:has(+ span.tabular-nums)')
            .click();
    }

    async removeCartItem(productName: string) {
        await this
            .getCartItemByName(productName)
            .locator('button:has(svg.lucide-x)')
            .click();
    }

    async getSummarySubtotal(): Promise<number> {
        const subtotalText = await this.page
            .getByText('Subtotal', { exact: true })
            .locator('..')
            .locator('span')
            .nth(1)
            .innerText();

        return this.parsePrice(subtotalText);
    }

    async getSummaryTotal(): Promise<number> {
        const totalText = await this.page
            .getByText('Total', { exact: true })
            .locator('..')
            .locator('span')
            .nth(1)
            .innerText();

        return this.parsePrice(totalText);
    }

    getCartItemByName(productName: string): Locator {
        return this.getCartItems().filter({
            has: this.page.getByRole('link', {
                name: productName,
                exact: true
            })
        });
    }

    getDecreaseCartItemButton(productName: string): Locator {
        return this
            .getCartItemByName(productName)
            .locator('button:has(+ span.tabular-nums)');
    }

    private getCartItems(): Locator {
        return this.page
            .locator('div.lg\\:col-span-2.divide-y.divide-border')
            .locator(':scope > div');
    }

    private parsePrice(priceText: string): number {
        return Number(priceText.replace(/[^\d.-]/g, ''));
    }
}