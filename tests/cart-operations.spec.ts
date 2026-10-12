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


test('Increase cart item quantity from 1 to 2 and verify updated totals', async ({ page }) => {
    const productName = '32-Inch Monitor';

    const header = new Header(page);
    const cartPage = new CartPage(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);


    await productsPage.getHome();
    await productsPage.openProduct(productName);

    
    const originUnitPrice = await productDetailsPage.getProductPrice();

    await productDetailsPage.ClickAddToCartButton();
    await expect(header.getCartCountElement()).toContainText('1');


    await header.openCart();

    await expect(cartPage.getDecreaseCartItemButton(productName)).toBeDisabled();

    await cartPage.increaseCartItemQuantity(productName);

    await expect(header.getCartCountElement()).toContainText('2');

    expect(await cartPage.getCartItemQuantity(productName)).toBe(2);
    expect(await cartPage.getCartItemUnitPrice(productName)).toBe(originUnitPrice);
    expect(await cartPage.getCartItemTotalPrice(productName)).toBe(originUnitPrice * 2);

    await expect(cartPage.getDecreaseCartItemButton(productName)).toBeEnabled();

    expect(await cartPage.getSummarySubtotal()).toBe(originUnitPrice * 2);
    expect(await cartPage.getSummaryTotal()).toBe(originUnitPrice * 2);

});

test('Decrease cart item quantity from 2 to 1 and verify updated totals', async ({ page }) => {
    const quantity = 2;
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

    await expect(cartPage.getDecreaseCartItemButton(productName)).toBeEnabled();
    
    await cartPage.decreaseCartItemQuantity(productName);

    await expect(header.getCartCountElement()).toContainText('1');

    expect(await cartPage.getCartItemQuantity(productName)).toBe(1);
    expect(await cartPage.getCartItemUnitPrice(productName)).toBe(originUnitPrice);
    expect(await cartPage.getCartItemTotalPrice(productName)).toBe(originUnitPrice);

    await expect(cartPage.getDecreaseCartItemButton(productName)).toBeDisabled();

    expect(await cartPage.getSummarySubtotal()).toBe(originUnitPrice);
    expect(await cartPage.getSummaryTotal()).toBe(originUnitPrice);

});


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
