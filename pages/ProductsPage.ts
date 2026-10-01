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

        const productCards = await this.page.locator('a[href^="/en/product/"]').all();

        for(let product of productCards){
            const name = await product.locator('h3').innerText();
            const price = Number((await product.locator('p').innerText()).replace('$', ''));

            displayedProducts.push({name, price});
        }
        
        return displayedProducts;
    }

    private async selectSortingOption(option: string){
        const sortList = this.page.getByRole('combobox');

        await sortList.click();
        await this.page.getByRole('option', { name: option }).click();

        await expect(sortList).toContainText(option);
    }
}