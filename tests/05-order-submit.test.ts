import { test, expect } from '@root/fixtures/merge.fixture';

test.describe('Order submit tests', () => {

    test('should be able to order product with default values already set', async ({ orderSubmitPage }) => {
        const headerText = 'Dinesh\'s Pizza House';
        const spinnerText = 'Adding to cart...';
        const addToCartText = 'Pizza added to the cart!';

        await expect(orderSubmitPage.orderSubmitHeader).toHaveText(headerText);
        await orderSubmitPage.enterQuantity(1);
        await orderSubmitPage.clickOnAddToCart();
        await expect(orderSubmitPage.addToCartSpinnerMessage).toBeVisible();
        await expect(orderSubmitPage.addToCartSpinnerMessage).toHaveText(spinnerText);
        await expect(orderSubmitPage.addedToCardSuccessMessage).toBeVisible();
        await expect(orderSubmitPage.addedToCardSuccessMessage).toHaveText(addToCartText);
    });
});