import {expect, test} from '@playwright/test'
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { deserializeTanStack, changeSerializedField } from '../utils/deserializeTanStack';

test('Open a product and verify its details', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.getHome();

    const productsList = await productsPage.getDisplayedProducts();

    expect(productsList.length).toBeGreaterThan(0);

    const listProduct = productsList[0];

    await productsPage.openProduct(listProduct.name);

    const productDetailsPage = new ProductDetailsPage(page);

    const productDetailsName = await productDetailsPage.getProductName();
    const productDetailsPrice = await productDetailsPage.getProductPrice();

    expect(productDetailsName).toEqual(listProduct.name);
    expect(productDetailsPrice).toEqual(listProduct.price);

});

test('Enabled Add to Cart button for an in stock product', async ({ page }) => {
    const inStockProductName = '32-Inch Monitor';
    const productsPage = new ProductsPage(page);

    await productsPage.getHome();


    await productsPage.openProduct(inStockProductName);

    const productDetailsPage = new ProductDetailsPage(page);

    expect(await productDetailsPage.getProductName()).toEqual(inStockProductName);

    await expect(productDetailsPage.getInStockStatus()).toBeVisible();
    await expect(productDetailsPage.getAddToCartButton()).toBeEnabled();
    
    await expect(productDetailsPage.getOutOfStockStatus()).not.toBeVisible();
    await expect(productDetailsPage.getOutOfStockButton()).not.toBeVisible();

});


test('Disabled Add to Cart button for an out of stock product', async ({ page }) => {
    const outOfStockProductName = '32-Inch Monitor';
    const outOfStockProductSlug = '32-inch-monitor';
    const productsPage = new ProductsPage(page);
    
    await productsPage.getHome();

     await page.route('**/_serverFn/**', async route => {
        const request = route.request();
        const payload = new URL(request.url()).searchParams.get('payload');
        const requestData =request.method() === 'GET' && payload? deserializeTanStack(JSON.parse(payload).t): null;

        if (requestData?.data?.slug !== outOfStockProductSlug) {
            await route.continue();
            return;
        }

        const response = await route.fetch();
        const rawResponse = await response.json();
        changeSerializedField(rawResponse,'stockLevel','OUT_OF_STOCK' );

        await route.fulfill({response, json: rawResponse});
    });

    await productsPage.openProduct(outOfStockProductName);

    const productDetailsPage = new ProductDetailsPage(page);

    expect(await productDetailsPage.getProductName()).toEqual(outOfStockProductName);

    await expect(productDetailsPage.getInStockStatus()).not.toBeVisible();
    await expect(productDetailsPage.getAddToCartButton()).not.toBeVisible();

    await expect(productDetailsPage.getOutOfStockStatus()).toBeVisible();
    await expect(productDetailsPage.getOutOfStockButton()).toBeDisabled();

});