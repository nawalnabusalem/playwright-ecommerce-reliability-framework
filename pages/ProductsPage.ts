import {Page, expect} from '@playwright/test';
import { Product } from '../types/Product';

export class ProductsPage{
    constructor (private page: Page){
    }

    async getHome() {
        await this.page.goto('/search');
        await this.page.waitForLoadState('networkidle');
    }

    async sortProductAscending(){
        await this.selectSortingOption('Name: A to Z');

    }

    async sortProductDescending() {
        await this.selectSortingOption('Name: Z to A');
}

    async sortProductPriceFromCheapToExpensive(){
        await this.selectSortingOption('Price: Low to High');
    }

    async sortProductPriceFromExpensiveToCheap(){
        await this.selectSortingOption('Price: High to Low');
    }

    async getDisplayedProducts(): Promise<Product[]>{
        const displayedProducts: Product[] = [];

        const productCards = this.page.locator('a[href^="/en/product/"]');
        const count = await productCards.count();

        for (let i = 0; i < count; i++) {
            const product = productCards.nth(i);

            const name = await product.locator('h3').innerText();
            const price = Number((await product.locator('p').innerText()).replace('$', ''));

            displayedProducts.push({ name, price });
        }
        
        return displayedProducts;
    }

    async selectFilter(filter: string){
        await this.page.getByRole('checkbox', { name: filter }).click();
    }

    async removeFilter(filter: string){
        await this.page.getByRole('checkbox', { name: filter }).click();
    }

    async clearAllFilters(){
        await this.page.getByRole('button', { name: 'Clear All' }).click();
    }

    async waitForProductsCount(count: number) {
        await expect(this.page.locator('a[href^="/en/product/"]')).toHaveCount(count);
    }

    private async selectSortingOption(option: string){
        const sortList = this.page.getByRole('combobox');

        await sortList.click();
        await this.page.getByRole('option', { name: option }).click();

        await expect(sortList).toContainText(option);
    }
}