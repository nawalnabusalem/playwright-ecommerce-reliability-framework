import { Locator, Page } from "@playwright/test";

export class ProductDetailsPage{
    constructor (private page: Page){
    }


    async getProductName(): Promise<string> {
        return await this.page.locator('body > main > div > div > div > div:nth-child(2) > div > div.space-y-2 > h1').first().innerText();
    }

    async getProductPrice(): Promise<number> {
    const priceText = await this.page.locator('body > main > div > div > div > div:nth-child(2) > div > div.space-y-2 > p').first().innerText();

    return Number(priceText.replace('$', ''));

    }

    getInStockStatus(): Locator{
        return this.page.getByText("In Stock", {exact : true});
    }

    getAddToCartButton(): Locator{
        return this.page.getByRole('button', {name: "Add to Cart"});
    }

    getOutOfStockStatus() {
        return this.page.locator('span').filter({ hasText: 'Out of Stock' })
    }

    getOutOfStockButton() {
        return this.page.getByRole('button', { name: 'Out of Stock' });
    }

}