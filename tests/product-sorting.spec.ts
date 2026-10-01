import { test, expect } from '@playwright/test';
import {ProductsPage} from '../pages/ProductsPage';

test('sort products from A to Z', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.getHome();    
    await productsPage.sortProductAscending();

    const actualDisplayedProductNames = (await productsPage.getDisplayedProducts()).map(product => product.name);
    const expectedOrderedProductNames = [...actualDisplayedProductNames].sort((p1, p2) => (p1.localeCompare(p2)));
    
    expect(actualDisplayedProductNames).toEqual(expectedOrderedProductNames);
});

test('sort products from Z to A', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.getHome();
    await productsPage.sortProductDescending();

    const actualDisplayedProductNames = (await productsPage.getDisplayedProducts()).map(product => product.name);
    const expectedOrderedProductNames = [...actualDisplayedProductNames].sort((p1, p2) => (p2.localeCompare(p1)));
    
    expect(actualDisplayedProductNames).toEqual(expectedOrderedProductNames);
});

test('sort products price from low to high', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.getHome();    
    await productsPage.sortProductPriceFromCheapToExpensive();

    const actualDisplayedProductPrices = (await productsPage.getDisplayedProducts()).map(product => product.price);
    const expectedOrderedProductPrices = [...actualDisplayedProductPrices].sort((p1, p2) => p1 - p2);
    
    expect(actualDisplayedProductPrices).toEqual(expectedOrderedProductPrices);
});

test('sort products price from high to low', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.getHome();    
    await productsPage.sortProductPriceFromExpensiveToCheap();

    const actualDisplayedProductPrices = (await productsPage.getDisplayedProducts()).map(product => product.price);
    const expectedOrderedProductPrices = [...actualDisplayedProductPrices].sort((p1, p2) => p2 - p1);
    
    expect(actualDisplayedProductPrices).toEqual(expectedOrderedProductPrices);
});

