import { test, expect } from '@playwright/test';
import {ProductsPage} from '../pages/ProductsPage';
import {deserializeTanStack} from '../utils/deserializeTanStack'

test('Apply single filter for products, display electronic only', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.getHome();   
    
    const responsePromise = page.waitForResponse(response => {
        if (!response.url().includes('/_serverFn/') || response.request().method() !== 'GET' ||response.status() !== 200) {
            return false;
        }

        const url = new URL(response.url());
        const payload = url.searchParams.get('payload');

        if (!payload) return false;

         const rawPayload = JSON.parse(payload);
        const requestData = deserializeTanStack(rawPayload.t);

        return requestData?.data?.facets?.includes('1') ?? false;
    });

    await productsPage.selectFilter('Electronics');

    const response = await responsePromise;
    const responseData = deserializeTanStack(await response.json());
    const expectedProductNames = responseData.result.data.search.items.map((product: any) => product.productName);

    await productsPage.waitForProductsCount(expectedProductNames.length);

    await expect(page.getByRole('checkbox', { name: 'Electronics' })).toBeChecked();
    const actualDisplayedProductNames = (await productsPage.getDisplayedProducts()).map(product => product.name);

    expect(actualDisplayedProductNames).toEqual(expectedProductNames);
});

test('Apply multiple filters for products, display apple electronic only', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.getHome();
    await productsPage.selectFilter('Electronics');
    await expect(page.getByRole('checkbox', { name: 'Electronics' })).toBeChecked();

    const responsePromise = page.waitForResponse(response => {
        if (!response.url().includes('/_serverFn/') || response.request().method() !== 'GET' ||response.status() !== 200) {
            return false;
        }

        const url = new URL(response.url());
        const payload = url.searchParams.get('payload');

        if (!payload) return false;

        const rawPayload = JSON.parse(payload);
        const requestData = deserializeTanStack(rawPayload.t);

        return requestData?.data?.facets?.includes('3') ?? false;
    });

    await productsPage.selectFilter('Apple');
    await expect(page.getByRole('checkbox', { name: 'Apple' })).toBeChecked();


    const response = await responsePromise;
    const responseData = deserializeTanStack(await response.json());
    const expectedProductNames = responseData.result.data.search.items.map((product: any) => product.productName);

    await productsPage.waitForProductsCount(expectedProductNames.length);


    const actualDisplayedProductNames = (await productsPage.getDisplayedProducts()).map(product => product.name);

    expect(actualDisplayedProductNames).toEqual(expectedProductNames);

});

test('Remove apple filter after applying apple electronics filters and update displayed products', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.getHome();   
    
    const electronicsResponsePromise = page.waitForResponse(response => {
        if (!response.url().includes('/_serverFn/') || response.request().method() !== 'GET' ||response.status() !== 200) {
            return false;
        }

        const url = new URL(response.url());
        const payload = url.searchParams.get('payload');

        if (!payload) return false;

         const rawPayload = JSON.parse(payload);
        const requestData = deserializeTanStack(rawPayload.t);

        return requestData?.data?.facets?.includes('1') ?? false;
    });

    await productsPage.selectFilter('Electronics');

    const electronicsResponse = await electronicsResponsePromise;
    const electronicsResponseData = deserializeTanStack(await electronicsResponse.json());
    const electronicsProductsNames = electronicsResponseData.result.data.search.items.map((product: any) => product.productName);

    await productsPage.selectFilter('Apple');
    await expect(page.getByRole('checkbox', { name: 'Apple' })).toBeChecked();


    await productsPage.removeFilter('Apple');
    await expect(page.getByRole('checkbox', { name: 'Apple' })).not.toBeChecked();


    await productsPage.waitForProductsCount(electronicsProductsNames.length);

    await expect(page.getByRole('checkbox', { name: 'Apple' })).not.toBeChecked();
    await expect(page.getByRole('checkbox', { name: 'Electronics' })).toBeChecked();

    const actualDisplayedProductNames = (await productsPage.getDisplayedProducts()).map(product => product.name);

    expect(actualDisplayedProductNames).toEqual(electronicsProductsNames);

});


test('Clear All filters after applying apple electronics filters and displayed products', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.getHome();   
    const originDisplayedProductNames = (await productsPage.getDisplayedProducts()).map(product => product.name);
    

    await productsPage.selectFilter('Electronics');
    await expect(page.getByRole('checkbox', { name: 'Electronics' })).toBeChecked();


    await productsPage.selectFilter('Apple');
    await expect(page.getByRole('checkbox', { name: 'Apple' })).toBeChecked();


    await productsPage.clearAllFilters();
    await expect(page.getByRole('checkbox', { name: 'Electronics' })).not.toBeChecked();
    await expect(page.getByRole('checkbox', { name: 'Apple' })).not.toBeChecked();


    await productsPage.waitForProductsCount(originDisplayedProductNames.length);

    const actualDisplayedProductNames = (await productsPage.getDisplayedProducts()).map(product => product.name);

    expect(actualDisplayedProductNames).toEqual(originDisplayedProductNames);

});