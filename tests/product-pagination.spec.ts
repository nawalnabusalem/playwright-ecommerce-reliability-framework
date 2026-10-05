import {expect, test} from '@playwright/test'
import { ProductsPage } from '../pages/ProductsPage';

test('Navigate to another page and display different products', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.getHome();

    const firstPageProducts = await productsPage.getDisplayedProducts();

    await productsPage.goToPage(2);

    await expect(page.getByRole('button', { name: '2' })).toBeDisabled();

    const secondPageProducts = await productsPage.getDisplayedProducts();

    expect(secondPageProducts).not.toEqual(firstPageProducts);
});