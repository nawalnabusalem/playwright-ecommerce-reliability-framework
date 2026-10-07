import {expect, test} from '@playwright/test'
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

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