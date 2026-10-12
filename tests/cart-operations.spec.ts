import {expect, test} from '@playwright/test'
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { Header } from '../pages/Header';
import { CartPage } from '../pages/CartPage';



test('Add three units of 32-Inch Monitor to cart and verify cart totals', async ({ page }) => {
    const quantity = 3;
    const productName = '32-Inch Monitor';

    const header = new Header(page);
    const cartPage = new CartPage(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);


    await productsPage.getHome();
    await productsPage.openProduct(productName);

    
    const originUnitPrice = await productDetailsPage.getProductPrice();

    for(let i = 1 ; i <= quantity; i++){
        await productDetailsPage.ClickAddToCartButton();
        await expect(header.getCartCountElement()).toContainText(String(i));

    }

    await header.openCart();

    expect(await cartPage.getCartItemQuantity(productName)).toBe(quantity);
    expect(await cartPage.getCartItemUnitPrice(productName)).toBe(originUnitPrice);
    expect(await cartPage.getCartItemTotalPrice(productName)).toBe(originUnitPrice * quantity);

    expect(await cartPage.getSummarySubtotal()).toBe(originUnitPrice * quantity);
    expect(await cartPage.getSummaryTotal()).toBe(originUnitPrice * quantity);

});
