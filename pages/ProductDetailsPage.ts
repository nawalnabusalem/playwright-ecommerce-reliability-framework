import { Page } from "@playwright/test";

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

}